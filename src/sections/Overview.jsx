import { getInitials, formatDate, formatDateTime } from '../utils/helpers.js';

export default function Overview({ user }) {
  const firstName = user.name.split(' ')[0];

  const stats = [
    { label: 'Member since', value: formatDate(user.createdAt) },
    { label: 'Last sign-in', value: formatDateTime(user.lastLoginAt) },
    { label: 'Total sign-ins', value: user.loginCount },
  ];

  const details = [
    { label: 'Email', value: user.email },
    { label: 'Phone', value: user.phone || 'Not added yet' },
    { label: 'Location', value: user.location || 'Not added yet' },
    { label: 'Account ID', value: user._id },
  ];

  return (
    <section>
      <header className="page-head">
        <h1>Welcome back, {firstName}</h1>
        <p>Here is a quick look at your account.</p>
      </header>

      <div className="stats">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <span className="stat-label">{stat.label}</span>
            <strong className="stat-value">{stat.value}</strong>
          </div>
        ))}
      </div>

      <div className="card profile-card">
        <div className="profile-top">
          <span className="avatar avatar-lg">{getInitials(user.name)}</span>
          <div>
            <h2>{user.name}</h2>
            <p className="muted">{user.bio || 'Add a short bio from the Profile tab.'}</p>
          </div>
        </div>
        <dl className="details">
          {details.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
