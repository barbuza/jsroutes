# -*- coding: utf-8 -*-

import os

from django.core.management.base import BaseCommand
from django.conf import settings

from ...utils import *


class Command(BaseCommand):
    
    help = "generates static javascript with routes"
    
    def handle(self, *args, **options):
        if not args:
            raise RuntimeError("use manage.py generate_jsroutes FILENAME")
        full_path = os.path.join(settings.STATIC_ROOT, args[0])
        if not os.path.isdir(os.path.dirname(full_path)):
            os.makedirs(os.path.dirname(full_path))
        with open(full_path, "w") as fp:
            fp.write(javascript)
