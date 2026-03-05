import StatisticsCard from "./StatisticsCard";
import TipCard from "./TipCard";
import ToDoTask from "./ToDoTask";

import { useAppSelector } from "../../../Hooks/ReduxHook";

export default function ToDo() {
    const toDoTasks = useAppSelector(state => state.toDoTask);

    const today = new Date();

    const todayTasks = toDoTasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return (
            taskDate.getFullYear() === today.getFullYear() &&
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getDate() === today.getDate()
        );
    });
    const todayCount = todayTasks.length;
    const completedCount = todayTasks.filter(task => task.status).length;

    return (
        <div className="card bg-transparent">
            <div className="row g-0">
                <div className="col-md-8">
                    <ToDoTask />
                </div>
                <div className="col-md-4 d-flex flex-column p-3">
                    <StatisticsCard total={todayCount} completed={completedCount} />

                    <br></br>
                    <TipCard />
                </div>
            </div>
        </div>
    );
}