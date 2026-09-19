/**
 * main.js — Portfolio entry point
 *
 * 1. Fetches ashish_profile.json (single source of truth)
 * 2. Orchestrates module rendering into placeholder containers
 * 3. Initialises navbar scroll behaviour, mobile menu, and IntersectionObserver
 */

import { renderHero }         from './components/hero.js';
import { renderExperience }   from './components/experience.js';
import { renderPortfolio }    from './components/portfolio.js';
import { renderSkills }       from './components/skills.js';
import { renderEducation }    from './components/education.js';
import { renderFooter }       from './components/footer.js';

// ─── DOM Containers ──────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

// ─── Fetch Profile ────────────────────────────────────────────────────────────
async function loadProfile() {
  const res = await fetch('./ashish_profile.json');
  if (!res.ok) throw new Error(`Failed to load profile: ${res.status}`);
  return res.json();
}

// ─── Intersection Observer (scroll reveal) ───────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after reveal to free resources
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  // Scrolled class for border
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile hamburger
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Smooth active-section highlight
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.style.color = '');
          const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (match) match.style.color = 'var(--cyan)';
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(s => sectionObserver.observe(s));
}

function initFocusRing() {
  const selector = 'a, button, [role="tab"]';

  const syncFocusRing = () => {
    document.querySelectorAll('.focus-ring').forEach(el => el.classList.remove('focus-ring'));
    const active = document.activeElement;
    if (active?.matches?.(selector)) active.classList.add('focus-ring');
  };

  document.addEventListener('focusin', event => {
    if (event.target.matches?.(selector)) {
      event.target.classList.add('focus-ring');
    }
  });

  document.addEventListener('focusout', event => {
    event.target.classList?.remove('focus-ring');
  });

  document.addEventListener('keydown', () => requestAnimationFrame(syncFocusRing));
  document.addEventListener('keyup', syncFocusRing);
  document.addEventListener('pointerdown', () => requestAnimationFrame(syncFocusRing));
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
async function boot() {
  try {
    const profile = await loadProfile();

    // Render sections into their placeholder divs
    renderHero       (profile, $('hero-mount'));
    renderExperience (profile, $('experience-mount'));
    renderPortfolio  (profile, $('portfolio-mount'));
    renderSkills     (profile, $('skills-mount'));
    renderEducation  (profile, $('education-mount'));
    renderFooter     (profile, $('footer-mount'));

    // Initialise all behaviours after DOM is populated
    initNavbar();
    initFocusRing();
    initScrollReveal();

  } catch (err) {
    console.error('[Portfolio] Boot failed:', err);
    document.body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;color:#f43f5e;font-family:monospace;font-size:1rem;text-align:center;padding:2rem;">
        <div>
          <p style="font-size:2rem;margin-bottom:1rem;">⚠️</p>
          <p>Failed to load profile data.</p>
          <p style="color:#64748b;margin-top:.5rem;font-size:.85rem;">${err.message}</p>
        </div>
      </div>
    `;
  }
}

// Start after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
