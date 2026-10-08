export const wait = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const waitAnimationFrames = (frames: number) =>
	new Promise((resolve) => {
		const waitNext = () => {
			requestAnimationFrame(() => {
				if (frames-- > 0) waitNext();
				else resolve(null);
			});
		};

		waitNext();
	});

export const getRefreshRate = () =>
	new Promise((resolve) => {
		const SAMPLE_COUNT = 10;
		const samples: number[] = [];
		let sampleIndex = 0;

		const getResult = () => {
			const refreshRate =
				samples.reduce((c, t, i, a) => {
					if (i > 0) c += t - a[i - 1];
					return c;
				}, 0) / SAMPLE_COUNT;
			resolve({
				refreshRate,
				fps: 1000 / refreshRate,
			});
		};
		const captureFrameTimeSample: FrameRequestCallback = (time) => {
			samples[sampleIndex++] = time;

			if (sampleIndex > SAMPLE_COUNT) return getResult();

			requestAnimationFrame(captureFrameTimeSample);
		};

		requestAnimationFrame(captureFrameTimeSample);
	});

const shuffleArray = (arr: number[]) => {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
	}
	return arr;
};

const getNumberArray = (level: number, avoidZero: boolean) => {
	// Get all possible digits a number can have at a specific level (level 1 can have
	// 0-10, level 2 can have 10-99, level 3 can have 100-999). Only level 1 is allowed
	// a "leading zero".

	const SOURCE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const SOURCE_LENGTH = SOURCE.length;
	const arr = SOURCE.slice(0, level > 1 ? SOURCE_LENGTH - 1 : SOURCE_LENGTH);

	if (avoidZero) arr[0] = 1;

	return arr;
};
export const replenishArray = (arr: number[], level: number) => {
	const lastNumber = arr[arr.length - 1];
	const numberArrays: number[][] = [];
	const arrayLength = level === 1 ? 11 : 10;

	// For each place in a number, create a shuffled list of all possible digits.
	for (let i = 0; i < level; i++) {
		numberArrays.push(shuffleArray(getNumberArray(level, level > 1 && i === 0)));
	}

	// Build the array by combining the shuffled digit arrays. For example:
	// [[1,2,3], [4,5,6], [7,8,9]] becomes [147, 258, 369]
	const nextArray = [];
	for (let numberIndex = 0; numberIndex < arrayLength; numberIndex++) {
		let val = 0;
		for (let digitIndex = 0; digitIndex < level; digitIndex++) {
			val = val * 10 + numberArrays[digitIndex][numberIndex];
		}
		nextArray.push(val);
	}

	// Avoid creating consecutive numbers that repeat
	if (nextArray[0] === lastNumber) nextArray.reverse();

	// Mutate the original array by adding the new numbers
	arr.splice(arr.length, 0, ...nextArray);

};