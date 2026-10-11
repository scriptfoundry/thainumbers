const SENTENCES = [
	'__บาทค่ะ',
	'ราคา__บาทค่ะ',
	'__บาทเองค่ะ',
	'ลดเหลือ__บาทค่ะ',
	'ถุงละ__บาทค่ะ',
	'กิโลละ__บาทค่ะ',
	'อันเดียว__บาทค่ะ',
	'เอา__บาทค่ะ',
	'__บาทได้ไหมคะ',
	'แพงไป __ได้ไหมคะ',
	'ขอ__ลูกค่ะ',
	'ขอ__ไม้ค่ะ',
	'ขอ__ถุงค่ะ',
	'เหลือ__ชิ้นค่ะ',
	'มีแบงค์__ไหมคะ',
	'รออีก__นาทีนะคะ',
];
let sentenceIndex = 0;

export const getSentence = (number: string) => {
	let sentence = SENTENCES[sentenceIndex];
	sentence = sentence.replace('__', number);

	return sentence;
};
export const advanceSentence = () => {
	sentenceIndex = (sentenceIndex + 1) % SENTENCES.length;
};
