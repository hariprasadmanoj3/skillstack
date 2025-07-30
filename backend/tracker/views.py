from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Count, Q, Avg
from .models import Skill, LearningActivity
from .serializers import SkillSerializer, SkillListSerializer, LearningActivitySerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return SkillListSerializer
        return SkillSerializer
    
    def get_queryset(self):
        queryset = Skill.objects.all()
        
        # Filter by status
        status_param = self.request.query_params.get('status', None)
        if status_param:
            queryset = queryset.filter(status=status_param)
        
        # Filter by platform
        platform = self.request.query_params.get('platform', None)
        if platform:
            queryset = queryset.filter(platform=platform)
        
        # Filter by resource type
        resource_type = self.request.query_params.get('resource_type', None)
        if resource_type:
            queryset = queryset.filter(resource_type=resource_type)
        
        # Search
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(description__icontains=search) |
                Q(tags__icontains=search)
            )
        
        return queryset
    
    def perform_update(self, serializer):
        skill = serializer.save()
        # Update hours and status after manual update
        skill.update_hours_and_status()
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        skills = Skill.objects.all()
        
        total_skills = skills.count()
        completed_skills = skills.filter(status='completed').count()
        in_progress_skills = skills.filter(status='in_progress').count()
        not_started_skills = skills.filter(status='not_started').count()
        paused_skills = skills.filter(status='paused').count()
        total_hours = skills.aggregate(total=Sum('hours_spent'))['total'] or 0
        
        # Platform breakdown
        platform_stats = {}
        for platform_choice in Skill.PLATFORM_CHOICES:
            platform_code = platform_choice[0]
            platform_name = platform_choice[1]
            count = skills.filter(platform=platform_code).count()
            if count > 0:
                platform_stats[platform_name] = count
        
        # Resource type breakdown (category-wise)
        resource_type_stats = {}
        for resource_choice in Skill.RESOURCE_TYPE_CHOICES:
            resource_code = resource_choice[0]
            resource_name = resource_choice[1]
            count = skills.filter(resource_type=resource_code).count()
            if count > 0:
                resource_type_stats[resource_name] = count
        
        # Status breakdown
        status_stats = {
            'Not Started': not_started_skills,
            'In Progress': in_progress_skills,
            'Completed': completed_skills,
            'Paused': paused_skills,
        }
        # Remove zero values
        status_stats = {k: v for k, v in status_stats.items() if v > 0}
        
        # Additional insights
        avg_hours_per_skill = skills.aggregate(avg=Avg('hours_spent'))['avg'] or 0
        most_used_platform = max(platform_stats.items(), key=lambda x: x[1])[0] if platform_stats else None
        most_used_resource_type = max(resource_type_stats.items(), key=lambda x: x[1])[0] if resource_type_stats else None
        
        return Response({
            'total_skills': total_skills,
            'completed_skills': completed_skills,
            'in_progress_skills': in_progress_skills,
            'not_started_skills': not_started_skills,
            'paused_skills': paused_skills,
            'completion_rate': round((completed_skills / total_skills * 100) if total_skills > 0 else 0, 2),
            'total_hours': float(total_hours),
            'avg_hours_per_skill': round(float(avg_hours_per_skill), 2),
            'platform_breakdown': platform_stats,
            'resource_type_breakdown': resource_type_stats,
            'status_breakdown': status_stats,
            'most_used_platform': most_used_platform,
            'most_used_resource_type': most_used_resource_type,
        })

class LearningActivityViewSet(viewsets.ModelViewSet):
    queryset = LearningActivity.objects.all()
    serializer_class = LearningActivitySerializer
    
    def get_queryset(self):
        queryset = LearningActivity.objects.select_related('skill').all()
        
        # Filter by skill
        skill_id = self.request.query_params.get('skill', None)
        if skill_id:
            queryset = queryset.filter(skill_id=skill_id)
        
        return queryset