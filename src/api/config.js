// API конфигурация — URL бэкенда бота
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// ═══════════ ТАРИФЫ ═══════════

export const PLANS = [
  {
    id: '1month',
    name: '1 месяц',
    price: 150,
    priceLabel: '150 ₽',
    perMonth: '150 ₽/мес',
    period: '30 дней',
    badge: null,
    popular: false,
  },
  {
    id: '3months',
    name: '3 месяца',
    price: 390,
    priceLabel: '390 ₽',
    perMonth: '130 ₽/мес',
    period: '90 дней',
    badge: 'Выгодно',
    popular: true,
    oldPrice: '450 ₽',
    discount: '-13%',
  },
  {
    id: '1year',
    name: '1 год',
    price: 1290,
    priceLabel: '1 290 ₽',
    perMonth: '107 ₽/мес',
    period: '365 дней',
    badge: 'Максимум',
    popular: false,
    oldPrice: '1 800 ₽',
    discount: '-28%',
  },
]

// ═══════════ КЛИЕНТЫ ═══════════
// Жёстко зафиксированные рекомендуемые приложения — никакого выбора из десятка.

export const PLATFORMS = [
  {
    id: 'ios',
    name: 'iPhone / iPad',
    os: 'iOS 15+',
    brand: '#0A84FF',
    app: {
      name: 'V2Box',
      subtitle: 'V2ray Client · бесплатно',
      downloadUrl: 'https://apps.apple.com/app/v2box-v2ray-client/id6446814690',
      downloadLabel: 'Скачать в App Store',
      size: '12 МБ',
    },
    steps: [
      { title: 'Скачайте V2Box', hint: 'В App Store — бесплатно' },
      { title: 'Скопируйте ключ', hint: 'Кнопка «Скопировать ключ» ниже' },
      { title: 'Откройте V2Box → вкладка Configs', hint: 'Нижняя панель' },
      { title: 'Нажмите «+» → «Import from Clipboard»', hint: 'Приложение само вставит ключ' },
      { title: 'Вкладка Home → нажмите ▶', hint: 'VPN подключён' },
    ],
  },
  {
    id: 'android',
    name: 'Android',
    os: 'Android 7+',
    brand: '#00E676',
    app: {
      name: 'v2rayNG',
      subtitle: 'Самый популярный клиент · бесплатно',
      downloadUrl: 'https://play.google.com/store/apps/details?id=com.v2ray.ang',
      downloadLabel: 'Скачать в Google Play',
      size: '45 МБ',
    },
    steps: [
      { title: 'Скачайте v2rayNG', hint: 'В Google Play — бесплатно' },
      { title: 'Скопируйте ключ', hint: 'Кнопка «Скопировать ключ» ниже' },
      { title: 'Откройте v2rayNG', hint: 'Главный экран' },
      { title: 'Нажмите «+» в правом верхнем → «Импорт из буфера»', hint: 'Приложение само вставит ключ' },
      { title: 'Нажмите ▶ внизу экрана', hint: 'VPN подключён' },
    ],
  },
  {
    id: 'macos',
    name: 'Mac',
    os: 'macOS 12+',
    brand: '#BF5AF2',
    app: {
      name: 'V2Box',
      subtitle: 'V2ray Client · бесплатно',
      downloadUrl: 'https://apps.apple.com/app/v2box-v2ray-client/id6446814690',
      downloadLabel: 'Скачать в Mac App Store',
      size: '14 МБ',
    },
    steps: [
      { title: 'Скачайте V2Box', hint: 'В Mac App Store — бесплатно' },
      { title: 'Скопируйте ключ', hint: 'Кнопка «Скопировать ключ» ниже' },
      { title: 'Откройте V2Box', hint: 'Нижняя панель → Configs' },
      { title: 'Нажмите «+» → «Import from Clipboard»', hint: 'Приложение само вставит ключ' },
      { title: 'Вкладка Home → «Connect»', hint: 'VPN подключён' },
    ],
  },
  {
    id: 'windows',
    name: 'Windows',
    os: 'Windows 10+',
    brand: '#0EA5E9',
    app: {
      name: 'v2rayN',
      subtitle: 'Клиент для Windows · бесплатно',
      downloadUrl: 'https://github.com/2dust/v2rayN/releases/latest',
      downloadLabel: 'Скачать с GitHub',
      size: '~40 МБ',
    },
    steps: [
      { title: 'Скачайте v2rayN', hint: 'Файл v2rayN-windows-64.zip' },
      { title: 'Распакуйте архив и запустите v2rayN.exe', hint: 'Права администратора не нужны' },
      { title: 'Скопируйте ключ', hint: 'Кнопка «Скопировать ключ» ниже' },
      { title: 'Сервер → Добавить из буфера обмена', hint: 'Или Ctrl+V' },
      { title: 'ПКМ по серверу → «Тест подключения» → подключиться', hint: 'VPN подключён' },
    ],
  },
]
