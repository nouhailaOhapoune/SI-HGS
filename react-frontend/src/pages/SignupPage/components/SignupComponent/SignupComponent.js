import React, {useState} from "react";
import axios from "axios";
import "./SignupComponent.css";
import {Link ,useNavigate} from "react-router-dom";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import logo from '../../../../assets/images/logo.png';
import {message} from "antd";

function SignupComponent(){
    const navigate = useNavigate();
    const [nomComplet, setNomComplet] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [tel, setTel] = useState("");

    const thelink={
        marginLeft:'8px'
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8888/USER-SERVICE/users', {
                nomComplet,
                email,
                password,
                jobTitle,
                tel
            });

            // Handle the response from the API
            console.log(response.data);

            message.info("Sign up successful!!")
            // Navigate to /congrats after successful signup
            navigate('/congrats');

        } catch (error) {
            console.error(error);
        }
        // Reset form fields
        setNomComplet("");
        setEmail("");
        setPassword("");
        setJobTitle("");
        setTel("");
    };




    return(
        <>
            <img
                className="signup-image"
                src={logo}
                alt="Logo"
            />
            <div className="signup-container">
                <form className="signup-form">
                    <div>
                    <h3>Welcome to HGS System
     where you can manage all human resources
                    of the enterprise</h3>
                    <p className="sentence">Please fill in your information to set up your profile...</p>
                  </div>
                    <div className="field">
                    <input
                        type="text"
                        id="nomComplet"
                        placeholder= "Enter your full name "
                        value={nomComplet}
                        onChange={(event) => setNomComplet(event.target.value)}
                        required
                    />
                    </div>

                    <div className="field">
                    <input
                        type="email"
                        id="email"
                        placeholder= "Enter your email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    </div>

                    <div className="field">
                    <input
                        type="password"
                        id="password"
                        placeholder= "Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                         />
                    </div>

                    <div className="field">
                    <input
                        type="text"
                        id="jobTitle"
                        placeholder= "Enter your job title "
                        value={jobTitle}
                        onChange={(event) => setJobTitle(event.target.value)}
                        required
                    />
                    </div>

                    <div className="field">
                    <input
                        type="text"
                        id="tel"
                        placeholder= "Enter your phone number "
                        value={tel}
                        onChange={(event) => setTel(event.target.value)}
                        required
                    />
                    </div>

                    <button type="submit"
                            disabled={!email || !password || !nomComplet || !jobTitle ||!tel}
                            className="btn-signup"
                    onClick={handleSubmit} >NEXT</button>

                    <div className="login"><strong>Already have an account?</strong> <Link to="/" style={thelink}>Login</Link></div>
            </form>
                </div>
        </>
    );

}

export default SignupComponent;