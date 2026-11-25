import { KeyMark, ShieldIcon, ClockIcon, LockIcon } from './Icons.jsx';
import '../styles/auth.css';

const points = [
  { icon: <LockIcon size={20} />, title: 'Passwords are hashed', text: 'Only a salted hash is stored, never the password itself.' },
  { icon: <ClockIcon size={20} />, title: 'Every sign-in is logged', text: 'Review when and where your account was opened.' },
  { icon: <ShieldIcon size={20} />, title: 'Sessions expire', text: 'Tokens last seven days, then you sign in again.' },
];

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth">
      <aside className="auth-brand">
        <div className="aurora" aria-hidden="true">
          <span className="aurora-blob aurora-blue" />
          <span className="aurora-blob aurora-coral" />
          <span className="aurora-blob aurora-mint" />
        </div>

        <div className="brand-row">
          <KeyMark />
          <span className="brand-name">Keyhold</span>
        </div>

        <div className="brand-body">
          <h1 className="brand-title">Sign in once. Pick up right where you left off.</h1>
          <ul className="brand-points">
            {points.map((point) => (
              <li key={point.title}>
                <span className="point-icon">{point.icon}</span>
                <div>
                  <strong>{point.title}</strong>
                  <p>{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="brand-foot">Built with React, Express and MongoDB.</p>
      </aside>

      <main className="auth-panel">
        <div className="auth-card">
          <h2 className="auth-title">{title}</h2>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
          <p className="auth-footer">{footer}</p>
        </div>
      </main>
    </div>
  );
}
