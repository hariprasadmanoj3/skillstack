import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { RESOURCE_TYPES, PLATFORMS, DIFFICULTY_LEVELS, STATUS_OPTIONS } from '../utils/constants';

const SkillEditModal = ({ skill, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    resource_type: '',
    platform: '',
    resource_url: '',
    difficulty: 1,
    estimated_hours: '',
    status: 'not_started',
    tags: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || '',
        description: skill.description || '',
        resource_type: skill.resource_type || '',
        platform: skill.platform || '',
        resource_url: skill.resource_url || '',
        difficulty: skill.difficulty || 1,
        estimated_hours: skill.estimated_hours || '',
        status: skill.status || 'not_started',
        tags: skill.tags || '',
        notes: skill.notes || ''
      });
    }
  }, [skill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const skillData = {
        ...formData,
        estimated_hours: formData.estimated_hours ? parseInt(formData.estimated_hours) : 0,
        difficulty: parseInt(formData.difficulty),
      };

      await onSave(skill.id, skillData);
      onClose();
    } catch (err) {
      console.error('Error updating skill:', err);
      alert('Failed to update skill. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Skill</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="form-label">
              Skill Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="resource_type" className="form-label">
                Resource Type *
              </label>
              <select
                id="resource_type"
                name="resource_type"
                value={formData.resource_type}
                onChange={handleChange}
                required
                className="form-input"
                disabled={loading}
              >
                <option value="">Select resource type</option>
                {RESOURCE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="platform" className="form-label">
                Platform *
              </label>
              <select
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                required
                className="form-input"
                disabled={loading}
              >
                <option value="">Select platform</option>
                {PLATFORMS.map((platform) => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="resource_url" className="form-label">
              Resource URL
            </label>
            <input
              type="url"
              id="resource_url"
              name="resource_url"
              value={formData.resource_url}
              onChange={handleChange}
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="difficulty" className="form-label">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              >
                {DIFFICULTY_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="estimated_hours" className="form-label">
                Estimated Hours
              </label>
              <input
                type="number"
                id="estimated_hours"
                name="estimated_hours"
                value={formData.estimated_hours}
                onChange={handleChange}
                min="0"
                step="1"
                className="form-input"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="form-label">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="form-input"
              placeholder="javascript, frontend, react (comma-separated)"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="notes" className="form-label">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="form-input"
              placeholder="Personal notes about this skill..."
              disabled={loading}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Skill
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillEditModal;