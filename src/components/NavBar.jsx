import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  CreditCardIcon,
  BookOpenIcon,
  UserIcon,
} from '@heroicons/react/24/outline'

const tabs = [
  { to: '/', icon: HomeIcon, label: 'Главная' },
  { to: '/plans', icon: CreditCardIcon, label: 'Тарифы' },
  { to: '/guide', icon: BookOpenIcon, label: 'Инструкции' },
  { to: '/profile', icon: UserIcon, label: 'Профиль' },
]

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-dark-800/95 backdrop-blur-lg border-t border-dark-600">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-indigo-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
