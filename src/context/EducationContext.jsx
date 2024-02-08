import React, { createContext, useContext, useReducer } from 'react';
import { ACTIONS } from '../utils/const';
import axios from 'axios';

const educationContext = createContext();

export function useEducationContext() {
    return useContext(educationContext);
}

const initState = {
    subject: [],
    userId: [],
    userSubject: [],
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.subject:
            return { ...state, subject: action.payload };
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



    async function getUserId() {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('adminAccess')}`,
            };
            const { data } = await axios.get(`http://34.42.42.56:8000/api/v1/account/profile/`, { headers });
            const user = data;
            const tet = localStorage.getItem('id')
            console.log(tet);
            dispatch({
                type: ACTIONS.userId,
                payload: user,
            });
        } catch (error) {
            console.log(error);
        }
    }


    async function getUserSubject() {
        const id = localStorage.getItem('id')
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
