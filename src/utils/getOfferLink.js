export const getOfferLink = (category, discountCode) => {
	if (category === 'courier' && discountCode.toUpperCase() === 'OLD_FRIEND') {
		return 'https://moysamokat.ru/oferta_delivery_2500';
	}
	if (category === 'courier' && discountCode.toUpperCase() === 'NEW_COURIER') {
		return 'https://www.moysamokat.ru/oferta_delivery3300';
	}
	if (category === 'courier') {
		return 'https://moysamokat.ru/oferta_delivery2800';
	}
	if (discountCode.toUpperCase() === 'NEW_USER') {
		return 'https://www.moysamokat.ru/oferta2900';
	}
	return 'https://www.moysamokat.ru/oferta';
};
