"""Tests for the courses app."""
from __future__ import annotations

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from .models import Lesson, Progress

User = get_user_model()


class DashboardTests(TestCase):
    def setUp(self) -> None:
        self.student = User.objects.create_user(username="student", password="Password123", role="student")
        self.teacher = User.objects.create_user(username="teacher", password="Password123", role="teacher")
        self.lesson_public = Lesson.objects.create(title="Grüße", overview="Greeting basics", level="A1")
        self.lesson_teacher = Lesson.objects.create(
            title="Unterrichtsplanung",
            overview="Teacher planning resources",
            level="B2",
            is_teacher_only=True,
        )

    def test_student_dashboard_hides_teacher_lessons(self):
        self.client.login(username="student", password="Password123")
        response = self.client.get(reverse("dashboard"))
        self.assertEqual(response.status_code, 200)
        lessons = [lesson.title for lesson, _ in response.context["progress_records"]]
        self.assertIn("Grüße", lessons)
        self.assertNotIn("Unterrichtsplanung", lessons)

    def test_teacher_dashboard_shows_all_lessons(self):
        self.client.login(username="teacher", password="Password123")
        response = self.client.get(reverse("dashboard"))
        self.assertEqual(response.status_code, 200)
        lessons = [lesson.title for lesson, _ in response.context["progress_records"]]
        self.assertIn("Grüße", lessons)
        self.assertIn("Unterrichtsplanung", lessons)

    def test_update_progress_creates_record(self):
        self.client.login(username="student", password="Password123")
        response = self.client.post(
            reverse("update-progress", kwargs={"slug": self.lesson_public.slug}),
            {"completion": 80, "notes": "Feeling confident."},
            follow=True,
        )
        self.assertEqual(response.status_code, 200)
        progress = Progress.objects.get(user=self.student, lesson=self.lesson_public)
        self.assertEqual(progress.completion, 80)
        self.assertEqual(progress.notes, "Feeling confident.")

    def test_teacher_only_lesson_blocked_for_student(self):
        self.client.login(username="student", password="Password123")
        response = self.client.get(reverse("lesson-detail", kwargs={"slug": self.lesson_teacher.slug}))
        self.assertEqual(response.status_code, 302)
        self.assertTrue(response.url.endswith(reverse("dashboard")))
