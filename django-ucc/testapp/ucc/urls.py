from django.urls import path, re_path

from . import views

urlpatterns = [
    # re_path('^ucc$|^$', views.index, name='index'),
    re_path('^$', views.index, name='index'),
    re_path('login/', views.user_login, name='user_login'),
    re_path('logout/', views.user_logout, name='user_logout'),
    re_path('signup/', views.user_signup, name='user_signup'),
    re_path('feeds_center/', views.feeds_center, name='feeds_center'),
    re_path('test/', views.test, name='test'),
    re_path('admin/', views.admin_panel, name='admin'),
]