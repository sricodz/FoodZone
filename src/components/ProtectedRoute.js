import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute=({element,requiredRole})=>{

    const {user} = useSelector(state=>state.userState);
    const roles = user ? user.roles.map(r=>r.name) : null;

    if(!user &&  !user?.email){
        return <Navigate to="/login" replace />
    }

    if(roles && requiredRole && !roles.includes(requiredRole)){
        return <Navigate to="/" replace/>
    }

    return element;
}
export default ProtectedRoute;