import './LoginComponent.css';
import React, {useContext, useState} from "react";
import axios from 'axios';
import logo from "../../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {message} from "antd";
import {UserContext} from "../../UserContext";
function LoginComponent(){
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nomComplet, setNomComplet] = useState(""); // Initialize with user data
    const [jobTitle, setJobTitle] = useState("");
    const field={
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
    };
    const linkofpage={
        marginLeft:'10px'
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8888/USER-SERVICE/users', { email, password,nomComplet,jobTitle });
            // Check if the email and password exist in the API response
            if (response.data.some(user => user.email === email && user.password === password)) {
                const user = response.data.find(u => u.email === email && u.password === password);
                setUserData({
                    nomComplet: user.nomComplet,
                    jobTitle: user.jobTitle,
                });
                console.log(user.nomComplet);
                message.success('Login successful!');
                navigate("/home");
            } else {
                message.error('Invalid email or password.');
            }

        } catch (err) {
            if (!err?.response) {
                message.error('No Server Response');
            } else if (err.response?.status === 400) {
                message.error('Missing Email or Password');
            } else if (err.response?.status === 401) {
                message.error('Unauthorized');
            } else {
                message.error('Login Failed');
            }
        }
        setEmail("");
        setPassword("");
    };



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return(
        <div className="login-container">
            <form  className="login-form">
                    <img src={logo} alt="Logo" className="logo" />
                <div className="email-input">
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    </div>

                <div className="password-input ">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={field} />
    {/*                <span className="toggle-pass" onClick={togglePasswordVisibility}>*/}
    {/*{showPassword ?  <FaEye />: <FaEyeSlash />}*/}
    {/*                </span>*/}
                </div>
<br/>
                <div className="forgot-password">Forgot my password?</div>
                <br/>

                    <button type="submit" disabled={!email || !password}  onClick={onSubmit} className="btn-login">Login</button>

                    <div className="signUp"><strong>No Account?</strong> <Link to="/signup" style={linkofpage}>Signup</Link>
                    </div>
                </form>
        </div>
    );

}

export default LoginComponent;