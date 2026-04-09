import { API_BASE_URL } from './config'

// Получить initData из Telegram Web App
function getInitData() {
  try {
    return window.Telegram?.WebApp?.initData || ''
  } catch {
    return ''
  }
}

// Базовый fetch с авторизацией через Telegram initData
async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Telegram-Init-Data': getInitData(),
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}

// Получить статус подписки пользователя
export async function getUserStatus() {
  return apiFetch('/api/user/status')
}

// Купить тариф (создать инвойс)
export async function createInvoice(planId) {
  return apiFetch('/api/payment/invoice', {
    method: 'POST',
    body: JSON.stringify({ plan_id: planId }),
  })
}

// Получить историю транзакций
export async function getTransactions() {
  return apiFetch('/api/user/transactions')
}
