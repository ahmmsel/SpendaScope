"use client";

import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { links } from "@/constants/links";
import { NavigationItem } from "@/components/layout/navigation-item";
import { Logo } from "@/components/globals/logo";

export const MobileNavigation = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden">
					<Menu className="w-6 h-6" />
				</Button>
			</SheetTrigger>
			<SheetContent
				side="left"
				className="py-4 flex flex-col items-start space-y-4"
			>
				<Logo width={60} height={60} />
				{links.map((link) => (
					<NavigationItem key={link.href} label={link.label} href={link.href} />
				))}
			</SheetContent>
		</Sheet>
	);
};
