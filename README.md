# CivicLink

A full-stack web application that bridges the gap between citizens and authorities. This platform allows citizens to file complaints with photos and track their progress in real-time, while authorities can manage and update complaint statuses with evidence uploads.

## Features

- **Citizen Portal**: File complaints across various categories (Police, Municipality, Traffic, etc.) with photo evidence
- **Authority Dashboard**: Manage complaints, update progress, and upload work evidence
- **Real-time Tracking**: Monitor complaint status through defined stages (Submitted, In Review, Assigned, In Progress, Resolved)
- **Secure Authentication**: JWT-based authentication for both citizens and authorities
- **File Uploads**: Support for image uploads with organized storage
- **Responsive Design**: Modern UI built with React and Tailwind CSS

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CivicLink_9kis-2026
```

2. Install all dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
   - Copy `backend/.env.example` to `backend/.env`
   - Update the `MONGO_URI` with your MongoDB connection string
   - Adjust other settings as needed

4. Start the development servers:
```bash
npm run dev
```

This will start both frontend (http://localhost:5173 or 5174) and backend (http://localhost:5003) servers concurrently.

### Frontend Environment
- The frontend uses `frontend/.env` to set `VITE_API_BASE_URL=http://localhost:5003`.
- This ensures API requests are sent to the backend correctly during development.

### MongoDB Setup

The application uses MongoDB for data storage. You can use either:

- **MongoDB Atlas** (recommended for production):
  - Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
  - Get your connection string and update `MONGO_URI` in `.env`

- **Local MongoDB**:
  - Install MongoDB locally
  - Use connection string: `mongodb://localhost:27017/civiclink`

### Authority Access Codes

Each authority department has a unique access code for login:

- **Police**: POLICE_2026
- **School/University**: SCHOOL_2026
- **Municipality**: MUNICIPAL_2026
- **Consumer/Cyber**: CYBER_2026
- **Human Rights**: RIGHTS_2026
- **Govt Dept**: GOVT_2026
- **Traffic**: TRAFFIC_2026
- **Pollution**: POLLUTION_2026

### Testing the Setup

- The backend server will log "CivicLink API running on http://localhost:5003" if MongoDB connection is successful.
- Visit `http://localhost:5003/api/health` to verify the API is responding.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Citizen registration
- `POST /api/auth/login` - User login
- `POST /api/auth/authority-login` - Authority login

### Complaints
- `GET /api/complaints` - Get user's complaints
- `POST /api/complaints` - Create new complaint
- `PUT /api/complaints/:id` - Update complaint status

### Authority
- `GET /api/authority/complaints` - Get all complaints for authority
- `PUT /api/authority/complaints/:id` - Update complaint with evidence

## Project Structure

```
CivicLink_9kis-2026/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Complaint.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── complaints.js
│   │   └── authority.js
│   ├── uploads/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.