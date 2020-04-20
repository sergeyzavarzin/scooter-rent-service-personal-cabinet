import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { login } from '../../globals/services/login';

import './Login.scss';

class Login extends React.Component {
	state = {
		isLoading: false,
	};

	onFinish = values => {
		this.setState({ isLoading: true });
		login(values.email, values.password)
			.then(result => {
				localStorage.setItem('token', result.accessToken);
				localStorage.setItem(
					'userInfo',
					JSON.stringify({
						email: result.email,
						phone: result.phone,
						lastName: result.lastName,
						firstName: result.firstName,
						patronymic: result.patronymic,
						subscriptionId: result.subscriptionId,
					})
				);
				window.location.href = '/';
			})
			.catch(error => console.log(error))
			.finally(() => this.setState({ isLoading: true }));
	};

	render() {
		const { isLoading } = this.state;
		return (
			<div className='login-page'>
				<div className='login-form'>
					<h1>Вход</h1>
					<Form
						name='login'
						className='login-form__form'
						onFinish={this.onFinish}
					>
						<Form.Item
							name='email'
							rules={[{ required: true, message: 'Укажите логин' }]}
						>
							<Input
								prefix={<UserOutlined className='site-form-item-icon' />}
								placeholder='E-mail'
							/>
						</Form.Item>
						<Form.Item
							name='password'
							rules={[{ required: true, message: 'Введите пароль' }]}
						>
							<Input.Password
								prefix={<LockOutlined className='site-form-item-icon' />}
								type='password'
								placeholder='Пароль'
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								className='login-form__button'
								loading={isLoading}
							>
								Войти
							</Button>
						</Form.Item>
						<div className='login-form__links'>
							<Link to='/forgot'>Я забыл пароль</Link>
							<Link to='/registration'>Регистрация</Link>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
