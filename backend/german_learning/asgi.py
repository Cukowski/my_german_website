"""ASGI config for german_learning project."""
from __future__ import annotations

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "german_learning.settings")

application = get_asgi_application()
