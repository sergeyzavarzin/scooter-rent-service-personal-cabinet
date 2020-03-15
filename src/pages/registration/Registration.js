import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Input, Button, Select} from 'antd';

import './Registration.scss';

class Registration extends React.Component {

  state = {
    step: 1,
  };

  onFinish = () => 1;

  render() {
    const {step} = this.state;
    return (
      <div className='registration-page'>
        <div className='registration-form'>
          <h1>Регистрация</h1>
          <Form
            name='registration'
            className='registration-form__form'
            onFinish={this.onFinish}
          >
            <h4>Шаг {step}/3:</h4>
            {
              step === 1 && <>
                <Form.Item
                  name='firstName'
                  rules={[{required: true, message: 'Укажите Ваше имя'}]}
                >
                  <Input placeholder='Ваше Имя'/>
                </Form.Item>
                <Form.Item
                  name='lastName'
                  rules={[{required: true, message: 'Укажите Вашу фамилию'}]}
                >
                  <Input placeholder='Ваша Фамилия'/>
                </Form.Item>
                <Form.Item
                  name='email'
                  rules={[{required: true, message: 'Укажите E-mail'}]}
                >
                  <Input placeholder='E-mail'/>
                </Form.Item>
                <Form.Item
                  name='phone'
                  rules={[{required: true, message: 'Укажите Ваш телефон'}]}
                >
                  <Input placeholder='Телефон'/>
                </Form.Item>
                <Form.Item>
                  <Button
                    type='primary'
                    className='registration-form__button'
                    onClick={() => this.setState({step: 2})}
                  >
                    Далее
                  </Button>
                </Form.Item>
                <div className='registration-form__links'>
                  <Link to='/login'>
                    У меня уже есть аккаунт
                  </Link>
                </div>
              </>
            }
            {
              step === 2 && <>
                <Form.Item
                  name='password'
                  rules={[{required: true, message: 'Придумайте пароль'}]}
                >
                  <Input placeholder='Придумайте пароль'/>
                </Form.Item>
                <Form.Item
                  name='retryPassword'
                  rules={[{required: true, message: 'Укажите пароль повторно'}]}
                >
                  <Input placeholder='Повторите пароль'/>
                </Form.Item>
                <Form.Item>
                  <Button
                    type='primary'
                    className='registration-form__button'
                    onClick={() => this.setState({step: 3})}
                  >
                    Далее
                  </Button>
                </Form.Item>
              </>
            }
            {
              step === 3 && <>
                <Form.Item>
                  <div style={{textAlign: 'left', marginBottom: 7}}>
                    Выберите цвет самоката:
                  </div>
                  <Select>
                    <Select.Option value="white">Белый</Select.Option>
                    <Select.Option value="black">Черный</Select.Option>
                  </Select>
                </Form.Item>
                <Button
                  type='primary'
                  className='registration-form__button'
                  onClick={() => 1}
                >
                  Перейти к оплате
                </Button>
              </>
            }
          </Form>
        </div>
      </div>
    )
  }
}

export default Registration;
