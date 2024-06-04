"use server";

import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas/settings.schema";
import { getCurrentUser } from "@/services/user.services";
import { redirect } from "next/navigation";

export async function UpdateUserCurrency(currency: string) {
	const parsedBody = SettingsSchema.safeParse({ currency });

	if (!parsedBody.success) {
		throw parsedBody.error;
	}

	const user = await getCurrentUser();

	if (!user) {
		redirect("/auth/sign-in");
	}

	const settings = await db.settings.update({
		where: { userId: user.id },
		data: { currency },
	});

	return settings;
}
