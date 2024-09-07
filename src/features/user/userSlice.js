import {createSlice} from "@reduxjs/toolkit";




const getTokenFromLocalStorage=()=>{
    return JSON.parse(localStorage.getItem("token"));   
}

const getUserDataFromLocalStorage=()=>{
    return JSON.parse(localStorage.getItem('user'));
}

const getEmailFromLocalStorage=()=>{
    return  JSON.parse(localStorage.getItem('email'));
}

const initialState={
    user : getUserDataFromLocalStorage() || null,
    token : getTokenFromLocalStorage() || null,
    userEmail: getEmailFromLocalStorage() || null,
    otp : null
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        getProfileData:(state,action)=>{
            
        },
        setOtpValidate:(state,action)=>{
            console.log("The value of otp valid is :: ",action.payload);
            state.otp=action.payload;
        },
        loginUser:(state,action)=>{
            console.log("The value of token adn email s : ",action.payload);
            console.log("the meail is :: ",action.payload.email);
            state.token=action.payload.token;
            state.userEmail = action.payload.email;
            localStorage.setItem('token',JSON.stringify(action.payload.token));
            localStorage.setItem("email",JSON.stringify(action.payload.email));
            alert("Logged-In SUccessfully");
        },
        logoutUser:(state,action)=>{
            state.user=null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            alert("you are loggedOut");
        }
    }
})

export default userSlice.reducer;
export const {loginUser,logoutUser,setOtpValidate} = userSlice.actions;
