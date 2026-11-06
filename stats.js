export const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN);
export const min = (xs) => Math.min(...xs);
export const max = (xs) => Math.max(...xs);

export function summarize(values) {
  if (!values.length) return null;
  const first = values[0];
  const last = values[values.length - 1];
  return {
    latest: last,
    mean: mean(values),
    min: min(values),
    max: max(values),
    change: first === 0 ? 0 : ((last - first) / Math.abs(first)) * 100,
  };
}

/** Pearson correlation coefficient. Returns NaN for degenerate input. */
export function pearson(xs, ys) {
  const n = Math.min(xs.length, ys.length);
  if (n < 3) return NaN;
  const mx = mean(xs.slice(0, n));
  const my = mean(ys.slice(0, n));
  let num = 0;
  let dx = 0;
  let dy = 0;
  for (let i = 0; i < n; i++) {
    const a = xs[i] - mx;
    const b = ys[i] - my;
    num += a * b;
    dx += a * a;
    dy += b * b;
  }
  return num / Math.sqrt(dx * dy);
}

export function describeCorrelation(r) {
  const a = Math.abs(r);
  const strength = a < 0.2 ? 'very weak' : a < 0.4 ? 'weak' : a < 0.6 ? 'moderate' : a < 0.8 ? 'strong' : 'very strong';
  const dir = r >= 0 ? 'positive' : 'negative';
  return `${strength} ${dir}`;
}

/** Least squares line for scatter plots. */
export function linearFit(xs, ys) {
  const mx = mean(xs);
  const my = mean(ys);
  let num = 0;
  let den = 0;
  xs.forEach((x, i) => {
    num += (x - mx) * (ys[i] - my);
    den += (x - mx) ** 2;
  });
  const slope = den ? num / den : 0;
  return { slope, intercept: my - slope * mx };
}
