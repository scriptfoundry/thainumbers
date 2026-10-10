import './listen.scss';
import type { ButtonHandler, Component, Speaker } from '../../types/';
import { spellNumber } from '../../utils/number';
import { advanceSentence, getSentence } from '../../utils/sentence';
import { replenishArray, wait } from '../../utils/utils';
import LISTEN_CONTENTS from './listen.html?raw';

export class Listen implements Component {
	private container: HTMLDivElement;
	private backButtonHandler: ButtonHandler;
	private element: HTMLDivElement;
	private level: number;
	private spokenNumbers: number[];
	private spokenNumberIndex: number = 0;
	private displayNumbers: number[];
	private output: HTMLDivElement;
	private speaker: Speaker;
	private speakInSentences = false;
	private speakSlowly = false;

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
		this.element.innerHTML = LISTEN_CONTENTS;

		this.output = this.element.querySelector('.output') as HTMLDivElement;

		replenishArray(this.spokenNumbers, this.level);

		this.update();
		this.removeAllNumbers();
		this.bindButtonEvents();

		setTimeout(this.sayCurrentNumber.bind(this), 300);
	}

	public mount() {
		this.container.appendChild(this.element);
	}

	public unmount() {
		this.container.removeChild(this.element);
	}

	private async markCorrect() {
		this.output.classList.toggle('correct', true);
		await wait(1000);
		this.output.classList.toggle('invisible', true);
		await wait(300);
		this.displayNumbers.splice(0, this.displayNumbers.length);
		this.update();
		this.output.classList.toggle('invisible', false);
		this.output.classList.toggle('correct', false);
		advanceSentence();
		await wait(300);
	}

	private async markIncorrect() {
		this.output.classList.toggle('incorrect', true);
		await wait(1000);
		this.output.classList.toggle('correct', false);
		this.displayNumbers.splice(0, this.displayNumbers.length);
		this.update();
		this.output.classList.toggle('invisible', false);
		await wait(300);
	}

	private async checkAnswer() {
		if (this.displayNumbers.length !== this.level) return;

		const answer = this.spokenNumbers[this.spokenNumberIndex];
		const entered = parseInt(this.displayNumbers.join(''), 10);
		const correct = entered === answer;

		if (correct) {
			await this.markCorrect();
			this.spokenNumberIndex++;
			if (this.spokenNumberIndex >= this.spokenNumbers.length) {
				replenishArray(this.spokenNumbers, this.level);
			}
		} else {
			await this.markIncorrect();
		}
	}

	private sayCurrentNumber() {
		const currentNumber = spellNumber(
			this.spokenNumbers[this.spokenNumberIndex],
		);
		const sentence = this.speakInSentences
			? getSentence(currentNumber)
			: currentNumber;
		const rate = this.speakSlowly ? 0.6 : 1;
		return this.speaker.say(sentence, 'thai', rate);
	}

	private removeAllNumbers() {
		this.displayNumbers.splice(0, this.displayNumbers.length);
	}

	private addNumber(num: number) {
		// Level 1 has 1 number, level 2 has 2, etc.
		if (this.displayNumbers.length >= this.level) return;

		// If multiple digits, ignore leading zeros
		if (this.level > 1 && this.displayNumbers.length === 0 && num === 0)
			return;

		this.displayNumbers.push(num);

		this.update();

		this.checkAnswer();
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
		const backButton = this.element.querySelector(
			'.back-button',
		) as HTMLButtonElement;
		backButton.addEventListener('click', () => this.backButtonHandler());

		const againButton = this.element.querySelector(
			'.listen .numpad .repeat',
		) as HTMLButtonElement;
		againButton.addEventListener('pointerdown', () => {
			this.sayCurrentNumber();
		});

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
		}

		const sentenceToggle = this.element.querySelector(
			'#sentence',
		) as HTMLInputElement;
		sentenceToggle.addEventListener('change', (evt) => {
			const target = evt.target as HTMLInputElement;
			this.speakInSentences = target.checked;
			this.sayCurrentNumber();
		});

		const slowToggle = this.element.querySelector(
			'#slow',
		) as HTMLInputElement;
		slowToggle.addEventListener('change', (evt) => {
			const target = evt.target as HTMLInputElement;
			this.speakSlowly = target.checked;
			this.sayCurrentNumber();
		});
	}
}
