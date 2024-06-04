import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

export async function getCurrentUser() {
	const session = await getServerSession();

	const user = await db.user.findFirst({
		where: { email: session?.user?.email as string },
	});

	return user;
}

export async function getSettings() {
	const user = await getCurrentUser();

	if (!user) {
		return redirect("/auth/sign-in");
	}

	const settings = await db.settings.findUnique({
		where: {
			userId: user.id,
		},
	});

	return settings;
}
