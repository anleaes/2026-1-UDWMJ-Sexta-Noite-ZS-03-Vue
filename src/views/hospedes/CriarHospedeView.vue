<template>
  <TelaFormulario
    titulo="Hóspede"
    endpoint="/hospedes/"
    :campos="campos"
  />
</template>

<script>
import TelaFormulario from '@/components/TelaFormulario.vue'

export default {
  name: 'CriarHospedeView',
  components: { TelaFormulario },
  data() {
    return {
      campos: [
        { nome: 'nome', label: 'Nome' },
        { nome: 'email', label: 'E-mail', tipo: 'email' },
        { nome: 'telefone', label: 'Telefone' },
        { nome: 'documento', label: 'Documento' },
        { nome: 'nacionalidade', label: 'Nacionalidade' },
        { nome: 'data_nascimento', label: 'Data de nascimento', data: true },
      ],
    }
  },
}
</script>
