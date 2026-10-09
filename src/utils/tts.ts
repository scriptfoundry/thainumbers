import type {
	Lang,
	Speaker,
} from '../types';

const fetchVoices = (): Promise<SpeechSynthesisVoice[]> => new Promise((resolve, reject) => {
	let requestsRemaining = 10;
	const getVoices = () => {
		const voices = speechSynthesis.getVoices();

		if (voices.length) {
			resolve(voices);
		} else {
			requestsRemaining--;
			if (requestsRemaining === 0) return reject(new Error('No voices found in 10 attempts'));
			setTimeout(getVoices, 10);
		}
	};



	getVoices();
});

export const init = async (): Promise<Speaker> => {
	const rxThai = /th[-_]TH/;
	const rxJapanese = /ja[-_]JP/;

	const voices = await fetchVoices();
	const voiceJapanese = voices.find(({lang}) => rxJapanese.test(lang));
	const voiceThai = voices.find(({lang}) => rxThai.test(lang));

	let speaking = false;

	if (!voiceThai) throw new Error('No Thai voice found');
	if (! voiceJapanese) throw new Error('No Japanese voice found');

	const stop = () => {
		speechSynthesis.cancel();
		speaking = false;
	};

	const say = (word: string, lang: Lang, rate=1): Promise<void> => new Promise((resolve) => {
		if (speaking) return;

		const utterance = new SpeechSynthesisUtterance(word);
		utterance.voice = lang === 'japanese' ? voiceJapanese : voiceThai;
		utterance.lang = utterance.voice.lang;
		utterance.rate = rate;

		utterance.addEventListener('error', (e) => {
			// eslint-disable-next-line no-console
			console.error(word, e);
			speaking = false;
			resolve();
		});
		utterance.addEventListener('end', () => {
			speaking = false;
			resolve();
		});

		speaking = true;
		speechSynthesis.speak(utterance);
	});

	return { say, stop };
};
