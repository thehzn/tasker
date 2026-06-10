// import  { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import useAxios from '../hooks/axios';

// export default function ViewDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const axios = useAxios();

//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         setLoading(true);
//         setError('');
//         const { data } = await axios.get(`/event/geteventdetails/${id}`, {
//           withCredentials: true,
//         });
//         setEvent(data.event);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch event details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchEvent();
//   }, [id]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

//         :root {
//           --bg: #07080f;
//           --surface: #0f1020;
//           --border: rgba(255,255,255,0.07);
//           --accent: #e8c06a;
//           --accent-dim: rgba(232,192,106,0.12);
//           --accent-border: rgba(232,192,106,0.25);
//           --text: #dde0f0;
//           --text-muted: rgba(221,224,240,0.4);
//           --text-soft: rgba(221,224,240,0.65);
//           --danger: rgba(255,90,90,0.75);
//         }

//         * { box-sizing: border-box; margin: 0; padding: 0; }

//         .vd-page {
//           min-height: 100vh;
//           background: var(--bg);
//           font-family: 'Outfit', sans-serif;
//           color: var(--text);
//           padding: 0 0 5rem;
//         }

//         /* ── HERO BANNER ── */
//         .vd-hero {
//           position: relative;
//           height: 260px;
//           background: linear-gradient(135deg, #0f1020 0%, #1a1535 50%, #0f1a20 100%);
//           overflow: hidden;
//           display: flex;
//           align-items: flex-end;
//           padding: 2rem 2.5rem;
//         }
//         .vd-hero::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background:
//             radial-gradient(ellipse 60% 80% at 80% 20%, rgba(232,192,106,0.08) 0%, transparent 60%),
//             radial-gradient(ellipse 40% 60% at 10% 80%, rgba(90,120,255,0.07) 0%, transparent 55%);
//         }
//         .vd-hero-grid {
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
//           background-size: 40px 40px;
//         }
//         .vd-hero-content {
//           position: relative;
//           z-index: 2;
//           width: 100%;
//           max-width: 860px;
//           margin: 0 auto;
//         }
//         .vd-back-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.4rem;
//           font-size: 0.78rem;
//           font-weight: 500;
//           color: var(--text-muted);
//           background: rgba(255,255,255,0.05);
//           border: 1px solid var(--border);
//           border-radius: 8px;
//           padding: 5px 14px;
//           cursor: pointer;
//           text-decoration: none;
//           transition: all 0.2s;
//           margin-bottom: 1.4rem;
//           letter-spacing: 0.03em;
//         }
//         .vd-back-btn:hover {
//           color: var(--accent);
//           border-color: var(--accent-border);
//           background: var(--accent-dim);
//         }
//         .vd-eyebrow {
//           font-size: 0.72rem;
//           font-weight: 600;
//           letter-spacing: 0.15em;
//           text-transform: uppercase;
//           color: var(--accent);
//           margin-bottom: 0.5rem;
//           opacity: 0;
//           animation: fadeUp 0.5s 0.1s forwards;
//         }
//         .vd-title {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(1.8rem, 4vw, 2.8rem);
//           font-weight: 700;
//           color: #fff;
//           line-height: 1.15;
//           opacity: 0;
//           animation: fadeUp 0.5s 0.2s forwards;
//         }

//         /* ── BODY ── */
//         .vd-body {
//           max-width: 860px;
//           margin: 0 auto;
//           padding: 2.5rem 2rem 0;
//         }

//         /* ── META ROW ── */
//         .vd-meta-row {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 0.65rem;
//           margin-bottom: 2rem;
//           opacity: 0;
//           animation: fadeUp 0.5s 0.3s forwards;
//         }
//         .vd-chip {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.4rem;
//           font-size: 0.78rem;
//           font-weight: 400;
//           padding: 5px 14px;
//           border-radius: 100px;
//           border: 1px solid var(--border);
//           background: rgba(255,255,255,0.04);
//           color: var(--text-soft);
//           white-space: nowrap;
//         }
//         .vd-chip.accent {
//           background: var(--accent-dim);
//           border-color: var(--accent-border);
//           color: var(--accent);
//         }
//         .vd-chip i { font-size: 0.8rem; }

//         /* ── DIVIDER ── */
//         .vd-divider {
//           border: none;
//           border-top: 1px solid var(--border);
//           margin: 0 0 2rem;
//         }

//         /* ── TWO-COL LAYOUT ── */
//         .vd-layout {
//           display: grid;
//           grid-template-columns: 1fr 280px;
//           gap: 2rem;
//           align-items: start;
//           opacity: 0;
//           animation: fadeUp 0.5s 0.4s forwards;
//         }
//         @media (max-width: 680px) {
//           .vd-layout { grid-template-columns: 1fr; }
//         }

//         /* ── DESCRIPTION ── */
//         .vd-section-label {
//           font-size: 0.7rem;
//           font-weight: 600;
//           letter-spacing: 0.12em;
//           text-transform: uppercase;
//           color: var(--text-muted);
//           margin-bottom: 0.8rem;
//         }
//         .vd-description {
//           font-size: 0.95rem;
//           font-weight: 300;
//           line-height: 1.8;
//           color: var(--text-soft);
//           white-space: pre-line;
//         }

//         /* ── SIDEBAR CARD ── */
//         .vd-sidebar-card {
//           background: var(--surface);
//           border: 1px solid var(--border);
//           border-radius: 16px;
//           padding: 1.5rem;
//           display: flex;
//           flex-direction: column;
//           gap: 1.2rem;
//         }
//         .vd-sidebar-row {
//           display: flex;
//           flex-direction: column;
//           gap: 0.25rem;
//         }
//         .vd-sidebar-key {
//           font-size: 0.68rem;
//           font-weight: 600;
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           color: var(--text-muted);
//         }
//         .vd-sidebar-val {
//           font-size: 0.88rem;
//           font-weight: 400;
//           color: var(--text);
//         }
//         .vd-sidebar-divider {
//           border: none;
//           border-top: 1px solid var(--border);
//         }

//         /* ── POSTER AVATAR ── */
//         .vd-poster-row {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//         }
//         .vd-avatar {
//           width: 38px; height: 38px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #7c6af7, #e8c06a);
//           display: flex; align-items: center; justify-content: center;
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1rem;
//           font-weight: 700;
//           color: #fff;
//           flex-shrink: 0;
//         }
//         .vd-poster-name {
//           font-size: 0.88rem;
//           font-weight: 500;
//           color: var(--text);
//         }
//         .vd-poster-sub {
//           font-size: 0.72rem;
//           color: var(--text-muted);
//         }

//         /* ── STATES ── */
//         .vd-state {
//           min-height: 60vh;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           gap: 1rem;
//           color: var(--text-muted);
//           text-align: center;
//           padding: 3rem;
//         }
//         .vd-state i { font-size: 2.5rem; }
//         .vd-state p { font-size: 0.9rem; }
//         .vd-state .error-msg { color: var(--danger); }

//         .vd-spinner {
//           width: 32px; height: 32px;
//           border: 2px solid rgba(232,192,106,0.15);
//           border-top-color: var(--accent);
//           border-radius: 50%;
//           animation: spin 0.75s linear infinite;
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(14px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>

//       <div className="vd-page">

//         {/* ── LOADING ── */}
//         {loading && (
//           <div className="vd-state">
//             <div className="vd-spinner"></div>
//             <p>Loading event details...</p>
//           </div>
//         )}

//         {/* ── ERROR ── */}
//         {error && !loading && (
//           <div className="vd-state">
//             <i className="bi bi-exclamation-circle error-msg"></i>
//             <p className="error-msg">{error}</p>
//             <button
//               onClick={() => navigate(-1)}
//               style={{
//                 marginTop: '0.5rem',
//                 padding: '7px 20px',
//                 borderRadius: '8px',
//                 border: '1px solid rgba(255,255,255,0.1)',
//                 background: 'rgba(255,255,255,0.05)',
//                 color: 'rgba(221,224,240,0.6)',
//                 fontSize: '0.82rem',
//                 cursor: 'pointer',
//               }}
//             >
//               ← Go Back
//             </button>
//           </div>
//         )}

//         {/* ── CONTENT ── */}
//         {!loading && !error && event && (
//           <>
//             {/* Hero */}
//             <div className="vd-hero">
//               <div className="vd-hero-grid" />
//               <div className="vd-hero-content">
//                 <button className="vd-back-btn" onClick={() => navigate(-1)}>
//                   <i className="bi bi-arrow-left"></i> Back to Events
//                 </button>
//                 <p className="vd-eyebrow">Event Details</p>
//                 <h1 className="vd-title">{event.title}</h1>
//               </div>
//             </div>

//             {/* Body */}
//             <div className="vd-body">

//               {/* Meta chips */}
//               <div className="vd-meta-row">
//                 {event.eventdate && (
//                   <span className="vd-chip accent">
//                     <i className="bi bi-calendar3"></i>
//                     {event.eventdate}
//                   </span>
//                 )}
//                 {event.location && (
//                   <span className="vd-chip">
//                     <i className="bi bi-geo-alt"></i>
//                     {event.location}
//                   </span>
//                 )}
//                 {event.category && (
//                   <span className="vd-chip">
//                     <i className="bi bi-tag"></i>
//                     {event.category}
//                   </span>
//                 )}
//                 {event.createdAt && (
//                   <span className="vd-chip">
//                     <i className="bi bi-clock"></i>
//                     Posted {new Date(event.createdAt).toLocaleDateString('en-IN', {
//                       day: 'numeric', month: 'short', year: 'numeric'
//                     })}
//                   </span>
//                 )}
//               </div>

//               <hr className="vd-divider" />

//               {/* Two-col */}
//               <div className="vd-layout">

//                 {/* Left — Description */}
//                 <div>
//                   <p className="vd-section-label">About this Event</p>
//                   <p className="vd-description">
//                     {event.description || 'No description provided for this event.'}
//                   </p>
//                 </div>

//                 {/* Right — Sidebar */}
//                 <div className="vd-sidebar-card">

//                   {/* Poster */}
//                   {event.poster && (
//                     <>
//                       <div className="vd-sidebar-row">
//                         <span className="vd-sidebar-key">Organised by</span>
//                         <div className="vd-poster-row">
//                           <div className="vd-avatar">
//                             {event.poster.name?.[0]?.toUpperCase() || '?'}
//                           </div>
//                           <div>
//                             <p className="vd-poster-name">{event.poster.name}</p>
//                             {event.poster.email && (
//                               <p className="vd-poster-sub">{event.poster.email}</p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <hr className="vd-sidebar-divider" />
//                     </>
//                   )}

//                   {/* Date */}
//                   {event.eventdate && (
//                     <div className="vd-sidebar-row">
//                       <span className="vd-sidebar-key">Date</span>
//                       <span className="vd-sidebar-val">{event.eventdate}</span>
//                     </div>
//                   )}

//                   {/* Location */}
//                   {event.location && (
//                     <div className="vd-sidebar-row">
//                       <span className="vd-sidebar-key">Location</span>
//                       <span className="vd-sidebar-val">{event.location}</span>
//                     </div>
//                   )}

//                   {/* Category */}
//                   {event.category && (
//                     <div className="vd-sidebar-row">
//                       <span className="vd-sidebar-key">Category</span>
//                       <span className="vd-sidebar-val">{event.category}</span>
//                     </div>
//                   )}

//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxios from '../hooks/axios';

export default function ViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`/event/geteventdetails/${id}`, { withCredentials: true });
        setEvent(data.event);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  if (loading) return <p style={s.center}>Loading...</p>;
  if (error)   return <p style={{ ...s.center, color: '#f76a8c' }}>{error}</p>;
  if (!event)  return <p style={s.center}>Event not found.</p>;

  return (
    <div style={s.page}>

      {/* Back */}
      <button style={s.back} onClick={() => navigate(-1)}>← Back</button>

      {/* Title */}
      <h1 style={s.title}>{event.title}</h1>
      <p style={s.author}>{event.poster?.name || 'Unknown Author'}</p>

      {/* Chips */}
      <div style={s.chips}>
        {event.eventdate && <span style={s.chip}>{new Date(event.eventdate).toLocaleDateString()}</span>}
        {event.location  && <span style={s.chip}>📍 {event.location}</span>}
       
      </div>

      <hr style={s.divider} />

      {/* Description */}
      <p style={s.desc}>{event.description || 'No description provided.'}</p>

    </div>
  );
}

const s = {
  page:   { maxWidth: 700, margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'sans-serif', color: '#e8e8f0', background: '#0a0a14', minHeight: '100vh' },
  center: { textAlign: 'center', marginTop: '4rem', color: '#aaa', fontFamily: 'sans-serif' },
  back:   { background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#aaa', borderRadius: 8, padding: '5px 14px', cursor: 'pointer', fontSize: '0.82rem', marginBottom: '1.8rem' },
  title:  { fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' },
  author: { fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', marginBottom: '1.2rem' },
  chips:  { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' },
  chip:   { fontSize: '0.78rem', padding: '4px 12px', borderRadius: 100, background: 'rgba(124,106,247,0.12)', border: '1px solid rgba(124,106,247,0.2)', color: '#a99ff5' },
  divider:{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 1.5rem' },
  desc:   { fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(232,232,240,0.65)', whiteSpace: 'pre-line' },
};