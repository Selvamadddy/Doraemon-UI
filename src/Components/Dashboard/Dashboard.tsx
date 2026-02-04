import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoardRightSec from './DashBoardRightSec';
import DashBoardLeftSec from './DashBoardLeftSec';


export default function Dashboard(){
    return(
        <div className="card bg-transparent">
                <div className="row g-0">
                    <div className="col-md-8">
                        <DashBoardLeftSec />
                    </div>
                    <div className="col-md-4 d-flex flex-column">
                        <DashBoardRightSec />
                    </div>
                </div>
            </div>
    );
}