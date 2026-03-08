import React, { useState, useEffect, useMemo, useCallback, } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import useDateTimeFields from "../../../Hooks/useDateTimeFields";
import type ToDoTaskModel from "../Model/ToDoTaskModel";
import type { SaveTaskPayload } from "../Model/ToDoTaskModel";
import { SaveTask } from "../Api/ToDoList";
import { useAppDispatch} from "../../../Hooks/ReduxHook";
import { UpdateToDoTask, AddToDoTask } from "../../../ReduxManager/Slices/ToDoTask/ToDoTaskSlice";
import { useToast } from "../../Common/ErrorToast/ToastContext";

export interface AddTaskModalProps {
  show: boolean;
  handleClose: () => void;
  toDoTaskModel?: ToDoTaskModel | null;
}

type Severity = "Low" | "Medium" | "High";

interface FormState {
  taskName: string;
  severity: Severity;
  notes: string;
}

const severityMap: Record<number, Severity> = {
  1: "High",
  2: "Medium",
  3: "Low",
};

const severityToNumber: Record<Severity, number> = {
  High: 1,
  Medium: 2,
  Low: 3,
};

function AddTaskModalComponent({ show, handleClose, toDoTaskModel }: AddTaskModalProps) {

  const isEditMode = useMemo(() => !!toDoTaskModel?.id, [toDoTaskModel?.id]);
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const [form, setForm] = useState<FormState>({
    taskName: "",
    severity: "Low",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    dueDate,
    setDueDate,
    hour,
    setHour,
    minute,
    setMinute,
    period,
    setPeriod,
    getUtcDate,
    reset
  } = useDateTimeFields(toDoTaskModel?.dueDate);

  useEffect(() => {
    if (!show) return;

    if (!toDoTaskModel) {
      setForm({
        taskName: "",
        severity: "Low",
        notes: "",
      });
      setError("");
      return;
    }

    setForm({
      taskName: toDoTaskModel.title ?? "",
      severity:
        severityMap[toDoTaskModel.severity] ?? "Low",
      notes: toDoTaskModel.note ?? "",
    });

    setError("");
  }, [show, toDoTaskModel?.id]);

  const updateField = useCallback(
    <K extends keyof FormState>(
      key: K,
      value: FormState[K]
    ) => {
      setForm((prev) => ({
        ...prev,
        [key]: value,
      }));

      if (error) setError("");
    },
    [error]
  );

  const handleSave = useCallback(async () => {
    if (!form.taskName.trim()) {
      setError("Task name is required");
      return;
    }

    const utcDate = getUtcDate();

    const dueDateAsDate = utcDate ? utcDate : new Date().toISOString();

    const payload: SaveTaskPayload = {
      toDoTask: {
        id: isEditMode ? (toDoTaskModel == null ? 0 : toDoTaskModel.id) : 0,
        title: form.taskName,
        dueDate: dueDateAsDate,
        severity: severityToNumber[form.severity],
        note: form.notes,
        status: toDoTaskModel == null ? false : toDoTaskModel.status
      },
    };

    const response = await SaveTask(payload);
    if (response.success && response.data != null && response.data > 0) {
      reset();
      handleClose();
      isEditMode ? dispatch(UpdateToDoTask(payload.toDoTask)) : dispatch(AddToDoTask({ ...payload.toDoTask, id: response.data }));
    }
    else {
      setError("Failed to save task");
      showToast("Failed to save task", "error");
    }
    setLoading(false);
  }, [form, getUtcDate, isEditMode, handleClose]);

  if (!show) return null;

  return (
    <Modal show={show} onHide={handleClose} centered scrollable>
      <Modal.Body className="p-3 p-md-4">
        <div className="text-center mb-3">
          <div
            className="mx-auto mb-2 d-flex align-items-center justify-content-center"
            style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#facc15" }}
          >
            🔔
          </div>
          <h5 className="fw-bold mb-0">
            {isEditMode ? "Edit Task" : "Add New Task"}
          </h5>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Task Name *
          </label>
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="What do you need help with?"
            value={form.taskName}
            onChange={(e) =>
              updateField("taskName", e.target.value)
            }
          />
          {error && (
            <small className="text-danger ms-2">
              {error}
            </small>
          )}
        </div>

        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <label className="form-label">
              Due Date
            </label>
            <input type="date" className="form-control rounded-pill"
              value={dueDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">
              Time
            </label>
            <div className="d-flex gap-2">
              <select
                className="form-select rounded-pill"
                value={hour}
                onChange={(e) =>
                  setHour(e.target.value)
                }
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const h = String(i + 1).padStart(2, "0");
                  return (
                    <option key={h}>
                      {h}
                    </option>
                  );
                }
                )}
              </select>

              <select className="form-select rounded-pill" value={minute} onChange={(e) => setMinute(e.target.value)}>
                {["00", "15", "30", "45"].map((m) => (<option key={m}>{m}</option>))}
              </select>

              <select
                className="form-select rounded-pill" value={period}
                onChange={(e) => setPeriod(e.target.value as "AM" | "PM")}
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Severity
          </label>
          <div className="d-flex flex-column flex-md-row gap-2">
            {(["Low", "Medium", "High"] as Severity[]).map(
              (level) => {
                const variant = level === "Low" ? "success" : level === "Medium" ? "warning" : "danger";
                const isActive = form.severity === level;
                return (
                  <button key={level} type="button" className={`btn rounded-pill w-100 ${isActive ? `btn-${variant}` : `btn-outline-${variant}`}`}
                    onClick={() => updateField("severity", level)}
                  >
                    ● {level}
                  </button>
                );
              }
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">
            Additional Notes
          </label>
          <textarea className="form-control rounded-4" rows={3} placeholder="Add more details about this task..."
            value={form.notes} onChange={(e) => updateField("notes", e.target.value)}
          />
        </div>

        <Button variant="primary" className="w-100 rounded-pill mb-2" onClick={handleSave} disabled={loading}>
          {loading ? (<Spinner animation="border" size="sm" />) : ("✔ Save Task")}
        </Button>

        <div className="text-center">
          <button className="btn btn-link text-muted" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(
  AddTaskModalComponent,
  (prev, next) =>
    prev.show === next.show &&
    prev.toDoTaskModel?.id ===
    next.toDoTaskModel?.id
);