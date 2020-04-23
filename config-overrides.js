const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			'@primary-color': '#f9e70d',
			'@link-color': '@blue-6',
			// '@success-color': '#1DA57A',
			// '@warning-color': '#1DA57A',
			// '@error-color': '#1DA57A',
			'@font-size-base': '14px',
			'@text-color': '#2f3640',
			'@text-secondary-color': '#2f3640',
			// button
			'@btn-primary-color': '@text-color',
			// menu
			'@menu-dark-selected-item-icon-color': '@text-color',
			'@menu-dark-selected-item-text-color': '@text-color',
			// layout
			'@layout-body-background':
				'linear-gradient(to bottom, rgba(246,211,101,1), rgba(246,211,101,1))',
		},
	})
);
