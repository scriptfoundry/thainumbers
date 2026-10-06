import './listen.scss';
import type { Component } from '../../types/';
import LISTEN_CONTENTS from './listen.html?raw';


export class Listen implements Component {
	private container: HTMLDivElement;
	private backButtonHandler: ButtonHandler;
	private element: HTMLDivElement;
	private title: HTMLHeadingElement;
	private summary: HTMLHeadingElement;
	private value: HTMLHeadingElement;

	constructor(
		container: HTMLDivElement,
		backButtonHandler: ButtonHandler
	) {
		this.container = container;
		this.backButtonHandler = backButtonHandler;

		this.element = document.createElement('div');
		this.element.className = 'listen';
		this.element.innerHTML = LISTEN_CONTENTS;

		this.value = this.element.querySelector('.number') as HTMLHeadingElement;
		console.log(this.value);
	}

	public mount() {
		this.container.appendChild(this.element);
	}

	public unmount() {
		this.container.removeChild(this.element);
	}
}