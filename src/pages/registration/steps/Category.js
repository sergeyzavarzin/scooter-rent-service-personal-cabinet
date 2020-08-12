import React from 'react';
import { Button } from 'antd';

import { redirect } from '../../../utils/redirect';

export const Category = ({ push, city }) => (
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
            push(`/registration/client?discountCode=USER_NEW_GEN&city=${city}`)
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
            push(`/registration/courier?discountCode=NEW_COURIER&city=${city}`)
        }
      >
        Для курьеров
      </Button>
    </div>
  </>
)
