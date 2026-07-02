from rest_framework import serializers
from .models import (
    Profile, SkillGroup, Skill, Experience, ExperienceHighlight,
    Project, ProjectHighlight, Education, Achievement, BlogPost, ContactMessage,
)


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']


class SkillGroupSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillGroup
        fields = ['id', 'name', 'skills']


class ExperienceHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceHighlight
        fields = ['id', 'text']


class ExperienceSerializer(serializers.ModelSerializer):
    highlights = ExperienceHighlightSerializer(many=True, read_only=True)

    class Meta:
        model = Experience
        fields = ['id', 'role', 'company', 'location', 'start_date', 'end_date', 'subtitle', 'highlights']


class ProjectHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectHighlight
        fields = ['id', 'text']


class ProjectListSerializer(serializers.ModelSerializer):
    tech_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'summary', 'tech_list', 'status',
                  'live_url', 'github_url', 'is_featured']

    def get_tech_list(self, obj):
        return obj.tech_list()


class ProjectDetailSerializer(serializers.ModelSerializer):
    tech_list = serializers.SerializerMethodField()
    highlights = ProjectHighlightSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'summary', 'description', 'tech_list', 'status',
                  'live_url', 'docs_url', 'github_url', 'highlights', 'created_at']

    def get_tech_list(self, obj):
        return obj.tech_list()


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'degree', 'institution', 'start_date', 'end_date']


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id', 'text', 'year']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name', 'title', 'location', 'email', 'phone',
                  'github_url', 'linkedin_url', 'summary', 'resume_file', 'available_for_hire']


class BlogPostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'published_at']


class BlogPostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'body', 'published_at']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
