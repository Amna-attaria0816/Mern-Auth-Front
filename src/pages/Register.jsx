import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import Field from '../components/Field.jsx';
import { MailIcon, LockIcon, UserIcon } from '../components/Icons.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getError, getStrength } from '../utils/helpers.js';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const strength = getStrength(form.password);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('The two passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(getError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="It takes less than a minute."
      footer={
        <>
          Already have an account? <Link to="/login">Sign in</Link>
        </>
      }
    >
      <form className="form" onSubmit={handleSubmit}>
        {error && <div className="alert alert-error" role="alert">{error}</div>}
        <Field
          label="Full name"
          name="name"
          icon={<UserIcon size={18} />}
          placeholder="Your name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          icon={<MailIcon size={18} />}
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Field
          label="Password"
          name="password"
          type="password"
          icon={<LockIcon size={18} />}
          placeholder="At least 6 characters"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {form.password && (
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
          label="Confirm password"
          name="confirm"
          type="password"
          icon={<LockIcon size={18} />}
          placeholder="Type the password again"
          autoComplete="new-password"
          value={form.confirm}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  );
}
