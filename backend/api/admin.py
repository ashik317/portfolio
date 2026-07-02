from django.contrib import admin
from .models import (
    Profile, SkillGroup, Skill, Experience, ExperienceHighlight,
    Project, ProjectHighlight, Education, Achievement, BlogPost, ContactMessage,
)


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1


@admin.register(SkillGroup)
class SkillGroupAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
    inlines = [SkillInline]


class ExperienceHighlightInline(admin.TabularInline):
    model = ExperienceHighlight
    extra = 1


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['role', 'company', 'start_date', 'end_date', 'order']
    inlines = [ExperienceHighlightInline]


class ProjectHighlightInline(admin.TabularInline):
    model = ProjectHighlight
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'is_featured', 'order']
    list_filter = ['status', 'is_featured']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectHighlightInline]


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'published_at', 'is_published']
    list_filter = ['is_published']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_filter = ['is_read']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']


admin.site.register(Profile)
admin.site.register(Education)
admin.site.register(Achievement)
