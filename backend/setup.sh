#!/bin/bash

# SkillStack Quick Setup Script
echo "🚀 SkillStack Quick Setup Starting..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Backend setup
echo "📦 Setting up backend..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created .env file. Please update database credentials if needed."
fi

# Run migrations
python manage.py makemigrations
python manage.py migrate

echo "✅ Backend setup complete"

# Frontend setup
echo "📦 Setting up frontend..."
cd ../frontend/skillstack-frontend

# Install dependencies
npm install

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created frontend .env file"
fi

echo "✅ Frontend setup complete"

cd ../..

echo "🎉 SkillStack setup complete!"
echo ""
echo "To start the application:"
echo "1. Backend:  cd backend && source venv/bin/activate && python manage.py runserver"
echo "2. Frontend: cd frontend/skillstack-frontend && npm start"
echo ""
echo "Optional: Create demo data:"
echo "cd backend && source venv/bin/activate && python manage.py shell < create_demo_data.py"