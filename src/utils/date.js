export function isoParaBr(iso) {
  if (!iso) return ''
  const [ano, mes, dia] = iso.split('-')
  if (!dia) return iso
  return `${dia}/${mes}/${ano}`
}

export function brParaIso(br) {
  if (!br) return ''
  const partes = br.split('/')
  if (partes.length !== 3) return br
  const [dia, mes, ano] = partes
  return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`
}
