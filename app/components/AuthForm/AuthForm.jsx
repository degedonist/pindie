'use client'

import { useState, useEffect } from 'react';
import Styles from './AuthForm.module.css';
import { authorize, isResponseOk } from '@/app/api/api-utils';
import { endpoints } from '@/app/api/config';
import { useStore } from '@/app/store/app-store';
import { useRouter, usePathname } from 'next/navigation';

export const AuthForm = (props) => {

  let [authData, setAuthData] = useState({ email: '', password: '' });
  let [message, setMessage] = useState({ status: null, text: null });

  const store = useStore()
  const router = useRouter();
  const pathname = usePathname();

  const handleInput = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const register = () => {
    router.push('/register');
    {pathname != "/login" && props.close();}
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await authorize(endpoints.auth, authData);
    if (isResponseOk(userData)) {
      store.login({...userData, id: userData._id}, userData.jwt);
      setMessage({ status: "success", text: "Вы авторизовались!" })
    } else {
      setMessage({ status: "error", text: "Неверные почта или пароль" });
    }
  };

  useEffect(() => {
    let timer; 
    if (store.user) {
      timer = setTimeout(() => {
        props.close();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [store.user, pathname]);

  return (
    <div style={{display: "flex", flexDirection:"column", justifyContent: "center"}}>
      <form onSubmit={handleSubmit} className={Styles['form']}>
        <h2 className={Styles['form__title']}>Авторизация</h2>
        <div className={Styles['form__fields']}>
          <label className={Styles['form__field']}>
            <span className={Styles['form__field-title']}>Email</span>
            <input onInput={handleInput} name={'email'} className={Styles['form__field-input']} type="email" placeholder="hello@world.com"/>
          </label>
          <label className={Styles['form__field']}>
            <span className={Styles['form__field-title']}>Пароль</span>
            <input onInput={handleInput} name={'password'} className={Styles['form__field-input']} type="password" placeholder='***********'/>
          </label>
        </div>
        {message.status && (
          <p className={Styles['form__message']}>{message.text}</p>)
        }
        <div className={Styles['form__actions']}>
          <button className={Styles['form__reset']} type="reset">Очистить</button>
          <button className={Styles['form__submit']} type="submit">Войти</button>
        </div>
        <p className={Styles["form__question"]}>⬇ Нет аккаунта? ⬇</p>
      </form>
      <button className={Styles['form__submit']} style={{backgroundColor: "#3caa3c"}} onClick={register}>Зарегистрироваться</button>
    </div>
  ) 
};
