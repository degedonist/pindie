'use client'

import { useState, useEffect } from 'react';
import Styles from './RegForm.module.css';
import { isResponseOk, register } from '@/app/api/api-utils';
import { endpoints } from '@/app/api/config';
import { useStore } from '@/app/store/app-store';

export const RegForm = (props) => {

  let [regData, setRegData] = useState({ username: '', email: '', password: '' });
  let [message, setMessage] = useState({ mesStatus: null, text: null });

  const store = useStore();

  const handleInput = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await register(endpoints.reg, regData);
    if (isResponseOk(userData)) {
        setMessage({mesStatus: "success", text: "Вы зарегестрировались!"});
        store.login(userData.user, userData.jwt);
    } else {
          setMessage({mesStatus: "error", text: "Проверьте введённые данные"});
    }
  }

  useEffect(() => {
    let timer; 
    if (message.mesStatus == "success") {
      timer = setTimeout(() => {
        props.close();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [message.mesStatus]);

  return (
    <form onSubmit={handleSubmit} className={Styles['form']}>
      <h2 className={Styles['form__title']}>Регистрация</h2>
      <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Имя пользователя</span>
          <input onInput={handleInput} name={'username'} className={Styles['form__field-input']} type="username" placeholder="somebodyguy"/>
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input onInput={handleInput} name={'email'} className={Styles['form__field-input']} type="email" placeholder="hello@world.com"/>
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input onInput={handleInput} name={'password'} className={Styles['form__field-input']} type="password" placeholder='***********'/>
        </label>
      </div>
      {message.mesStatus && (
        <p className={Styles['form__message']}>{message.text}</p>)
      }
      <div className={Styles['form__actions']}>
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} type="submit">Зарегистрироваться</button>
      </div>
    </form>
  ) 
};
