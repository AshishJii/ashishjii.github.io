/**
 * skills.js — Grouped badge matrix.
 * Renders skill groups as cards.
 */

const SKILL_GROUP_ICONS = {
  'Languages': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    color: 'cyan',
  },
  'Libraries & Frameworks': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    color: 'violet',
  },
  'Operating Systems & Tools': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
    color: 'emerald',
  },
  'Cloud/Databases': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    color: 'amber',
  },
  'Core Competencies': {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    color: 'rose',
  },
};

export function renderSkills(data, container) {
  const { skills } = data;

  const groupsHTML = skills.map((group) => {
    const cfg = SKILL_GROUP_ICONS[group.name] || { svg: '◆', color: 'cyan' };
    const badgesHTML = group.keywords.map(kw => `
      <span class="skill-badge">${kw}</span>
    `).join('');

    return `
      <div class="skill-group" aria-label="${group.name} skills">
        <div class="skill-group-header">
          <div class="skill-group-icon ${cfg.color}" aria-hidden="true">
            ${cfg.svg}
          </div>
          <h3 class="skill-group-name">${group.name}</h3>
        </div>
        <div class="skill-badges" role="list" aria-label="${group.name} technologies">
          ${badgesHTML}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <section id="skills">
      <div class="site-wrapper">
        <header class="section-header reveal">
          <p class="section-eyebrow">Tech Stack</p>
          <h2 class="section-title">Skills &amp; <span>Technologies</span></h2>
          <p class="section-sub">From low-level system design to AI orchestration — a versatile toolkit across the full engineering stack.</p>
        </header>

        <div class="skills-grid">
          ${groupsHTML}
        </div>
      </div>
    </section>
  `;
}
