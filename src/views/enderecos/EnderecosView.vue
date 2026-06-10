<template>
  <TelaLista
    titulo="Endereços"
    endpoint="/enderecos/"
    rotaCriar="CriarEndereco"
    rotaEditar="EditarEndereco"
  >
    <template #descricao="{ item }">
      <div>
        {{ item.logradouro }}, {{ item.numero }}<br />
        {{ item.bairro }}<br />
        {{ item.cidade }}/{{ item.estado }} - {{ item.cep }}
      </div>
    </template>
  </TelaLista>
</template>

<script>
import TelaLista from '@/components/TelaLista.vue'

export default {
  name: 'EnderecosView',
  components: { TelaLista },
}
</script>
