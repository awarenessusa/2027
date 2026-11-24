import { Component } from '@angular/core';
import { CtaBand } from '../../shared/cta-band';

@Component({
  selector: 'app-faqs',
  imports: [CtaBand],
  template: `
    <section class="page-hero ph-tutoring">
      <div class="container">
        <span class="eyebrow">FAQs</span>
        <h1>Frequently asked questions</h1>
        <p class="lead">Everything you need to know about the AUSA Peer Tutoring Program.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="accordion faq-list">
          @for (f of faqs; track f.q) {
            <details class="acc-item">
              <summary>{{ f.q }}</summary>
              <div class="acc-body" [innerHTML]="f.a"></div>
            </details>
          }
        </div>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: [`
    .faq-list { max-width: 860px; margin: 0 auto; }
  `],
})
export class Faqs {
  protected readonly faqs = [
    { q: 'What does the program entail?', a: '<p>The AUSA Peer Tutoring Program is a one-on-one, online peer coaching enrichment program for middle and high school students. It offers tutoring in core subjects like math, science, and English, along with specialized topic support and homework assistance. Parents or guardians are encouraged to actively support their children\'s participation.</p>' },
    { q: 'Which grade levels do you cater to?', a: '<p>We offer tutoring for students in grades 6 through 12 during this pilot project phase.</p>' },
    { q: 'What subjects are covered?', a: '<p>Tutoring is available in core subjects — math, science, English, and history — plus additional specific topics within each subject.</p>' },
    { q: 'Do you assist with homework assignments?', a: '<p>Absolutely! Our tutors help with homework and provide tailored lesson plans to deepen understanding and improve grades.</p>' },
    { q: 'Can you guarantee an improved GPA?', a: '<p>We cannot guarantee improved GPAs — progress depends on the student\'s motivation, effort, and the active involvement of parents or guardians.</p>' },
    { q: 'Is there a limit to tutoring sessions?', a: '<p>Students are limited to two sessions per week in the same subject, or one session per week in two different subjects.</p>' },
    { q: 'How do I register?', a: '<p>Registration is simple — sign up with your email through our <a href="https://learning.awarenessusa.org/login" target="_blank" rel="noopener">learning portal</a>. An AUSA admin will then contact you to schedule an interview with the student and parent/guardian. Upon acceptance, we select an instructor and schedule a one-hour orientation.</p>' },
    { q: 'What are the program guidelines?', a: '<p>An admin pairs each student with a tutor and provides an orientation for online coaching. Session schedules are arranged at the mutual convenience of student and tutor, and both share responsibility for rescheduling when needed. Parents are encouraged to supervise and motivate students, and families attend periodic gatherings for motivational talks, awards, and group activities.</p>' },
    { q: 'Is tutoring one-on-one or group-based?', a: '<p>Tutoring is primarily one-on-one for academics. Group classes — online or in person — are held as needed for test prep, life skills, and social responsibility talks.</p>' },
    { q: 'What technology do I need?', a: '<p>A computer or mobile device with internet access is sufficient. We use a user-friendly online platform for sessions.</p>' },
    { q: 'What if I have technical issues?', a: '<p>Our tech-support team is available to assist — contact us by email or phone.</p>' },
    { q: 'How do I provide feedback?', a: '<p>We value your feedback! Share your experience through our website contact form or reach out to our support team directly.</p>' },
    { q: 'What are your selection criteria?', a: '<p>We select students who are highly motivated to seek help and willing to work hard.</p>' },
    { q: 'What are the responsibilities of parents?', a: '<p>Parents and guardians are responsible for motivating students to attend sessions regularly and stay committed to their studies.</p>' },
    { q: 'What if my child misses a session?', a: '<p>If a session is missed, the student or parent should contact the tutor to reschedule.</p>' },
    { q: 'How can I volunteer or support?', a: '<p>We welcome support and involvement! Visit our <a href="/contact">contact page</a> or call <a href="tel:+18136449735">813-644-9735</a> to learn about volunteer opportunities.</p>' },
    { q: 'What social responsibilities will my child learn?', a: '<p>AUSA promotes social responsibility and character development by teaching values such as respect, empathy, courage, tolerance, gratitude, and forgiveness.</p>' },
    { q: 'Tell me about life skill training.', a: '<p>In addition to academics, we offer training in essential life skills — communication, goal setting, leadership, and more — to help students succeed in all areas of life.</p>' },
    { q: 'What are the benefits for children?', a: '<p>Awards and recognition for academic achievement and good behavior, opportunities to excel in life skill training, and acknowledgement for perfect attendance and community contributions.</p>' },
    { q: 'What is the fee for the program?', a: '<p>A suggested donation of $100 for six months or $200 for a year. <strong>Free tutoring is available for families unable to pay.</strong> Donations cover only a fraction of program costs — the fee fosters a sense of commitment and ownership among participants.</p>' },
  ];
}
