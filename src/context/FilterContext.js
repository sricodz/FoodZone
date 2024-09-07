import React, { useContext, useEffect, useReducer } from "react";
import { useProductsContext } from "./productContext";
import reducer from '../reducers/filter_reducer';
import { CLEAR_FILTERS, FILTER_PRODUCTS, LOAD_PRODUCTS, SORT_PRODUCTS, UPDATE_FILTERS, UPDATE_SORT } from "../utils/Action";

const initialState={
    filteredItems : [],
    all_Items : [],
    sort : 'price-lowest',
    filters:{
        name:'',
        category:'',
        type:'',
        min_price:0,
        max_price:0,
        price:0
    }
}

const FilterContext = React.createContext();

export const FilterProvider = ({children}) =>{
    const {products} = useProductsContext();
    const[state,dispatch] = useReducer(reducer,initialState);
    
    useEffect(()=>{
        dispatch({type:LOAD_PRODUCTS,payload:products})
    },[products]);

    useEffect(()=>{
        dispatch({type:FILTER_PRODUCTS});
        dispatch({type:SORT_PRODUCTS});
    },[state.sort,state.filters]);

    const updateSort=(e)=>{
        const value = e.target.value;
        dispatch({type:UPDATE_SORT,payload:value});
    }

    const updateFilter=(e)=>{
        let name = e.target.name;
        let value = e.target.value;

        console.log("The name is :: ",name);
        console.log("The value is :: ",value);

        if(name==='category'){
            value = e.target.value;
        }

        if (name === 'price') {
            value = Number(value)
        }

        if (name === 'type') {
            value = e.target.value;
        }

        dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
    }

    const clearFilters =()=>{
        dispatch({type:CLEAR_FILTERS});
    }

    return (
        <FilterContext.Provider
            value={{
                ...state,
                updateSort,
                updateFilter,
                clearFilters
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext=()=>{
    return useContext(FilterContext);
}