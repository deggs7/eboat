from django.shortcuts import render_to_response
from django.template import RequestContext

def index(request, template_name='dashboard/index.html'):
    return render_to_response(template_name, RequestContext(request, {
        'name': 'index',
    }))

def show_boats(request, template_name='dashboard/boats.html'):
    return render_to_response(template_name, RequestContext(request, {
        'name': 'boats',
        }))

def show_hosts(request, template_name='dashboard/hosts.html'):
    return render_to_response(template_name, RequestContext(request, {
        'name': 'hosts',
        }))
