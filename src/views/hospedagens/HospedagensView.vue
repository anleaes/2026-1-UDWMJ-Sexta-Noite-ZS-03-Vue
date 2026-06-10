<script>
import { api, mensagemErro } from '@/services/api'

export default {
  name: 'HospedagensView',
  data() {
    return {
      hospedagens: [],
      enderecos: {},
      comodidades: {},
      carregando: true,
      tipoLogin: '',
      hospedeId: null,
    }
  },
  computed: {
    ehAnfitriao() {
      return this.tipoLogin === 'anfitriao'
    },
    ehHospede() {
      return this.tipoLogin === 'hospede'
    },
  },
  methods: {
    async carregar() {
      try {
        this.carregando = true
        const [respHosp, respEnd, respCom] = await Promise.all([
          api.get('/hospedagens/'),
          api.get('/enderecos/'),
          api.get('/comodidades/'),
        ])
        this.hospedagens = respHosp.data
        this.enderecos = Object.fromEntries(respEnd.data.map((e) => [e.id, e]))
        this.comodidades = Object.fromEntries(respCom.data.map((c) => [c.id, c]))
      } catch (e) {
        alert(mensagemErro(e, 'Não foi possível carregar as hospedagens.'))
      } finally {
        this.carregando = false
      }
    },
    descreverEndereco(id) {
      const e = this.enderecos[id]
      if (!e) return `Endereço: ${id}`
      return `${e.logradouro}, ${e.numero} - ${e.bairro}, ${e.cidade}/${e.estado} - CEP ${e.cep}`
    },
    descreverComodidades(ids) {
      if (!ids || ids.length === 0) return 'Nenhuma comodidade'
      return ids.map((id) => this.comodidades[id]?.nome || '').filter(Boolean).join(', ') || 'Nenhuma comodidade'
    },
    async excluir(id) {
      if (!confirm('Deseja excluir esta hospedagem?')) return
      try {
        await api.delete(`/hospedagens/${id}/`)
        await this.carregar()
      } catch (e) {
        alert(mensagemErro(e, 'Não foi possível excluir a hospedagem.'))
      }
    },
    editar(item) {
      this.$router.push({ name: 'EditarHospedagem', params: { id: item.id }, query: { item: JSON.stringify(item) } })
    },
    reservar(item) {
      if (!this.hospedeId) {
        alert('Não foi possível identificar o hóspede logado.')
        return
      }
      this.$router.push({
        name: 'CriarReserva',
        query: {
          valoresIniciais: JSON.stringify({
            hospedagem: item.id,
            hospede: this.hospedeId,
            preco_diaria: item.preco_diaria,
            quantidade_hospedes: 1,
            valor_total: '0.00',
            status: 'pendente',
          }),
        },
      })
    },
    criar() {
      this.$router.push({ name: 'CriarHospedagem' })
    },
  },
  mounted() {
    this.tipoLogin = this.$route.meta.tipoLogin || ''
    this.hospedeId = this.$route.meta.hospedeId || null
    this.carregar()
  },
}
</script>

<template>
  <div class="container">
    <div v-if="carregando" class="carregando">Carregando...</div>
    <template v-else>
      <p v-if="hospedagens.length === 0">Nenhuma hospedagem encontrada.</p>
      <div v-for="item in hospedagens" :key="item.id" class="card">
        <strong>{{ item.titulo }}</strong>
        <p>{{ item.descricao }}</p>
        <p>Tipo: {{ item.tipo }} | Diária: R$ {{ item.preco_diaria }}</p>
        <p>Capacidade: {{ item.capacidade }} | Quartos: {{ item.quartos }} | Banheiros: {{ item.banheiros }}</p>
        <p>Endereço: {{ descreverEndereco(item.endereco) }}</p>
        <p>Comodidades: {{ descreverComodidades(item.comodidades) }}</p>

        <div class="acoes">
          <template v-if="ehAnfitriao">
            <button class="botao editar" @click="editar(item)">Editar</button>
            <button class="botao excluir" @click="excluir(item.id)">Excluir</button>
          </template>
          <template v-if="ehHospede">
            <button class="botao reservar" @click="reservar(item)">Reservar</button>
          </template>
        </div>
      </div>
    </template>
    <button v-if="ehAnfitriao" class="adicionar" @click="criar">+</button>
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
.card p {
  margin: 4px 0;
  line-height: 1.4;
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
.reservar {
  background-color: #16a34a;
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
