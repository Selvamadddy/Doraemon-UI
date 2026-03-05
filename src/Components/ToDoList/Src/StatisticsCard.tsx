interface Props {
  total: number;
  completed: number;
}

export default function StatisticsCard({ total, completed }: Props) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const remaining = total - completed;

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 text-center bg-light">
      <h4 className="fw-bold mb-4">Today's task</h4>

      <div className="d-flex justify-content-center mb-4">
        <div
          className="position-relative d-flex align-items-center justify-content-center"
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: `conic-gradient(#0d6efd ${percentage * 3.6}deg, #dee2e6 0deg)`,
          }}
        >
          <div
            className="bg-white rounded-circle d-flex flex-column align-items-center justify-content-center"
            style={{ width: "130px", height: "130px" }}
          >
            <h1 className="fw-bold mb-0">{percentage}%</h1>
            <small className="text-muted">PROGRESS</small>
          </div>
        </div>
      </div>

      <hr />

      <div className="row text-center">
        <div className="col">
          <h2 className="fw-bold text-primary">{completed}</h2>
          <small className="text-muted">TASKS DONE</small>
        </div>
        <div className="col">
          <h2 className="fw-bold text-secondary">{remaining}</h2>
          <small className="text-muted">REMAINING</small>
        </div>
      </div>
    </div>
  );
}