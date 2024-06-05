import { Button } from "@/components/ui/button";
import { getSettings } from "@/services/user.services";
import { CreateTransactionDialog } from "./_components/create-transaction-dialog";

export default async function Page() {
	const settings = await getSettings();

	return (
		<main className="container my-10">
			<div className="flex items-center justify-end gap-2">
				<CreateTransactionDialog type="income">
					<Button>New Income</Button>
				</CreateTransactionDialog>
				<CreateTransactionDialog type="expense">
					<Button variant="outline">New Expense</Button>
				</CreateTransactionDialog>
			</div>
		</main>
	);
}
