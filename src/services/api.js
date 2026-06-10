import axios from 'axios'

const TOKEN_KEY = '@hospedaria:token'
const TIPO_LOGIN_KEY = '@hospedaria:tipo-login'
const HOSPEDE_ID_KEY = '@hospedaria:hospede-id'
const ANFITRIAO_ID_KEY = '@hospedaria:anfitriao-id'

let aoNaoAutorizado = null

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
})

export const endpoints = {
  reservas: '/reservas/reservas/',
  pagamentos: '/pagamentos/pagamentos/',
  mensagens: '/mensagens/mensagens/',
}

api.interceptors.response.use(
  (resposta) => resposta,
  async (erro) => {
    if (erro.response?.status === 401) {
      await sair()
      aoNaoAutorizado?.()
    }
    return Promise.reject(erro)
  },
)

function textoDoValor(valor) {
  if (Array.isArray(valor)) {
    return valor.map(textoDoValor).filter(Boolean).join('\n')
  }
  if (valor && typeof valor === 'object') {
    return Object.entries(valor)
      .map(([chave, item]) => `${chave}: ${textoDoValor(item)}`)
      .filter(Boolean)
      .join('\n')
  }
  return valor == null ? '' : String(valor)
}

function pareceHtml(texto) {
  return /<!doctype html|<html|<body/i.test(texto)
}

export function mensagemErro(erro, fallback = 'Não foi possível concluir a operação.') {
  const data = erro?.response?.data
  if (!data) return fallback

  if (typeof data === 'string') {
    const texto = data.trim()
    return texto && !pareceHtml(texto) ? texto : fallback
  }

  for (const chave of ['erro', 'error', 'mensagem', 'message', 'detail', 'non_field_errors']) {
    const texto = textoDoValor(data[chave])
    if (texto) return texto
  }

  const texto = textoDoValor(data)
  return texto || fallback
}

export function listaDaResposta(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.results)) return data.results
  return []
}

export function registrarNaoAutorizado(callback) {
  aoNaoAutorizado = callback
}

function aplicarToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Token ${token}`
    return
  }
  delete api.defaults.headers.common.Authorization
}

function criarSessao(token, perfil) {
  return {
    token,
    tipoLogin: perfil.tipo_login,
    hospedeId: perfil.hospede_id,
    anfitriaoId: perfil.anfitriao_id,
  }
}

export async function obterPerfilLogin() {
  const resposta = await api.get('/perfil-login/')
  return resposta.data
}

export async function entrar(username, password) {
  const resposta = await api.post('/token-autenticacao/', { username, password })
  const token = resposta.data.token
  localStorage.setItem(TOKEN_KEY, token)
  aplicarToken(token)
  const perfil = await obterPerfilLogin()
  return criarSessao(token, perfil)
}

export async function cadastrar(username, password, email, tipoLogin) {
  const resposta = await api.post('/cadastro/', {
    username,
    password,
    email,
    tipo_login: tipoLogin,
  })
  const token = resposta.data.token
  localStorage.setItem(TOKEN_KEY, token)
  aplicarToken(token)
  return criarSessao(token, resposta.data)
}

export async function carregarToken() {
  const token = localStorage.getItem(TOKEN_KEY)
  aplicarToken(token)
  return token
}

export async function sair() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(TIPO_LOGIN_KEY)
  localStorage.removeItem(HOSPEDE_ID_KEY)
  localStorage.removeItem(ANFITRIAO_ID_KEY)
  aplicarToken(null)
}

export function salvarSessaoStorage(sessao) {
  localStorage.setItem(TIPO_LOGIN_KEY, sessao.tipoLogin)
  if (sessao.hospedeId) {
    localStorage.setItem(HOSPEDE_ID_KEY, String(sessao.hospedeId))
  } else {
    localStorage.removeItem(HOSPEDE_ID_KEY)
  }
  if (sessao.anfitriaoId) {
    localStorage.setItem(ANFITRIAO_ID_KEY, String(sessao.anfitriaoId))
  } else {
    localStorage.removeItem(ANFITRIAO_ID_KEY)
  }
}

export function carregarSessaoStorage() {
  return {
    tipoLogin: localStorage.getItem(TIPO_LOGIN_KEY),
    hospedeId: localStorage.getItem(HOSPEDE_ID_KEY)
      ? Number(localStorage.getItem(HOSPEDE_ID_KEY))
      : null,
    anfitriaoId: localStorage.getItem(ANFITRIAO_ID_KEY)
      ? Number(localStorage.getItem(ANFITRIAO_ID_KEY))
      : null,
  }
}

export { api }
