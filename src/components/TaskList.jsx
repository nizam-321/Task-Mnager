import React from 'react'
import TaskItem from './TaskItem'
import '../styles/TaskList.css'

function TaskList({ tasks, toggleTask, deleteTask, updateTaskPriority }) {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          updateTaskPriority={updateTaskPriority}
        />
      ))}
    </div>
  )
}

export default TaskList