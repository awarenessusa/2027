import { Component } from '@angular/core';
import { CtaBand } from '../../shared/cta-band';

@Component({
  selector: 'app-life-skills',
  imports: [CtaBand],
  template: `
    <section class="page-hero ph-mentor">
      <div class="container">
        <span class="eyebrow">AUSA Programs</span>
        <h1>Life Skills Training</h1>
        <p class="lead">
          Academic excellence opens doors to careers — life skills pave the way
          for sustained success.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head" style="max-width: 800px">
          <span class="eyebrow">Overview</span>
          <h2>Preparing students for life beyond the classroom</h2>
          <p class="lead">
            Life skill training is essential for students to engage, thrive, and
            succeed in every aspect of life. The ability to understand oneself,
            empathize with others, and communicate effectively depends on these
            skills — empowering students to build relationships, solve problems,
            and make informed decisions.
          </p>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Core Program</span>
          <h2>Life Skills Program Outline</h2>
        </div>
        <div class="grid cols-4">
          @for (m of modules; track m.title) {
            <div class="card lift">
              <div class="icon" [class.warm]="m.warm">{{ m.icon }}</div>
              <h3>{{ m.title }}</h3>
              <p>{{ m.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <app-cta-band />
  `,
})
export class LifeSkills {
  protected readonly modules = [
    { icon: '🧍', warm: false, title: 'Body Posture Awareness', text: 'Improving posture for better confidence and communication.' },
    { icon: '💰', warm: true, title: 'Financial Literacy', text: 'Introducing basic financial concepts to help students make sound decisions.' },
    { icon: '🌟', warm: false, title: 'Inspiring Students', text: 'Motivating students to set ambitious goals and pursue their passions.' },
    { icon: '🎯', warm: true, title: 'Setting Life Goals', text: 'Guiding students in defining and achieving personal and academic milestones.' },
    { icon: '⏰', warm: false, title: 'Time Management', text: 'Techniques to prioritize tasks, manage schedules, and reduce stress.' },
    { icon: '💬', warm: true, title: 'Communication Skills', text: 'Building clear, respectful, and impactful communication.' },
    { icon: '📖', warm: false, title: 'Fostering Self-Learners', text: 'Encouraging independent learning and curiosity for lifelong growth.' },
    { icon: '🧘', warm: true, title: 'Stress Management', text: 'Tools to handle stress in a healthy and constructive manner.' },
  ];
}
