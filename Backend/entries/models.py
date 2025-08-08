from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Journals(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='journals')  # 🔥 Add this line
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
