<template>
  <TelaLista
    titulo="Comodidades"
    endpoint="/comodidades/"
    rotaCriar="CriarComodidade"
    rotaEditar="EditarComodidade"
  >
    <template #descricao="{ item }">
      <div>
        <strong>{{ item.nome }}</strong><br />
        {{ item.descricao || 'Sem descrição' }}
      </div>
    </template>
  </TelaLista>
</template>

<script>
import TelaLista from '@/components/TelaLista.vue'

export default {
  name: 'ComodidadesView',
  components: { TelaLista },
}
</script>
