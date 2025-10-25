"""Views for account management."""
from __future__ import annotations

from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView, LogoutView
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.urls import reverse_lazy

from .forms import UserProfileForm, UserRegistrationForm


class SignInView(LoginView):
    template_name = "accounts/login.html"


class SignOutView(LogoutView):
    next_page = reverse_lazy("home")


def signup(request: HttpRequest) -> HttpResponse:
    """Register a new student or teacher."""

    if request.method == "POST":
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            messages.success(request, "Account created successfully. Welcome!")
            login(request, user)
            return redirect("dashboard")
    else:
        form = UserRegistrationForm()
    return render(request, "accounts/signup.html", {"form": form})


@login_required
def profile(request: HttpRequest) -> HttpResponse:
    """Display and update the logged in user's profile."""

    if request.method == "POST":
        form = UserProfileForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, "Profile updated successfully.")
            return redirect("profile")
    else:
        form = UserProfileForm(instance=request.user)
    return render(request, "accounts/profile.html", {"form": form})
