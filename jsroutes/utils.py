# coding: utf-8

import re

from django.core.urlresolvers import RegexURLPattern, RegexURLResolver
from django.conf import settings

try:
    from django.utils.importlib import import_module
except ImportError:
    from importlib import import_module
    
try:
    import json
except ImportError:
    from django.utils import simplejson as json
from django.template.loader import get_template
from django.template import Context


__all__ = ("javascript", )


def merge_patterns(prefixes, pattern):
    res = ""
    for pat in prefixes + [pattern]:
        if pat:
            res += pat.lstrip("^") if res else pat
    res = re.sub(r"\?P<\w+>", "", res)
    res = re.sub(r"^\^(?=[^/])", "^/", res)
    return res


def collect_urls(urls, item, ns=None, prefixes=[]):
    if isinstance(item, list):
        for node in item:
            collect_urls(urls, node, ns=ns, prefixes=prefixes)
    elif isinstance(item, RegexURLResolver):
        if ns and item.namespace:
            newns = "%s:%s" % (ns, item.namespace)
        elif item.namespace:
            newns = item.namespace
        else:
            newns = ns
        patterns = prefixes[:]
        patterns.append(item.regex.pattern)
        for node in item.url_patterns:
            collect_urls(urls, node, ns=newns, prefixes=patterns)
    elif isinstance(item, RegexURLPattern):
        if item.name:
            for exc_pattern in getattr(settings, "JSROUTES_EXCLUDE_NAMES", []):
                if isinstance(exc_pattern, str):
                    exc_pattern = re.compile(exc_pattern)

                if exc_pattern.match(item.name):
                    break
            else:
                pattern = merge_patterns(prefixes, item.regex.pattern)
                for exc_pattern in getattr(settings,
                                           "JSROUTES_EXCLUDE_PATTERNS", []):
                    if isinstance(exc_pattern, str):
                        exc_pattern = re.compile(exc_pattern)
                    if exc_pattern.match(pattern):
                        break
                else:
                    name = "%s:%s" % (ns, item.name) if ns else item.name
                    urls.append([name, pattern])
    else:
        raise RuntimeError("can't process %r" % item)


urls = []
collect_urls(urls, import_module(settings.ROOT_URLCONF).urlpatterns)
urls.reverse()
urls = json.dumps(urls)
tmpl = get_template("jsroutes.js")
javascript = tmpl.render(Context({"urls": urls}))
