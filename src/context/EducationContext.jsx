import React, { createContext, useContext, useReducer } from 'react';
import { ACTIONS } from '../utils/const';
import axios from 'axios';

const educationContext = createContext();

export function useEducationContext() {
    return useContext(educationContext);
}

const initState = {
    subject: [],
    subjectId: [],
    userId: [],
    userSubject: [],
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.subject:
            return { ...state, subject: action.payload };
        case ACTIONS.subjectId:
            return { ...state, subjectId: action.payload };
        case ACTIONS.userId:
            return { ...state, userId: action.payload };
        case ACTIONS.userSubject:
            return { ...state, userSubject: action.payload };
        default:
            return state;
    }
}

function EducationContext({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);


    async function getSubjectId(id) {
        try {
            const { data } = await axios.get(`http://34.42.42.56:8000/api/v1/subject/${id}/`);
            const subjectId = data
            dispatch({
                type: ACTIONS.subjectId,
                payload: subjectId,
            });
        } catch (error) {
            console.log(error);
        }
    }



    async function getSubject() {
        try {
            const { data } = await axios.get('http://34.42.42.56:8000/api/v1/subject/');
            const subject = data.results
            dispatch({
                type: ACTIONS.subject,
                payload: subject,
            });
        } catch (error) {
            console.log(error);
        }
    }



    async function getUserId() {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('adminAccess')}`,
            };
            const { data } = await axios.get(`http://34.42.42.56:8000/api/v1/account/profile/`, { headers });
            const userId = data;
            dispatch({
                type: ACTIONS.userId,
                payload: userId,
            });
        } catch (error) {
            console.log(error);
        }
    }


    async function getUserSubject() {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('adminAccess')}`,
            };
            const { data } = await axios.get(`http://34.42.42.56:8000/api/v1/user-subject/25/`, { headers });
            dispatch({
                type: ACTIONS.userSubject,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    }


    const value = {
        getSubject,
        subject: state.subject,
        getSubjectId,
        subjectId: state.subjectId,
        getUserId,
        userId: state.userId,
        getUserSubject,
        userSubject: state.userSubject,
    };
    return (
        <educationContext.Provider value={value}>{children}</educationContext.Provider>
    );
}

export default EducationContext;
