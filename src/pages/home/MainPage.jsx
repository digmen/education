import React, { useState } from 'react'

import styles from './home.module.scss'

import profile_icon from '../../assets/icon/profile_icon.svg'
import home_icon from '../../assets/icon/home_icon.svg'
import HomeComponent from '../../components/HomeComponent';
import ProfileComponent from '../../components/ProfileComponent';

export default function MainPage() {

    const [page, setPage] = useState(true);

    const handlePage = (e) => {
        e.preventDefault()
        setPage(!page)
    }

    return (
        <div>
            {page ? <HomeComponent /> : <ProfileComponent />}
            <div>
                <button onClick={handlePage} type='button'>
                    <img src={home_icon} alt='Home icon' />
                </button>
                <button onClick={handlePage} type='button'>
                    <img src={profile_icon} alt='Profile icon' />
                </button>
            </div>
        </div>
    )
}
