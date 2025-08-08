from django.urls import path
from . import views

urlpatterns = [
    path("journals/", views.journals, name="journals"),
    path("journals/<int:journal_id>/", views.journals_detail, name="journals_detail"),
    path("journals/<int:journal_id>/update/", views.update_journal, name="update_journal"),
    path("journals/<int:journal_id>/delete/", views.delete_journal, name="delete_journal"),
]
