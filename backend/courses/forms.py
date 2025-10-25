"""Forms for courses app."""
from __future__ import annotations

from django import forms

from .models import Progress


class ProgressForm(forms.ModelForm):
    """Update the completion percentage for a lesson."""

    class Meta:
        model = Progress
        fields = ("completion", "notes")
        widgets = {
            "completion": forms.NumberInput(attrs={"min": 0, "max": 100}),
            "notes": forms.Textarea(attrs={"rows": 3}),
        }
