import {
	adjectives,
	animals,
	uniqueNamesGenerator,
} from "unique-names-generator";

export const getRandomName = () => {
	return uniqueNamesGenerator({
		dictionaries: [adjectives, animals],
		separator: " ",
		style: "capital",
	});
};

export const getInitials = (name: string) =>
	name
		.split(" ")
		.map((word) => word.substring(0, 1))
		.slice(0, 2)
		.join("")
		.toUpperCase();
