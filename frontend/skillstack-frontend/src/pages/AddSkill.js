import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { RESOURCE_TYPES, PLATFORMS, DIFFICULTY_LEVELS } from '../utils/constants';
import { useSkills } from '../hooks/useSkills';

const AddSkill = () => {
  const navigate = useNavigate();
  const { createSkill } = useSkills();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    resource_type: '',
    platform: '',
    resource_url: '',
    difficulty: 1,
    estimated_hours: '',
    tags: '',
  });

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
      // Clean up the data before sending
      const skillData = {
        ...formData,
        estimated_hours: formData.estimated_hours ? parseInt(formData.estimated_hours) : 0,
        difficulty: parseInt(formData.difficulty),
      };

      await createSkill(skillData);
      navigate('/skills', { 
        state: { message: 'Skill added successfully!' }
      });
    } catch (err) {
      console.error('Error creating skill:', err);
      alert('Failed to create skill. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Skill</h1>
          <p className="text-gray-600 mt-1">Create a new learning goal</p>
        </div>
      </div>

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="e.g., React.js Fundamentals"
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
              placeholder="What will you learn from this resource?"
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
              placeholder="https://..."
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="0"
                disabled={loading}
              />
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

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
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
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Add Skill
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;