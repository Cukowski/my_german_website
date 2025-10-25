"""Models for user management."""
from __future__ import annotations

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user with teacher/student roles."""

    class Roles(models.TextChoices):
        STUDENT = "student", "Student"
        TEACHER = "teacher", "Teacher"

    role = models.CharField(
        max_length=20,
        choices=Roles.choices,
        default=Roles.STUDENT,
        help_text="Determines whether the user can access teacher privileges.",
    )

    def is_teacher(self) -> bool:  # pragma: no cover - thin wrapper
        return self.role == self.Roles.TEACHER

    def is_student(self) -> bool:  # pragma: no cover - thin wrapper
        return self.role == self.Roles.STUDENT
