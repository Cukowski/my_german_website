"""Admin configuration for courses."""
from __future__ import annotations

from django.contrib import admin

from .models import Lesson, Progress


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("title", "level", "is_teacher_only", "created_at")
    list_filter = ("level", "is_teacher_only")
    search_fields = ("title", "overview")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Progress)
class ProgressAdmin(admin.ModelAdmin):
    list_display = ("user", "lesson", "completion", "updated_at")
    list_filter = ("completion", "lesson__level")
    search_fields = ("user__username", "lesson__title")
