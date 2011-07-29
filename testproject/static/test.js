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