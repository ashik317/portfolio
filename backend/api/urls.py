from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('projects', views.ProjectViewSet, basename='project')
router.register('blog', views.BlogPostViewSet, basename='blogpost')

urlpatterns = [
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('skills/', views.SkillGroupListView.as_view(), name='skills'),
    path('experience/', views.ExperienceListView.as_view(), name='experience'),
    path('education/', views.EducationListView.as_view(), name='education'),
    path('achievements/', views.AchievementListView.as_view(), name='achievements'),
    path('contact/', views.ContactMessageCreateView.as_view(), name='contact'),
    path('', include(router.urls)),
]
