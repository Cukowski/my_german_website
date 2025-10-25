"""Views for course browsing and progress tracking."""
from __future__ import annotations

from collections import defaultdict

from django.conf import settings
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.db.models import Avg, Count
from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse_lazy
from django.views.generic import DetailView, ListView, TemplateView

from .forms import ProgressForm
from .models import Lesson, Progress

User = get_user_model()


class HomeView(TemplateView):
    template_name = "courses/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["lesson_count"] = Lesson.objects.count()
        context["student_count"] = User.objects.filter(role="student").count()
        context["teacher_count"] = User.objects.filter(role="teacher").count()
        return context


class DashboardView(LoginRequiredMixin, TemplateView):
    template_name = "courses/dashboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user: User = self.request.user
        accessible_lessons = Lesson.objects.all()
        if user.role == User.Roles.STUDENT:
            accessible_lessons = accessible_lessons.filter(is_teacher_only=False)

        progress_map = {p.lesson_id: p for p in Progress.objects.filter(user=user, lesson__in=accessible_lessons)}
        progress_records = []
        for lesson in accessible_lessons:
            progress = progress_map.get(lesson.id)
            if not progress:
                progress = Progress(user=user, lesson=lesson, completion=0)
            progress_records.append((lesson, progress))

        average_completion = (
            sum(record.completion for _, record in progress_records) / len(progress_records)
            if progress_records
            else 0
        )

        context.update(
            {
                "progress_records": progress_records,
                "average_completion": round(average_completion, 1),
                "progress_target": settings.PROGRESS_TARGET,
            }
        )

        if user.role == User.Roles.TEACHER:
            context.update(self._teacher_context())

        return context

    def _teacher_context(self) -> dict[str, object]:
        students = User.objects.filter(role=User.Roles.STUDENT).annotate(
            lesson_total=Count("progress_records__lesson", distinct=True),
            avg_completion=Avg("progress_records__completion"),
        )
        lessons_by_level: dict[str, list[Lesson]] = defaultdict(list)
        for lesson in Lesson.objects.all():
            lessons_by_level[lesson.level].append(lesson)
        return {
            "students": students,
            "lessons_by_level": dict(lessons_by_level),
        }


class LessonListView(LoginRequiredMixin, ListView):
    template_name = "courses/lesson_list.html"
    model = Lesson

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.role == User.Roles.STUDENT:
            queryset = queryset.filter(is_teacher_only=False)
        return queryset


class LessonDetailView(LoginRequiredMixin, DetailView):
    template_name = "courses/lesson_detail.html"
    model = Lesson
    slug_field = "slug"
    slug_url_kwarg = "slug"

    def dispatch(self, request: HttpRequest, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        lesson: Lesson = self.object
        if lesson.is_teacher_only and not request.user.is_teacher():
            messages.error(request, "This lesson is restricted to teachers.")
            return redirect("dashboard")
        return response

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        progress, _ = Progress.objects.get_or_create(user=self.request.user, lesson=self.object)
        context["progress"] = progress
        context["form"] = ProgressForm(instance=progress)
        return context


@login_required
def update_progress(request: HttpRequest, slug: str) -> HttpResponse:
    """Allow learners to update their completion level for a lesson."""

    lesson = get_object_or_404(Lesson, slug=slug)
    if lesson.is_teacher_only and not request.user.is_teacher():
        messages.error(request, "This lesson is restricted to teachers.")
        return redirect("dashboard")

    progress, _ = Progress.objects.get_or_create(user=request.user, lesson=lesson)

    if request.method == "POST":
        form = ProgressForm(request.POST, instance=progress)
        if form.is_valid():
            form.save()
            messages.success(request, "Progress updated.")
            return redirect("lesson-detail", slug=lesson.slug)
    else:
        form = ProgressForm(instance=progress)
    return render(
        request,
        "courses/update_progress.html",
        {"lesson": lesson, "form": form, "progress": progress},
    )


class TeacherRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    """Mixing ensuring view accessible only to teachers."""

    permission_denied_message = "Only teachers can access this area."
    raise_exception = False
    login_url = reverse_lazy("login")

    def test_func(self):  # pragma: no cover - simple boolean
        return bool(self.request.user and self.request.user.is_authenticated and self.request.user.is_teacher())


class StudentProgressListView(TeacherRequiredMixin, TemplateView):
    template_name = "courses/student_progress.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        students = (
            User.objects.filter(role=User.Roles.STUDENT)
            .prefetch_related("progress_records__lesson")
            .order_by("username")
        )
        context["students"] = students
        return context
