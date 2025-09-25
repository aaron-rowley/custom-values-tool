import React, { useMemo, useState } from 'react'
import type { CustomValue } from './types'
import { chunk, getQS, normalize } from './utils'
import { fetchCustomValues } from './api'

export default function App() {
  const [locationId, setLocationId] = useState(() => getQS('locationId', ''));
  const [pageSize, setPageSize] = useState(() => Number(getQS('pageSize', '10')) || 10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allValues, setAllValues] = useState<CustomValue[]>([]);
  const [page, setPage] = useState(1);

  async function onFetch() {
    setLoading(true); setError(null); setAllValues([]);
    try {
      const data = await fetchCustomValues(locationId);
      setAllValues(normalize(data));
    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  const pages = useMemo(() => chunk(allValues, Math.max(1, pageSize)), [allValues, pageSize]);
  const totalPages = pages.length || 1;
  const pageItems = pages[Math.min(page - 1, totalPages - 1)] || [];

  return (
    <div className="container">
      <h1>Custom Values Viewer</h1>
      <p className="muted" style={{marginBottom: 16}}>POSTs to the VisQuanta webhook and lists values with pagination.</p>

      <div className="card">
        <div className="row">
          <label style={{flex: 1}}>
            <div className="muted" style={{marginBottom: 6}}>Location ID</div>
            <input className="input" value={locationId} onChange={e=>setLocationId(e.target.value)} placeholder="KH4yu0WzfV8a6I2UnY61" />
          </label>
          <label>
            <div className="muted" style={{marginBottom: 6}}>Page size</div>
            <select className="select" value={pageSize} onChange={e=>setPageSize(parseInt(e.target.value)||10)}>
              {[5,10,15,20,25,50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <button className="btn fetch" disabled={!locationId || loading} onClick={onFetch}>
            {loading ? 'Loading…' : 'Fetch'}
          </button>
        </div>
        {error && <div className="error" style={{marginTop: 10}}>{error}</div>}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Field Key</th>
              <th>Has Value?</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.length === 0 && (
              <tr><td colSpan={3} style={{textAlign:'center', color:'#a1a1aa', padding:'16px'}}>{loading ? 'Loading…' : 'No data'}</td></tr>
            )}
            {pageItems.map((cv, idx) => {
              const hasVal = cv.value != null && String(cv.value).trim() !== '';
              return (
                <tr key={`${cv.fieldKey}-${idx}`}>
                  <td>{cv.name}</td>
                  <td className="mono">{cv.fieldKey}</td>
                  <td>{hasVal ? <span className="badge ok">Yes</span> : <span className="badge no">No</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pages.length > 1 && (
        <div className="paginate">
          <button className="btn ghost" onClick={()=>setPage(p=>Math.max(1, p-1))} disabled={page<=1}>Prev</button>
          <span>Page {Math.min(page, totalPages)} of {totalPages}</span>
          <button className="btn ghost" onClick={()=>setPage(p=>Math.min(totalPages, p+1))} disabled={page>=totalPages}>Next</button>
        </div>
      )}
    </div>
  )
}
