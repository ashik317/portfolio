from django.db import models


class Profile(models.Model):
    """The single owner of this portfolio. There should only ever be one row."""
    name = models.CharField(max_length=120)
    title = models.CharField(max_length=160)
    location = models.CharField(max_length=120, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    summary = models.TextField()
    resume_file = models.FileField(upload_to='resume/', blank=True, null=True)
    available_for_hire = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class SkillGroup(models.Model):
    """A category of skills, e.g. 'Backend Frameworks'."""
    name = models.CharField(max_length=80)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class Skill(models.Model):
    group = models.ForeignKey(SkillGroup, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class Experience(models.Model):
    role = models.CharField(max_length=160)
    company = models.CharField(max_length=160)
    location = models.CharField(max_length=120, blank=True)
    start_date = models.CharField(max_length=40)   # e.g. "Jan 2025"
    end_date = models.CharField(max_length=40, default='Present')
    subtitle = models.CharField(max_length=200, blank=True)  # e.g. project name
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.role} @ {self.company}'


class ExperienceHighlight(models.Model):
    experience = models.ForeignKey(Experience, related_name='highlights', on_delete=models.CASCADE)
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.text[:60]


class Project(models.Model):
    STATUS_LIVE = 'live'
    STATUS_WIP = 'wip'
    STATUS_ARCHIVED = 'archived'
    STATUS_CHOICES = [
        (STATUS_LIVE, 'Live'),
        (STATUS_WIP, 'In progress'),
        (STATUS_ARCHIVED, 'Archived'),
    ]

    title = models.CharField(max_length=160)
    slug = models.SlugField(unique=True)
    summary = models.CharField(max_length=240)
    description = models.TextField(blank=True)
    tech_stack = models.CharField(max_length=240, help_text='Comma-separated, e.g. "Django, DRF, PostgreSQL"')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_LIVE)
    live_url = models.URLField(blank=True)
    docs_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

    def tech_list(self):
        return [t.strip() for t in self.tech_stack.split(',') if t.strip()]


class ProjectHighlight(models.Model):
    project = models.ForeignKey(Project, related_name='highlights', on_delete=models.CASCADE)
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.text[:60]


class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    start_date = models.CharField(max_length=40)
    end_date = models.CharField(max_length=40)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.degree


class Achievement(models.Model):
    text = models.CharField(max_length=240)
    year = models.CharField(max_length=20, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.text


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    excerpt = models.CharField(max_length=280)
    body = models.TextField(help_text='Supports plain paragraphs, split by blank lines.')
    is_published = models.BooleanField(default=True)
    published_at = models.DateField()

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} <{self.email}>'
