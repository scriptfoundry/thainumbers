export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const waitAnimationFrames = (frames: number) => new Promise(resolve => {
	const waitNext = () => {
		requestAnimationFrame(() => {
			if (frames-- > 0) waitNext();
			else resolve(null);
		});
	};

	waitNext();
});