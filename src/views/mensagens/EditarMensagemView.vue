<template>
  <TelaFormulario
    titulo="Editar Mensagem"
    :endpoint="endpoints.mensagens"
    :campos="campos"
  />
</template>

<script>
import TelaFormulario from '@/components/TelaFormulario.vue'
import { endpoints } from '@/services/api'

export default {
  name: 'EditarMensagemView',
  components: { TelaFormulario },
  data() {
    return {
      endpoints,
      campos: [
        { nome: 'hospedagem', label: 'ID da Hospedagem', numero: true },
        { nome: 'nome', label: 'Nome' },
        { nome: 'email', label: 'E-mail', tipo: 'email' },
        { nome: 'telefone', label: 'Telefone' },
        { nome: 'assunto', label: 'Assunto' },
        { nome: 'mensagem', label: 'Mensagem', multiLinha: true },
        { nome: 'lida', label: 'Lida', booleano: true },
      ],
    }
  },
}
</script>
