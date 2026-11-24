import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBand } from '../../shared/cta-band';

@Component({
  selector: 'app-partners',
  imports: [RouterLink, CtaBand],
  template: `
    <section class="page-hero ph-community">
      <div class="container">
        <div class="ph-copy">
          <span class="eyebrow light">Together We Do More</span>
          <h1>Our Partners</h1>
          <p>Organizations standing with Awareness USA to educate and empower students.</p>
        </div>
        <img class="ph-media" src="assets/img/ph-partners.jpg" alt="Partnership handshake" />
      </div>
    </section>

    <section class="section" style="padding-top: 20px;">
      <div class="container">
        <div class="partner-grid">
          @for (p of partners; track p.name) {
            <a class="partner-card" [href]="p.url" target="_blank" rel="noopener" [attr.aria-label]="p.name">
              <img [src]="p.logo" [alt]="p.name" loading="lazy" />
            </a>
          }
        </div>
        <p class="partner-note">Interested in partnering with Awareness USA?
          <a routerLink="/contact" class="text-link">Get in touch →</a>
        </p>
      </div>
    </section>

    <app-cta-band
      heading="Make a donation today!"
      title="Donate to Educate and Empower a Student's Life" />
  `,
  styles: [`
    .partner-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .partner-card { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 34px 26px; display: flex; align-items: center; justify-content: center; min-height: 150px; transition: transform .3s ease, box-shadow .3s ease; }
    .partner-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
    .partner-card img { max-width: 100%; max-height: 86px; object-fit: contain; }
    .partner-note { text-align: center; margin-top: 48px; color: var(--muted); }
    .text-link { color: var(--primary); font-weight: 700; text-decoration: none; }
    @media (max-width: 900px) { .partner-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 480px) { .partner-grid { grid-template-columns: 1fr; } }
  `],
})
export class Partners {
  partners = [
    { name: 'BEST Academy', logo: 'assets/img/partners/Best_academy.webp', url: 'https://www.bestmedicalacademy.org/learn' },
    { name: 'Rotary Club', logo: 'assets/img/partners/Rotary.webp', url: '#' },
    { name: 'Amzur Technologies', logo: 'assets/img/partners/amzur_technologies.webp', url: '#' },
    { name: 'Chaitanya Saradhi', logo: 'assets/img/partners/CSR_LOGO.png', url: '#' },
    { name: 'Triple Point Community Outreach', logo: 'assets/img/partners/Triple-point.webp', url: '#' },
    { name: 'Rudram', logo: 'assets/img/partners/Rudram.webp', url: '#' },
    { name: 'NATS', logo: 'assets/img/partners/NATS-Logo.png', url: 'https://www.natsworld.org/' },
    { name: 'Maximised Learning', logo: 'assets/img/partners/maximised-learning.webp', url: '#' },
  ];
}
