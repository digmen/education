import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Добавляем импорт Axios
import styles from "./register.module.css";

import logo from '../../assets/icon/logo.svg'
import { useEducationContext } from '../../context/EducationContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();


    const { subject, getSubject } = useEducationContext();


    const [name, setName] = useState(''); // Добавляем состояние для имени
    const [password, setPassword] = useState(''); // Добавляем состояние для пароля
    const [gradeId, setGradeId] = useState(''); // Добавляем состояние для уровня
    const [subjectsId, setSubjectsId] = useState([]); // Добавляем состояние для предметов


    const [nameLogin, setNameLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')

    const [signIn, setSignIn] = useState(true)

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://34.42.42.56:8000/api/v1/account/user/', {
                username: name,
                password: password,
                password_confirmation: password,
                grade: gradeId,
                subjects: subjectsId,
            });
            console.log(response);
            if (response.status >= 200 && response.status <= 300) {
                setSignIn(false)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubjectAdd = async (id) => {
        setSubjectsId(prevIds => {
            const index = prevIds.indexOf(id);
            if (index === -1) {
                return [...prevIds, id];
            } else {
                const newIds = [...prevIds];
                newIds.splice(index, 1);
                return newIds;
            }
        });
    }




    const handleLogin = async (e) => {
        e.preventDefault();
        setSignIn(false)
        if (signIn === false) {
            try {
                const response = await axios.post('http://34.42.42.56:8000/api/v1/account/user/authorization/login/', {
                    username: nameLogin,
                    password: passwordLogin,
                });
                if (response.status >= 200 && response.status <= 300) {
                    localStorage.setItem('adminAccess', response.data.access)
                    localStorage.setItem('adminRefresh', response.data.refresh)
                    navigate('/')
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    console.log(signIn);

    const handleSign = () => {
        setSignIn(!signIn)
    }

    useEffect(() => {
        getSubject();
    }, []);



    return (
        <>
            {signIn ?
                (
                    <section className={styles.register__container} >
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
                                    {subject.map((item) => (
                                        <button key={item.id} type="button" onClick={() => handleSubjectAdd(item.id)} className={`${styles.form__lesson__btn} ${subjectsId.includes(item.id) ? styles.subjectsIdButton : ''}`}>
                                            <img src={logo} alt='logo' />
                                            {item.title}
                                        </button>
                                    ))}
                                </div>
                                <button type='button' onClick={handleLogin} className={styles.register__btn__link}>Sign in</button>
                                <button type='button' onClick={handleRegister} className={styles.register__btn}>Sign up</button>
                            </form>
                        </div>
                    </section>
                )
                :
                (
                    <section className={styles.register__container}>
                        <div className={styles.register__title}>
                            <img src={logo} alt='logo' />
                            <h1>A world best education app for anyone.</h1>
                        </div>
                        <div>
                            <form className={styles.register__form}>
                                <input placeholder='Name' value={nameLogin} onChange={(e) => setNameLogin(e.target.value)} />
                                <input placeholder='Password' type="password" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} />
                                <button type='button' onClick={handleLogin} className={styles.register__btn} >Sign in</button>
                                <button type='button' onClick={handleSign} className={styles.register__btn__link}>Sign up</button>
                            </form>
                        </div>
                    </section>
                )
            }
        </>
    )
}
