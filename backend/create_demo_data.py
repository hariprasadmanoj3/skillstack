"""
Demo data creation script for SkillStack
Run with: python manage.py shell < create_demo_data.py
"""

from tracker.models import Skill, LearningActivity
from datetime import date, timedelta
import random

# Clear existing data (optional)
print("Creating demo data for SkillStack...")

# Demo skills data
demo_skills = [
    {
        'name': 'React.js Fundamentals',
        'description': 'Learn React basics, components, hooks, and state management',
        'resource_type': 'course',
        'platform': 'udemy',
        'resource_url': 'https://udemy.com/course/react-basics',
        'difficulty': 2,
        'estimated_hours': 25,
        'tags': 'javascript, react, frontend, web-development',
        'notes': 'Comprehensive React course covering modern patterns'
    },
    {
        'name': 'Python Data Analysis with Pandas',
        'description': 'Master data manipulation and analysis using pandas library',
        'resource_type': 'course',
        'platform': 'coursera',
        'resource_url': 'https://coursera.org/learn/python-pandas',
        'difficulty': 3,
        'estimated_hours': 40,
        'tags': 'python, data-science, pandas, analytics',
        'notes': 'Great for understanding data manipulation techniques'
    },
    {
        'name': 'JavaScript ES6+ Features',
        'description': 'Modern JavaScript features and best practices',
        'resource_type': 'video',
        'platform': 'youtube',
        'resource_url': 'https://youtube.com/watch?v=example',
        'difficulty': 2,
        'estimated_hours': 15,
        'tags': 'javascript, es6, programming, web-development',
        'notes': 'Essential modern JavaScript concepts'
    },
    {
        'name': 'Docker for Developers',
        'description': 'Learn containerization with Docker and Docker Compose',
        'resource_type': 'course',
        'platform': 'linkedin',
        'resource_url': 'https://linkedin.com/learning/docker',
        'difficulty': 3,
        'estimated_hours': 20,
        'tags': 'docker, devops, containerization, deployment',
        'notes': 'Practical Docker usage for development workflow'
    },
    {
        'name': 'Machine Learning Basics',
        'description': 'Introduction to ML algorithms and scikit-learn',
        'resource_type': 'course',
        'platform': 'edx',
        'resource_url': 'https://edx.org/course/machine-learning',
        'difficulty': 4,
        'estimated_hours': 60,
        'tags': 'machine-learning, python, ai, data-science',
        'notes': 'Comprehensive ML fundamentals course'
    },
    {
        'name': 'CSS Grid and Flexbox',
        'description': 'Modern CSS layout techniques',
        'resource_type': 'tutorial',
        'platform': 'freecodecamp',
        'resource_url': 'https://freecodecamp.org/learn/css-grid',
        'difficulty': 2,
        'estimated_hours': 12,
        'tags': 'css, layout, frontend, web-design',
        'notes': 'Essential for modern web layouts'
    },
    {
        'name': 'Node.js Backend Development',
        'description': 'Build REST APIs with Node.js and Express',
        'resource_type': 'course',
        'platform': 'udemy',
        'resource_url': 'https://udemy.com/course/nodejs-express',
        'difficulty': 3,
        'estimated_hours': 35,
        'tags': 'nodejs, backend, api, javascript',
        'notes': 'Complete backend development with Node.js'
    },
    {
        'name': 'Git Version Control',
        'description': 'Master Git workflows and collaboration',
        'resource_type': 'article',
        'platform': 'other',
        'resource_url': 'https://git-scm.com/book',
        'difficulty': 1,
        'estimated_hours': 8,
        'tags': 'git, version-control, collaboration, development',
        'notes': 'Essential tool for any developer'
    }
]

# Create skills
created_skills = []
for skill_data in demo_skills:
    skill, created = Skill.objects.get_or_create(
        name=skill_data['name'],
        defaults=skill_data
    )
    created_skills.append(skill)
    if created:
        print(f"Created skill: {skill.name}")

# Create demo activities
activities_data = [
    # React.js activities
    {'skill_index': 0, 'days_ago': 5, 'hours': 3.0, 'notes': 'Started with React basics, learned about components and JSX'},
    {'skill_index': 0, 'days_ago': 3, 'hours': 2.5, 'notes': 'Worked on props and state management concepts'},
    {'skill_index': 0, 'days_ago': 1, 'hours': 4.0, 'notes': 'Built first React app, practiced with hooks'},
    
    # Python Data Analysis activities
    {'skill_index': 1, 'days_ago': 7, 'hours': 2.0, 'notes': 'Introduction to pandas, basic data structures'},
    {'skill_index': 1, 'days_ago': 5, 'hours': 3.5, 'notes': 'Data cleaning and manipulation techniques'},
    {'skill_index': 1, 'days_ago': 2, 'hours': 2.5, 'notes': 'Working with datasets, groupby operations'},
    
    # JavaScript ES6+ activities
    {'skill_index': 2, 'days_ago': 10, 'hours': 1.5, 'notes': 'Arrow functions and template literals'},
    {'skill_index': 2, 'days_ago': 8, 'hours': 2.0, 'notes': 'Destructuring and spread operator'},
    {'skill_index': 2, 'days_ago': 6, 'hours': 1.0, 'notes': 'Async/await and promises review'},
    
    # Docker activities
    {'skill_index': 3, 'days_ago': 4, 'hours': 2.5, 'notes': 'Docker basics, containers and images'},
    {'skill_index': 3, 'days_ago': 2, 'hours': 3.0, 'notes': 'Docker Compose for multi-container apps'},
    
    # Machine Learning activities (just started)
    {'skill_index': 4, 'days_ago': 1, 'hours': 1.5, 'notes': 'Course introduction, ML overview and types'},
    
    # CSS Grid activities (completed)
    {'skill_index': 5, 'days_ago': 15, 'hours': 2.0, 'notes': 'CSS Grid fundamentals and basic layouts'},
    {'skill_index': 5, 'days_ago': 12, 'hours': 3.0, 'notes': 'Advanced grid techniques and responsive design'},
    {'skill_index': 5, 'days_ago': 10, 'hours': 2.5, 'notes': 'Flexbox deep dive and practical examples'},
    {'skill_index': 5, 'days_ago': 8, 'hours': 2.0, 'notes': 'Combined grid and flexbox layouts'},
    {'skill_index': 5, 'days_ago': 6, 'hours': 2.5, 'notes': 'Final projects and layout challenges'},
    
    # Git activities (completed)
    {'skill_index': 7, 'days_ago': 20, 'hours': 1.5, 'notes': 'Git basics: init, add, commit, push'},
    {'skill_index': 7, 'days_ago': 18, 'hours': 2.0, 'notes': 'Branching and merging strategies'},
    {'skill_index': 7, 'days_ago': 16, 'hours': 1.5, 'notes': 'Resolving merge conflicts'},
    {'skill_index': 7, 'days_ago': 14, 'hours': 2.0, 'notes': 'Advanced Git: rebase, stash, reset'},
    {'skill_index': 7, 'days_ago': 12, 'hours': 1.0, 'notes': 'Git workflows and collaboration best practices'},
]

# Create activities
for activity_data in activities_data:
    skill = created_skills[activity_data['skill_index']]
    activity_date = date.today() - timedelta(days=activity_data['days_ago'])
    
    activity, created = LearningActivity.objects.get_or_create(
        skill=skill,
        date=activity_date,
        defaults={
            'hours_spent': activity_data['hours'],
            'notes': activity_data['notes']
        }
    )
    
    if created:
        print(f"Created activity: {activity_data['hours']}h for {skill.name}")

# Update skill hours and statuses
print("\nUpdating skill progress...")
for skill in created_skills:
    skill.update_hours_and_status()
    print(f"{skill.name}: {skill.hours_spent}h spent, {skill.progress_percentage:.1f}% complete, Status: {skill.status}")

print(f"\n✅ Demo data created successfully!")
print(f"Created {len(created_skills)} skills and {len(activities_data)} learning activities")
print("\nYou can now:")
print("1. View the dashboard with real data")
print("2. Explore analytics and charts")
print("3. See AI recommendations in action")
print("4. Edit existing skills and add new activities")