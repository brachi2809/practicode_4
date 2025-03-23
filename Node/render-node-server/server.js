require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const RENDER_API_KEY = process.env.RENDER_API_KEY;

// יצירת endpoint שמחזיר את רשימת האפליקציות מ-Render
app.get('/apps', async (req, res) => {
    try {
        const response = await axios.get('https://api.render.com/v1/services', {
            headers: {
                'Authorization': `Bearer ${RENDER_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data); // שולח את הנתונים כ-JSON ללקוח
    } catch (error) {
        console.error('❌ שגיאה בקבלת הנתונים מ-Render:', error.message);
        res.status(500).json({ error: 'שגיאה בקבלת הנתונים' });
    }
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`✅ השרת רץ על פורט ${PORT}`);
});
