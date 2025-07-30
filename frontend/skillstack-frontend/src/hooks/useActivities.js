import { useState, useEffect } from 'react';
import { activitiesAPI } from '../services/api';

export const useActivities = (params = {}) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await activitiesAPI.getAll(params);
      setActivities(response.data.results || response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch activities');
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [JSON.stringify(params)]);

  const createActivity = async (activityData) => {
    try {
      const response = await activitiesAPI.create(activityData);
      setActivities(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateActivity = async (id, activityData) => {
    try {
      const response = await activitiesAPI.update(id, activityData);
      setActivities(prev => prev.map(activity => 
        activity.id === id ? response.data : activity
      ));
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteActivity = async (id) => {
    try {
      await activitiesAPI.delete(id);
      setActivities(prev => prev.filter(activity => activity.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    activities,
    loading,
    error,
    refetch: fetchActivities,
    createActivity,
    updateActivity,
    deleteActivity
  };
};