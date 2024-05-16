"use client";

import { links } from "@/constants/links";
import { NavigationItem } from "@/components/layout/navigation-item";

export const Navigation = () => {
	return (
		<div className="hidden lg:flex items-center space-x-6">
			{links.map((link) => (
				<NavigationItem key={link.href} label={link.label} href={link.href} />
			))}
		</div>
	);
};
