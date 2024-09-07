import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

 
    /**
 * The below method will use if used to check if the user navigated to forgot passwrod flow
 * post completion of otp flow , incase otp not completed we redirected back to send otp page
 * 
 */
 const OtpProtectedRoute=({element})=>{

    const {otp} = useSelector(state=>state.userState);

    if(otp===null || !otp){
        return <Navigate to="/fp/verifyemail" replace />
    }
    
    return element;
}
 export default OtpProtectedRoute;