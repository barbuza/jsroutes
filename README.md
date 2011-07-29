jsroutes
========

use [django](http://code.djangoproject.com/)'s [reverse](https://docs.djangoproject.com/en/dev/topics/http/urls/#reverse) function from javascript

Requirements
------------

nothing

Usage
-----

there are two ways of using jsroutes

#### 1st

* add "jsroutes" to `INSTALLED_APPS`
* add `url("^someprefix/", include("jsroutes.urls"))` to your urlconf
* include `<script type="text/javascript" src="{% url jsroutes %}"></script>` in your templates

#### 2nd

* add "jsroutes" to `INSTALLED_APPS`
* call `manage.py generate_jsroutes somefilename.js`
* include `<script type="text/javascript" src="{{ STATIC_URL }}somefilename.js"></script>` in your templates


after it you can call `django_url_reverse(name, args)` from javascript
