import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/product_reducer';
import axios from 'axios';
import { GET_PRODUCTS_BEGIN, GET_PRODUCTS_ERROR, GET_PRODUCTS_SUCCESS, GET_SINGLE_PRODUCT_BEGIN, GET_SINGLE_PRODUCT_ERROR, GET_SINGLE_PRODUCT_SUCCESS } from '../utils/Action';
import { publicAxios, securedAxios } from '../axios_Instances/AxiosInstances';


//const productUrl = "https://strapi-store-server.onrender.com/api/products";
//const productUrl = "https://www.course-api.com/react-store-products";


const initialState = {
    product_loading:false,
    products_error:false,
    products:[],
    featured_products:[],
    single_product_lading:false,
    single_product_error:false,
    single_product:{}
}

const ProductsContext = React.createContext();

export const ProductsProvider=({children})=>{

    const[state,dispatch] = useReducer(reducer,initialState);
    
    const fetchProducts=async()=>{
        
        //when products api calling we call loading component
        dispatch({type:GET_PRODUCTS_BEGIN})
        try{
            const res = await securedAxios.get("/v1/menuItem/all",{withCredentials:true});
            console.log("res of the url is :: ",res.data);
            const products = res.data;
            dispatch({type:GET_PRODUCTS_SUCCESS,payload:products});
        }catch(error){
            dispatch({type:GET_PRODUCTS_ERROR})
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[]);

    const fetchSingleProduct=async(url)=>{
        console.log("fetchsingleProduct is :: ",url);
        dispatch({type:GET_SINGLE_PRODUCT_BEGIN})
        try{
            const res = await publicAxios.get(url);
            const singelProduct = res.data;
            console.log("The res is :: ",singelProduct);
            dispatch({type:GET_SINGLE_PRODUCT_SUCCESS,payload:singelProduct});
        }catch(error){
            dispatch({type:GET_SINGLE_PRODUCT_ERROR});
        }
    }

    return (
        <ProductsContext.Provider value={
            {
                ...state,
                fetchSingleProduct
            }
        }>
            {children}
        </ProductsContext.Provider>
    );
}

export const useProductsContext=()=>{
    return useContext(ProductsContext);
}