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
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.subject:
            return { ...state, subject: action.payload };
        case ACTIONS.subjectId:
            return { ...state, subjectId: action.payload };
        default:
            return state;
    }
}

function EducationContext({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);

    // async function getBestProducts() {
    //     try {
    //         const { data } = await axios.get(`${BASE_URL}/apartment?limit=500000`);
    //         const filteredProducts = data.results.filter(
    //             (product) => product.best === true
    //         );
    //         dispatch({
    //             type: ACTIONS.bestproducts,
    //             payload: filteredProducts,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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



    async function getSubjectId() {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('adminAccess')}`,
            };
            const { data } = await axios.get(`http://34.42.42.56:8000/api/v1/account/profile/`, { headers });
            const subjectId = data;
            dispatch({
                type: ACTIONS.subjectId,
                payload: subjectId,
            });
        } catch (error) {
            console.log(error);
        }
    }


    // async function getImgUserId() {
    //     const id = localStorage;
    //     try {
    //         await axios.get(`${BASE_URL}/img/users/${id}`);
    //     } catch (error) { }
    // }

    const value = {
        getSubject,
        subject: state.subject,
        getSubjectId,
        subjectId: state.subjectId,
    };
    return (
        <educationContext.Provider value={value}>{children}</educationContext.Provider>
    );
}

export default EducationContext;
