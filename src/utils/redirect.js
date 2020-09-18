export const redirect = link => {
	const a = document.createElement('a');
	a.target = '_blank';
	a.href = link;
	a.click();
};
