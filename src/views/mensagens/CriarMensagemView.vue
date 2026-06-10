<script>
import CaixaTexto from '@/components/CaixaTexto.vue'
import { api, endpoints, mensagemErro } from '@/services/api'

export default {
  name: 'CriarMensagemView',
  components: { CaixaTexto },
  data() {
    const vi = this.$route.query.valoresIniciais ? JSON.parse(this.$route.query.valoresIniciais) : {}
    return {
      hospedagem: String(vi.hospedagem ?? ''),
      nome: String(vi.nome ?? ''),
      email: String(vi.email ?? ''),
      telefone: String(vi.telefone ?? ''),
      assunto: String(vi.assunto ?? ''),
      mensagem: String(vi.mensagem ?? ''),
      lida: Boolean(vi.lida),
      salvando: false,
      ocultarHospedagem: Boolean(vi.hospedagem),
    }
  },
  methods: {
    async salvar() {
      try {
        this.salvando = true
        await api.post(endpoints.mensagens, {
          hospedagem: Number(this.hospedagem),
          nome: this.nome,
          email: this.email,
          telefone: this.telefone,
          assunto: this.assunto,
          mensagem: this.mensagem,
          lida: this.lida,
        })
        this.$router.back()
      } catch (e) {
        alert(mensagemErro(e, 'Não foi possível salvar os dados.'))
      } finally {
        this.salvando = false
      }
    },
  },
}
</script>

<template>
  <div class="container">
    <CaixaTexto v-if="!ocultarHospedagem" label="ID da Hospedagem" v-model="hospedagem" tipo="number" />
    <CaixaTexto label="Nome" v-model="nome" />
    <CaixaTexto label="E-mail" v-model="email" tipo="email" />
    <CaixaTexto label="Telefone" v-model="telefone" />
    <CaixaTexto label="Assunto" v-model="assunto" />
    <CaixaTexto label="Mensagem" v-model="mensagem" multiLinha />

    <div v-if="!ocultarHospedagem" class="linha">
      <label class="label">Lida</label>
      <label class="switch">
        <input type="checkbox" v-model="lida" />
        <span class="slider"></span>
      </label>
    </div>

    <button class="botao" @click="salvar" :disabled="salvando" type="button">
      {{ salvando ? 'Salvando...' : 'Salvar' }}
    </button>
  </div>
</template>

<style scoped>
.container { padding: 16px; }
.linha { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.label { font-weight: bold; }
.switch { position: relative; display: inline-block; width: 44px; height: 24px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; border-radius: 24px; }
.slider::before { content: ''; position: absolute; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; border-radius: 50%; }
input:checked + .slider { background-color: #2563eb; }
input:checked + .slider::before { transform: translateX(20px); }
.botao { background-color: #2563eb; border-radius: 6px; padding: 14px; width: 100%; border: none; color: #fff; font-weight: bold; cursor: pointer; font-size: 14px; }
.botao:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
