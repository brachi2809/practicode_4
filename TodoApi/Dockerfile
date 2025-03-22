# שימוש ב-image רשמי של Node.js
FROM node:18

# יצירת תיקיית עבודה
WORKDIR /app

# העתקת קבצי התלויות
COPY package.json package-lock.json ./

# התקנת התלויות
RUN npm install

# העתקת שאר קבצי הפרויקט
COPY . .

# פתיחת פורט
EXPOSE 3000

# פקודת ההפעלה
CMD ["node", "server.js"]
