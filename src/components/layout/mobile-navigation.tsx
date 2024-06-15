"use client";

import Link from "next/link";

import { links } from "@/lib/links";

export const MobileNavigation = () => {
	return (
		<div className="md:hidden fixed bottom-0 w-full h-14 bg-background z-50 mt-16 p-4">
			<div className="flex items-center justify-center gap-16">
				{links.map(({ icon: Icon, ...item }) => (
					<Link href={item.href} key={item.href}>
						<Icon className="w-6 h-6" />
					</Link>
				))}
			</div>
		</div>
	);
};
