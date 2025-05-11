import React from 'react';

function TaskItem({ task, toggleTask, deleteTask, updateTaskPriority }) {
  const priorityColors = {
    low: 'text-success',
    medium: 'text-warning',
    high: 'text-danger',
  };

  return (
    <div className={`task-item card mb-2 ${task.completed ? 'completed-task' : ''}`}>
      <div className="card-body d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center flex-grow-1">
          <input
            type="checkbox"
            className="form-check-input me-3"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <div className="task-content">
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </span>
            <div className="task-meta">
              <small className="text-muted">
                {new Date(task.createdAt).toLocaleString()}
              </small>
            </div>
          </div>
        </div>

        <div className="task-actions d-flex align-items-center">
          {/* Dropdown for Priority */}
          <select
            className={`form-select form-select-sm me-2 ${priorityColors[task.priority]}`}
            value={task.priority}
            onChange={(e) => {
              const newPriority = e.target.value;
              updateTaskPriority(task.id, newPriority);
            }}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>

          {/* Delete Button */}
          <button
            onClick={() => deleteTask(task.id)}
            className="btn btn-danger btn-sm"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;