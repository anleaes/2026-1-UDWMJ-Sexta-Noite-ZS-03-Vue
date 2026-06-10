<script>
import { api, endpoints, listaDaResposta, mensagemErro } from '@/services/api'
import { isoParaBr } from '@/utils/date'

export default {
  name: 'ReservasView',
  data() {
    return {
      reservas: [],
      carregando: true,
      tipoLogin: '',
      hospedeId: null,
    }
  },
  computed: {
    ehHospede() {
      return this.tipoLogin === 'hospede'
    },
  },
  methods: {
    isoParaBr,
    async carregar() {
      try {
        this.carregando = true
        const resposta = await api.get(endpoints.reservas)
        this.reservas = listaDaResposta(resposta.data)
      } catch (e) {
        alert(mensagemErro(e, 'Não foi possível carregar as reservas.'))
      } finally {
        this.carregando = false
      }
    },
    async excluir(id) {
      if (!confirm('Deseja excluir esta reserva?')) return
      try {
        await api.delete(`${endpoints.reservas}${id}/`)
        await this.carregar()
      } catch (e) {
        alert(mensagemErro(e, 'Não foi possível excluir a reserva.'))
      }
    },
    editar(item) {
      this.$router.push({ name: 'EditarReserva', params: { id: item.id }, query: { item: JSON.stringify(item) } })
    },
    irParaPagamento(reserva) {
      this.$router.push({
        name: 'CriarPagamento',
        query: {
          valoresIniciais: JSON.stringify({
            reserva: reserva.id,
            hospedagem: reserva.hospedagem,
            valor: reserva.valor_total,
            status: 'pago',
          }),
        },
      })
    },
    mandarMensagem(reserva) {
      this.$router.push({
        name: 'CriarMensagem',
        query: {
          valoresIniciais: JSON.stringify({
            hospedagem: reserva.hospedagem,
            assunto: `Reserva ${reserva.id}`,
            lida: false,
          }),
        },
      })
    },
    criar() {
      this.$router.push({ name: 'CriarReserva' })
    },
  },
  mounted() {
    this.tipoLogin = this.$route.meta.tipoLogin || ''
    this.carregar()
  },
}
</script>

<template>
  <div class="container">
    <div v-if="carregando" class="carregando">Carregando...</div>
    <template v-else>
      <p v-if="reservas.length === 0">Nenhuma reserva encontrada.</p>
      <div v-for="item in reservas" :key="item.id" class="card">
        <strong>Reserva {{ item.id }}</strong>
        <p>Hospedagem: {{ item.hospedagem }} | Hóspede: {{ item.hospede }}</p>
        <p>Check-in: {{ isoParaBr(item.data_checkin) }} | Check-out: {{ isoParaBr(item.data_checkout) }}</p>
        <p>Hóspedes: {{ item.quantidade_hospedes }} | Total: R$ {{ item.valor_total }}</p>
        <p>Status: {{ item.status }}</p>

        <div class="acoes">
          <template v-if="ehHospede">
            <button class="botao pagamento" @click="irParaPagamento(item)">Ir para pagamento</button>
            <button class="botao mensagem" @click="mandarMensagem(item)">Mensagem</button>
          </template>
          <template v-else>
            <button class="botao editar" @click="editar(item)">Editar</button>
            <button class="botao excluir" @click="excluir(item.id)">Excluir</button>
          </template>
        </div>
      </div>
    </template>
    <button v-if="!ehHospede" class="adicionar" @click="criar">+</button>
  </div>
</template>

<style scoped>
.container { padding: 16px; position: relative; min-height: 200px; }
.carregando { text-align: center; padding: 40px; }
.card { background-color: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 14px; margin-bottom: 12px; }
.card p { margin: 4px 0; line-height: 1.4; }
.acoes { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
.botao { border-radius: 4px; padding: 8px 12px; border: none; color: #fff; cursor: pointer; }
.editar { background-color: #2563eb; }
.excluir { background-color: #dc2626; }
.pagamento { background-color: #16a34a; }
.mensagem { background-color: #2563eb; }
.adicionar { position: fixed; right: 20px; bottom: 20px; width: 56px; height: 56px; border-radius: 28px; border: none; background-color: #2563eb; color: #fff; font-size: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; }
</style>
