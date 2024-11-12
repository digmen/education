import React, { useEffect, useState } from 'react'
import { useEducationContext } from '../context/EducationContext';

import styles from './home_component.module.scss'

import logo from '../assets/icon/logo.svg'
import search from '../assets/icon/search_icon.svg'


export default function HomeComponent() {
    const { userId, getUserId } = useEducationContext();

    useEffect(() => {
        getUserId();
    }, []);

    const id = userId.id;
    localStorage.setItem('id', id);

    console.log(userId);

    const { userSubject, getUserSubject } = useEducationContext();

    useEffect(() => {
        getUserSubject();
    }, []);

    console.log(userSubject);


    const { subjectId, getSubjectId } = useEducationContext();

    useEffect(() => {

        getSubjectId(id);
    }, []);

    console.log(subjectId, 'wwwwww');
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt='logo' />
            <div className={styles.search_block}>
                <img className={styles.search_icon} src={search} alt='search' />
                <input className={styles.search_input} placeholder='Search material...' />
            </div>
        </div>
    )
}
