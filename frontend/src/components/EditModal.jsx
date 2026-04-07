import { useState } from "react";
import { PRIORITIES, CATEGORIES } from "../constants";

export default function EditModal({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);
  const [category, setCategory] = useState(task.category);
  const [error, setError] = useState("");

  function handleSave() {
    if (!title.trim()) {
      setError("Task title cannot be empty.");
      return;
    }
    onSave({
      ...task,
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
    });
  }

  // Close on backdrop click
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label="Edit task"
      >
        <h2 className="modal-title">Edit Task</h2>

        {error && <div className="error-msg">{error}</div>}

        <div className="form-group">
          <label className="form-label" htmlFor="edit-title">
            Task
          </label>
          <input
            id="edit-title"
            className="input"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        </div>
        {/* Description */}
        <div className="form-group">
          <label className="form-label" htmlFor="edit-description">
            Description
          </label>
          <textarea
            id="edit-description"
            className="input"
            placeholder="Add a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{ resize: "vertical", lineHeight: "1.5" }}
          />
        </div>
        <div className="modal-meta-row">
          <div className="form-group">
            <label className="form-label" htmlFor="edit-priority">
              Priority
            </label>
            <select
              id="edit-priority"
              className="input select-input"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{ padding: "10px 12px" }}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="edit-category">
              Category
            </label>
            <select
              id="edit-category"
              className="input select-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: "10px 12px" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
