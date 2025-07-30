from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet, LearningActivityViewSet

router = DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'activities', LearningActivityViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]