"use client"

import { useState, useEffect } from "react"
import { createTask, updateTask } from "../services/api.js"

function TaskForm({ boardId, task, onTaskCreated, onTaskUpdated, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    assignedTo: "",
    dueDate: "",
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignedTo: task.assignedTo,
        dueDate: task.dueDate.split("T")[0],
      })
    }
  }, [task])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    try {
      setSubmitting(true)
      const taskData = {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(),
      }

      if (task) {
        const updatedTask = await updateTask(task._id, taskData)
        onTaskUpdated(updatedTask)
      } else {
        const newTask = await createTask(boardId, taskData)
        onTaskCreated(newTask)
      }
    } catch (error) {
      console.error("Error saving task:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{task ? "Edit Task" : "Create New Task"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select value={formData.status} onChange={(e) => handleChange("status", e.target.value)}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select value={formData.priority} onChange={(e) => handleChange("priority", e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Assigned To</label>
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(e) => handleChange("assignedTo", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : task ? "Update" : "Create"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
