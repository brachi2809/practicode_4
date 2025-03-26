const API_URL = 'http://localhost:5000/items'; // יש להחליף בכתובת של ה-API שלך

const service = {
  // Get all tasks
  async getTasks() {
    const response = await fetch(API_URL);
    if (response.ok) {
      const todos = await response.json();
      return todos;
    } else {
      console.error("Failed to fetch tasks");
      return [];
    }
  },

  // Create a new task
  async addTask(name) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, isComplete: 0 })
    });

    if (!response.ok) {
      console.error("Failed to create task");
    }
  },

  // Update task completion status
  async setCompleted(id, isComplete) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isComplete: isComplete })
    });

    if (!response.ok) {
      console.error("Failed to update task completion status");
    }
  },

  // Update task name
  async updateTaskName(id, name) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name })
    });

    if (!response.ok) {
      console.error("Failed to update task name");
    }
  },

  // Delete a task
  async deleteTask(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error("Failed to delete task");
    }
  }
};

export default service;
