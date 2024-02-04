import React, { createContext, useContext, useReducer } from 'react';
import { ACTIONS, BASE_URL } from '../utils/const';
import axios from 'axios';

const educationContext = createContext();

export function useEducationContext() {
    return useContext(educationContext);
}

const initState = {
    products: [],
    oneProduct: null,
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.products:
            return { ...state, products: action.payload };
        default:
            return state;
    }
}

function EducationContext({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);

    async function getBestProducts() {
        try {
            const { data } = await axios.get(`${BASE_URL}/apartment?limit=500000`);
            const filteredProducts = data.results.filter(
                (product) => product.best === true
            );
            dispatch({
                type: ACTIONS.bestproducts,
                payload: filteredProducts,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function getProducts() {
        try {
            const { data } = await axios.get(`${BASE_URL}/apartment/?limit=500000`);
            const Products = data.results.filter((product) => product.best === false);
            dispatch({
                type: ACTIONS.products,
                payload: Products,
            });
        } catch (error) {
            console.log(error);
        }
    }


    async function getOneProduct(id) {
        try {
            const { data } = await axios.get(`${BASE_URL}/apartment/${id}`);
            dispatch({
                type: ACTIONS.oneProduct,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    }


    async function getImgUserId() {
        const id = localStorage;
        try {
            await axios.get(`${BASE_URL}/img/users/${id}`);
        } catch (error) { }
    }

    const value = {
        getProducts,
        products: state.products,
        getOneProduct,
        oneProduct: state.oneProduct,
    };
    return (
        <educationContext.Provider value={value}>{children}</educationContext.Provider>
    );
}

export default EducationContext;
