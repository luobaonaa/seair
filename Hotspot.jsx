import { useId, useState } from 'react';

/**
 * Pulsing info marker. Shows a tooltip on hover, focus or tap.
 * `placement`: 'top' | 'bottom' | 'left' | 'right'
 */
export default function Hotspot({ title, children, placement = 'top', tone = 'light', className = '', style, label }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span
      className={`hotspot hotspot--${placement} hotspot--${tone} ${open ? 'is-open' : ''} ${className}`}
      style={style}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="hotspot__dot"
        aria-describedby={id}
        aria-expanded={open}
        aria-label={label || title}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <span aria-hidden="true">i</span>
      </button>
      <span role="tooltip" id={id} className="hotspot__tip">
        <strong>{title}</strong>
        <span>{children}</span>
      </span>
    </span>
  );
}
