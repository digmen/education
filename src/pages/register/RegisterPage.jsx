import React, { useState } from 'react';
import axios from 'axios'; // Добавляем импорт Axios
import styles from "./register.module.css";

import logo from '../../assets/icon/logo.svg'

export default function RegisterPage() {
    const [name, setName] = useState(''); // Добавляем состояние для имени
    const [password, setPassword] = useState(''); // Добавляем состояние для пароля
    const [gradeId, setGradeId] = useState(''); // Добавляем состояние для уровня
    // const [subjectsId, setSubjectsId] = useState(''); // Добавляем состояние для предметов

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://34.42.42.56:8000/api/v1/account/user/', {
                username: name,
                password: password,
                password_confirmation: password,
                grade: gradeId,
                subjects: 1,
            });
            console.log(response); // Выводим ответ в консоль для проверки
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className={styles.register__container}>
            <div className={styles.register__title}>
                <img src={logo} alt='logo' />
                <h1>A world best education app for anyone.</h1>
            </div>
            <div>
                <form className={styles.register__form}>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input placeholder='Choose your grade from 1 to 11' maxLength={11} minLength={1} value={gradeId} onChange={(e) => setGradeId(e.target.value)} />
                    {/* Добавляем обработчик изменений для уровня */}
                    <div className={styles.register__objects__text}>
                        <div className={styles.register__objects__line}></div>
                        <span className={styles.register__objects__title}>Objects</span>
                        <span className={styles.register__objects__line}></span>
                    </div>
                    <div className={styles.form__btn}>
                        <button className={styles.form__lesson__btn}>
                            <img src={logo} alt='logo' />
                            Geography
                        </button>
                        <button className={styles.form__lesson__btn}>
                            <img src={logo} alt='logo' />
                            History
                        </button>
                        <button className={styles.form__lesson__btn}>
                            <img src={logo} alt='logo' />
                            Human and Society
                        </button>
                    </div>
                    <span className={styles.register__btn__link}>Sign in</span>
                    <button onClick={handleRegister} className={styles.register__btn}>Sign up</button>
                </form>
            </div>
        </section>
    )
}
