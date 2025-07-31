#!/usr/bin/env bash
# exit on error
set -o errexit

echo "🔧 Installing dependencies..."
pip install -r requirements.txt

echo "🗃️  Running database migrations..."
python manage.py migrate

echo "📦 Collecting static files..."
python manage.py collectstatic --no-input

echo "👤 Creating demo data..."
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from tracker.models import Skill, LearningActivity
from datetime import date, timedelta

# Create superuser if it doesn't exist
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser(
        username='admin',
        email='admin@skillstack.com',
        password='skillstack2025!'
    )
    print('✅ Admin user created: admin / skillstack2025!')

# Create demo skills if none exist
if Skill.objects.count() == 0:
    demo_skills = [
        {
            'name': 'React.js Fundamentals',
            'description': 'Learn React basics, components, hooks, and state management with modern patterns',
            'resource_type': 'course',
            'platform': 'udemy',
            'resource_url': 'https://udemy.com/course/react-complete-guide',
            'difficulty': 2,
            'estimated_hours': 25,
            'tags': 'javascript, react, frontend, web-development',
            'notes': 'Comprehensive React course covering hooks, context, and best practices'
        },
        {
            'name': 'Python Data Science with Pandas',
            'description': 'Master data manipulation and analysis using pandas library',
            'resource_type': 'course',
            'platform': 'coursera',
            'resource_url': 'https://coursera.org/learn/python-data-analysis',
            'difficulty': 3,
            'estimated_hours': 40,
            'tags': 'python, data-science, pandas, analytics, numpy',
            'notes': 'Essential for data analysis and manipulation in Python'
        },
        {
            'name': 'Modern JavaScript ES6+',
            'description': 'Advanced JavaScript features: async/await, destructuring, modules',
            'resource_type': 'video',
            'platform': 'youtube',
            'resource_url': 'https://youtube.com/playlist?list=PLExample',
            'difficulty': 2,
            'estimated_hours': 15,
            'tags': 'javascript, es6, async, modules, programming',
            'notes': 'Essential modern JavaScript concepts for any developer'
        },
        {
            'name': 'Docker for Developers',
            'description': 'Learn containerization with Docker and Docker Compose',
            'resource_type': 'course',
            'platform': 'linkedin',
            'resource_url': 'https://linkedin.com/learning/docker-essential-training',
            'difficulty': 3,
            'estimated_hours': 20,
            'tags': 'docker, devops, containerization, deployment, microservices',
            'notes': 'Practical Docker usage for development and production'
        },
        {
            'name': 'Machine Learning Fundamentals',
            'description': 'Introduction to ML algorithms with scikit-learn and Python',
            'resource_type': 'course',
            'platform': 'edx',
            'resource_url': 'https://edx.org/course/introduction-to-machine-learning',
            'difficulty': 4,
            'estimated_hours': 50,
            'tags': 'machine-learning, python, ai, scikit-learn, algorithms',
            'notes': 'Comprehensive introduction to machine learning concepts'
        }
    ]
    
    created_skills = []
    for skill_data in demo_skills:
        skill = Skill.objects.create(**skill_data)
        created_skills.append(skill)
    
    # Create some demo activities
    activities_data = [
        {'skill_index': 0, 'days_ago': 3, 'hours': 3.5, 'notes': 'Completed React basics: components, props, and JSX fundamentals'},
        {'skill_index': 0, 'days_ago': 1, 'hours': 2.5, 'notes': 'Learned React hooks: useState and useEffect with practical examples'},
        {'skill_index': 1, 'days_ago': 5, 'hours': 2.0, 'notes': 'Introduction to pandas: DataFrames and Series basics'},
        {'skill_index': 1, 'days_ago': 2, 'hours': 4.0, 'notes': 'Data cleaning and manipulation: handling missing values and duplicates'},
        {'skill_index': 2, 'days_ago': 7, 'hours': 1.5, 'notes': 'Arrow functions, template literals, and destructuring assignment'},
        {'skill_index': 2, 'days_ago': 4, 'hours': 2.0, 'notes': 'Async/await patterns and Promise handling'},
        {'skill_index': 2, 'days_ago': 1, 'hours': 1.0, 'notes': 'ES6 modules: import/export and module bundling concepts'},
        {'skill_index': 3, 'days_ago': 6, 'hours': 2.5, 'notes': 'Docker basics: containers, images, and Dockerfile creation'},
        {'skill_index': 4, 'days_ago': 2, 'hours': 1.5, 'notes': 'ML overview: supervised vs unsupervised learning concepts'},
    ]
    
    for activity_data in activities_data:
        skill = created_skills[activity_data['skill_index']]
        activity_date = date.today() - timedelta(days=activity_data['days_ago'])
        
        LearningActivity.objects.create(
            skill=skill,
            date=activity_date,
            hours_spent=activity_data['hours'],
            notes=activity_data['notes']
        )
    
    # Update skill hours and statuses
    for skill in created_skills:
        skill.update_hours_and_status()
    
    print(f'✅ Created {len(demo_skills)} demo skills with learning activities')

print('🎉 Production setup complete!')
"

echo "✅ Build completed successfully!"