# SkillStack Installation Guide

## System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Python**: 3.8 or higher
- **Node.js**: 16.0 or higher
- **Database**: PostgreSQL 12+ (or SQLite for development)
- **Memory**: 4GB RAM minimum, 8GB recommended
- **Storage**: 2GB free space

## Step-by-Step Installation

### 1. Environment Setup

#### Install Python
```bash
# Check Python version
python --version  # Should be 3.8+

# If not installed, download from python.org or use package manager
# Ubuntu/Debian:
sudo apt update
sudo apt install python3 python3-pip python3-venv

# macOS:
brew install python3

# Windows:
# Download from python.org
```

#### Install Node.js
```bash
# Check Node.js version
node --version  # Should be 16+
npm --version

# If not installed:
# Ubuntu/Debian:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS:
brew install node

# Windows:
# Download from nodejs.org
```

#### Install PostgreSQL (Optional)
```bash
# Ubuntu/Debian:
sudo apt install postgresql postgresql-contrib

# macOS:
brew install postgresql
brew services start postgresql

# Windows:
# Download from postgresql.org
```

### 2. Project Setup

#### Clone Repository
```bash
git clone https://github.com/hariprasadmanoj3/skillstack.git
cd skillstack
```

#### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Linux/macOS:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your settings
```

#### Database Configuration

**Option A: PostgreSQL (Recommended for production)**
```bash
# Create database
sudo -u postgres psql
CREATE DATABASE skillstack_db;
CREATE USER skillstack_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE skillstack_db TO skillstack_user;
\q

# Update .env file with your database credentials
```

**Option B: SQLite (Easy for development)**
```python
# In backend/config/settings.py, uncomment SQLite configuration:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

#### Run Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Test backend
python manage.py runserver
# Should be accessible at http://localhost:8000
```

#### Frontend Setup
```bash
# New terminal window
cd frontend/skillstack-frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env if needed (default should work for local development)

# Start development server
npm start
# Should open browser at http://localhost:3000
```

## Troubleshooting

### Common Issues

**Python Version Issues**
```bash
# If python command not found, try python3
python3 --version
python3 -m venv venv
```

**Permission Errors (Linux/macOS)**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
# Or use nvm for Node.js management
```

**Database Connection Issues**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list | grep postgresql  # macOS

# Check database exists
sudo -u postgres psql -l
```

**Port Already in Use**
```bash
# Kill process using port 8000
sudo lsof -t -i tcp:8000 | xargs kill -9

# Or use different port
python manage.py runserver 8001
```

**Module Import Errors**
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Reinstall requirements
pip install -r requirements.txt --force-reinstall
```

### Development Tips

1. **Use separate terminals** for backend and frontend
2. **Keep virtual environment activated** when working on backend
3. **Check browser console** for frontend errors
4. **Use Django admin** at http://localhost:8000/admin for data management
5. **API documentation** available at http://localhost:8000/api/

### Next Steps

After successful installation:
1. Read the [API Documentation](API.md)
2. Check the [User Guide](USER_GUIDE.md)
3. Explore the [Deployment Guide](DEPLOYMENT.md)