import ReminderItem from './ReminderItem';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './UpcomingReminders.css';

import { Spinner } from "react-bootstrap";

import type ToDoTaskModel from "../../ToDoList/Model/ToDoTaskModel"
import type { GetTasksPayload } from "../../ToDoList/Model/ToDoTaskModel"

import { GetTasks } from "../../ToDoList/Api/ToDoList"

export default function UpcomingReminders() {
    const [data, setData] = useState<ToDoTaskModel[] | null>(null);

    const hasFetched = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;

            const payload: GetTasksPayload = {
                Filter: {
                    Severity: null,
                    Status: null,
                    DueDate: null,
                    CretaedDate: null
                },
                SearchKey: null,
                Pagination: {
                    Count: 0,
                    Offset: 0,
                    Limit: 5,
                    SortOrder: null,
                    SortBy: null
                }
            };

            const response = await GetTasks(payload);
            if (response.success) {
                setData(response.data != null ? response.data : [])
            }
            else {
                console.log("api error");
            }
        };

        fetchData();
    }, []);

    const UpdateTaskState = (updatedTask : ToDoTaskModel) =>
    {
        setData(prev => prev ? prev.map(task => task.id === updatedTask.id ? updatedTask : task) : prev);
    }

    return (
        <div className="container d-flex flex-column border border-1 py-4" style={{ borderRadius: "2rem", backgroundColor: "" }}>
            <div className="d-flex flex-row justify-content-between mb-4">
                <div className="d-flex flex-row align-items-center justify-content-center">
                    <i className="bi bi-list-ul me-2 text-primary" style={{ fontSize: "1.25rem", fontWeight: "900" }}></i>
                    <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>Upcoming Reminders</span>
                </div>
                <button className="btn btn-outline-primary viewAllButton" onClick={() => navigate('/doTo')}>View All</button>
            </div>
            {data == null ? <Spinner /> :
                data.map((task) => (
                    <ReminderItem key={task.id} {...task} OnUpdate={UpdateTaskState} />
                ))
            }
        </div>
    );
}