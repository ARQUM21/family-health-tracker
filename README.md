# 🏥 Family Health Tracker

> An AI-powered family health management system built with the MERN stack. Upload medical reports, track health vitals, and get intelligent insights powered by Google Gemini AI — all in one place for your entire family.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

---

## 📸 Screenshots

### 🔐 Auth Pages
| Login | Sign Up |
|-------|---------|
| ![Login](screenshots/healthlogin.PNG) | ![Signup](screenshots/healthsignup.PNG) |

### 🏠 Landing Page
![Landing](screenshots/healthlanding.PNG)

### 📊 Dashboard
![Dashboard](screenshots/healthdashboard.PNG)

### 👨‍👩‍👧 Add Member
![Members](screenshots/healthmembers.PNG)

### 📋 Add Report
![Add Report](screenshots/healthreport.PNG)

### 🤖 AI Analysis
![Analyze](screenshots/healthanalyze.PNG)

### 💓 Add Vital
![Vitals](screenshots/healthaddvital.PNG)

---

## ✨ Features

### 👨‍👩‍👧‍👦 Family Member Management
- Add, edit, and delete family members
- Store name, age, relation, and health profile
- Each member has their own reports and vitals

### 📋 Medical Reports
- Upload lab reports as **PDF or Image**
- Store metadata: title, lab name, hospital, doctor, date, price
- Files stored securely on **Cloudinary**

### 🤖 AI-Powered Analysis (Google Gemini)
- Analyzes uploaded reports intelligently
- Returns:
  - ✅ English Summary
  - ✅ Urdu Summary (Roman Urdu)
  - ✅ 5 Doctor Questions to ask
  - ✅ Food Advice (4-5 actionable points)
  - ✅ Home Remedies (4-5 actionable points)
  - ✅ Health Status: `Normal` / `Warning` / `Critical`

### 💓 Health Vitals Tracking
Track 6 vital types per family member:
| Vital | Example Value |
|-------|--------------|
| Blood Pressure | 120/80 mmHg |
| Heart Rate | 72 bpm |
| Blood Sugar | 95 mg/dL |
| Weight | 70 kg |
| Temperature | 98.6 °F |
| Oxygen Level (SpO2) | 98 % |

### 📁 Records Page
- All family records in one place
- Smart search by member, title, lab, hospital
- Filter by: Normal / Warning / Critical / Not Analyzed
- Inline expand — click to view full report + AI analysis without leaving the page

### 🔐 Authentication
- JWT-based secure login & signup
- Protected dashboard routes
- Auto redirect to landing page after login

### 📱 Fully Responsive
- Mobile, tablet, and desktop support
- Collapsible sidebar on mobile

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| React Router DOM | Client-side routing |
| Tailwind CSS | Styling |
| Axios | HTTP requests |
| Lucide React | Icons |
| React Hot Toast | Notifications |
| Vite | Build tool |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js ≥18 | Runtime |
| Express.js | Web framework |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Bcrypt | Password hashing |
| Multer | File upload handling |
| Cloudinary | Image/PDF cloud storage |
| Google Gemini 2.5 Flash | AI report analysis |

---

## 📁 Project Structure

```
family-health-tracker/
│
├── client/                          # React Frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── assets/
│       ├── context/
│       │   └── AppContext.jsx       # Global state (token, user, backendUrl)
│       ├── components/
│       │   ├── Navbar.jsx           # Public navbar
│       │   ├── Footer.jsx
│       │   ├── DashboardSidebar.jsx # Dashboard sidebar
│       │   ├── DashboardNavbar.jsx  # Dashboard top navbar
│       │   ├── HeroSection.jsx
│       │   ├── FeaturesSection.jsx
│       │   ├── HowItWorksSection.jsx
│       │   ├── TestimonialsSection.jsx
│       │   └── Ctasection.jsx
│       └── Pages/
│           ├── Landing.jsx          # Home / Landing page
│           ├── Login.jsx            # Login & Signup
│           ├── Dashboard.jsx        # Main dashboard with stats
│           ├── Members.jsx          # Family members CRUD
│           ├── Reports.jsx          # Member reports + upload
│           ├── AnalyzeDetails.jsx   # Single report + AI analysis
│           ├── Records.jsx          # All records overview
│           └── Vitals.jsx           # Health vitals tracker
│
└── server/                          # Express Backend
    ├── server.js                    # Entry point
    ├── vercel.json
    ├── config/
    │   ├── mongodb.js               # MongoDB connection
    │   ├── cloudinary.js            # Cloudinary setup
    │   ├── multer.js                # File upload config
    │   └── gemini.js                # Gemini AI setup + analysis logic
    ├── middleware/
    │   └── authmiddleware.js        # JWT auth middleware
    ├── models/
    │   ├── user.js
    │   ├── member.js
    │   ├── report.js
    │   ├── vitals.js
    │   └── aiInsight.js
    ├── controllers/
    │   ├── authController.js
    │   ├── memberController.js
    │   ├── reportController.js
    │   ├── vitalsController.js
    │   └── aiController.js
    └── routes/
        ├── authRoutes.js
        ├── memberRoutes.js
        ├── reportRoutes.js
        ├── vitalsRoutes.js
        └── aiRoutes.js
```

---

## 🔌 API Endpoints

All protected routes require header: `{ token: "your_jwt_token" }`

### 🔐 Auth
```
POST  /api/auth/register      → Register new user
POST  /api/auth/login         → Login user
```

### 👥 Members
```
GET    /api/member/list       → Get all members
POST   /api/member/add        → Add new member
PUT    /api/member/edit       → Edit member
DELETE /api/member/delete     → Delete member
```

### 📋 Reports
```
POST   /api/report/upload     → Upload report (multipart/form-data)
POST   /api/report/list       → Get member's reports
POST   /api/report/get        → Get single report
DELETE /api/report/delete     → Delete report
```

### 💓 Vitals
```
POST   /api/vitals/add        → Add vital record
POST   /api/vitals/list       → Get member's vitals
DELETE /api/vitals/delete     → Delete vital
```

### 🤖 AI
```
POST   /api/ai/analyze        → Analyze report with Gemini AI
POST   /api/ai/list           → Get insights for multiple reports
```

---

## ⚙️ Environment Variables

### Backend `server/.env`
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend `client/.env`
```env
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account
- Cloudinary account
- Google Gemini API key ([Get here](https://aistudio.google.com/app/apikey))

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/ARQUM21/family-health-tracker.git
cd family-health-tracker
```

**2. Install backend dependencies**
```bash
cd server
npm install
```

**3. Install frontend dependencies**
```bash
cd ../client
npm install
```

**4. Setup environment variables**
```bash
# Create server/.env and add your keys
# Create client/.env and add your backend URL
```

**5. Run the project**
```bash
# Terminal 1 — Backend (port 5000)
cd server
npm run dev

# Terminal 2 — Frontend (port 5173)
cd client
npm run dev
```

**6. Open in browser**
```
http://localhost:5173
```

---

## 🤖 AI Analysis Flow

```
User uploads report (PDF / Image)
            ↓
    Cloudinary stores the file → returns URL
            ↓
        User clicks "Analyze"
            ↓
  Backend fetches file from Cloudinary URL
            ↓
      Converts to base64 (inline data)
            ↓
    Sends to Gemini 2.5 Flash with prompt
            ↓
  Gemini returns JSON:
  { englishSummary, urduSummary,
    doctorQuestions, foodAdvice,
    homeRemedies, reportStatus }
            ↓
  Saved in MongoDB (AiInsight model)
            ↓
        Displayed to user ✅
```

---

## 🚢 Deployment

### Backend on Vercel
```bash
cd server
# vercel.json already included in project
vercel --prod
# Add all .env variables in Vercel Dashboard → Settings → Environment Variables
```

### Frontend on Vercel
```bash
cd client
vercel --prod
# Set VITE_BACKEND_URL to your deployed backend URL
```

---

## 🔒 Security

- ✅ JWT authentication on all protected routes
- ✅ Password hashing with bcrypt
- ✅ Environment variables for all secrets
- ✅ CORS configured
- ✅ Protected dashboard routes (redirect to login if no token)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Muhammad Arqum Tariq**

[![GitHub](https://img.shields.io/badge/GitHub-@ARQUM21-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ARQUM21)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Muhammad_Arqum_Tariq-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/muhammadarqumtariq/)
[![Email](https://img.shields.io/badge/Email-marqum987@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:marqum987@gmail.com)

---

<p align="center">⭐ If you found this project helpful, please give it a star!</p>

<p align="center">Made with ❤️ for better family health management</p>
