<script>
import CaixaTexto from '@/components/CaixaTexto.vue'
import { api, endpoints, mensagemErro } from '@/services/api'

const METODOS = [
  { valor: 'cartao_credito', nome: 'Cartão de crédito' },
  { valor: 'cartao_debito', nome: 'Cartão de débito' },
  { valor: 'pix', nome: 'PIX' },
  { valor: 'boleto', nome: 'Boleto' },
  { valor: 'dinheiro', nome: 'Dinheiro' },
]

export default {
  name: 'CriarPagamentoView',
  components: { CaixaTexto },
  data() {
    const vi = this.$route.query.valoresIniciais ? JSON.parse(this.$route.query.valoresIniciais) : {}
    return {
      reserva: String(vi.reserva ?? ''),
      valor: String(vi.valor ?? ''),
      metodo: '',
      salvando: false,
      metodos: METODOS,
      bloquearReserva: Boolean(vi.reserva),
    }
  },
  methods: {
    async salvar() {
      try {
        this.salvando = true
        await api.post(endpoints.pagamentos, {
          reserva: Number(this.reserva),
          valor: Number(this.valor),
          metodo: this.metodo,
          status: 'pago',
        })
        this.$router.push({ name: 'Reservas' })
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
    <CaixaTexto label="ID da Reserva" v-model="reserva" tipo="number" :readonly="bloquearReserva" />
    <CaixaTexto label="Valor (R$)" v-model="valor" tipo="number" />

    <div class="campo">
      <label class="label">Método</label>
      <div class="selecao-container">
        <button
          v-for="opcao in metodos"
          :key="opcao.valor"
          :class="['selecao-botao', { ativo: metodo === opcao.valor }]"
          @click="metodo = opcao.valor"
          type="button"
        >
          {{ opcao.nome }}
        </button>
      </div>
    </div>

    <button class="botao" @click="salvar" :disabled="salvando" type="button">
      {{ salvando ? 'Salvando...' : 'Pagar' }}
    </button>
  </div>
</template>

<style scoped>
.container { padding: 16px; }
.campo { margin-bottom: 12px; }
.label { font-weight: bold; display: block; margin-bottom: 4px; }
.selecao-container { display: flex; flex-wrap: wrap; gap: 8px; }
.selecao-botao { border: 1px solid #ccc; border-radius: 6px; padding: 8px 14px; background-color: #fff; color: #333; cursor: pointer; }
.selecao-botao.ativo { background-color: #2563eb; border-color: #2563eb; color: #fff; font-weight: bold; }
.botao { background-color: #2563eb; border-radius: 6px; padding: 14px; width: 100%; border: none; color: #fff; font-weight: bold; cursor: pointer; font-size: 14px; }
.botao:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
