# 📝 game-quotes
A simple CRUD application for managing quotes.  
Originally using JSON files for storage, now migrated to a MySQL database for improved performance and data persistence.

---

## 🚀 Features
- Create, read, update, and delete quotes  
- RESTful API built with Express.js  
- MySQL database integration  
- UUID-based unique identifiers generated in backend  
- CORS enabled for frontend integration  
- Automatic server restart with `nodemon` during development  

---

## 🛠️ Tech Stack

### **Backend**
- **Node.js** – JavaScript runtime environment  
- **Express.js** – web framework for building APIs  
- **cors** – enables Cross-Origin Resource Sharing  
- **uuidv4** – generates unique IDs for quotes  
- **MySQL** – relational database for persistent storage  
- **mysql2/promise** – promise-based MySQL client for Node.js  
- **dotenv** – manage environment variables  
- **nodemon** – automatically restarts server on code changes  

### **Frontend**
- **HTML5** – structure of the web interface  
- **CSS3** – styling and layout  
- **JavaScript (Vanilla JS)** – dynamic behavior and API communication  

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quotes-app.git
   cd quotes-app

2. **Install dependencies**
   npm install

3. **Set up environment variables**
Create a .env file in the root directory and add your database credentials:
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=quotes

5. **Set up the database**
  Import the provided schema:
  mysql -u root -p < schema.sql
6. **Run the server**
   npm run dev

### **📦 API Endpoints**

   | Method | Endpoint      | Description          |
| ------ | ------------- | -------------------- |
| GET    | `/quotes`     | Get all quotes       |
| GET    | `/quotes/:id` | Get a quote by ID    |
| POST   | `/quotes`     | Add a new quote      |
| PUT    | `/quotes/:id` | Update a quote by ID |
| DELETE | `/quotes/:id` | Delete a quote by ID |


### ***🙋‍♂️ About***

This is my first public project on GitHub 🎉
I’m still learning, so any feedback or suggestions are more than welcome!

### ***🧾 License***

This project is open-source and available under the MIT License.

