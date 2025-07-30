# Contributing to SkillStack

Thank you for your interest in contributing to SkillStack! This document provides guidelines and information for contributors.

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions. We welcome contributors of all backgrounds and experience levels.

## Development Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git
- Code editor (VS Code recommended)

### Local Development

1. **Fork and Clone**
```bash
git clone https://github.com/YOUR_USERNAME/skillstack.git
cd skillstack
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

3. **Frontend Setup**
```bash
cd frontend/skillstack-frontend
npm install
npm start
```

## Project Structure

```
skillstack/
├── backend/
│   ├── config/          # Django settings
│   ├── tracker/         # Main Django app
│   │   ├── models.py    # Database models
│   │   ├── views.py     # API views
│   │   ├── serializers.py # API serializers
│   │   └── urls.py      # URL routing
│   └── requirements.txt
├── frontend/skillstack-frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Main pages
│   │   ├── hooks/       # Custom React hooks
│   │   ├── services/    # API integration
│   │   ├── utils/       # Helper functions
│   │   └── context/     # React context
│   └── package.json
└── docs/               # Documentation
```

## Contributing Guidelines

### Types of Contributions

**🐛 Bug Fixes**
- Fix broken functionality
- Improve error handling
- Performance improvements

**✨ New Features**
- New UI components
- Additional analytics
- Enhanced AI features
- Export/import functionality

**📚 Documentation**
- Improve existing docs
- Add examples
- Create tutorials

**🎨 UI/UX Improvements**
- Better responsive design
- Accessibility improvements
- Visual enhancements

### Before You Start

1. **Check existing issues** to avoid duplicates
2. **Create an issue** to discuss major changes
3. **Fork the repository** to your account

### Development Workflow

1. **Create a branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

2. **Make your changes** following the coding standards below

3. **Test thoroughly**
```bash
# Backend tests (when available)
cd backend
python manage.py test

# Frontend tests (when available)
cd frontend/skillstack-frontend
npm test
```

4. **Commit with clear messages**
```bash
git add .
git commit -m "feat: add skill export functionality"
# or
git commit -m "fix: resolve progress calculation issue"
```

5. **Push and create PR**
```bash
git push origin feature/your-feature-name
# Then create PR on GitHub
```

## Coding Standards

### Backend (Python/Django)

**Code Style**:
- Follow PEP 8
- Use meaningful variable names
- Add docstrings for functions and classes
- Maximum line length: 120 characters

**Example**:
```python
def calculate_skill_progress(skill):
    """
    Calculate progress percentage for a skill based on logged activities.
    
    Args:
        skill (Skill): The skill instance to calculate progress for
        
    Returns:
        float: Progress percentage (0-100)
    """
    if skill.estimated_hours > 0:
        return min(100, (float(skill.hours_spent) / skill.estimated_hours) * 100)
    return 0 if skill.status == 'not_started' else 50
```

**Models**:
- Use descriptive field names
- Add help_text for complex fields
- Include proper validation

**Views**:
- Use Django REST Framework viewsets
- Add proper error handling
- Include docstrings

### Frontend (React/JavaScript)

**Code Style**:
- Use functional components with hooks
- Use meaningful component and variable names
- Add PropTypes or TypeScript (if migrating)
- Maximum line length: 100 characters

**Component Structure**:
```javascript
import React, { useState, useEffect } from 'react';
import { SomeIcon } from 'lucide-react';

const MyComponent = ({ prop1, prop2, onAction }) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  const handleSomething = () => {
    // Handler logic
    onAction?.(data);
  };

  return (
    <div className="component-container">
      {/* JSX content */}
    </div>
  );
};

export default MyComponent;
```

**Styling**:
- Use Tailwind CSS classes
- Follow existing patterns
- Keep responsive design in mind
- Use semantic HTML

**State Management**:
- Use custom hooks for data fetching
- Keep state as local as possible
- Use React Context for global state

## Testing Guidelines

### Backend Testing
```python
from django.test import TestCase
from tracker.models import Skill, LearningActivity

class SkillModelTest(TestCase):
    def test_progress_calculation(self):
        skill = Skill.objects.create(
            name="Test Skill",
            estimated_hours=10,
            resource_type="course",
            platform="udemy"
        )
        
        # Add activity
        LearningActivity.objects.create(
            skill=skill,
            date="2025-07-30",
            hours_spent=5
        )
        
        skill.refresh_from_db()
        self.assertEqual(skill.progress_percentage, 50)
```

### Frontend Testing (Future)
```javascript
import { render, screen } from '@testing-library/react';
import SkillCard from '../components/SkillCard';

test('renders skill card with correct information', () => {
  const mockSkill = {
    name: 'React Basics',
    progress_percentage: 75,
    status: 'in_progress'
  };

  render(<SkillCard skill={mockSkill} />);
  
  expect(screen.getByText('React Basics')).toBeInTheDocument();
  expect(screen.getByText('75%')).toBeInTheDocument();
});
```

## AI Features Development

### Adding New AI Features

**Rule-based Approach** (current):
- Update `src/utils/aiHelpers.js`
- Add keyword patterns and logic
- Test with various skill names
- Update confidence scoring

**Example Addition**:
```javascript
// In autoCategorizeskill function
const categories = {
  // ... existing categories
  'Blockchain & Crypto': [
    'blockchain', 'bitcoin', 'ethereum', 'smart contracts',
    'cryptocurrency', 'defi', 'nft', 'web3', 'solidity'
  ]
};
```

### Recommendation System

**Adding New Recommendation Types**:
1. Update `recommendResources` function
2. Add new logic for pattern recognition
3. Test with different user profiles
4. Update UI to display new recommendations

## Database Changes

### Creating Migrations

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### Migration Best Practices

- **Test migrations** on copy of production data
- **Add database indexes** for performance
- **Use data migrations** for complex changes
- **Document breaking changes**

Example migration:
```python
from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('tracker', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='skill',
            name='difficulty_notes',
            field=models.TextField(blank=True, help_text='Notes about difficulty level'),
        ),
    ]
```

## Documentation Updates

### When to Update Docs

- New features added
- API changes
- Installation process changes
- Bug fixes that affect user experience

### Documentation Structure

- **README.md**: Overview and quick start
- **docs/INSTALLATION.md**: Detailed setup
- **docs/API.md**: API documentation
- **docs/USER_GUIDE.md**: User instructions
- **docs/CONTRIBUTING.md**: This file

## Pull Request Process

### PR Checklist

- [ ] **Branch is up to date** with main
- [ ] **Code follows style guidelines**
- [ ] **Tests pass** (when available)
- [ ] **Documentation updated** if needed
- [ ] **Clear PR description** with changes explained
- [ ] **Screenshots** for UI changes

### PR Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested locally
- [ ] Added new tests (if applicable)
- [ ] All tests pass

## Screenshots (if applicable)
Add screenshots for UI changes.

## Notes
Any additional notes for reviewers.
```

## Release Process

### Versioning
We follow semantic versioning (semver):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Release Steps
1. Update version numbers
2. Update CHANGELOG.md
3. Create GitHub release
4. Deploy to production (if applicable)

## Getting Help

### Resources
- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Email**: hariprasadmanoj3@github.com

### Debugging Tips

**Backend Issues**:
```bash
# Check Django logs
python manage.py runserver --verbosity=2

# Database queries
python manage.py shell
>>> from tracker.models import Skill
>>> Skill.objects.all()
```

**Frontend Issues**:
```bash
# Check browser console
# Network tab for API calls
# React Developer Tools

# Clear cache and restart
rm -rf node_modules package-lock.json
npm install
npm start
```

## Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes (for significant contributions)

Thank you for helping make SkillStack better! 🚀