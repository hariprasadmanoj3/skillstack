import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';

const Skills = () => {
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search skills..."
                className="pl-10 form-input"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="form-input">
              <option value="">All Statuses</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
            <select className="form-input">
              <option value="">All Platforms</option>
              <option value="udemy">Udemy</option>
              <option value="youtube">YouTube</option>
              <option value="coursera">Coursera</option>
            </select>
          </div>
        </div>
      </div>

      {/* Skills List */}
      <div className="card">
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No skills found</p>
          <Link to="/add-skill" className="btn-primary">
            Add your first skill
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Skills;