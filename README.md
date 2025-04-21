# 🎓 School ERP System - Zimbabwe Edition

An all-in-one **Educational Resource Planning (ERP)** system designed to streamline and modernize school operations in Zimbabwe. This platform centralizes academic, administrative, and financial processes for enhanced efficiency, data accuracy, and transparency.

---

## 📚 Key Features

- 🧑‍🎓 Student Management (Profiles, Grades, Attendance)
- 🧑‍🏫 Staff & Teacher Management
- 🗓 Timetable & Class Scheduling
- 💵 Fee Tracking & Payment Records
- 📑 Report Generation (PDF/CSV)
- 🔐 Secure Role-Based Access (Admin, Teachers, Parents)
- 📊 Dashboard with Real-Time Metrics
- 📨 Internal Messaging & Notifications

---

## 🧱 Tech Stack

| Layer        | Technology            |
|--------------|------------------------|
| Frontend     | HTML, CSS, EJS, Bootstrap |
| Backend      | Node.js, Express.js     |
| Database     | MongoDB, Mongoose       |
| Authentication | Passport.js, Bcrypt     |
| Sessions     | Express-Session          |
| Reporting    | PDFKit, Chart.js         |

---

## ⚙️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/school-erp-zimbabwe.git
   cd school-erp-zimbabwe
Install Dependencies

bash
Copy
Edit
npm install
Configure Environment Create a .env file:

ini
Copy
Edit
MONGO_URI=mongodb://localhost:27017/school-erp
SESSION_SECRET=yourSecretKey
Run the Application

bash
Copy
Edit
node index.js
App runs on: http://localhost:3000

🗂 Folder Structure
csharp
Copy
Edit
school-erp/
├── models/            # Mongoose Models (Student, Staff, etc.)
├── views/             # EJS Templates
├── routes/            # App Routing
├── public/            # Static Assets (CSS, JS)
├── controllers/       # Logic Controllers
├── index.js           # Main Server Entry
🧑‍💼 Author
Takunda Muvandi
Cybersecurity Consultant | Full Stack Developer

Building digital infrastructure for Zimbabwean education.

📄 License
This project is licensed under the MIT License.
Feel free to adapt and deploy it in support of educational advancement across Africa.
