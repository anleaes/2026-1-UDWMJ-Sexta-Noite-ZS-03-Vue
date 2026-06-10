<script>
import CaixaTexto from '@/components/CaixaTexto.vue'
import { api, endpoints, mensagemErro } from '@/services/api'
import { brParaIso } from '@/utils/date'

const STATUS = [
  { valor: 'pendente', nome: 'Pendente' },
  { valor: 'confirmada', nome: 'Confirmada' },
  { valor: 'cancelada', nome: 'Cancelada' },
  { valor: 'finalizada', nome: 'Finalizada' },
]

export default {
  name: 'CriarReservaView',
  components: { CaixaTexto },
  data() {
    const vi = this.$route.query.valoresIniciais ? JSON.parse(this.$route.query.valoresIniciais) : {}
    return {
      hospedagem: String(vi.hospedagem ?? ''),
      hospede: String(vi.hospede ?? ''),
      dataCheckin: '',
      dataCheckout: '',
      quantidadeHospedes: String(vi.quantidade_hospedes ?? ''),
      valorTotal: String(vi.valor_total ?? ''),
      status: vi.status || 'pendente',
      salvando: false,
      deveOcultarIds: Boolean(vi.hospedagem && vi.hospede),
      precoDiaria: Number(vi.preco_diaria) || 0,
      statusOpcoes: STATUS,
    }
  },
  watch: {
    dataCheckin() { this.calcularValorTotal() },
    dataCheckout() { this.calcularValorTotal() },
  },
  methods: {
    calcularValorTotal() {
      if (!this.precoDiaria || !this.dataCheckin || !this.dataCheckout) return
      const isoIn = brParaIso(this.dataCheckin)
      const isoOut = brParaIso(this.dataCheckout)
      if (!isoIn || !isoOut) return
      const checkin = new Date(`${isoIn}T00:00:00`)
      const checkout = new Date(`${isoOut}T00:00:00`)
      const dias = (checkout.getTime() - checkin.getTime()) / (1000 * 60 * 60 * 24)
      if (dias > 0) {
        this.valorTotal = (dias * this.precoDiaria).toFixed(2)
      }
    },
    async salvar() {
      try {
        this.salvando = true
        const dados = {
          hospedagem: Number(this.hospedagem),
          hospede: Number(this.hospede),
          data_checkin: brParaIso(this.dataCheckin),
          data_checkout: brParaIso(this.dataCheckout),
          quantidade_hospedes: Number(this.quantidadeHospedes),
          valor_total: Number(this.valorTotal),
          status: this.status,
        }
        const resposta = await api.post(endpoints.reservas, dados)
        this.$router.push({
          name: 'CriarPagamento',
          query: {
            valoresIniciais: JSON.stringify({
              reserva: resposta.data.id,
              hospedagem: resposta.data.hospedagem ?? dados.hospedagem,
              valor: resposta.data.valor_total ?? dados.valor_total,
              status: 'pago',
            }),
          },
        })
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
    <template v-if="!deveOcultarIds">
      <CaixaTexto label="ID da Hospedagem" v-model="hospedagem" tipo="number" />
      <CaixaTexto label="ID do Hóspede" v-model="hospede" tipo="number" />
    </template>
    <CaixaTexto label="Data de Check-in (DD/MM/AAAA)" v-model="dataCheckin" />
    <CaixaTexto label="Data de Check-out (DD/MM/AAAA)" v-model="dataCheckout" />
    <CaixaTexto label="Quantidade de hóspedes" v-model="quantidadeHospedes" tipo="number" />
    <CaixaTexto label="Valor Total (R$)" v-model="valorTotal" tipo="number" :readonly="precoDiaria > 0" />

    <div v-if="!deveOcultarIds" class="campo">
      <label class="label">Status</label>
      <div class="selecao-container">
        <button
          v-for="opcao in statusOpcoes"
          :key="opcao.valor"
          :class="['selecao-botao', { ativo: status === opcao.valor }]"
          @click="status = opcao.valor"
          type="button"
        >
          {{ opcao.nome }}
        </button>
      </div>
    </div>

    <button class="botao" @click="salvar" :disabled="salvando" type="button">
      {{ salvando ? 'Salvando...' : 'Ir para pagamento' }}
    </button>
  </div>
</template>

<style scoped>
.container { padding: 16px; }
.campo { margin-bottom: 12px; }
.label { font-weight: bold; display: block; margin-bottom: 4px; }
.selecao-container { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
.selecao-botao { border: 1px solid #ccc; border-radius: 6px; padding: 8px 14px; background-color: #fff; color: #333; cursor: pointer; }
.selecao-botao.ativo { background-color: #2563eb; border-color: #2563eb; color: #fff; font-weight: bold; }
.botao { background-color: #2563eb; border-radius: 6px; padding: 14px; width: 100%; border: none; color: #fff; font-weight: bold; cursor: pointer; font-size: 14px; }
.botao:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
