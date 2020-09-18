import React from 'react';
import classNames from 'classnames';

import { Form, Input, Button } from 'antd';
import { passwordPattern } from '../../../constants/passwordPattern';
import { getPhoneRegexpSymbolsFromStart } from '../../../utils/getNextPhoneValue';

export const FormUserInfo = ({ push, active }) => (
  <Form
    name='step-1'
    className={classNames(
      'registration-form__form registration-form__form--main',
      {
        'registration-form__form--active': active,
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
);
