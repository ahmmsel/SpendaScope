import { redirect } from "next/navigation";

import { OverviewQuerySchema } from "@/schemas/overview.schema";
import { getCurrentUser } from "@/services/user.services";
import { db } from "@/lib/db";

export async function GET(request: Request) {
	const user = await getCurrentUser();

	if (!user) {
		return redirect("/auth/sign-in");
	}

	const { searchParams } = new URL(request.url);
	const from = searchParams.get("from");
	const to = searchParams.get("to");

	const queryParams = OverviewQuerySchema.safeParse({ from, to });

	if (!queryParams.success) {
		throw new Error(queryParams.error.message);
	}

	const status = await getCategoriesStatus(
		user.id,
		queryParams.data.from,
		queryParams.data.to,
	);

	return Response.json(status);
}

export type GetCategoriesStatusResponseType = Awaited<
	ReturnType<typeof getCategoriesStatus>
>;

async function getCategoriesStatus(userId: string, from: Date, to: Date) {
	const status = await db.transaction.groupBy({
		by: ["type", "category", "categoryIcon"],
		where: {
			userId,
			date: {
				gte: from,
				lte: to,
			},
		},
		_sum: {
			amount: true,
		},
		orderBy: {
			_sum: {
				amount: "desc",
			},
		},
	});

	return status;
}
