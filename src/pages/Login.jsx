import login from '../assets/login.PNG'
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { publicAxios, securedAxios } from '../axios_Instances/AxiosInstances';

const Login=()=>{

    const[user,setUser]=useState({
        email:'',
        password:''
    });
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const eventHandler=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
            const response = await publicAxios.post('/auth/signin',user,{withCredentials:true});
            console.log("the status is ",response);
            if(response.status!==202){
                alert(response.data.error);
                return;
            }
            if(response.status===202){
                const data={
                    token : response.data.jwtToken,
                    email:response.data.userName
                }
                console.log("inside the 202 if cond is :: ",data);
                dispatch(loginUser(data));

                //Call the profile api to get the profile information
                const res = await securedAxios.get(`/v1/api/profileData/${user.email}`,{withCredentials:true});
                    console.log("The response from profile data is ",res);
                    const userInfo={
                        userId:res.data.id,
                        name:res.data.name,
                        email:res.data.email,
                        gender:res.data.gender,
                        phone:res.data.phone,
                        pincode:res.data.pincode,
                        state:res.data.state,
                        street:res.data.street,
                        roles:res.data.roles,
                        pointBalance:res?.data?.points
                    }
                    console.log("The profile response is :: ",userInfo);
                    localStorage.setItem("user",JSON.stringify(userInfo));

                navigate("/");
                window.location.reload();
            }
        }catch(error){
            console.log("The error is :: ",error);
        }

        //axios.defaults.headers.common['Authorization']=`Bearer ${res.data.token}`;
    }

    return(
        <>
            <section className="p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="card border-light-subtle shadow-sm">
                        <div className="row g-0">
                            <div className="col-12 col-md-6">
                            <img className="img-fluid rounded-start w-100 h-100 object-fit-cover" loading="lazy" src={login} alt="BootstrapBrain Logo" />
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-5">
                                            <h3>Log in</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <form action="#!">
                                        <div className="row gy-3 gy-md-4 overflow-hidden">
                                            <div className="col-12">
                                                <label for="email" className="form-label">Email <span className="text-danger">*</span></label>
                                                <input type="email" className="form-control" name="email" id="email" onChange={eventHandler} placeholder="name@example.com" required />
                                            </div>
                                            <div className="col-12">
                                                <label for="password" className="form-label">Password <span className="text-danger">*</span></label>
                                                <input type="password" name="password" className="form-control" onChange={eventHandler}  id="password"  required />
                                            </div>
                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox"  name="remember_me" id="remember_me" />
                                                    <label className="form-check-label text-secondary" for="remember_me">
                                                    Keep me logged in
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid">
                                                    <button className="btn bsb-btn-xl btn-primary" type="submit" onClick={handleSubmit}>Log in now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="row">
                                        <div className="col-12">
                                            <hr className="mt-5 mb-4 border-secondary-subtle" />
                                            <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                                                <NavLink to="/register" className="link-secondary text-decoration-none">Create new account</NavLink>
                                                <NavLink to="/fp/verifyemail" className="link-secondary text-decoration-none">Forgot password</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Login;