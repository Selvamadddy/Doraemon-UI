import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import LoginImg from "../../Asset/LoginPic.jpg";
import Carousal2 from "../../Asset/Carousal2.jpg";
import Carousal3 from "../../Asset/Carousal3.jpg";
import Logo from "../../Asset/Logo.png";
import background from "../../Asset/background.jpg";
import Carousal1 from "../../Asset/Login-car-1.png"

interface ValidationState {
    isValid: boolean;
    errorMsg: string;
}

interface FailedState {
    failed: boolean;
    msg: string;
}

export default function Login() {
    //#region States
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const [isValidEmail, setIsValidEmail] = useState<ValidationState>({
        isValid: true,
        errorMsg: "",
    });

    const [isValidPassword, setIsValidPassword] = useState<ValidationState>({
        isValid: true,
        errorMsg: "",
    });

    const [isFailed, setIsFailed] = useState<FailedState>({
        failed: false,
        msg: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    //#endregion States

    //#region Constant
    let canSendRequest: boolean = false;

    const CheckEmpty = (
        state: string,
        setState: React.Dispatch<React.SetStateAction<ValidationState>>,
        stateName: "Email" | "Password"
    ): void => {
        if (state === "") {
            setState({ isValid: false, errorMsg: `${stateName} can not be empty` });
            canSendRequest = false;
        } else if (
            stateName === "Email" &&
            !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)/.test(
                email.toLowerCase()
            )
        ) {
            setState({ isValid: false, errorMsg: "Enter valid email" });
            canSendRequest = false;
        } else if (
            stateName === "Password" &&
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(state)
        ) {
            setState({ isValid: false, errorMsg: "Enter valid password" });
            canSendRequest = false;
        } else {
            setState({ isValid: true, errorMsg: "" });
            canSendRequest = true;
        }
    };
    //#endregion Constant

    //#region Input Handlers
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setPassword(event.target.value);
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword((prev) => !prev);
    };

    const HandleSubmitButton = async (): Promise<void> => {
        setIsLoading(true);

        CheckEmpty(email, setIsValidEmail, "Email");
        CheckEmpty(password, setIsValidPassword, "Password");

        navigate("/dashboard");

        setIsFailed({
            failed: true,
            msg: "Invalid Email And Password",
        });

        setIsLoading(false);
    };
    //#endregion Input Handlers

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

                    {/* Login card */}
                    <div className="card d-flex flex-column m-3 align-items-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", width: "clamp(300px, 50%, 400px)" }}>
                        <h2 className="m-4">Login</h2>

                        {isFailed.failed && (
                            <div className="alert alert-danger" role="alert">
                                {isFailed.msg}
                            </div>
                        )}

                        <div>
                            <div className="m-2">
                                <label htmlFor="email" className="form-label">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@gmail.com"
                                    className="form-control"
                                    onChange={handleEmailChange}
                                />
                            </div>

                            <div className="m-2">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <div className="d-flex flex-row">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="*********"
                                        className="form-control me-1"
                                        onChange={handlePasswordChange}
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        style={{ opacity: "0.4" }}
                                    >
                                        <i
                                            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"
                                                }`}
                                        ></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-info px-5 m-4"
                            onClick={HandleSubmitButton}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Login"}
                        </button>

                        {isFailed.failed && (
                            <a className="small text-muted mb-4" href="#!">
                                forgot password?
                            </a>
                        )}

                        <p className="mb-4">
                            Don&apos;t have an account?{" "}
                            <a href="#" style={{ color: "#393f81" }} onClick={(e) => {e.preventDefault();navigate("/register");}}>
                                Register here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
