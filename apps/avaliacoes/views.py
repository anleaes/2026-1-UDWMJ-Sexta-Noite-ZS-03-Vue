from rest_framework import viewsets
from .models import Avaliacoes
from .serializer import AvaliacoesSerializer

class AvaliacoesViewSet(viewsets.ModelViewSet):
    queryset = Avaliacoes.objects.all()
    serializer_class = AvaliacoesSerializer
