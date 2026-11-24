import { Component } from '@angular/core';
import { CtaBand } from '../../shared/cta-band';

@Component({
  selector: 'app-learning-guidelines',
  imports: [CtaBand],
  template: `
    <section class="page-hero ph-education">
      <div class="container">
        <span class="eyebrow">AUSA Programs</span>
        <h1>Learning Guidelines</h1>
        <p class="lead">Guidelines for students to become effective, self-directed learners.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <ol class="steps">
          @for (g of guidelines; track g.title) {
            <li>
              <div>
                <h4>{{ g.title }}</h4>
                <p>{{ g.text }}</p>
              </div>
            </li>
          }
        </ol>
        <p class="closing">
          By applying these techniques, both students and instructors can maximize
          their tutoring sessions for more effective learning and improved
          academic performance.
        </p>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: [`
    .steps { max-width: 820px; margin: 0 auto; }
    .closing { text-align: center; margin-top: 40px; font-weight: 500; max-width: 640px; margin-inline: auto; }
  `],
})
export class LearningGuidelines {
  protected readonly guidelines = [
    { title: 'Set Clear Goals', text: 'Work with your tutor to define specific learning objectives and break down long-term goals.' },
    { title: 'Prepare for Each Session', text: 'Review prior lessons and prepare questions to maximize each session.' },
    { title: 'Create a Productive Learning Environment', text: 'Choose a quiet, organized space with reliable internet and equipment.' },
    { title: 'Be Active and Engaged', text: 'Participate actively, ask questions, and stay focused throughout the session.' },
    { title: 'Take Notes Effectively', text: 'Use diagrams or outlines to visualize concepts, and review notes after each session.' },
    { title: 'Practice Consistently', text: 'Follow the tutor\'s recommended exercises and set aside regular study times.' },
    { title: 'Ask for Clarification and Feedback', text: 'Request additional explanations when needed and seek specific feedback for improvement.' },
    { title: 'Develop Self-Discipline and Accountability', text: 'Take ownership by being punctual and proactive.' },
    { title: 'Use Technology Effectively', text: 'Familiarize yourself with online tools, resources, and interactive whiteboards.' },
    { title: 'Review and Reflect After Sessions', text: 'Set aside time to review notes, re-watch session recordings, and reflect on learning.' },
    { title: 'Stay Open to Feedback', text: 'Accept constructive feedback to refine your learning strategies.' },
    { title: 'Engage in Peer Discussions or Group Tutoring', text: 'Participate in group sessions or peer discussions to reinforce understanding.' },
    { title: 'Track Progress and Adjust as Needed', text: 'Set measurable goals, celebrate small achievements, and adjust strategies as needed.' },
    { title: 'Balance Screen Time and Self-Care', text: 'Take breaks, engage in physical activities, and maintain healthy habits to optimize learning.' },
  ];
}
