import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { registration } from './Registration.service';
import { getColors } from '../../globals/services/getColors';
import { getNextPhoneValue } from '../../utils/getNextPhoneValue';
import getCookie from '../../utils/getCookie';

import { City, Cities } from './steps/City';
import { Category } from './steps/Category';
import { FormUserInfo } from './steps/FormUserInfo';
import { FormSettings } from './steps/FormSettings';
import { FormPayment } from './steps/FormPayment';

import './Registration.scss';

const Registration = (props) => {
	const {
		history: { push },
		match: {
			params: { category = null },
		},
		store: {
			globalCity = '0',
			setGlobalCity,
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
		const cityNameValue = urlParams.get('city');
		if (cityNameValue && Cities.find(value => value.en === cityNameValue)) {
			setGlobalCity(String(Cities.findIndex(value => value.en === cityNameValue)));
		} else {
			setGlobalCity('');
		}
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
				city: globalCity,
			};
			await registration(registrationData, payNow, globalCity);
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
				{!globalCity && <City push={push} discountCode={discountCode} />}
				{!category && globalCity && <Category push={push} city={Cities[globalCity].en} discountCode={discountCode} />}
				{category && globalCity && (
					<>
						<h1>Регистрация {category === 'courier' && <>для курьеров</>}</h1>
						{!!step && <h1>Шаг {step} из 3</h1>}
						<Form.Provider 
							onFormFinish={handleFormFinish}
							onFormChange={handleFormChange}
						>
							<FormUserInfo push={push} active={step === 1} />
							<FormSettings
								active={step === 2} 
								isColorsLoading={isColorsLoading} 
								colors={colors} 
								category={category} 
								isLoading={isLoading} 
								setStep={setStep}
							/>
							<FormPayment 
								active={step === 3}
								category={category}
								discountCode={discountCode}
								isLoading={isLoading}
								setStep={setStep}
								city={globalCity}
							/>
						</Form.Provider>
					</>
				)}
			</div>
		</div>
	);
};

export default withRouter(inject('store')(observer(Registration)));
