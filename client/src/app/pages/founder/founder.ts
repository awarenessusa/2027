import { Component } from '@angular/core';
import { CtaBand } from '../../shared/cta-band';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-founder',
  imports: [CtaBand, Reveal],
  template: `
    <section class="page-hero ph-mentor">
      <div class="container">
        <div class="ph-copy">
          <span class="eyebrow">About The Founder</span>
          <h1>Dr. Purna Bikkasani</h1>
          <p class="lead">From a small farming village to a 30-year medical career — and a life devoted to giving back.</p>
        </div>
        <img class="ph-media" src="assets/img/ph-founder.jpg" alt="Medical professional in scrubs" />
      </div>
    </section>

    <!-- Photo + bio -->
    <section class="section">
      <div class="container founder-top">
        <div class="founder-photo" appReveal>
          <img src="assets/img/founder.webp" alt="Dr. Purna Bikkasani, Founder of Awareness USA" />
          <h3>Dr. Purna Bikkasani</h3>
          <p class="role">Founder</p>
        </div>
        <div class="founder-bio" appReveal [delay]="120">
          <h3>Early Life</h3>
          <p>
            Dr. Bikkasani was born and raised in a small village in what is now
            Telangana, India. Coming from a humble farming family, he was the
            youngest of seven children.
          </p>
          <p>
            His parents, though illiterate, worked hard to sustain the family
            through agriculture, growing crops like rice and peanuts.
          </p>

          <h3>Education Journey</h3>
          <p>
            His education was not straightforward. During his early schooling, he
            had to leave studies midway to support his family by working on the farm.
          </p>
          <p>
            A turning point came when his older brother, a primary school teacher,
            helped him return to school. Despite interruptions, he remained determined.
          </p>
          <p>
            Through persistence and hard work, he completed his education and went
            on to earn a medical degree from Osmania University.
          </p>
        </div>
      </div>
    </section>

    <!-- Career + quote -->
    <section class="section alt">
      <div class="container founder-bottom">
        <div class="career" appReveal>
          <h3>Medical Career &amp; The Next Chapter</h3>
          <p>
            Driven by curiosity and ambition, Dr. Bikkasani moved to England, where
            he worked under the UK's National Health Program and earned the
            prestigious MRCP qualification.
          </p>
          <p>
            He later relocated to the United States to specialize in Gastroenterology.
          </p>
          <p>Over a medical career spanning more than 30 years in Florida, he:</p>
          <ul class="checklist">
            <li>Treated thousands of patients</li>
            <li>Developed a special focus on stress-related health issues</li>
            <li>Conducted public seminars and workshops</li>
            <li>Contributed articles to newspapers on health and wellness</li>
          </ul>
          <p>
            After retiring from medical practice in 2015, Dr. Bikkasani founded
            Awareness USA, a non-profit organization.
          </p>
        </div>

        <div class="words-card" appReveal [delay]="150">
          <span class="qmark">”</span>
          <h3>In His Own Words</h3>
          <p>
            I never knew my exact birthday, only that it was near the end of WWII.
            I grew up in the hotbed of the armed peasant uprising against the land
            lords and Razakars — the private army of the provincial ruler. The
            Razakars would attack villages, terrorize, and loot peoples' belongings.
            The epicenter of the revolution was my district, and the leaders of the
            moment were members of my family and my friends. I suffered the shame,
            humility, and insecurity of childhood poverty until I became a doctor,
            and so I grew up with empathy for the poor, underprivileged, and weaker
            sections in society.
          </p>
        </div>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: [`
    .founder-top {
      display: grid;
      grid-template-columns: 340px 1fr;
      gap: 64px;
      align-items: start;
    }
    .founder-photo { text-align: center; position: sticky; top: 110px; }
    .founder-photo img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: var(--radius);
      box-shadow: var(--shadow-lg);
      margin-bottom: 18px;
    }
    .founder-photo h3 { margin: 0 0 2px; font-size: 1.3rem; }
    .founder-photo .role {
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--ink-soft);
      margin: 0;
    }
    .founder-bio h3 { margin-top: 0; }
    .founder-bio h3:not(:first-child) { margin-top: 36px; }

    .founder-bottom {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 64px;
      align-items: start;
    }
    .career h3 { margin-bottom: 18px; }
    .career .checklist { margin: 18px 0; }

    .words-card {
      position: relative;
      background: linear-gradient(150deg, #4a21c9 0%, #7b2ff7 60%, #9333ea 100%);
      color: #fff;
      padding: 44px 40px 72px;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 70px), calc(100% - 70px) 100%, 0 100%);
      box-shadow: var(--shadow-lg);
    }
    .words-card .qmark {
      font-family: var(--font-head);
      font-size: 4.5rem;
      line-height: 0.6;
      color: rgba(255, 255, 255, 0.55);
      display: block;
      margin-bottom: 18px;
    }
    .words-card h3 { color: #fff; font-size: 1.5rem; }
    .words-card p { color: rgba(255, 255, 255, 0.9); font-size: 0.98rem; margin: 0; }

    @media (max-width: 900px) {
      .founder-top, .founder-bottom { grid-template-columns: 1fr; gap: 40px; }
      .founder-photo { position: static; max-width: 320px; margin: 0 auto; }
      .words-card { clip-path: polygon(0 0, 100% 0, 100% calc(100% - 44px), calc(100% - 44px) 100%, 0 100%); }
    }
  `],
})
export class Founder {}
