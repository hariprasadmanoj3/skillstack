from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Sum

class Skill(models.Model):
    RESOURCE_TYPE_CHOICES = [
        ('video', 'Video'),
        ('course', 'Course'),
        ('article', 'Article'),
        ('book', 'Book'),
        ('tutorial', 'Tutorial'),
        ('certification', 'Certification'),
    ]
    
    PLATFORM_CHOICES = [
        ('udemy', 'Udemy'),
        ('youtube', 'YouTube'),
        ('coursera', 'Coursera'),
        ('edx', 'edX'),
        ('linkedin', 'LinkedIn Learning'),
        ('pluralsight', 'Pluralsight'),
        ('codecademy', 'Codecademy'),
        ('freecodecamp', 'FreeCodeCamp'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('paused', 'Paused'),
    ]
    
    DIFFICULTY_CHOICES = [
        (1, 'Beginner'),
        (2, 'Intermediate'),
        (3, 'Advanced'),
        (4, 'Expert'),
    ]
    
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPE_CHOICES)
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    resource_url = models.URLField(blank=True)
    difficulty = models.IntegerField(choices=DIFFICULTY_CHOICES, default=1)
    estimated_hours = models.PositiveIntegerField(default=0)
    hours_spent = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')
    notes = models.TextField(blank=True)
    tags = models.CharField(max_length=255, blank=True, help_text="Comma-separated tags")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
    
    def update_hours_and_status(self):
        """Update hours spent and status based on activities"""
        total_hours = self.activities.aggregate(
            total=Sum('hours_spent')
        )['total'] or 0
        
        self.hours_spent = total_hours
        
        # Auto-update status based on progress
        if total_hours == 0:
            self.status = 'not_started'
        elif self.estimated_hours > 0 and total_hours >= self.estimated_hours:
            self.status = 'completed'
        elif total_hours > 0:
            if self.status == 'not_started':
                self.status = 'in_progress'
        
        self.save(update_fields=['hours_spent', 'status', 'updated_at'])
    
    @property
    def progress_percentage(self):
        if self.estimated_hours > 0:
            return min(100, (float(self.hours_spent) / self.estimated_hours) * 100)
        else:
            # If no estimated hours, base on status
            if self.status == 'completed':
                return 100
            elif self.status == 'in_progress':
                return 50
            else:
                return 0

class LearningActivity(models.Model):
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='activities')
    date = models.DateField()
    hours_spent = models.DecimalField(max_digits=4, decimal_places=2, validators=[MinValueValidator(0.1)])
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-date']
        verbose_name_plural = 'Learning Activities'
    
    def __str__(self):
        return f"{self.skill.name} - {self.date} ({self.hours_spent}h)"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Update the skill's hours and status after saving activity
        self.skill.update_hours_and_status()
    
    def delete(self, *args, **kwargs):
        skill = self.skill
        super().delete(*args, **kwargs)
        # Update the skill's hours and status after deleting activity
        skill.update_hours_and_status()