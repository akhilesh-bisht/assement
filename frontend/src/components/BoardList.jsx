import { useState } from "react"
import { createBoard } from "../services/api.js"

function BoardList({ boards, selectedBoard, onBoardSelect, onBoardCreated }) {
  const [showForm, setShowForm] = useState(false)
  const [newBoardName, setNewBoardName] = useState("")
  const [creating, setCreating] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newBoardName.trim()) return

    try {
      setCreating(true)
      const newBoard = await createBoard({ name: newBoardName.trim() })
      onBoardCreated(newBoard)
      setNewBoardName("")
      setShowForm(false)
    } catch (error) {
      console.error("Error creating board:", error)
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Boards</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + New Board
        </button>
      </div>

      <div className="board-list">
        {boards.map((board) => (
          <div
            key={board._id}
            className={`board-item ${selectedBoard?._id === board._id ? "active" : ""}`}
            onClick={() => onBoardSelect(board)}
          >
            <h3>{board.name}</h3>
            <small>{new Date(board.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create New Board</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Board name"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                required
              />
              <div className="form-actions">
                <button type="submit" disabled={creating}>
                  {creating ? "Creating..." : "Create"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BoardList
