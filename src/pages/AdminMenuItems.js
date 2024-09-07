import styled from "styled-components";
import { Filters, MenuItemModal } from "../components"
import { useFilterContext } from "../context/FilterContext";
import { publicAxios } from "../axios_Instances/AxiosInstances";
import { useState } from "react";

const AdminMenuItems=()=>{
    
    const[showImageModal,setImageModal] = useState(false);
    const[imageSelectedId,setIamgeSelectedId] = useState();
    const [showEditModal, setShowEditModal] = useState(false);
    const[editedItem,setEditedItem] = useState();

    const[file,setFile] = useState(null);

    const {filteredItems} = useFilterContext();
    console.log("The filert itmems are",filteredItems);

    const handleCloseImageModal=()=>{
        setImageModal(false);
    }

    const handleEditProfile = (item) =>{
        setShowEditModal(true);
        setEditedItem(item);
    } 

    const handleImageModelOpen = (itemId) =>{
        setIamgeSelectedId(itemId);
        setImageModal(true);
    }
    
    const onFileChange=(e)=>{
        setFile(e.target.files[0]);
    }

    const formData = new FormData();
    formData.append('file',file);

    const uploadImageHandler=async(itemId)=>{
        try{
            const res = await publicAxios.post(
                `/api/files/upload/${imageSelectedId}`,
                formData,
                {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }           
            );
            if(res.status===200){
                setImageModal(false);
                alert(res.data);
            }
        }catch(error){
            console.log("The error uploading file is :: ",error);
        }
        
    }
    return(
        <Wrapper>
            <div className="row justify-content-center mt-4">
                <div className="col-2">
                    <Filters />
                </div>
                <div className="col-8">
                    <h3 className="text-center text-secondary">Menu Items</h3>
                    <div className="line"></div>
                    <div className="container row mt-4 d-flex justify-content-around" >
                        {
                            filteredItems.map(item=>{
                                const{id,name,price,available,category,type,fileData,description} = item;
                                let imgCount = fileData.length;
                                let img = '';
                                if(fileData){
                                    img = fileData[0]?.name;                                    
                                  } 
                                return(
                                    <div className="card mt-4" style={{width: "20rem",height:"32rem"}} key={id}>
                                        <img className="card-img-top" style={{width: "100%",height:"10rem"}} 
                                                src={img ? `http://localhost:8080/api/files/path/${img}?${new Date().getTime()}` : ''} 
                                                alt="Card image cap"
                                                 />
                                        <div className="card-body ">
                                            <div className="row">
                                                <h6 className="col-8">{name}</h6>
                                                <p className="col-3">$ {price}</p>
                                            </div>
                                            <div className="row">
                                                <p className="col-6">Category : {category}</p>
                                                <p className="col-4">Type : {type}</p>
                                            </div>
                                            <p>{description.substring(1,60)} ...</p>
                                            <div className="row justify-content-around">
                                                <button className="col-6 btn btn-secondary" onClick={()=>handleImageModelOpen(id)}>Upload impage</button>
                                                <button className="col-3 btn btn-primary" onClick={()=>handleEditProfile(item)}>Edit</button>
                                            </div>
                                            <span>Images Uploaded : {imgCount}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {/* ADD MenuItems Modal */}
           {showEditModal && <MenuItemModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} editedItem={editedItem}/>} 

            {/* Modal for image Uplaod */}
            <div className={`modal fade ${showImageModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showImageModal ? 'block' : 'none' }} aria-labelledby="editProfileModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editProfileModalLabel">Upload Image</h5>
                            <button type="button" className="btn-close" onClick={handleCloseImageModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <div for="exampleFormControlFile1">File Upload</div>
                                    <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={onFileChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={()=>setImageModal(false)}>Close</button>
                                <button type="button" className="btn btn-secondary" onClick={uploadImageHandler} >Upload Image</button>
                            </div>
                        
                    </div>
                </div>            
            </div>

        </Wrapper>
    )
}
const Wrapper=styled.section`
    .line{
        width:100px;
        height:4px;
        background:#a19e9d;
        margin:auto;
    }
    .image-modal{
        position:absolute;
        top:16rem;
        left:40rem;
        background:gray;
        width:500px;
        height:280px;
        box-shadow:1px 1px 0px 0px black;
        border-radius:6px;
        .modal-dialog{
            width:100%;
        }
    }

`
export default AdminMenuItems;