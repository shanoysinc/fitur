export const extractUserInitials = (name: string) => {
	const nameArr = name.split(" ");
	if (nameArr.length >= 2) {
		return nameArr[0].charAt(0) + nameArr[1].charAt(0);
	}
	return nameArr[0].charAt(0);
};
