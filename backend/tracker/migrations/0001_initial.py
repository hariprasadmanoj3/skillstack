# Generated by Django 5.2.4 on 2025-07-30 14:07

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('resource_type', models.CharField(choices=[('video', 'Video'), ('course', 'Course'), ('article', 'Article'), ('book', 'Book'), ('tutorial', 'Tutorial'), ('certification', 'Certification')], max_length=20)),
                ('platform', models.CharField(choices=[('udemy', 'Udemy'), ('youtube', 'YouTube'), ('coursera', 'Coursera'), ('edx', 'edX'), ('linkedin', 'LinkedIn Learning'), ('pluralsight', 'Pluralsight'), ('codecademy', 'Codecademy'), ('freecodecamp', 'FreeCodeCamp'), ('other', 'Other')], max_length=20)),
                ('resource_url', models.URLField(blank=True)),
                ('difficulty', models.IntegerField(choices=[(1, 'Beginner'), (2, 'Intermediate'), (3, 'Advanced'), (4, 'Expert')], default=1)),
                ('estimated_hours', models.PositiveIntegerField(default=0)),
                ('hours_spent', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
                ('status', models.CharField(choices=[('not_started', 'Not Started'), ('in_progress', 'In Progress'), ('completed', 'Completed'), ('paused', 'Paused')], default='not_started', max_length=20)),
                ('notes', models.TextField(blank=True)),
                ('tags', models.CharField(blank=True, help_text='Comma-separated tags', max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='LearningActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('hours_spent', models.DecimalField(decimal_places=2, max_digits=4, validators=[django.core.validators.MinValueValidator(0.1)])),
                ('notes', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('skill', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='activities', to='tracker.skill')),
            ],
            options={
                'verbose_name_plural': 'Learning Activities',
                'ordering': ['-date'],
            },
        ),
    ]
