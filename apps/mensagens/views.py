from rest_framework import viewsets
from .models import Mensagens
from .serializer import MensagensSerializer

class MensagensViewSet(viewsets.ModelViewSet):
    queryset = Mensagens.objects.all()
    serializer_class = MensagensSerializer
