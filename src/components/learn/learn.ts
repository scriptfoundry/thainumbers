import { replenishArray } from '../../utils/utils';
import './learn.scss';
import type { ButtonHandler, Component, Data, Speaker } from '../../types';
import { spellNumber } from '../../utils/number';
import { wait, waitAnimationFrames } from '../../utils/utils';
import LEARN_CONTENTS from './learn.html?raw';

export class Learn implements Component {
	private container: HTMLDivElement;
	private level: number;
	private speaker: Speaker;
	private element: HTMLDivElement;
	private backButtonHandler: ButtonHandler;
	private currentNumberIndex = 0;
	private numbers: number[] = [];
	private againButton: HTMLButtonElement;
	private nextButton: HTMLButtonElement;
	private previousButton: HTMLButtonElement;
	private output: HTMLDivElement;
	private busy = false;


	constructor(
		container: HTMLDivElement,
		backButtonHandler: ButtonHandler,
		level: number,
		speaker: Speaker,
		settings: Data,
		changeSettings: (key: keyof Data, value: boolean) => void,
	) {
		this.container = container;
		this.level = level;
		this.speaker = speaker;
		this.backButtonHandler = backButtonHandler;

		this.element = document.createElement('div');
		this.element.innerHTML = LEARN_CONTENTS;

		this.againButton = this.element.querySelector('.learn .navigation .again') as HTMLButtonElement;
		this.previousButton = this.element.querySelector('.learn .navigation .previous') as HTMLButtonElement;
		this.nextButton = this.element.querySelector('.learn .navigation .next') as HTMLButtonElement;
		this.output = this.element.querySelector('.output') as HTMLDivElement;

		this.bindButtonEvents();

		replenishArray(this.numbers, this.level, this.level > 1);
		this.currentNumberIndex = 0;

		setTimeout(this.next.bind(this), 300);
	}

	public async mount() {
		this.container.appendChild(this.element);
		await waitAnimationFrames(2);
		this.element.classList.add('visible');
		await wait(300);
	}

	public async unmount() {
		this.element.classList.remove('visible');
		await wait(300);
		this.container.removeChild(this.element);
		await waitAnimationFrames(1);
	}

	private async sayCurrentNumber() {
		const currentNumber = this.numbers[this.currentNumberIndex];
		return this.speaker.say(spellNumber(currentNumber), 'thai');
	}

	private async showCurrentNumber() {
		const currentNumber = this.numbers[this.currentNumberIndex];
		this.output.innerHTML = currentNumber.toString(10);
		this.output.classList.add('visible');
		return Promise.resolve();
	}

	private async hideCurrentNumber() {
		this.output.classList.remove('visible');
		await wait(300);
		this.output.innerHTML = '';
	}

	private async next() {
		this.disableButtons();
		await this.hideCurrentNumber();
		await this.showCurrentNumber();
		await wait(500 + this.level * 600);
		await this.sayCurrentNumber();
		this.enableButtons();
	}

	private disableButtons() {
		this.againButton.disabled = true;
		this.nextButton.disabled = true;
		this.previousButton.disabled = true;
	}

	private enableButtons() {
		this.againButton.disabled = false;
		this.nextButton.disabled = false;
		this.previousButton.disabled = false;
	}

	private bindButtonEvents() {
		const backButton = this.element.querySelector('.back-button') as HTMLButtonElement;
		backButton.addEventListener('click', () => this.backButtonHandler());

		this.againButton.addEventListener('pointerdown', async (evt: PointerEvent) => {
			this.disableButtons();
			await this.sayCurrentNumber();
			this.enableButtons();
		});

		this.previousButton.addEventListener('pointerdown', () => {
			if (this.currentNumberIndex === 0) return;

			this.currentNumberIndex -= 1;
			this.next();
		});

		this.nextButton.addEventListener('pointerdown', () => {
			if (this.currentNumberIndex >= this.numbers.length - 1) {
				replenishArray(this.numbers, this.level);
			}
			this.currentNumberIndex += 1;
			this.next();
		});
	}
}