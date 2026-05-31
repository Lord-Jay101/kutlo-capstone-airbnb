# Kutlo Airbnb Clone

A full-stack Airbnb-inspired accommodation booking platform built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to browse accommodation listings, make reservations, and manage properties through dedicated user roles.

## Live Demo

**Frontend (Vercel):**
https://kutlo-capstone-airbnb.vercel.app/

## Features

### Guest Features

* User authentication and login
* Browse accommodation listings
* View property details
* Make reservations
* Manage bookings
* Responsive design for desktop and mobile devices

### Host Features

* Create accommodation listings
* Edit existing listings
* Delete listings
* Manage property information
* View reservations for hosted properties

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios
* React Toastify
* React Datepicker
* Font Awesome
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* CORS
* dotenv

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

## Demo Accounts

### Guest Account

**Username:** guest
**Password:** 123456

### Host Account

**Username:** host
**Password:** 123456

## Installation and Setup

### Prerequisites

* Node.js
* npm
* MongoDB Atlas account

### Clone the Repository

```bash
git clone https://github.com/Lord-Jay101/kutlo-capstone-airbnb.git
cd kutlo-capstone-airbnb
```

### Backend Setup

```bash
cd Backends
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on:

```text
http://localhost:3000
```

## Project Structure

```text
kutlo-capstone-airbnb/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Backends/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Database

The application uses MongoDB Atlas as its cloud database solution. Data is managed through Mongoose models and accessed through RESTful API endpoints.

## Future Improvements

* Payment gateway integration
* Property reviews and ratings
* Advanced search and filtering
* Email notifications
* Image optimization and cloud storage
* Admin dashboard

## Author

**Kutlo Molisana**

Capstone Project – Full Stack Web Development

## License

This project is for educational and assessment purposes.
