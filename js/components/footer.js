/**
 * footer.js — Footer with contact info, nav links, profiles, and copyright.
 */

const SOCIAL_ICONS = {
  GitHub: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  LinkedIn: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  LeetCode: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>`,
  Blog: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  CodeChef: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M11.257.004C5.609-.133.164 4.132.164 9.893c0 2.73.896 4.66 2.38 6.068l.585 3.386c.072.415.448.711.872.698l2.02-.063 1.058 2.882c.138.374.499.62.895.612l1.966-.048.52 1.335c.103.265.356.434.64.434h1.794a.693.693 0 0 0 .656-.474l.45-1.295h1.875a.693.693 0 0 0 .656-.474l.974-2.803 1.875.047a.693.693 0 0 0 .68-.512l.498-2.028c1.56-1.402 2.558-3.417 2.558-6.264 0-5.724-5.373-9.88-10.96-9.871z"/></svg>`,
  HackerRank: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12-.642 1.115-9.107 6-10.392 6-1.285 0-9.75-4.885-10.392-6C1.062 16.885 1.08 7.115 1.608 6 2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V7.057c0-.143-.117-.258-.26-.258H8.14c-.143 0-.258.115-.258.258v9.886c0 .143.115.258.258.258H9.7c.144 0 .26-.115.26-.258v-4.096h4.074v4.096c0 .143.116.258.258.258h1.563c.143 0 .258-.115.258-.258V7.057c0-.143-.115-.258-.258-.258z"/></svg>`,
};

const NAV_SECTIONS = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects' },
  { href: '#skills',     label: 'Skills' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#education',  label: 'Education' },
];

export function renderFooter(data, container) {
  const { basics } = data;
  const year = new Date().getFullYear();

  const profilesHTML = basics.profiles.map(p => `
    <li>
      <a href="${p.url}" target="_blank" rel="noopener" aria-label="${p.network}">
        ${SOCIAL_ICONS[p.network] || ''}
        ${p.network}
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-3); margin-left: 2px;">@${p.username}</span>
      </a>
    </li>
  `).join('');

  const navLinksHTML = NAV_SECTIONS.map(n => `
    <li><a href="${n.href}">${n.label}</a></li>
  `).join('');

  container.innerHTML = `
    <footer id="footer" role="contentinfo">
      <div class="site-wrapper">
        <div class="footer-grid">

          <!-- Brand / Contact -->
          <div>
            <div class="footer-brand-name">${basics.name.split(' ')[0]}.dev</div>
            <p class="footer-brand-desc">
              Full Stack Engineer &amp; Cloud-Native AI specialist. Open to exciting engineering challenges and full-time opportunities.
            </p>
            <a href="mailto:${basics.email}" class="footer-email" aria-label="Send email to ${basics.name}">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              ${basics.email}
            </a>
          </div>

          <!-- Navigation -->
          <div>
            <p class="footer-col-title">Navigation</p>
            <ul class="footer-links">
              ${navLinksHTML}
            </ul>
          </div>

          <!-- Profiles -->
          <div>
            <p class="footer-col-title">Profiles</p>
            <ul class="footer-links">
              ${profilesHTML}
            </ul>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <p class="footer-copy">
            © ${year} <span>${basics.name}</span>. Built with vanilla JS &amp; ♥.
          </p>
          <p class="footer-copy" style="display:flex; align-items:center; gap:6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${basics.location.city}, ${basics.location.region}
          </p>
        </div>
      </div>
    </footer>
  `;
}
