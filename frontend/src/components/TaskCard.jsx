import { CheckIcon, EditIcon, TrashIcon } from "./Icons";

const PRI_CLASS = {
  High: "pri-high",
  Medium: "pri-medium",
  Low: "pri-low",
};

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task-card${task.done ? " done" : ""}`}>
      {/* Complete toggle */}
      <button
        className={`check-btn${task.done ? " checked" : ""}`}
        onClick={() => onToggle(task)}
        title={task.done ? "Mark as active" : "Mark as complete"}
        aria-label={task.done ? "Mark as active" : "Mark as complete"}
      >
        {task.done && <CheckIcon />}
      </button>

      {/* Body */}
      <div className="task-body">
        <div className="task-title">{task.title}</div>

        {/* Description */}
        {task.description && (
          <div className="task-description">{task.description}</div>
        )}

        <div className="task-meta">
          <span className={`tag ${PRI_CLASS[task.priority] || "pri-medium"}`}>
            {task.priority || "No Priority "}
          </span>
          <span className="tag cat-tag">{task.category || "No Category"}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="task-actions">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => onEdit(task)}
          title="Edit task"
          aria-label="Edit task"
        >
          <EditIcon />
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(task.id)}
          title="Delete task"
          aria-label="Delete task"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
