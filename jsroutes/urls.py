# -*- coding: utf-8 -*-
from django.conf.urls.defaults import patterns, url


urlpatterns = patterns("jsroutes.views",
    url(r"^routes\.js$", "routes", name="jsroutes"),
)
