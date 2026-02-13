import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import Logo from "../../Asset/Logo.png";

interface ValidationState {
    isValid: boolean;
    errorMsg: string;
}

interface FailedState {
    failed: boolean;
    msg: string;
}

export default function Register() {
    
    //#region States
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPpassword, setConfirmPpassword] = useState('');
    //#endregion States

    //#region function handler
    const HandleUserNameOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserName(event.target.value);
    }
    const handleEmailOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    }

    const handlePasswordOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setConfirmPpassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const HandleOnSubmit = () => {
        alert(`Email id : ${email}  Password : ${password}`);
    }
    //#endregion function handler

    return (
        <div className="container-fluid login-bg">
            <div className="card  my-2 overflow-hidden bg-transparent">
                <div className="card-body d-flex flex-column align-items-center">
                    {/* Logo */}
                    <div className="d-flex flex-row align-items-center mb-5 justify-content-center companyName">
                        <img src={Logo} alt="Logo" className="rounded-circle img-fluid logo-img"/>
                        <div className="d-flex flex-column fw-bold text-primary fst-italic align-items-center"
                            style={{ marginLeft: "5px", fontSize: "2.3rem" }}>
                            Doraemon
                            <small className="text-secondary" style={{fontSize: "1rem" }}>AI assistant</small>
                        </div>
                    </div>

                    {/* Login card */}
                    <div className="card-body p-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.78)", border: '2px solid rgba(0, 0, 0, 0.3)' }}>
                    <div className="d-flex flex-column align-items-center">
                        <h3 className="m-3 p-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.77)", borderRadius: "5%" }}>
                            Register
                        </h3>
                    </div>

                    <div className="alert alert-danger p-0 w-6 d-flex flex-row" role="alert" style={{ justifyContent: "center" }}>
                        Invalid password!!!
                    </div>

                    <div className="m-2">
                        <label htmlFor="userName" className="form-label">UserName</label>
                        <input id="userName" type="text" className="form-control" maxLength={26} onChange={HandleUserNameOnChange}></input>
                    </div>

                    <div className="m-2">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input id="email" type="emial" placeholder="name@gmail.com" className="form-control" onChange={handleEmailOnChange}></input>
                    </div>

                    <div className="m-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="d-flex flex-row">
                            <input id="password" type={showPassword ? "text" : "password"} placeholder="*********" className="form-control" onChange={handlePasswordOnChange}></input>
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={togglePasswordVisibility}
                                style={{ opacity: "0.4" }}>
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <div className="m-2">
                        <label htmlFor="password" className="form-label"> Confirm Password</label>
                        <div className="d-flex flex-row">
                            <input id="password" type={showPassword ? "text" : "password"} placeholder="*********" className="form-control" onChange={handleConfirmPasswordOnChange}></input>
                        </div>
                    </div>

                    <div className="m-1">
                        <input type="checkbox" className="form-check-input" id="policyCheckBox" style={{ border: '2px solid rgba(0, 0, 0, 0.3)' }} />
                        <label htmlFor="policyCheckBox" className="form-label ms-2">
                            I have read and agree to the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        </label>
                    </div>

                    <div className="d-flex flex-column align-items-centre">
                        <button type="button" className="btn btn-info px-5 mx-5" onClick={HandleOnSubmit}>
                            Register
                        </button>
                    </div>

                </div>
                </div>
            </div>
        </div>
    );
}
