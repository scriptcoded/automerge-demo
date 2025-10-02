export const stringToHslColor = (str: string, s = 30, l = 80) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}

	const h = hash % 360;
	return `hsl(${h}, ${s}%, ${l}%)`;
};
