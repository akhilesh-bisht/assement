import { useState, useMemo } from "react"
import TaskCard from "./TaskCard"
import TaskForm from "./TaskForm"
import { updateTask } from "../services/api.js"

const columns = [
  { id: "To Do", title: "To Do" },
  { id: "In Progress", title: "In Progress" },
  { id: "Done", title: "Done" },
]

function BoardDetail({ board, tasks, onTasksUpdate }) {
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const openTaskForm = () => {
    setEditingTask(null)
    setShowTaskForm(true)
  }

  const openEditForm = (task) => {
    setShowTaskForm(false)
    setEditingTask(task)
  }

  //  Safe, multi-field filter
  const filteredTasks = useMemo(() => {
    if (!searchTerm) return tasks
    const lowerSearch = searchTerm.toLowerCase()
    return tasks.filter((task) =>
      (task.name || "").toLowerCase().includes(lowerSearch) ||
      (task.description || "").toLowerCase().includes(lowerSearch) ||
      (task.assignee || "").toLowerCase().includes(lowerSearch) ||
      (task.dueDate || "").toLowerCase().includes(lowerSearch)
    )
  }, [tasks, searchTerm])

  const tasksByStatus = useMemo(() => {
    return filteredTasks.reduce((acc, task) => {
      acc[task.status] = acc[task.status] || []
      acc[task.status].push(task)
      return acc
    }, {})
  }, [filteredTasks])

  const handleTaskCreated = (newTask) => {
    onTasksUpdate([...tasks, newTask])
    setShowTaskForm(false)
  }

  const handleTaskUpdated = (updatedTask) => {
    const updatedTasks = tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    onTasksUpdate(updatedTasks)
    setEditingTask(null)
  }

  const handleTaskDeleted = (taskId) => {
    const updatedTasks = tasks.filter((t) => t._id !== taskId)
    onTasksUpdate(updatedTasks)
  }

  return (
    <div className="board-detail">
      <div className="board-header">
        <h1>{board.name}</h1>
        <div className="board-actions">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="btn btn-primary" onClick={openTaskForm}>
            + Add Task
          </button>
        </div>
      </div>

      <div className="columns">
        {columns.map((column) => (
          <div key={column.id} className="column">
            <div className="column-header">
              <h3>{column.title}</h3>
              <span className="task-count">{(tasksByStatus[column.id] || []).length}</span>
            </div>

            <div className="task-list">
              {(tasksByStatus[column.id] || []).map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={() => openEditForm(task)}
                  onDelete={() => handleTaskDeleted(task._id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      {showTaskForm && (
        <TaskForm
          boardId={board._id}
          onTaskCreated={handleTaskCreated}
          onClose={() => setShowTaskForm(false)}
        />
      )}

      {/* Edit Task Form */}
      {editingTask && (
        <TaskForm
          boardId={board._id}
          task={editingTask}
          onTaskUpdated={handleTaskUpdated}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  )
}

export default BoardDetail
