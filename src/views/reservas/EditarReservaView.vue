<template>
  <TelaFormulario
    titulo="Editar Reserva"
    :endpoint="endpoints.reservas"
    :campos="campos"
  />
</template>

<script>
import TelaFormulario from '@/components/TelaFormulario.vue'
import { endpoints } from '@/services/api'

export default {
  name: 'EditarReservaView',
  components: { TelaFormulario },
  data() {
    return {
      endpoints,
      campos: [
        { nome: 'hospedagem', label: 'ID da Hospedagem', numero: true },
        { nome: 'hospede', label: 'ID do Hóspede', numero: true },
        { nome: 'data_checkin', label: 'Data de Check-in', data: true },
        { nome: 'data_checkout', label: 'Data de Check-out', data: true },
        { nome: 'quantidade_hospedes', label: 'Quantidade de hóspedes', numero: true },
        { nome: 'valor_total', label: 'Valor Total', numero: true },
        {
          nome: 'status',
          label: 'Status',
          opcoes: [
            { valor: 'pendente', nome: 'Pendente' },
            { valor: 'confirmada', nome: 'Confirmada' },
            { valor: 'cancelada', nome: 'Cancelada' },
            { valor: 'finalizada', nome: 'Finalizada' },
          ],
        },
      ],
    }
  },
}
</script>
