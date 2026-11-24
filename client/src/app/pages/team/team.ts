import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  imports: [],
  template: `
    <section class="page-hero ph-community">
      <div class="container">
        <div class="ph-copy">
          <span class="eyebrow light">Our People</span>
          <h1>About The Team</h1>
          <p>The people who carry Awareness USA's mission forward — in classrooms, boardrooms, and communities.</p>
        </div>
        <img class="ph-media" src="assets/img/ph-team.jpg" alt="Awareness USA team working together" />
      </div>
    </section>

    <section class="section" style="padding-top: 20px;">
      <div class="container">
        <div class="team-grid">
          @for (m of members; track m.name) {
            <div class="team-card">
              <img [src]="m.photo" [alt]="m.name" class="team-photo" />
              <h3>{{ m.name }}</h3>
              <span class="role">{{ m.role }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section section-cream" style="padding-top: 10px;">
      <div class="container">
        <div class="join-card">
          <div>
            <span class="eyebrow">Join Us</span>
            <h2 style="margin:10px 0 8px; font-size:1.8rem;">Want to join this team?</h2>
            <p style="font-size:1.05rem; margin:0;">Register to become part of the Awareness USA family and start making a difference.</p>
          </div>
          <a class="btn btn-primary" href="https://learning.awarenessusa.org/login" target="_blank" rel="noopener">Register Now →</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 28px; }
    .team-card { text-align: center; padding: 10px; }
    .team-photo { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 14px; box-shadow: 0 10px 30px rgba(26,34,56,0.12); }
    .team-card h3 { margin: 16px 0 4px; font-size: 1.2rem; color: var(--ink); }
    .team-card .role { color: var(--primary); font-weight: 600; font-size: 0.95rem; }
    .join-card { display: flex; justify-content: space-between; align-items: center; gap: 32px; flex-wrap: wrap; background: #fff; border-radius: 20px; padding: 44px 48px; box-shadow: var(--shadow-md); }
    @media (max-width: 640px) { .join-card { padding: 30px; } }
  `],
})
export class Team {
  members = [
    { name: 'Dr. Purna Bikkasani', role: 'Founder | Chairperson', photo: 'assets/img/team/Dr.-purna-bikkasani.webp' },
    { name: 'Bala Nemani', role: 'Executive Leadership', photo: 'assets/img/team/bala.webp' },
  ];
}
