UDDOM - Skill Development Platform 🚀

UDDOM is a full-stack e-learning web application designed to empower students with skill development courses. Users can browse courses, watch free previews, and unlock premium content via a secure payment simulation.

✨ Features

Dynamic Course Listing: Courses are fetched from the database and displayed in a responsive grid layout.

Video Player with Playlist: Integrated video player with a module list on the side.

Content Locking System: Premium videos remain locked (🔒) until the user purchases the course.

Payment Gateway Simulation: Interactive UI for Bkash/Nagad payments that updates the database to unlock content.

Database Integration: Real-time data fetching from MongoDB Atlas.

Responsive Design: Fully optimized for Desktop, Tablet, and Mobile devices.

🛠️ Tech Stack

Frontend: HTML5, CSS3, Vanilla JavaScript (DOM Manipulation, Fetch API).

Backend: Node.js, Express.js.

Database: MongoDB (Atlas), Mongoose ODM.

Tools: VS Code, Git.

⚙️ Installation & Setup

Follow these steps to run the project locally on your machine.

1. Backend Setup (Server) Navigate to the backend folder and install dependencies:

cd uddom-backend npm install

Start the server:

node index.js

(The server will start running at: http://localhost:5000)

2. Database Configuration Ensure you have a MongoDB Atlas account. Update the connection string in index.js:

const uri = "your_mongodb_connection_string_here";

(Tip: Run http://localhost:5000/add-data once to seed the initial course data.)

3. Frontend Setup (Client) Simply open the index.html file in your browser to view the landing page, or course.html to view the course player.

🔗 API Endpoints

GET /courses: Fetch all course modules and status

GET /add-data: Seed initial dummy data to MongoDB

POST /buy-course: Updates database to unlock content

👤 Author

Irfanul Islam

Project: UDDOM (Skill Development Platform)

Goal: To create a seamless learning experience for students.

© 2025 Irfanul Islam. All Rights Reserved.
