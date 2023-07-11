import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const Authenticate = () => {
  !localStorage.getItem("token") &&
    toast.error("Not authorized,Please login...", {
      toastId: "authenticate error",
    });
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
};

export default Authenticate;
