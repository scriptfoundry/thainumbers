export interface Component {
	mount: () => void;
	unmount: () => void;
}
export interface ViewConfig {
	section: Section;
	level: number;
}

export type Section = 'learn' | 'listen';
export type ButtonHandler = (config?: ViewConfig) => void;

export type Lang = 'japanese' | 'thai';

export interface Speaker {
	say: (word: string, lang: Lang, rate?: number) => Promise<void>;
	stop: () => void;
}

export type Data = {
	useSentence: boolean; // default false
	useSlow: boolean; // default false
	listenFirst: boolean; // default true
};
