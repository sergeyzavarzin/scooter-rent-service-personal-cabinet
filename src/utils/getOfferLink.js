export const getOfferLink = (category, discountCode) => {
	if (category === '4' && discountCode === 'OLD_FRIEND') {
		return 'https://moysamokat.ru/oferta_delivery2500';
	}
	if (category === '4') {
		return 'https://moysamokat.ru/oferta_delivery2800';
	}
	return 'https://www.moysamokat.ru/oferta';
};
