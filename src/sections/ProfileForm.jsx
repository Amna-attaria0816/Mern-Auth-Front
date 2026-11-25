import { useState } from 'react';
import api from '../api/axios.js';
import Field from '../components/Field.jsx';
import { UserIcon, MailIcon, PhoneIcon, PinIcon } from '../components/Icons.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getError } from '../utils/helpers.js';

export default function ProfileForm({ user }) {
  const { setUser } = useAuth();
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone || '',
    location: user.location || '',
    bio: user.bio || '',
  });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });
    setLoading(true);
    try {
      const { data } = await api.put('/auth/profile', form);
      setUser(data.user);
      setStatus({ type: 'success', text: 'Profile saved.' });
    } catch (err) {
      setStatus({ type: 'error', text: getError(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <header className="page-head">
        <h1>Profile</h1>
        <p>Update the details linked to your account.</p>
      </header>

      <form className="card form" onSubmit={handleSubmit}>
        {status.text && (
          <div className={`alert alert-${status.type}`} role="status">{status.text}</div>
        )}
        <div className="form-grid">
          <Field
            label="Full name"
            name="name"
            icon={<UserIcon size={18} />}
            value={form.name}
            onChange={handleChange}
            required
          />
          <Field
            label="Email"
            icon={<MailIcon size={18} />}
            value={user.email}
            disabled
            hint="Your email cannot be changed."
            readOnly
          />
          <Field
            label="Phone"
            name="phone"
            icon={<PhoneIcon size={18} />}
            placeholder="+92 300 0000000"
            value={form.phone}
            onChange={handleChange}
          />
          <Field
            label="Location"
            name="location"
            icon={<PinIcon size={18} />}
            placeholder="City, country"
            value={form.location}
            onChange={handleChange}
          />
        </div>
        <Field
          label="Bio"
          name="bio"
          multiline
          maxLength={240}
          placeholder="Tell people a little about yourself"
          value={form.bio}
          onChange={handleChange}
          hint={`${form.bio.length}/240`}
        />
        <div className="form-actions">
          <button className="btn btn-primary btn-inline" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Save changes'}
          </button>
        </div>
      </form>
    </section>
  );
}
