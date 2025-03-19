# השתמש בתמונה בסיסית של Node.js
FROM node:16

# הגדרת תיקיית עבודה
WORKDIR /usr/src/app

# העתקת קבצים חשובים (כמו package.json)
COPY package*.json ./

# התקנת התלויות של הפרויקט
RUN npm install

# העתקת שאר הקבצים
COPY . .

# הגדרת הפקודה שתפעיל את האפליקציה
CMD ["npm", "start"]

# חשיפת הפורט שהאפליקציה מאזינה אליו (נניח 3000)
EXPOSE 3000
