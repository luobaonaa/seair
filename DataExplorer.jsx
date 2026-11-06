import { useEffect, useMemo, useState } from 'react';
import TimeSeriesChart from '../charts/TimeSeriesChart.jsx';
import { SERIES_COLORS } from '../charts/chartSetup.js';
import DemoBadge from '../ui/DemoBadge.jsx';
import Icon from '../ui/Icon.jsx';
import { StatTile, StatusTag } from '../ui/Basics.jsx';
import { getSeries, periods } from '../../services/dataProvider.js';
import { useAsync } from '../../hooks/useAsync.js';
import { parametersFor, getParameter, assessValue } from '../../data/parameters.js';
import { stationsFor, getStation } from '../../data/stations.js';
import { summarize } from '../../utils/stats.js';
import { formatDate, formatDateTime, formatSigned, toISODate } from '../../utils/format.js';
import './DataExplorer.css';

const DEFAULT_STATION = { air: 'priok-air', ocean: 'ancol-sea' };
const DEFAULT_PARAM = { air: 'pm25', ocean: 'do' };

/**
 * Interactive data explorer: domain, location, parameter, period, end date
 * and an optional comparison location. Every value comes from the data
 * provider, so it is labelled DEMO until real APIs are connected.
 */
export default function DataExplorer({ fixedDomain, initialStation, initialParam, tone = 'light' }) {
  const [domain, setDomain] = useState(fixedDomain || 'air');
  const [stationId, setStationId] = useState(initialStation || DEFAULT_STATION[fixedDomain || 'air']);
  const [param, setParam] = useState(initialParam || DEFAULT_PARAM[fixedDomain || 'air']);
  const [period, setPeriod] = useState('30d');
  const [endDate, setEndDate] = useState(() => toISODate(Date.now()));
  const [compareId, setCompareId] = useState('');

  // Reset dependent selections when the domain changes.
  useEffect(() => {
    if (getStation(stationId)?.domain !== domain) setStationId(DEFAULT_STATION[domain]);
    if (getParameter(param)?.domain !== domain) setParam(DEFAULT_PARAM[domain]);
    setCompareId('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

  const stations = stationsFor(domain);
  const params = parametersFor(domain);
  const paramMeta = getParameter(param);
  const valid = getStation(stationId)?.domain === domain && paramMeta?.domain === domain;
  const end = useMemo(() => {
    const d = new Date(`${endDate}T23:00:00+07:00`).getTime();
    return Math.min(d, Date.now());
  }, [endDate]);

  const { data, loading, error } = useAsync(async () => {
    if (!valid) return null;
    const main = await getSeries({ stationId, parameter: param, period, end });
    const cmp = compareId && compareId !== stationId ? await getSeries({ stationId: compareId, parameter: param, period, end }) : null;
    return { main, cmp };
  }, [stationId, param, period, end, compareId, valid]);

  const stats = data?.main ? summarize(data.main.points.map((p) => p.v)) : null;
  const status = stats ? assessValue(paramMeta, stats.latest) : 'none';
  const color = domain === 'air' ? SERIES_COLORS.air : SERIES_COLORS.ocean;
  const series = data?.main
    ? [
        { label: data.main.location.name, points: data.main.points, color },
        ...(data.cmp ? [{ label: data.cmp.location.name, points: data.cmp.points, color: SERIES_COLORS.compare, dashed: true }] : []),
      ]
    : [];
  const dec = paramMeta?.decimals ?? 1;

  return (
    <div className={`explorer explorer--${tone}`}>
      <div className="explorer__controls">
        {!fixedDomain && (
          <div className="segmented" role="group" aria-label="Data category">
            <button aria-pressed={domain === 'air'} onClick={() => setDomain('air')}>
              <Icon name="wind" size={18} /> Air
            </button>
            <button aria-pressed={domain === 'ocean'} onClick={() => setDomain('ocean')}>
              <Icon name="wave" size={18} /> Ocean
            </button>
          </div>
        )}
        <label className="field">
          Location
          <select value={stationId} onChange={(e) => setStationId(e.target.value)}>
            {stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Compare with
          <select value={compareId} onChange={(e) => setCompareId(e.target.value)}>
            <option value="">No comparison</option>
            {stations
              .filter((s) => s.id !== stationId)
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
        </label>
        <label className="field">
          Until
          <input
            type="date"
            value={endDate}
            max={toISODate(Date.now())}
            min={toISODate(Date.now() - 730 * 864e5)}
            onChange={(e) => e.target.value && setEndDate(e.target.value)}
          />
        </label>
        <div className="field">
          Period
          <div className="chip-row" role="group" aria-label="Period">
            {Object.entries(periods).map(([k, p]) => (
              <button key={k} className="chip" aria-pressed={period === k} onClick={() => setPeriod(k)}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="explorer__params chip-row" role="group" aria-label="Parameter">
        {params.map((p) => (
          <button key={p.key} className="chip" aria-pressed={param === p.key} onClick={() => setParam(p.key)}>
            {p.short || p.name}
          </button>
        ))}
      </div>

      <div className="explorer__panel">
        <div className="explorer__head">
          <div>
            <h3>
              {paramMeta?.name} <span>at {getStation(stationId)?.name}</span>
            </h3>
            <p className="small muted">{paramMeta?.what}</p>
          </div>
          <div className="explorer__badges">
            <StatusTag status={status} />
            <DemoBadge />
          </div>
        </div>

        {stats && (
          <div className="explorer__stats">
            <StatTile label="Latest" value={stats.latest} unit={paramMeta.unit} decimals={dec} />
            <StatTile label="Average" value={stats.mean} unit={paramMeta.unit} decimals={dec} />
            <StatTile label="Lowest" value={stats.min} unit={paramMeta.unit} decimals={dec} />
            <StatTile label="Highest" value={stats.max} unit={paramMeta.unit} decimals={dec} />
            <StatTile label="Change" value={`${formatSigned(stats.change, 0)}%`} />
          </div>
        )}

        <div className={`explorer__chart ${loading ? 'is-loading' : ''}`}>
          {error && <p className="explorer__error">Could not load data: {error.message}</p>}
          {series.length > 0 && (
            <TimeSeriesChart
              series={series}
              unit={paramMeta.unit}
              decimals={dec}
              period={period}
              reference={paramMeta.reference}
              ariaLabel={`${paramMeta.name} at ${getStation(stationId)?.name}, ${periods[period].label}, demo data`}
            />
          )}
        </div>

        {data?.main && (
          <div className="data-meta">
            <span>
              <b>Source:</b> {data.main.source.name}
            </span>
            <span>
              <b>Location:</b> {data.main.location.name}, {data.main.location.area} ({data.main.location.lat.toFixed(3)},{' '}
              {data.main.location.lng.toFixed(3)}, approx.)
            </span>
            <span>
              <b>Range:</b> {formatDate(data.main.range.start)} – {formatDate(data.main.range.end)} · {data.main.resolution}
            </span>
            <span>
              <b>Unit:</b> {paramMeta.unit}
            </span>
            <span>
              <b>Generated:</b> {formatDateTime(data.main.retrievedAt)}
            </span>
            {paramMeta.reference?.citation !== '—' && (
              <span>
                <b>Reference:</b> {paramMeta.reference.label} ({paramMeta.reference.citation})
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
