<template>
  <TelaLista
    titulo="Pagamentos"
    :endpoint="endpoints.pagamentos"
    rotaCriar="CriarPagamento"
    rotaEditar="EditarPagamento"
    :permiteExcluir="false"
  >
    <template #descricao="{ item }">
      <div>
        Pagamento {{ item.id }}<br />
        Reserva: {{ item.reserva }} | Valor: R$ {{ item.valor }}<br />
        Método: {{ item.metodo }} | Status: {{ item.status }}<br />
        Data do pagamento: {{ isoParaBr(item.data_pagamento) || 'Não informada' }}
      </div>
    </template>
  </TelaLista>
</template>

<script>
import TelaLista from '@/components/TelaLista.vue'
import { endpoints } from '@/services/api'
import { isoParaBr } from '@/utils/date'

export default {
  name: 'PagamentosView',
  components: { TelaLista },
  data() {
    return {
      endpoints,
    }
  },
  methods: {
    isoParaBr,
  },
}
</script>
