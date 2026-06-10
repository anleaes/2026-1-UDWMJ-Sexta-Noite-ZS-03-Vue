<script>
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import {
  carregarToken,
  obterPerfilLogin,
  registrarNaoAutorizado,
  sair,
  salvarSessaoStorage,
} from '@/services/api'
import { setSessao } from '@/router'
import LoginView from '@/views/LoginView.vue'

export default {
  name: 'App',
  components: { LoginView },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const token = ref(null)
    const tipoLogin = ref(null)
    const hospedeId = ref(null)
    const anfitriaoId = ref(null)
    const carregando = ref(true)

    registrarNaoAutorizado(() => {
      token.value = null
      tipoLogin.value = null
      hospedeId.value = null
      anfitriaoId.value = null
      setSessao(null)
      router.push({ name: 'login' })
    })

    async function carregarSessao() {
      const tokenSalvo = await carregarToken()

      if (!tokenSalvo) {
        carregando.value = false
        return
      }

      try {
        const perfil = await obterPerfilLogin()
        aplicarSessao({
          token: tokenSalvo,
          tipoLogin: perfil.tipo_login,
          hospedeId: perfil.hospede_id,
          anfitriaoId: perfil.anfitriao_id,
        })
      } catch {
        await fazerLogout()
      } finally {
        carregando.value = false
      }
    }

    function aplicarSessao(sessao) {
      token.value = sessao.token
      tipoLogin.value = sessao.tipoLogin
      hospedeId.value = sessao.hospedeId
      anfitriaoId.value = sessao.anfitriaoId
      salvarSessaoStorage(sessao)
      setSessao(sessao)
    }

    function aoLogar(sessao) {
      aplicarSessao(sessao)
      router.push({ name: 'home' })
    }

    async function fazerLogout() {
      await sair()
      token.value = null
      tipoLogin.value = null
      hospedeId.value = null
      anfitriaoId.value = null
      setSessao(null)
      router.push({ name: 'login' })
    }

    const itensMenu = computed(() => {
      const t = tipoLogin.value
      const ehAdmin = !t

      const itens = []

      if (ehAdmin) {
        itens.push(
          { nome: 'Início', rota: 'home' },
          { nome: 'Usuários', rota: 'Usuarios' },
          { nome: 'Hóspedes', rota: 'Hospedes' },
          { nome: 'Anfitriões', rota: 'Anfitrioes' },
        )
      }

      if (t === 'anfitriao') {
        itens.push({ nome: 'Endereços', rota: 'Enderecos' })
      }

      itens.push({ nome: 'Hospedagens', rota: 'Hospedagens' })
      itens.push({ nome: 'Reservas', rota: 'Reservas' })

      if (t === 'hospede') {
        itens.push({ nome: 'Pagamentos', rota: 'Pagamentos' })
      }

      itens.push({ nome: 'Mensagens', rota: 'Mensagens' })
      itens.push({ nome: 'Avaliações', rota: 'Avaliacoes' })

      if (t === 'anfitriao') {
        itens.push({ nome: 'Comodidades', rota: 'Comodidades' })
      }

      return itens
    })

    function menuAtivo(itemRota) {
      return route.name === itemRota
    }

    carregarSessao()

    return {
      token,
      tipoLogin,
      hospedeId,
      anfitriaoId,
      carregando,
      aoLogar,
      fazerLogout,
      itensMenu,
      menuAtivo,
    }
  },
}
</script>

<template>
  <div v-if="carregando" class="carregando-tela">Carregando...</div>

  <div v-else-if="!token" class="login-tela">
    <LoginView @login="aoLogar" />
  </div>

  <div v-else class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Hospedaria</h2>
      </div>
      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in itensMenu"
          :key="item.rota"
          :to="{ name: item.rota }"
          class="menu-item"
          :class="{ ativo: menuAtivo(item.rota) }"
        >
          {{ item.nome }}
        </RouterLink>
      </nav>
      <div class="sidebar-footer">
        <button class="botao-sair" @click="fazerLogout">Sair</button>
      </div>
    </aside>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>

<style scoped>
.carregando-tela {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
}

.login-tela {
  min-height: 100vh;
  background: #f5f5f5;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
}

.sidebar-header {
  padding: 20px;
  background-color: #4B7BE5;
  color: #fff;
  text-align: center;
}

.sidebar-header h2 {
  font-size: 18px;
  font-weight: 600;
}

.sidebar-nav {
  flex: 1;
  padding-top: 10px;
  overflow-y: auto;
}

.menu-item {
  display: block;
  padding: 12px 20px;
  font-size: 16px;
  color: #333;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

.menu-item.ativo {
  background-color: #e8f0fe;
  color: #4B7BE5;
  font-weight: 600;
  border-right: 3px solid #4B7BE5;
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid #e0e0e0;
}

.botao-sair {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #dc2626;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

.main-content {
  margin-left: 250px;
  flex: 1;
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
