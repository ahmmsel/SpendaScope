import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";

import { db } from "@/lib/db";

export const authOptions = {
	adapter: PrismaAdapter(db),
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID!,
			clientSecret: process.env.AUTH_GITHUB_SECRET!,
		}),
	],
} as AuthOptions;
