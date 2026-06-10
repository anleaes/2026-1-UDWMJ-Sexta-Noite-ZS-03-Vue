<script>
import CaixaTexto from './CaixaTexto.vue'
import { api, mensagemErro } from '@/services/api'
import { isoParaBr, brParaIso } from '@/utils/date'

export default {
  name: 'TelaFormulario',
  components: { CaixaTexto },
  props: {
    titulo: { type: String, required: true },
    endpoint: { type: String, required: true },
    campos: { type: Array, required: true },
  },
  data() {
    const item = this.recuperarItem()
    const valores = {}
    for (const campo of this.campos) {
      let valor = item?.[campo.nome] ?? campo.valorPadrao ?? ''
      if (campo.separadoPorVirgula && Array.isArray(valor)) {
        valor = valor.join(',')
      }
      if (campo.data && valor) {
        valor = isoParaBr(String(valor))
      }
      valores[campo.nome] = String(valor)
    }
    return {
      valores,
      salvando: false,
      item,
      opcoes: {},
    }
  },
  emits: ['salvo'],
  methods: {
    recuperarItem() {
      return this.$route.query.item ? JSON.parse(this.$route.query.item) : null
    },
    alterar(nome, valor) {
      this.valores[nome] = valor
    },
    alternarMulti(nome, id) {
      const atual = this.valores[nome] ? this.valores[nome].split(',').filter(Boolean) : []
      const idx = atual.indexOf(id)
      if (idx >= 0) {
        atual.splice(idx, 1)
      } else {
        atual.push(id)
      }
      this.valores[nome] = atual.join(',')
    },
    async salvar() {
      try {
        this.salvando = true
        const dados = { ...this.valores }

        for (const campo of this.campos) {
          if (campo.numero && dados[campo.nome] !== '') {
            dados[campo.nome] = Number(dados[campo.nome])
          }
          if (campo.separadoPorVirgula) {
            const texto = String(dados[campo.nome] || '')
            dados[campo.nome] = texto
              ? texto.split(',').map((v) => Number(v.trim()))
              : []
          }
          if (campo.booleano) {
            dados[campo.nome] = Boolean(dados[campo.nome])
          }
          if (campo.data && dados[campo.nome]) {
            dados[campo.nome] = brParaIso(String(dados[campo.nome]))
          }
        }

        if (this.item) {
          await api.put(`${this.endpoint}${this.item.id}/`, dados)
        } else {
          await api.post(this.endpoint, dados)
        }

        this.$emit('salvo')
        this.$router.back()
      } catch (e) {
        alert(mensagemErro(e, 'Não foi possível salvar os dados.'))
      } finally {
        this.salvando = false
      }
    },
    voltar() {
      this.$router.back()
    },
    async carregarOpcoes(campo) {
      if (!campo.endpointOpcoes || this.opcoes[campo.nome]) return
      try {
        const resposta = await api.get(campo.endpointOpcoes)
        this.opcoes[campo.nome] = resposta.data
      } catch {
        this.opcoes[campo.nome] = []
      }
    },
  },
  mounted() {
    for (const campo of this.campos) {
      if (campo.endpointOpcoes) {
        this.carregarOpcoes(campo)
      }
    }
  },
}
</script>

<template>
  <div class="container">
    <div v-for="campo in campos" :key="campo.nome">
      <template v-if="campo.booleano">
        <div class="linha">
          <label class="label">{{ campo.label }}</label>
          <label class="switch">
            <input type="checkbox" :checked="valores[campo.nome] === 'true'" @change="alterar(campo.nome, $event.target.checked ? 'true' : 'false')" />
            <span class="slider"></span>
          </label>
        </div>
      </template>

      <template v-else-if="campo.opcoes">
        <div class="campo-texto">
          <label class="label">{{ campo.label }}</label>
          <div class="selecao-container">
            <button
              v-for="opcao in campo.opcoes"
              :key="opcao.valor"
              :class="['selecao-botao', { ativo: valores[campo.nome] === opcao.valor }]"
              @click="alterar(campo.nome, opcao.valor)"
              type="button"
            >
              {{ opcao.nome }}
            </button>
          </div>
        </div>
      </template>

      <template v-else-if="campo.endpointOpcoes">
        <div class="campo-texto">
          <label class="label">{{ campo.label }}</label>
          <div class="selecao-container">
            <button
              v-for="opcao in (campo.multiSelecao ? (opcoes[campo.nome] || []) : (opcoes[campo.nome] || []))"
              :key="opcao.id"
              :class="['selecao-botao', { ativo: campo.multiSelecao ? valores[campo.nome]?.split(',').includes(String(opcao.id)) : valores[campo.nome] === String(opcao.id) }]"
              @click="campo.multiSelecao ? alternarMulti(campo.nome, String(opcao.id)) : alterar(campo.nome, String(opcao.id))"
              type="button"
            >
              {{ campo.fmtOpcao ? campo.fmtOpcao(opcao) : opcao.nome || opcao.logradouro + ', ' + opcao.numero + ' - ' + opcao.cidade + '/' + opcao.estado }}
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <CaixaTexto
          :label="campo.label"
          :modelValue="valores[campo.nome]"
          @update:modelValue="alterar(campo.nome, $event)"
          :tipo="campo.tipo || 'text'"
          :multiLinha="campo.multiLinha || false"
          :readonly="campo.readonly || false"
        />
      </template>
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
.linha {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.label {
  font-weight: bold;
  display: block;
  margin-bottom: 4px;
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
  transition: 0.3s;
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
  transition: 0.3s;
}
input:checked + .slider {
  background-color: #2563eb;
}
input:checked + .slider::before {
  transform: translateX(20px);
}
.selecao-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
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
