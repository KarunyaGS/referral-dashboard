export function formatDate(iso) {
  if (!iso || typeof iso !== 'string') return ''
  return iso.slice(0, 10).replaceAll('-', '/')
}
const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})
export function formatProfit(value) {
  const n = Number(value)
  if (Number.isNaN(n)) return ''
  return usd.format(n)
}
