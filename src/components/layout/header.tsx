"use client";

import { Logo } from "@/components/globals/logo";
import { UserButton } from "@/components/globals/user-button";
import { Navigation } from "@/components/layout/navigation";

export const Header = () => {
	return (
		<header className="py-4 sticky top-0 bg-background z-50">
			<div className="container flex items-center justify-between">
				<div className="flex items-center gap-x-10">
					<Logo />
					<Navigation />
				</div>
				<UserButton />
			</div>
		</header>
	);
};
