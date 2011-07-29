# -*- coding: utf-8 -*-

from django.http import HttpResponse

from .utils import *


def routes(request):
    return HttpResponse(javascript, mimetype="application/x-javascript")
