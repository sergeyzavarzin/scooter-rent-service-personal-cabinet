import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './Login.scss';

class Login extends React.Component {
	onFinish = () => {
		localStorage.setItem('token', 'asddasdbj$^%gjsbxjGHFuy');
		window.location.href = '/';
	};

	render() {
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
							name='username'
							rules={[{ required: true, message: 'Укажите логин' }]}
						>
							<Input
								prefix={<UserOutlined className='site-form-item-icon' />}
								placeholder='Логин'
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
