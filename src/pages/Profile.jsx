import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { securedAxios } from '../axios_Instances/AxiosInstances';

const Profile = () => {
    const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showOrdersModal, setShowOrdersModal] = useState(false);
    const[file,setFile]=useState();


    const {user} = useSelector(state=>state.userState);

    const [orders, setOrders] = useState([
        { id: 1, item: 'Item 1', date: '2024-01-01' },
        { id: 2, item: 'Item 2', date: '2024-02-01' }
    ]);



    const handleImageChange = async(event) => {
        setFile(event.target.files[0]);
        const formData = new FormData();
        formData.append('image',file);
        if(file){
            try{
                const res = await securedAxios.post(
                    `/v1/image/profile`,
                    formData,
                    {
                        headers:{
                            'Content-Type':'multipart/form-data'
                        },
                        withCredentials:true
                    }           
                );
                console.log("The res from image upload is :: ",res);
            }catch(error){
                console.log("Error while uploading image ",error);
            }
        }
    };
    



    const handleEditProfile = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleCloseOrdersModal = () => setShowOrdersModal(false);

    const eventHander=(e)=>{

    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="text-center">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="img-fluid rounded-circle border border-primary"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <input
                            type="file"
                            id="imageUpload"
                            className="d-none"
                            
                            name='image'
                            onChange={handleImageChange}
                        />
                        <button
                            className="btn btn-primary mt-3 m"
                            onClick={() => document.getElementById('imageUpload').click()}
                        >
                            Edit Image
                        </button>
                        <h3 className="mt-3">{user.name}</h3>
                    </div>
                </div>

                <div class="col-xl-8 col-md-12 mb-4">
                    <div className="row">
                        <div class="card shadow p-3 mb-5 bg-body rounded">
                            <div class="card-body">
                                <div class="d-flex justify-content-between p-md-1">
                                <div class="d-flex flex-row">
                                    <div class="align-self-center">
                                    <i class="fas fa-pencil-alt text-info fa-3x me-4"></i>
                                    </div>
                                    <div>
                                    <h4>Profile Info</h4>
                                    </div>
                                </div>
                                <div class="align-self-center">
                                    <button className="btn btn-info" onClick={handleEditProfile}>Edit</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div class="card shadow p-3 mb-5 bg-body rounded">
                            <div class="card-body">
                                <div class="d-flex justify-content-between p-md-1">
                                <div class="d-flex flex-row">
                                    <div class="align-self-center">
                                    <i class="fas fa-pencil-alt text-info fa-3x me-4"></i>
                                    </div>
                                    <div>
                                    <h4>Orders Info</h4>
                                    </div>
                                </div>
                                <div class="align-self-center">
                                    <button className="btn btn-primary" onClick={() => setShowOrdersModal(true)}>View Orders</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div class="card shadow p-3 mb-5 bg-body rounded">
                            <div class="card-body">
                                <div class="d-flex justify-content-between p-md-1">
                                <div class="d-flex flex-row">
                                    <div class="align-self-center">
                                    <i class="fas fa-pencil-alt text-info fa-3x me-4"></i>
                                    </div>
                                    <div>
                                    <h4>Points Balance</h4>
                                    </div>
                                </div>
                                <div class="align-self-center">
                                    <h4 className='text-danger'>1234</h4>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="container-fluid">
        </div>
    </div>
    {/* Edit Profile Modal */}
    <div className={`modal fade ${showEditModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showEditModal ? 'block' : 'none' }} aria-labelledby="editProfileModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="editProfileModalLabel">Edit Profile</h5>
                    <button type="button" className="btn-close" onClick={handleCloseEditModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                    <div className="row">
                                <div className="col-12">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="firstName">Full Name</label>
                                            <input onChange={eventHander} type="text" name="name" value={user.name} id="firstName" className="form-control form-control-lg" />                                           
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="email">Email</label>
                                            <input onChange={eventHander} type="email" name="email" value={user.email} disabled id="email" className="form-control form-control-lg" />                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-4 d-flex align-items-center">
                                        <div data-mdb-input-init className="form-outline datepicker w-100">
                                            <label for="phone" className="form-label">Phone Number</label>
                                            <input onChange={eventHander} type="number" value={user.phone} name="phone" className="form-control form-control-lg" id="phone" />                                           
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <h6 className="mb-2 pb-1">Gender: </h6>
                                        <div className="form-check form-check-inline">
                                            <input onChange={eventHander} className="form-check-input" type="radio" name="gender" id="femaleGender"
                                            value="Female" checked = {user.gender==='Female'}/>
                                            <label className="form-check-label" for="femaleGender">Female</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={eventHander} className="form-check-input" type="radio" name="gender" id="maleGender"
                                            value="Male" checked = {user.gender==='Male'} />
                                            <label className="form-check-label" for="maleGender">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={eventHander} className="form-check-input" type="radio" name="gender" id="otherGender"
                                            value="Others" />
                                            <label className="form-check-label" for="otherGender">Other</label>
                                        </div>
                                    </div>
                                </div>
                                <h6>Address :</h6>
                                <div className="row">
                                    <div className="col-md-6 mb-4 pb-2">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="street">Street</label>
                                            <input onChange={eventHander} type="text" id="street" name="street" className="form-control form-control-lg" value={user.street}/>                                           
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4 pb-2">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="city">City</label>
                                            <input onChange={eventHander} type="text" id="city" disabled name="city" className="form-control form-control-lg"  />                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-4 pb-2">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="state">State</label>
                                            <input onChange={eventHander} type="text" id="state" name="state" className="form-control form-control-lg" value={user.state} />                                           
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4 pb-2">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="pincode">PinCode</label>
                                            <input onChange={eventHander} type="number" id="pincode" name="pincode" className="form-control form-control-lg" value={user.pincode} />                                           
                                        </div>
                                    </div>
                                </div>

                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleCloseEditModal}>Save Changes</button>
                </div>
            </div>
        </div>            
    </div>

            {/* Orders Modal */}
            <div className={`modal fade ${showOrdersModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showOrdersModal ? 'block' : 'none' }} aria-labelledby="ordersModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ordersModalLabel">Orders</h5>
                            <button type="button" className="btn-close" onClick={handleCloseOrdersModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">
                                {orders.map(order => (
                                    <li key={order.id} className="list-group-item">
                                        {order.item} - {order.date}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseOrdersModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
