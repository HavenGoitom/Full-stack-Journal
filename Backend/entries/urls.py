from django.urls import path
from . import views

urlpatterns = [
    path("journals/", views.journals, name="journals"),
    path("journals/search/<str:title>/", views.journals_search, name="journals_search"),
    path("journals/summary/", views.generate_summary, name="generate_summary"),
    path("journals/<int:journal_id>/", views.journals_detail, name="journals_detail"),
    path("journals/<int:journal_id>/update/", views.update_journal, name="update_journal"),
    path("journals/<int:journal_id>/delete/", views.delete_journal, name="delete_journal"),
]
