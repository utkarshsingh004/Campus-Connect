# 📘 Campus Connect

Campus Connect is a MERN stack web application designed to bridge the gap between colleges and students. It provides a centralized platform where colleges can publish company details, internships, and live projects, and students can explore these opportunities directly through their campus.

By fostering industry-academia collaboration, Campus Connect helps students gain real-world exposure while enabling colleges to strengthen their placement and project engagement ecosystem
## Features

- 👩‍🎓 Student Portal: Explore internships, live projects, and company details.

- 🏫 College Portal: Publish and manage opportunities for students.

- 🏢 Company Information: Showcase recruitment drives, internships, and project requirements.

- 🔒 Authentication & Authorization: Secure login/signup for colleges and students.

- 📊 Dashboard: Personalized dashboard for both colleges and students.

- 🔍 Search & Filter: Easily find relevant internships or projects.

## Demo

[Live](#) *(https://campus-connect-frontend-fufn.onrender.com/)*

## Installation

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/utkarshsingh004/Campus-Connect.git
   cd Campus-Connect
   ```

2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

3. **Run the development server:**

   Using npm:
   ```bash
   npm run dev
   ```

   Or using yarn:
   ```bash
   yarn dev
   ```

4. **Open in browser:**

   Visit `http://localhost:5173` to view the application.

## Project Structure

```
Campus-Connect/
│── client/           # React frontend
│── server/           # Node.js & Express backend
│── models/           # MongoDB models
│── routes/           # API routes
│── controllers/      # Backend logic
│── config/           # Database & environment setup
│── package.json
│── README.md

```

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally

## Technologies Used

- **React**: UI library
- **Vite**: Frontend build tool
- **CSS**: Styling
- **Chart.js**: For visualizing expenses (or any preferred chart library)

## Deployment

You can deploy the app to any static hosting service (e.g., Netlify, Vercel, GitHub Pages). Follow these steps for deployment:

1. Build the app:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting platform.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for improving the project.

---

**Happy Tracking!**
