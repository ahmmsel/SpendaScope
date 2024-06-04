"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type Props = {
	label: string;
	href: string;
	onClick?: () => void;
};

export const NavigationItem = ({ label, href, onClick }: Props) => {
	const pathname = usePathname();

	const isActive = pathname === href;

	return (
		<Link
			href={href}
			prefetch={false}
			onClick={onClick}
			className={cn(
				"text-lg font-medium leading-tight hover:text-primary on-hover",
				isActive ? "text-primary" : "text-muted-foreground",
			)}
		>
			{label}
		</Link>
	);
};
