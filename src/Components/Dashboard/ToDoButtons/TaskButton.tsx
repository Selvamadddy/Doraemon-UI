import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import AddNoteModal from "./AddNoteModal";

const ToDoButtons: React.FC = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-evenly mt-4 gap-2 flex-wrap">
        <button
          className="rounded-pill btn btn-outline-primary"
          onClick={() => setShowTaskModal(true)}
        >
          <i className="bi bi-plus-lg pe-2"></i>
          New Task
        </button>

        <button
          className="rounded-pill btn btn-outline-secondary"
          onClick={() => setShowNoteModal(true)}
        >
          <i className="bi bi-pencil-fill pe-2"></i>
          Add Note
        </button>
      </div>

      <AddTaskModal
        show={showTaskModal}
        handleClose={() => setShowTaskModal(false)}
      />

      <AddNoteModal
        show={showNoteModal}
        handleClose={() => setShowNoteModal(false)}
      />
    </>
  );
};

export default ToDoButtons;
