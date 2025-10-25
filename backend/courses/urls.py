"""URL routes for courses app."""
from __future__ import annotations

from django.urls import path

from .views import (
    DashboardView,
    HomeView,
    LessonDetailView,
    LessonListView,
    StudentProgressListView,
    update_progress,
)

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    path("lessons/", LessonListView.as_view(), name="lesson-list"),
    path("lessons/<slug:slug>/", LessonDetailView.as_view(), name="lesson-detail"),
    path("lessons/<slug:slug>/progress/", update_progress, name="update-progress"),
    path("teaching/students/", StudentProgressListView.as_view(), name="student-progress"),
]
