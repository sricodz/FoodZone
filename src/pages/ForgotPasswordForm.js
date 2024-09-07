import { useState } from "react";
import styled from "styled-components";
import { publicAxios } from "../axios_Instances/AxiosInstances";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm=()=>{

   const[data,setData]=useState({
       password:'',
       repeatPassword:''
   });
   const {otp} = useSelector(state=>state.userState);
   const navigate= useNavigate();

   const eventHandler=(e)=>{
      setData({...data,[e.target.name]:e.target.value});
   }

   const submitPassword=async(e)=>{
      e.preventDefault();
      if(!data.password || !data.repeatPassword || data.password !== data.repeatPassword){
        alert("Please Check you password and Confirm Password");
        return;
      }

      try{
        const res = await publicAxios.post(`/auth/changePassword/${otp}`,data);
        console.log("The res from reset password page is :: ",res);
        if(res.status===202){
            alert("Password Changed Successfully");
            navigate("/login");
        }
      }catch(error){
        console.log("The error from reset password page ",error);
      }
   }

    return(
        <Wrapper>
            <div className="card text-center" style={{width: "550px"}}>
                <div className="card-header h5 text-white bg-secondary">Reset Password</div>
                <form className="form">
                    <div className="form-group row">
                        <label for="newPassword" className="col-sm-2 col-form-label col-form-label-sm">New Password</label>
                        <div className="col-sm-10">
                        <input type="password" class="form-control form-control-sm" name="password" onChange={eventHandler} id="newPassword" placeholder="New Password" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="confPass" className="col-sm-2 col-form-label col-form-label-sm">confirm Password</label>
                        <div className="col-sm-10">
                        <input type="password" class="form-control form-control-sm" id="confPass" onChange={eventHandler} name="repeatPassword" placeholder="confirm Password" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={submitPassword}>Submit</button>
                </form>
                    </div>
        </Wrapper>
    )
}
const Wrapper = styled.section`
    display:flex;
    justify-content:center;
    margin-top:3rem;
    .form{
        padding:20px;
        .form-group{
             margin-top:1rem;
        }
    }

    }

`
export default ForgotPasswordForm;