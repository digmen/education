import React, { useEffect } from 'react'
import { useEducationContext } from '../../context/EducationContext';

export default function MainPage() {

    const { subjectId, getSubjectId } = useEducationContext();

    useEffect(() => {
        const id = localStorage.getItem('userId')
        getSubjectId(id);
    }, []);

    console.log(subjectId);


    return (
        <div>MainPage</div>
    )
}
