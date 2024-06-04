import { redirect } from "next/navigation";
import { z } from "zod";

import { getCurrentUser } from "@/services/user.services";
import { db } from "@/lib/db";

export async function GET(request: Request) {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/auth/sign-in");
	}

	const { searchParams } = new URL(request.url);
	const paramType = searchParams.get("type");

	const validator = z.enum(["income", "expense"]);
	const queryParams = validator.safeParse(paramType);

	if (!queryParams.success) {
		return Response.json(queryParams.error, {
			status: 400,
		});
	}

	const type = queryParams.data;

	const categories = await db.category.findMany({
		where: {
			userId: user.id,
			...(type && { type }),
		},
		orderBy: {
			name: "asc",
		},
	});

	return Response.json(categories);
}
