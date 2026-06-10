<template>
  <TelaFormulario
    titulo="Editar Comodidade"
    endpoint="/comodidades/"
    :campos="campos"
  />
</template>

<script>
import TelaFormulario from '@/components/TelaFormulario.vue'

export default {
  name: 'EditarComodidadeView',
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
