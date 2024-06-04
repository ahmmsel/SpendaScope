import { redirect } from "next/navigation";

import { getCurrentUser } from "@/services/user.services";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/auth/sign-in");
	}

	let settings = await db.settings.findUnique({ where: { userId: user.id } });

	if (!settings) {
		settings = await db.settings.create({
			data: { userId: user.id, currency: "USD" },
		});
	}

	revalidatePath("/");
	return Response.json(settings);
}
