# coding: utf-8
import django
try:
    from django.conf.urls import url
except ImportError:
    from django.conf.urls.defaults import url
from . import views


urlpatterns = [
    url(r"^routes\.js$", views.routes, name="jsroutes"),
]

if django.VERSION < (1, 8):
    try:
        from django.conf.urls import patterns
    except ImportError:
        from django.conf.urls.defaults import patterns
    urlpatterns = patterns('', *urlpatterns)
