import React, { useState } from "react"
import Button from "components/button/Button";
import axios from 'axios';
import { API } from 'apiConfig/config';
import PropTypes from 'prop-types'
import { setAuthToken } from "common/helper";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function LoginUser(credentials) {
  var bodyFormData = new FormData();
  bodyFormData.append('username', credentials.username);
  bodyFormData.append('password', credentials.password);
  const headers = {"Content-Type": "multipart/form-data"}
  return axios.post(API.login(), bodyFormData, headers).then((res) => res).catch((err) => err.response);
}

async function SignupUser(credentials) {
  var bodyFormData = new FormData();
  bodyFormData.append('username', credentials.username);
  bodyFormData.append('password', credentials.password);
  const headers = {"Content-Type": "multipart/form-data"}
  return axios.post(API.signup(), bodyFormData, headers).then((res) => res).catch((err) => err.response)
}

const Login = () => {

  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const [username, setUserName] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const showSuccessToastMessage = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT
    });
  };

  const showErrorToastMessage = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (authMode == "signin") {
      const response = await LoginUser({
        username,
        password
      })
      if (response.status == 200) {
        const data = response.data
        localStorage.setItem("token", data.refresh_token);
        setAuthToken(data.refresh_token);
        navigate("/")
        // showSuccessToastMessage("Signin successfully !")
      }
      else {
        showErrorToastMessage("Invalid username or password")
      }
    }
    else {
      const response = await SignupUser({
        username,
        password
      })
      if (response.status == 200) {
        showSuccessToastMessage("Signup successfully! Please signin")
        changeAuthMode();
      }
      else {
        console.log(response.data.errorMessage);
        showErrorToastMessage(response.data.errorMessage)
      }
      
    }
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
         <ToastContainer />
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-5">
              <label>Username</label>
              <input
                className="form-control mt-1 w-full p-2  rounded text-black"
                placeholder="Enter username"
                onChange={(e)=>setUserName(e.target.value)} 
              />
            </div>
            <div className="form-group mt-5">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1 w-full p-2 rounded text-black"
                placeholder="Enter password"
                onChange={(e)=>setPassword(e.target.value)} 
              />
            </div>
            <div className="d-grid gap-2 mt-8">
              <Button bgColor="secondary" full={true} onClick={handleSubmit}>
                Submit
              </Button>
            </div>
            <p className="forgot-password text-center text-primary mt-6">
              Not registered yet?{" "} <a href="#" onClick={changeAuthMode}>Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    )
  }
  else {
    return (
      <div className="Auth-form-container">
        <ToastContainer />
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="form-group mt-5">
              <label>Username</label>
              <input
                className="form-control mt-1 w-full p-2  rounded text-black"
                placeholder="Enter username"
                onChange={(e)=>setUserName(e.target.value)} 
              />
            </div>
            <div className="form-group mt-5">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1 w-full p-2 rounded text-black"
                placeholder="Enter password"
                onChange={(e)=>setPassword(e.target.value)} 
              />
            </div>
            <div className="d-grid gap-2 mt-8">
              <Button bgColor="secondary" full={true} onClick={handleSubmit}>
                Submit
              </Button>
            </div>
            <p className="forgot-password text-center text-primary mt-6">
              Already registered?{" "} <a href="#" onClick={changeAuthMode}>Sign In</a>
            </p>
          </div>
        </form>
      </div>
    )
  
  }
  
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }

export default Login