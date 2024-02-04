import React from 'react'
import styles from "./login.module.css";

import logo from '../../assets/icon/logo.svg'
import { Link } from 'react-router-dom';

export default function LoginPage() {

    return (
        <section className={styles.register__container}>
            <div className={styles.register__title}>
                <img src={logo} alt='logo' />
                <h1>A world best education app for anyone.</h1>
            </div>
            <div>
                <form className={styles.register__form}>
                    <input placeholder='Name' />
                    <input placeholder='Password' />
                    <input placeholder='Choose your grade' maxLength={11} minLength={1} />
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
                            Geography
                        </button>
                        <button className={styles.form__lesson__btn}>
                            <img src={logo} alt='logo' />
                            Geography
                        </button>
                    </div>
                    <Link className={styles.register__btn__link} to='/login'>Sign in</Link>
                    <button className={styles.register__btn}>Sign up</button>
                </form>
            </div>
        </section>
    )
}
