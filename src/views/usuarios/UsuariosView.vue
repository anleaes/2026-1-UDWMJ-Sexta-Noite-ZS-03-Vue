<template>
  <TelaLista
    titulo="Usuários"
    endpoint="/usuarios/"
    rotaCriar="CriarUsuario"
    rotaEditar="EditarUsuario"
  >
    <template #descricao="{ item }">
      <div>
        <strong>{{ item.nome }}</strong><br />
        {{ item.email }}<br />
        CPF: {{ item.cpf }}
      </div>
    </template>
  </TelaLista>
</template>

<script>
import TelaLista from '@/components/TelaLista.vue'

export default {
  name: 'UsuariosView',
  components: { TelaLista },
}
</script>
