import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Form, Input, Button, notification } from 'antd';

import { change, changeUserPassword } from '../../globals/services/change';
import { passwordPattern } from '../../constants/passwordPattern';

import './ChangePassword.scss';

const ChangePassword = ({
	store: {
		userStore: { isUserLogged },
	},
	history: { push },
}) => {
	const [hash, setHash]  = useState(null)
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const hash = urlParams.get('h');
		if (hash && hash.length) {
			setHash(hash);
		} else if (!isUserLogged) {
			window.location.href = '/';
		}
	}, [isUserLogged, setHash]);

	const onFinish = async (values) => {
		setIsLoading(true);
		try {
			if (isUserLogged){
				await changeUserPassword(values.password, values.oldPassword);
			} else {
				await change(hash, values.password);
			}
			notification.open({
				message: 'Успешно.',
				description: 'Пароль успешно изменен.',
			});
			setTimeout(() => {
				push('/');
			}, 3000);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='login-page'>
			<div className='form'>
				<h1>Сменить пароль</h1>
				<Form name='login' onFinish={onFinish} className='form__form'>

					{isUserLogged && 
						<Form.Item
							name='oldPassword'
							rules={[
								{ required: true, message: 'Введите свой пароль' },
							]}
							hasFeedback
						>
							<Input.Password placeholder='Введите текущий пароль' />
						</Form.Item>
					}

					<Form.Item
						name='password'
						rules={[
							{ required: true, message: 'Придумайте пароль' },
							{ pattern: passwordPattern, message: 'Слабый пароль.' },
						]}
						hasFeedback
					>
						<Input.Password placeholder='Придумайте пароль' />
					</Form.Item>

					<Form.Item
						name='retryPassword'
						rules={[
							{ required: true, message: 'Укажите пароль повторно' },
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject('Пароли не совпадают');
								},
							}),
						]}
						hasFeedback
					>
						<Input.Password placeholder='Повторите пароль' />
					</Form.Item>
					
					<Form.Item>
						<Button
							size='large'
							type='primary'
							htmlType='submit'
							loading={isLoading}
							className='form__button'
						>
							Сменить пароль
						</Button>
					</Form.Item>

				</Form>
			</div>
		</div>
	);
}

export default withRouter(inject('store')(observer(ChangePassword)));
