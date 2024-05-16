import { getServerSession } from "next-auth";

import { db } from "@/lib/db";

export async function getCurrentUser() {
	const session = await getServerSession();

	const user = await db.user.findFirst({
		where: { email: session?.user?.email as string },
	});

	return user;
}
