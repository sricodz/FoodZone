
import { CLEAR_FILTERS, FILTER_PRODUCTS, LOAD_PRODUCTS, SORT_PRODUCTS, UPDATE_FILTERS, UPDATE_SORT } from "../utils/Action"


const filter_reducer=(state,action)=>{
    if(action.type === LOAD_PRODUCTS){
        let maxPrice = action.payload.map(p=>p.price);
        maxPrice = Math.max(...maxPrice);
        return{
            ...state,
            all_Items:[...action.payload],
            filteredItems:[...action.payload],
            filters:{...state.filters,max_price:maxPrice,price:maxPrice}
        }
    }

    if(action.type===UPDATE_SORT){
        return {...state,sort:action.payload}
    }

    if(action.type===SORT_PRODUCTS){
        const {sort,filteredItems} = state;
        let tempItems=[];
        if(sort==='price-lowest'){
            tempItems = filteredItems.sort((a,b)=>{
                return a.price-b.price
            })
        }

        if(sort==='price-highest'){
            tempItems = filteredItems.sort((a,b)=>{
                return b.price-a.price;
            })
        }

        if(sort==='name-a'){
            tempItems=filteredItems.sort((a,b)=>{
                return a.name.localCompare(b.name);
            })
        }

        if(sort==='name-z'){
            tempItems=filteredItems.sort((a,b)=>{
                return b.name.localCompare(a.name);
            })
        }
        return {...state,filteredItems:tempItems};
    }

    if(action.type===UPDATE_FILTERS){
        const {name,value} = action.payload;
        return {...state,filters:{...state.filters,[name]:value}};
    }

    if(action.type===FILTER_PRODUCTS){
        const {all_Items} = state;
        const {name,category,type,price} = state.filters;
        let tempItems = [...all_Items];
        if(name){
            tempItems = tempItems.filter((item)=>
                item.name.toLowerCase().startsWith(name)
            )
        }

        if(category!=='all' && category){
            tempItems = tempItems.filter((item)=>item.category===category)
        }

        if(type){
            tempItems = tempItems.filter((item)=>item.type===type)
        }
        
       if(price){
        tempItems = tempItems.filter((item)=>item.price<=price);
       }
        
        return {...state,filteredItems:tempItems}; 
    }

    if(action.type===CLEAR_FILTERS){
        return {
            ...state,
            filters:{
                ...state.filters,
                name:'',
                category:'',
                type:'',
                price:0
            }
        }
    }

    throw new Error(`No Matching "${action.type}"  - action Type` );
 
}

export default filter_reducer;