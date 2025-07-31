# SkillStack 📚

> A comprehensive personal skill-building tracker for courses, tutorials, and certifications with AI-powered insights.

![SkillStack Banner](https://img.shields.io/badge/SkillStack-Personal%20Learning%20Tracker-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Django](https://img.shields.io/badge/Django-4.x-092E20?style=flat-square&logo=django)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## 🎯 Overview

SkillStack is a modern web application designed to help learners track their educational journey across multiple platforms and resource types. With intelligent progress tracking, interactive analytics, and AI-powered recommendations, it transforms how you manage and visualize your learning goals.

## ✨ Key Features

**📊 Smart Progress Tracking**
- Automatic progress calculation based on logged learning activities
- Real-time status updates (Not Started → In Progress → Completed)
- Visual progress bars and completion percentages

**📈 Interactive Analytics Dashboard**
- Beautiful charts showing learning patterns and trends
- Platform usage breakdown (Udemy, YouTube, Coursera, etc.)
- Category-wise analysis (Courses vs Videos vs Books)
- Weekly learning streaks and daily averages

**🤖 AI-Powered Features**
- **Auto-categorization**: Intelligent skill categorization based on content
- **Smart Recommendations**: Personalized learning suggestions based on your history
- **Pattern Recognition**: Identifies your learning preferences and habits

**⚡ Modern User Experience**  
- Clean, responsive design that works on all devices
- Intuitive navigation and user-friendly interface
- Fast, real-time updates without page refreshes
- Professional data visualization with interactive charts

## 🚀 Quick Local Setup

### Prerequisites
- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **PostgreSQL 12+** (or SQLite for development)

### 1. Clone Repository
```bash
git clone https://github.com/hariprasadmanoj3/skillstack.git
cd skillstack
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Use SQLite for quick setup (edit settings.py to enable)
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd frontend/skillstack-frontend
npm install
npm start
```

### 4. Optional Demo Data
```bash
cd backend
python manage.py shell < create_demo_data.py
```

**🌐 Access:** http://localhost:3000

## 📊 Feature Showcase

### Dashboard Analytics
- Real-time learning statistics
- Interactive pie and bar charts
- AI-powered learning insights
- Weekly progress tracking

### Smart Skill Management
- Auto-categorization suggestions
- Progress tracking with visual indicators
- Notes and tags for organization
- Platform and difficulty tracking

### Learning Activity Logging
- Time tracking with decimal precision
- Detailed notes for each session
- Timeline view of learning activities
- Automatic progress updates

## 🛠️ Tech Stack

**Frontend:** React.js 18, Tailwind CSS, Recharts, Lucide Icons  
**Backend:** Django 4.2, Django REST Framework, PostgreSQL  
**AI Features:** Rule-based categorization and recommendations  
**Charts:** Recharts with custom styling and animations

## 📁 Project Structure

```
skillstack/
├── backend/                 # Django REST API
│   ├── config/             # Settings and configuration
│   ├── tracker/            # Main application logic
│   ├── requirements.txt    # Python dependencies
│   └── create_demo_data.py # Demo data script
├── frontend/               # React application
│   └── skillstack-frontend/
│       ├── src/
│       │   ├── components/ # Reusable UI components
│       │   ├── pages/      # Main application pages
│       │   ├── hooks/      # Custom React hooks
│       │   ├── services/   # API integration
│       │   └── utils/      # AI helpers and utilities
│       └── package.json
├── docs/                   # Comprehensive documentation
│   ├── INSTALLATION.md     # Setup guide
│   ├── API.md             # API documentation
│   ├── USER_GUIDE.md      # Usage instructions
│   └── CONTRIBUTING.md    # Development guide
└── README.md
```

## 🎮 Demo Features

**Try these features locally:**
1. **Add Skills** - Test AI auto-categorization
2. **Log Activities** - Watch progress update automatically  
3. **View Analytics** - Interactive charts and insights
4. **AI Recommendations** - Personalized skill suggestions
5. **Timeline View** - Calendar-style activity overview

## 🚀 Deployment Ready

**Included deployment configurations for:**
- **Render** (Backend) - Complete with build scripts
- **Vercel** (Frontend) - One-click deploy ready
- **Railway** (Alternative backend) - Configuration included
- **Environment files** - Production-ready templates

## 📖 Documentation

- **[Installation Guide](docs/INSTALLATION.md)** - Detailed setup instructions
- **[API Documentation](docs/API.md)** - Complete endpoint reference
- **[User Guide](docs/USER_GUIDE.md)** - Feature walkthrough
- **[Contributing](docs/CONTRIBUTING.md)** - Development guidelines

## 🎯 AI Features 

**Auto-Categorization:**
- Analyzes skill names and descriptions
- Suggests relevant categories with confidence scores
- Pattern matching for technology domains

**Smart Recommendations:**
- Based on completed skills and learning patterns
- Platform preference analysis
- Complementary skill suggestions

## 🧪 Testing

```bash
# Backend tests
cd backend && python manage.py test

# Frontend tests  
cd frontend/skillstack-frontend && npm test

# Manual testing with demo data
python manage.py shell < create_demo_data.py
```

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for personal learning management.

---

**🚀 Ready to track your learning journey with AI-powered insights!**

*Project completed: July 31, 2025*
