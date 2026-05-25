from rest_framework import viewsets
from .models import Hospedes
from .serializer import HospedesSerializer

class HospedesViewSet(viewsets.ModelViewSet):
    queryset = Hospedes.objects.all()
    serializer_class = HospedesSerializer
