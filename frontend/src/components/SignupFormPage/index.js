import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [fullname, setfullname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        const validations = [];
        if (username.length <= 3 || username.length > 20) validations.push('Username must be between 4 - 20 characters')
        if (fullname.length === 0 || fullname.length > 50) validations.push('Fullname must be between 1 - 50 characters')
        if (password !== confirmPassword) validations.push('passwords must match!')
        setErrors(validations)
    }, [username, fullname, password, confirmPassword, email])



    if (sessionUser) return <Redirect to="/tweets" />;




    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, fullname, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    const sendToSplash = () => history.push('/')

    return (
        <div className="signup-body">
            <form className="form-body" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li className='list-items' key={idx}>{error}</li>)}
                </ul>
                <div className="signup-items">
                    <label id="email-field"> Email
                        <input
                            type="text"
                            className="input-box-signup"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required>
                            </input>
                    </label>
                </div>
                <div className="signup-items">
                    <label id="username-field">
                        Username
                        <input
                            type="text"
                            className="input-box-signup"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required/>
                    </label>
                </div>
                <div className="signup-items">

                    <label id="username-field">
                        Full Name
                        <input
                            type="text"
                            className="input-box-signup"
                            value={fullname}
                            onChange={(e) => setfullname(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div className="signup-items">

                    <label id="password-field">
                        Password
                        <input
                            type="password"
                            className="input-box-signup"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-items">

                    <label id="confirm-password-field">
                        Confirm Password
                        <input
                            type="password"
                            className="input-box-signup"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-buttons">
                    <button disabled={errors.length > 0? true: false}type="submit" id="signup-button" className="login-button">Sign Up</button>
                    <button type="button" className="login-button"
                        onClick={sendToSplash}>Go Back</button>
                </div>
            </form>
        </div>
    );
}

export default SignupFormPage;
