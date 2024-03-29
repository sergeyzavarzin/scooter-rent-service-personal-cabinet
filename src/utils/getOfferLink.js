export const getOfferLink = (category, discountCode) => {
	if (category === 'courier' && discountCode.toUpperCase() === 'OLD_FRIEND') {
		return 'https://moysamokat.ru/oferta_delivery_2500';
	}
	if (category === 'courier' && discountCode.toUpperCase() === 'NEW_COURIER') {
		return 'https://www.moysamokat.ru/oferta_delivery3300';
	}
	if (category === 'courier' && discountCode.toUpperCase() === 'COURIER2020') {
		return 'https://www.moysamokat.ru/oferta_delivery3900';
	}
	if (category === 'courier') {
		return 'https://moysamokat.ru/oferta_delivery2800';
	}
	if (discountCode.toUpperCase() === 'NEW_USER') {
		return 'https://www.moysamokat.ru/oferta2900';
	}
	if (discountCode.toUpperCase() === 'USER2020') {
		return 'https://www.moysamokat.ru/oferta3900';
	}
	return 'https://www.moysamokat.ru/oferta';
};
