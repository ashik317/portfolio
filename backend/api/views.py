from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from .models import (
    Profile, 
    SkillGroup, 
    Experience, 
    Project, 
    Education, 
    Achievement,
    BlogPost, 
    ContactMessage,
)
from .serializers import (
    ProfileSerializer, 
    SkillGroupSerializer, 
    ExperienceSerializer,
    ProjectListSerializer, 
    ProjectDetailSerializer, 
    EducationSerializer,
    AchievementSerializer, 
    BlogPostListSerializer, 
    BlogPostDetailSerializer,
    ContactMessageSerializer,
)


class ProfileView(generics.RetrieveAPIView):
    """Returns the single portfolio owner profile (first row)."""
    serializer_class = ProfileSerializer

    def get_object(self):
        return Profile.objects.first()


class SkillGroupListView(generics.ListAPIView):
    queryset = SkillGroup.objects.all()
    serializer_class = SkillGroupSerializer


class ExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class EducationListView(generics.ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class AchievementListView(generics.ListAPIView):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectListSerializer


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(is_published=True)
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BlogPostDetailSerializer
        return BlogPostListSerializer


class ContactMessageCreateView(generics.CreateAPIView):
    """Handles the contact form: POST /api/contact/"""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
