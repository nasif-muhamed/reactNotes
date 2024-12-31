from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Note, Profile
from .serializers import UserSerializer, NoteSerializer


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class AdminUserMgt(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        users = User.objects.exclude(id=request.user.id).order_by('-is_active', '-date_joined')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def delete(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
            
            if not user.is_active:
                return Response(
                    {"error": "User is already inactive"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            user.is_active = False
            user.save()
            return Response({"message": "User deactivated successfully"}, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        
    def patch(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
            data = request.data
            status_updation, name_updation = '', ''

            if 'is_active' in data and (data['is_active'] != user.is_active):
                if data['is_active'] == True and not user.is_active:
                    user.is_active = True
                    status_updation = 'Activated user'

                elif data['is_active'] == False and user.is_active:
                    user.is_active = False
                    status_updation = 'Deactivated user'

                else:
                    return Response(
                        {"error": "User is already in the requested state"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            if 'first_name' in data and (data['first_name'] != user.first_name):
                user.first_name = data['first_name']
                name_updation = "Updated Name"

            if status_updation and name_updation:
                message = status_updation + ', ' + name_updation
            else:
                message = status_updation if status_updation else name_updation
            
            if status_updation or name_updation:
                user.save()
            else:
                message = "No updation to change"

            return Response({"message": message if 'is_active' in data else "User details updated successfully"}, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            user = request.user
            createdAt = user.date_joined.strftime('%Y-%m-%d')
            profile, created = Profile.objects.get_or_create(user=user)
            total_notes = Note.objects.filter(author=user).count()
            profile_data = {
                'username': user.username,
                'email': user.email,
                'isStaff': user.is_staff,
                'image': profile.image.url if profile.image else None,
                'createdAt': createdAt,
                'totalNotes': total_notes,
            }
            print(profile_data)
            return Response(profile_data, status=200)
        
        except Exception as error:
            print('error', error)
            return Response({'error': 'Profile not found.'}, status=404)
        
    def post(self, request):
        user = request.user
        profile, created = Profile.objects.get_or_create(user=user)
        
        print('image' in request.FILES)
        if 'image' in request.FILES:
            profile.image = request.FILES['image']
            profile.save()  # Save the profile with the updated image
        
        profile_data = {
            'username': user.username,
            'image': profile.image.url if profile.image else None,
            'createdAt': user.date_joined.strftime('%Y-%m-%d'),
            'totalNotes': Note.objects.filter(author=user).count()
        }
        
        return Response(profile_data, status = status.HTTP_200_OK)


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        print('inside create')
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors) 


class NoteDelete(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)