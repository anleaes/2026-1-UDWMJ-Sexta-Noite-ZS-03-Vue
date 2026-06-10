<template>
  <TelaFormulario
    titulo="Comodidade"
    endpoint="/comodidades/"
    :campos="campos"
  />
</template>

<script>
import TelaFormulario from '@/components/TelaFormulario.vue'

export default {
  name: 'CriarComodidadeView',
  components: { TelaFormulario },
  data() {
    return {
      campos: [
        { nome: 'nome', label: 'Nome' },
        { nome: 'descricao', label: 'Descrição', multiLinha: true },
      ],
    }
  },
}
</script>
