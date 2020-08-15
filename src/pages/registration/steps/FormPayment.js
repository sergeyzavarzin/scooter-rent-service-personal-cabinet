import React from 'react';
import classNames from 'classnames';

import { Form, Button, Checkbox, Radio } from 'antd';
import { getOfferLink } from '../../../utils/getOfferLink';

export const FormPayment = ({ active, category, discountCode, isLoading, setStep, city }) => (
  <Form
    name='step-3'
    className={classNames(
      'registration-form__form registration-form__form--payment',
      {
        'registration-form__form--active': active,
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
        ,
        <a
          href={`${city === '1' ? 'https://www.moysamokat.ru/privacy-kazan' : 'https://www.moysamokat.ru/privacy-policy'}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          обработку персональных данных
        </a>{' '}
        и соглашаюсь с{' '}
        <a
          href={getOfferLink(category, discountCode, city)}
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
);
