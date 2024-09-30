# ecommerce_project/urls.py

from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from sentiment_analysis.views import reviews, analyze_sentiment, products, get_product

router = DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/reviews/<str:product_id>/', reviews, name='reviews'),
    path('api/analyze-sentiment/', analyze_sentiment, name='analyze_sentiment'),
    path('api/products/', products, name='products'),
    path('api/products/<str:product_id>/', get_product, name='get_product'),
]