// API конфигурация — URL бэкенда бота
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// Тарифы
export const PLANS = [
  {
    id: '1month',
    name: '1 месяц',
    price: 150,
    priceLabel: '150 ₽',
    period: '30 дней',
    badge: null,
    popular: false,
  },
  {
    id: '3months',
    name: '3 месяца',
    price: 390,
    priceLabel: '390 ₽',
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
    period: '365 дней',
    badge: 'Максимум',
    popular: false,
    oldPrice: '1 800 ₽',
    discount: '-28%',
  },
]

// Инструкции по платформам
export const PLATFORMS = [
  {
    id: 'ios',
    name: 'iOS',
    icon: 'DevicePhoneMobileIcon',
    apps: [
      { name: 'V2Box', desc: 'Простой и удобный. Рекомендуем.' },
      { name: 'FoXray', desc: 'Продвинутый с расширенными настройками.' },
    ],
    steps: [
      'Скачайте V2Box из App Store',
      'Откройте приложение',
      'Нажмите «+» → «Импорт из буфера обмена»',
      'Скопируйте ваш ключ на главной странице',
      'Вернитесь в V2Box и вставьте ключ',
      'Нажмите кнопку подключения ▶',
    ],
  },
  {
    id: 'android',
    name: 'Android',
    icon: 'DevicePhoneMobileIcon',
    apps: [
      { name: 'v2rayNG', desc: 'Самый популярный. Рекомендуем.' },
      { name: 'Nekobox', desc: 'Альтернатива с удобным интерфейсом.' },
    ],
    steps: [
      'Скачайте v2rayNG из Google Play',
      'Откройте приложение',
      'Нажмите «+» → «Импорт из буфера обмена»',
      'Скопируйте ваш ключ на главной странице',
      'Вернитесь в v2rayNG и вставьте ключ',
      'Нажмите кнопку ▶ для подключения',
    ],
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: 'ComputerDesktopIcon',
    apps: [
      { name: 'V2Box', desc: 'Доступен в Mac App Store.' },
    ],
    steps: [
      'Скачайте V2Box из Mac App Store',
      'Откройте приложение',
      'Нажмите «Импорт» → «Из буфера обмена»',
      'Скопируйте ваш ключ на главной странице',
      'Вставьте ключ и нажмите «Подключить»',
    ],
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: 'ComputerDesktopIcon',
    apps: [
      { name: 'Nekoray', desc: 'Удобный клиент для Windows.' },
    ],
    steps: [
      'Скачайте Nekoray с GitHub',
      'Распакуйте архив и запустите nekoray.exe',
      'Нажмите «Сервер» → «Добавить из буфера»',
      'Скопируйте ваш ключ на главной странице',
      'Вставьте ключ и нажмите «Старт»',
    ],
  },
]
