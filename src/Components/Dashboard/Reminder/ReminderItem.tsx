import { useState } from "react";
import formatDateTime from "../../Common/FormatDateTime"

export interface ReminderItemProps {
    isChecked: boolean;
    text: string;
    time: Date | string,
    priority: string
}



export default function ReminderItem({ isChecked, text, time, priority }: ReminderItemProps) {
    const [viewDelete, SetViewDelete] = useState(false);

    const OnHoverCheckBoxStyle = {
        color: viewDelete ? "rgb(43, 124, 238)" : "",
        accentColor: viewDelete ? "rgb(43, 124, 238)" : "",
        fontSize: "1.5rem"
    }
    const OnHoverStyle = {
        color: viewDelete ? "rgb(43, 124, 238)" : "",
        borderColor: viewDelete ? "rgb(43, 124, 238)" : "",
        fontSize: "1.1rem"
    }

    const containerStyle = {
        backgroundColor: viewDelete ? "rgba(84, 148, 238, 0.08)" : "transparent",
    }

    const priorityClass =   priority === "H" ? "bg-danger" : (priority === "M" ? "bg-warning" : (priority === "D" ? "bg-secondary" : "bg-success"));

    return (
        <div className="rounded-pill mb-2 d-flex flex-row justify-content-between py-1 px-4 border border-3" 
        style={isChecked ? { pointerEvents: "none", opacity: 0.5 } : containerStyle}
            onMouseOut={() => SetViewDelete(false)} onMouseOver={() => SetViewDelete(true)}>

            <div className="d-flex flex-row align-items-center justify-content-center">
                <input className="me-2 form-check-input rounded-circle border border-3" type="checkbox" checked={isChecked} style={OnHoverCheckBoxStyle}
                onChange={() => ""}
                ></input>
                <div>
                   {!isChecked ? <i className="p-0" style={OnHoverStyle}>{text}</i> : <s className="p-0" style={OnHoverStyle}>{text}</s> }
                   {!isChecked && <p>Due {formatDateTime(time)}</p>}
                </div>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center">
                <span className={"badge rounded-pill px-3 py-2 me-2 " + priorityClass} style={{ fontSize: "0.9rem", opacity: "0.8" }}>
                    {priority === "H" ? "High" : (priority === "M" ? "Medium" : (priority === "D" ? "Done" : "Low")) }
                    </span>
                {viewDelete && <i className="bi bi-trash-fill" style={{ fontSize: "1.4rem" }}></i>}
            </div>
        </div>
    );
}