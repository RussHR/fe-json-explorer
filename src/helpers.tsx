import { JsonValue } from "./types";

export const displayValue = (value: JsonValue | null): string => {
	if (value === null) return 'null';
	if (typeof value === 'object') {
		return JSON.stringify(value, null, 2);
	}
	return String(value);
};
