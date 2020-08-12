import React from 'react';
import classNames from 'classnames';

import { Form, Button, Select } from 'antd';
import { filterColorsForCategory } from '../_utils';

const { Option } = Select;

export const FormSettings = ({ active, isColorsLoading, colors, category, isLoading, setStep }) => (
  <Form
    name='step-2'
    className={classNames(
      'registration-form__form registration-form__form--details',
      {
        'registration-form__form--active': active,
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
);
