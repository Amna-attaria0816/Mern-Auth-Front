import { DeviceIcon } from '../components/Icons.jsx';
import { formatDateTime, parseDevice } from '../utils/helpers.js';

export default function Activity({ user }) {
  const entries = [...(user.loginHistory || [])].reverse();

  return (
    <section>
      <header className="page-head">
        <h1>Sign-in activity</h1>
        <p>Your last {entries.length} sign-ins, newest first.</p>
      </header>

      <div className="card">
        <ul className="activity">
          {entries.map((entry, index) => (
            <li key={`${entry.loggedInAt}-${index}`}>
              <span className="activity-icon">
                <DeviceIcon size={20} />
              </span>
              <div className="activity-text">
                <strong>{parseDevice(entry.userAgent)}</strong>
                <span>IP {entry.ip}</span>
              </div>
              <time className="activity-time">{formatDateTime(entry.loggedInAt)}</time>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
