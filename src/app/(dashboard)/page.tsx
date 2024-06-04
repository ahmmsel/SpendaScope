import { Button } from "@/components/ui/button";
import { getSettings } from "@/services/user.services";
import { CreateTransaction } from "./_components/create-transaction";

export default async function Page() {
	const settings = await getSettings();

	return (
		<main className="container my-10">
			<div className="flex items-center justify-end gap-2">
				<CreateTransaction type="income">
					<Button>New Income</Button>
				</CreateTransaction>
				<CreateTransaction type="expense">
					<Button variant="outline">New Expense</Button>
				</CreateTransaction>
			</div>
		</main>
	);
}
