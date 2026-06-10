import { createRouter, createWebHistory } from 'vue-router'
import { carregarToken, carregarSessaoStorage } from '@/services/api'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

import UsuariosView from '@/views/usuarios/UsuariosView.vue'
import CriarUsuarioView from '@/views/usuarios/CriarUsuarioView.vue'
import EditarUsuarioView from '@/views/usuarios/EditarUsuarioView.vue'

import HospedesView from '@/views/hospedes/HospedesView.vue'
import CriarHospedeView from '@/views/hospedes/CriarHospedeView.vue'
import EditarHospedeView from '@/views/hospedes/EditarHospedeView.vue'

import AnfitrioesView from '@/views/anfitrioes/AnfitrioesView.vue'
import CriarAnfitriaoView from '@/views/anfitrioes/CriarAnfitriaoView.vue'
import EditarAnfitriaoView from '@/views/anfitrioes/EditarAnfitriaoView.vue'

import EnderecosView from '@/views/enderecos/EnderecosView.vue'
import CriarEnderecoView from '@/views/enderecos/CriarEnderecoView.vue'
import EditarEnderecoView from '@/views/enderecos/EditarEnderecoView.vue'

import HospedagensView from '@/views/hospedagens/HospedagensView.vue'
import CriarHospedagemView from '@/views/hospedagens/CriarHospedagemView.vue'
import EditarHospedagemView from '@/views/hospedagens/EditarHospedagemView.vue'

import ReservasView from '@/views/reservas/ReservasView.vue'
import CriarReservaView from '@/views/reservas/CriarReservaView.vue'
import EditarReservaView from '@/views/reservas/EditarReservaView.vue'

import PagamentosView from '@/views/pagamentos/PagamentosView.vue'
import CriarPagamentoView from '@/views/pagamentos/CriarPagamentoView.vue'
import EditarPagamentoView from '@/views/pagamentos/EditarPagamentoView.vue'

import MensagensView from '@/views/mensagens/MensagensView.vue'
import CriarMensagemView from '@/views/mensagens/CriarMensagemView.vue'
import EditarMensagemView from '@/views/mensagens/EditarMensagemView.vue'

import AvaliacoesView from '@/views/avaliacoes/AvaliacoesView.vue'
import CriarAvaliacaoView from '@/views/avaliacoes/CriarAvaliacaoView.vue'
import EditarAvaliacaoView from '@/views/avaliacoes/EditarAvaliacaoView.vue'

import ComodidadesView from '@/views/comodidades/ComodidadesView.vue'
import CriarComodidadeView from '@/views/comodidades/CriarComodidadeView.vue'
import EditarComodidadeView from '@/views/comodidades/EditarComodidadeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requerAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },

  {
    path: '/usuarios',
    name: 'Usuarios',
    component: UsuariosView,
    meta: { requerAuth: true, admin: true },
  },
  {
    path: '/usuarios/criar',
    name: 'CriarUsuario',
    component: CriarUsuarioView,
    meta: { requerAuth: true, admin: true, ocultoMenu: true },
  },
  {
    path: '/usuarios/:id/editar',
    name: 'EditarUsuario',
    component: EditarUsuarioView,
    meta: { requerAuth: true, admin: true, ocultoMenu: true },
  },

  {
    path: '/hospedes',
    name: 'Hospedes',
    component: HospedesView,
    meta: { requerAuth: true, admin: true },
  },
  {
    path: '/hospedes/criar',
    name: 'CriarHospede',
    component: CriarHospedeView,
    meta: { requerAuth: true, admin: true, ocultoMenu: true },
  },
  {
    path: '/hospedes/:id/editar',
    name: 'EditarHospede',
    component: EditarHospedeView,
    meta: { requerAuth: true, admin: true, ocultoMenu: true },
  },

  {
    path: '/anfitrioes',
    name: 'Anfitrioes',
    component: AnfitrioesView,
    meta: { requerAuth: true, admin: true },
  },
  {
    path: '/anfitrioes/criar',
    name: 'CriarAnfitriao',
    component: CriarAnfitriaoView,
    meta: { requerAuth: true, admin: true, ocultoMenu: true },
  },
  {
    path: '/anfitrioes/:id/editar',
    name: 'EditarAnfitriao',
    component: EditarAnfitriaoView,
    meta: { requerAuth: true, admin: true, ocultoMenu: true },
  },

  {
    path: '/enderecos',
    name: 'Enderecos',
    component: EnderecosView,
    meta: { requerAuth: true, anfitriao: true },
  },
  {
    path: '/enderecos/criar',
    name: 'CriarEndereco',
    component: CriarEnderecoView,
    meta: { requerAuth: true, anfitriao: true, ocultoMenu: true },
  },
  {
    path: '/enderecos/:id/editar',
    name: 'EditarEndereco',
    component: EditarEnderecoView,
    meta: { requerAuth: true, anfitriao: true, ocultoMenu: true },
  },

  {
    path: '/hospedagens',
    name: 'Hospedagens',
    component: HospedagensView,
    meta: { requerAuth: true },
  },
  {
    path: '/hospedagens/criar',
    name: 'CriarHospedagem',
    component: CriarHospedagemView,
    meta: { requerAuth: true, anfitriao: true, ocultoMenu: true },
  },
  {
    path: '/hospedagens/:id/editar',
    name: 'EditarHospedagem',
    component: EditarHospedagemView,
    meta: { requerAuth: true, anfitriao: true, ocultoMenu: true },
  },

  {
    path: '/reservas',
    name: 'Reservas',
    component: ReservasView,
    meta: { requerAuth: true },
  },
  {
    path: '/reservas/criar',
    name: 'CriarReserva',
    component: CriarReservaView,
    meta: { requerAuth: true, ocultoMenu: true },
  },
  {
    path: '/reservas/:id/editar',
    name: 'EditarReserva',
    component: EditarReservaView,
    meta: { requerAuth: true, ocultoMenu: true },
  },

  {
    path: '/pagamentos',
    name: 'Pagamentos',
    component: PagamentosView,
    meta: { requerAuth: true, hospede: true },
  },
  {
    path: '/pagamentos/criar',
    name: 'CriarPagamento',
    component: CriarPagamentoView,
    meta: { requerAuth: true, hospede: true, ocultoMenu: true },
  },
  {
    path: '/pagamentos/:id/editar',
    name: 'EditarPagamento',
    component: EditarPagamentoView,
    meta: { requerAuth: true, hospede: true, ocultoMenu: true },
  },

  {
    path: '/mensagens',
    name: 'Mensagens',
    component: MensagensView,
    meta: { requerAuth: true },
  },
  {
    path: '/mensagens/criar',
    name: 'CriarMensagem',
    component: CriarMensagemView,
    meta: { requerAuth: true, ocultoMenu: true },
  },
  {
    path: '/mensagens/:id/editar',
    name: 'EditarMensagem',
    component: EditarMensagemView,
    meta: { requerAuth: true, ocultoMenu: true },
  },

  {
    path: '/avaliacoes',
    name: 'Avaliacoes',
    component: AvaliacoesView,
    meta: { requerAuth: true },
  },
  {
    path: '/avaliacoes/criar',
    name: 'CriarAvaliacao',
    component: CriarAvaliacaoView,
    meta: { requerAuth: true, hospede: true, ocultoMenu: true },
  },
  {
    path: '/avaliacoes/:id/editar',
    name: 'EditarAvaliacao',
    component: EditarAvaliacaoView,
    meta: { requerAuth: true, hospede: true, ocultoMenu: true },
  },

  {
    path: '/comodidades',
    name: 'Comodidades',
    component: ComodidadesView,
    meta: { requerAuth: true, anfitriao: true },
  },
  {
    path: '/comodidades/criar',
    name: 'CriarComodidade',
    component: CriarComodidadeView,
    meta: { requerAuth: true, anfitriao: true, ocultoMenu: true },
  },
  {
    path: '/comodidades/:id/editar',
    name: 'EditarComodidade',
    component: EditarComodidadeView,
    meta: { requerAuth: true, anfitriao: true, ocultoMenu: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

let sessaoGlobal = null

export function getSessao() {
  return sessaoGlobal
}

export function setSessao(sessao) {
  sessaoGlobal = sessao
}

router.beforeEach(async (to, from) => {
  if (to.name === 'login') return true

  const token = await carregarToken()

  if (!token) {
    return { name: 'login' }
  }

  if (!sessaoGlobal) {
    const storage = carregarSessaoStorage()
    sessaoGlobal = {
      token,
      tipoLogin: storage.tipoLogin,
      hospedeId: storage.hospedeId,
      anfitriaoId: storage.anfitriaoId,
    }
  }

  const { tipoLogin } = sessaoGlobal

  if (to.meta.admin && tipoLogin) {
    return { name: 'home' }
  }

  if (to.meta.anfitriao && tipoLogin !== 'anfitriao') {
    return { name: 'home' }
  }

  if (to.meta.hospede && tipoLogin !== 'hospede') {
    return { name: 'home' }
  }

  to.meta.tipoLogin = tipoLogin
  if (to.meta.hospedeId === undefined) {
    to.meta.hospedeId = sessaoGlobal.hospedeId
  }

  return true
})

export default router
