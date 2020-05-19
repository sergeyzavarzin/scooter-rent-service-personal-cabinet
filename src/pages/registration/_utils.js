import { dealCategory } from '../../globals/constants/dealCategory';

export const filterColorsForCategory = (category) => (item) => {
	console.log(category);
	if (category === dealCategory.courier) {
		return item.label.toUpperCase() === 'ЧЕРНЫЙ';
	} else {
		return true;
	}
};
