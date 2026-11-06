const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const dateTimeFmt = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Jakarta',
});

export const formatDate = (d) => dateFmt.format(new Date(d));
export const formatDateTime = (d) => `${dateTimeFmt.format(new Date(d))} WIB`;

export function formatValue(value, decimals = 1) {
  if (value == null || Number.isNaN(value)) return '—';
  if (Math.abs(value) >= 1000) return Math.round(value).toLocaleString('en-US');
  return Number(value).toFixed(decimals);
}

export const formatSigned = (v, d = 1) => `${v > 0 ? '+' : ''}${formatValue(v, d)}`;

/** ISO date (YYYY-MM-DD) for <input type="date">. */
export const toISODate = (d) => {
  const x = new Date(d);
  const off = x.getTimezoneOffset();
  return new Date(x.getTime() - off * 60000).toISOString().slice(0, 10);
};
