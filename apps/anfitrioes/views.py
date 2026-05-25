from rest_framework import viewsets
from .models import Anfitrioes
from .serializer import AnfitrioesSerializer

class AnfitrioesViewSet(viewsets.ModelViewSet):
    queryset = Anfitrioes.objects.all()
    serializer_class = AnfitrioesSerializer
