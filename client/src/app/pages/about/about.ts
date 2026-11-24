import { Component } from '@angular/core';
import { CtaBand } from '../../shared/cta-band';

@Component({
  selector: 'app-about',
  imports: [CtaBand],
  template: `
    <section class="page-hero ph-education">
      <div class="container">
        <div class="ph-copy">
          <span class="eyebrow">About Us</span>
          <h1>Empowering students through education &amp; opportunity</h1>
          <p class="lead">
            Awareness USA is a 501(c)(3) nonprofit organization based in Tampa Bay, Florida.
            Our vision is to empower underprivileged students throughout the Tampa Bay area.
          </p>
        </div>
        <img class="ph-media" src="assets/img/ph-about.jpg" alt="Students collaborating and learning together" />
      </div>
    </section>

    <section class="section tight">
      <div class="container">
        <div class="stats">
          <div class="stat"><div class="num">2015</div><div class="lbl">Founded In</div></div>
          <div class="stat"><div class="num">350+</div><div class="lbl">Students Supported</div></div>
          <div class="stat"><div class="num">500+</div><div class="lbl">Volunteers</div></div>
          <div class="stat"><div class="num">90%</div><div class="lbl">Funds to Programs</div></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="split">
          <div>
            <span class="eyebrow">Our Mission</span>
            <h2>Connecting students with the support they deserve</h2>
            <p>
              Our mission is to connect underserved students with academic support
              and life skills to help them succeed in school, career, and life.
            </p>
            <p>
              Our vision is to empower underprivileged students across Tampa Bay
              to achieve their full potential through education and opportunity.
            </p>
          </div>
          <div>
            <span class="eyebrow">The Challenge</span>
            <h2>1 in 6 children lives in poverty</h2>
            <p>
              Nearly 12 million children in the USA live in poverty — about one in
              every six. Many face homelessness, foster care, or financial
              instability in single-parent households.
            </p>
            <p>
              We believe there is a shared social responsibility to support
              disadvantaged children. Our approach focuses on creating meaningful
              impact one child at a time.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">How We Support Students</span>
          <h2>Practical help, real results</h2>
        </div>
        <div class="grid cols-3">
          <div class="card lift">
            <div class="icon">✏️</div>
            <h3>Free tutoring &amp; test prep</h3>
            <p>One-on-one academic support and test preparation at no cost to families who need it.</p>
          </div>
          <div class="card lift">
            <div class="icon warm">🧭</div>
            <h3>Academic guidance</h3>
            <p>Ongoing guidance for school success — from daily homework to long-term study habits.</p>
          </div>
          <div class="card lift">
            <div class="icon">🎓</div>
            <h3>College &amp; career support</h3>
            <p>Encouragement and direction to pursue college or vocational training after graduation.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">With Our Partners</span>
          <h2>Delivered with local communities &amp; professionals</h2>
        </div>
        <div class="grid cols-3">
          <div class="card lift">
            <div class="icon">💡</div>
            <h3>Educational events</h3>
            <p>Engaging workshops and learning experiences that inspire curiosity, knowledge, and personal growth.</p>
          </div>
          <div class="card lift">
            <div class="icon warm">🤲</div>
            <h3>Long-term mentorship</h3>
            <p>Ongoing guidance and support that empowers students to achieve academic and personal success.</p>
          </div>
          <div class="card lift">
            <div class="icon">🗣️</div>
            <h3>Life skills training</h3>
            <p>Practical skills in leadership, communication, teamwork, and confident decision-making.</p>
          </div>
        </div>
        <p class="call-us">Call to ask any question? <a href="tel:+18136449735">1-813-644-9735</a></p>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: [`
    .call-us { text-align: center; margin-top: 44px; font-family: var(--font-head); font-size: 1.2rem; font-weight: 600; color: var(--ink); }
    .call-us a { color: var(--brand); }
  `],
})
export class About {}
