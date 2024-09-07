import { useState } from "react";
import styled from "styled-components";
import { securedAxios } from "../axios_Instances/AxiosInstances";

const MenuItemModal=({showEditModal , setShowEditModal , editedItem})=>{

    console.log("The value of editItem is :: ",editedItem);

    const [items,setItems] = useState({
        name:editedItem?.name,
        price:editedItem?.price,
        isAvailable:editedItem?.available,
        category:editedItem?.category,
        type:editedItem?.type,
        description:editedItem?.description
    });

    const category = ['BREAKFAST','DINNER','LUNCH','DESERTS','STARTERS','MOCKTAILS'];
    const type = ['VEG','NON_VEG'];

    const sample = {
        name:'',
        price:0,
        isAvailable:false,
        category:'BREAKFAST',
        type:'VEG',
        description:''
    }

    const payload = {
        name: items.name,
        price: parseInt(items.price),
        isAvailable: items.isAvailable === true ? true : false,
        category: items.category,
        type: items.type,
        description: items.description
    }

    const eventHander=(e)=>{
        setItems({...items,[e.target.name]:e.target.value});
    }


    const clearModalData = () =>{
        setItems(sample);
        console.log("The items are :: "+JSON.stringify(items));
    }

    const handleCloseEditModal=()=>{
        setShowEditModal(false);
    }
    
    const submitHandler=async(e)=>{
        e.preventDefault();
        try{         
            const res = editedItem?.id ? await securedAxios.put(`/v1/item/update/${editedItem.id}`,payload,{withCredentials:true}) : await securedAxios.post('/v1/item/add',payload,{withCredentials:true});
            if(res.status===201){
                alert("Item Added!");
                clearModalData();
            }
        }catch(error){
            console.log(error);
        }
        setShowEditModal(false);
    }

    return(
        <Wrapper>
            <div className={`modal fade ${showEditModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showEditModal ? 'block' : 'none' }} aria-labelledby="editProfileModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editProfileModalLabel">ADD Menu Item</h5>
                            <button type="button" className="btn-close" onClick={handleCloseEditModal} aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="ItemName">Item Name</label>
                                            <input type="text" name="name" id="ItemName" onChange={eventHander} value={items.name} className="form-control form-control-lg" />                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6 mb-4">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="price">Price</label>
                                            <input type="number" name="price" id="price"  className="form-control form-control-lg" value={items.price} onChange={eventHander} />                                           
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="mb-2 pb-1">Is Stock Available : </label> <br/>
                                        <div className="form-check form-check-inline">
                                            <input onChange={eventHander} className="form-check-input" type="radio" name="isAvailable" id="yesAvailable"
                                            value="true" />
                                            <label className="form-check-label" for="yesAvailable">YES</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={eventHander} className="form-check-input" type="radio" name="isAvailable" id="notAvailable"
                                            value="false" />
                                            <label className="form-check-label" for="notAvailable">NO</label>
                                        </div>                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="category">Select Category : </label>
                                            <select className="category-options" name="category" onChange={eventHander} value={items.category}>
                                                {
                                                    category.map(c=><option className="form-control"  id="category" name="category" >{c}</option>)
                                                }
                                            </select>
                                                                                       
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label">Select Type : </label>
                                            <select className="category-options" name="type" onChange={eventHander} value={items.type}>
                                                {
                                                    type.map(t=><option className="form-control"  id="category" name="category" >{t}</option>)
                                                }
                                            </select>                                           
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <div class="form-floating">
                                                <textarea class="form-control" placeholder="Leave a Description here" value={items.description} id="floatingTextarea" name="description" onChange={eventHander}></textarea>
                                                <label for="floatingTextarea">Description</label>
                                            </div>
                                        </div>
                                </div>
                                </div>
                            
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={clearModalData}>Clear Data</button>
                                <input type="submit" className="btn btn-primary" onClick={submitHandler} />
                            </div>
                        </form>
                    </div>
                </div>            
            </div>
        </Wrapper>
    )
}
const Wrapper=styled.section`
    .category-options{
        margin-left:1rem;
        cursor:pointer;
        background: #e9f0ea;
        padding:3px;
    }

`
export default MenuItemModal;