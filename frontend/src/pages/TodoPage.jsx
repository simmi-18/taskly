import { useState, useRef, useEffect } from "react";
import {
  getTasks,
  saveTasks,
  toggleTask,
  editTasks,
  deleteTasks,
} from "../hooks/useTasks";
import TaskCard from "../components/TaskCard";
import EditModal from "../components/EditModal";
import { PRIORITIES, CATEGORIES, FILTERS } from "../constants";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../hooks/useAuth";

export default function TodoPage({}) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    priority: "Medium",
    category: "Work",
  });
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    loadUser();
    loadTasks();
  }, []);

  const loadUser = async () => {
    try {
      const data = await getUsers();
      setUser(data);
    } catch (err) {
      comsole.error("Error loading user: ", err);
      handleLogout();
    }
  };

  const loadTasks = async () => {
    try {
      const result = await getTasks();
      setTasks(result);
    } catch (err) {
      console.error("Error loading tasks: ", err);
      if (err.message === "Unauthorized") {
        alert("Session expired. Please log in again.");
        handleLogout();
      } else {
        alert(err.message || "Failed to load tasks!!!");
      }
    }
  };
  // Derived counts
  const total = tasks.length;
  const doneCount = tasks.filter((t) => t.done).length;
  const active = total - doneCount;

  // Filtered view
  const filtered = tasks.filter((t) => {
    if (filter === "Active") return !t.done;
    if (filter === "Completed") return t.done;
    return true;
  });

  // User avatar initials
  const initials = user?.email
    ? user.email.split("@")[0].slice(0, 1).toUpperCase()
    : "??";

  const handleAdd = async () => {
    if (!form.title.trim()) return;
    const newTask = await saveTasks(form);
    console.log("newTask", newTask);
    await loadTasks();

    setForm({
      title: "",
      description: "",
      priority: "",
      category: "",
    });
    inputRef.current?.focus();
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") handleAdd();
  }
  const handleToggle = async (task) => {
    await toggleTask(task.id, !task.done);
    loadTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  async function handleEdit(updated) {
    await editTasks(updated.id, updated);
    await loadTasks();
    setEditing(null);
  }

  const handleDelete = async (id) => {
    await deleteTasks(id);
    await loadTasks();
  };

  return (
    <>
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="todo-page">
        {/* ---- Topbar ---- */}
        <header className="topbar">
          <div className="topbar-logo">
            <span className="logo-dot" />
            Taskly
          </div>
          <div className="topbar-user">
            <div className="avatar" title={user?.email}>
              {initials}
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => handleLogout()}
            >
              Log out
            </button>
          </div>
        </header>

        {/* ---- Main ---- */}
        <main className="main-content">
          <h1 className="page-title">My Tasks</h1>
          <p className="page-sub">Stay focused. Get things done.</p>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-label">Total</div>
              <div className="stat-num">{total}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Active</div>
              <div className="stat-num" style={{ color: "var(--accent2)" }}>
                {active}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Done</div>
              <div className="stat-num" style={{ color: "var(--green)" }}>
                {doneCount}
              </div>
            </div>
          </div>

          {/* Add Task */}
          <div className="add-task-bar">
            <div className="add-task-row">
              <input
                ref={inputRef}
                className="input"
                placeholder="What needs to be done?"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                onKeyDown={handleKeyDown}
                aria-label="New task title"
              />
              <input
                type="text"
                className="input"
                // placeholder="Break down the task—what’s the plan?"
                placeholder="Describe it vividly…"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                aria-label="New task description  "
              />

              <button
                className="btn btn-primary"
                onClick={handleAdd}
                style={{ whiteSpace: "nowrap" }}
              >
                + Add Task
              </button>
            </div>
            <div className="add-task-meta">
              <select
                className="select-input"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                aria-label="Priority"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p} Priority
                  </option>
                ))}
              </select>
              <select
                className="select-input"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                aria-label="Category"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filters */}
          <div className="filters" role="group" aria-label="Filter tasks">
            {FILTERS.map((f) => {
              const count =
                f === "Active" ? active : f === "Completed" ? doneCount : null;
              return (
                <button
                  key={f}
                  className={`filter-btn${filter === f ? " active" : ""}`}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                >
                  {f}
                  {count !== null && (
                    <span style={{ marginLeft: 4, opacity: 0.7 }}>
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Task List */}
          <div className="task-list" aria-live="polite">
            {filtered.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">
                  {filter === "Completed" ? "✓" : "○"}
                </div>
                <div className="empty-title">
                  {filter === "Completed"
                    ? "No completed tasks"
                    : "No tasks yet"}
                </div>
                <div className="empty-sub">
                  {filter === "Completed"
                    ? "Complete some tasks to see them here."
                    : "Add your first task above to get started."}
                </div>
              </div>
            ) : (
              filtered.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={() => handleToggle(task)}
                  onEdit={() => setEditing(task)}
                  onDelete={() => handleDelete(task.id)}
                />
              ))
            )}
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {editing && (
        <EditModal
          task={editing}
          onSave={handleEdit}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}
