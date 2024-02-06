import React, { useEffect } from 'react'
import { useEducationContext } from '../context/EducationContext';

import styles from './profile_component.module.scss'

export default function ProfileComponent() {
    const { subjectId, getSubjectId } = useEducationContext();

    useEffect(() => {
        const id = localStorage.getItem('userId')
        getSubjectId(id);
    }, []);

    return (
        <div>ProfileComponent</div>
    )
}
