import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import Logo from "../../Asset/Logo.png";

import { GetOtp, ValidateOtp, ResetOldPassword } from "../../API/ResetPassword"

export default function ResetPassword() {

    //#region States
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPpassword, setConfirmPpassword] = useState('');
    const [isValid, setIsValid] = useState({ isValid: true, errorMsg: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [canSendRequest, setCanSendRequest] = useState<boolean>(false);
    const [token, setToken] = useState<string>('');

    const navigate = useNavigate();

    const [section, setSection] = useState('Email');
    //#endregion States

    //#region function handler
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

    const CheckData = (state: string, stateName: "Email" | "Password" | "OTP"): void => 
    {
        if (stateName === "Email" &&
            !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)/.test(
                email.toLowerCase()
            )
        ) {
            setIsValid({ isValid: false, errorMsg: "Enter valid email" });
            setCanSendRequest(false);
        }
        else if (stateName === "Password" &&
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(state)
        ) {
            setIsValid({ isValid: false, errorMsg: "Enter valid password" });
            setCanSendRequest(false);
        }
        else if (stateName === "OTP" &&
            !/^\d{6}$/.test(state)
        ) {
            setIsValid({ isValid: false, errorMsg: "Enter valid password" });
            setCanSendRequest(false);
        }
        else {
            setIsValid({ isValid: true, errorMsg: "" });
            setCanSendRequest(true);
        }
    };

    const HandleOnEmailButton = async (): Promise<void> => {
        setIsLoading(true);
        CheckData(email, "Email");
        if(canSendRequest)
        {
            const response = await GetOtp(email);
            if(response)
            {
                setSection('OTP');
            }
            else
            {
                setIsValid({ isValid: false, errorMsg: "Enter valid email" });
            }       
        }
        setIsLoading(false);
    }

    const handleOnOtpButton = async (): Promise<void> => {        
        setIsLoading(true);
        CheckData(otp, "OTP");
        if(canSendRequest)
        {
            const response = await ValidateOtp(otp, email);
            if(response != null && response != undefined)
            {
                setToken(response);
                setSection('NewPassword');
            }
            else
            {
                setIsValid({ isValid: false, errorMsg: "Enter valid OTP" });
            }       
        }
        setIsLoading(false);
    }

    const handleOnChangePasswordButton = async (): Promise<void> => {
        setIsLoading(true);
        if(password === confirmPpassword)
        {
            CheckData(password, "Password");
            if(canSendRequest)
            {
                const response = await ResetOldPassword(email, password, token);
                if(response)
                {
                    navigate("/login");
                }
                else
                {
                    setIsValid({ isValid: false, errorMsg: "Enter valid Password or try again some time" });
                }       
            }
            setIsLoading(false);
        }
        else
        {
            setIsValid({ isValid: false, errorMsg: "Both Password's should be same" });
        }
       
    }
    //#endregion function handler

    return (
        <div className="container-fluid login-bg">
            <div className="card  my-2 overflow-hidden bg-transparent">
                <div className="card-body d-flex flex-column align-items-center">
                    {/* Logo */}
                    <div className="d-flex flex-row align-items-center mb-5 justify-content-center companyName">
                        <img src={Logo} alt="Logo" className="rounded-circle img-fluid logo-img" />
                        <div className="d-flex flex-column fw-bold text-primary fst-italic align-items-center"
                            style={{ marginLeft: "5px", fontSize: "2.3rem" }}>
                            Doraemon
                            <small className="text-secondary" style={{ fontSize: "1rem" }}>AI assistant</small>
                        </div>
                    </div>

                    {/* Reset password */}
                    {section === 'Email' &&
                        <div className="card-body p-5" style={{ backgroundColor: "rgba(255, 255, 255, 0.93)", border: '2px solid rgba(0, 0, 0, 0.3)' }}>
                            <div className="d-flex flex-column align-items-center">
                                <h3 className="mb-5 p-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.77)", borderRadius: "5%" }}>
                                    Reset Password
                                </h3>
                            </div>

                            {!isValid.isValid && <div className="alert alert-danger p-0 w-6 d-flex flex-row" role="alert" style={{ justifyContent: "center" }}>
                               {isValid.errorMsg}
                            </div>}

                            <div className="m-4">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input id="email" type="emial" placeholder="name@gmail.com" className="form-control" onChange={handleEmailOnChange}></input>
                            </div>

                            <div className="d-flex flex-column align-items-centre">
                                <button type="button" className="btn btn-info px-5 mx-5" onClick={HandleOnEmailButton}>
                                    {isLoading ? '...Requested OTP' : 'Send OTP'}
                                </button>
                            </div>

                            <div className="d-flex flex-row justify-content-between mt-3">
                                <a href="#" style={{ color: "#070707" }} onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
                                    Login
                                </a>
                                <a href="#" style={{ color: "#070707" }} onClick={(e) => { e.preventDefault(); navigate("/register"); }}>
                                    Register here
                                </a>
                            </div>
                        </div>
                    }

                    {/* OTP */}
                    {section === 'OTP' &&
                        <div className="card-body p-5" style={{ backgroundColor: "rgba(255, 255, 255, 0.93)", border: '2px solid rgba(0, 0, 0, 0.3)' }}>
                            <div className="d-flex flex-column align-items-center">
                                <h3 className="mb-5 p-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.77)", borderRadius: "5%" }}>
                                    OTP
                                </h3>
                            </div>

                            {!isValid.isValid && <div className="alert alert-danger p-0 w-6 d-flex flex-row" role="alert" style={{ justifyContent: "center" }}>
                               {isValid.errorMsg}
                            </div>}

                            <div className="m-4">
                                <label htmlFor="otpbox" className="form-label">Enter OTP</label>
                                <input
                                    id="otpbox"
                                    value={otp}
                                    onChange={(e) =>
                                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                                    }
                                    maxLength={6}
                                    inputMode="numeric"
                                    className="ms-2"
                                />
                            </div>

                            <div className="d-flex flex-column align-items-centre">
                                <button type="button" className="btn btn-info px-1 mx-5" onClick={handleOnOtpButton}>
                                    {isLoading ? "...Validating otp"  : 'Enter'}
                                </button>
                            </div>

                            <div className="d-flex flex-row justify-content-between mt-3">
                                <a href="#" style={{ color: "#070707" }} onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
                                    Login
                                </a>
                                <a href="#" style={{ color: "#070707" }} onClick={(e) => { e.preventDefault(); navigate("/register"); }}>
                                    Register here
                                </a>
                            </div>
                        </div>
                    }

                    {/* New password */}
                    {section === 'NewPassword' &&
                        <div className="card-body p-5" style={{ backgroundColor: "rgba(255, 255, 255, 0.93)", border: '2px solid rgba(0, 0, 0, 0.3)' }}>
                            <div className="d-flex flex-column align-items-center">
                                <h3 className="mb-5 p-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.77)", borderRadius: "5%" }}>
                                    Enter New Password
                                </h3>
                            </div>

                            {!isValid.isValid && <div className="alert alert-danger p-0 w-6 d-flex flex-row" role="alert" style={{ justifyContent: "center" }}>
                               {isValid.errorMsg}
                            </div>}

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

                            <div className="d-flex flex-column align-items-centre">
                                <button type="button" className="btn btn-info px-3 mx-5" onClick={handleOnChangePasswordButton}>
                                    {isLoading ? '...Updating Password' : "Change password" }
                                </button>
                            </div>
                            <div className="d-flex flex-row justify-content-between mt-3">
                                <a href="#" style={{ color: "#070707" }} onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
                                    Login
                                </a>
                                <a href="#" style={{ color: "#070707" }} onClick={(e) => { e.preventDefault(); navigate("/register"); }}>
                                    Register here
                                </a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
