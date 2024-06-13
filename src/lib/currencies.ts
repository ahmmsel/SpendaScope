export const currencies = [
	{ value: "USD", label: "$ Dollar", locale: "en-US" },
	{ value: "EUR", label: "€ Euro", locale: "de-DE" },
	{ value: "JPY", label: "¥ Yen", locale: "ja-JP" },
	{ value: "GBP", label: "£ Pound", locale: "en-GB" },
	{ value: "EGP", label: "EGP Egyption Pound", locale: "en-EG" },
];

export type Currency = (typeof currencies)[0];
