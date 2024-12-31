from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='note-list'),
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='delete-note'),
    path('userprofile/', views.UserProfileView.as_view(), name='user-profile'),
    path('admin/users/', views.AdminUserMgt.as_view(), name='admin-user-mgt'),
    path('admin/user/delete/<int:pk>/', views.AdminUserMgt.as_view(), name='admin-user-delete'),
    path('admin/user/<int:pk>/update/', views.AdminUserMgt.as_view(), name='admin-user-update'),
]