// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom/client';  // ודא שאתה משתמש ב-ReactDOM החדש
import App from './App';

// יצירת root חדש ל-React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
