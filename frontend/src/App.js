import React, { useState, useEffect } from "react";
import { fetchTasks, addTask, toggleTask, deleteTask } from "./api";
import TaskItem from "./components/TaskItem";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    const task = await addTask(newTask, priority);
    setTasks([...tasks, task]);
    setNewTask("");
    setPriority("Medium");
  };

  const handleToggle = async (id) => {
    const updatedTask = await toggleTask(id);
    setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks
    .filter((t) => {
      if (filter === "Completed") return t.completed;
      if (filter === "Pending") return !t.completed;
      if (filter === "High") return t.priority === "High";
      if (filter === "Medium") return t.priority === "Medium";
      if (filter === "Low") return t.priority === "Low";
      return true;
    })
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="filters">
        {["All", "Completed", "Pending", "High", "Medium", "Low"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active-filter" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="no-tasks">No tasks to show 😴</p>
        ) : (
          filteredTasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
