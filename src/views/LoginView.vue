<script>
import { entrar, cadastrar, salvarSessaoStorage } from '@/services/api'

export default {
  name: 'LoginView',
  data() {
    return {
      tipoLogin: null,
      modoFormulario: 'login',
      username: '',
      email: '',
      password: '',
      carregando: false,
    }
  },
  methods: {
    selecionarTipo(tipo) {
      this.tipoLogin = tipo
    },
    async fazerLogin() {
      if (!this.username || !this.password) {
        alert('Informe usuário e senha.')
        return
      }
      try {
        this.carregando = true
        const sessao = await entrar(this.username, this.password)
        salvarSessaoStorage(sessao)
        this.$emit('login', sessao)
      } catch (e) {
        const msg = e.response?.data?.erro || e.response?.data?.detail || 'Usuário ou senha inválidos.'
        alert(msg)
      } finally {
        this.carregando = false
      }
    },
    async fazerCadastro() {
      if (!this.tipoLogin) {
        alert('Escolha o tipo de cadastro.')
        return
      }
      if (!this.username || !this.email || !this.password) {
        alert('Informe usuário, e-mail e senha.')
        return
      }
      try {
        this.carregando = true
        const sessao = await cadastrar(this.username, this.password, this.email, this.tipoLogin)
        salvarSessaoStorage(sessao)
        this.$emit('login', sessao)
      } catch (e) {
        const msg = e.response?.data?.erro || e.response?.data?.detail || 'Não foi possível criar o cadastro. Verifique se o backend está rodando em ' + (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000')
        alert(msg)
      } finally {
        this.carregando = false
      }
    },
    alternarModo() {
      this.modoFormulario = this.modoFormulario === 'cadastro' ? 'login' : 'cadastro'
      this.tipoLogin = null
    },
  },
}
</script>

<template>
  <div class="login-container">
    <h1 class="titulo">{{ modoFormulario === 'cadastro' ? 'Criar cadastro' : 'Login' }}</h1>

    <div v-if="modoFormulario === 'cadastro'" class="tipos">
      <p class="subtitulo">Escolha o tipo de cadastro</p>
      <div class="linha-opcoes">
        <button
          :class="['botao-opcao', { ativo: tipoLogin === 'anfitriao' }]"
          @click="selecionarTipo('anfitriao')"
          type="button"
        >
          Anfitrião
        </button>
        <button
          :class="['botao-opcao', { ativo: tipoLogin === 'hospede' }]"
          @click="selecionarTipo('hospede')"
          type="button"
        >
          Hóspede
        </button>
      </div>
    </div>

    <input class="input" type="text" placeholder="Usuário" v-model="username" autocomplete="off" />

    <input
      v-if="modoFormulario === 'cadastro'"
      class="input"
      type="email"
      placeholder="E-mail"
      v-model="email"
      autocomplete="off"
    />

    <input class="input" type="password" placeholder="Senha" v-model="password" autocomplete="off" />

    <button
      class="botao"
      @click="modoFormulario === 'cadastro' ? fazerCadastro() : fazerLogin()"
      :disabled="carregando"
      type="button"
    >
      {{ carregando ? 'Carregando...' : (modoFormulario === 'cadastro' ? 'Cadastrar' : 'Entrar') }}
    </button>

    <button class="botao-secundario" @click="alternarModo" :disabled="carregando" type="button">
      {{ modoFormulario === 'cadastro' ? 'Já tenho cadastro' : 'Criar cadastro' }}
    </button>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 24px;
  background: #f7f7f7;
  border-radius: 8px;
}
.titulo {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
}
.subtitulo {
  text-align: center;
  margin-bottom: 12px;
  color: #555;
}
.tipos {
  margin-bottom: 12px;
}
.linha-opcoes {
  display: flex;
  gap: 10px;
}
.botao-opcao {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 6px;
  background-color: #2563eb;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
.botao-opcao.ativo {
  background-color: #1d4ed8;
}
.input {
  width: 100%;
  padding: 14px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
}
.botao {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 6px;
  background-color: #2563eb;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
}
.botao:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.botao-secundario {
  width: 100%;
  padding: 14px;
  border: none;
  background: transparent;
  color: #2563eb;
  font-weight: bold;
  cursor: pointer;
  margin-top: 8px;
}
</style>
