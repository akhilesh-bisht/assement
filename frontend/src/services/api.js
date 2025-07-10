import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

// Get all boards
export async function getBoards() {
  try {
    const response = await axios.get(`${API_BASE_URL}/boards`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching boards:", error);
    throw error;
  }
}

// Create a new board
export async function createBoard(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/boards`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating board:", error);
    throw error;
  }
}

// Get tasks of a specific board
export async function getBoardTasks(boardId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${boardId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

// Create a new task
export async function createTask(boardId, data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks/${boardId}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

// Update a task
export async function updateTask(taskId, data) {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

// Delete a task
export async function deleteTask(taskId) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}
