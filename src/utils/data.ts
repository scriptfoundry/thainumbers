import type{ Data } from '../types';

const DEFAULTS: Readonly<Data> = Object.freeze({
	useSentence: false,
	useSlow: false,
	listenFirst: true,
});

const STORAGE_KEY = 'numbers-storage';
const KEYS = Object.keys(DEFAULTS) as (keyof Data)[];

/**
 * Builds a well-formed Data object from untrusted input.
 * Only known keys are read, only own properties are considered, and only
 * boolean values are accepted; anything else falls back to the default.
 * Unknown keys (including `__proto__`, `constructor`, etc.) are ignored.
 */
const sanitize = (input: unknown): Data => {
	const result: Data = { ...DEFAULTS };

	if (typeof input !== 'object' || input === null || Array.isArray(input)) {
		return result;
	}

	for (const key of KEYS) {
		if (Object.hasOwn(input, key)) {
			const value = (input as Record<string, unknown>)[key];

			if (typeof value === 'boolean') {
				result[key] = value;
			}
		}
	}

	return result;
};

/**
 * Loads data from localStorage. Always returns a fully formed Data object,
 * using defaults for missing, malformed, or unreadable data.
 */
export const loadData = (): Data => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw === null) return { ...DEFAULTS };

		return sanitize(JSON.parse(raw));
	} catch {
		// localStorage unavailable (e.g. privacy mode) or invalid JSON

		// eslint-disable-next-line no-console
		console.warn('Failed to load data from localStorage');

		return { ...DEFAULTS };
	}
};

/**
 * Save data to localStorage. Sanitized input first, so only the
 * known properties are ever written.
 * Returns true on success, false if storage failed (quota, unavailable, etc.).
 */
export function saveData(data: unknown): boolean {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitize(data)));
		return true;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
		return false;
	}
}