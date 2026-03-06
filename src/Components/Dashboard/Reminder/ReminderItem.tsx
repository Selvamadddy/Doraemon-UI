import { useState } from "react";
import formatDateTime from "../../Common/FormatDateTime"

import type ToDoTaskModel from "../../ToDoList/Model/ToDoTaskModel"
import type { SaveTaskPayload } from "../../ToDoList/Model/ToDoTaskModel"

import { SaveTask } from "../../ToDoList/Api/ToDoList"

interface ReminderItemProps extends ToDoTaskModel {
    OnUpdate: (task: ToDoTaskModel) => void;
}

export default function ReminderItem({ OnUpdate, ...prop }: ReminderItemProps) {
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

    const priorityClass = prop.severity === 1 ? "bg-danger" : (prop.severity === 2 ? "bg-warning" : (prop.severity === 3 ? "bg-success" : "bg-secondary"));

    const HandleCheckBox = async () => {
        const payload: SaveTaskPayload = {
            toDoTask: {
                ...prop,
                status: !prop.status,
            }
        }
        const response = await SaveTask(payload);
        if (!response.success) {
            console.log("save task api failed");
        }
        else {
            OnUpdate(payload.toDoTask);
        }
    };

    return (
        <div className="rounded-pill mb-2 d-flex flex-row justify-content-between py-1 px-4 border border-3"
            style={prop.status ? { pointerEvents: "none", opacity: 0.5 } : containerStyle}
            onMouseOut={() => SetViewDelete(false)} onMouseOver={() => SetViewDelete(true)}>

            <div className="d-flex flex-row align-items-center justify-content-center">
                <input className="me-2 form-check-input rounded-circle border border-3" type="checkbox" checked={prop.status} style={OnHoverCheckBoxStyle}
                    onChange={() => HandleCheckBox()}
                ></input>
                <div>
                    {!prop.status ? <i className="p-0" style={OnHoverStyle}>{prop.title}</i> : <s className="p-0" style={OnHoverStyle}>{prop.title}</s>}
                    {!prop.status && <p>Due {formatDateTime(prop.dueDate)}</p>}
                </div>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center">
                <span className={"badge rounded-pill px-3 py-2 me-2 " + priorityClass} style={{ fontSize: "0.9rem", opacity: "0.8" }}>
                    {prop.severity === 1 ? "High" : (prop.severity === 2 ? "Medium" : (prop.severity === 3 ? "Low" : "Done"))}
                </span>
            </div>
        </div>
    );
}