import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from './Icons.jsx';

export default function Field({ label, icon, type = 'text', hint, multiline = false, ...props }) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';
  const Tag = multiline ? 'textarea' : 'input';

  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className={`field-box ${multiline ? 'field-box-multi' : ''}`}>
        {icon && <span className="field-icon">{icon}</span>}
        <Tag
          className="field-input"
          type={isPassword && visible ? 'text' : type}
          rows={multiline ? 3 : undefined}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="field-toggle"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        )}
      </span>
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}
