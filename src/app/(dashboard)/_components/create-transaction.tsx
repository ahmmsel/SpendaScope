"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
	CreateTransactionSchema,
	CreateTransactionSchemaType,
} from "@/schemas/transaction.schema";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategoryPicker } from "./category-picker";
import { useCallback } from "react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

type Props = {
	children: React.ReactNode;
	type: TransactionType;
};

export const CreateTransaction = ({ children, type }: Props) => {
	const form = useForm<CreateTransactionSchemaType>({
		resolver: zodResolver(CreateTransactionSchema),
		defaultValues: {
			type,
			date: new Date(),
		},
	});

	const handleCategoryChange = useCallback(
		(value: string) => {
			form.setValue("category", value);
		},
		[form],
	);

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Add New{" "}
						<span
							className={cn(
								type === "income" ? "text-emerald-700" : "text-rose-700",
								"capitalize",
							)}
						>
							{type}
						</span>{" "}
						Transaction.
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form className="space-y-4">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Transaction Description</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Your description..." />
									</FormControl>
									<FormDescription>
										Transaction Description (Optional)
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Transaction Amount</FormLabel>
									<FormControl>
										<Input
											{...field}
											defaultValue={0}
											type="number"
											placeholder="e.g. $40"
										/>
									</FormControl>
									<FormDescription>
										Transaction Amount (Required)
									</FormDescription>
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-2 gap-2">
							<FormField
								control={form.control}
								name="category"
								render={() => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<FormControl>
											<CategoryPicker
												type={type}
												onChange={handleCategoryChange}
											/>
										</FormControl>
										<FormDescription>
											Select a category for the transaction
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Transaction date</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={cn(
														"font-normal text-left pl-3 w-full",
														!field.value && "text-muted-foreground",
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="opacity-50 w-4 h-4 ml-auto" />
												</Button>
											</PopoverTrigger>
										</Popover>
										<FormDescription>
											Select a date for your transaction
										</FormDescription>
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
