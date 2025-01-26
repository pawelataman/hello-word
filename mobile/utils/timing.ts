export const debounce = (func: (...params: any) => unknown, delay: number) => {
	let timeoutId: NodeJS.Timeout;

	return (...args: any) => {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
};