import React from 'react';
import { Lightbulb, TrendingUp, Target, Plus } from 'lucide-react';
import { recommendResources } from '../utils/aiHelpers';

const SkillRecommendations = ({ skills, currentSkill = null, onAddRecommendation }) => {
  const recommendations = recommendResources(skills, currentSkill);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-purple-100 rounded-lg mr-3">
          <Lightbulb className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
          <p className="text-sm text-gray-600">Based on your learning patterns</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-gray-900 text-sm">{recommendation.name}</h3>
              <button
                onClick={() => onAddRecommendation(recommendation)}
                className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                title="Add this skill"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-xs text-gray-600 mb-2">{recommendation.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>{recommendation.platform}</span>
              </div>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {recommendation.reason}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillRecommendations;