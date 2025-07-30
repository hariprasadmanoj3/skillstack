import React from 'react';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { useActivities } from '../hooks/useActivities';
import { useSkills } from '../hooks/useSkills';
import LoadingSpinner from './LoadingSpinner';

const Timeline = () => {
  const { activities, loading } = useActivities();
  const { skills } = useSkills();

  if (loading) return <LoadingSpinner text="Loading timeline..." />;

  // Group activities by date
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = activity.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {});

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedActivities).sort((a, b) => new Date(b) - new Date(a));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="card">
      <div className="flex items-center mb-6">
        <Calendar className="w-5 h-5 text-primary-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Learning Timeline</h2>
      </div>

      {sortedDates.length === 0 ? (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No learning activities yet</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {sortedDates.map((date, dateIndex) => {
            const dayActivities = groupedActivities[date];
            const totalHours = dayActivities.reduce((sum, activity) => sum + parseFloat(activity.hours_spent), 0);
            
            return (
              <div key={date} className="relative mb-8">
                {/* Date marker */}
                <div className="absolute left-2 w-4 h-4 bg-primary-600 rounded-full border-2 border-white shadow"></div>
                
                {/* Date content */}
                <div className="ml-12">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {formatDate(date)}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{totalHours.toFixed(1)}h total</span>
                    </div>
                  </div>
                  
                  {/* Activities for this date */}
                  <div className="space-y-3">
                    {dayActivities.map((activity, activityIndex) => {
                      const skill = skills.find(s => s.id === activity.skill);
                      return (
                        <div key={activity.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">
                                {skill?.name || 'Unknown Skill'}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2">
                                {activity.notes || 'No notes provided'}
                              </p>
                              {skill && (
                                <div className="flex items-center text-xs text-gray-500">
                                  <span className="bg-gray-200 px-2 py-1 rounded mr-2">
                                    {skill.platform}
                                  </span>
                                  <span>{skill.resource_type}</span>
                                </div>
                              )}
                            </div>
                            <div className="text-sm font-medium text-primary-600 ml-4">
                              {activity.hours_spent}h
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Timeline;