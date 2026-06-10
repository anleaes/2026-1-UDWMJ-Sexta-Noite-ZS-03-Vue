<template>
  <TelaLista
    titulo="Hóspedes"
    endpoint="/hospedes/"
    rotaCriar="CriarHospede"
    rotaEditar="EditarHospede"
  >
    <template #descricao="{ item }">
      <div>
        <strong>{{ item.nome }}</strong><br />
        {{ item.email }}<br />
        Documento: {{ item.documento }}
      </div>
    </template>
  </TelaLista>
</template>

<script>
import TelaLista from '@/components/TelaLista.vue'

export default {
  name: 'HospedesView',
  components: { TelaLista },
}
</script>
