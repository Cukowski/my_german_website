# Generated manually for lessons and progress tracking.
from __future__ import annotations

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Lesson",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=255)),
                ("slug", models.SlugField(blank=True, unique=True)),
                ("overview", models.TextField()),
                (
                    "level",
                    models.CharField(
                        choices=[("A1", "Beginner"), ("A2", "Elementary"), ("B1", "Intermediate"), ("B2", "Upper Intermediate"), ("C1", "Advanced")],
                        default="A1",
                        max_length=2,
                    ),
                ),
                (
                    "is_teacher_only",
                    models.BooleanField(
                        default=False,
                        help_text="If set, only teachers can access this lesson directly.",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["level", "title"]},
        ),
        migrations.CreateModel(
            name="Progress",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "completion",
                    models.PositiveIntegerField(
                        default=0,
                        help_text="Completion percentage between 0 and 100.",
                    ),
                ),
                ("notes", models.TextField(blank=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "lesson",
                    models.ForeignKey(
                        on_delete=models.deletion.CASCADE,
                        related_name="progress_records",
                        to="courses.lesson",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=models.deletion.CASCADE,
                        related_name="progress_records",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={"ordering": ["-updated_at"]},
        ),
        migrations.AlterUniqueTogether(name="progress", unique_together={("user", "lesson")}),
    ]
