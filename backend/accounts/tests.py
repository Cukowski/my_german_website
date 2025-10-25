"""Tests for the accounts app."""
from __future__ import annotations

from django.contrib.auth import get_user_model
from django.test import Client, TestCase
from django.urls import reverse

User = get_user_model()


class SignupViewTests(TestCase):
    def test_signup_creates_user_with_role(self):
        response = self.client.post(
            reverse("signup"),
            {
                "username": "learner1",
                "password1": "SuperSecure123",
                "password2": "SuperSecure123",
                "role": "student",
            },
        )
        self.assertEqual(response.status_code, 302)
        user = User.objects.get(username="learner1")
        self.assertEqual(user.role, "student")

    def test_teacher_signup_sets_role(self):
        response = self.client.post(
            reverse("signup"),
            {
                "username": "teacher1",
                "password1": "AnotherSecure123",
                "password2": "AnotherSecure123",
                "role": "teacher",
            },
        )
        self.assertEqual(response.status_code, 302)
        user = User.objects.get(username="teacher1")
        self.assertTrue(user.is_teacher())


class ProfileViewTests(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_user(
            username="profileuser",
            password="ExamplePass123",
            role="student",
        )

    def test_profile_requires_login(self):
        response = self.client.get(reverse("profile"))
        self.assertEqual(response.status_code, 302)

    def test_profile_updates_information(self):
        self.client.login(username="profileuser", password="ExamplePass123")
        response = self.client.post(
            reverse("profile"),
            {"first_name": "Anna", "last_name": "Schmidt", "email": "anna@example.com", "role": "student"},
        )
        self.assertEqual(response.status_code, 302)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, "Anna")
