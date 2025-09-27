📘 Campus Connect

Campus Connect is a MERN stack web application designed to bridge the gap between colleges and students. It provides a centralized platform where colleges can publish company details, internships, and live projects, and students can explore these opportunities directly through their campus.

By fostering industry-academia collaboration, Campus Connect helps students gain real-world exposure while enabling colleges to strengthen their placement and project engagement ecosystem.

🚀 Features

👩‍🎓 Student Portal: Explore internships, live projects, and company details.

🏫 College Portal: Publish and manage opportunities for students.

🏢 Company Information: Showcase recruitment drives, internships, and project requirements.

🔒 Authentication & Authorization: Secure login/signup for colleges and students.

📊 Dashboard: Personalized dashboard for both colleges and students.

🔍 Search & Filter: Easily find relevant internships or projects.

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS / Bootstrap

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ORM)

Authentication: JWT (JSON Web Tokens), bcrypt.js

Other Tools: REST APIs, Git/GitHub

📂 Project Structure
Campus-Connect/
│── client/           # React frontend
│── server/           # Node.js & Express backend
│── models/           # MongoDB models
│── routes/           # API routes
│── controllers/      # Backend logic
│── config/           # Database & environment setup
│── package.json
│── README.md

⚙️ Installation & Setup

Clone the Repository

git clone https://github.com/your-username/campus-connect.git
cd campus-connect


Install Dependencies

For backend:

cd server
npm install


For frontend:

cd client
npm install


Configure Environment Variables
Create a .env file in the server/ folder with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run the Application

Start backend server:

cd server
npm run dev


Start frontend:

cd client
npm start


The app should now be running at:

Frontend → http://localhost:3000

Backend → http://localhost:5000
