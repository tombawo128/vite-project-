function TaskList({ tasks, onToggle }) {
  if (tasks.length === 0) return <p>No tasks found.</p>

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onToggle(task.id)}
            />
            <span className={task.done ? 'done' : ''}>{task.title}</span>
          </label>
          <span>{task.assignedTo} · {task.due}</span>
        </div>
      ))}
    </div>
  )
}

export default TaskList
