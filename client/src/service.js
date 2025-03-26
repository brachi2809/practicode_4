
// import axios from 'axios';
// // axios.defaults.baseURL = "http://localhost:5073";
// axios.defaults.baseURL = "https://server-dyzm.onrender.com";

// axios.interceptors.response.use(
//   response => response,
//   error => {
//     console.error("Error in API call:", error.response?.status, error.message);
//     return Promise.reject(error);
//   }
// );

// export default {
//   getTasks: async () => {
//     const result = await axios.get('/items');
//     return result.data;
//   },

//   addTask: async (name) => {
//     console.log('addTask', name);
//     const result = await axios.post('/items', { name: name });
//     console.log("add");
//     console.log("add result.data :", result.data);
//     return result.data;
//   },

//   setCompleted: async (id, isComplete) => {
//     console.log('setCompleted', { id, isComplete });
//     isComplete === true ? isComplete = 1 : isComplete = 0;
//     const result = await axios.put(`/items/${id}`, { isComplete });
//     console.log("set result.data :", result.data);
//     return result.data;
//   },

//   deleteTask: async (id) => {
//     console.log('deleteTask');
//     const result = await axios.delete(`/items/${id}`);
//     console.log("delete result.data :", result.data);
//     return result.data;
//   }
// };


import axios from 'axios';

// הגדרת בסיס ה-URL של השרת
axios.defaults.baseURL = "https://server-dyzm.onrender.com";

// טיפול בשגיאות בתגובה
axios.interceptors.response.use(
  response => response,
  error => {
    console.error("Error in API call:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default {
  // קריאה להבא את כל המשימות
  getTasks: async () => {
    const result = await axios.get('/items');
    return result.data;
  },

  // יצירת משימה חדשה
  addTask: async (name) => {
    console.log('addTask', name);
    const result = await axios.post('/items', { name: name });
    console.log("add result.data:", result.data);
    return result.data;
  },

  // עדכון סטטוס המשימה (הושלמה או לא)
  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    isComplete = isComplete === true ? 1 : 0;  // מבצע שינוי רק אם נדרש
    const result = await axios.put(`/items/${id}`, { isComplete });
    console.log("set result.data:", result.data);
    return result.data;
  },

  // מחיקת משימה
  deleteTask: async (id) => {
    console.log('deleteTask');
    const result = await axios.delete(`/items/${id}`);
    console.log("delete result.data:", result.data);
    return result.data;
  }
};
