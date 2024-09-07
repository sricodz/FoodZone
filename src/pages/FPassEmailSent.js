import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { publicAxios } from "../axios_Instances/AxiosInstances";
import { useDispatch } from "react-redux";
import { setOtpValidate } from "../features/user/userSlice";

const FPassEmailSent=()=>{

    const[flag,setFlag] = useState(true);
    const[email,setEmail] = useState();
    const[otp,setOtp] = useState();
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const emailHandler=(e)=>{
        setEmail(()=>e.target.value);
    }

    const otpHandler=(e)=>{
        setOtp(()=>e.target.value);
    }

    const sendOTP=async(e)=>{
        e.preventDefault();
        console.log("The email is :: ",email);
        if(!email){
            alert("Please enter valid Email Address!");
            return;
        }
        try{
            const res = await publicAxios.post(`/auth/verifyMail/${email}`,null);
            console.log("The response from the sendOtp is :: ",res);
            console.log("The response from the sendOtp is :: ",res.status);
            if(res.status===202){
                alert("OTP sent Successfully");
                setFlag(false);
            }
        }catch(error){
            setFlag(true);
            console.log("The error for sendOtp is :: ",error);
        }
    }

    const verifyOTP=async(e)=>{
        e.preventDefault();
        console.log("The otp is :: ",otp);
        if(!otp){
            alert("Please enter valid OTP");
            return;
        }
        try{
            const res = await publicAxios.post(`/auth/verifyOtp/${otp}/${email}`,null);
            console.log("The response from the verify otp is :: ",res);
            console.log("The response from the verify otp is :: ",res.status);
            if(res.status===202){
                alert("OTP verified Successfully");
                dispatch(setOtpValidate(email));
                navigate("/forgotpassword");
            }
        }catch(error){
            setFlag(true);
            dispatch(setOtpValidate(false));
            console.log("The error for sendOtp is :: ",error);
        }
    }

    return(
        <Wrapper>
            {
                flag ? 
                <div className="card text-center" style={{width: "400px"}}>
                    <div className="card-header h5 text-white bg-secondary">Password Reset</div>
                    <div className="card-body px-5">
                        <p className="card-text py-2">
                            Enter your email address and we'll send you an email with instructions to reset your password.
                        </p>
                        <div data-mdb-input-init className="form-outline">
                            <input type="email" id="typeEmail" name="email" className="form-control my-3" onChange={emailHandler} />
                            <label className="form-label" for="typeEmail">Email Address</label>
                        </div>
                        <button type="button" className="btn btn-primary w-100" onClick={sendOTP}>Send OTP</button>
                        <div className="d-flex justify-content-between mt-4">
                            <NavLink className="" to="/login">Login</NavLink>
                            <NavLink className="" to="/register">Register</NavLink>
                        </div>
                    </div>
                </div>
                :

                <div className="card text-center" style={{width: "400px"}}>
                    <div className="card-header h5 text-white bg-secondary">OTP Verification</div>
                    <div className="card-body px-5">
                        <p className="card-text py-2">
                            Enter the verification code recieved through email to proceed futher.
                        </p>
                        <div data-mdb-input-init className="form-outline">
                            <label className="form-label" for="typeNumber">Enter OTP</label>
                            <input type="number" id="typeNumber" name="otp" className="form-control my-3" onChange={otpHandler} />
                        </div>
                        <button type="button" className="btn btn-primary w-100" onClick={verifyOTP}>Verify OTP</button>
                        <div className="d-flex justify-content-between mt-4">
                            <NavLink className="" to="/login">Login</NavLink>
                            <NavLink className="" to="/register">Register</NavLink>
                        </div>
                    </div>
                </div>
            }
        </Wrapper>
    )
}
const Wrapper = styled.section`
    display:flex;
    justify-content:center;
    margin-top:3rem;

`
export default FPassEmailSent;