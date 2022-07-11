import React, { useState, useEffect } from "react";
import "../Components/Components.css";
import * as AiIcon from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Login = () => {
  const [PasswordVisible, SetPasswordVisible] = useState(false);
  const [OmittedInputs, setOmittedInputs] = useState(false);
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector(state => state.user);


  const HandleClickButton = (e) => {
    e.preventDefault()
    if(username === "" || password === ""){
      setOmittedInputs(true);
    }else{
      login(dispatch, { username, password });
    }
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      setOmittedInputs(false);
    },3000) 
    return ()=> clearInterval(interval);
  }, [OmittedInputs]);


  return (
    <main className="register-container2">
      <section className="register-wrapper2">
        <h1>Login account</h1>
        <form>
          <div>
            <input type="text" placeholder="Username" onChange={(e) => SetUsername(e.target.value)} />
            <div className="register-password-div">
              <input
                type={`${PasswordVisible ? `text` : `password`}`}
                placeholder="Password"
                onChange={(e) => SetPassword(e.target.value)}
              />
              <button
                type="button"
                className="register-password"
                onClick={() => SetPasswordVisible(!PasswordVisible)}
              >
                {PasswordVisible ? (
                  <AiIcon.AiFillEye />
                ) : (
                  <AiIcon.AiFillEyeInvisible />
                )}
              </button>
            </div>
          </div>
        </form>
        <div className="buttonlogin-div">
          <button type="button" className={`${error ? `login-button-error` : `login-button`}`} onClick={HandleClickButton}>
            Sign in
          </button>
          {(error && <p className="login-error" >Account does not exist!</p>) || (OmittedInputs && <p className="login-error">Don't omit any details!</p>)}
         
        </div>
        <p>
          <a href="#">Don't remember the password?</a>
        </p>
        <p>
        <Link to="/register">
          <a href="#">Create an account</a>
        </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
