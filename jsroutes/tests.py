from django.test import TestCase
from .utils import javascript


class BaseCollectUrlsTest(TestCase):
    def test_collect_url(self):
        self.assertIn('["jsroutes", "^/routes\\\\.js$"]', javascript)
        self.assertIn('["admin:index", "^/admin/$"]', javascript)
        self.assertIn('admin:sites_site_change', javascript)
