import './listen.scss';
import type { ButtonHandler, Component, Speaker } from '../../types/';
import { spellNumber } from '../../utils/number';
import { replenishArray } from '../../utils/utils';
import LISTEN_CONTENTS from './listen.html?raw';


export class Listen implements Component {
	private container: HTMLDivElement;
	private backButtonHandler: ButtonHandler;
	private element: HTMLDivElement;
	private level: number;
	private spokenNumbers: number[];
	private displayNumbers: number[];
	private output: HTMLDivElement;
	private speaker: Speaker;

	constructor(
		container: HTMLDivElement,
		backButtonHandler: ButtonHandler,
		level: number,
		speaker: Speaker,
	) {
		this.container = container;
		this.backButtonHandler = backButtonHandler;
		this.level = level;
		this.displayNumbers = [];
		this.spokenNumbers = [];
		this.speaker = speaker;

		this.element = document.createElement('div');
		this.element.className = 'listen';
		this.element.innerHTML = LISTEN_CONTENTS;

		this.output = this.element.querySelector('.output') as HTMLDivElement;

		replenishArray(this.spokenNumbers, this.level);

		this.speaker.say(spellNumber(this.spokenNumbers[0]), 'thai');

		this.update();
		this.removeAllNumbers();
		this.bindButtonEvents();
	}

	public mount() {
		this.container.appendChild(this.element);
	}

	public unmount() {
		this.container.removeChild(this.element);
	}

	private removeAllNumbers() {
		this.displayNumbers.splice(0, this.displayNumbers.length);
	}

	private addNumber(num: number) {
		// Level 1 has 1 number, level 2 has 2, etc.
		if (this.displayNumbers.length >= this.level) return;

		// If multiple digits, ignore leading zeros
		if (this.level > 1 && this.displayNumbers.length === 0 && num === 0) return;

		this.displayNumbers.push(num);

		this.update();
	}

	private deleteNumber() {
		if (this.displayNumbers.length === 0) return;

		this.displayNumbers.pop();
		this.update();
	}

	private update() {
		this.output.textContent = this.displayNumbers.join('');

	}

	private repeat() {}

	private bindButtonEvents() {
		const backButton = this.element.querySelector('.back-button') as HTMLButtonElement;
		backButton.addEventListener('click', () => this.backButtonHandler());

		const numpadKeys = this.element.querySelectorAll('.numpad button');
		for (const numpadKey of numpadKeys) {
			const key = (numpadKey as HTMLButtonElement).dataset.key;
			if (!key) continue;

			const num = parseInt(key, 10);
			if (!Number.isNaN(num)) {
				numpadKey.addEventListener('click', () => this.addNumber(num));
			} else if (key === 'Backspace') {
				numpadKey.addEventListener('click', () => this.deleteNumber());
			} else if (key === 'Repeat') {
				numpadKey.addEventListener('click', () => this.repeat());
			}

			// numpadKey.addEventListener('click', () => {
			// 	this.value.textContent = key;
			// });
		}
	}
}