// Auto-categorization based on skill name and description
export const autoCategorizeskill = (skillName, description = '', tags = '') => {
  const text = `${skillName} ${description} ${tags}`.toLowerCase();
  
  const categories = {
    'Frontend Development': [
      'react', 'vue', 'angular', 'javascript', 'html', 'css', 'scss', 'sass',
      'typescript', 'bootstrap', 'tailwind', 'frontend', 'ui', 'ux', 'design',
      'web design', 'responsive', 'jquery', 'dom', 'browser', 'webpack', 'vite'
    ],
    'Backend Development': [
      'node', 'express', 'django', 'flask', 'spring', 'laravel', 'php',
      'python', 'java', 'backend', 'api', 'rest', 'graphql', 'server',
      'microservices', 'fastapi', 'rails', 'ruby', 'go', 'rust'
    ],
    'Database & Storage': [
      'mysql', 'postgresql', 'mongodb', 'redis', 'database', 'sql', 'nosql',
      'sqlite', 'oracle', 'cassandra', 'elasticsearch', 'firebase', 'supabase'
    ],
    'Mobile Development': [
      'react native', 'flutter', 'ios', 'android', 'mobile', 'app development',
      'swift', 'kotlin', 'xamarin', 'ionic', 'cordova', 'native'
    ],
    'DevOps & Cloud': [
      'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'jenkins', 'gitlab',
      'devops', 'ci/cd', 'terraform', 'ansible', 'cloud', 'deployment',
      'nginx', 'apache', 'linux', 'unix'
    ],
    'Data Science & Analytics': [
      'python', 'pandas', 'numpy', 'matplotlib', 'scikit', 'tensorflow',
      'pytorch', 'machine learning', 'data science', 'analytics', 'jupyter',
      'statistics', 'data analysis', 'visualization', 'tableau', 'power bi'
    ],
    'Programming Languages': [
      'javascript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'php',
      'ruby', 'swift', 'kotlin', 'scala', 'clojure', 'haskell', 'programming'
    ],
    'Testing & Quality': [
      'testing', 'jest', 'cypress', 'selenium', 'junit', 'pytest',
      'test automation', 'tdd', 'bdd', 'quality assurance', 'qa'
    ],
    'Design & Creative': [
      'figma', 'sketch', 'photoshop', 'illustrator', 'design', 'ui/ux',
      'graphic design', 'web design', 'prototyping', 'wireframe', 'adobe'
    ],
    'Business & Management': [
      'project management', 'agile', 'scrum', 'kanban', 'leadership',
      'business', 'marketing', 'sales', 'strategy', 'management'
    ]
  };

  let bestMatch = 'General';
  let maxMatches = 0;

  Object.entries(categories).forEach(([category, keywords]) => {
    const matches = keywords.reduce((count, keyword) => {
      return text.includes(keyword) ? count + 1 : count;
    }, 0);

    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = category;
    }
  });

  return {
    category: bestMatch,
    confidence: maxMatches > 0 ? Math.min(100, (maxMatches / 3) * 100) : 0
  };
};

// Recommend learning resources based on past entries
export const recommendResources = (skills, currentSkill = null) => {
  if (!skills || skills.length === 0) return [];

  // Analyze user's learning patterns
  const platformPreferences = {};
  const resourceTypePreferences = {};
  const completedSkills = skills.filter(skill => skill.status === 'completed');
  const categories = {};

  skills.forEach(skill => {
    // Platform preferences
    platformPreferences[skill.platform] = (platformPreferences[skill.platform] || 0) + 1;
    
    // Resource type preferences
    resourceTypePreferences[skill.resource_type] = (resourceTypePreferences[skill.resource_type] || 0) + 1;
    
    // Category analysis
    const categoryInfo = autoCategorizeskill(skill.name, skill.description, skill.tags);
    categories[categoryInfo.category] = (categories[categoryInfo.category] || 0) + 1;
  });

  // Get user's preferred platform and resource type
  const preferredPlatform = Object.keys(platformPreferences).reduce((a, b) => 
    platformPreferences[a] > platformPreferences[b] ? a : b, 'udemy'
  );
  
  const preferredResourceType = Object.keys(resourceTypePreferences).reduce((a, b) => 
    resourceTypePreferences[a] > resourceTypePreferences[b] ? a : b, 'course'
  );

  // Get user's most active category
  const topCategory = Object.keys(categories).reduce((a, b) => 
    categories[a] > categories[b] ? a : b, 'General'
  );

  // Generate recommendations based on patterns
  const recommendations = [];

  // If editing/viewing a specific skill, recommend related skills
  if (currentSkill) {
    const currentCategory = autoCategorizeskill(currentSkill.name, currentSkill.description, currentSkill.tags);
    recommendations.push(...getRelatedSkillSuggestions(currentCategory.category, preferredPlatform, preferredResourceType));
  }

  // Recommend next level skills based on completed ones
  if (completedSkills.length > 0) {
    recommendations.push(...getAdvancedSkillSuggestions(completedSkills, topCategory, preferredPlatform, preferredResourceType));
  }

  // Recommend complementary skills
  recommendations.push(...getComplementarySkills(topCategory, preferredPlatform, preferredResourceType));

  // Remove duplicates and limit to top 6
  const uniqueRecommendations = recommendations.filter((rec, index, self) => 
    index === self.findIndex(r => r.name === rec.name)
  ).slice(0, 6);

  return uniqueRecommendations;
};

// Get related skill suggestions
const getRelatedSkillSuggestions = (category, platform, resourceType) => {
  const relatedSkills = {
    'Frontend Development': [
      { name: 'Advanced React Patterns', description: 'Learn advanced React patterns and hooks' },
      { name: 'TypeScript Fundamentals', description: 'Add type safety to your JavaScript' },
      { name: 'Modern CSS Grid & Flexbox', description: 'Master modern CSS layout techniques' },
      { name: 'JavaScript ES6+ Features', description: 'Learn latest JavaScript features' },
      { name: 'Web Performance Optimization', description: 'Optimize web application performance' }
    ],
    'Backend Development': [
      { name: 'RESTful API Design', description: 'Build scalable REST APIs' },
      { name: 'Database Design Patterns', description: 'Learn efficient database design' },
      { name: 'Authentication & Security', description: 'Implement secure authentication' },
      { name: 'Microservices Architecture', description: 'Build distributed systems' },
      { name: 'Server Deployment & DevOps', description: 'Deploy and manage servers' }
    ],
    'Data Science & Analytics': [
      { name: 'Machine Learning Fundamentals', description: 'Introduction to ML algorithms' },
      { name: 'Data Visualization with Python', description: 'Create compelling data visualizations' },
      { name: 'Statistical Analysis', description: 'Learn statistical methods for data' },
      { name: 'Big Data Processing', description: 'Work with large datasets' },
      { name: 'Deep Learning Basics', description: 'Introduction to neural networks' }
    ],
    'Mobile Development': [
      { name: 'Cross-Platform Development', description: 'Build apps for multiple platforms' },
      { name: 'Mobile UI/UX Design', description: 'Design great mobile interfaces' },
      { name: 'App Store Optimization', description: 'Optimize apps for app stores' },
      { name: 'Mobile Performance', description: 'Optimize mobile app performance' },
      { name: 'Push Notifications', description: 'Implement push notification systems' }
    ]
  };

  return (relatedSkills[category] || relatedSkills['Frontend Development'])
    .map(skill => ({
      ...skill,
      platform,
      resource_type: resourceType,
      reason: `Related to your ${category} skills`
    })).slice(0, 2);
};

// Get advanced skill suggestions based on completed skills
const getAdvancedSkillSuggestions = (completedSkills, topCategory, platform, resourceType) => {
  const suggestions = [];
  
  // If user has completed basic skills, suggest advanced ones
  const hasBasicSkills = completedSkills.some(skill => 
    skill.name.toLowerCase().includes('basic') || 
    skill.name.toLowerCase().includes('fundamentals') ||
    skill.name.toLowerCase().includes('introduction')
  );

  if (hasBasicSkills) {
    suggestions.push({
      name: `Advanced ${topCategory}`,
      description: `Take your ${topCategory} skills to the next level`,
      platform,
      resource_type: resourceType,
      reason: 'Next level progression'
    });
  }

  // Suggest testing if they have development skills
  const hasDevelopmentSkills = completedSkills.some(skill => 
    autoCategorizeskill(skill.name, skill.description).category.includes('Development')
  );

  if (hasDevelopmentSkills && !completedSkills.some(s => s.name.toLowerCase().includes('test'))) {
    suggestions.push({
      name: 'Testing & Quality Assurance',
      description: 'Learn to write tests for your applications',
      platform,
      resource_type: resourceType,
      reason: 'Essential development skill'
    });
  }

  return suggestions.slice(0, 2);
};

// Get complementary skills
const getComplementarySkills = (topCategory, platform, resourceType) => {
  const complementaryMap = {
    'Frontend Development': ['Backend Development', 'Design & Creative'],
    'Backend Development': ['Database & Storage', 'DevOps & Cloud'],
    'Data Science & Analytics': ['Programming Languages', 'Database & Storage'],
    'Mobile Development': ['Design & Creative', 'Backend Development'],
    'DevOps & Cloud': ['Backend Development', 'Database & Storage'],
    'Design & Creative': ['Frontend Development', 'Business & Management']
  };

  const complementaryCategories = complementaryMap[topCategory] || ['Programming Languages'];
  
  return complementaryCategories.map(category => ({
    name: `${category} Fundamentals`,
    description: `Complement your ${topCategory} skills with ${category}`,
    platform,
    resource_type: resourceType,
    reason: `Complements ${topCategory}`
  }));
};

// Get skill learning path suggestions
export const getSkillPath = (skillName, description = '') => {
  const category = autoCategorizeskill(skillName, description);
  
  const learningPaths = {
    'Frontend Development': [
      'HTML & CSS Basics',
      'JavaScript Fundamentals',
      'React.js',
      'Advanced React',
      'Testing & Deployment'
    ],
    'Backend Development': [
      'Programming Language Basics',
      'Database Fundamentals',
      'API Development',
      'Authentication & Security',
      'Deployment & DevOps'
    ],
    'Data Science & Analytics': [
      'Python/R Basics',
      'Statistics & Math',
      'Data Manipulation',
      'Data Visualization',
      'Machine Learning'
    ]
  };

  return learningPaths[category.category] || [
    'Fundamentals',
    'Intermediate Concepts',
    'Advanced Topics',
    'Real-world Projects',
    'Best Practices'
  ];
};