import { useState } from 'react';
import api from '../api/axios.js';
import Field from '../components/Field.jsx';
import { LockIcon } from '../components/Icons.jsx';
import { getError, getStrength } from '../utils/helpers.js';

const emptyForm = { currentPassword: '', newPassword: '', confirm: '' };

export default function SecurityForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const strength = getStrength(form.newPassword);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });

    if (form.newPassword.length < 6) {
      setStatus({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }
    if (form.newPassword !== form.confirm) {
      setStatus({ type: 'error', text: 'The two new passwords do not match.' });
      return;
    }

    setLoading(true);
    try {
      await api.put('/auth/password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setForm(emptyForm);
      setStatus({ type: 'success', text: 'Password updated.' });
    } catch (err) {
      setStatus({ type: 'error', text: getError(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <header className="page-head">
        <h1>Security</h1>
        <p>Choose a new password for your account.</p>
      </header>

      <form className="card form form-narrow" onSubmit={handleSubmit}>
        {status.text && (
          <div className={`alert alert-${status.type}`} role="status">{status.text}</div>
        )}
        <Field
          label="Current password"
          name="currentPassword"
          type="password"
          icon={<LockIcon size={18} />}
          autoComplete="current-password"
          value={form.currentPassword}
          onChange={handleChange}
          required
        />
        <Field
          label="New password"
          name="newPassword"
          type="password"
          icon={<LockIcon size={18} />}
          autoComplete="new-password"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        {form.newPassword && (
          <div className="strength" data-level={strength.score}>
            <div className="strength-bars">
              {[1, 2, 3, 4].map((n) => (
                <span key={n} className={n <= strength.score ? 'on' : ''} />
              ))}
            </div>
            <span className="strength-label">{strength.label}</span>
          </div>
        )}
        <Field
          label="Confirm new password"
          name="confirm"
          type="password"
          icon={<LockIcon size={18} />}
          autoComplete="new-password"
          value={form.confirm}
          onChange={handleChange}
          required
        />
        <div className="form-actions">
          <button className="btn btn-primary btn-inline" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Update password'}
          </button>
        </div>
      </form>
    </section>
  );
}
