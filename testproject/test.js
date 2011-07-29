var django_url_reverse = (function (urlconf) {
  "use strict";
  function reverse(name, args) {
    var index, length, pattern, url;
    if (! args) {
      args = [];
    }
    for (index = 0, length = urlconf.length; index < length; index += 1) {
      if (urlconf[index][0] === name) {
        pattern = urlconf[index][1];
        if (args.length === (pattern.match(/\(/g) || []).length) {
          url = pattern;
          for (index = 0, length = args.length; index < length; index += 1) {
            url = url.replace(/\([^\)]+\)/, args[index]);
          }
          url = url.replace(/(?:^\^|\$$)/g, '');
          url = url.replace(/\\(?!=\\)/g, '');
          url = url.replace(/\\\\/g, '\\');
          if (new RegExp(pattern).test(url)) {
            return url;
          } else {
            return null;
          }
        }
      }
    }
  }
  return reverse;
}([["jsroutes", "^/routes\\.js$"], ["admin:sites_site_change", "^/admin/sites/site/(.+)/$"], ["admin:sites_site_delete", "^/admin/sites/site/(.+)/delete/$"], ["admin:sites_site_history", "^/admin/sites/site/(.+)/history/$"], ["admin:sites_site_add", "^/admin/sites/site/add/$"], ["admin:sites_site_changelist", "^/admin/sites/site/$"], ["admin:auth_group_change", "^/admin/auth/group/(.+)/$"], ["admin:auth_group_delete", "^/admin/auth/group/(.+)/delete/$"], ["admin:auth_group_history", "^/admin/auth/group/(.+)/history/$"], ["admin:auth_group_add", "^/admin/auth/group/add/$"], ["admin:auth_group_changelist", "^/admin/auth/group/$"], ["admin:auth_user_change", "^/admin/auth/user/(.+)/$"], ["admin:auth_user_delete", "^/admin/auth/user/(.+)/delete/$"], ["admin:auth_user_history", "^/admin/auth/user/(.+)/history/$"], ["admin:auth_user_add", "^/admin/auth/user/add/$"], ["admin:auth_user_changelist", "^/admin/auth/user/$"], ["admin:app_list", "^/admin/(\\w+)/$"], ["admin:jsi18n", "^/admin/jsi18n/$"], ["admin:password_change_done", "^/admin/password_change/done/$"], ["admin:password_change", "^/admin/password_change/$"], ["admin:logout", "^/admin/logout/$"], ["admin:index", "^/admin/$"], ["docs:django-admindocs-templates", "^/admin/doc/templates/(.*)/$"], ["docs:django-admindocs-models-detail", "^/admin/doc/models/([^\\.]+)\\.([^/]+)/$"], ["docs:django-admindocs-models-index", "^/admin/doc/models/$"], ["docs:django-admindocs-views-detail", "^/admin/doc/views/([^/]+)/$"], ["docs:django-admindocs-views-index", "^/admin/doc/views/$"], ["docs:django-admindocs-filters", "^/admin/doc/filters/$"], ["docs:django-admindocs-tags", "^/admin/doc/tags/$"], ["docs:django-admindocs-bookmarklets", "^/admin/doc/bookmarklets/$"], ["docs:django-admindocs-docroot", "^/admin/doc/$"]]));
var reverse = django_url_reverse;
var tests = [
  [reverse("jsroutes"), "/routes.js"],
  [reverse("admin:logout"), "/admin/logout/"],
  [reverse("admin:sites_site_change", [2]), "/admin/sites/site/2/"],
  [reverse("docs:django-admindocs-docroot"), "/admin/doc/"]
];
for (var i in tests) {
  if (tests[i][0] !== tests[i][1]) {
    throw "fail: " + tests[i][0] + " != " + tests[i][1];
  } 
}