import React, { useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  // let [userName, setUserName] = useState("");
  // let [password, setPassword] = useState("");
  // let [nameAlert, setNameAlert] = useState(false);
  // let [passAlert, setPassAlert] = useState(false);
  // let [loading, setLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState({
    userName: false,
    password: false,
  });

  const navigate = useNavigate();

  const validate = async (e) => {
    console.log(e);
    try {
      e.preventDefault();
      if (!values.userName || !values.password) {
        if (!values.userName) {
          console.log("inside");
          setError({ ...error, userName: true });
        }
        if (!values.password) {
          // setTimeout(() => setError({ ...error, password: true }), 1000);
          setError({ ...error, password: true });
        }
      }

      // if (!values.userName || !values.password) {
      //   if (!values.userName) {
      //     setError((prev) => {...prev,userName=true});
      //   }

      // if (!values.userName && !values.password) {
      //   console.log("name");
      //   setError({ ...error, userName: true, password: true });
      // } else if (!values.password) {
      //   console.log("password");
      //   setError({ ...error, password: true });
      // } else if (!values.userName) {
      //   setError({ ...error, userName: true });
      // }
      else {
        setLoading(true);
        let tokenRes = await axios.get(
          "https://api.themoviedb.org/3/authentication/token/new?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7"
        );
        let token = tokenRes?.data?.request_token;
        let values = {
          username: values.userName,
          password: values.password,
          request_token: token,
        };
        let loginRes = await axios.post(
          "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7",
          values
        );

        if (loginRes?.data?.success) {
          toast.success("Logged in successfully", { toastId: "loginSuccess" });
          window.localStorage.setItem("token", token);
          setLoading(false);
          navigate("/movies");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.status_message, {
        toastId: "loginError",
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: false,
    });
  };

  console.log("error", values);

  if (!localStorage.getItem("token")) {
    return (
      <div>
        <Navbar />
        <div className="login-bg">
          <div className="signin">
            <h1>Sign in</h1>
            <p className="loginDesc">Sign in to your Self Service Portal</p>
            <form onSubmit={(e) => validate(e)}>
              <div className="formInput">
                <input
                  type="text"
                  placeholder="User name"
                  name="userName"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {error.userName && (
                  <p className="error">User name is required</p>
                )}
              </div>
              <div className="formInput">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {error.password && (
                  <p className="error">Password is required</p>
                )}
              </div>
              <div>
                <input
                  type="submit"
                  className="submit"
                  value={loading ? `Logging in...` : `Log in`}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    setTimeout(() => {
      navigate("/movies");
    }, 100);
  }
}

export default Login;
