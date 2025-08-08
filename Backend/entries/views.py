from django.shortcuts import get_object_or_404
from rest_framework.request import Request
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import IsAuthenticated           
from .models import Journals
from .serializers import JournalsSerializer

# Create your views here.

# listing all the entries I have and created a new entries
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def journals(request: Request):
    if request.method == "POST":
        serializer = JournalsSerializer(
            data=request.data,
            context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            response = {
                "message": "Journal has been created",
                "data": serializer.data
            }
            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    journals = Journals.objects.filter(user=request.user)
    serializer = JournalsSerializer(instance=journals, many=True)
    response = {
        "message": "Journals fetched successfully",
        "data": serializer.data
    }
    return Response(data=response, status=status.HTTP_200_OK)

# getting an entrie by an id
@api_view(["GET"])
@permission_classes([IsAuthenticated])                    
def journals_detail(request: Request, journal_id: int):
    journal = get_object_or_404(
        Journals,
        pk=journal_id,
        user=request.user                                
    )
    serializer = JournalsSerializer(journal)
    response = {"message": "journal", "data": serializer.data}
    return Response(data=response, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])                    
def update_journal(request: Request, journal_id: int):
    journal = get_object_or_404(
        Journals,
        pk=journal_id,
        user=request.user                                
    )
    serializer = JournalsSerializer(instance=journal, data=request.data)
    if serializer.is_valid():
        serializer.save()                                  
        response = {
            "message": "Post has been updated!",
            "data": serializer.data
        }
        return Response(data=response, status=status.HTTP_200_OK)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])                   
def delete_journal(request: Request, journal_id: int):
    journal = get_object_or_404(
        Journals,
        pk=journal_id,
        user=request.user                                 
    )
    journal.delete()
    response = {"message": "Journal has been deleted!"}
    return Response(data=response, status=status.HTTP_204_NO_CONTENT)
