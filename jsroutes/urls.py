# coding: utf-8
try:
    from django.conf.urls import patterns, url
except ImportError:
    from django.conf.urls.defaults import patterns, url


urlpatterns = patterns(
    "jsroutes.views",
    url(r"^routes\.js$", "routes", name="jsroutes"),
)
