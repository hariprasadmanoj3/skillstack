import { useState, useEffect } from 'react';
import { skillsAPI } from '../services/api';

export const useSkills = (params = {}) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await skillsAPI.getAll(params);
      setSkills(response.data.results || response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch skills');
      console.error('Error fetching skills:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [JSON.stringify(params)]);

  const createSkill = async (skillData) => {
    try {
      const response = await skillsAPI.create(skillData);
      setSkills(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateSkill = async (id, skillData) => {
    try {
      const response = await skillsAPI.update(id, skillData);
      setSkills(prev => prev.map(skill => 
        skill.id === id ? response.data : skill
      ));
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteSkill = async (id) => {
    try {
      await skillsAPI.delete(id);
      setSkills(prev => prev.filter(skill => skill.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    skills,
    loading,
    error,
    refetch: fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill
  };
};

export const useSkillStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await skillsAPI.getStats();
        setStats(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch stats');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};