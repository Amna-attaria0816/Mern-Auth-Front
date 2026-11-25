export const getError = (error) =>
  error.response?.data?.message || 'Something went wrong. Please try again.';

export const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

export const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
    : '-';

export const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : '-';

export const parseDevice = (userAgent = '') => {
  let browser = 'Browser';
  if (/edg/i.test(userAgent)) browser = 'Edge';
  else if (/chrome|crios/i.test(userAgent)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox';
  else if (/safari/i.test(userAgent)) browser = 'Safari';

  let system = 'Unknown device';
  if (/windows/i.test(userAgent)) system = 'Windows';
  else if (/android/i.test(userAgent)) system = 'Android';
  else if (/iphone|ipad/i.test(userAgent)) system = 'iOS';
  else if (/mac/i.test(userAgent)) system = 'macOS';
  else if (/linux/i.test(userAgent)) system = 'Linux';

  return `${browser} on ${system}`;
};

export const getStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];
  return { score, label: password ? labels[score] : '' };
};
