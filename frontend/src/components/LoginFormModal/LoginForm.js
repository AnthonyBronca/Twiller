import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './loginform.css'
function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);



  const sendToSplash = () => {
    history.push('/')
  }

  const demoLogin = () => {
    setCredential('Demo')
    setPassword('twiller')
    handleSubmit();
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).then(()=> history.push('/tweets'))
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors)
        }
      }
    );
  };

  return (
    <div className="login-body">
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <div className="sign-in-form-fields">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label className="username-label">
              Username or Email
              <div className="input-container-login">
                <input
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </div>
            </label>
            <div className="pass-container">
              <label>
                Password
                <div className="input-container-login">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </label>
            </div>
            <div className="login-button-div">
              <button className='login-button' type="submit">Log In</button>
            </div>
            <div className="login-button-div">
              <button type='submit'
              className='login-button'
              onClick={demoLogin}>Demo Login</button>
            </div>
            <div className="login-button-div">
              <button type='button'
              className='login-button'
              onClick={sendToSplash}>Go Back</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
