import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Modal from './components/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalConfig, setModalConfig] = useState({
    message: '',
    onConfirm: () => {}
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const showConfirmModal = (message, onConfirm) => {
    setModalConfig({ message, onConfirm })
    setIsModalOpen(true)
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    }

    setTasks([...tasks, task])
    setNewTask('')
  }

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (taskId) => {
    showConfirmModal(
      'Are you sure you want to delete this task?',
      () => {
        setTasks(tasks.filter(task => task.id !== taskId))
        setIsModalOpen(false)
      }
    )
  }

  const updateTaskPriority = (taskId, priority) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, priority } : task
    ))
  }

  const clearCompleted = () => {
    showConfirmModal(
      'Are you sure you want to delete all completed tasks?',
      () => {
        setTasks(tasks.filter(task => !task.completed))
        setIsModalOpen(false)
      }
    )
  }

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'active') return !task.completed
      if (filter === 'completed') return task.completed
      return true
    })
    .filter(task =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card main-card">
            <div className="card-body">
              <h1 className="text-center mb-4">Task Manager</h1>
              
              <div className="search-filter mb-4">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="btn-group w-100">
                  <button 
                    className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilter('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilter('active')}
                  >
                    Active
                  </button>
                  <button 
                    className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilter('completed')}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <TaskForm 
                newTask={newTask}
                setNewTask={setNewTask}
                handleAddTask={handleAddTask}
              />
              
              <TaskList 
                tasks={filteredTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                updateTaskPriority={updateTaskPriority}
              />

              {tasks.some(task => task.completed) && (
                <button 
                  className="btn btn-danger w-100 mt-3"
                  onClick={clearCompleted}
                >
                  Delete Completed Tasks
                </button>
              )}

              <div className="task-stats mt-3 text-center text-muted">
                <small>
                  Total Tasks: {tasks.length} | 
                  Active: {tasks.filter(t => !t.completed).length} | 
                  Completed: {tasks.filter(t => t.completed).length}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={modalConfig.onConfirm}
        message={modalConfig.message}
      />
    </div>
  )
}

export default App