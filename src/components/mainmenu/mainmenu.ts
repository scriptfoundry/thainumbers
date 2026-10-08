import { wait, waitAnimationFrames } from '../../utils/utils';
import './mainmenu.scss';
import type { ButtonHandler, Component, Section } from '../../types/';
import MENU_CONTENTS from './mainmenu.html?raw';

export class MainMenu implements Component {
	private container: HTMLDivElement;
	private element: HTMLDivElement;
	private menuHandler: ButtonHandler;

	constructor(container: HTMLDivElement, menuHandler: ButtonHandler) {
		this.container = container;
		this.menuHandler = menuHandler;

		this.element = document.createElement('div');
		this.element.className = 'mainmenu';
		this.element.innerHTML = MENU_CONTENTS;

		this.bindButtonEvents();
	}

	private bindButtonEvents() {
		const buttons = this.element.querySelectorAll('button');

		for (const button of buttons) {
			const value = button.dataset.value;
			if (!value) continue;

			const [section, level] = value.split('-');
			button.addEventListener('click', () => {
				this.menuHandler({
					section: section as Section,
					level: parseInt(level, 10),
				});
			});
		}
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
}
