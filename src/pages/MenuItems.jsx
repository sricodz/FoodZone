

//   the below code is used whenever page loads the below loader first executes
//   for that we have to add loader name in routes App.js 


import { useProductsContext } from "../context/productContext";
import { ListviewItems } from "../components";
import { useFilterContext } from "../context/FilterContext";

// export const menuItemsLoader = async({req})=>{
//    // const params = Object.fromEntries([...new URL(req.url).searchParams.entries()]);
//     const res = await customFetch(url);
//     const items = res.data.data;
//     console.log("The list of items are :: ",items);

//     return items;
// }



const MenuItems=()=>{

    const {products} = useProductsContext();
    const {filteredItems} = useFilterContext();

    return(
       <ListviewItems products={products} filteredItems={filteredItems} />
    )
}




export default MenuItems;

