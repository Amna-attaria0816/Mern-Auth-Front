import { KeyMark, HomeIcon, UserIcon, ShieldIcon, ClockIcon, LogoutIcon } from './Icons.jsx';
import { getInitials } from '../utils/helpers.js';

const tabs = [
  { id: 'overview', label: 'Overview', icon: <HomeIcon size={19} /> },
  { id: 'profile', label: 'Profile', icon: <UserIcon size={19} /> },
  { id: 'security', label: 'Security', icon: <ShieldIcon size={19} /> },
  { id: 'activity', label: 'Activity', icon: <ClockIcon size={19} /> },
];

export default function Sidebar({ tab, setTab, user, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="side-brand">
        <KeyMark size={32} />
        <span>Keyhold</span>
      </div>

      <nav className="side-nav">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`side-link ${tab === item.id ? 'active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="side-user">
        <span className="avatar avatar-sm">{getInitials(user.name)}</span>
        <div className="side-user-text">
          <strong>{user.name}</strong>
          <span>{user.email}</span>
        </div>
        <button type="button" className="side-logout" onClick={onLogout} aria-label="Sign out">
          <LogoutIcon size={19} />
        </button>
      </div>
    </aside>
  );
}
