import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, notification, Select } from 'antd';

import { dealCategory } from '../../globals/constants/dealCategory';
import { passwordPattern } from '../../constants/passwordPattern';

import { registration } from './Registration.service';
import { getColors } from '../../globals/services/getColors';

import './Registration.scss';

const { Option } = Select;

const Registration = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [category, setCategory] = useState(dealCategory.b2c);
	const [discountCode, setDiscountCode] = useState('');
	const [colors, setColors] = useState([]);
	const [isColorsLoading, setIsColorsLoading] = useState(false);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const category = urlParams.get('offer');
		const discountCodeValue = urlParams.get('discountCode');
		if (category && category.length) {
			setCategory(dealCategory[category]);
		}
		if (discountCodeValue && discountCodeValue.length) {
			setDiscountCode(discountCodeValue);
		}
		setIsColorsLoading(true);
		getColors()
			.then((result) => setColors(result))
			.catch((e) => e)
			.finally(() => setIsColorsLoading(false));
	}, []);

	const onFinish = async (values) => {
		setIsLoading(true);
		registration({
			email: values.email,
			phone: values.phone,
			firstName: values.firstName,
			lastName: values.lastName,
			patronymic: values.patronymic,
			password: values.password,
			color: values.color,
			discountCode,
			...(category.length ? { dealCategory: category } : {}),
		})
			.then((response) => {
				console.log('response', response);
				const { formUrl = null, status } = response;
				if (formUrl) {
					notification.open({
						message: 'Успешно!',
						description: 'Сейчас вы будете перенаправлены на форму оплаты.',
					});
					setTimeout(() => {
						window.location.href = formUrl;
					}, 4000);
				} else if (status === 400) {
					console.log(400, ' ', response);
				} else {
					notification.open({
						message: 'Ошибка.',
						description: 'Попробуйте повторить ваш запрос позднее.',
					});
				}
			})
			.catch((error) => {
				console.log(error);
				console.log(error.message);
				notification.open({
					message: 'Ошибка.',
					description:
						typeof error.message === 'string'
							? error.message
							: 'Попробуйте повторить ваш запрос позднее.',
				});
			})
			.finally(() => setIsLoading(false));
	};

	const onFinishFailed = (errorInfo) => console.log('Failed:', errorInfo);

	return (
		<div className='registration-page'>
			<div className='registration-form'>
				<h1>Регистрация</h1>
				<Form
					name='registration'
					className='registration-form__form'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						name='lastName'
						rules={[{ required: true, message: 'Укажите Вашу фамилию' }]}
					>
						<Input placeholder='Фамилия' />
					</Form.Item>
					<Form.Item
						name='firstName'
						rules={[{ required: true, message: 'Укажите Ваше имя' }]}
					>
						<Input placeholder='Имя' />
					</Form.Item>
					<Form.Item
						name='patronymic'
						rules={[{ required: true, message: 'Укажите Ваше отчество' }]}
					>
						<Input placeholder='Отчество' />
					</Form.Item>
					<Form.Item
						name='email'
						rules={[{ required: true, message: 'Укажите E-mail' }]}
					>
						<Input placeholder='E-mail' />
					</Form.Item>
					<Form.Item
						name='phone'
						rules={[{ required: true, message: 'Укажите Ваш телефон' }]}
					>
						<Input placeholder='Телефон' />
					</Form.Item>
					<Form.Item
						name='color'
						hasFeedback
						validateStatus={isColorsLoading ? 'validating' : null}
						rules={[{ required: true }]}
					>
						<Select
							placeholder='Выберите цвет самоката'
							style={{ textAlign: 'left' }}
						>
							{colors &&
								colors.map(
									(item) =>
										item.value && (
											<Option key={item.label} value={item.label}>
												{item.label}
											</Option>
										)
								)}
						</Select>
					</Form.Item>
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
					<Form.Item
						name='agreement'
						valuePropName='checked'
						rules={[
							{
								required: true,
								message: 'Дайте согласие на обработку данных',
							},
						]}
					>
						<Checkbox style={{ textAlign: 'left', fontSize: 10 }}>
							Даю согласие на{' '}
							<a
								href='https://www.moysamokat.ru/oferta'
								target='_blank'
								rel='noopener noreferrer'
							>
								обработку персональных данных
							</a>{' '}
							и соглашаюсь с{' '}
							<a
								href='https://www.moysamokat.ru/privacy-policy'
								target='_blank'
								rel='noopener noreferrer'
							>
								условиями использования сервиса
							</a>
							.
						</Checkbox>
					</Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						loading={isLoading}
						size='large'
						className='registration-form__button'
					>
						Перейти к оплате
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default Registration;
