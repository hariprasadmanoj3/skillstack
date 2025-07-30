from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Count, Q
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
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        skills = Skill.objects.all()
        
        total_skills = skills.count()
        completed_skills = skills.filter(status='completed').count()
        in_progress_skills = skills.filter(status='in_progress').count()
        total_hours = skills.aggregate(total=Sum('hours_spent'))['total'] or 0
        
        # Platform breakdown
        platform_stats = {}
        for platform_choice in Skill.PLATFORM_CHOICES:
            platform_code = platform_choice[0]
            platform_name = platform_choice[1]
            count = skills.filter(platform=platform_code).count()
            if count > 0:
                platform_stats[platform_name] = count
        
        # Status breakdown
        status_stats = {}
        for status_choice in Skill.STATUS_CHOICES:
            status_code = status_choice[0]
            status_name = status_choice[1]
            count = skills.filter(status=status_code).count()
            if count > 0:
                status_stats[status_name] = count
        
        return Response({
            'total_skills': total_skills,
            'completed_skills': completed_skills,
            'in_progress_skills': in_progress_skills,
            'completion_rate': round((completed_skills / total_skills * 100) if total_skills > 0 else 0, 2),
            'total_hours': float(total_hours),
            'platform_breakdown': platform_stats,
            'status_breakdown': status_stats,
        })

class LearningActivityViewSet(viewsets.ModelViewSet):
    queryset = LearningActivity.objects.all()
    serializer_class = LearningActivitySerializer
    
    def get_queryset(self):
        queryset = LearningActivity.objects.all()
        
        # Filter by skill
        skill_id = self.request.query_params.get('skill', None)
        if skill_id:
            queryset = queryset.filter(skill_id=skill_id)
        
        return queryset