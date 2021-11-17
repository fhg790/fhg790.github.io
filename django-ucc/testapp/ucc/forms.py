from django import forms
from django.forms.widgets import PasswordInput

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class LoginForm(forms.Form):
    # --- Form fields specification
    
    # --- Username for log in
    username = forms.CharField(label='Username', max_length=100, required=True)

    # --- Password for log in
    password = forms.CharField(widget=PasswordInput(), label='Password', max_length=100, required=True) # min_length=6,

    # --- If remember me, then user will not be logged out after predefined period
    remember_me = forms.BooleanField(required=False, widget=forms.CheckboxInput())

class SignUpForm(UserCreationForm):
    # --- Form fields Sing Up specification
    first_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    last_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2', )