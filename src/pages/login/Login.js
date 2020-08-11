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

	onFinish = async (values) => {
		this.setState({ isLoading: true });
		try {
			await login(values.email, values.password).then(() => {
				window.location.href = '/';
			});
		} finally {
			this.setState({ isLoading: false });
		}
	};

	render() {
		return (
			<div className='login-page'>
				<div className='form'>
					<h1>Вход</h1>
					<Form name='login' className='form__form' onFinish={this.onFinish}>
						<Form.Item
							name='email'
							rules={[
								{
									type: 'email',
									message: 'Введите валидный E-mail',
								},
								{
									required: true,
									message: 'Введите E-mail',
								},
							]}
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
								size='large'
								className='form__button'
								loading={this.state.isLoading}
							>
								Войти
							</Button>
						</Form.Item>
						<div className='form__links'>
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
