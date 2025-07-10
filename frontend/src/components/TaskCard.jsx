"use client"
import { deleteTask } from "../services/api.js"

const priorityColors = {
  Low: "#28a745",
  Medium: "#ffc107",
  High: "#dc3545",
}

function TaskCard({ task, onEdit, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(task._id)
        onDelete()
      } catch (error) {
        console.error("Error deleting task:", error)
      }
    }
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "Done"

  return (
    <div className="task-card">
      <div className="task-header">
        <h4>{task.title}</h4>
        <div className="task-actions">
          <button onClick={onEdit} className="btn-icon">
            ✏️
          </button>
          <button onClick={handleDelete} className="btn-icon">
            🗑️
          </button>
        </div>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-meta">
        <span className="priority-badge" style={{ backgroundColor: priorityColors[task.priority] }}>
          {task.priority}
        </span>

        {task.assignedTo && <div className="assigned-to">👤 {task.assignedTo}</div>}

        <div className={`due-date ${isOverdue ? "overdue" : ""}`}>
          📅 {new Date(task.dueDate).toLocaleDateString()}
          {isOverdue && " (Overdue)"}
        </div>
      </div>
    </div>
  )
}

export default TaskCard
