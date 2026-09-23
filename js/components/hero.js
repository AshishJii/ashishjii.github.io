/**
 * hero.js — Hero section renderer
 * Renders: eyebrow, name, role, summary, credibility pills,
 *           CTA buttons, and social network links.
 */

const SOCIAL_ICONS = {
  GitHub: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  LinkedIn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  Blog: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`
};

const CREDIBILITY_PILLS = [
  { label: 'ICPC Regionalist #204', color: 'cyan' },
  { label: 'GATE 2026 AIR 3536', color: 'emerald' },
  { label: 'Adobe Top 100 Finalist', color: 'violet' },
  { label: 'NPTEL Discipline Star', color: 'amber' },
];

export function renderHero(data, container) {
  const { basics } = data;
  const socials = basics.profiles.filter(p =>
    ['GitHub', 'LinkedIn'].includes(p.network)
  );
  const blogProfile = basics.profiles.find(p => p.network === 'Blog');
  const blogUrl = blogProfile ? blogProfile.url : '#';

  const pillsHTML = CREDIBILITY_PILLS.map(p => `
    <span class="hero-pill ${p.color}">
      ${p.label}
    </span>
  `).join('');

  const socialsHTML = socials.map(p => `
    <a href="${p.url}" target="_blank" rel="noopener" class="hero-social-link" aria-label="${p.network}">
      ${SOCIAL_ICONS[p.network] || ''}
      ${p.network}
    </a>
  `).join('');

  // Inline style for avatar (injected once, avoids extra CSS file edits)
  const avatarStyle = `
    .hero-layout { display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: center; }
    @media (max-width: 768px) { .hero-layout { grid-template-columns: 1fr; } .hero-avatar-wrap { display: none; } }
    .hero-avatar-wrap { position: relative; flex-shrink: 0; }
    .hero-avatar-ring {
      width: 260px; height: 260px; border-radius: 50%;
      background: linear-gradient(135deg, rgba(34,211,238,0.4), rgba(16,185,129,0.25));
      padding: 3px;
      box-shadow: 0 0 60px rgba(34,211,238,0.2), 0 0 120px rgba(34,211,238,0.07);
    }
    .hero-avatar-ring img {
      width: 100%; height: 100%; border-radius: 50%; object-fit: cover;
      background: var(--surface-2);
      border: 3px solid var(--canvas);
    }
    .hero-avatar-badge {
      position: absolute; bottom: 10px; right: 10px;
      background: var(--surface); border: 1px solid var(--border-2);
      border-radius: 10px; padding: 8px 14px;
      font-family: var(--font-mono); font-size: 0.72rem;
      color: var(--emerald); white-space: nowrap;
      box-shadow: 0 4px 24px rgba(0,0,0,0.5);
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = avatarStyle;
  document.head.appendChild(styleEl);

  container.innerHTML = `
    <section id="hero">
      <div class="hero-bg">
        <div class="hero-grid"></div>
        <div class="hero-glow-1"></div>
        <div class="hero-glow-2"></div>
      </div>

      <div class="site-wrapper hero-content">
        <div class="hero-layout">

          <!-- Left: text content -->
          <div>
            <p class="location-badge opacity-0 animate-fade-in-up animation-delay-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${basics.location.city}, ${basics.location.region}, ${basics.location.countryCode}
            </p>


            <h1 class="hero-name opacity-0 animate-fade-in-up animation-delay-200">
              ${basics.name}
            </h1>

            <p class="hero-role opacity-0 animate-fade-in-up animation-delay-200">
              &gt; ${basics.label} &amp; Cloud-Native AI Engineer
            </p>

            <p class="hero-summary opacity-0 animate-fade-in-up animation-delay-300">
              ${basics.summary}
            </p>

            <div class="hero-pills opacity-0 animate-fade-in-up animation-delay-400">
              ${pillsHTML}
            </div>

            <div class="hero-actions opacity-0 animate-fade-in-up animation-delay-400">
              <a href="${blogUrl}" target="_blank" rel="noopener" class="btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                Read Blog
              </a>
              <a href="mailto:${basics.email}" class="btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Get in Touch
              </a>
            </div>

            <div class="hero-socials opacity-0 animate-fade-in-up animation-delay-500">
              ${socialsHTML}
            </div>
          </div>

          <!-- Right: avatar -->
          <div class="hero-avatar-wrap opacity-0 animate-fade-in-up animation-delay-300">
            <div class="hero-avatar-ring">
              <img src="./images/main/img_pfp.png" alt="Ashish Verma" loading="eager" />
            </div>
            <div class="hero-avatar-badge">
              Software Engineer @ rtCamp
            </div>
          </div>

        </div>
      </div>
    </section>
  `;
}
