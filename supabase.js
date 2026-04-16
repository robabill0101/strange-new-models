/* Strange New Models — Supabase config & helpers
   Include this before any page scripts that need live data */

const SUPABASE_URL = 'https://ozciknzkolkhcntgsrfa.supabase.co';
const SUPABASE_KEY = 'sb_publishable_5LZuji7cOqKYadq4zD6kMA_xk8jMDs-';

// ── Core fetch helper ─────────────────────────────────────────
async function sbFetch(endpoint, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    headers: {
      'apikey':        SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type':  'application/json',
      'Prefer':        'count=exact',
      ...options.headers
    },
    ...options
  });
  if (!res.ok) throw new Error(`Supabase error ${res.status}`);
  return res.json();
}

async function sbPost(endpoint, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    method: 'POST',
    headers: {
      'apikey':        SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type':  'application/json',
      'Prefer':        'return=minimal'
    },
    body: JSON.stringify(data)
  });
  return res.ok;
}

// ── Price helper ──────────────────────────────────────────────
function getPrice(ship) {
  if (ship.name && /\bKIT\b/.test(ship.name)) return 70;
  if (ship.name && ship.name.toLowerCase().includes('athena')) return 25;
  return parseFloat(ship.price) || 12;
}

// ── Session ID for likes (no login needed) ────────────────────
function getSessionId() {
  let sid = localStorage.getItem('snm_session');
  if (!sid) {
    sid = 'sess_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('snm_session', sid);
  }
  return sid;
}

// ── Like a ship ───────────────────────────────────────────────
async function likeShip(shipId) {
  const sid = getSessionId();
  const ok = await sbPost('likes', { ship_id: shipId, session_id: sid });
  if (ok) {
    // Increment like count on ship
    await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_likes`, {
      method: 'POST',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ship_id: shipId })
    });
  }
  return ok;
}

// ── Check if user already liked a ship ───────────────────────
async function hasLiked(shipId) {
  const sid = getSessionId();
  const res = await sbFetch(`likes?ship_id=eq.${shipId}&session_id=eq.${sid}&select=id`);
  return Array.isArray(res) && res.length > 0;
}

// ── Factions list ─────────────────────────────────────────────
const ALL_FACTIONS = [
  { name: 'Federation',   icon: '🖖' },
  { name: 'Klingons',     icon: '⚔' },
  { name: 'Romulans',     icon: '🦅' },
  { name: 'Borg',         icon: '🔲' },
  { name: 'Cardassians',  icon: '🐍' },
  { name: 'Ferengi',      icon: '💰' },
  { name: 'Shuttles',     icon: '🚀' },
  { name: 'Stations',     icon: '🛸' },
];

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg, color = 'var(--accent)') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = 'position:fixed;bottom:28px;right:28px;background:var(--panel);border:1px solid var(--accent);border-radius:3px;padding:12px 20px;font-size:0.85rem;z-index:3000;transform:translateX(120%);transition:transform 0.3s;max-width:300px';
    document.body.appendChild(t);
  }
  t.style.color = color;
  t.style.borderColor = color;
  t.textContent = msg;
  t.style.transform = 'translateX(0)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.style.transform = 'translateX(120%)', 2800);
}
