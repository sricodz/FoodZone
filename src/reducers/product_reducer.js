import { GET_PRODUCTS_BEGIN, GET_PRODUCTS_ERROR, GET_PRODUCTS_SUCCESS, GET_SINGLE_PRODUCT_BEGIN, GET_SINGLE_PRODUCT_ERROR, GET_SINGLE_PRODUCT_SUCCESS } from "../utils/Action";


const product_reducer=(state,action)=>{

    if(action.type===GET_PRODUCTS_BEGIN){
        return {...state,product_loading:true}
    }

    if(action.type===GET_PRODUCTS_SUCCESS){
        return {...state,product_loading:false,products:action.payload};
    }

    if(action.type===GET_PRODUCTS_ERROR){
        return {...state,product_loading:false,products_error:true};
    }

    if(action.type===GET_SINGLE_PRODUCT_BEGIN){
        return {...state,single_product_lading:true};
    }

    if(action.type===GET_SINGLE_PRODUCT_SUCCESS){
        return {...state,single_product_lading:false,single_product:action.payload};
    }

    if(action.type===GET_SINGLE_PRODUCT_ERROR){
        return {...state,single_product_lading:false,single_product_error:true};
    }

    throw new Error(`No Matching : ${action.type} - action type`);
}
export default product_reducer;