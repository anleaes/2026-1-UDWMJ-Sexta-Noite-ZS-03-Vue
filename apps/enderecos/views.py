from rest_framework import viewsets
from .models import Enderecos
from .serializer import EnderecosSerializer

class EnderecosViewSet(viewsets.ModelViewSet):
    queryset = Enderecos.objects.all()
    serializer_class = EnderecosSerializer
