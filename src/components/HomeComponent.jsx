import React, { useEffect, useState } from 'react'
import { useEducationContext } from '../context/EducationContext';

import styles from './home_component.module.scss'

import logo from '../assets/icon/logo.svg'
import search from '../assets/icon/search_icon.svg'


export default function HomeComponent() {




    const { subjectId, getSubjectId } = useEducationContext();

    useEffect(() => {
        getSubjectId();
    }, []);
    console.log(subjectId[0]);













    // const userSubjects = subjectId.user_subjects || [];

    // const subjectList = userSubjects.map((subject, index) => (
    //     <div key={index}>
    //         <p>{subject}</p>
    //     </div>
    // ));

    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt='logo' />
            <div className={styles.search_block}>
                <img className={styles.search_icon} src={search} alt='search' />
                <input className={styles.search_input} placeholder='Search material...' />
            </div>
            <div className={styles.lesson_container}>
            </div>
        </div>
    )
}
