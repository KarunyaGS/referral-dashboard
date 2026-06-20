import Cookies from 'js-cookie'
import { REFERRALS_URL, TOKEN_COOKIE } from './config.js'
function authHeaders() {
  const token = Cookies.get(TOKEN_COOKIE)
  return { Authorization: `Bearer ${token}` }
}
function unwrapList(json) {
  if (!json || typeof json !== 'object') return {}
  const d = json.data
  const wrapped =
    d &&
    typeof d === 'object' &&
    ('referrals' in d || 'metrics' in d || 'serviceSummary' in d || 'referral' in d)
  return wrapped ? d : json
}
export async function fetchReferrals(params = {}) {
  const url = new URL(REFERRALS_URL)
  if (params.search) url.searchParams.set('search', params.search)
  if (params.sort) url.searchParams.set('sort', params.sort)
  if (params.id != null && params.id !== '') {
    url.searchParams.set('id', params.id)
  }
  const response = await fetch(url, { headers: authHeaders() })
  let body = null
  try {
    body = await response.json()
  } catch {
  }
  if (!response.ok) {
    const message = (body && body.message) || 'Failed to load referrals'
    const err = new Error(message)
    err.status = response.status
    throw err
  }
  const container = unwrapList(body)
  return {
    metrics: Array.isArray(container.metrics) ? container.metrics : [],
    serviceSummary: container.serviceSummary || {},
    referral: container.referral || {},
    referrals: Array.isArray(container.referrals) ? container.referrals : [],
  }
}
function extractRow(json, id) {
  if (!json || typeof json !== 'object') return null
  const want = String(id)
  const d = json.data
  if (d && typeof d === 'object' && !Array.isArray(d) && 'id' in d) {
    if (String(d.id) === want) return d
  }
  const arr =
    (d && Array.isArray(d.referrals) && d.referrals) ||
    (Array.isArray(json.referrals) && json.referrals) ||
    (Array.isArray(d) && d) ||
    null
  if (arr) {
    const found = arr.find((r) => r && String(r.id) === want)
    if (found) return found
  }
  if ('id' in json && String(json.id) === want) return json
  return null
}
export async function fetchReferralById(id) {
  const url = new URL(REFERRALS_URL)
  url.searchParams.set('id', id)
  const response = await fetch(url, { headers: authHeaders() })
  let body = null
  try {
    body = await response.json()
  } catch {
    
  }
  if (!response.ok) {
    const err = new Error((body && body.message) || 'Failed to load referral')
    err.status = response.status
    throw err
  }
  return extractRow(body, id)
}
