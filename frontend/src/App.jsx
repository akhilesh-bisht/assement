"use client"

import { useState, useEffect } from "react"
import BoardList from "./components/BoardList.jsx"
import BoardDetail from "./components/BoardDetails.jsx"
import { getBoards, getBoardTasks } from "./services/api.js"
import "./App.css"

function App() {
  const [boards, setBoards] = useState([])
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBoards()
  }, [])

  const fetchBoards = async () => {
    try {
      const boardsData = await getBoards()
      setBoards(boardsData)
    } catch (error) {
      console.error("Error fetching boards:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBoardSelect = async (board) => {
    setSelectedBoard(board)
    try {
      const tasksData = await getBoardTasks(board._id)
      setTasks(tasksData)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }

  const handleBoardCreated = (newBoard) => {
    setBoards([...boards, newBoard])
  }

  const handleTasksUpdate = (updatedTasks) => {
    setTasks(updatedTasks)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="app">
      <BoardList
        boards={boards}
        selectedBoard={selectedBoard}
        onBoardSelect={handleBoardSelect}
        onBoardCreated={handleBoardCreated}
      />
      <div className="main-content">
        {selectedBoard ? (
          <BoardDetail board={selectedBoard} tasks={tasks} onTasksUpdate={handleTasksUpdate} />
        ) : (
          <div className="welcome">
            <h1>Team Collaboration Board</h1>
            <p>Select a board to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
