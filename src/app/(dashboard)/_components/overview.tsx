"use client";

import { TypographyH2 } from "@/components/typograhpy/typography-h2";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { Settings } from "@prisma/client";
import { differenceInDays, startOfMonth } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	settings: Settings;
};

export const Overview = ({ settings }: Props) => {
	const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
		from: startOfMonth(new Date()),
		to: new Date(),
	});

	return (
		<>
			<div className="container flex flex-wrap items-end justify-between">
				<TypographyH2>Overview</TypographyH2>
				<DateRangePicker
					initialDateFrom={dateRange.from}
					initialDateTo={dateRange.to}
					showCompare={false}
					onUpdate={(value) => {
						const { from, to } = value.range;

						if (!from || !to) return;

						if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
							toast.error(
								`The selected date range is too long. Max allowed date range is ${MAX_DATE_RANGE_DAYS} days!`,
							);

							return;
						}

						setDateRange({ from, to });
					}}
				/>
			</div>
		</>
	);
};
