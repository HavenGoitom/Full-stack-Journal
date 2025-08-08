from rest_framework import serializers
from .models import Journals

class JournalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journals
        fields = ['id', 'title', 'content', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'user']

    def create(self, validated_data):
        user = self.context['request'].user
        return Journals.objects.create(user=user, **validated_data)
