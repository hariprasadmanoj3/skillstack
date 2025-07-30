from rest_framework import serializers
from .models import Skill, LearningActivity

class LearningActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningActivity
        fields = ['id', 'skill', 'date', 'hours_spent', 'notes', 'created_at', 'updated_at']

class SkillSerializer(serializers.ModelSerializer):
    activities = LearningActivitySerializer(many=True, read_only=True)
    progress_percentage = serializers.ReadOnlyField()
    
    class Meta:
        model = Skill
        fields = [
            'id', 'name', 'description', 'resource_type', 'platform', 
            'resource_url', 'difficulty', 'estimated_hours', 'hours_spent', 
            'status', 'notes', 'tags', 'progress_percentage', 'activities',
            'created_at', 'updated_at'
        ]

class SkillListSerializer(serializers.ModelSerializer):
    progress_percentage = serializers.ReadOnlyField()
    
    class Meta:
        model = Skill
        fields = [
            'id', 'name', 'resource_type', 'platform', 'difficulty', 
            'hours_spent', 'status', 'progress_percentage', 'created_at'
        ]