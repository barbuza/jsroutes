# coding: utf-8
from django.http import HttpResponse


def routes(request):
    from .utils import javascript
    return HttpResponse(javascript, content_type="application/x-javascript")
