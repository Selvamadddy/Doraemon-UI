import React, { useCallback, useState } from "react";
import type ToDoTaskModel from "../Model/ToDoTaskModel";
import formatDateTime from "../../Common/FormatDateTime";
import { SaveTask, DeleteTask } from "../Api/ToDoList";
import type { SaveTaskPayload } from "../Model/ToDoTaskModel";
import AddTaskModal from "./AddTaskModal";
import { useAppDispatch } from "../../../Hooks/ReduxHook";
import { UpdateToDoTask, RemoveToDoTask } from "../../../ReduxManager/Slices/ToDoTask/ToDoTaskSlice";
import { useToast } from "../../Common/ErrorToast/ToastContext";

interface Props {
  task: ToDoTaskModel;
}

const getPriorityConfig = (severity: number) => {
  switch (severity) {
    case 1:
      return { label: "HIGH", className: "bg-danger-subtle text-danger" };
    case 2:
      return { label: "MEDIUM", className: "bg-warning-subtle text-warning" };
    default:
      return { label: "LOW", className: "bg-success-subtle text-success" };
  }
};

export default React.memo(function TaskItem({ task }: Props) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const priority = getPriorityConfig(task.severity)!;
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const HandleTaskStatus = async () => {
    const payload: SaveTaskPayload = {
      toDoTask: {
        ...task,
        status: !task.status,
      }
    }
    const response = await SaveTask(payload);
    if (!response.success) {
      showToast("Failed to save task", "error");
    }
    else {
      dispatch(UpdateToDoTask({ ...task, status: !task.status, }));
    }
  };

  const HandleDelete = async () => {
    const response = await DeleteTask(task.id);
    if (!response.success) {
      showToast("Failed to delete task", "error");
    }
    else {
      dispatch(RemoveToDoTask(task.id));
    }
  };

   const OpenTaskModal = useCallback(() => {
      setShowTaskModal(true);
    }, []);
  
    const CloseTaskModal = useCallback(() => {
      setShowTaskModal(false);
    }, []);

  return (
    <>
    <div className={`card border-1 shadow-sm rounded-4 mb-3 ${task.status ? "bg-light" : ""}`}>
      <div className="card-body d-flex justify-content-between align-items-center">

        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle border d-flex align-items-center justify-content-center"
            style={{ width: 28, height: 28, cursor: "pointer", backgroundColor: task.status ? "#0d6efd" : "transparent", color: "white" }}
            onClick={() => HandleTaskStatus()}
          >
            {task.status && "✓"}
          </div>

          <div>
            <div
              className={`${task.status ? "text-decoration-line-through text-muted" : "text-primary"}`}
              style={{ cursor: `${task.status ? "" : "pointer"}` }} onClick={() => !task.status ? OpenTaskModal() : ""}
            >
              {task.title}
            </div>

            <div className="text-muted small">
              <i className="bi bi-calendar me-1"></i>
              {task.status ? "Completed" : "Due"} {formatDateTime(task.dueDate)}
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <span className={`badge rounded-pill px-3 py-2 ${priority.className}`}>
            {priority.label}
          </span>

          <div className="dropdown">
            <button className="btn btn-sm btn-light border-0" type="button" data-bs-toggle="dropdown">
              <i className="bi bi-three-dots-vertical"></i>
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow">
              {!task.status && <li>
                <button className="dropdown-item" onClick={() => OpenTaskModal()}>
                  <i className="bi bi-pencil me-2"></i> Edit
                </button>
              </li>}

              <li>
                <button className="dropdown-item text-danger" onClick={() => HandleDelete()}>
                  <i className="bi bi-trash me-2"></i> Delete
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
    <AddTaskModal show={showTaskModal} handleClose={CloseTaskModal} toDoTaskModel={task}/>
    </>
  );
}
);