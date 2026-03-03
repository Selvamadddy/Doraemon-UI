import React, { useState, useCallback } from "react";
import AddTaskModal from "./AddTaskModal";
import AddNoteModal from "./AddNoteModal";

const ToDoButtons: React.FC = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  // ✅ Stable handlers (important for React.memo)
  const openTaskModal = useCallback(() => {
    setShowTaskModal(true);
  }, []);

  const closeTaskModal = useCallback(() => {
    setShowTaskModal(false);
  }, []);

  const openNoteModal = useCallback(() => {
    setShowNoteModal(true);
  }, []);

  const closeNoteModal = useCallback(() => {
    setShowNoteModal(false);
  }, []);

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-evenly mt-4 gap-2 flex-wrap">
        <button
          className="rounded-pill btn btn-outline-primary"
          onClick={openTaskModal}
        >
          <i className="bi bi-plus-lg pe-2"></i>
          New Task
        </button>

        <button
          className="rounded-pill btn btn-outline-secondary"
          onClick={openNoteModal}
        >
          <i className="bi bi-pencil-fill pe-2"></i>
          Add Note
        </button>
      </div>

      {/* Create Mode (no task passed) */}
      <AddTaskModal
        show={showTaskModal}
        handleClose={closeTaskModal}
      />

      <AddNoteModal
        show={showNoteModal}
        handleClose={closeNoteModal}
      />
    </>
  );
};

export default React.memo(ToDoButtons);