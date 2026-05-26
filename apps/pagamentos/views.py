from rest_framework import viewsets
from .models import Pagamentos
from .serializer import PagamentosSerializer

class PagamentosViewSet(viewsets.ModelViewSet):
    queryset = Pagamentos.objects.all()
    serializer_class = PagamentosSerializer
