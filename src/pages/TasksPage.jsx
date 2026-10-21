import TaskList from '../components/TaskList.jsx'

function TasksPage({ tasks, onAdd, onToggleTask }) {
  return (
    <>
      <div className="page-title">
        <div><h2>Tasks</h2><p>Assign work and update task status.</p></div>
        <button onClick={onAdd}>Add task</button>
      </div>
      <TaskList tasks={tasks} onToggle={onToggleTask} />
    </>
  )
}

export default TasksPage
