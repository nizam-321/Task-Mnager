import React from 'react'
import '../styles/TaskForm.css'

function TaskForm({ newTask, setNewTask, handleAddTask }) {
  return (
    <form onSubmit={handleAddTask} className="task-form">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control task-input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit" className="btn btn-primary add-button">
          Add Task
        </button>
      </div>
    </form>
  )
}

export default TaskForm