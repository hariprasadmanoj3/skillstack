import React from 'react';
import { Edit, Trash2, ExternalLink, Clock, Calendar, FileText } from 'lucide-react';
import { STATUS_OPTIONS, DIFFICULTY_LEVELS, PLATFORMS, RESOURCE_TYPES } from '../utils/constants';

const SkillCard = ({ skill, onEdit, onDelete }) => {
  const statusOption = STATUS_OPTIONS.find(s => s.value === skill.status);
  const difficultyLevel = DIFFICULTY_LEVELS.find(d => d.value === skill.difficulty);
  const platform = PLATFORMS.find(p => p.value === skill.platform);
  const resourceType = RESOURCE_TYPES.find(r => r.value === skill.resource_type);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {skill.name}
          </h3>
          {skill.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {skill.description}
            </p>
          )}
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2">
              {resourceType?.label}
            </span>
            <span>{platform?.label}</span>
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(skill)}
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="Edit skill"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(skill)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete skill"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status and Difficulty */}
      <div className="flex items-center space-x-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusOption?.color}`}>
          {statusOption?.label}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyLevel?.color}`}>
          {difficultyLevel?.label}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(skill.progress_percentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${skill.progress_percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Hours and Activities Count */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>{skill.hours_spent}h spent</span>
          {skill.estimated_hours > 0 && (
            <span className="text-gray-400 ml-1">/ {skill.estimated_hours}h goal</span>
          )}
        </div>
        <div className="flex items-center">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {skill.activities?.length || 0} sessions
          </span>
        </div>
      </div>

      {/* Notes Preview */}
      {skill.notes && (
        <div className="mb-3 p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <FileText className="w-3 h-3 mr-1" />
            <span>Notes</span>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2">{skill.notes}</p>
        </div>
      )}

      {/* Tags */}
      {skill.tags && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {skill.tags.split(',').map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          <span>Added {formatDate(skill.created_at)}</span>
        </div>
        {skill.resource_url && (
          <a
            href={skill.resource_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            View
          </a>
        )}
      </div>
    </div>
  );
};

export default SkillCard;