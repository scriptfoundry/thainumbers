import './logger.scss';

/**
 * onScreenLogger.ts
 *
 * A minimal, self-contained on-screen logger.
 * Call init() once to set up the display, then call log() to push messages.
 *
 * Usage:
 *   import * as Logger from "./logger";
 *   Logger.init(5, 4000); // keep last 5 lines, each disappears after 4s
 *   Logger.log("Hello world", "hello again");
 */

interface LogLine {
	id: number;
	element: HTMLDivElement;
	timeoutId: ReturnType<typeof setTimeout>;
}

const CONTAINER_ID = 'on-screen-logger';
const LINE_CLASS = 'on-screen-logger__line';

let container: HTMLDivElement | null = null;
let maxLines = 10;
let lineDelay = 3000;
let nextId = 0;
const activeLines: LogLine[] = [];

/**
 * Initializes the on-screen logger.
 * Safe to call multiple times — subsequent calls just update settings
 * (and rebuild the container if it was somehow removed from the DOM).
 *
 * @param lines Number of messages to keep visible/in memory at once.
 * @param delay Time in milliseconds before a line is auto-removed.
 */
export const init = (lines: number, delay: number): void => {
	if (!Number.isFinite(lines) || lines <= 0) {
		throw new Error('init(): `lines` must be a positive number');
	}
	if (!Number.isFinite(delay) || delay <= 0) {
		throw new Error('init(): `delay` must be a positive number');
	}

	maxLines = Math.floor(lines);
	lineDelay = delay;

	const existing = document.getElementById(
		CONTAINER_ID,
	) as HTMLDivElement | null;
	if (existing) {
		container = existing;
		return;
	}

	const el = document.createElement('div');
	el.id = CONTAINER_ID;
	document.body.appendChild(el);
	container = el;
};

/**
 * Logs a message to the on-screen display.
 * Automatically trims to the configured max number of lines,
 * and removes each line after the configured delay.
 *
 * @param {...any} s The messages to display in this log line.
 */
export const log = (...s: unknown[]): void => {
	if (!container) {
		throw new Error('onScreenLogger: init() must be called before log()');
	}

	const id = nextId++;

	const lineEl = document.createElement('div');
	lineEl.className = LINE_CLASS;
	lineEl.textContent = s.join(', '); // by calling `join()` each value is coerced into a string
	lineEl.dataset.logId = String(id);

	container.appendChild(lineEl);

	const timeoutId = setTimeout(() => removeLine(id), lineDelay);

	activeLines.push({ id, element: lineEl, timeoutId });

	// Enforce max lines: drop oldest immediately if over capacity.
	while (activeLines.length > maxLines) {
		const oldest = activeLines[0];
		clearTimeout(oldest.timeoutId);
		removeLine(oldest.id);
	}
};

/**
 * Removes a specific line by its internal id, both from the DOM
 * and from the active-lines bookkeeping array.
 */
const removeLine = (id: number): void => {
	const index = activeLines.findIndex((l) => l.id === id);
	if (index === -1) return;

	const [line] = activeLines.splice(index, 1);
	line.element.classList.add(`${LINE_CLASS}--exit`);

	line.element.remove();
};