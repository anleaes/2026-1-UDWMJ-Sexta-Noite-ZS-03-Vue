<template>
  <TelaLista
    titulo="Anfitriões"
    endpoint="/anfitrioes/"
    rotaCriar="CriarAnfitriao"
    rotaEditar="EditarAnfitriao"
  >
    <template #descricao="{ item }">
      <div>
        <strong>{{ item.nome }}</strong><br />
        {{ item.email }}<br />
        Avaliação: {{ item.avaliacao_media }}
      </div>
    </template>
  </TelaLista>
</template>

<script>
import TelaLista from '@/components/TelaLista.vue'

export default {
  name: 'AnfitrioesView',
  components: { TelaLista },
}
</script>
