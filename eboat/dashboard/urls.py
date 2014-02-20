from django.conf.urls import patterns, include, url

urlpatterns = patterns('eboat.dashboard.views', 
    url(r'^$', 'index', name='eboat_dashboard_index'),
    url(r'^boats/$', 'show_boats', name='eboat_dashboard_boats'),
    url(r'^hosts/$', 'show_hosts', name='eboat_dashboard_hosts'),
)
