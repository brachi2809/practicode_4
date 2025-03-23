const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// ה-API Key שלך
const RENDER_API_KEY = rnd_j504nkUqLI6td8NuTyikWXxX7G1c;


// endpoint שמחזיר את רשימת האפליקציות
app.get('/apps', async (req, res) => {
  try {
    const response = await axios.get('https://api.render.com/v1/services', {
      headers: {
        'Authorization': `Bearer ${RENDER_API_KEY}`,
      },
    });

    res.json(response.data);  // מחזיר את רשימת האפליקציות
  } catch (error) {
    res.status(500).send('שגיאה בהבאת נתונים מ-Render');
  }
});

app.listen(PORT, () => {
  console.log(`השרת רץ על פורט ${PORT}`);
});
