import React from "react";

function TaskItem({ task, onToggle, onDelete }) {
  const priorityColor = {
    High: "#ff4b5c",
    Medium: "#ffb800",
    Low: "#2ecc71",
  };

  return (
    <div className="task-card">
      <div className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span
          className={task.completed ? "completed" : ""}
          style={{ color: priorityColor[task.priority] }}
        >
          {task.title} ({task.priority})
        </span>
      </div>
      <button onClick={() => onDelete(task.id)}>🗑️</button>
    </div>
  );
}

export default TaskItem;
