import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Register=()=>{

    const navigate = useNavigate();
    const [data,setData] = useState(
        {
            fullName:'',
            email:'',
            password:'',
            confPassword:'',
            phone:'',
            gender:'',
            street:'',
            city:'',
            state:'',
            pincode:''
        }
    );
    const[error,setError]=useState('');
    const payload = {
        name:data.fullName,
        email:data.email,
        password:data.password,
        phone:data.phone,
        gender:data.gender,
        addressRequest:{
            street:data.street,
            city:data.city,
            state:data.state,
            pincode:data.pincode
        }
    }

    //const registerUrl = "https://strapi-store-server.onrender.com/api/auth/local/register";
    const registerUrl = "http://localhost:8080/auth/signup";

    const eventHander=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
       try{
            const res = await axios.post(registerUrl,payload);
            console.log("The rspone is :: ",res);
            console.log("The data from responsisne is ..... ",res.data);
            if(res.status === 201){
                navigate("/login");
            }
       }catch(error){
        console.log("The error is :: ",error);
       }
        
    }

    return(

        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" >
                        <div className="card-body p-4 p-md-5">
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                            {
                                error && <p className="bg-danger">{error}</p>
                            }
                            <form>
                                <div className="row">
                                    <div className="col-12">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="firstName">Full Name</label>
                                            <input onChange={eventHander} type="text" name="fullName" id="firstName" className="form-control form-control-lg" />                                           
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="email">Email</label>
                                            <input onChange={eventHander} type="email" name="email" id="email" className="form-control form-control-lg" />                                           
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="password">Password</label>
                                            <input onChange={eventHander} type="password" name="password" id="password" className="form-control form-control-lg" />                                           
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="confPassword">Confirm Password</label>
                                            <input onChange={eventHander} type="password" name="confPassword" id="confPassword" className="form-control form-control-lg" />                                           
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-4 d-flex align-items-center">
                                        <div data-mdb-input-init className="form-outline datepicker w-100">
                                            <label for="phone" className="form-label">Phone Number</label>
                                            <input onChange={eventHander} type="number" name="phone" className="form-control form-control-lg" id="phone" />                                           
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <h6 className="mb-2 pb-1">Gender: </h6>
                                        <div className="form-check form-check-inline">
                                            <input onChange={eventHander} className="form-check-input" type="radio" name="gender" id="femaleGender"
                                            value="Female" />
                                            <label className="form-check-label" for="femaleGender">Female</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={eventHander} className="form-check-input" type="radio" name="gender" id="maleGender"
                                            value="Male" />
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
                                            <input onChange={eventHander} type="text" id="street" name="street" className="form-control form-control-lg" />                                           
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4 pb-2">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="city">City</label>
                                            <input onChange={eventHander} type="text" id="city" name="city" className="form-control form-control-lg" />                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-4 pb-2">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="state">State</label>
                                            <input onChange={eventHander} type="text" id="state" name="state" className="form-control form-control-lg" />                                           
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4 pb-2">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label" for="pincode">PinCode</label>
                                            <input onChange={eventHander} type="number" id="pincode" name="pincode" className="form-control form-control-lg" />                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-2">
                                    <input data-mdb-ripple-init className="btn btn-primary btn-lg" onClick={handleSubmit} value="Submit" />
                                </div>

                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
    )
}


const Wrapper = styled.article`
    .second-half{
        padding-left:5rem;
    }
    .form-group{
        margin-bottom:1rem;
    }
`

export default Register;