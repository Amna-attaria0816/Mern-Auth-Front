import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import Overview from '../sections/Overview.jsx';
import ProfileForm from '../sections/ProfileForm.jsx';
import SecurityForm from '../sections/SecurityForm.jsx';
import Activity from '../sections/Activity.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app">
      <Sidebar tab={tab} setTab={setTab} user={user} onLogout={handleLogout} />
      <main className="app-main">
        {tab === 'overview' && <Overview user={user} />}
        {tab === 'profile' && <ProfileForm user={user} />}
        {tab === 'security' && <SecurityForm />}
        {tab === 'activity' && <Activity user={user} />}
      </main>
    </div>
  );
}
