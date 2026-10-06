const DIGITS = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
const PLACES = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น']; // units, tens, hundreds, thousands, tens of thousands

export function spellNumber(n: number): string {
	if (!Number.isInteger(n) || n < 0 || n > 99999) {
		throw new RangeError('Input must be an integer between 0 and 9999');
	}

	if (n === 0) return 'ศูนย์';

	const digits = String(n).split('').map(Number); // most significant first
	const len = digits.length;
	let result = '';

	digits.forEach((d, i) => {
		const place = len - 1 - i; // 0 = units, 1 = tens, 2 = hundreds, 3 = thousands
		if (d === 0) return; // zeros are skipped

		if (place === 0) {
			// units digit: 1 becomes เอ็ด when it follows another digit
			result += d === 1 && len > 1 ? 'เอ็ด' : DIGITS[d];
		} else if (place === 1) {
			// tens: 10 → สิบ, 20 → ยี่สิบ, otherwise digit + สิบ
			result += d === 1 ? 'สิบ' : d === 2 ? 'ยี่สิบ' : DIGITS[d] + 'สิบ';
		} else {
			// hundreds / thousands: drop the leading "หนึ่ง" in conversation
			result += (d === 1 ? '' : DIGITS[d]) + PLACES[place];
		}
	});

	return result;
}
export const buildNumberPicker = (width: number) => {
	const numbers: number[][] = [];
	const NUMBERS = [0,1,2,3,4,5,6,7,8,9];
	let index = 0;

	const resort = () => {
		for (let i = 0; i < width; i++) {
			let placeNumbers = NUMBERS.slice();
			if (i === 0 && width > 1) {
				placeNumbers = placeNumbers.map(n => n === 0 ? 1 : n);
			}

			placeNumbers.sort(() => Math.random() > 0.5 ? 1 : -1);

			numbers.push(placeNumbers);
		}
	};

	resort();
	return () => {
		if (index >= NUMBERS.length) {
			resort();
			index = 0;
		}

		let value = 0;
		for (let i = 0; i < width; i++) {
			value = value * 10 + numbers[i][index];
		}

		index += 1;
		return value;
	};
};