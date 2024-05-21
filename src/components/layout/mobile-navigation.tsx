"use client";

import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { links } from "@/constants/links";
import { NavigationItem } from "@/components/layout/navigation-item";
import { Logo } from "@/components/globals/logo";
import { useState } from "react";

export const MobileNavigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	const onClose = () => {
		() => setIsOpen((prev) => !prev);
	};

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden">
					<Menu className="w-6 h-6" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="py-4 space-y-4">
				<Logo width={60} height={60} />
				<div className="py-4 flex flex-col items-start gap-1">
					{links.map((link) => (
						<NavigationItem
							key={link.href}
							label={link.label}
							href={link.href}
							onClick={onClose}
						/>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
};
