import django
try:
    from django.conf.urls import include, url
except ImportError:
    from django.conf.urls.defaults import include, url
from django.contrib import admin


admin.autodiscover()


urlpatterns = [
    url(r'^admin/doc/', include('django.contrib.admindocs.urls', namespace="docs")),
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include("jsroutes.urls"))
]
if django.VERSION < (1, 8):
    try:
        from django.conf.urls import patterns
    except ImportError:
        from django.conf.urls.defaults import patterns
    urlpatterns = patterns('', *urlpatterns)
