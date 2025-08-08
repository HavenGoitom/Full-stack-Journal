from django.shortcuts import get_object_or_404
from rest_framework.request import Request
from rest_framework import status
from rest_framework.response import Response
from rest_framework import filters
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import IsAuthenticated           
from .models import Journals
from .serializers import JournalsSerializer
import google.generativeai as genai


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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def journals_search(request: Request, title:str):
    journals = Journals.objects.filter(user=request.user, title__icontains=title)
    if not journals.exists():
        return Response({"message": "No journals found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = JournalsSerializer(journals, many = True)
    response = {"message": "journals found ", "data": serializer.data}
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


genai.configure(api_key="AIzaSyDyh4dF902KkB-vi_9BK1Qm4hzyunZj0a4")
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def generate_summary(request):
    text = request.data.get("text")

    if not text:
        return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(f"Summarize this journal entry:\n{text}")
        summary = response.text
        return Response({"summary": summary}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 