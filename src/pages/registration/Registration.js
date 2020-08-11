import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Select, Radio } from 'antd';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { passwordPattern } from '../../constants/passwordPattern';
import { registration } from './Registration.service';
import { getColors } from '../../globals/services/getColors';
import { getOfferLink } from '../../utils/getOfferLink';
import { getNextPhoneValue, getPhoneRegexpSymbolsFromStart } from '../../utils/getNextPhoneValue';
import { filterColorsForCategory } from './_utils';
import getCookie from '../../utils/getCookie';
import { redirect } from '../../utils/redirect';

import './Registration.scss';

const { Option } = Select;

const Registration = (props) => {
	const {
		history: { push },
		match: {
			params: { category = null },
		},
	} = props;
	const [isLoading, setIsLoading] = useState(false);
	const [discountCode, setDiscountCode] = useState('');
	const [colors, setColors] = useState([
		{ label: 'Черный', value: true },
		{ label: 'Белый', value: true },
	]);
	const [step, setStep] = useState(1);
	const [formValues, setValues] = useState({});
	const [prevPhoneValue, setPrevPhoneValue] = useState('');
	const [isColorsLoading, setIsColorsLoading] = useState(false);

	const search = window.location.search;
	const params = new URLSearchParams(search);
	const callbackUrl = params.get('callbackUrl');
	if(callbackUrl) {
		localStorage.setItem('callbackUrl', callbackUrl);
	}

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const discountCodeValue = urlParams.get('discountCode');
		if (discountCodeValue && discountCodeValue.length) {
			setDiscountCode(discountCodeValue);
		}
		setIsColorsLoading(true);
		getColors()
			.then((result) => {
				const isOneAvailable = result.reduce(
					(acc, curr) => acc || curr.value,
					false,
				);
				if (isOneAvailable) {
					setColors(result);
				}
			})
			.catch((e) => e)
			.finally(() => setIsColorsLoading(false));
	}, [window.location.search]); // eslint-disable-line

	const onFinish = async (values, payNow = false) => {
		setIsLoading(true);
		try {
			const registrationData = {
				email: values.email.trim(), // trim all spaces to prevent email validation error at server
				phone: values.phone,
				firstName: values.firstName,
				lastName: values.lastName,
				patronymic: values.patronymic,
				password: values.password,
				color: values.color,
				connectType: values.connectType,
				deliveryType: values.deliveryType,
				discountCode,
				dealCategory: category === 'courier' ? '4' : '2',
				utm: {
					source: getCookie('utm_source') || 'Отсутствует',
					medium: getCookie('utm_medium') || 'Отсутствует',
					campaign: getCookie('utm_campaign') || 'Отсутствует',
					content: getCookie('utm_content') || 'Отсутствует',
					term: getCookie('utm_term') || 'Отсутствует',
				},
			};
			await registration(registrationData, payNow);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFormFinish = async (name, { values }) => {
		if (name === 'step-1') {
			setValues({ ...formValues, ...values });
			setStep(2);
		} else if (name === 'step-2') {
			setValues({ ...formValues, ...values });
			setStep(3);
		} else {
			await onFinish(formValues, values.payType === 1);
		}
	};

	const handleFormChange = (name, { changedFields, forms }) => {
		if (name !== 'step-1' || !changedFields.length || changedFields[0].name[0] !== 'phone') return;
		const form = forms['step-1'];
		const phone = getNextPhoneValue(form.getFieldValue('phone'), prevPhoneValue);
		setPrevPhoneValue(phone);
		form.setFieldsValue({ phone });
	};

	return (
		<div className='registration-page'>
			<div className='registration-form'>
				{!category ? (
					<>
						<h1>Регистрация</h1>
						<div>
							<Button
								type='primary'
								htmlType='submit'
								size='large'
								className='registration-form__button'
								onClick={() =>
									process.env.REACT_APP_IS_GOODS_OVER === 'true' ?
										redirect('https://www.moysamokat.ru/zakaz') :
										push('/registration/client?discountCode=USER_NEW_GEN')
								}
								style={{ margin: '15px 0' }}
							>
								Для личного пользования
							</Button>
							<Button
								type='primary'
								htmlType='submit'
								size='large'
								className='registration-form__button'
								onClick={() =>
									process.env.REACT_APP_IS_GOODS_OVER === 'true' ?
										redirect('https://www.moysamokat.ru/business') :
										push('/registration/courier?discountCode=NEW_COURIER')
								}
							>
								Для курьеров
							</Button>
						</div>
					</>
				) : (
					<>
						<h1>Регистрация {category === 'courier' && <>для курьеров</>}</h1>
						{!!step && <h1>Шаг {step} из 3</h1>}
						<Form.Provider 
							onFormFinish={handleFormFinish}
							onFormChange={handleFormChange}
						>
							<Form
								name='step-1'
								className={classNames(
									'registration-form__form registration-form__form--main',
									{
										'registration-form__form--active': step === 1,
									},
								)}
							>
								<Form.Item
									name='lastName'
									rules={[{ required: true, message: 'Укажите Вашу фамилию' }]}
								>
									<Input placeholder='Фамилия'/>
								</Form.Item>
								<Form.Item
									name='firstName'
									rules={[{ required: true, message: 'Укажите Ваше имя' }]}
								>
									<Input placeholder='Имя'/>
								</Form.Item>
								<Form.Item
									name='patronymic'
									rules={[{ required: true, message: 'Укажите Ваше отчество' }]}
								>
									<Input placeholder='Отчество'/>
								</Form.Item>
								<Form.Item
									name='email'
									rules={[{ required: true, message: 'Укажите E-mail' }]}
								>
									<Input placeholder='E-mail'/>
								</Form.Item>
								<Form.Item
									name='phone'
									rules={[
										{ required: true, message: 'Укажите Ваш телефон' },
										{
											pattern: getPhoneRegexpSymbolsFromStart(17),
											message: "Неполный номер телефона"
										},
									]}
								>
									<Input placeholder='Телефон'/>
								</Form.Item>
								<Form.Item
									name='password'
									rules={[
										{ required: true, message: 'Придумайте пароль' },
										{ pattern: passwordPattern, message: 'Слабый пароль.' },
									]}
									hasFeedback
								>
									<Input.Password placeholder='Придумайте пароль'/>
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
									<Input.Password placeholder='Повторите пароль'/>
								</Form.Item>
								<Button
									type='primary'
									htmlType='submit'
									size='large'
									className='registration-form__button'
								>
									Далее
								</Button>
								<Button
									type='link'
									onClick={() => push('/login')}
									block
									style={{ marginTop: 15 }}
								>
									У меня есть аккаунт
								</Button>
							</Form>
							<Form
								name='step-2'
								className={classNames(
									'registration-form__form registration-form__form--details',
									{
										'registration-form__form--active': step === 2,
									},
								)}
							>
								<Form.Item
									name='color'
									hasFeedback
									validateStatus={isColorsLoading ? 'validating' : null}
									rules={[{ required: true, message: 'Выберите цвет' }]}
								>
									<Select
										placeholder='Выберите цвет самоката'
										style={{ textAlign: 'left' }}
									>
										{colors.filter(filterColorsForCategory(category)).map(
											(item) =>
												item.value && (
													<Option key={item.label} value={item.label}>
														{item.label}
													</Option>
												),
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
										<Option value='Звонок по телефону'>
											Звонок по телефону
										</Option>
										<Option value='Сообщение в WhatsApp'>
											Сообщение в WhatsApp
										</Option>
										{/* <Option value='Сообщение в Telegram'>
											Сообщение в Telegram
										</Option> */}
									</Select>
								</Form.Item>
								<Form.Item
									name='deliveryType'
									rules={[
										{
											required: true,
											message: 'Укажите удобный способ доставки',
										},
									]}
								>
									<Select
										placeholder='Способ доставки'
										style={{ textAlign: 'left' }}
									>
										{category !== 'courier' && (
											<Option value='Курьером'>Доставка курьером</Option>
										)}
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
								<Button
									type='link'
									onClick={() => setStep(1)}
									block
									style={{ marginTop: 15 }}
								>
									Назад
								</Button>
							</Form>
							<Form
								name='step-3'
								className={classNames(
									'registration-form__form registration-form__form--payment',
									{
										'registration-form__form--active': step === 3,
									},
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
								<Button
									type='link'
									onClick={() => setStep(2)}
									block
									style={{ marginTop: 15 }}
								>
									Назад
								</Button>
							</Form>
						</Form.Provider>
					</>
				)}
			</div>
		</div>
	);
};

export default withRouter(Registration);
