from django.core.management.base import BaseCommand
from api.models import (
    Profile, SkillGroup, Skill, Experience, ExperienceHighlight,
    Project, ProjectHighlight, Education, Achievement, BlogPost,
)


class Command(BaseCommand):
    help = 'Seeds the database with Ashikur Rahman Likhon\'s portfolio content.'

    def handle(self, *args, **options):
        self.stdout.write('Clearing existing data...')
        Profile.objects.all().delete()
        SkillGroup.objects.all().delete()
        Experience.objects.all().delete()
        Project.objects.all().delete()
        Education.objects.all().delete()
        Achievement.objects.all().delete()
        BlogPost.objects.all().delete()

        self.stdout.write('Creating profile...')
        Profile.objects.create(
            name='Ashikur Rahman Likhon',
            title='Django / Backend Developer',
            location='Dhaka, Bangladesh',
            email='mdarlikhon317@gmail.com',
            phone='+880 1517 844617',
            github_url='https://github.com/ashik317',
            linkedin_url='https://www.linkedin.com/in/ashikur-rahman-likhon',
            summary=(
                'Backend developer with 1.5+ years building and maintaining production APIs '
                'for a live multi-tenant SaaS platform used by UK mortgage brokers. Skilled in '
                'Django REST Framework, PostgreSQL performance tuning, and asynchronous task '
                'processing with Celery and Redis. Comfortable owning features end-to-end, from '
                'data modelling and API design through deployment with Docker.'
            ),
            available_for_hire=True,
        )

        self.stdout.write('Creating skills...')
        skill_groups = {
            'Languages': ['Python', 'Java', 'C', 'JavaScript', 'HTML', 'CSS'],
            'Backend Frameworks': ['Django', 'Django REST Framework (DRF)', 'FastAPI'],
            'Frontend': ['React (basic)'],
            'Core CS': ['Data Structures & Algorithms'],
            'Databases': ['PostgreSQL', 'MySQL', 'SQLite', 'Django ORM', 'SQLAlchemy'],
            'Tools & Platforms': ['Docker', 'Celery', 'Redis', 'RabbitMQ', 'Git',
                                    'REST API', 'Swagger/OpenAPI', 'SendGrid', 'JWT'],
        }
        for i, (group_name, skills) in enumerate(skill_groups.items()):
            group = SkillGroup.objects.create(name=group_name, order=i)
            for j, skill_name in enumerate(skills):
                Skill.objects.create(group=group, name=skill_name, order=j)

        self.stdout.write('Creating experience...')
        exp = Experience.objects.create(
            role='Django Backend Developer',
            company='Raptor Tech Company',
            location='Dhaka, Bangladesh',
            start_date='Jan 2025',
            end_date='Present',
            subtitle='QOP CRM — live multi-tenant SaaS platform serving UK mortgage brokers',
            order=0,
        )
        highlights = [
            'Built and maintained production-grade REST APIs for a live multi-tenant SaaS CRM, '
            'contributing to a platform serving multiple independent client organisations.',
            'Designed a hierarchical organisation structure (parent to child) enabling the platform '
            'to onboard and serve many independent clients from a single codebase.',
            'Implemented role-based access control with automatic permission propagation across '
            'organisation levels, removing the need for manual permission setup on every new tenant.',
            'Integrated SendGrid for transactional email (password resets, invitations) and built an '
            'in-app notification system used across the platform.',
            'Profiled and optimised PostgreSQL queries, resolving key N+1 and indexing issues that '
            'reduced slow endpoint response times.',
            'Containerised the application with Docker and Docker Compose, giving development, '
            'staging, and production consistent, reproducible environments.',
            'Used Celery and Redis to move email delivery, notifications, and scheduled jobs off the '
            'request cycle, improving API responsiveness.',
        ]
        for i, text in enumerate(highlights):
            ExperienceHighlight.objects.create(experience=exp, text=text, order=i)

        self.stdout.write('Creating projects...')
        projects_data = [
            dict(
                title='QOP CRM — Multi-Tenant SaaS CRM',
                slug='qop-crm',
                summary='Production SaaS backend for UK mortgage brokers with live API docs and per-tenant subdomains.',
                description=(
                    'A production SaaS backend for UK mortgage brokers, deployed with live '
                    'Swagger/OpenAPI documentation. Designed multi-tenant data isolation with a '
                    'hierarchical parent-to-child organisation structure, where each tenant gets a '
                    'dedicated subdomain and an automatic provisioning flow.'
                ),
                tech_stack='Django, DRF, PostgreSQL, Celery, Redis, Docker, SendGrid',
                status='live',
                live_url='https://cityplus.qopcrm.com/auth/login',
                docs_url='https://api.staging.qopcrm.com/api/docs',
                github_url='https://github.com/ashik317/qop_api',
                is_featured=True,
                order=0,
                highlights=[
                    'Production SaaS backend for UK mortgage brokers, deployed with live Swagger/OpenAPI documentation.',
                    'Designed multi-tenant data isolation with a hierarchical parent to child organisation structure; each tenant gets a dedicated subdomain.',
                    'Built automatic tenant-provisioning flow including permission propagation and per-tenant theming.',
                ],
            ),
            dict(
                title='Landkeeper — Landlord Management Platform',
                slug='landkeeper',
                summary='SaaS platform for landlords to manage properties, mortgages, tenants, and compliance in one place.',
                description=(
                    'A SaaS platform for landlords to manage properties, mortgages, tenants, and '
                    'compliance documents in one place, with role-based access spanning multiple '
                    'user types and a two-tier subscription model.'
                ),
                tech_stack='Django, DRF, PostgreSQL, Celery, Redis, Docker',
                status='live',
                live_url='https://crm.landkeeper.co.uk/client/landlord/dashboard',
                docs_url='https://api.landkeeper.co.uk/api/docs/',
                github_url='https://github.com/ashik317/landkeeper-backend',
                is_featured=True,
                order=1,
                highlights=[
                    'Co-building a SaaS platform for landlords to manage properties, mortgages, tenants, and compliance documents in one place.',
                    'Designing role-based access covering landlords, mortgage advisers, accountants, and letting agents, each scoped to their relevant data only.',
                    'Architecting a two-tier subscription model (Free vs Premium) with feature gating across property limits, multi-user access, and reporting.',
                ],
            ),
            dict(
                title='Online Shop System',
                slug='online-shop-system',
                summary='Full checkout flow with Stripe payments and async order processing.',
                description=(
                    'An online shop backend with a working Stripe checkout flow, webhook handling, '
                    'and order confirmation, using Celery and RabbitMQ for asynchronous order '
                    'processing and receipts.'
                ),
                tech_stack='Django, Celery, RabbitMQ, Stripe',
                status='archived',
                live_url='',
                docs_url='',
                github_url='https://github.com/ashik317/Building-an-Online-Shop',
                is_featured=False,
                order=2,
                highlights=[
                    'Integrated Stripe payments with a working checkout flow, webhook handling, and order confirmation.',
                    'Used Celery and RabbitMQ for asynchronous order processing, email receipts, and inventory updates.',
                    'Implemented user authentication, product catalogue, cart management, and an admin order dashboard.',
                ],
            ),
            dict(
                title='E-Learning Platform API',
                slug='e-learning-platform-api',
                summary='Versioned REST APIs for course and student management.',
                description=(
                    'Versioned REST APIs (v1/v2) for course and student management, backed by a '
                    'normalised PostgreSQL schema covering courses, enrolments, progress tracking, '
                    'and instructor profiles.'
                ),
                tech_stack='Django, DRF, PostgreSQL, API Versioning',
                status='archived',
                live_url='',
                docs_url='',
                github_url='https://github.com/ashik317/E-Learning-Platform',
                is_featured=False,
                order=3,
                highlights=[
                    'Developed versioned REST APIs (v1/v2) for course and student management.',
                    'Designed a normalised PostgreSQL schema covering courses, enrolments, progress tracking, and instructor profiles.',
                ],
            ),
        ]
        for data in projects_data:
            highlights = data.pop('highlights')
            project = Project.objects.create(**data)
            for i, text in enumerate(highlights):
                ProjectHighlight.objects.create(project=project, text=text, order=i)

        self.stdout.write('Creating education...')
        Education.objects.create(
            degree='Bachelor of Science in Computer Science and Engineering',
            institution='United International University, Dhaka, Bangladesh',
            start_date='Jan 2019',
            end_date='May 2023',
            order=0,
        )

        self.stdout.write('Creating achievements...')
        Achievement.objects.create(text='1st Runner-up — Software Engineering Lab, CSE Project Show', year='2022', order=0)
        Achievement.objects.create(text='1st Runner-up — Cloud Computing, CSE Project Show', year='2023', order=1)

        self.stdout.write('Creating placeholder blog posts (edit these in /admin)...')
        BlogPost.objects.create(
            title='Taming N+1 Queries in Django REST Framework',
            slug='taming-n-plus-1-queries-in-drf',
            excerpt='A few practical patterns for spotting and fixing N+1 query problems before they hit production.',
            body=(
                'This is a placeholder post. Replace it with your own write-up from Django admin.\n\n'
                'A good starting point: talk about select_related vs prefetch_related, how you '
                'found the N+1 issues at Raptor Tech, and what the response-time improvement looked like.'
            ),
            is_published=True,
            published_at='2026-03-10',
        )
        BlogPost.objects.create(
            title='Designing Multi-Tenant SaaS with a Parent-Child Organisation Model',
            slug='multi-tenant-saas-parent-child-organisations',
            excerpt='Notes on building tenant isolation and permission propagation for QOP CRM.',
            body=(
                'This is a placeholder post. Replace it with your own write-up from Django admin.\n\n'
                'Cover how the hierarchical organisation structure works, how permissions propagate '
                'automatically, and the tradeoffs of subdomain-per-tenant routing.'
            ),
            is_published=True,
            published_at='2026-05-02',
        )
        BlogPost.objects.create(
            title='Moving Work Off the Request Cycle with Celery and Redis',
            slug='celery-redis-off-the-request-cycle',
            excerpt='Why background jobs matter for API responsiveness, and how to set them up cleanly.',
            body=(
                'This is a placeholder post. Replace it with your own write-up from Django admin.\n\n'
                'Walk through a real example: emails, notifications, or scheduled jobs you moved to '
                'Celery, and the responsiveness improvement it produced.'
            ),
            is_published=True,
            published_at='2026-06-18',
        )

        self.stdout.write(self.style.SUCCESS('Seed data created successfully.'))
