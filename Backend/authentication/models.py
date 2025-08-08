from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    username = models.CharField(max_length=45, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        related_name='authentication_users',
        related_query_name='authentication_user'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        related_name='authentication_user_permissions',
        related_query_name='authentication_user'
    )

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username
