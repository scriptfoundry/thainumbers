import { Learn } from './components/learn/learn';
import { Listen } from './components/listen/listen';
import { MainMenu } from './components/mainmenu/mainmenu';
import type { Data, Speaker, ViewConfig } from './types';
import { loadData, saveData } from './utils/data';
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
	private settings: Data;

	constructor(config: AppConfig) {
		this.settings = loadData();

		const root = document.querySelector(config.rootSelector || '#app');
		if (!root) throw new Error('Root element not found');
		this.root = root as HTMLDivElement;

		TTS.init().then(speaker => {
			this.speaker = speaker;
			this.changeView();
			// this.changeView({ section: 'learn',  level: 3 });
			// this.changeView({ section: 'listen', level: 3 });
		}).catch((e) => {
			alert(e.message);
		});
	}

	private async changeView(config?: ViewConfig) {
		if (!this.speaker) return Promise.resolve();

		const nextView =
			config === undefined
				? new MainMenu(this.root, this.changeView.bind(this))
				: config.section === 'learn'
					? new Learn(this.root, this.changeView.bind(this), config.level, this.speaker, this.settings, this.changeSettings.bind(this))
					: new Listen(this.root, this.changeView.bind(this), config.level, this.speaker, this.settings, this.changeSettings.bind(this));

		await Promise.all([
			this.currentView ? this.currentView.unmount() : Promise.resolve(),
			nextView.mount(),
		]);

		this.currentView = nextView;
	}

	private changeSettings(key: keyof Data, value: boolean) {
		this.settings[key] = value;
		saveData(this.settings);
	}

	public destroy() {
		if (this.currentView) {
			this.currentView.unmount();
			this.currentView = undefined;
		}
	}
}