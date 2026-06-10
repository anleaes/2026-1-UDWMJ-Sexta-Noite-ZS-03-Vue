<template>
  <TelaFormulario
    titulo="Editar Endereço"
    endpoint="/enderecos/"
    :campos="campos"
  />
</template>

<script>
import TelaFormulario from '@/components/TelaFormulario.vue'

export default {
  name: 'EditarEnderecoView',
  components: { TelaFormulario },
  data() {
    return {
      campos: [
        { nome: 'logradouro', label: 'Logradouro' },
        { nome: 'numero', label: 'Número' },
        { nome: 'complemento', label: 'Complemento' },
        { nome: 'bairro', label: 'Bairro' },
        { nome: 'cidade', label: 'Cidade' },
        { nome: 'estado', label: 'Estado' },
        { nome: 'cep', label: 'CEP' },
      ],
    }
  },
}
</script>
