import React from 'react';
import { inject, observer } from 'mobx-react';
import { Typography } from 'antd';

import './Help.scss';

const Help = ({ store }) => {
	return (
		<div className='help-page'>
			<Typography.Title level={1}>Помощь</Typography.Title>
			<div className='page-wrapper'>
				<div className='help-page__wrapper'>
					<a
						href='https://google.com'
						target='_blank'
						rel='noopener noreferrer'
					>
						Инструкция по испоьзованию самоката.pdf
					</a>
				</div>
			</div>
		</div>
	);
};

export default inject('store')(observer(Help));
