import { Navigate,Outlet } from "react-router-dom";
import PublicNavbar from "../PublicNavbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
const PublicLayout = () => {
    const auth = useAuth();

    if (auth) {
        return <Navigate to="/" />;
        
    }
    return (
         <>
         <PublicNavbar/>
            <Outlet />
         </>
    )
}

export default PublicLayout;
