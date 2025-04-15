# Job Listing App

A full-stack web application for browsing and managing job listings. Built with:

- **Frontend**: Next.js
- **Backend**: Node.js with Express
- **Database**: MongoDB (via Mongoose)

## 🚀 Live Demo

- **Frontend**: [https://job-listing-newapp.vercel.app/](https://job-listing-newapp.vercel.app/)
- **Backend**: [https://job-listing-app-production.up.railway.app/](https://job-listing-app-production.up.railway.app/)

---

## 🛠️ Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB setup

### Clone the Repository

```bash
git clone https://github.com/Vicky-2409/job-listing-app.git
cd job-listing-app
```

### Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

### Configure Environment Variables

#### Backend (`server/.env`)

Create a `.env` file in the `server` directory with the following content:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

#### Frontend (`client/.env.local`)

Create a `.env.local` file in the `client` directory with the following content:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

> **Note**: In Next.js, environment variables exposed to the browser must be prefixed with `NEXT_PUBLIC_` citeturn0search5.

### Seed the Database

Before running the application, seed the database with initial job listings:

```bash
cd ../server
npm run seed
```

This command connects to the MongoDB database, clears existing job listings, and inserts new data.

### Run the Application

#### Backend

```bash
npm run dev
```

The backend server will start on `http://localhost:5000`.

#### Frontend

Open a new terminal window:

```bash
cd client
npm run dev
```

The frontend application will start on `http://localhost:3000`.

---

## 📁 Project Structure

```
job-listing-app/
├── client/        # Next.js frontend
│   ├── pages/
│   ├── public/
│   └── ...
├── server/        # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   └── ...
└── README.md
```

---

## ⚙️ Deployment

### Backend

- Hosted on [Railway](https://railway.app/)
- Deployment is triggered on push to the `main` branch
- Environment variables are configured in Railway's dashboard

### Frontend

- Hosted on [Vercel](https://vercel.com/)
- Deployment is triggered on push to the `main` branch
- Environment variables are configured in Vercel's dashboard

---

## 🧠 Assumptions & Challenges

- **Assumptions**:
  - Users have Node.js and npm installed
  - MongoDB is accessible via the provided connection string

- **Challenges**:
  - Managing environment variables for both frontend and backend
    - Ensured that frontend variables are prefixed with `NEXT_PUBLIC_` to be accessible in the browser citeturn0search5
  - Seeding a large dataset efficiently
    - Implemented batch insertion to handle large volumes of job listings without performance issues

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

