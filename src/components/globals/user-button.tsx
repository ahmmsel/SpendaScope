"use client";

import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserButton = () => {
	const { data } = useSession();

	return (
		<Avatar>
			<AvatarImage
				src={String(data?.user?.image)}
				alt={String(data?.user?.name)}
			/>
			<AvatarFallback>{data?.user?.name}</AvatarFallback>
		</Avatar>
	);
};
