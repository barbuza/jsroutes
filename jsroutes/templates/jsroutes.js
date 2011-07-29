var django_url_reverse = (function (urlconf) {
  "use strict";
  function reverse() {
    var args = Array.from(arguments), name = args.shift(), index, length, pattern, url;
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
          if (url.test(pattern)) {
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
