import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getToken, validateLogin } from "./Services/Login";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });

  const [userInputError, setUserInputError] = useState({
    userName: false,
    password: false,
  });

  useEffect(() => {
    localStorage.getItem("token") && navigate("/movies");
  }, []);

  const validate = async (e) => {
    console.log(e);
    try {
      e.preventDefault();

      // if (!values.userName || !values.password) {
      //   if (!values.userName) {
      //     console.log("inside");
      //     setError({ ...error, userName: true });
      //     return
      //   }
      //   if (!values.password) {
      // setTimeout(() => setError({ ...error, password: true }), 1000);
      //     setError({ ...error, password: true });
      //   }
      // }

      if (!userInput.userName && !userInput.password) {
        setUserInputError({
          ...userInputError,
          userName: true,
          password: true,
        });
      } else if (!userInput.password) {
        console.log("password");
        setUserInputError({ ...userInputError, password: true });
      } else if (!userInput.userName) {
        setUserInputError({ ...userInputError, userName: true });
      } else {
        setLoading(true);
        const tokenRes = await getToken();

        const token = tokenRes?.data?.request_token;
        const payload = {
          username: userInput.userName,
          password: userInput.password,
          request_token: token,
        };

        const loginRes = await validateLogin(payload);

        if (loginRes?.data?.success) {
          toast.success("Logged in successfully", { toastId: "loginSuccess" });
          localStorage.setItem("token", token);
          setLoading(false);
          navigate("/movies");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.status_message, {
        toastId: "loginError",
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
    setUserInputError({
      ...userInputError,
      [name]: false,
    });
  };

  console.log("error", userInput);

  return (
    <div>
      <Navbar />
      <div className="login-bg">
        <div className="signin">
          <h1>Sign in</h1>
          <p className="loginDesc">Sign in to your Self Service Portal</p>
          <form onSubmit={validate}>
            <div className="formInput">
              <input
                type="text"
                placeholder="User name"
                name="userName"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {userInputError.userName && (
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
              {userInputError.password && (
                <p className="error">Password is required</p>
              )}
            </div>
            <div>
              <button type="submit" className="submit">
                {loading ? `Logging in...` : `Log in`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
