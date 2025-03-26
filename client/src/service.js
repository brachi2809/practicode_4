

import axios from 'axios';
axios.defaults.baseURL = "https://server-dyzm.onrender.com";

axios.interceptors.response.use(
  response => response,
  error => {
    console.error("Error in API call:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get('/items');
    return result.data;
  },

  addTask: async (name) => {
    const result = await axios.post('/items', { name });
    return result.data;
  },

  // setCompleted: async (id, isComplete) => {
  //   const result = await axios.put(`/items/${id}`, { isComplete });  // עדכון רק סטטוס
  //   return result.data; // מחזיר את המשימה המעודכנת
  // },

  setCompleted: async (id, isComplete, name) => {
    try {
      const taskData = { Name: name, IsComplete: isComplete };
      const result = await axios.put(`/items/${id}`, taskData);
  
      console.log("Response from API:", result.data); // הדפסת התשובה לבדיקה
  
      return result.data; 
    } catch (error) {
      console.error("Error updating task:", error.response ? error.response.data : error);
      throw error; // נזרוק את השגיאה כדי שהפונקציה הקוראת תוכל לטפל בה
    }
  }
  
  
  

  deleteTask: async (id) => {
    const result = await axios.delete(`/items/${id}`);
    return result.data;
  }
};
