export const getOfferLink = (category, discountCode) => {
	if (category === '4' && discountCode === 'OLD_FRIEND') {
		return 'https://moysamokat.ru/oferta_delivery_2500';
	}
	if (category === '4') {
		return 'https://moysamokat.ru/oferta_delivery2800';
	}
	if (discountCode === 'NEW_USER') {
		return 'https://www.moysamokat.ru/oferta2900';
	}
	if (discountCode === 'NEW_COURIER') {
		return 'https://www.moysamokat.ru/oferta_delivery3300';
	}
	return 'https://www.moysamokat.ru/oferta';
};
