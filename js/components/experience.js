/**
 * experience.js — Vertical timeline for work history
 * Renders company, role, duration badge, and impact bullets.
 */

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [year, month] = dateStr.split('-');
  if (!month) return year;
  const d = new Date(parseInt(year), parseInt(month) - 1, 1);
  return d.toLocaleString('en-US', { month: 'short', year: 'numeric' });
}

function formatRange(start, end) {
  const s = formatDate(start);
  const e = end ? formatDate(end) : 'Present';
  if (!s) return '';
  return `${s} — ${e}`;
}

function getCompanyAccent(name) {
  const map = {
    'rtCamp': 'cyan',
    'Infosys': 'violet',
    'Strinity Automation': 'emerald',
    'Freelance': 'amber',
    'PSIT, Kanpur': 'violet'
  };
  return map[name] || 'cyan';
}

function getCompanyEmoji(name) {
  const map = {
    'rtCamp': '🚀',
    'Infosys': '🏢',
    'Strinity Automation': '⚙️',
    'Freelance': '💻',
    'PSIT, Kanpur': '🎓'
  };
  return map[name] || '🏢';
}

const WORK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
const FREELANCE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;

function buildTimelineItem(job, index, type) {
  const isCurrent = !job.endDate;
  const accent = getCompanyAccent(job.name || job.organization);
  const dateRange = formatRange(job.startDate, job.endDate);
  const emoji = getCompanyEmoji(job.name || job.organization);
  
  const companyName = job.name || job.organization;
  const roleName = job.position;
  
  const highlightsHTML = job.highlights.slice(0, 2).map(h => `<li>${h}</li>`).join('');
  
  // Custom badge logic based on type
  let badgeHTML = '';
  if (type === 'volunteer') {
    badgeHTML = `<span class="timeline-badge" style="background: rgba(129,140,248,0.15); color: var(--violet); border-color: rgba(129,140,248,0.3);">Volunteer</span>`;
  } else if (type === 'freelance') {
    badgeHTML = `<span class="timeline-badge" style="background: rgba(245,158,11,0.15); color: var(--amber); border-color: rgba(245,158,11,0.3);">Freelance</span>`;
  } else if (type === 'internship') {
    badgeHTML = `<span class="timeline-badge" style="background: rgba(16,185,129,0.15); color: var(--emerald); border-color: rgba(16,185,129,0.3);">Internship</span>`;
  } else {
    badgeHTML = `<span class="timeline-badge ${isCurrent ? 'badge-current' : 'badge-past'}">${isCurrent ? '● Current' : 'Full-time'}</span>`;
  }

  // Adjust dot color
  let dotColor = '';
  if (type === 'volunteer') dotColor = '#818cf8';
  else if (type === 'freelance') dotColor = '#f59e0b';
  else if (type === 'internship') dotColor = '#10b981';

  const dotStyle = dotColor ? `style="background: ${dotColor};"` : '';
  const roleStyle = type === 'volunteer' ? `style="color: var(--violet)"` : (type === 'freelance' ? `style="color: var(--amber)"` : '');

  return `
    <div class="timeline-item" style="transition-delay: ${index * 0.1}s">
      <div class="timeline-dot">
        <div class="timeline-dot-inner" ${dotStyle}></div>
      </div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div>
            <div class="timeline-company">${emoji} ${companyName}</div>
            <div class="timeline-role" ${roleStyle}>${roleName}</div>
          </div>
          <div class="timeline-meta">
            ${dateRange ? `<div class="timeline-date">${dateRange}</div>` : ''}
            ${badgeHTML}
          </div>
        </div>
        <ul class="timeline-highlights">
          ${highlightsHTML}
        </ul>
      </div>
    </div>
  `;
}

export function renderExperience(data, container) {
  const { work, volunteer } = data;
  
  // 1. Professional Experience (Full-time & Internships)
  // rtCamp (Full-time), Infosys & Strinity (Internships)
  const profWork = work.filter(w => w.name !== 'Freelance');
  
  const profHTML = profWork.map((job, i) => {
    let type = 'fulltime';
    if (job.position.toLowerCase().includes('intern') || job.name === 'Infosys' || job.name === 'Strinity Automation') {
      type = 'internship';
    }
    return buildTimelineItem(job, i, type);
  }).join('');

  // 2. Freelance & Volunteering
  const freelanceWork = work.filter(w => w.name === 'Freelance');
  const allVol = [...freelanceWork.map(w => ({...w, _type: 'freelance'})), ...volunteer.map(v => ({...v, _type: 'volunteer'}))];
  
  const volHTML = allVol.map((item, i) => {
    return buildTimelineItem(item, profWork.length + i, item._type);
  }).join('');

  container.innerHTML = `
    <section id="experience">
      <div class="site-wrapper">
        <header class="section-header reveal">
          <p class="section-eyebrow">Work History</p>
          <h2 class="section-title">Experience &amp; <span>Impact</span></h2>
          <p class="section-sub">Enterprise APIs, cloud-native systems, AI pipelines — delivering measurable outcomes at every role.</p>
        </header>

        <div class="reveal">
          <h3 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--cyan); margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.1em; display: flex; align-items: center; gap: 10px;">
            ${WORK_ICON} Professional Experience
          </h3>
          <div class="timeline" style="margin-bottom: 56px;">
            ${profHTML}
          </div>
        </div>

        <div class="reveal">
          <h3 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--amber); margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.1em; display: flex; align-items: center; gap: 10px;">
            ${FREELANCE_ICON} Freelance &amp; Volunteering
          </h3>
          <div class="timeline">
            ${volHTML}
          </div>
        </div>
        
      </div>
    </section>
  `;
}
