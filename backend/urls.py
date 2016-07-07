from django.conf.urls import url
from django.contrib import admin

from backend.views import *
from django.views.decorators.csrf import ensure_csrf_cookie

urlpatterns = [
    url(r'^1/allcomments$', ensure_csrf_cookie(AllComments.as_view())),
    url(r'^1/searchdays$', ensure_csrf_cookie(SearchDays.as_view())),
    url(r'^1/newexpense$', ensure_csrf_cookie(NewExpense.as_view()))
]