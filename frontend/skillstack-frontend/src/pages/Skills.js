import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import { useSkills } from '../hooks/useSkills';
import { STATUS_OPTIONS, PLATFORMS, RESOURCE_TYPES } from '../utils/constants';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SkillCard from '../components/SkillCard';

const Skills = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    platform: '',
    resource_type: ''
  });

  const { skills, loading, error, refetch, deleteSkill } = useSkills(filters);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDelete = async (skill) => {
    if (window.confirm(`Are you sure you want to delete "${skill.name}"?`)) {
      try {
        await deleteSkill(skill.id);
      } catch (err) {
        alert('Failed to delete skill. Please try again.');
      }
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      platform: '',
      resource_type: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Skills</h1>
          <p className="text-gray-600 mt-1">Manage your learning resources</p>
        </div>
        <Link to="/add-skill" className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search skills..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10 form-input"
            />
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="form-input"
            >
              <option value="">All Statuses</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            
            <select
              value={filters.platform}
              onChange={(e) => handleFilterChange('platform', e.target.value)}
              className="form-input"
            >
              <option value="">All Platforms</option>
              {PLATFORMS.map((platform) => (
                <option key={platform.value} value={platform.value}>
                  {platform.label}
                </option>
              ))}
            </select>
            
            <select
              value={filters.resource_type}
              onChange={(e) => handleFilterChange('resource_type', e.target.value)}
              className="form-input"
            >
              <option value="">All Types</option>
              {RESOURCE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Skills List */}
      <div className="card">
        {loading ? (
          <LoadingSpinner text="Loading skills..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : skills.length === 0 ? (
          <div className="text-center py-8">
            {hasActiveFilters ? (
              <>
                <div className="p-3 bg-gray-100 rounded-full w-12 h-12 mx-auto mb-4">
                  <Filter className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">No skills match your filters</p>
                <button onClick={clearFilters} className="btn-secondary mr-3">
                  Clear filters
                </button>
                <Link to="/add-skill" className="btn-primary">
                  Add new skill
                </Link>
              </>
            ) : (
              <>
                <div className="p-3 bg-gray-100 rounded-full w-12 h-12 mx-auto mb-4">
                  <Plus className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">No skills found</p>
                <Link to="/add-skill" className="btn-primary">
                  Add your first skill
                </Link>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                {skills.length} skill{skills.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onEdit={() => {}} // TODO: Implement edit
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Skills;