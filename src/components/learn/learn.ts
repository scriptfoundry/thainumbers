import './learn.scss';
import type { ButtonHandler, Component, Speaker } from '../../types';
import { wait, waitAnimationFrames } from '../../utils/utils';
import LEARN_CONTENTS from './learn.html?raw';

export class Learn implements Component {
	private container: HTMLDivElement;
	private level: number;
	private speaker: Speaker;
	private element: HTMLDivElement;
	private backButtonHandler: ButtonHandler;


	constructor(
		container: HTMLDivElement,
		level: number,
		speaker: Speaker,
		backButtonHandler: ButtonHandler
	) {
		this.container = container;
		this.level = level;
		this.speaker = speaker;
		this.backButtonHandler = backButtonHandler;

		this.element = document.createElement('div');
		this.element.className = 'learn';
		this.element.innerHTML = LEARN_CONTENTS;

		this.bindButtonEvents();
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

	private bindButtonEvents() {

	}
}