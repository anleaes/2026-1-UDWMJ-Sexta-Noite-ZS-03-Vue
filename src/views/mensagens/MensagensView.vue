<script>
import { api, endpoints, listaDaResposta, mensagemErro } from '@/services/api'

export default {
  name: 'MensagensView',
  data() {
    return {
      mensagens: [],
      carregando: true,
    }
  },
  methods: {
    async carregar() {
      try {
        this.carregando = true
        const resposta = await api.get(endpoints.mensagens)
        this.mensagens = listaDaResposta(resposta.data)
      } catch (e) {
        alert(mensagemErro(e, 'Não foi possível carregar as mensagens.'))
      } finally {
        this.carregando = false
      }
    },
    async excluir(id) {
      if (!confirm('Deseja excluir esta mensagem?')) return
      try {
        await api.delete(`${endpoints.mensagens}${id}/`)
        await this.carregar()
      } catch (e) {
        alert(mensagemErro(e, 'Não foi possível excluir a mensagem.'))
      }
    },
    responder(item) {
      this.$router.push({
        name: 'CriarMensagem',
        query: {
          valoresIniciais: JSON.stringify({
            hospedagem: item.hospedagem,
            email: item.email,
            telefone: item.telefone || '',
            assunto: `Resposta: ${item.assunto}`,
            lida: false,
          }),
        },
      })
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
      <p v-if="mensagens.length === 0">Nenhuma mensagem encontrada.</p>
      <div v-for="item in mensagens" :key="item.id" class="card">
        <strong>Mensagem {{ item.id }}</strong>
        <p>Hospedagem: {{ item.hospedagem }} | De: {{ item.nome }}</p>
        <p>E-mail: {{ item.email }} | Telefone: {{ item.telefone || 'Não informado' }}</p>
        <p>Assunto: {{ item.assunto }}</p>
        <p>{{ item.mensagem }}</p>
        <p>Lida: {{ item.lida ? 'Sim' : 'Não' }}</p>

        <div class="acoes">
          <button class="botao responder" @click="responder(item)">Responder</button>
          <button class="botao excluir" @click="excluir(item.id)">Excluir</button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.container { padding: 16px; min-height: 200px; }
.carregando { text-align: center; padding: 40px; }
.card { background-color: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 14px; margin-bottom: 12px; }
.card p { margin: 4px 0; line-height: 1.4; }
.acoes { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
.botao { border-radius: 4px; padding: 8px 12px; border: none; color: #fff; cursor: pointer; }
.responder { background-color: #2563eb; }
.excluir { background-color: #dc2626; }
</style>
