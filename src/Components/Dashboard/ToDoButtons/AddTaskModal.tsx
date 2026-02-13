import { Modal, Button, Spinner } from "react-bootstrap";
import { useState } from "react";

interface AddTaskModalProps {
  show: boolean;
  handleClose: () => void;
}

type Severity = "Low" | "Medium" | "High";

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  show,
  handleClose,
}) => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [severity, setSeverity] = useState<Severity>("Low");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!taskName.trim()) {
      setError("Task name is required");
      return;
    }

    setError("");

    const finalDate =
      dueDate || new Date().toISOString().split("T")[0];

    const payload = {
      taskName,
      dueDate: finalDate,
      time: `${hour}:${minute} ${period}`, // 12h format
      severity,
      notes,
    };

    try {
      setLoading(true);

      // 🔌 SAMPLE API CALL
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      handleClose();
    } catch (error) {
      alert("Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      scrollable
    >
      <Modal.Body className="p-3 p-md-4">
        {/* Header */}
        <div className="text-center mb-3">
          <div
            className="mx-auto mb-2 d-flex align-items-center justify-content-center"
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#facc15",
            }}
          >
            🔔
          </div>
          <h5 className="fw-bold mb-0">Add New Task</h5>
        </div>

        {/* Task Name */}
        <div className="mb-3">
          <label className="form-label">Task Name *</label>
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="What do you need help with?"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          {error && (
            <small className="text-danger ms-2">{error}</small>
          )}
        </div>

        {/* Date & Time */}
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control rounded-pill"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">Time</label>
            <div className="d-flex gap-2">
              <select
                className="form-select rounded-pill"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const h = String(i + 1).padStart(2, "0");
                  return <option key={h}>{h}</option>;
                })}
              </select>

              <select
                className="form-select rounded-pill"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
              >
                {["00", "15", "30", "45"].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>

              <select
                className="form-select rounded-pill"
                value={period}
                onChange={(e) =>
                  setPeriod(e.target.value as "AM" | "PM")
                }
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Severity */}
        <div className="mb-3">
          <label className="form-label">Severity</label>
          <div className="d-flex flex-column flex-md-row gap-2">
            <button
              type="button"
              className={`btn rounded-pill w-100 ${
                severity === "Low"
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
              onClick={() => setSeverity("Low")}
            >
              ● Low
            </button>

            <button
              type="button"
              className={`btn rounded-pill w-100 ${
                severity === "Medium"
                  ? "btn-warning"
                  : "btn-outline-warning"
              }`}
              onClick={() => setSeverity("Medium")}
            >
              ● Medium
            </button>

            <button
              type="button"
              className={`btn rounded-pill w-100 ${
                severity === "High"
                  ? "btn-danger"
                  : "btn-outline-danger"
              }`}
              onClick={() => setSeverity("High")}
            >
              ● High
            </button>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="form-label">Additional Notes</label>
          <textarea
            className="form-control rounded-4"
            rows={3}
            placeholder="Add more details about this task..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Actions */}
        <Button
          variant="primary"
          className="w-100 rounded-pill mb-2"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : "✔ Save Task"}
        </Button>

        <div className="text-center">
          <button
            className="btn btn-link text-muted"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;
