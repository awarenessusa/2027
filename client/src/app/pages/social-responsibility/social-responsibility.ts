import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CtaBand } from '../../shared/cta-band';

@Component({
  selector: 'app-social-responsibility',
  imports: [CtaBand],
  template: `
    <section class="page-hero ph-community">
      <div class="container">
        <span class="eyebrow">AUSA Programs</span>
        <h1>Social Responsibility</h1>
        <p class="lead">
          Building character, empathy, and community-minded students — one child at a time.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Key Components</span>
          <h2>What social responsibility means</h2>
        </div>
        <div class="comp-grid">
          @for (c of components; track c.title; let i = $index) {
            <div class="comp-item">
              <div class="icn" [style.background]="c.soft" [style.color]="c.tone" [innerHTML]="c.icon"></div>
              <h3>{{ c.title }}</h3>
              <p>{{ c.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Participating in Social Responsibilities</span>
          <h2>Age-appropriate ways students give back</h2>
          <p class="lead">
            Younger children focus on local responsibilities, while older students
            engage with broader societal issues.
          </p>
        </div>
        <div class="act-list">
          @for (a of activities; track a.title; let i = $index) {
            <div class="act-item">
              <span class="act-num" [style.color]="a.tone" [style.border-color]="a.soft">{{ '0' + (i + 1) }}</span>
              <div class="act-body">
                <h3>{{ a.title }}</h3>
                <p>{{ a.text }}</p>
              </div>
              <div class="icn sm" [style.background]="a.soft" [style.color]="a.tone" [innerHTML]="a.icon"></div>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Core Values &amp; Ethics</span>
          <h2>Core Values And Ethics For Social Responsibility</h2>
          <p class="lead">
            Our program promotes universally accepted values and virtues that guide
            moral decision-making across cultures.
          </p>
        </div>
        <div class="values-grid">
          @for (v of values; track v.name) {
            <div class="value-card">
              <span class="v-chip" [style.background]="v.soft" [style.color]="v.tone" [innerHTML]="v.icon"></span>
              <span class="v-name">{{ v.name }}</span>
              <span class="v-desc">{{ v.desc }}</span>
            </div>
          }
        </div>
        <p class="closing">
          These values promote a compassionate, just, and harmonious society —
          establishing the ethical foundation for a better world.
        </p>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: [`
    .icn { width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center; flex: none; }
    .icn svg { width: 26px; height: 26px; }
    .icn.sm { width: 46px; height: 46px; }
    .icn.sm svg { width: 22px; height: 22px; }
    .comp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 36px; }
    .comp-item .icn { margin-bottom: 16px; }
    .comp-item h3 { margin: 0 0 8px; font-size: 1.1rem; }
    .comp-item p { margin: 0; font-size: 0.95rem; line-height: 1.65; }
    .comp-item { position: relative; padding-top: 22px; }
    .comp-item::before { content: ''; position: absolute; top: 0; left: 0; width: 44px; height: 3px; border-radius: 3px; background: var(--line); }
    .act-list { display: grid; gap: 0; }
    .act-item { display: flex; align-items: center; gap: 26px; padding: 26px 6px; border-bottom: 1px solid var(--line); }
    .act-item:last-child { border-bottom: none; }
    .act-num {
      flex: none; width: 64px; height: 64px; border-radius: 50%;
      display: grid; place-items: center;
      font-family: var(--font-head); font-size: 1.3rem; font-weight: 800;
      border: 3px solid;
    }
    .act-body { flex: 1; min-width: 0; }
    .act-body h3 { margin: 0 0 6px; font-size: 1.15rem; }
    .act-body p { margin: 0; font-size: 0.96rem; line-height: 1.6; }
    @media (max-width: 900px) { .comp-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 560px) {
      .comp-grid { grid-template-columns: 1fr; }
      .act-item { gap: 16px; }
      .act-item .icn.sm { display: none; }
    }
    .values-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; max-width: 1000px; margin: 0 auto; }
    .value-card {
      background: #fff; border-radius: 14px; box-shadow: var(--shadow-md);
      padding: 24px 14px; text-align: center;
      border-bottom: 4px solid transparent;
      transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
    }
    .value-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-bottom-color: var(--tone, var(--brand)); }
    .v-chip { display: inline-flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 14px; margin-bottom: 12px; }
    .v-chip svg { width: 26px; height: 26px; }
    .v-name { display: block; font-weight: 700; font-size: 0.92rem; color: var(--ink); margin-bottom: 8px; }
    .v-desc { display: block; font-size: 0.8rem; line-height: 1.5; color: var(--ink-soft); }
    .value-card:nth-child(5n+1) { --tone: #e91e63; }
    .value-card:nth-child(5n+2) { --tone: #7c3aed; }
    .value-card:nth-child(5n+3) { --tone: #2d4fdd; }
    .value-card:nth-child(5n+4) { --tone: #0f9d8f; }
    .value-card:nth-child(5n+5) { --tone: #d97706; }
    @media (max-width: 900px) { .values-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 560px) { .values-grid { grid-template-columns: repeat(2, 1fr); } }
    .closing { text-align: center; margin-top: 32px; font-weight: 500; }
  `],
})
export class SocialResponsibility {
  private readonly sanitizer = inject(DomSanitizer);

  private svg(inner: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`
    );
  }

  protected readonly components = [
    { title: 'Building Healthy Relationships', icon: this.svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'), tone: '#e91e63', soft: '#fde8f1', text: 'Fostering healthy relationships, contributing to the community, caring for the environment, resolving conflicts, and embracing diversity — grounded in humility, empathy, respect, responsibility, and resilience.' },
    { title: 'Engaging Parents & Teachers', icon: this.svg('<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>'), tone: '#7c3aed', soft: '#f1ebfe', text: 'Adults shape children\'s character. Parents, guardians, and teachers act as role models, demonstrating honesty, kindness, respect, and responsibility — children learn by example.' },
    { title: 'Peer-to-Peer Education', icon: this.svg('<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>'), tone: '#2d4fdd', soft: '#eef1fb', text: 'Older students mentor younger peers. Senior students gain volunteer hours and experience while younger students receive support and guidance.' },
    { title: 'Cultivating Empathy', icon: this.svg('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'), tone: '#ef4444', soft: '#fdeaea', text: 'Students discuss the feelings and perspectives of others and reflect on how their actions affect the people around them.' },
    { title: 'Celebrating Diversity', icon: this.svg('<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'), tone: '#0f9d8f', soft: '#e2f6f4', text: 'Teaching that differences in race, ethnicity, culture, and religion are a source of strength and beauty — not conflict — through mutual respect and tolerance.' },
    { title: 'Recognizing Character', icon: this.svg('<circle cx="12" cy="8" r="6"/><path d="M15.5 13.9 17 23l-5-3-5 3 1.5-9.1"/>'), tone: '#d97706', soft: '#fdf0dd', text: 'Students who demonstrate positive character traits are acknowledged through praise, certificates, recognition programs, and rewards.' },
  ];

  protected readonly activities = [
    { title: 'Educational Support', icon: this.svg('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'), tone: '#2d4fdd', soft: '#eef1fb', text: 'Senior students volunteer to tutor younger students, especially those in low-income neighborhoods, group homes, and childcare facilities.' },
    { title: 'Continuous Learning', icon: this.svg('<path d="M9 18h6M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>'), tone: '#d97706', soft: '#fdf0dd', text: 'Students stay informed about social issues and global developments, contributing meaningfully to societal progress.' },
    { title: 'Community Service', icon: this.svg('<path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/>'), tone: '#0f9d8f', soft: '#e2f6f4', text: 'Volunteering with local organizations that align with students\' interests and values.' },
    { title: 'Cultural Exchange', icon: this.svg('<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>'), tone: '#7c3aed', soft: '#f1ebfe', text: 'Participation in cultural exchange programs fosters appreciation and understanding of different cultures.' },
    { title: 'Environmental Preservation', icon: this.svg('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>'), tone: '#16a34a', soft: '#e6f7ec', text: 'Protecting the environment through tree planting, pollution prevention, and recycling.' },
  ];

  protected readonly values = [
    { name: 'Honesty', desc: 'Being truthful and transparent in words and actions.', tone: '#e91e63', soft: '#fde8f1', icon: this.svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="m9 10 2 2 4-4"/>') },
    { name: 'Integrity', desc: 'Adhering to moral principles, even in challenging situations.', tone: '#7c3aed', soft: '#f1ebfe', icon: this.svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>') },
    { name: 'Respect', desc: 'Valuing others’ rights, differences, and boundaries.', tone: '#2d4fdd', soft: '#eef1fb', icon: this.svg('<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>') },
    { name: 'Justice', desc: 'Treating others fairly and upholding the rule of law.', tone: '#0f9d8f', soft: '#e2f6f4', icon: this.svg('<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>') },
    { name: 'Responsibility', desc: 'Being accountable for one’s actions and decisions.', tone: '#d97706', soft: '#fdf0dd', icon: this.svg('<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>') },
    { name: 'Compassion', desc: 'Demonstrating empathy and concern for others’ well-being.', tone: '#ef4444', soft: '#fdeaea', icon: this.svg('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>') },
    { name: 'Empathy', desc: 'Understanding and sharing others’ feelings.', tone: '#16a34a', soft: '#e6f7ec', icon: this.svg('<path d="M19.5 12.57 12 20l-7.5-7.43A5 5 0 1 1 12 6.01a5 5 0 1 1 7.5 6.56z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>') },
    { name: 'Courage', desc: 'Facing challenges in pursuit of what is right.', tone: '#e91e63', soft: '#fde8f1', icon: this.svg('<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>') },
    { name: 'Tolerance', desc: 'Accepting diverse beliefs and perspectives.', tone: '#7c3aed', soft: '#f1ebfe', icon: this.svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>') },
    { name: 'Generosity', desc: 'Freely giving time, resources, and support to others.', tone: '#2d4fdd', soft: '#eef1fb', icon: this.svg('<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>') },
    { name: 'Gratitude', desc: 'Appreciating kindness and positive experiences.', tone: '#0f9d8f', soft: '#e2f6f4', icon: this.svg('<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>') },
    { name: 'Fairness', desc: 'Treating people impartially and without bias.', tone: '#d97706', soft: '#fdf0dd', icon: this.svg('<line x1="5" y1="9" x2="19" y2="9"/><line x1="5" y1="15" x2="19" y2="15"/><line x1="5" y1="9" x2="5" y2="15" opacity="0"/><line x1="19" y1="9" x2="19" y2="15" opacity="0"/>') },
    { name: 'Self-Discipline', desc: 'Exercising control to achieve long-term goals.', tone: '#ef4444', soft: '#fdeaea', icon: this.svg('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>') },
    { name: 'Forgiveness', desc: 'Letting go of resentment to foster healing.', tone: '#16a34a', soft: '#e6f7ec', icon: this.svg('<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5H11"/>') },
    { name: 'Humility', desc: 'Recognizing personal limitations and valuing others’ contributions.', tone: '#e91e63', soft: '#fde8f1', icon: this.svg('<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-3.1.1-4.5 1-4.9 2z"/>') },
  ];
}
