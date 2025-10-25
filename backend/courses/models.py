"""Course and progress models."""
from __future__ import annotations

from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.text import slugify

User = settings.AUTH_USER_MODEL


class Lesson(models.Model):
    """A unit of learning available on the platform."""

    LEVEL_CHOICES = [
        ("A1", "Beginner"),
        ("A2", "Elementary"),
        ("B1", "Intermediate"),
        ("B2", "Upper Intermediate"),
        ("C1", "Advanced"),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    overview = models.TextField()
    level = models.CharField(max_length=2, choices=LEVEL_CHOICES, default="A1")
    is_teacher_only = models.BooleanField(
        default=False,
        help_text="If set, only teachers can access this lesson directly.",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["level", "title"]

    def __str__(self) -> str:  # pragma: no cover - string repr
        return self.title

    def save(self, *args, **kwargs) -> None:
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Progress(models.Model):
    """Tracks a learner's progress through a lesson."""

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="progress_records")
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="progress_records")
    completion = models.PositiveIntegerField(default=0, help_text="Completion percentage between 0 and 100.")
    notes = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "lesson")
        ordering = ["-updated_at"]

    def __str__(self) -> str:  # pragma: no cover
        return f"{self.user} - {self.lesson}: {self.completion}%"

    def mark_completion(self, value: int, notes: str | None = None) -> None:
        self.completion = max(0, min(100, value))
        if notes is not None:
            self.notes = notes
        self.updated_at = timezone.now()
        self.save(update_fields=["completion", "notes", "updated_at"])
