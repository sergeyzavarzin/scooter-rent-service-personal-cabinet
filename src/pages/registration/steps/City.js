import React from 'react';
import { Button } from 'antd';

export const Cities = [
  {
    en: 'Moskva',
    ru: 'Москва',
  },
  {
    en: 'Kazan',
    ru: 'Казань',
  },
];

export const City = ({ push }) => (
  <>
    <h1>Выберите город</h1>
    <div>
      {Cities.map((city) => (
        <Button
          type='primary'
          htmlType='submit'
          size='large'
          className='registration-form__button'
          onClick={() => push(`/registration/?city=${city.en}`)}
          style={{ marginTop: '15px' }}
          key={city.en}
        >
          {city.ru}
        </Button>
      ))}
    </div>
  </>
)
