export const filterColorsForCategory = (category) => (item) => {
	if (category === 'courier') {
		return item.label.toUpperCase() === 'ЧЕРНЫЙ';
	} else {
		return true;
	}
};
