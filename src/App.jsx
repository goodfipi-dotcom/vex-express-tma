import { useEffect, useState, useCallback } from 'react'
import {
  Home, Settings, User, Headphones,
  Pencil, Cable, Smartphone, CloudDownload, Download,
  ChevronLeft, ChevronRight,
  CreditCard, Monitor, Globe, Info,
  Wallet, List, Gift, ShieldCheck,
  MessageCircle, FileText, HelpCircle, Copy,
} from 'lucide-react'

const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
const deviceName = isIOS ? 'iOS' : 'Android'

const REF_LINK = 'https://t.me/vexexpress_bot?start=ref_1758519441'

const STYLES = `
@keyframes float-a {
  0%, 100% { transform: translate(-10%, -10%) scale(1); opacity: 0.45; }
  50%      { transform: translate(15%, 20%)   scale(1.25); opacity: 0.55; }
}
@keyframes float-b {
  0%, 100% { transform: translate(20%, 10%) scale(1.1); opacity: 0.35; }
  50%      { transform: translate(-15%, 25%) scale(0.9); opacity: 0.5; }
}
@keyframes float-c {
  0%, 100% { transform: translate(-20%, 20%) scale(0.95); opacity: 0.4; }
  50%      { transform: translate(25%, -15%) scale(1.2); opacity: 0.55; }
}
@keyframes float-d {
  0%, 100% { transform: translate(10%, -20%) scale(1); opacity: 0.3; }
  50%      { transform: translate(-10%, 15%) scale(1.15); opacity: 0.45; }
}
@keyframes ripple {
  0%   { width: 240px; height: 240px; opacity: 0.6; }
  100% { width: 360px; height: 360px; opacity: 0; }
}
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.35); }
  50%      { box-shadow: 0 0 35px rgba(139,92,246,0.65); }
}
@keyframes spin-slow {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes sheet-up {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
@keyframes toast-in {
  from { opacity: 0; transform: translate(-50%, -20px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
}

.aurora-blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(80px);
  pointer-events: none;
  will-change: transform, opacity;
}
.noise-overlay {
  position: fixed; inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.45'/></svg>");
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: overlay;
}
.ripple-ring {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1.5px solid rgba(139,92,246,0.4);
  animation: ripple 3s ease-out infinite;
  pointer-events: none;
}
.fade-in { animation: fade-up 200ms ease-out both; }
.btn-glow { animation: glow-pulse 2.6s ease-in-out infinite; }
.spin-arc { animation: spin-slow 4s linear infinite; }

.scroll-area::-webkit-scrollbar { width: 0; }
.tap { transition: transform 120ms ease, background 160ms ease; }
.tap:active { transform: scale(0.97); }
`

// ─── Aurora background ─────────────────────────────────────────
function AuroraBackground() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{
        background: 'linear-gradient(160deg, #0a0014 0%, #150027 55%, #1a0033 100%)',
      }} />
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="aurora-blob" style={{
          width: 520, height: 520, top: '-10%', left: '-15%',
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          animation: 'float-a 11s ease-in-out infinite',
        }} />
        <div className="aurora-blob" style={{
          width: 460, height: 460, top: '30%', right: '-20%',
          background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
          animation: 'float-b 13s ease-in-out infinite',
        }} />
        <div className="aurora-blob" style={{
          width: 420, height: 420, bottom: '-15%', left: '20%',
          background: 'radial-gradient(circle, #d946ef 0%, transparent 70%)',
          animation: 'float-c 15s ease-in-out infinite',
        }} />
        <div className="aurora-blob" style={{
          width: 380, height: 380, top: '10%', left: '40%',
          background: 'radial-gradient(circle, #4c1d95 0%, transparent 70%)',
          animation: 'float-d 9s ease-in-out infinite',
        }} />
      </div>
      <div className="noise-overlay" />
    </>
  )
}

// ─── Shield logo (inline SVG) ──────────────────────────────────
function VexShield({ size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
      <defs>
        <linearGradient id="vexGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path
        d="M48 6 L82 18 V46 C82 66 66 82 48 90 C30 82 14 66 14 46 V18 Z"
        fill="url(#vexGrad)" opacity="0.95"
      />
      <path
        d="M48 6 L82 18 V46 C82 66 66 82 48 90 C30 82 14 66 14 46 V18 Z"
        stroke="#fff" strokeOpacity="0.3" strokeWidth="1" fill="none"
      />
      <text
        x="48" y="58" textAnchor="middle"
        fontFamily="SF Pro Display, system-ui, sans-serif"
        fontWeight="800" fontSize="26" fill="#fff"
      >VX</text>
    </svg>
  )
}

// ─── Primary atoms ─────────────────────────────────────────────
const Card = ({ children, className = '', ...p }) => (
  <div
    className={`rounded-2xl ${className} tap`}
    style={{
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}
    {...p}
  >{children}</div>
)

const Row = ({ Icon, title, subtitle, right, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 tap text-left"
    style={{ minHeight: 56, borderBottom: '1px solid rgba(255,255,255,0.05)' }}
  >
    <div className="flex items-center justify-center shrink-0" style={{ width: 36, height: 36 }}>
      <Icon size={20} style={{ color: 'rgba(167,139,250,0.85)' }} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[15px] text-white truncate">{title}</div>
      {subtitle && (
        <div className="text-[12px] truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {subtitle}
        </div>
      )}
    </div>
    {right ?? <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />}
  </button>
)

const SectionTitle = ({ children }) => (
  <div
    className="px-2 mb-2"
    style={{ color: '#a78bfa', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}
  >{children}</div>
)

const PrimaryButton = ({ children, onClick, glow = false, style = {} }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center justify-center gap-2 tap ${glow ? 'btn-glow' : ''}`}
    style={{
      height: 56, borderRadius: 16,
      background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
      boxShadow: '0 0 22px rgba(139,92,246,0.35)',
      color: '#fff', fontWeight: 600, fontSize: 16,
      ...style,
    }}
  >{children}</button>
)

const SecondaryButton = ({ children, onClick, style = {} }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 tap"
    style={{
      height: 52, borderRadius: 16,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: '#fff', fontWeight: 500, fontSize: 15,
      ...style,
    }}
  >{children}</button>
)

// ─── Home screen ───────────────────────────────────────────────
function HomeScreen({ onSetup, onBuy }) {
  return (
    <div className="fade-in flex flex-col items-center" style={{ paddingTop: 8 }}>
      <div className="relative flex items-center justify-center" style={{ width: 260, height: 260, marginBottom: 24 }}>
        <span className="ripple-ring" style={{ animationDelay: '0s' }} />
        <span className="ripple-ring" style={{ animationDelay: '1s' }} />
        <span className="ripple-ring" style={{ animationDelay: '2s' }} />
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 240, height: 240,
            background: 'rgba(139,92,246,0.08)',
            border: '2px solid rgba(139,92,246,0.18)',
            boxShadow: 'inset 0 0 60px rgba(139,92,246,0.15)',
          }}
        >
          <VexShield size={120} />
        </div>
      </div>

      <div className="w-full flex items-center justify-between" style={{ marginBottom: 6 }}>
        <div>
          <div className="text-white font-bold" style={{ fontSize: 22 }}>до 19 мая 2026</div>
          <div style={{ color: '#34d399', fontSize: 14, marginTop: 2 }}>● online · 535.00 Гб</div>
        </div>
        <div
          className="flex items-center gap-1 px-3 rounded-full"
          style={{
            height: 32,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff', fontSize: 13,
          }}
        >
          1 устройство <Pencil size={14} style={{ opacity: 0.7 }} />
        </div>
      </div>

      <div className="w-full flex flex-col" style={{ gap: 12, marginTop: 24 }}>
        <PrimaryButton glow onClick={onBuy}>
          <Globe size={20} />
          <span className="flex-1 text-left pl-1">Купить подписку</span>
          <span style={{ opacity: 0.8, fontWeight: 500, fontSize: 14 }}>от 199 ₽</span>
        </PrimaryButton>
        <SecondaryButton onClick={onSetup}>
          <Cable size={18} />
          <span className="flex-1 text-left pl-1">Установка и настройка</span>
          <Smartphone size={18} />
        </SecondaryButton>
      </div>
    </div>
  )
}

// ─── Setup device sub-screen ───────────────────────────────────
function SetupDeviceScreen({ onNext, onOther }) {
  return (
    <div className="fade-in flex flex-col items-center" style={{ paddingTop: 12 }}>
      <h2 className="text-white text-center font-bold" style={{ fontSize: 28, marginBottom: 8 }}>
        Настройка на {deviceName}
      </h2>
      <p className="text-center" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 32, maxWidth: 320 }}>
        Настройка VPN происходит в 3 шага и занимает пару минут
      </p>

      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: 200, height: 200, marginBottom: 40,
          background: 'rgba(139,92,246,0.08)',
          border: '2px solid rgba(139,92,246,0.18)',
          boxShadow: 'inset 0 0 40px rgba(139,92,246,0.15)',
        }}
      >
        <Cable size={64} style={{ color: '#a78bfa' }} />
      </div>

      <div className="w-full flex flex-col" style={{ gap: 12 }}>
        <PrimaryButton glow onClick={onNext}>Начать настройку на этом устройстве</PrimaryButton>
        <SecondaryButton onClick={onOther}>Установить на другом устройстве</SecondaryButton>
      </div>
    </div>
  )
}

// ─── Install app sub-screen ────────────────────────────────────
function InstallAppScreen({ onInstall, onNext }) {
  return (
    <div className="fade-in flex flex-col items-center" style={{ paddingTop: 12 }}>
      <h2 className="text-white text-center font-bold" style={{ fontSize: 28, marginBottom: 8 }}>
        Приложение
      </h2>
      <p className="text-center" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 28, maxWidth: 320 }}>
        Установите приложение Happ и вернитесь к этому экрану
      </p>

      <div className="relative flex items-center justify-center" style={{ width: 220, height: 220, marginBottom: 36 }}>
        <div
          className="spin-arc absolute inset-0 rounded-full"
          style={{
            border: '2px solid transparent',
            borderTopColor: '#a78bfa',
            borderRightColor: 'rgba(167,139,250,0.35)',
          }}
        />
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 200, height: 200,
            background: 'rgba(139,92,246,0.08)',
            border: '2px solid rgba(139,92,246,0.18)',
            boxShadow: 'inset 0 0 40px rgba(139,92,246,0.15)',
          }}
        >
          <CloudDownload size={64} style={{ color: '#a78bfa' }} />
        </div>
      </div>

      <div className="w-full flex flex-col" style={{ gap: 12 }}>
        <PrimaryButton glow onClick={onInstall}>
          <Download size={18} />
          <span className="pl-1">Установить приложение</span>
        </PrimaryButton>
        <SecondaryButton onClick={onNext}>
          <span>Следующий шаг</span>
          <ChevronRight size={18} />
        </SecondaryButton>
      </div>
    </div>
  )
}

// ─── Settings screen ───────────────────────────────────────────
function SettingsScreen({ onPlans, onSetup, onOther, onAbout }) {
  return (
    <div className="fade-in flex flex-col gap-5">
      <div>
        <SectionTitle>Подписка</SectionTitle>
        <Card>
          <Row Icon={CreditCard} title="Тарифы" subtitle="Выберите подходящий план" onClick={onPlans} />
        </Card>
      </div>
      <div>
        <SectionTitle>Устройство</SectionTitle>
        <Card>
          <Row Icon={Cable} title="Установка и настройка" subtitle="Настройка VPN на вашем устройстве" onClick={onSetup} />
          <Row Icon={Monitor} title="Установка на другом устройстве" subtitle="Подробная инструкция для установки" onClick={onOther} />
        </Card>
      </div>
      <div>
        <SectionTitle>Приложение</SectionTitle>
        <Card>
          <Row Icon={Globe} title="Язык" right={
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Русский</span>
          } />
          <Row Icon={Info} title="О приложении" subtitle="VEX EXPRESS v1.0" onClick={onAbout} />
        </Card>
      </div>
    </div>
  )
}

// ─── Profile screen ────────────────────────────────────────────
function ProfileScreen({ userName, userId, onCopyId, onSection }) {
  return (
    <div className="fade-in flex flex-col gap-5">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-full shrink-0"
            style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
          >
            <User size={24} color="#fff" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold truncate" style={{ fontSize: 18 }}>{userName}</div>
            <div className="truncate" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>id: {userId}</div>
          </div>
          <button
            type="button"
            onClick={onCopyId}
            className="flex items-center justify-center rounded-lg tap"
            style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Copy size={16} color="#fff" />
          </button>
        </div>
      </Card>

      <div>
        <SectionTitle>Настройки профиля</SectionTitle>
        <Card>
          <Row Icon={Wallet}      title="Способы оплаты"        subtitle="Настройка способов оплаты"   onClick={() => onSection('payments')} />
          <Row Icon={List}        title="История операций"       subtitle="Список ваших транзакций"      onClick={() => onSection('history')} />
          <Row Icon={Gift}        title="Реферальная программа"  subtitle="Получайте бонусы за приглашения" onClick={() => onSection('referral')} />
          <Row Icon={ShieldCheck} title="Сохранение доступа"     subtitle="На случай блокировки Telegram" onClick={() => onSection('backup')} />
        </Card>
      </div>

      <div>
        <SectionTitle>Поддержка</SectionTitle>
        <Card>
          <Row Icon={Monitor}       title="Установка на другом устройстве" onClick={() => onSection('other-device')} />
          <Row Icon={MessageCircle} title="Связаться с поддержкой" onClick={() => onSection('support')} />
          <Row Icon={FileText}      title="Пользовательское соглашение" onClick={() => onSection('terms')} />
        </Card>
      </div>
    </div>
  )
}

// ─── Referral sub-screen ───────────────────────────────────────
function ReferralScreen({ onCopy }) {
  return (
    <div className="fade-in flex flex-col gap-5">
      <div>
        <h2 className="text-white font-bold" style={{ fontSize: 24, marginBottom: 6 }}>
          Реферальная программа
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
          Приглашайте друзей и получайте бонусы к подписке
        </p>
      </div>

      <Card className="p-4">
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 6 }}>Ваша ссылка</div>
        <div
          className="text-white truncate"
          style={{ fontSize: 14, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', marginBottom: 14 }}
        >{REF_LINK}</div>
        <PrimaryButton onClick={onCopy}>
          <Copy size={18} />
          <span className="pl-1">Скопировать ссылку</span>
        </PrimaryButton>
      </Card>

      <div className="flex gap-3">
        <Card className="flex-1 p-4">
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Приглашено друзей</div>
          <div className="text-white font-bold" style={{ fontSize: 28, marginTop: 4 }}>0</div>
        </Card>
        <Card className="flex-1 p-4">
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Заработано бонусов</div>
          <div className="text-white font-bold" style={{ fontSize: 28, marginTop: 4 }}>0 ₽</div>
        </Card>
      </div>
    </div>
  )
}

// ─── Support screen ────────────────────────────────────────────
function SupportScreen({ onFaq, onOtherDevice }) {
  const openSupport = () => window.open('https://t.me/vex_support', '_blank')

  return (
    <div className="fade-in flex flex-col gap-4" style={{ paddingTop: 4 }}>
      <div className="flex flex-col items-center" style={{ marginBottom: 12 }}>
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 72, height: 72, marginBottom: 16,
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            boxShadow: '0 0 30px rgba(139,92,246,0.5)',
          }}
        >
          <MessageCircle size={32} color="#fff" />
        </div>
        <h2 className="text-white font-bold text-center" style={{ fontSize: 22, marginBottom: 8 }}>
          Связаться с поддержкой
        </h2>
        <p className="text-center" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, maxWidth: 320 }}>
          Получите ответы на популярные вопросы или обратитесь к нам за помощью
        </p>
      </div>

      <SupportCard Icon={HelpCircle} title="Часто задаваемые вопросы" subtitle="Ответы на часто задаваемые вопросы" onClick={onFaq} />
      <SupportCard Icon={Cable}      title="Установка на другом устройстве" subtitle="Подробная инструкция для установки" onClick={onOtherDevice} />
      <SupportCard Icon={Headphones} title="Поддержка" subtitle="Связаться с поддержкой" onClick={openSupport} />
    </div>
  )
}

const SupportCard = ({ Icon, title, subtitle, onClick }) => (
  <Card className="p-4" onClick={onClick}>
    <button type="button" onClick={onClick} className="w-full flex items-center gap-3 tap text-left">
      <div
        className="flex items-center justify-center rounded-full shrink-0"
        style={{ width: 40, height: 40, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)' }}
      >
        <Icon size={20} style={{ color: '#a78bfa' }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-semibold truncate" style={{ fontSize: 15 }}>{title}</div>
        <div className="truncate" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{subtitle}</div>
      </div>
      <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
    </button>
  </Card>
)

// ─── Tab bar ───────────────────────────────────────────────────
const TABS = [
  { key: 'home',     Icon: Home,       label: 'Главная' },
  { key: 'settings', Icon: Settings,   label: 'Настройки' },
  { key: 'profile',  Icon: User,       label: 'Профиль' },
  { key: 'support',  Icon: Headphones, label: 'Поддержка' },
]

function TabBar({ active, onChange }) {
  return (
    <nav
      className="fixed left-0 right-0 bottom-0 z-20 flex"
      style={{
        background: 'rgba(10,0,20,0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(139,92,246,0.2)',
        paddingBottom: 'env(safe-area-inset-bottom, 12px)',
      }}
    >
      {TABS.map(({ key, Icon, label }) => {
        const isActive = key === active
        const color = isActive ? '#a78bfa' : 'rgba(255,255,255,0.4)'
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className="flex-1 flex flex-col items-center justify-center tap"
            style={{ height: 70, color, gap: 4 }}
          >
            <Icon size={24} />
            <span style={{ fontSize: 11, fontWeight: 500 }}>{label}</span>
            <span
              style={{
                width: 4, height: 4, borderRadius: 9999,
                background: isActive ? '#a78bfa' : 'transparent',
                marginTop: 2,
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}

// ─── Bottom sheet ──────────────────────────────────────────────
function BottomSheet({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-30 flex items-end"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="w-full"
        style={{
          background: 'rgba(10,0,20,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(139,92,246,0.2)',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: '12px 20px 32px',
          animation: 'sheet-up 260ms ease-out',
          paddingBottom: 'calc(32px + env(safe-area-inset-bottom, 12px))',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="mx-auto"
          style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.3)', marginBottom: 16 }}
        />
        {title && <h3 className="text-white font-bold" style={{ fontSize: 20, marginBottom: 12 }}>{title}</h3>}
        {children}
      </div>
    </div>
  )
}

// ─── Toast ─────────────────────────────────────────────────────
function Toast({ message }) {
  if (!message) return null
  return (
    <div
      className="fixed z-40"
      style={{
        top: 'calc(env(safe-area-inset-top, 12px) + 16px)',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(52,211,153,0.95)',
        color: '#0a0014',
        fontWeight: 600,
        fontSize: 14,
        padding: '10px 18px',
        borderRadius: 9999,
        animation: 'toast-in 200ms ease-out',
        boxShadow: '0 10px 30px rgba(52,211,153,0.35)',
      }}
    >{message}</div>
  )
}

// ─── Header ────────────────────────────────────────────────────
function Header({ onBack, backLabel = 'Назад' }) {
  return (
    <header
      className="sticky top-0 z-10 flex items-center"
      style={{
        height: 56,
        padding: '0 12px',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        background: 'linear-gradient(to bottom, rgba(10,0,20,0.95), rgba(10,0,20,0.75))',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center tap gap-1"
          style={{ color: '#a78bfa', fontSize: 15, fontWeight: 500 }}
        >
          <ChevronLeft size={22} />
          {backLabel}
        </button>
      ) : <div style={{ width: 56 }} />}

      <div className="flex-1 text-center">
        <div className="text-white font-bold" style={{ fontSize: 17, lineHeight: 1.1 }}>VEX EXPRESS</div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 }}>мини-приложение</div>
      </div>

      <div style={{ width: 56 }} />
    </header>
  )
}

// ─── App ───────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab]   = useState('home')
  const [screen, setScreen]         = useState('home') // home | setup-device | install-app | referral
  const [sheet, setSheet]           = useState({ open: false, title: '', body: null })
  const [toast, setToast]           = useState('')

  // Telegram WebApp init
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg) return
    tg.ready()
    tg.expand()
    tg.setHeaderColor?.('#0a0014')
    tg.setBackgroundColor?.('#0a0014')
    tg.disableVerticalSwipes?.()
    try { tg.requestFullscreen?.() } catch { /* ok */ }
  }, [])

  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user
  const userName = tgUser?.first_name || 'Пользователь'
  const userId   = tgUser?.id || '1758519441'

  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }, [])

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      showToast('Скопировано!')
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred?.('success')
    } catch {
      showToast('Не удалось скопировать')
    }
  }, [showToast])

  const switchTab = (key) => {
    setActiveTab(key)
    setScreen(key === 'home' || key === 'profile' ? key : key)
    if (key === 'home') setScreen('home')
    if (key === 'profile') setScreen('profile-root')
  }

  const openSheet = (title, body) => setSheet({ open: true, title, body })
  const closeSheet = () => setSheet({ open: false, title: '', body: null })

  const openPayments = () => openSheet('Способы оплаты', (
    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.5 }}>
      Скоро! Оплата будет доступна в ближайшее время.
    </p>
  ))
  const openPlans = () => openSheet('Тарифы', (
    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.5 }}>
      Скоро! Выбор тарифа будет доступен в ближайшее время.
    </p>
  ))
  const openHistory = () => openSheet('История операций', (
    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>Нет транзакций.</p>
  ))
  const openAbout = () => openSheet('О приложении', (
    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.6 }}>
      <div>VEX EXPRESS v1.0</div>
      <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
        Быстрый VPN в Telegram. Скорость. Качество. Безопасность.
      </div>
    </div>
  ))
  const openBackup = () => openSheet('Сохранение доступа', (
    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>
      Скоро! Функция сохранит доступ к VPN на случай блокировки Telegram.
    </p>
  ))
  const openOtherDevice = () => {
    setActiveTab('home')
    setScreen('setup-device')
    closeSheet()
  }
  const openTerms = () => openSheet('Пользовательское соглашение', (
    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.5 }}>
      Скоро будет опубликовано.
    </p>
  ))
  const openSupportTg = () => window.open('https://t.me/vex_support', '_blank')

  // Which screen is visible?
  let body = null
  let onBack = null

  if (activeTab === 'home') {
    if (screen === 'setup-device') {
      onBack = () => setScreen('home')
      body = <SetupDeviceScreen onNext={() => setScreen('install-app')} onOther={openOtherDevice} />
    } else if (screen === 'install-app') {
      onBack = () => setScreen('setup-device')
      body = <InstallAppScreen
        onInstall={() => openSheet('Установка', (
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>
            Скоро! Прямая ссылка на приложение появится здесь.
          </p>
        ))}
        onNext={() => openSheet('Шаг 3', (
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>
            Скоро! Инструкция по добавлению VPN-ключа.
          </p>
        ))}
      />
    } else {
      body = <HomeScreen onSetup={() => setScreen('setup-device')} onBuy={openPayments} />
    }
  } else if (activeTab === 'settings') {
    body = <SettingsScreen
      onPlans={openPlans}
      onSetup={() => { setActiveTab('home'); setScreen('setup-device') }}
      onOther={openOtherDevice}
      onAbout={openAbout}
    />
  } else if (activeTab === 'profile') {
    if (screen === 'referral') {
      onBack = () => setScreen('profile-root')
      body = <ReferralScreen onCopy={() => copy(REF_LINK)} />
    } else {
      body = <ProfileScreen
        userName={userName}
        userId={userId}
        onCopyId={() => copy(String(userId))}
        onSection={(s) => {
          if (s === 'referral')     setScreen('referral')
          else if (s === 'payments') openPayments()
          else if (s === 'history')  openHistory()
          else if (s === 'backup')   openBackup()
          else if (s === 'support')  openSupportTg()
          else if (s === 'terms')    openTerms()
          else if (s === 'other-device') openOtherDevice()
        }}
      />
    }
  } else if (activeTab === 'support') {
    body = <SupportScreen
      onFaq={() => openSheet('FAQ', (
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>Скоро будут опубликованы.</p>
      ))}
      onOtherDevice={openOtherDevice}
    />
  }

  return (
    <div className="relative min-h-screen">
      <style>{STYLES}</style>

      <AuroraBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onBack={onBack} />

        <main
          className="flex-1 scroll-area"
          style={{
            padding: '16px 20px',
            paddingBottom: 'calc(90px + env(safe-area-inset-bottom, 12px))',
          }}
        >
          {body}

          {/* Реферальная подвеска внизу профиля */}
          {activeTab === 'profile' && screen === 'profile-root' && (
            <Card
              className="fixed left-4 right-4 p-3"
              style={{ bottom: 'calc(90px + env(safe-area-inset-bottom, 12px))', zIndex: 15 }}
              onClick={() => copy(REF_LINK)}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Ваша ссылка на подписку</div>
                  <div className="text-white truncate" style={{ fontSize: 13, fontFamily: 'ui-monospace, monospace' }}>
                    {REF_LINK}
                  </div>
                </div>
                <div
                  className="flex items-center justify-center rounded-lg shrink-0"
                  style={{ width: 36, height: 36, background: 'rgba(139,92,246,0.2)' }}
                >
                  <Copy size={16} color="#a78bfa" />
                </div>
              </div>
            </Card>
          )}
        </main>
      </div>

      <BottomSheet open={sheet.open} onClose={closeSheet} title={sheet.title}>
        {sheet.body}
      </BottomSheet>

      <TabBar active={activeTab} onChange={switchTab} />

      <Toast message={toast} />
    </div>
  )
}
