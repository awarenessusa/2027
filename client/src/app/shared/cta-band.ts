import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-band',
  imports: [RouterLink],
  template: `
    <section class="section tight">
      <div class="container">
        <div class="cta-band">
          <div>
            <h2>Become part of the Awareness USA family</h2>
            <p>Whether you give your time, your gift, or your voice — every act helps a student move closer to their dreams.</p>
          </div>
          <div class="actions">
            <a class="btn btn-accent" routerLink="/donate-now">Donate Now</a>
            <a class="btn btn-ghost" href="https://learning.awarenessusa.org/login" target="_blank" rel="noopener">Register Now</a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CtaBand {}
