<script>
import { api, listaDaResposta, mensagemErro } from '@/services/api'

export default {
  name: 'TelaLista',
  props: {
    titulo: { type: String, required: true },
    endpoint: { type: String, required: true },
    rotaCriar: { type: String, required: true },
    rotaEditar: { type: String, required: true },
    permiteExcluir: { type: Boolean, default: true },
  },
  data() {
    return {
      registros: [],
      carregando: true,
    }
  },
  methods: {
    async carregar() {
      try {
        this.carregando = true
        const resposta = await api.get(this.endpoint)
        this.registros = listaDaResposta(resposta.data)
      } catch (e) {
        alert(mensagemErro(e, 'Não foi possível carregar os dados.'))
      } finally {
        this.carregando = false
      }
    },
    async excluir(id) {
      if (!confirm('Deseja excluir este registro?')) return
      try {
        await api.delete(`${this.endpoint}${id}/`)
        await this.carregar()
      } catch (e) {
        alert(mensagemErro(e, 'Não foi possível excluir o registro.'))
      }
    },
    editar(item) {
      this.$router.push({ name: this.rotaEditar, params: { id: item.id }, query: { item: JSON.stringify(item) } })
    },
    criar() {
      this.$router.push({ name: this.rotaCriar })
    },
  },
  mounted() {
    this.carregar()
  },
}
</script>

<template>
  <div class="container">
    <div v-if="carregando" class="carregando">Carregando...</div>
    <template v-else>
      <p v-if="registros.length === 0">Nenhum registro encontrado.</p>
      <div v-for="item in registros" :key="item.id" class="card">
        <slot name="descricao" :item="item"></slot>
        <div class="acoes">
          <button class="botao editar" @click="editar(item)">Editar</button>
          <button v-if="permiteExcluir" class="botao excluir" @click="excluir(item.id)">Excluir</button>
          <slot name="acoes" :item="item"></slot>
        </div>
      </div>
    </template>
    <button class="adicionar" @click="criar">+</button>
  </div>
</template>

<style scoped>
.container {
  padding: 16px;
  position: relative;
  min-height: 200px;
}
.carregando {
  text-align: center;
  padding: 40px;
}
.card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 14px;
  margin-bottom: 12px;
}
.acoes {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}
.botao {
  border-radius: 4px;
  padding: 8px 12px;
  border: none;
  color: #fff;
  cursor: pointer;
}
.editar {
  background-color: #2563eb;
}
.excluir {
  background-color: #dc2626;
}
.adicionar {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border: none;
  background-color: #2563eb;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
</style>
