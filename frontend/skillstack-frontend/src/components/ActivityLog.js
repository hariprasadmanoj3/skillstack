import React, { useState } from 'react';
import { Plus, Clock, Calendar, Edit, Trash2 } from 'lucide-react';
import { useActivities } from '../hooks/useActivities';
import { useSkills } from '../hooks/useSkills';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ActivityLog = ({ skillId = null }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const { activities, loading, error, createActivity, updateActivity, deleteActivity } = useActivities(
    skillId ? { skill: skillId } : {}
  );
  const { skills } = useSkills();

  const [formData, setFormData] = useState({
    skill: skillId || '',
    date: new Date().toISOString().split('T')[0],
    hours_spent: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const activityData = {
        ...formData,
        hours_spent: parseFloat(formData.hours_spent),
        skill: parseInt(formData.skill)
      };

      if (editingActivity) {
        await updateActivity(editingActivity.id, activityData);
        setEditingActivity(null);
      } else {
        await createActivity(activityData);
      }

      setFormData({
        skill: skillId || '',
        date: new Date().toISOString().split('T')[0],
        hours_spent: '',
        notes: ''
      });
      setShowForm(false);
    } catch (err) {
      alert('Failed to save activity. Please try again.');
    }
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setFormData({
      skill: activity.skill,
      date: activity.date,
      hours_spent: activity.hours_spent.toString(),
      notes: activity.notes
    });
    setShowForm(true);
  };

  const handleDelete = async (activity) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await deleteActivity(activity.id);
      } catch (err) {
        alert('Failed to delete activity. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return <LoadingSpinner text="Loading activities..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Learning Activities</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Log Activity
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingActivity ? 'Edit Activity' : 'Log New Activity'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!skillId && (
              <div>
                <label className="form-label">Skill *</label>
                <select
                  value={formData.skill}
                  onChange={(e) => setFormData(prev => ({ ...prev, skill: e.target.value }))}
                  required
                  className="form-input"
                >
                  <option value="">Select a skill</option>
                  {skills.map(skill => (
                    <option key={skill.id} value={skill.id}>{skill.name}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Hours Spent *</label>
                <input
                  type="number"
                  value={formData.hours_spent}
                  onChange={(e) => setFormData(prev => ({ ...prev, hours_spent: e.target.value }))}
                  required
                  min="0.1"
                  step="0.1"
                  className="form-input"
                  placeholder="1.5"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="form-input"
                placeholder="What did you learn or work on?"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingActivity(null);
                  setFormData({
                    skill: skillId || '',
                    date: new Date().toISOString().split('T')[0],
                    hours_spent: '',
                    notes: ''
                  });
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingActivity ? 'Update' : 'Log'} Activity
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Activities List */}
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="card text-center py-8">
            <div className="p-3 bg-gray-100 rounded-full w-12 h-12 mx-auto mb-4">
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No activities logged yet</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Log your first activity
            </button>
          </div>
        ) : (
          activities.map((activity) => {
            const skill = skills.find(s => s.id === activity.skill);
            return (
              <div key={activity.id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">
                        {skill?.name || 'Unknown Skill'}
                      </h3>
                      <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                        {activity.hours_spent}h
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(activity.date)}
                    </div>
                    {activity.notes && (
                      <p className="text-gray-700 text-sm">{activity.notes}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(activity)}
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(activity)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActivityLog;