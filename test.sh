#!/bin/sh
cd testproject
./manage.py generate_jsroutes routes.js
cat static/routes.js > test.js
cat static/test.js >> test.js
js test.js
cd ..