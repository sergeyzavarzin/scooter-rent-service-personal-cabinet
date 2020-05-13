import React, { useEffect, useState } from 'react';
import {
	Form,
	Input,
	Button,
	Checkbox,
	notification,
	Select,
	Radio,
} from 'antd';
import MaskedInput from 'antd-mask-input';
import classNames from 'classnames';

import { dealCategory } from '../../globals/constants/dealCategory';
import { passwordPattern } from '../../constants/passwordPattern';
import { registration } from './Registration.service';
import { getColors } from '../../globals/services/getColors';
import { getOfferLink } from '../../utils/getOfferLink';

import './Registration.scss';

const { Option } = Select;

const Registration = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [category, setCategory] = useState(dealCategory.b2c);
	const [discountCode, setDiscountCode] = useState('');
	const [colors, setColors] = useState([
		{ label: 'Черный', value: true },
		{ label: 'Белый', value: true },
	]);
	const [isColorsLoading, setIsColorsLoading] = useState(false);
	const [step, setStep] = useState(1);
	const [formValues, setValues] = useState({});

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
	}, []);

	const onFinish = async (values, payNow = false) => {
		setIsLoading(true);
		registration(
			{
				email: values.email,
				phone: values.phone,
				firstName: values.firstName,
				lastName: values.lastName,
				patronymic: values.patronymic,
				password: values.password,
				color: values.color,
				connectType: values.connectType,
				deliveryType: values.deliveryType,
				discountCode,
				...(category.length ? { dealCategory: category } : {}),
			},
			payNow
		)
			.then((response) => {
				const { formUrl = null } = response;
				if (payNow && formUrl) {
					notification.open({
						message: 'Успешно!',
						description: 'Сейчас вы будете перенаправлены на форму оплаты.',
					});
					setTimeout(() => {
						window.location.href = formUrl;
					}, 4000);
				} else {
					notification.open({
						message: 'Успешно!',
						description:
							'Вы можете оплатить заказ внутри личного кабинета в любой момент.',
					});
					setTimeout(() => {
						window.location.href = '/';
					}, 4000);
				}
			})
			.finally(() => setIsLoading(false));
	};

	const handleFormFinish = async (name, { values }) => {
		if (name === 'step-1') {
			setValues({ ...formValues, ...values });
			setStep(2);
			getColors()
				.then((result) => {
					const isOneAvailable = result.reduce(
						(acc, curr) => acc || curr.value,
						false
					);
					if (isOneAvailable) {
						setColors(result);
					}
				})
				.catch((e) => e)
				.finally(() => setIsColorsLoading(false));
		} else if (name === 'step-2') {
			setValues({ ...formValues, ...values });
			setStep(3);
		} else {
			await onFinish(formValues, values.payType === 1);
		}
	};

	return (
		<div className='registration-page'>
			{console.log(colors)}
			<div className='registration-form'>
				<h1>Регистрация</h1>
				<h1>Шаг {step} из 3</h1>
				<Form.Provider onFormFinish={handleFormFinish}>
					<Form
						name='step-1'
						className={classNames(
							'registration-form__form registration-form__form--main',
							{
								'registration-form__form--active': step === 1,
							}
						)}
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
							rules={[
								{ required: true, message: 'Укажите Ваш телефон' },
								{ min: 15, message: 'Не верный формат телефона' },
								{ max: 15, message: 'Не верный формат телефона' },
							]}
						>
							<MaskedInput
								mask='#(111)111-11-11'
								size={11}
								placeholder='Телефон'
							/>
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
						<Button
							type='primary'
							htmlType='submit'
							size='large'
							className='registration-form__button'
						>
							Далее
						</Button>
					</Form>
					<Form
						name='step-2'
						className={classNames(
							'registration-form__form registration-form__form--details',
							{
								'registration-form__form--active': step === 2,
							}
						)}
					>
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
								{colors.map(
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
							name='connectType'
							rules={[
								{ required: true, message: 'Укажите удобный способ связи' },
							]}
						>
							<Select
								placeholder='Удобный способ связи'
								style={{ textAlign: 'left' }}
							>
								<Option value='Звонок по телефону'>Звонок по телефону</Option>
								<Option value='Сообщение в WhatsApp'>
									Сообщение в WhatsApp
								</Option>
								<Option value='Сообщение в Telegram'>
									Сообщение в Telegram
								</Option>
							</Select>
						</Form.Item>
						<Form.Item
							name='deliveryType'
							rules={[
								{ required: true, message: 'Укажите удобный способ доставки' },
							]}
						>
							<Select
								placeholder='Способ доставки'
								style={{ textAlign: 'left' }}
							>
								<Option value='Курьером'>Доставка курьером</Option>
								<Option value='Самовывоз'>Самовывоз</Option>
							</Select>
						</Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							loading={isLoading}
							size='large'
							className='registration-form__button'
						>
							Далее
						</Button>
					</Form>
					<Form
						name='step-3'
						className={classNames(
							'registration-form__form registration-form__form--payment',
							{
								'registration-form__form--active': step === 3,
							}
						)}
					>
						<Form.Item
							name='payType'
							label='Способ оплаты'
							rules={[
								{
									required: true,
									message: 'Выберите способ оплаты',
								},
							]}
						>
							<Radio.Group>
								<Radio value={1}>Картой на сайте</Radio>
								<Radio value={2}>Оплата при получении</Radio>
							</Radio.Group>
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
									href='https://www.moysamokat.ru/privacy-policy'
									target='_blank'
									rel='noopener noreferrer'
								>
									обработку персональных данных
								</a>{' '}
								и соглашаюсь с{' '}
								<a
									href={getOfferLink(category, discountCode)}
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
							Завершить регистрацию
						</Button>
					</Form>
				</Form.Provider>
			</div>
		</div>
	);
};

export default Registration;
