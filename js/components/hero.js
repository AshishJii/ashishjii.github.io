/**
 * hero.js — Hero section renderer
 * Renders: eyebrow, name, role, summary, credibility pills,
 *           CTA buttons, and social network links.
 */

const SOCIAL_ICONS = {
  GitHub: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  LinkedIn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  LeetCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>`,
  Blog: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  Portfolio: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  CodeChef: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.257.004C5.609-.133.164 4.132.164 9.893c0 2.73.896 4.66 2.38 6.068l.585 3.386c.072.415.448.711.872.698l2.02-.063 1.058 2.882c.138.374.499.62.895.612l1.966-.048.52 1.335c.103.265.356.434.64.434h1.794a.693.693 0 0 0 .656-.474l.45-1.295h1.875a.693.693 0 0 0 .656-.474l.974-2.803 1.875.047a.693.693 0 0 0 .68-.512l.498-2.028c1.56-1.402 2.558-3.417 2.558-6.264 0-5.724-5.373-9.88-10.96-9.871zM12 3.2c3.584 0 6.623 2.624 6.847 6.178.194 3.077-1.66 5.696-4.335 6.773l-.314 1.277H9.779l-.388-1.265c-2.718-1.01-4.63-3.66-4.439-6.785C5.178 5.87 8.26 3.2 12 3.2zm-.01 1.82c-2.623 0-4.747 2.124-4.747 4.747s2.124 4.747 4.747 4.747 4.747-2.124 4.747-4.747-2.124-4.747-4.747-4.747z"/></svg>`,
  HackerRank: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12-.642 1.115-9.107 6-10.392 6-1.285 0-9.75-4.885-10.392-6C1.062 16.885 1.08 7.115 1.608 6 2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V7.057c0-.143-.117-.258-.26-.258H8.14c-.143 0-.258.115-.258.258v9.886c0 .143.115.258.258.258H9.7c.144 0 .26-.115.26-.258v-4.096h4.074v4.096c0 .143.116.258.258.258h1.563c.143 0 .258-.115.258-.258V7.057c0-.143-.115-.258-.258-.258z"/></svg>`
};

const CREDIBILITY_PILLS = [
  { label: 'ICPC Regionalist #204', color: 'cyan' },
  { label: 'GATE 2026 AIR 3536',    color: 'emerald' },
  { label: 'Adobe Top 100 Finalist',color: 'violet' },
  { label: 'NPTEL Discipline Star', color: 'amber' },
];

export function renderHero(data, container) {
  const { basics } = data;
  const socials = basics.profiles.filter(p =>
    ['GitHub','LinkedIn','LeetCode','Blog'].includes(p.network)
  );

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

            <div class="hero-eyebrow opacity-0 animate-fade-in-up animation-delay-100">
              <span class="dot"></span>
              Available for opportunities
            </div>

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
              <a href="#projects" class="btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                View Projects
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
