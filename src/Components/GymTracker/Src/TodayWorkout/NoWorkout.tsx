

export default function NoWorkout({switchScreen} : { switchScreen : (screen : string) => void}) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center mt-3 mb-4">
        <h3 className="mt-1 mb-4 text-primary">Today's Workout</h3>
        
      <div className="d-flex justify-content-center align-items-center mb-4"
        style={{width: "120px", height: "120px",borderRadius: "50%",backgroundColor: "#eef2f7", boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",}}>
        <i className="bi bi-calendar-x" style={{ fontSize: "40px", color: "#6c757d" }}></i>
      </div>

      <p className="text-uppercase fw-bold mb-2" style={{ fontSize: "12px", letterSpacing: "1px", color: "#6c757d" }}>
        Ready for your next peak?
      </p>

      <h2 className="fw-bold mb-3" style={{ color: "#1f2d3d" }}>
        No workout configured <br /> for today
      </h2>

      <p className="text-muted mb-4" style={{ maxWidth: "400px", fontSize: "14px" }}>
        Your performance data is waiting. Start a fresh session or pick up where
        you left off in your training program.
      </p>

      <button className="btn btn-primary px-4 py-2 rounded-pill d-flex align-items-center gap-2 mb-3" style={{ fontSize: "14px" }} 
      onClick={() => switchScreen("CreateWorkout")}>
        <i className="bi bi-plus-circle"></i>
        Create Workout for Today
      </button>

      <a href="#" className=" p-2 text-decoration-none text-primary" onClick={() => switchScreen("ExerciseLibrary")}>
        Browse Exercise →
      </a>
    </div>
  );
};