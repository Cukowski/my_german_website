"""Forms for user registration and profile updates."""
from __future__ import annotations

from django import forms
from django.contrib.auth.forms import UserCreationForm

from .models import User


class UserRegistrationForm(UserCreationForm):
    """Capture the user's role during registration."""

    role = forms.ChoiceField(choices=User.Roles.choices, widget=forms.RadioSelect)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("username", "email", "first_name", "last_name", "role")


class UserProfileForm(forms.ModelForm):
    """Allow users to update their personal information."""

    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "role")
