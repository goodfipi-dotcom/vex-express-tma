import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  CreditCardIcon,
  BookOpenIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  CreditCardIcon as CreditCardIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid'

const tabs = [
  { to: '/', icon: HomeIcon, iconActive: HomeIconSolid, label: 'Главная' },
  { to: '/plans', icon: CreditCardIcon, iconActive: CreditCardIconSolid, label: 'Тарифы' },
  { to: '/guide', icon: BookOpenIcon, iconActive: BookOpenIconSolid, label: 'Настройка' },
  { to: '/profile', icon: UserIcon, iconActive: UserIconSolid, label: 'Профиль' },
]

export default function NavBar() {
  function onTap() {
    window.Telegram?.WebApp?.HapticFeedback?.selectionChanged?.()
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-border-soft safe-bottom"
    >
      <div className="flex justify-around items-center h-[60px] max-w-lg mx-auto px-2">
        {tabs.map(({ to, icon: Icon, iconActive: IconActive, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onTap}
            className="flex-1 flex justify-center"
          >
            {({ isActive }) => {
              const Comp = isActive ? IconActive : Icon
              return (
                <div
                  className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl press transition-colors duration-200 ${
                    isActive ? 'text-neon' : 'text-text-muted'
                  }`}
                >
                  {/* Неоновый индикатор сверху у активной вкладки */}
                  {isActive && (
                    <span
                      className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full bg-neon"
                      style={{
                        boxShadow:
                          '0 0 8px rgba(168, 85, 247, 0.9), 0 0 16px rgba(168, 85, 247, 0.5)',
                      }}
                    />
                  )}
                  <Comp className="w-[22px] h-[22px]" />
                  <span className="text-[10px] font-medium">{label}</span>
                </div>
              )
            }}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
