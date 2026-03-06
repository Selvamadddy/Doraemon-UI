import { useEffect, useState } from "react";
import "./Chat.css";

interface Prop {
    updateIsActive: () => void;
}

export default function ActivateChatServer({ updateIsActive }: Prop) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count > 4) return;

        const timerId = setTimeout(() => {
            setCount((prev) => prev + 1);
            console.log("Retry attempt:", count + 1);
        }, 2000);

        return () => clearTimeout(timerId);
    }, [count]);

    const handleRetry = () => {
        setCount(0);
    };

    const progress = (count / 5) * 100;

    return (
        <div className="chat-body d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4 text-center" style={{ width: "380px" }}>

                <h4 className="text-danger mb-3">
                    <i className="bi bi-exclamation-triangle"></i> ChatBot Server is Down
                </h4>

                {count < 5 ? (
                    <>
                        <div className="mb-3">
                            <div className="spinner-border text-primary" role="status"></div>
                        </div>

                        <p className="mb-1 fw-semibold">Booting up server...</p>
                        <small className="text-muted mb-3 d-block">
                            Cold start may take around 1 minute
                        </small>

                        <div className="progress mb-2" style={{ height: "8px" }}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%` }}></div>
                        </div>

                        <small className="text-muted">
                            Attempt {count + 1} of 5
                        </small>
                    </>
                ) : (
                    <>
                        <div className="alert alert-warning">
                            Unable to cold start the server.
                        </div>

                        <p className="mb-3">
                            Tap the button below to try again.
                        </p>

                        <div className="d-flex justify-content-center align-items-center">
                            <button className="btn btn-primary rounded-circle big-circle-btn shadow" onClick={updateIsActive}>
                                <i className="bi bi-rocket-fill"></i>
                            </button>
                        </div>


                        <small className="text-muted mt-2 d-block">
                            Boot Server
                        </small>
                    </>
                )}
            </div>
        </div>
    );
}