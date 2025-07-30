import React, { useState, useEffect } from 'react';
import { Zap, Check, X } from 'lucide-react';
import { autoCategorizeskill } from '../utils/aiHelpers';

const AutoCategorization = ({ skillName, description, tags, onAcceptSuggestion }) => {
  const [suggestion, setSuggestion] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    if (skillName && skillName.length > 2) {
      const categoryInfo = autoCategorizeskill(skillName, description, tags);
      if (categoryInfo.confidence > 30) {
        setSuggestion(categoryInfo);
        setShowSuggestion(true);
      } else {
        setShowSuggestion(false);
      }
    } else {
      setShowSuggestion(false);
    }
  }, [skillName, description, tags]);

  const handleAccept = () => {
    onAcceptSuggestion(suggestion.category);
    setShowSuggestion(false);
  };

  const handleDismiss = () => {
    setShowSuggestion(false);
  };

  if (!showSuggestion || !suggestion) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-4">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Zap className="w-4 h-4 text-purple-600" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="text-sm font-medium text-gray-900">AI Suggestion</h4>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              {Math.round(suggestion.confidence)}% confident
            </span>
          </div>
          
          <p className="text-sm text-gray-700 mb-3">
            This skill appears to be related to <strong>{suggestion.category}</strong>. 
            Would you like to add this as a tag?
          </p>
          
          <div className="flex space-x-2">
            <button
              onClick={handleAccept}
              className="flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Check className="w-3 h-3 mr-1" />
              Add Tag
            </button>
            <button
              onClick={handleDismiss}
              className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X className="w-3 h-3 mr-1" />
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoCategorization;