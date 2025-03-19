# שלב הבסיס - השתמש בתמונה של Node.js
FROM node:16

# יצירת ספריית עבודה במיכל
WORKDIR /usr/src/app

# העתק את קבצי package.json ו-package-lock.json
COPY package*.json ./

# התקן את כל התלויות
RUN npm install

# העתק את שאר הקבצים
COPY . ./

# פתח את הפורט 3000 (או כל פורט שאתה רוצה)
EXPOSE 3000

# הרץ את האפליקציה
CMD ["npm", "start"]
