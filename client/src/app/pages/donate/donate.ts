import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-donate',
  imports: [RouterLink],
  template: `
    <section class="page-hero ph-community">
      <div class="container">
        <span class="eyebrow">Make a Donation Today</span>
        <h1>Donate to educate and empower a student's life</h1>
        <p class="lead">90% of funds go directly to programs. Every gift — large or small — changes a trajectory.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid cols-3 amounts">
          @for (a of amounts; track a.label) {
            <div class="card lift amt" [class.featured]="a.featured">
              @if (a.featured) { <span class="flag">Most Impactful</span> }
              <div class="amt-num">{{ a.label }}</div>
              <p>{{ a.desc }}</p>
            </div>
          }
        </div>

        <div class="give-box">
          <h2>Ready to give?</h2>
          <p>
            Awareness USA is a 501(c)(3) nonprofit — donations may be tax-deductible.
            To donate, contact us and we'll share the current giving options
            (online payment, check, or in-kind support).
          </p>
          <div class="give-actions">
            <a class="btn btn-primary" routerLink="/contact">Contact Us to Donate</a>
            <a class="btn btn-outline" href="tel:+18136449735">Call 813-644-9735</a>
          </div>
          <p class="note">
            Prefer to give your time? <a routerLink="/contact">Ask about volunteering</a> —
            tutors, mentors, and event helpers are always needed.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .amounts { margin-bottom: 48px; }
    .amt { text-align: center; position: relative; }
    .amt.featured { border: 2px solid var(--accent); }
    .flag {
      position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
      background: var(--accent); color: #2a1d02;
      font-family: var(--font-head); font-size: 0.75rem; font-weight: 700;
      padding: 6px 16px; border-radius: 999px; letter-spacing: 0.05em; text-transform: uppercase;
    }
    .amt-num { font-family: var(--font-head); font-size: 2.6rem; font-weight: 800; color: var(--brand); margin-bottom: 8px; }
    .give-box {
      max-width: 760px; margin: 0 auto; text-align: center;
      background: var(--surface); border: 1px solid var(--line);
      border-radius: var(--radius); padding: 48px 40px; box-shadow: var(--shadow);
    }
    .give-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin: 26px 0 18px; }
    .note { font-size: 0.92rem; margin: 0; }
  `],
})
export class Donate {
  protected readonly amounts = [
    { label: '$100', desc: 'Covers a suggested six-month student program contribution.', featured: false },
    { label: '$200', desc: 'Supports a full year of tutoring and life skills for one student.', featured: true },
    { label: 'Any amount', desc: 'Every dollar helps — 90% of funds go directly to programs.', featured: false },
  ];
}
