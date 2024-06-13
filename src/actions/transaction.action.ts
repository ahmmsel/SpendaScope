"use server";

import { redirect } from "next/navigation";

import {
	CreateTransactionSchema,
	CreateTransactionSchemaType,
} from "@/schemas/transaction.schema";
import { getCurrentUser } from "@/services/user.services";
import { db } from "@/lib/db";

export async function CreateTransaction(form: CreateTransactionSchemaType) {
	const parsedBody = CreateTransactionSchema.safeParse(form);

	if (!parsedBody.success) {
		throw new Error(parsedBody.error.message);
	}

	const user = await getCurrentUser();

	if (!user) {
		return redirect("/auth/sign-in");
	}

	const { description, amount, category, date, type } = parsedBody.data;

	const categoryRow = await db.category.findFirst({
		where: {
			userId: user.id,
			name: category,
		},
	});

	if (!categoryRow) {
		throw new Error("Category not found!");
	}

	await db.$transaction([
		// Create Transaction
		db.transaction.create({
			data: {
				userId: user.id,
				description: description || "",
				amount,
				type,
				category: categoryRow.name,
				categoryIcon: categoryRow.icon,
				date,
			},
		}),
		// Update month aggragates
		db.monthHistory.upsert({
			where: {
				day_month_year_userId: {
					userId: user.id,
					day: date.getUTCDate(),
					month: date.getUTCMonth(),
					year: date.getUTCFullYear(),
				},
			},
			create: {
				userId: user.id,
				day: date.getUTCDate(),
				month: date.getUTCMonth(),
				year: date.getUTCFullYear(),
				expense: type === "expense" ? amount : 0,
				income: type === "income" ? amount : 0,
			},
			update: {
				expense: {
					increment: type === "expense" ? amount : 0,
				},
				income: {
					increment: type === "income" ? amount : 0,
				},
			},
		}),
		// Update year aggragates
		db.yearHistory.upsert({
			where: {
				month_year_userId: {
					userId: user.id,
					month: date.getUTCMonth(),
					year: date.getUTCFullYear(),
				},
			},
			create: {
				userId: user.id,
				month: date.getUTCMonth(),
				year: date.getUTCFullYear(),
				expense: type === "expense" ? amount : 0,
				income: type === "income" ? amount : 0,
			},
			update: {
				expense: {
					increment: type === "expense" ? amount : 0,
				},
				income: {
					increment: type === "income" ? amount : 0,
				},
			},
		}),
	]);
}

export async function DeleteTransaction(transactionId: string) {
	const user = await getCurrentUser();

	if (!user) {
		return redirect("/auth/sign-in");
	}

	const transaction = await db.transaction.findUnique({
		where: {
			id: transactionId,
		},
	});

	if (!transaction) {
		throw new Error("Transaction with this ID is not found!");
	}

	await db.$transaction([
		// Delete Transaction
		db.transaction.delete({
			where: {
				id: transactionId,
				userId: user.id,
			},
		}),
		// Update month History
		db.monthHistory.update({
			where: {
				day_month_year_userId: {
					userId: user.id,
					day: transaction.date.getUTCDate(),
					month: transaction.date.getUTCMonth(),
					year: transaction.date.getUTCFullYear(),
				},
			},
			data: {
				...(transaction.type === "expense" && {
					expense: {
						decrement: transaction.amount,
					},
				}),
				...(transaction.type === "income" && {
					income: {
						decrement: transaction.amount,
					},
				}),
			},
		}),
		// Update year History
		db.yearHistory.update({
			where: {
				month_year_userId: {
					userId: user.id,
					month: transaction.date.getUTCMonth(),
					year: transaction.date.getUTCFullYear(),
				},
			},
			data: {
				...(transaction.type === "expense" && {
					expense: {
						decrement: transaction.amount,
					},
				}),
				...(transaction.type === "income" && {
					income: {
						decrement: transaction.amount,
					},
				}),
			},
		}),
	]);

	return transaction;
}
