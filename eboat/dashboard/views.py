from django.shortcuts import render_to_response
from django.template import RequestContext

def index(request, template_name='dashboard/index.html'):
    return render_to_response(template_name, RequestContext(request, {
        'name': 'index',
    }))

