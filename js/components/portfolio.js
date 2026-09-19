/**
 * portfolio.js — Tabbed Projects / Achievements / Certifications
 *
 * Single section with a tab switcher (Projects | Achievements | Certifications).
 * Each panel renders an image-card grid; only the first `CARD_LIMIT` items show
 * initially, with a "Show More" button revealing the rest.
 *
 * Source of truth: ashish_profile.json → projects[], achievements[], certificates[]
 * Featured items are surfaced first within each panel.
 */

const CARD_LIMIT = 6;

const EXTERNAL_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
const GITHUB_ICON   = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;
const FOLDER_ICON   = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;
const TROPHY_ICON   = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="18" width="12" height="4"/></svg>`;
const CERT_ICON     = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;

const AWARD_EMOJIS = {
  'ICPC':      '🏆',
  'GATE':      '🎯',
  'Adobe':     '⚡',
  'NPTEL':     '⭐',
  'Vultr':     '🏅',
  'Winner':    '🏅',
  'HackIITK': '🔐',
  '1st place': '🥇',
  '2nd place': '🥈',
  'Third':     '🥉',
  'Runner':    '🥈',
  'Finalist':  '🎖️',
  'ErpSense':  '🌐',
  'Solved':    '💻',
};

function getAwardEmoji(title) {
  for (const [key, emoji] of Object.entries(AWARD_EMOJIS)) {
    if (title.includes(key)) return emoji;
  }
  return '🎗️';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  if (!month) return year;
  const d = new Date(parseInt(year), parseInt(month) - 1, 1);
  return d.toLocaleString('en-US', { month: 'short', year: 'numeric' });
}

// Issuer → short display tag and accent colour
const ISSUER_CONFIG = {
  'Oracle':    { short: 'Oracle',   color: 'var(--amber)' },
  'NPTEL':     { short: 'NPTEL',    color: 'var(--cyan)' },
  'KodeKloud': { short: 'KodeKloud',color: 'var(--emerald)' },
  'Google':    { short: 'Google',   color: 'var(--violet)' },
  'Adobe':     { short: 'Adobe',    color: 'var(--violet)' },
  'Coursera':  { short: 'Coursera', color: 'var(--cyan)' },
};

function issuerTag(issuer) {
  const cfg = Object.entries(ISSUER_CONFIG).find(([k]) => issuer.includes(k));
  if (!cfg) return '';
  const [, { short, color }] = cfg;
  return `<span style="font-family:var(--font-mono);font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:4px;background:rgba(255,255,255,0.04);border:1px solid var(--border);color:${color}">${short}</span>`;
}

/**
 * Visual config per project name (icon, accent, badge, tech stack).
 * Projects without an entry fall back to a generated default.
 */
const PROJECT_CONFIG = {
  'IntelliPDF': {
    accent:     'cyan',
    icon:       '🧠',
    badge:      'Adobe Top 100',
    badgeColor: 'violet',
    stack:      ['Python', 'BERT', 'LangGraph', 'Gemini API', 'Azure TTS', 'Docker', 'Vector DB'],
  },
  'JobHunter': {
    accent: 'emerald',
    icon:   '💼',
    stack:  ['Spring Boot', 'Hibernate', 'MySQL', 'React', 'JWT', 'RBAC'],
  },
  'EventEasy': {
    accent: 'violet',
    icon:   '🎟️',
    stack:  ['React Native', 'Node.js', 'JWT', 'QR Codes', 'CSV'],
  },
  'ErpSnap': {
    accent: 'amber',
    icon:   '⚡',
    stack:  ['Python', 'REST APIs', 'Windows', 'Auto-start'],
  },
  'BreakOut': {
    accent: 'cyan',
    icon:   '🎮',
    stack:  ['HTML Canvas', 'JavaScript', 'Firebase', 'OOP'],
  },
};

const DEFAULT_ACCENTS = ['cyan', 'emerald', 'violet', 'amber'];
const DEFAULT_ICONS   = ['🛠️', '📦', '🔧', '🧩'];

function projectConfigFor(project, i) {
  if (PROJECT_CONFIG[project.name]) return PROJECT_CONFIG[project.name];
  const techLine = (project.highlights || []).find(h => h.startsWith('Technology Used'));
  const stack = techLine
    ? techLine.replace(/^Technology Used:\s*/, '').split(',').map(s => s.trim()).filter(Boolean)
    : [];
  const idx = i % DEFAULT_ACCENTS.length;
  return { accent: DEFAULT_ACCENTS[idx], icon: DEFAULT_ICONS[idx], stack };
}

function buildBadge(label, color) {
  const styles = {
    violet: 'color:var(--violet);background:rgba(129,140,248,0.12);border-color:rgba(129,140,248,0.3);',
    cyan:   'color:var(--cyan);background:rgba(34,211,238,0.1);border-color:rgba(34,211,238,0.25);',
    emerald:'color:var(--emerald);background:rgba(16,185,129,0.1);border-color:rgba(16,185,129,0.25);',
    amber:  'color:var(--amber);background:rgba(245,158,11,0.1);border-color:rgba(245,158,11,0.25);',
  };
  return `<span class="pf-card-badge" style="${styles[color] || styles.cyan}">${label}</span>`;
}

function renderProjectCard(project, i) {
  const cfg      = projectConfigFor(project, i);
  const image    = project.image || '';
  const githubUrl = project.github || 'https://github.com/AshishJii';
  const liveUrl   = project.url || '';
  const badge     = cfg.badge ? buildBadge(cfg.badge, cfg.badgeColor) : '';
  const stackHTML = (cfg.stack || []).slice(0, 6).map(t => `<span class="stack-tag">${t}</span>`).join('');

  return `
    <article class="pf-card accent-${cfg.accent}" ${i >= CARD_LIMIT ? 'hidden' : ''} data-extra="${i >= CARD_LIMIT}">
      <div class="pf-card-image-wrap">
        <img class="pf-card-image" src="${image}" alt="${project.name}" loading="lazy">
        ${badge}
        <div class="pf-card-links">
          <a class="pf-card-link" href="${githubUrl}" target="_blank" rel="noopener" aria-label="View ${project.name} on GitHub" title="GitHub">${GITHUB_ICON}</a>
          ${liveUrl ? `<a class="pf-card-link" href="${liveUrl}" target="_blank" rel="noopener" aria-label="${project.name} live demo" title="Live Demo">${EXTERNAL_ICON}</a>` : ''}
        </div>
      </div>
      <div class="pf-card-body">
        <h3 class="pf-card-title">${cfg.icon} ${project.name}</h3>
        <p class="pf-card-desc">${project.description}</p>
        <div class="pf-card-tags">${stackHTML}</div>
      </div>
    </article>
  `;
}

function renderAwardCard(award, i) {
  const emoji   = getAwardEmoji(award.title);
  const image   = award.image || '';
  const hasLink = !!award.url;

  return `
    <article class="pf-card" ${i >= CARD_LIMIT ? 'hidden' : ''} data-extra="${i >= CARD_LIMIT}">
      <div class="pf-card-image-wrap">
        <img class="pf-card-image" src="${image}" alt="${award.title}" loading="lazy">
        ${hasLink ? `<div class="pf-card-links"><a class="pf-card-link" href="${award.url}" target="_blank" rel="noopener" title="View">${EXTERNAL_ICON}</a></div>` : ''}
      </div>
      <div class="pf-card-body">
        <h3 class="pf-card-title">${emoji} ${award.title}</h3>
        <p class="pf-card-sub">${award.awarder}</p>
        <p class="pf-card-desc">${award.summary}</p>
        ${award.date ? `<div class="pf-card-meta"><span class="pf-card-date">${award.date}</span></div>` : ''}
      </div>
    </article>
  `;
}

function renderCertCard(cert, i) {
  const dateStr = formatDate(cert.date);
  const tag     = issuerTag(cert.issuer);
  const hasLink = !!cert.url;
  const image   = cert.image || '';

  return `
    <article class="pf-card" ${i >= CARD_LIMIT ? 'hidden' : ''} data-extra="${i >= CARD_LIMIT}">
      <div class="pf-card-image-wrap">
        <img class="pf-card-image" src="${image}" alt="${cert.name}" loading="lazy">
        ${hasLink ? `<div class="pf-card-links"><a class="pf-card-link" href="${cert.url}" target="_blank" rel="noopener" title="View certificate">${EXTERNAL_ICON}</a></div>` : ''}
      </div>
      <div class="pf-card-body">
        <h3 class="pf-card-title" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
          <span>${cert.name}</span>
          ${tag}
        </h3>
        <p class="pf-card-sub">${cert.issuer}</p>
        ${dateStr ? `<div class="pf-card-meta"><span class="pf-card-date">${dateStr}</span></div>` : ''}
      </div>
    </article>
  `;
}

function showMoreButton(panelId, total) {
  if (total <= CARD_LIMIT) return '';
  return `
    <div class="pf-show-more-wrap">
      <button class="btn-secondary pf-show-more" data-target="${panelId}">Show ${total - CARD_LIMIT} More</button>
    </div>
  `;
}

// Featured items surface first within each panel, original order preserved otherwise.
function byFeaturedFirst(items) {
  return [...items].sort((a, b) => (b.featured === true ? 1 : 0) - (a.featured === true ? 1 : 0));
}

function initTabs(root) {
  const tabs   = root.querySelectorAll('.pf-tab');
  const panels = root.querySelectorAll('.pf-panel');

  function activate(name) {
    if (![...tabs].some(t => t.dataset.tab === name)) return;
    tabs.forEach(t => {
      const active = t.dataset.tab === name;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === name));
  }

  tabs.forEach(t => t.addEventListener('click', () => {
    activate(t.dataset.tab);
    history.replaceState(null, '', `#${t.dataset.tab === 'projects' ? 'projects' : t.dataset.tab}`);
  }));

  // Deep-link support: nav links to #achievements / #projects switch tabs too.
  const applyHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'achievements' || hash === 'projects' || hash === 'certifications') activate(hash);
  };
  window.addEventListener('hashchange', applyHash);
  applyHash();
}

function initShowMore(root) {
  root.querySelectorAll('.pf-show-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = root.querySelector(`.pf-panel[data-panel="${btn.dataset.target}"]`);
      panel.querySelectorAll('.pf-card[hidden]').forEach(card => card.removeAttribute('hidden'));
      btn.remove();
    });
  });
}

export function renderPortfolio(data, container) {
  const projects     = byFeaturedFirst(data.projects);
  const achievements = byFeaturedFirst(data.achievements || []);
  const certificates = byFeaturedFirst(data.certificates);

  const projectsHTML    = projects.map((p, i) => renderProjectCard(p, i)).join('');
  const achievementsHTML = achievements.map((a, i) => renderAwardCard(a, i)).join('');
  const certsHTML       = certificates.map((c, i) => renderCertCard(c, i)).join('');

  container.innerHTML = `
    <section id="projects">
      <div class="site-wrapper">
        <span id="achievements" class="pf-anchor"></span>

        <header class="section-header reveal">
          <p class="section-eyebrow">Portfolio</p>
          <h2 class="section-title">Projects &amp; <span>Achievements</span></h2>
          <p class="section-sub">Production-grade systems, competitive-programming wins, and industry certifications — browse by category.</p>
        </header>

        <div class="pf-tabs reveal" role="tablist">
          <button class="pf-tab" data-tab="projects" role="tab" aria-selected="false">${FOLDER_ICON} Projects</button>
          <button class="pf-tab active" data-tab="achievements" role="tab" aria-selected="true">${TROPHY_ICON} Achievements</button>
          <button class="pf-tab" data-tab="certifications" role="tab" aria-selected="false">${CERT_ICON} Certifications</button>
        </div>

        <div class="pf-panel" data-panel="projects">
          <div class="pf-grid">${projectsHTML}</div>
          ${showMoreButton('projects', projects.length)}
          <div style="text-align:center;margin-top:32px">
            <a href="https://github.com/AshishJii" target="_blank" rel="noopener" class="btn-secondary">
              ${GITHUB_ICON}
              View All Projects on GitHub
            </a>
          </div>
        </div>

        <div class="pf-panel active" data-panel="achievements">
          <div class="pf-grid">${achievementsHTML}</div>
          ${showMoreButton('achievements', achievements.length)}
        </div>

        <div class="pf-panel" data-panel="certifications">
          <div class="pf-grid">${certsHTML}</div>
          ${showMoreButton('certifications', certificates.length)}
        </div>
      </div>
    </section>
  `;

  initTabs(container);
  initShowMore(container);
}
