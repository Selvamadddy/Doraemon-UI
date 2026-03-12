import { useState, useEffect } from "react";
import type ToastModel from "./ToastModel";

interface Props {
    toast: ToastModel;
    onClose: () => void;
}

export default function ToastItem({ toast, onClose }: Props) {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = 50;
        const duration = 5000;
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((p) => {
                if (p <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return p - step;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    const color = toast.type === "error" ? "danger" : (toast.type === "success" ? "success" : (toast.type === "warning" ? "warning" : "primary"));

    return (
        <div className={`card border-${color} shadow mb-2`}>
            <div className={`card-header d-flex justify-content-between bg-${color} text-white`}>
                <span> {toast.message} </span>
                <button className="btn-close btn-close-white" onClick={onClose} />
            </div>
            <div className="progress" style={{ height: "4px" }}>
                <div className={`progress-bar bg-${color}`} style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
}