require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const RENDER_API_KEY = process.env.RENDER_API_KEY;

app.get('/apps', async (req, res) => {
    try {
        const response = await axios.get('https://api.render.com/v1/services', {
            headers: {
                'Authorization': `Bearer ${RENDER_API_KEY}`,
            },
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בהבאת הנתונים', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ השרת רץ על פורט ${PORT}`);
});
