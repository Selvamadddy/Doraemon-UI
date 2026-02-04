import { Modal, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

interface AddNoteModalProps {
  show: boolean;
  handleClose: () => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  show,
  handleClose,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔄 Reset form when modal opens
  useEffect(() => {
    if (show) {
      setTitle("");
      setContent("");
      setError("");
    }
  }, [show]);

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Note title is required");
      return;
    }

    const payload = {
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);

      // 🔌 SAMPLE API CALL
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      handleClose();
    } catch (err) {
      alert("Failed to save note");
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
      size="lg"
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
            ✏️
          </div>
          <h5 className="fw-bold mb-0">Create New Note</h5>
        </div>

        {/* Note Title */}
        <div className="mb-3">
          <label className="form-label">Note Title *</label>
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Title of your note..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {error && (
            <small className="text-danger ms-2">{error}</small>
          )}
        </div>

        {/* Note Content */}
        <div className="mb-4">
          <label className="form-label">Note</label>
          <textarea
            className="form-control rounded-4"
            rows={6}
            placeholder="Start typing your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Actions */}
        <Button
          variant="primary"
          className="w-100 rounded-pill mb-2"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : "💾 Save Note"}
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

export default AddNoteModal;
