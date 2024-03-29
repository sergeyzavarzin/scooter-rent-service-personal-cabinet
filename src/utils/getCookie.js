export default function getCookie(name) {
	let matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' +
			name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + // eslint-disable-line
				'=([^;]*)'
		)
	);
	return matches ? decodeURIComponent(matches[1]) : null;
}
