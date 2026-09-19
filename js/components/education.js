/**
 * education.js — Education section with degree card.
 */

export function renderEducation(data, container) {
  const { education } = data;
  const edu = education[0];

  const coursesHTML = (edu.courses || []).map(c => `
    <span class="edu-course">${c}</span>
  `).join('');

  // Extract numeric CGPA for display
  const cgpaMatch = edu.score ? edu.score.match(/[\d.]+/) : null;
  const cgpa = cgpaMatch ? cgpaMatch[0] : edu.score;

  container.innerHTML = `
    <section id="education">
      <div class="site-wrapper">
        <header class="section-header reveal">
          <p class="section-eyebrow">Academic Background</p>
          <h2 class="section-title">Education &amp; <span>Coursework</span></h2>
        </header>

        <div class="education-card reveal" style="transition-delay: 0.1s">
          <div>
            <p class="edu-degree">${edu.studyType}</p>
            <h3 class="edu-institution">${edu.institution}</h3>
            <p class="edu-area">${edu.area}</p>
            <div class="edu-courses" role="list" aria-label="Relevant coursework">
              ${coursesHTML}
            </div>
          </div>

          <div class="edu-stat">
            <div>
              <div class="edu-score">${cgpa}</div>
              <div class="edu-score-label">CGPA</div>
            </div>
            <div class="edu-year-badge">${edu.startDate} — ${edu.endDate}</div>
          </div>
        </div>
      </div>
    </section>
  `;
}
