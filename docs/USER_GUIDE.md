# SkillStack User Guide

## Getting Started

Welcome to SkillStack! This guide will help you make the most of your personal learning tracker.

### First Time Setup

1. **Access the Application**: Open your browser and go to `http://localhost:3000`
2. **Explore the Dashboard**: You'll see your learning overview with statistics and recent activity
3. **Add Your First Skill**: Click the "Add Skill" button to get started

## Dashboard Overview

The dashboard is your learning command center:

### Statistics Cards
- **Total Skills**: Number of skills you're tracking
- **Completed**: Skills you've finished
- **In Progress**: Skills you're actively learning
- **This Week**: Hours spent learning this week

### AI Recommendations
Personalized skill suggestions based on your learning patterns and completed skills.

### Charts Section
- **Learning Progress**: Visual completion rate
- **Skills Overview**: Pie chart showing status distribution

### Recent Activity
- Latest learning sessions
- Quick overview of what you've been working on

## Managing Skills

### Adding a New Skill

1. **Click "Add Skill"** from any page
2. **Fill in Basic Information**:
   - **Skill Name**: Be descriptive (e.g., "React.js Fundamentals")
   - **Description**: What you'll learn from this resource
   - **Resource Type**: Course, Video, Article, Book, Tutorial, or Certification
   - **Platform**: Where you're learning (Udemy, YouTube, Coursera, etc.)

3. **Set Learning Parameters**:
   - **Resource URL**: Link to the course/tutorial (optional but recommended)
   - **Difficulty Level**: Beginner, Intermediate, Advanced, or Expert
   - **Estimated Hours**: How long you expect to spend (helps with progress tracking)

4. **Add Tags**: Use the AI suggestion or add your own comma-separated tags

5. **Save**: Your skill is now being tracked!

### AI Auto-Categorization

As you type your skill name, SkillStack's AI will analyze it and suggest relevant categories:
- Purple suggestion box appears with confidence percentage
- Click "Add Tag" to accept the suggestion
- Or dismiss if not relevant

Example: Typing "Python Machine Learning" might suggest "Data Science & Analytics" category.

### Editing Skills

1. **Go to Skills page**
2. **Click the edit icon** (pencil) on any skill card
3. **Modify any information** in the modal
4. **Save changes** - progress will be recalculated if needed

### Understanding Progress

**Progress is automatically calculated based on**:
- Hours logged vs estimated hours
- Status changes when you log activities
- Visual progress bars update in real-time

**Status Updates**:
- **Not Started** → **In Progress** (when you log first activity)
- **In Progress** → **Completed** (when hours logged ≥ estimated hours)
- Manual status changes available in edit mode

## Learning Activities

### Logging Learning Sessions

1. **Go to Analytics page**
2. **Click "Log Activity"**
3. **Fill in Session Details**:
   - **Skill**: Select from dropdown
   - **Date**: When you studied (defaults to today)
   - **Hours Spent**: Decimal values allowed (e.g., 1.5 hours)
   - **Notes**: What you learned, challenges faced, breakthroughs

4. **Save**: Progress updates automatically!

### Activity Management

- **Edit Activities**: Click pencil icon on any logged activity
- **Delete Activities**: Click trash icon (progress updates automatically)
- **Filter by Skill**: View activities for specific skills

### Best Practices for Logging

**Be Consistent**:
- Log activities regularly (daily or weekly)
- Include meaningful notes about your progress
- Be honest with time tracking

**Use Notes Effectively**:
- What topics you covered
- Key concepts learned
- Questions or difficulties encountered
- Links to useful resources found

Example good note: "Covered React hooks - useState and useEffect. Built todo app practice project. Still confused about useCallback optimization."

## Analytics & Insights

### Understanding Your Data

**Learning Statistics**:
- **Average per Skill**: How much time you typically spend per skill
- **Daily Average**: Your consistency (total hours / days active)
- **Most Used Platform**: Your preferred learning source
- **Top Category**: Your primary focus area

**Charts Breakdown**:
- **Skills by Status**: How much you're completing vs starting
- **Skills by Platform**: Your platform preferences
- **Category Breakdown**: Types of learning (courses vs videos vs articles)

### AI Learning Insights

**Learning Focus**: Your primary resource type preference
**Preferred Platform**: Most frequently used learning platform  
**Learning Streak**: Active learning days this week

### Using Data for Improvement

**If completion rate is low**:
- Set more realistic estimated hours
- Focus on fewer skills at once
- Break large skills into smaller ones

**If you're stuck in "In Progress"**:
- Review and update estimated hours
- Log more activities consistently
- Consider if the skill needs to be split

**Platform Analysis**:
- Identify which platforms work best for you
- Focus your future learning on effective platforms
- Balance free vs paid resources

## AI Features

### Smart Recommendations

SkillStack analyzes your learning patterns to suggest:

**Related Skills**: Based on your current skill categories
**Next Level Skills**: Advanced topics after completing basics
**Complementary Skills**: Skills that work well together

Example: If you complete "JavaScript Fundamentals", you might see recommendations for "React.js", "Node.js", or "TypeScript".

### Auto-Categorization

The AI categorizes skills into areas like:
- Frontend Development
- Backend Development  
- Data Science & Analytics
- Mobile Development
- DevOps & Cloud
- Design & Creative

**How it works**:
- Analyzes skill name, description, and tags
- Uses keyword matching and patterns
- Provides confidence score
- Suggests relevant tags

### Recommendation System

Based on your data, the system identifies:
- **Platform Preferences**: Which platforms you use most
- **Resource Type Preferences**: Courses vs videos vs articles
- **Learning Patterns**: Your typical progression paths
- **Category Interests**: Your main focus areas

## Tips for Success

### Setting Up Skills

**Be Specific**: Instead of "Learn Python", use "Python for Data Analysis with Pandas"
**Realistic Estimates**: Better to underestimate and exceed than overestimate
**Good Descriptions**: Help the AI categorize and recommend better
**Use Tags**: Make skills searchable and groupable

### Consistent Tracking

**Regular Logging**: Set aside time weekly to log activities
**Honest Hours**: Track actual time, not intended time
**Meaningful Notes**: Future you will thank you for detailed notes
**Review Progress**: Use analytics to adjust your learning strategy

### Using AI Effectively

**Accept Good Suggestions**: The AI learns from your patterns
**Dismiss Poor Ones**: Help improve accuracy by dismissing bad suggestions
**Review Recommendations**: Check recommended skills regularly
**Update Tags**: Keep your skills well-tagged for better categorization

### Workflow Suggestions

**Daily**: Quick activity logging (2-3 minutes)
**Weekly**: Review progress, plan next sessions
**Monthly**: Analyze patterns, adjust goals
**Quarterly**: Major review and planning session

## Troubleshooting

### Progress Not Updating
- Check that activities are logged correctly
- Verify estimated hours are set
- Refresh the page

### AI Suggestions Not Appearing
- Make sure skill name is descriptive
- Add more detailed descriptions
- Check that you have some skills already added

### Charts Not Loading
- Ensure you have some skills and activities
- Check browser console for errors
- Try refreshing the page

### Can't Edit/Delete Skills
- Make sure you're clicking the correct icons
- Check if any modals are already open
- Try refreshing if buttons aren't responsive

## Advanced Usage

### Filtering and Search

**Skills Page Filters**:
- Status: Filter by completion status
- Platform: Show only specific platforms
- Resource Type: Filter by content type
- Search: Find skills by name, description, or tags

**Combining Filters**: Use multiple filters together for precise results

### Data Export (Future Feature)
Plan to add CSV export functionality for:
- Skills data
- Learning activities
- Progress reports
- Analytics summaries

### Integration Ideas
Consider tracking skills from:
- Learning platform APIs
- Calendar integration
- Time tracking apps
- Note-taking systems

## Support

If you need help:
1. Check this user guide
2. Review the API documentation
3. Look at the installation guide
4. Create an issue on GitHub

Remember: SkillStack grows more useful as you add more data and use it consistently!