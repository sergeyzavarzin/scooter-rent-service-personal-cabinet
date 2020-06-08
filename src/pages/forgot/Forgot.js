import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { forgot } from '../../globals/services/forgot';

import './Forgot.scss';

class Forgot extends React.Component {
	state = {
		isLoading: false,
	};

	onFinish = (values) => {
		this.setState({ isLoading: true });
		forgot(values.email)
			.then(() => {
				notification.open({
					message: 'Успешно.',
					description: 'Ссылка для смены пароля отправлена вам на почту.',
				});
				setTimeout(() => {
					this.props.history.push('/');
				}, 3000);
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
						<div className='form__links form__links--centered'>
							<Link to='/'>Назад</Link>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}

export default withRouter(Forgot);
