import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
  const auth = localStorage.getItem("user") || useSelector((state) => state?.auth)
  // const auth = {
  //   user: {
  //     role: ["employee"]
  //   },
  //   isLoggedIn: false
  // }
  const location = useLocation();
  return (
    // auth.user.role?.find((role) => allowedRoles.includes(role)) ?
    //   <Outlet /> :
      auth.isLoggedIn ?
        // <Navigate to="/unauthorized" state={{ form: location }} replace />
        <Outlet />
         :
        <Navigate to="/login" state={{ form: location }} replace />
  )
}

export default PrivateRoute;
