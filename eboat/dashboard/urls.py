from django.conf.urls import patterns, include, url

urlpatterns = patterns('eboat.dashboard.views', 
    url(r'^$', 'index', name='eboat_dashboard_index'), 
)
