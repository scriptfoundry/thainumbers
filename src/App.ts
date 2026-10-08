import { Learn } from './components/learn/learn';
import { Listen } from './components/listen/listen';
import { MainMenu } from './components/mainmenu/mainmenu';
import type { Speaker, ViewConfig } from './types';
import * as TTS from './utils/tts';

// import { wait } from './utils/utils';

interface AppConfig {
  rootSelector?: string;
}
type View = MainMenu | Listen | Learn;

export class App {
	private root: HTMLDivElement;
	private currentView: View|undefined;
	private speaker: Speaker | undefined;

	constructor(config: AppConfig) {
		const root = document.querySelector(config.rootSelector || '#app');
		if (!root) throw new Error('Root element not found');
		this.root = root as HTMLDivElement;

		TTS.init().then(speaker => {
			this.speaker = speaker;
			// this.changeView();
			// this.changeView({ section: 'learn',  level: 3 });
			this.changeView({ section: 'listen', level: 3 });
		}).catch((e) => {
			alert(e.message);
		});
	}



	private async changeView(config?: ViewConfig) {
		if (this.currentView) {
			this.currentView.unmount();
			this.currentView = undefined;
		}

		const boundChangeView = this.changeView.bind(this);
		if (!config) {
			const mainMenu = new MainMenu(this.root, boundChangeView);
			mainMenu.mount();
			this.currentView = mainMenu;
			return;
		}
		const { section, level } = config;

		if (section === 'learn') {
			const practice = new Learn(this.root, boundChangeView, level, this.speaker);
			practice.mount();
			this.currentView = practice;
		} else {
			const listen = new Listen(this.root, boundChangeView, level, this.speaker);
			listen.mount();
			this.currentView = listen;
		}
	}

}