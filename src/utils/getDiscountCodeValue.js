export const getDiscountCodeValue = (category, discount) => {
	if (category === '4') {
		if (discount === 1.38) {
			return 'COURIER2020';
		}
		if (discount === 1.17) {
			return 'NEW_COURIER';
		}
		if (discount === 0.89) {
			return 'OLD_FRIEND';
		}
	} else {
		if (discount === 1.43) {
			return 'USER2020';
		}
		if (discount === 1.09) {
			return 'NEW_USER';
		}
	}
	return '';
};
