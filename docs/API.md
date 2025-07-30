# SkillStack API Documentation

## Base URL
- **Development**: `http://localhost:8000/api`
- **Production**: `https://your-domain.com/api`

## Authentication
Currently, the API uses AllowAny permissions for development. In production, you should implement proper authentication.

## Endpoints Overview

### Skills Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/skills/` | List all skills with filtering |
| POST | `/skills/` | Create a new skill |
| GET | `/skills/{id}/` | Retrieve specific skill |
| PUT | `/skills/{id}/` | Update skill |
| DELETE | `/skills/{id}/` | Delete skill |
| GET | `/skills/stats/` | Get dashboard statistics |

### Learning Activities
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/activities/` | List learning activities |
| POST | `/activities/` | Create learning activity |
| GET | `/activities/{id}/` | Retrieve specific activity |
| PUT | `/activities/{id}/` | Update activity |
| DELETE | `/activities/{id}/` | Delete activity |

## Skills API

### List Skills
```http
GET /api/skills/
```

**Query Parameters:**
- `search` (string): Search in name, description, or tags
- `status` (string): Filter by status (`not_started`, `in_progress`, `completed`, `paused`)
- `platform` (string): Filter by platform (`udemy`, `youtube`, `coursera`, etc.)
- `resource_type` (string): Filter by type (`video`, `course`, `article`, etc.)
- `ordering` (string): Order results (`-created_at`, `name`, `hours_spent`)

**Example:**
```bash
curl "http://localhost:8000/api/skills/?status=in_progress&platform=udemy"
```

**Response:**
```json
{
  "count": 15,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "React.js Fundamentals",
      "description": "Learn React basics and hooks",
      "resource_type": "course",
      "platform": "udemy",
      "resource_url": "https://udemy.com/course/react-basics",
      "difficulty": 2,
      "estimated_hours": 20,
      "hours_spent": 8.5,
      "status": "in_progress",
      "notes": "Great course, covers hooks well",
      "tags": "javascript, react, frontend",
      "progress_percentage": 42.5,
      "activities": [],
      "created_at": "2025-07-25T10:30:00Z",
      "updated_at": "2025-07-30T15:22:00Z"
    }
  ]
}
```

### Create Skill
```http
POST /api/skills/
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Python Data Science",
  "description": "Learn data analysis with pandas and numpy",
  "resource_type": "course",
  "platform": "coursera",
  "resource_url": "https://coursera.org/learn/python-data-science",
  "difficulty": 3,
  "estimated_hours": 40,
  "tags": "python, data-science, pandas",
  "notes": "Comprehensive data science course"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Python Data Science",
  "description": "Learn data analysis with pandas and numpy",
  "resource_type": "course",
  "platform": "coursera",
  "resource_url": "https://coursera.org/learn/python-data-science",
  "difficulty": 3,
  "estimated_hours": 40,
  "hours_spent": 0.0,
  "status": "not_started",
  "notes": "Comprehensive data science course",
  "tags": "python, data-science, pandas",
  "progress_percentage": 0,
  "activities": [],
  "created_at": "2025-07-30T18:22:26Z",
  "updated_at": "2025-07-30T18:22:26Z"
}
```

### Get Skills Statistics
```http
GET /api/skills/stats/
```

**Response:**
```json
{
  "total_skills": 25,
  "completed_skills": 8,
  "in_progress_skills": 12,
  "not_started_skills": 4,
  "paused_skills": 1,
  "completion_rate": 32.0,
  "total_hours": 156.5,
  "avg_hours_per_skill": 6.26,
  "platform_breakdown": {
    "Udemy": 10,
    "YouTube": 8,
    "Coursera": 5,
    "LinkedIn Learning": 2
  },
  "resource_type_breakdown": {
    "Course": 15,
    "Video": 8,
    "Article": 2
  },
  "status_breakdown": {
    "Completed": 8,
    "In Progress": 12,
    "Not Started": 4,
    "Paused": 1
  },
  "most_used_platform": "Udemy",
  "most_used_resource_type": "Course"
}
```

## Learning Activities API

### List Activities
```http
GET /api/activities/
```

**Query Parameters:**
- `skill` (integer): Filter by skill ID
- `date_from` (date): Activities from date (YYYY-MM-DD)
- `date_to` (date): Activities to date (YYYY-MM-DD)

**Example:**
```bash
curl "http://localhost:8000/api/activities/?skill=1&date_from=2025-07-01"
```

**Response:**
```json
{
  "count": 3,
  "results": [
    {
      "id": 1,
      "skill": 1,
      "date": "2025-07-30",
      "hours_spent": 2.5,
      "notes": "Completed components section, learned about props and state",
      "created_at": "2025-07-30T18:22:26Z",
      "updated_at": "2025-07-30T18:22:26Z"
    }
  ]
}
```

### Create Activity
```http
POST /api/activities/
Content-Type: application/json
```

**Request Body:**
```json
{
  "skill": 1,
  "date": "2025-07-30",
  "hours_spent": 2.5,
  "notes": "Worked on hooks chapter, implemented useState and useEffect"
}
```

**Response:**
```json
{
  "id": 2,
  "skill": 1,
  "date": "2025-07-30",
  "hours_spent": 2.5,
  "notes": "Worked on hooks chapter, implemented useState and useEffect",
  "created_at": "2025-07-30T18:22:26Z",
  "updated_at": "2025-07-30T18:22:26Z"
}
```

## Data Models

### Skill Model
```python
{
  "id": "integer (auto-generated)",
  "name": "string (max 255 chars, required)",
  "description": "text (optional)",
  "resource_type": "choice (video, course, article, book, tutorial, certification)",
  "platform": "choice (udemy, youtube, coursera, edx, linkedin, pluralsight, codecademy, freecodecamp, other)",
  "resource_url": "url (optional)",
  "difficulty": "integer (1-4: Beginner, Intermediate, Advanced, Expert)",
  "estimated_hours": "positive integer (default 0)",
  "hours_spent": "decimal (auto-calculated from activities)",
  "status": "choice (not_started, in_progress, completed, paused)",
  "notes": "text (optional)",
  "tags": "string (comma-separated)",
  "created_at": "datetime (auto-generated)",
  "updated_at": "datetime (auto-updated)"
}
```

### Learning Activity Model
```python
{
  "id": "integer (auto-generated)",
  "skill": "foreign key to Skill",
  "date": "date (required)",
  "hours_spent": "decimal (min 0.1, required)",
  "notes": "text (optional)",
  "created_at": "datetime (auto-generated)",
  "updated_at": "datetime (auto-updated)"
}
```

## Error Responses

### Validation Errors (400)
```json
{
  "name": ["This field is required."],
  "hours_spent": ["Ensure this value is greater than or equal to 0.1."]
}
```

### Not Found (404)
```json
{
  "detail": "Not found."
}
```

### Server Error (500)
```json
{
  "detail": "Internal server error."
}
```

## Rate Limiting
Currently no rate limiting is implemented. In production, consider implementing rate limiting based on your needs.

## CORS Configuration
The API is configured to accept requests from `http://localhost:3000` for development. Update `CORS_ALLOWED_ORIGINS` in settings.py for production.

## Authentication (Future)
For production deployment, consider implementing:
- JWT token authentication
- User-specific skill management
- Permission-based access control

## Examples with cURL

**Get all skills:**
```bash
curl -X GET http://localhost:8000/api/skills/
```

**Create a new skill:**
```bash
curl -X POST http://localhost:8000/api/skills/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vue.js Tutorial",
    "resource_type": "video",
    "platform": "youtube",
    "difficulty": 1,
    "estimated_hours": 5
  }'
```

**Log learning activity:**
```bash
curl -X POST http://localhost:8000/api/activities/ \
  -H "Content-Type: application/json" \
  -d '{
    "skill": 1,
    "date": "2025-07-30",
    "hours_spent": 1.5,
    "notes": "Watched introduction videos"
  }'
```

## WebSocket Support (Future)
Real-time updates could be implemented using Django Channels for live progress updates across multiple browser tabs.