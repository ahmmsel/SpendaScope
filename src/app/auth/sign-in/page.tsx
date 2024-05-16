"use client";

import Image from "next/image";

import { TypographyH1 } from "@/components/typograhpy/typograhpy-h1";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Page() {
	const onSignIn = async () => {
		signIn("github", { callbackUrl: "/dashboard" });
	};

	return (
		<main className="flex items-center justify-center h-screen">
			<div className="flex flex-col items-center justify-center gap-4 md:flex-row-reverse md:justify-between">
				<Image
					src="/logo/default.svg"
					alt="SpendaScope"
					width={180}
					height={180}
				/>
				<div className="flex flex-col items-center gap-y-4 md:items-start">
					<TypographyH1>
						See Every Penny, <br /> Save Every Dollar.
					</TypographyH1>
					<Button variant="outline" onClick={onSignIn}>
						<Image
							src="/icons/github.svg"
							alt="Github"
							className="mr-2"
							width={20}
							height={20}
						/>
						Sign In With Github
					</Button>
				</div>
			</div>
		</main>
	);
}
