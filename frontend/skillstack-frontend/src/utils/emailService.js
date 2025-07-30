// Mock email service for weekly learning summary

export const generateWeeklySummary = (skills, activities) => {
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  const weeklyActivities = activities.filter(activity => 
    new Date(activity.date) >= lastWeek
  );

  const totalHours = weeklyActivities.reduce((sum, activity) => 
    sum + parseFloat(activity.hours_spent), 0
  );

  const skillsWorkedOn = [...new Set(weeklyActivities.map(activity => activity.skill))];
  const skillNames = skillsWorkedOn.map(skillId => 
    skills.find(skill => skill.id === skillId)?.name
  ).filter(Boolean);

  return {
    weekStart: lastWeek.toDateString(),
    weekEnd: new Date().toDateString(),
    totalHours: totalHours.toFixed(1),
    activitiesCount: weeklyActivities.length,
    skillsCount: skillsWorkedOn.length,
    skillNames,
    activities: weeklyActivities
  };
};

export const sendWeeklySummaryEmail = (summary) => {
  // Mock email - log to console
  console.log('📧 WEEKLY LEARNING SUMMARY EMAIL');
  console.log('================================');
  console.log(`📅 Week: ${summary.weekStart} - ${summary.weekEnd}`);
  console.log(`⏰ Total Learning Time: ${summary.totalHours} hours`);
  console.log(`📚 Learning Sessions: ${summary.activitiesCount}`);
  console.log(`🎯 Skills Worked On: ${summary.skillsCount}`);
  console.log('');
  console.log('📖 Skills This Week:');
  summary.skillNames.forEach((skill, index) => {
    console.log(`   ${index + 1}. ${skill}`);
  });
  console.log('');
  console.log('🎉 Keep up the great learning momentum!');
  console.log('================================');
  
  return { success: true, message: 'Weekly summary logged to console' };
};