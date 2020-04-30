import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';

import { change } from '../../globals/services/change';
import { passwordPattern } from '../../constants/passwordPattern';

import './ChangePassword.scss';

class ChangePassword extends React.Component {
	state = {
		hash: null,
		isLoading: false,
	};

	componentDidMount() {
		const urlParams = new URLSearchParams(window.location.search);
		const hash = urlParams.get('h');
		if (hash && hash.length) {
			this.setState({ hash });
		} else {
			window.location.href = '/';
		}
	}

	onFinish = (values) => {
		this.setState({ isLoading: true });
		change(this.state.hash, values.password)
			.then(() => {
				notification.open({
					message: 'Успешно.',
					description: 'Пароль успешно изменен.',
				});
				setTimeout(() => {
					this.props.history.push('/');
				}, 3000);
			})
			.catch((error) => {
				if (
					error.response.data.message &&
					typeof error.response.data.message === 'string'
				) {
					notification.open({
						message: 'Ошибка.',
						description:
							error.response.data.message ||
							'Попробуйте повторить ваш запрос позднее.',
					});
				}
			})
			.finally(() => this.setState({ isLoading: false }));
	};

	render() {
		const { isLoading } = this.state;
		return (
			<div className='login-page'>
				<div className='form'>
					<h1>Сменить пароль</h1>
					<Form name='login' onFinish={this.onFinish} className='form__form'>
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
}

export default withRouter(ChangePassword);
