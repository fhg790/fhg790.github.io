from ucc.forms import SignUpForm
import django
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django import forms
from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.forms import UserCreationForm

import json
import re
from pprint import pprint

from django.contrib.auth.decorators import login_required

from .forms import LoginForm

# @login_required(login_url='/ucc/login/')
def index(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'index.html', { 'feeds': ['name_' + str(x) for x in range(0,12) ] })

def user_login(request):
    # --- Redirect already authenticated users
    if(request.user.is_authenticated):
        if( request.GET.get('next') is not None ):
            return redirect(request.GET.get('next'))
        else:
            return redirect('/ucc/')

    # --- Variable for storing custom errors
    custom_errors = {}
    
    # --- Process form data if POST
    if( request.method == 'POST' ):
        # --- Create a form instance and populate it with data from the request:
        form = LoginForm(request.POST)

        # --- Check whether it's valid:
        if form.is_valid():
            # --- Authenticate user
            user = authenticate(request, username=form.cleaned_data['username'], password=form.cleaned_data['password'])

            # --- Login user if active
            if user is not None:
                if user.is_active:
                    # --- Login User
                    login(request, user)
                    # --- Remember me
                    if form.cleaned_data['remember_me']:
                        request.session.set_expiry(30 * 24 * 60 * 60) # \d * \h * \m * \s
                        request.session.modified = True

                    # --- Redirect to the desired page or just to the main
                    if( request.GET.get('next') is not None ):
                        return redirect(request.GET.get('next'))
                    else:
                        return redirect('/ucc/')
                else:
                    custom_errors['error'] = "Can't log in. Inactive user."
            else:
                custom_errors['error'] = "Incorrect username or password provided."
        else:
            custom_errors['error'] = "Error"
    else:
        form = LoginForm()

    return render(request, 'auth/login.html', {'form': form, 'form_custom_errors': custom_errors })

def user_logout(request):
    # --- Logout the user
    logout(request)
    # --- 
    return HttpResponse("You've been correctly logged out.")

def user_signup(request):
    # --- User signup form
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('/ucc/')
    else:
        form = SignUpForm()
    
    return render(request, 'auth/signup.html', {'form': form})

@login_required(login_url='/ucc/login/')
def feeds_center(request):
    # --- Feeds Center view
    return render(request, 'feeds_center.html', { 'feeds': ['name_' + str(x) for x in range(0,12) ] })

@login_required(login_url='/ucc/login/')
def admin_panel(request):
    # --- Feeds Center view
    return render(request, 'admin_panel.html')

@login_required(login_url='/ucc/login/')
def test(request):
    with open('/root/test_django/test.json') as file:
        json_data = json.load(file)

    # --- Process form data if POST
    if( request.method == 'POST' ):
        # pprint(request.POST)
        # pprint(json_data)

        _tmp_structure = {}

        def str_gen(str, structure, value):
            keys = str.split('.')

            # pprint(keys)

            if(len(keys) > 1):
                if(keys[0] not in structure.keys()):
                    structure = {keys[0]: {}}

                structure[keys[0]] = {**structure[keys[0]], **str_gen('.'.join(keys[1:]), structure[keys[0]], value)}
            else:
                if(keys[0] not in structure.keys()):
                    structure = {keys[0]: value}
                else:
                    structure[keys[0]] = value
            
            return structure

        def compare_and_save_fields(old_data, new_data):

            update_flag = 0

            for attribute in old_data['mapping'].keys():
                
                original_attribute_values = old_data['mapping'][attribute]
                new_attribute_values = new_data['mapping_data'][attribute]

                if(original_attribute_values['field_syntax'] != new_attribute_values['field_syntax']):
                    original_attribute_values['field_syntax'] = new_attribute_values['field_syntax']
                    update_flag = 1
                
                if(original_attribute_values['filters']['skip'] != new_attribute_values['filters']['skip']):
                    original_attribute_values['filters']['skip'] = new_attribute_values['filters']['skip']
                    update_flag = 1

                if('replace' in new_attribute_values['filters'].keys()):
                    new_replace_filters = {x['from']: x['to'] for x in new_attribute_values['filters']['replace'].values() if(x['from'] != '')}

                if('replace' in new_attribute_values['filters'].keys() and original_attribute_values['filters']['replace'].items() != new_replace_filters.items() ):
                    original_attribute_values['filters']['replace'] = new_replace_filters
                    update_flag = 1

            if(update_flag == 1):
                print('updating fields')
                # with open('/root/test_django/test.json', 'w') as file:
                #     json.dump(old_data, file, indent=4)

            return old_data
                

        for keys in request.POST.keys():
            _temp = str_gen(keys, _tmp_structure, request.POST[keys])
            _tmp_structure = {**_tmp_structure, **_temp}
        
        json_data = compare_and_save_fields(json_data, _tmp_structure)
    # else:
    #     pprint(json_data)

    header = ['id', 'body', 'text1', 'text2', 'url1', 'url2']

    # --- Feeds Center view
    return render(request, 'mapping.html', {'mapping_data': json_data['mapping'], 'header': header})