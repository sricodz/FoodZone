import { useState } from "react";
import styled from "styled-components";
import MenuItemModal from "./MenuItemsModal";
import { NavLink } from "react-router-dom";

const AdminSection=()=>{
    
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditProfile = () => setShowEditModal(true);
    

    return(
        <Wrapper>
            <div className="row justify-content-center">
                <div className="col-9">
                    <div class="card shadow p-3 mb-5 bg-body rounded">
                            <div class="card-body">
                                <div class="d-flex justify-content-between p-md-1">
                                <div class="d-flex flex-row">
                                    <div class="align-self-center">
                                    <i class="fas fa-pencil-alt text-info fa-3x me-4"></i>
                                    </div>
                                    <div>
                                    <h4>ADD Menu Items</h4>
                                    </div>
                                </div>
                                <div class="align-self-center">
                                    <button className="btn btn-info" onClick={handleEditProfile}>ADD</button>
                                </div>
                                </div>
                            </div>
                    </div>
                </div>            
            </div>

            {/* ADD MenuItems Modal */}
            <MenuItemModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
                       
            <div className="row justify-content-center">
                <div className="col-9">
                    <div class="card shadow p-3 mb-5 bg-body rounded">
                            <div class="card-body">
                                <div class="d-flex justify-content-between p-md-1">
                                <div class="d-flex flex-row">
                                    <div class="align-self-center">
                                    <i class="fas fa-pencil-alt text-info fa-3x me-4"></i>
                                    </div>
                                    <div>
                                    <h4>Show Menu Items</h4>
                                    </div>
                                </div>
                                <div class="align-self-center">
                                    <NavLink className="btn btn-info" to="/admin/menuItems">View</NavLink>
                                </div>
                                </div>
                            </div>
                    </div>
                </div>            
            </div>

        </Wrapper>
    )
}

const Wrapper=styled.section`

`
export default AdminSection;