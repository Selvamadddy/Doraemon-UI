import './StatCard.css'

interface StatCardProps{
    icon : string;
    data : string;
    statName : string;
    fontColour : string;
}

export default function StatCard( {icon, data, statName, fontColour} : StatCardProps) {
    const iconClass = "bi bi-" + icon + " me-2";

    const cardStyle = {
        color : fontColour, 
    }

    return (
        <div className="col mb-4 p-2">
            <div className="card cardStyle" style={cardStyle}>
                <div className="d-flex flex-column align-items-center p-3">
                    <div className="d-flex flex-row align-items-center">
                        <i className={iconClass} style={{fontSize : '1.3rem'}}></i>
                        <span style={{fontSize : '1.5rem', fontWeight : '500', color : 'black'}}>{data}</span>
                    </div>
                    <p className="text-uppercase" style={{fontSize : 'clamp(10px, 1vw, 15px)'}}>{statName}</p>
                </div>
            </div>
        </div>
    );
}