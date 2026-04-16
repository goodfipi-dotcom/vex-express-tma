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
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border-soft"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex justify-around items-center h-[60px] max-w-lg mx-auto px-2">
        {tabs.map(({ to, icon: Icon, iconActive: IconActive, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onTap}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl press transition-colors duration-200 ${
                isActive ? 'text-accent' : 'text-text-muted'
              }`
            }
          >
            {({ isActive }) => {
              const Comp = isActive ? IconActive : Icon
              return (
                <>
                  <Comp className="w-[22px] h-[22px]" />
                  <span className="text-[10px] font-medium">{label}</span>
                </>
              )
            }}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
