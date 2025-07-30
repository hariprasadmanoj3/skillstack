import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Book, Clock, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { useSkillStats, useSkills } from '../hooks/useSkills';
import { useActivities } from '../hooks/useActivities';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SkillCard from '../components/SkillCard';
import { StatusPieChart } from '../components/charts/StatsChart';

const Dashboard = () => {
  const { stats, loading: statsLoading, error: statsError } = useSkillStats();
  const { skills, loading: skillsLoading, error: skillsError } = useSkills({ 
    ordering: '-created_at'
  });
  const { activities } = useActivities();

  const recentSkills = skills.slice(0, 6);
  const recentActivities = activities.slice(0, 5);

  if (statsLoading || skillsLoading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  if (statsError || skillsError) {
    return <ErrorMessage message={statsError || skillsError} />;
  }

  // Calculate this week's hours
  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);
  const weeklyHours = activities
    .filter(activity => new Date(activity.date) >= thisWeek)
    .reduce((sum, activity) => sum + parseFloat(activity.hours_spent), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your learning journey</p>
        </div>
        <Link to="/add-skill" className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Skills</h3>
              <p className="text-2xl font-bold text-gray-900">{stats?.total_skills || 0}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <p className="text-2xl font-bold text-gray-900">{stats?.completed_skills || 0}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
              <p className="text-2xl font-bold text-gray-900">{stats?.in_progress_skills || 0}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">This Week</h3>
              <p className="text-2xl font-bold text-gray-900">{weeklyHours.toFixed(1)}h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress and Charts */}
      {stats && stats.total_skills > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Completion Rate */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h2>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {stats.completion_rate}%
              </div>
              <p className="text-sm text-gray-600 mb-4">Completion Rate</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${stats.completion_rate}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Status Chart */}
          <div className="lg:col-span-2 card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills Overview</h2>
            <StatusPieChart data={stats.status_breakdown} />
          </div>
        </div>
      )}

      {/* Recent Activity and Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <Link 
              to="/analytics" 
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              View all
            </Link>
          </div>
          
          {recentActivities.length === 0 ? (
            <div className="text-center py-6">
              <div className="p-3 bg-gray-100 rounded-full w-12 h-12 mx-auto mb-4">
                <Calendar className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">No recent activity</p>
              <Link to="/analytics" className="text-primary-600 hover:text-primary-700 font-medium">
                Log your first activity
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivities.map((activity) => {
                const skill = skills.find(s => s.id === activity.skill);
                return (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{skill?.name || 'Unknown Skill'}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(activity.date).toLocaleDateString()} • {activity.hours_spent}h
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Skills */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Skills</h2>
            {skills.length > 0 && (
              <Link 
                to="/skills" 
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                View all
              </Link>
            )}
          </div>
          
          {recentSkills.length === 0 ? (
            <div className="text-center py-6">
              <div className="p-3 bg-gray-100 rounded-full w-12 h-12 mx-auto mb-4">
                <Book className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">No skills yet</p>
              <Link to="/add-skill" className="btn-primary">
                Add your first skill
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSkills.slice(0, 4).map((skill) => (
                <div key={skill.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{skill.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      skill.status === 'completed' ? 'bg-green-100 text-green-800' :
                      skill.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {skill.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${skill.progress_percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;