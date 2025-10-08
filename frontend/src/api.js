const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchTasks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tasks`);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addTask = async (title, priority) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority })
    });
    if (!response.ok) throw new Error("Failed to add task");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, { method: "PUT" });
    if (!response.ok) throw new Error("Failed to update task");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete task");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};