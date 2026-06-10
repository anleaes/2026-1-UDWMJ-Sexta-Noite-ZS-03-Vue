<script>
import CaixaTexto from '@/components/CaixaTexto.vue'
import { api, mensagemErro } from '@/services/api'

const TIPOS = [
  { valor: 'casa', nome: 'Casa' },
  { valor: 'apartamento', nome: 'Apartamento' },
  { valor: 'quarto', nome: 'Quarto' },
  { valor: 'hostel', nome: 'Hostel' },
  { valor: 'pousada', nome: 'Pousada' },
]

export default {
  name: 'CriarHospedagemView',
  components: { CaixaTexto },
  data() {
    return {
      titulo: '',
      descricao: '',
      tipo: '',
      endereco: '',
      comodidadesSelecionadas: [],
      precoDiaria: '',
      capacidade: '',
      quartos: '',
      banheiros: '',
      ativo: true,
      enderecos: [],
      comodidades: [],
      salvando: false,
      tipos: TIPOS,
    }
  },
  methods: {
    async carregarOpcoes() {
      try {
        const [respEnd, respCom] = await Promise.all([
          api.get('/enderecos/'),
          api.get('/comodidades/'),
        ])
        this.enderecos = respEnd.data
        this.comodidades = respCom.data
      } catch (e) {
        alert(mensagemErro(e, 'Não foi possível carregar as opções.'))
      }
    },
    alternarComodidade(id) {
      const idx = this.comodidadesSelecionadas.indexOf(id)
      if (idx >= 0) {
        this.comodidadesSelecionadas.splice(idx, 1)
      } else {
        this.comodidadesSelecionadas.push(id)
      }
    },
    async salvar() {
      try {
        this.salvando = true
        await api.post('/hospedagens/', {
          titulo: this.titulo,
          descricao: this.descricao,
          tipo: this.tipo,
          endereco: Number(this.endereco),
          comodidades: this.comodidadesSelecionadas.map(Number),
          preco_diaria: Number(this.precoDiaria),
          capacidade: Number(this.capacidade),
          quartos: Number(this.quartos),
          banheiros: Number(this.banheiros),
          ativo: this.ativo,
        })
        this.$router.back()
      } catch (e) {
        alert(mensagemErro(e, 'Não foi possível salvar os dados.'))
      } finally {
        this.salvando = false
      }
    },
  },
  mounted() {
    this.carregarOpcoes()
  },
}
</script>

<template>
  <div class="container">
    <CaixaTexto label="Título" v-model="titulo" />
    <CaixaTexto label="Descrição" v-model="descricao" multiLinha />

    <div class="campo">
      <label class="label">Tipo</label>
      <div class="selecao-container">
        <button
          v-for="opcao in tipos"
          :key="opcao.valor"
          :class="['selecao-botao', { ativo: tipo === opcao.valor }]"
          @click="tipo = opcao.valor"
          type="button"
        >
          {{ opcao.nome }}
        </button>
      </div>
    </div>

    <div class="campo">
      <label class="label">Endereço</label>
      <div class="selecao-container">
        <button
          v-for="opcao in enderecos"
          :key="opcao.id"
          :class="['selecao-botao', { ativo: endereco === String(opcao.id) }]"
          @click="endereco = String(opcao.id)"
          type="button"
        >
          {{ opcao.logradouro }}, {{ opcao.numero }} - {{ opcao.cidade }}/{{ opcao.estado }}
        </button>
      </div>
    </div>

    <div class="campo">
      <label class="label">Comodidades</label>
      <div class="selecao-container">
        <button
          v-for="opcao in comodidades"
          :key="opcao.id"
          :class="['selecao-botao', { ativo: comodidadesSelecionadas.includes(String(opcao.id)) }]"
          @click="alternarComodidade(String(opcao.id))"
          type="button"
        >
          {{ opcao.nome }}
        </button>
      </div>
    </div>

    <CaixaTexto label="Preço da diária (R$)" v-model="precoDiaria" tipo="number" />
    <CaixaTexto label="Capacidade" v-model="capacidade" tipo="number" />
    <CaixaTexto label="Quartos" v-model="quartos" tipo="number" />
    <CaixaTexto label="Banheiros" v-model="banheiros" tipo="number" />

    <div class="linha">
      <label class="label">Ativo</label>
      <label class="switch">
        <input type="checkbox" v-model="ativo" />
        <span class="slider"></span>
      </label>
    </div>

    <button class="botao" @click="salvar" :disabled="salvando" type="button">
      {{ salvando ? 'Salvando...' : 'Salvar' }}
    </button>
  </div>
</template>

<style scoped>
.container {
  padding: 16px;
}
.campo {
  margin-bottom: 12px;
}
.label {
  font-weight: bold;
  display: block;
  margin-bottom: 4px;
}
.selecao-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.selecao-botao {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 14px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
}
.selecao-botao.ativo {
  background-color: #2563eb;
  border-color: #2563eb;
  color: #fff;
  font-weight: bold;
}
.linha {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 24px;
}
.slider::before {
  content: '';
  position: absolute;
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #2563eb;
}
input:checked + .slider::before {
  transform: translateX(20px);
}
.botao {
  background-color: #2563eb;
  border-radius: 6px;
  padding: 14px;
  width: 100%;
  border: none;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
}
.botao:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
