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
}({{ urls|safe }}));
