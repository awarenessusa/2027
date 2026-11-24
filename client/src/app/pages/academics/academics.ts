import { Component } from '@angular/core';
import { CtaBand } from '../../shared/cta-band';

@Component({
  selector: 'app-academics',
  imports: [CtaBand],
  template: `
    <section class="page-hero ph-tutoring">
      <div class="container">
        <span class="eyebrow">Peer Tutoring Program</span>
        <h1>Academic Excellence</h1>
        <p class="lead">
          A one-on-one, online peer coaching enrichment program for middle and
          high school students.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="split">
          <div>
            <span class="eyebrow">Program Overview</span>
            <h2>Personalized support in every core subject</h2>
            <p>
              The AUSA Peer Tutoring Program offers tutoring in core subjects —
              math, science, English, and history — along with specialized topic
              support and homework assistance.
            </p>
            <p>
              Parents and guardians are encouraged to actively support their
              children's participation, ensuring regular attendance and engagement.
            </p>
            <p>
              <strong>Our mission:</strong> to empower students to build a better
              world through academic excellence and essential life skills.
            </p>
          </div>
          <div class="card fee-card">
            <h3>Tuition Fee</h3>
            <p class="fee">$100 <span>/ six months</span></p>
            <p class="fee">$200 <span>/ year</span></p>
            <p class="note">
              Suggested donation — <strong>free tutoring is available for families
              facing financial hardship.</strong> Student contributions cover only
              a small part of program costs.
            </p>
            <a class="btn btn-primary" href="https://learning.awarenessusa.org/login" target="_blank" rel="noopener">Register for the Program</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Student Benefits</span>
          <h2>What students gain</h2>
        </div>
        <ul class="checklist">
          <li><strong>Academic excellence</strong> — targeting Grade A+ outcomes</li>
          <li><strong>Recognition &amp; awards</strong> — Most Improved Student, Perfect Attendance, Top Performer in Speech and Essay Competitions, Best Behavior, and Community Service Excellence</li>
          <li><strong>Confidence</strong> — a safe, encouraging space to ask questions and grow</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center">
          <h2>Student Instructors' Benefits</h2>
        </div>
        <div class="benefit-grid">
          <div class="benefit-card">
            <span class="b-chip"><svg class="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><rect x="14" y="4" width="8" height="6" rx="1"/><path d="M16.5 7h3M18 5.5v3"/></svg></span>
            <p>Hands-on teaching experience</p>
          </div>
          <div class="benefit-card">
            <span class="b-chip"><svg class="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1.5"/><circle cx="12" cy="9" r="2.6"/><path d="M8 16.5c.7-1.8 2.2-2.8 4-2.8s3.3 1 4 2.8M8.5 5.5h2M14.5 5.5h1"/></svg></span>
            <p>College recommendation letters</p>
          </div>
          <div class="benefit-card">
            <span class="b-chip"><svg class="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2.2"/><path d="M8.5 3.5 6 6M15.5 3.5 18 6"/></svg></span>
            <p>Access to life skill training</p>
          </div>
          <div class="benefit-card">
            <span class="b-chip"><svg class="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M17 4H7v5a5 5 0 0 0 10 0V4Z"/><path d="M17 5h3.5v1.5a3.5 3.5 0 0 1-3.5 3.5M7 5H3.5v1.5a3.5 3.5 0 0 0 3.5 3.5"/><path d="m12 6.5.9 1.7 1.9.3-1.4 1.3.3 1.9-1.7-.9-1.7.9.3-1.9-1.4-1.3 1.9-.3L12 6.5Z"/></svg></span>
            <p>Opportunities to earn Model &amp; Best Teacher Awards</p>
          </div>
          <div class="benefit-card">
            <span class="b-chip"><svg class="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-9.3-8.5C1 8 3 5 6.2 5c2 0 3.4 1 4.3 2.3l1.5 1.9 1.5-1.9C14.4 6 15.8 5 17.8 5 21 5 23 8 21.3 11.5 19 15.6 12 20 12 20Z"/><path d="M8 11.5h2l1.2-2 1.8 3.5 1.2-1.5h1.8"/></svg></span>
            <p>Health and well-being benefits through service</p>
          </div>
          <div class="benefit-card">
            <span class="b-chip"><svg class="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/><circle cx="10" cy="8.5" r="1.6"/><path d="M7.5 12.5c.6-1.1 1.4-1.6 2.5-1.6s1.9.5 2.5 1.6"/><circle cx="17" cy="9.5" r="2.5"/><path d="M17 8v1.5l1 1"/></svg></span>
            <p>Volunteer hours for online teaching</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container life-skills">
        <div class="ls-intro">
          <h2>Life Skills And Leadership Training Division</h2>
          <p>Our program provides students with training in essential life skills to foster personal growth, including:</p>
        </div>
        <div class="ls-col card">
          <ul class="checklist">
            <li>Self-Expression</li>
            <li>Positive body language</li>
            <li>Active Listening</li>
            <li>Public Speaking</li>
            <li>Goal Setting</li>
          </ul>
        </div>
        <div class="ls-col card">
          <ul class="checklist">
            <li>Time Management</li>
            <li>Stress Management</li>
            <li>Interpersonal Skills</li>
            <li>Leadership Development</li>
            <li>Social Responsibility</li>
          </ul>
        </div>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: [`
    .fee-card { align-self: start; }
    .fee { font-family: var(--font-head); font-size: 2rem; font-weight: 800; color: var(--brand); margin: 0 0 4px; }
    .fee span { font-size: 0.95rem; font-weight: 500; color: var(--ink-soft); }
    .fee-card .note { font-size: 0.92rem; margin: 14px 0 22px; }
    .benefit-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
    .benefit-card {
      --tone: var(--brand); --tone-soft: #eef1fb;
      position: relative; overflow: hidden;
      background: #fff; border-radius: 16px; box-shadow: var(--shadow-md);
      padding: 34px 26px 30px; text-align: center;
      transition: transform .35s ease, box-shadow .35s ease;
    }
    .benefit-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px;
      background: linear-gradient(90deg, var(--tone), transparent 80%);
      transform: scaleX(0); transform-origin: left; transition: transform .4s ease;
    }
    .benefit-card::after {
      content: ''; position: absolute; top: -60%; left: -30%; width: 50%; height: 220%;
      background: linear-gradient(105deg, transparent, rgba(255,255,255,0.55), transparent);
      transform: translateX(-160%) rotate(8deg); transition: transform .7s ease;
      pointer-events: none;
    }
    .benefit-card:hover { transform: translateY(-6px); box-shadow: 0 20px 45px -12px color-mix(in srgb, var(--tone) 45%, transparent); }
    .benefit-card:hover::before { transform: scaleX(1); }
    .benefit-card:hover::after { transform: translateX(320%) rotate(8deg); }
    .benefit-card:hover .b-chip { transform: translateY(-4px) scale(1.06); }
    .benefit-card:nth-child(1) { --tone: #e91e63; --tone-soft: #fde8f1; }
    .benefit-card:nth-child(2) { --tone: #7c3aed; --tone-soft: #f1ebfe; }
    .benefit-card:nth-child(3) { --tone: #0f9d8f; --tone-soft: #e2f6f4; }
    .benefit-card:nth-child(4) { --tone: #d97706; --tone-soft: #fdf0dd; }
    .benefit-card:nth-child(5) { --tone: #ef4444; --tone-soft: #fdeaea; }
    .benefit-card:nth-child(6) { --tone: #2d4fdd; --tone-soft: #eef1fb; }
    .b-chip {
      display: inline-flex; align-items: center; justify-content: center;
      width: 68px; height: 68px; border-radius: 18px;
      background: var(--tone-soft); color: var(--tone);
      margin-bottom: 18px; transition: transform .35s ease;
    }
    .benefit-icon { width: 36px; height: 36px; }
    .benefit-card.featured { background: linear-gradient(160deg, var(--brand) 0%, var(--brand-deep) 100%); }
    .benefit-card.featured .b-chip { background: rgba(255,255,255,0.14); color: var(--accent); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.22); }
    .benefit-card.featured::before { background: linear-gradient(90deg, var(--accent), transparent 80%); }
    .benefit-card.featured p { color: #fff; }
    .benefit-card p { margin: 0; font-weight: 700; color: var(--ink); font-size: 1.02rem; line-height: 1.4; }
    .life-skills { display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 28px; align-items: stretch; }
    .ls-intro h2 { font-size: 2rem; line-height: 1.25; margin: 0 0 18px; }
    .ls-intro p { color: var(--ink-soft); line-height: 1.7; margin: 0; }
    .ls-col { padding: 28px 30px; display: flex; align-items: center; }
    @media (max-width: 900px) {
      .benefit-grid { grid-template-columns: repeat(2, 1fr); }
      .life-skills { grid-template-columns: 1fr; }
    }
    @media (max-width: 560px) { .benefit-grid { grid-template-columns: 1fr; } }
  `],
})
export class Academics {}
