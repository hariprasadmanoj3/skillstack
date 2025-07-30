import React from 'react';
import { BarChart3, TrendingUp, Clock, Target, Brain } from 'lucide-react';
import { useSkillStats } from '../hooks/useSkills';
import { useActivities } from '../hooks/useActivities';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { StatusPieChart, PlatformBarChart, ResourceTypeChart } from '../components/charts/StatsChart';
import ActivityLog from '../components/ActivityLog';

const Analytics = () => {
  const { stats, loading: statsLoading, error: statsError } = useSkillStats();
  const { activities, loading: activitiesLoading } = useActivities();

  if (statsLoading || activitiesLoading) {
    return <LoadingSpinner text="Loading analytics..." />;
  }

  if (statsError) {
    return <ErrorMessage message={statsError} />;
  }

  // Calculate recent activity stats
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);
  
  const recentActivities = activities.filter(activity => 
    new Date(activity.date) >= last7Days
  );
  
  const weeklyHours = recentActivities.reduce((sum, activity) => 
    sum + parseFloat(activity.hours_spent), 0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Insights into your learning progress with AI analysis</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
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
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
              <p className="text-2xl font-bold text-gray-900">{stats?.completion_rate || 0}%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Hours</h3>
              <p className="text-2xl font-bold text-gray-900">{stats?.total_hours || 0}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">This Week</h3>
              <p className="text-2xl font-bold text-gray-900">{weeklyHours.toFixed(1)}h</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Learning Insights */}
      {stats && stats.total_skills > 0 && (
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">AI Learning Insights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-medium text-blue-900 mb-1">Learning Focus</h3>
              <p className="text-lg font-bold text-blue-600 mb-2">
                {stats.most_used_resource_type || 'Diverse'}
              </p>
              <p className="text-xs text-blue-700">Primary learning format</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200">
              <h3 className="text-sm font-medium text-green-900 mb-1">Preferred Platform</h3>
              <p className="text-lg font-bold text-green-600 mb-2">
                {stats.most_used_platform || 'Mixed'}
              </p>
              <p className="text-xs text-green-700">Most used learning source</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <h3 className="text-sm font-medium text-purple-900 mb-1">Learning Streak</h3>
              <p className="text-lg font-bold text-purple-600 mb-2">
                {recentActivities.length} days
              </p>
              <p className="text-xs text-purple-700">Active days this week</p>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      {stats && (stats.total_skills > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Distribution */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills by Status</h2>
            <StatusPieChart data={stats.status_breakdown} />
          </div>

          {/* Platform Distribution */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills by Platform</h2>
            <PlatformBarChart data={stats.platform_breakdown} />
          </div>

          {/* Resource Type Distribution (Category-wise) */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h2>
            <ResourceTypeChart data={stats.resource_type_breakdown} />
          </div>
        </div>
      )}

      {/* Learning Insights */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-1">Average per Skill</h3>
            <p className="text-2xl font-bold text-blue-600">
              {stats?.avg_hours_per_skill || 0}h
            </p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="text-sm font-medium text-green-900 mb-1">Daily Average</h3>
            <p className="text-2xl font-bold text-green-600">
              {(weeklyHours / 7).toFixed(1)}h
            </p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <h3 className="text-sm font-medium text-purple-900 mb-1">Most Used Platform</h3>
            <p className="text-lg font-bold text-purple-600">
              {stats?.most_used_platform || 'N/A'}
            </p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <h3 className="text-sm font-medium text-orange-900 mb-1">Top Category</h3>
            <p className="text-lg font-bold text-orange-600">
              {stats?.most_used_resource_type || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <ActivityLog />

      {/* Empty State */}
      {(!stats || stats.total_skills === 0) && (
        <div className="card text-center py-12">
          <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Yet</h3>
          <p className="text-gray-600 mb-6">Start tracking skills to see analytics and AI insights</p>
          <a href="/add-skill" className="btn-primary">
            Add Your First Skill
          </a>
        </div>
      )}
    </div>
  );
};

export default Analytics;