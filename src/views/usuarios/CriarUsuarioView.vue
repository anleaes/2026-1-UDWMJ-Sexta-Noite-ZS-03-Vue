<template>
  <TelaFormulario
    titulo="Usuário"
    endpoint="/usuarios/"
    :campos="campos"
  />
</template>

<script>
import TelaFormulario from '@/components/TelaFormulario.vue'

export default {
  name: 'CriarUsuarioView',
  components: { TelaFormulario },
  data() {
    return {
      campos: [
        { nome: 'nome', label: 'Nome' },
        { nome: 'email', label: 'E-mail', tipo: 'email' },
        { nome: 'telefone', label: 'Telefone' },
        { nome: 'cpf', label: 'CPF' },
        { nome: 'data_nascimento', label: 'Data de nascimento', data: true },
        { nome: 'ativo', label: 'Ativo', booleano: true, valorPadrao: 'true' },
      ],
    }
  },
}
</script>
