"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
	label: string;
	href: string;
};

export const NavigationItem = ({ label, href }: Props) => {
	const pathname = usePathname();

	const isActive = pathname === href;

	return (
		<Link
			href={href}
			prefetch={false}
			className={cn(
				"text-lg font-medium leading-tight hover:text-primary on-hover",
				isActive ? "text-primary" : "text-muted-foreground",
			)}
		>
			{label}
		</Link>
	);
};
