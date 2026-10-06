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
	const rxEnglish = /en[-_]US/;

	const voices = await fetchVoices();
	const voiceEnglish = voices.find(({lang}) => rxEnglish.test(lang));
	const voiceThai = voices.find(({lang}) => rxThai.test(lang));

	if (!voiceThai) throw new Error('No Thai voice found');
	if (! voiceEnglish) throw new Error('No English voice found');

	const stop = () => {
		speechSynthesis.cancel();
	};

	const say = (word: string, lang: Lang, rate=1): Promise<void> => new Promise((resolve) => {
		const utterance = new SpeechSynthesisUtterance(word);
		utterance.voice = lang === 'english' ? voiceEnglish : voiceThai;
		utterance.rate = rate;

		utterance.addEventListener('error', (e) => {
			// eslint-disable-next-line no-console
			console.error(word, e);
			resolve();
		});
		utterance.addEventListener('end', () => resolve());

		speechSynthesis.speak(utterance);
	});

	return { say, stop };
};
