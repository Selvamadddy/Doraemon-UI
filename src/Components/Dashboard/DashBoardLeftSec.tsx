import DashboardStats from "./DashboardStatsCards/DashboardStats";
import UpcomingReminders from "./Reminder/UpcomingReminders";
import ToDoButtons from "./ToDoButtons/TaskButton"
import WelcomeGif from '/src/Asset/Doraemon-Welcome.gif'

const ToDoButtonMinPixel: number = 800;

export default function DashBoardLeftSec() {

    return (
        <div className="card-body d-flex flex-column" >
            <div className="d-flex flex-column align-items-center">
                <div className="d-flex flex-row align-items-center">
                    {window.innerWidth > ToDoButtonMinPixel && <img src={WelcomeGif} alt="" style={{ height: "3.5rem" }} />}
                    <div>
                        <p style={{ fontSize: '1.8rem', marginBottom: '0' }}>Welcome back, Nobita!</p>
                        <p style={{ fontSize: '0.8rem' }}>Ready to make today magical with some new gadgets?</p>
                    </div>

                </div>
            </div>

            {window.innerWidth < ToDoButtonMinPixel && <ToDoButtons />}

            <div className="container">
                <div className="row row-cols-2 row-cols-md-4">
                    <DashboardStats /> 
                </div>
            </div>
            <div>
                <UpcomingReminders />
            </div>

        </div>
    );
}