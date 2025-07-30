import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Book, Clock, Trophy, TrendingUp } from 'lucide-react';
import { useSkillStats, useSkills } from '../hooks/useSkills';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SkillCard from '../components/SkillCard';

const Dashboard = () => {
  const { stats, loading: statsLoading, error: statsError } = useSkillStats();
  const { skills, loading: skillsLoading, error: skillsError } = useSkills({ 
    ordering: '-created_at',
    limit: 6 
  });

  const recentSkills = skills.slice(0, 6);

  if (statsLoading || skillsLoading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  if (statsError || skillsError) {
    return <ErrorMessage message={statsError || skillsError} />;
  }

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
              <h3 className="text-sm font-medium text-gray-500">Total Hours</h3>
              <p className="text-2xl font-bold text-gray-900">{stats?.total_hours || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Rate */}
      {stats && stats.total_skills > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Completion Rate</span>
            <span className="text-sm font-medium text-gray-900">{stats.completion_rate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${stats.completion_rate}%` }}
            ></div>
          </div>
        </div>
      )}

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
          <div className="text-center py-8">
            <div className="p-3 bg-gray-100 rounded-full w-12 h-12 mx-auto mb-4">
              <Book className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No skills yet</p>
            <Link to="/add-skill" className="btn-primary">
              Add your first skill
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onEdit={() => {}} // TODO: Implement edit
                onDelete={() => {}} // TODO: Implement delete
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;