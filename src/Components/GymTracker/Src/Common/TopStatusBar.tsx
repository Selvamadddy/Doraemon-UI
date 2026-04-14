import "bootstrap/dist/css/bootstrap.min.css";
import { FaFire, FaStar, FaWeightHanging } from "react-icons/fa";

export default function TopStatusBar() {
  return (
    <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-light border-bottom">

      <div className="d-flex gap-2">
        
        <div className="d-flex align-items-center px-2 py-1 rounded-pill bg-white shadow-sm">
          <FaFire className="text-warning me-2" />
          <span className="fw-semibold"  style={{ fontSize: "clamp(12px, 1.2vw, 16px)" }}>12 Streak</span>
        </div>

        <div className="d-flex align-items-center px-2 py-1 rounded-pill bg-white shadow-sm">
          <FaStar className="text-primary me-2" />
          <span className="fw-semibold"  style={{ fontSize: "clamp(12px, 1.2vw, 16px)" }}>Level 42</span>
        </div>

      </div>

      <div>
        <button className="btn btn-primary rounded-pill px-2 d-flex align-items-center">
          <FaWeightHanging className="me-2" />
         <span style={{ fontSize: "clamp(12px, 1.2vw, 16px)" }}>175 lbs</span> 
        </button>
      </div>

    </div>
  );
}