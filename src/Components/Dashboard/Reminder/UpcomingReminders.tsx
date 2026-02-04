import ReminderItem from './ReminderItem';
import { useEffect, useState } from "react";
import './UpcomingReminders.css';

import { Spinner } from "react-bootstrap";

import type { ReminderItemProps } from './ReminderItem';

export default function UpcomingReminders() {
    const [data, setData] = useState<ReminderItemProps[] | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setData([
                { isChecked: false, text: 'Buy Dorayaki from the sweet shop', time: "2026-02-04T17:00:00Z", priority: 'H' },
                { isChecked: false, text: 'Finish Math Homework', time: "2026-02-04T17:00:00Z", priority: 'M' },
                { isChecked: false, text: 'Call Shizuka about the picnic', time: "2026-02-04T17:00:00Z", priority: 'L' },
                { isChecked: true, text: 'clean', time: "2026-02-04T17:00:00Z", priority: 'D' },
            ]);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);


    return (
        <div className="container d-flex flex-column border border-1 py-4" style={{ borderRadius: "2rem", backgroundColor: "" }}>
            <div className="d-flex flex-row justify-content-between mb-4">
                <div className="d-flex flex-row align-items-center justify-content-center">
                    <i className="bi bi-list-ul me-2 text-primary" style={{ fontSize: "1.25rem", fontWeight: "900" }}></i>
                    <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>Upcoming Reminders</span>
                </div>
                <button className="btn btn-outline-primary viewAllButton">View All</button>
            </div>
            {data == null ? <Spinner/> :
            data.map((task, index) => (
            <ReminderItem key={index} isChecked={task.isChecked} text={task.text} time={task.time} priority={task.priority} />
            ))
}
        </div>
    );
}