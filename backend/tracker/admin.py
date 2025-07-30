from django.contrib import admin
from .models import Skill, LearningActivity

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'platform', 'resource_type', 'status', 'hours_spent', 'created_at']
    list_filter = ['platform', 'resource_type', 'status', 'difficulty']
    search_fields = ['name', 'description', 'tags']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(LearningActivity)
class LearningActivityAdmin(admin.ModelAdmin):
    list_display = ['skill', 'date', 'hours_spent', 'created_at']
    list_filter = ['date', 'skill__platform']
    search_fields = ['skill__name', 'notes']