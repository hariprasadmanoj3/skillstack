# SkillStack 📚

> A comprehensive personal skill-building tracker for courses, tutorials, and certifications with AI-powered insights.

![SkillStack Banner](https://img.shields.io/badge/SkillStack-Personal%20Learning%20Tracker-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Django](https://img.shields.io/badge/Django-4.x-092E20?style=flat-square&logo=django)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)

## 🎯 Overview

SkillStack is a modern web application designed to help learners track their educational journey across multiple platforms and resource types. With intelligent progress tracking, interactive analytics, and AI-powered recommendations, it transforms how you manage and visualize your learning goals.

### ✨ Key Features

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

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Interactive data visualization
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **Django 4.x** - Python web framework
- **Django REST Framework** - Powerful API development
- **PostgreSQL** - Robust relational database
- **Python Decouple** - Environment configuration

### Development Tools
- **Vite/Create React App** - Fast development server
- **Git** - Version control
- **npm/pip** - Package management

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **PostgreSQL 12+**
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/hariprasadmanoj3/skillstack.git
cd skillstack
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (new terminal)
cd frontend/skillstack-frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/

## 📖 Usage Guide

### Adding Your First Skill

1. **Navigate to "Add Skill"** from the dashboard
2. **Enter basic information**:
   - Skill name (e.g., "React.js Fundamentals")
   - Description of what you'll learn
   - Resource type (Course, Video, Article, etc.)
   - Platform (Udemy, YouTube, Coursera, etc.)
3. **Set learning parameters**:
   - Difficulty level (Beginner to Expert)
   - Estimated hours to complete
   - Resource URL (optional)
4. **AI Suggestions**: The system will automatically suggest relevant tags
5. **Save and start tracking!**

### Logging Learning Activities

1. **Go to Analytics page**
2. **Click "Log Activity"**
3. **Record your session**:
   - Select the skill you worked on
   - Date of learning session
   - Hours spent (e.g., 2.5 hours)
   - Notes about what you learned
4. **Progress updates automatically** based on your logged hours

### Understanding Your Analytics

**Dashboard Overview**
- **Total Skills**: All skills you're tracking
- **Completion Rate**: Percentage of completed skills
- **Weekly Hours**: Learning time this week
- **AI Recommendations**: Personalized skill suggestions

**Charts & Insights**
- **Status Pie Chart**: Visual breakdown of skill progress
- **Platform Analysis**: Which learning platforms you prefer
- **Category Breakdown**: Types of resources you use most
- **Learning Streaks**: Your consistency patterns

## 🎯 Feature Breakdown

### Core Functionality
- ✅ **Skill Management**: Add, edit, delete learning goals
- ✅ **Progress Tracking**: Automatic progress calculation
- ✅ **Activity Logging**: Track learning sessions with notes
- ✅ **Real-time Updates**: Instant progress and status updates

### Analytics & Insights
- ✅ **Interactive Charts**: Pie charts, bar graphs, progress bars
- ✅ **Learning Statistics**: Averages, totals, completion rates
- ✅ **Platform Analysis**: Usage patterns across learning platforms
- ✅ **Time Tracking**: Daily, weekly, and total learning hours

### AI Features (100% Free)
- ✅ **Auto-categorization**: Smart skill categorization using keywords
- ✅ **Recommendations**: Suggested skills based on learning patterns
- ✅ **Pattern Recognition**: Identifies preferences and learning habits
- ✅ **Confidence Scoring**: AI confidence levels for suggestions

### User Experience
- ✅ **Responsive Design**: Works perfectly on mobile and desktop
- ✅ **Intuitive Navigation**: Easy-to-use interface
- ✅ **Fast Performance**: Real-time updates without page reloads
- ✅ **Professional UI**: Clean, modern design with smooth animations

## 🏗️ Project Structure

```
skillstack/
├── backend/                 # Django REST API
│   ├── config/             # Django settings
│   ├── tracker/            # Main app with models & views
│   ├── requirements.txt    # Python dependencies
│   └── manage.py
├── frontend/               # React application
│   └── skillstack-frontend/
│       ├── src/
│       │   ├── components/ # Reusable UI components
│       │   ├── pages/      # Main application pages
│       │   ├── hooks/      # Custom React hooks
│       │   ├── services/   # API integration
│       │   ├── utils/      # Helper functions & AI logic
│       │   └── context/    # React context providers
│       ├── package.json
│       └── tailwind.config.js
├── docs/                   # Documentation
├── .gitignore
└── README.md
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
SECRET_KEY=your-django-secret-key
DEBUG=True
DB_NAME=skillstack_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

**Frontend (.env)**
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

### Database Setup

**PostgreSQL**
```sql
CREATE DATABASE skillstack_db;
CREATE USER skillstack_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE skillstack_db TO skillstack_user;
```

**SQLite (Alternative)**
```python
# In settings.py, uncomment SQLite configuration for simpler setup
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

## 📊 API Documentation

### Skills Endpoints
- `GET /api/skills/` - List all skills with filtering
- `POST /api/skills/` - Create new skill
- `GET /api/skills/{id}/` - Get specific skill details
- `PUT /api/skills/{id}/` - Update skill
- `DELETE /api/skills/{id}/` - Delete skill
- `GET /api/skills/stats/` - Get dashboard statistics

### Activities Endpoints
- `GET /api/activities/` - List learning activities
- `POST /api/activities/` - Log new learning session
- `PUT /api/activities/{id}/` - Update activity
- `DELETE /api/activities/{id}/` - Delete activity

### Query Parameters
```
GET /api/skills/?status=in_progress&platform=udemy&search=react
GET /api/activities/?skill=1&date_from=2025-01-01
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Add new skill with all fields
- [ ] Log learning activities for skills
- [ ] Verify progress updates automatically
- [ ] Test skill editing and deletion
- [ ] Check analytics charts update
- [ ] Verify AI recommendations appear
- [ ] Test responsive design on mobile
- [ ] Confirm data persistence

### API Testing
```bash
# Test skills endpoint
curl -X GET http://localhost:8000/api/skills/

# Test creating a skill
curl -X POST http://localhost:8000/api/skills/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Skill","resource_type":"course","platform":"udemy"}'
```

## 🚀 Deployment Options

### Option 1: Railway (Recommended)
1. Connect GitHub repository to Railway
2. Configure environment variables
3. Deploy backend and frontend separately
4. Set up PostgreSQL database

### Option 2: Vercel + Railway
1. Deploy frontend to Vercel
2. Deploy backend to Railway
3. Configure CORS settings
4. Update API URLs

### Option 3: Traditional VPS
1. Set up Ubuntu server
2. Install Nginx, PostgreSQL
3. Configure gunicorn for Django
4. Build and serve React app

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and patterns
- Add comments for complex logic
- Test all new features thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Django Team** for the robust backend framework
- **Tailwind CSS** for the beautiful styling system
- **Recharts** for interactive data visualization
- **Lucide** for the beautiful icon set

## 📞 Support

If you encounter any issues or have questions:

1. **Check the documentation** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Contact**: hariprasadmanoj3@github.com

---

**Built with ❤️ using React, Django, and modern web technologies.**

*Last updated: July 30, 2025*