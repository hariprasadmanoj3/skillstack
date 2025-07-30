import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = {
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
  purple: '#8b5cf6',
  pink: '#ec4899',
  gray: '#6b7280'
};

export const StatusPieChart = ({ data }) => {
  const chartData = Object.entries(data || {}).map(([key, value]) => ({
    name: key,
    value: value,
    color: getStatusColor(key)
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const PlatformBarChart = ({ data }) => {
  const chartData = Object.entries(data || {}).map(([key, value]) => ({
    platform: key,
    skills: value
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="platform" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="skills" fill={COLORS.primary} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const getStatusColor = (status) => {
  const colorMap = {
    'Completed': COLORS.success,
    'In Progress': COLORS.primary,
    'Not Started': COLORS.gray,
    'Paused': COLORS.warning
  };
  return colorMap[status] || COLORS.gray;
};