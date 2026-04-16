import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  CreditCardIcon,
  BookOpenIcon,
  UserIcon,
} from '@heroicons/react/24/solid'

const tabs = [
  { to: '/',        icon: HomeIcon,       label: 'Главная' },
  { to: '/plans',   icon: CreditCardIcon, label: 'Тарифы' },
  { to: '/guide',   icon: BookOpenIcon,   label: 'Настройка' },
  { to: '/profile', icon: UserIcon,       label: 'Профиль' },
]

export default function NavBar() {
  function onTap() {
    window.Telegram?.WebApp?.HapticFeedback?.selectionChanged?.()
  }

  return (
    <nav className="nav-pill" aria-label="Нижняя навигация">
      <div className="flex items-center justify-between gap-1">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onTap}
            aria-label={label}
            className="flex-1 flex justify-center"
          >
            {({ isActive }) => (
              <div
                className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 press ${
                  isActive ? 'bg-gradient-neon neon-glow' : 'bg-transparent'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-white' : 'text-text-dim'
                  }`}
                />
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
