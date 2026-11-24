import { Component } from '@angular/core';
import { CtaBand } from '../../shared/cta-band';

@Component({
  selector: 'app-teaching-guidelines',
  imports: [CtaBand],
  template: `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">AUSA Programs</span>
        <h1>Teaching Guidelines</h1>
        <p class="lead">How our peer tutors structure effective, engaging lessons.</p>
      </div>
    </section>

    <section class="section">
      <div class="container split">
        <div>
          <div class="section-head">
            <span class="eyebrow">Lesson Structure</span>
            <h2>Key components of a peer tutoring lesson</h2>
          </div>
          <ol class="steps">
            @for (l of lessonParts; track l.title) {
              <li>
                <div>
                  <h4>{{ l.title }}</h4>
                  @for (pt of l.points; track pt) {
                    <p>• {{ pt }}</p>
                  }
                </div>
              </li>
            }
          </ol>
        </div>
        <div class="photo-col">
          <img class="tg-photo" src="assets/img/tg-guidelines.jpg" alt="Peer tutoring in session — students studying together" />
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Best Practices</span>
          <h2>Guidelines for effective peer tutoring</h2>
          <p class="lead">
            <strong>Goal:</strong> empower students to become self-directed learners,
            using resources to deepen their understanding and achieve excellence.
          </p>
        </div>
        <div class="guide-split">
          <div class="grid cols-2 guide-grid">
            @for (g of guidelines; track g.title) {
              <div class="card lift">
                <h3>{{ g.title }}</h3>
                @for (pt of g.points; track pt) {
                  <p class="pt">• {{ pt }}</p>
                }
              </div>
            }
          </div>
          <div class="photo-col">
            <img class="tg-photo" src="assets/img/tg-lesson.jpg" alt="Tutor helping a student with a textbook" />
            <img class="tg-photo" src="assets/img/mentor.jpg" alt="Students collaborating on laptops" />
          </div>
        </div>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: [`
    .steps p { margin-bottom: 4px; }
    .pt { margin-bottom: 6px; font-size: 0.95rem; }
    .photo-col { display: grid; gap: 22px; align-content: start; position: sticky; top: 110px; }
    .tg-photo { width: 100%; border-radius: 16px; box-shadow: var(--shadow-lg); display: block; }
    .guide-split { display: grid; grid-template-columns: 1.8fr 1fr; gap: 40px; align-items: start; }
    .guide-grid { gap: 18px; }
    @media (max-width: 900px) {
      .photo-col { position: static; }
      .guide-split { grid-template-columns: 1fr; }
    }
  `],
})
export class TeachingGuidelines {
  protected readonly lessonParts = [
    { title: 'Warm-Up / Review', points: ['Recap previous concepts related to the current topic.', 'Ask a few quick questions to assess understanding of prior knowledge.'] },
    { title: 'Concept Introduction', points: ['Clearly explain the new concept or skill using concrete examples and visual aids.', 'Provide a concise explanation of key terms and procedures.'] },
    { title: 'Guided Practice', points: ['Work through practice problems together, explaining each step clearly.', 'Use open-ended questions so the student verbalizes their thought process.', 'Identify and address misconceptions as they arise.'] },
    { title: 'Independent Practice', points: ['Provide practice problems for the student to solve independently.', 'Monitor progress and offer targeted feedback.', 'Encourage self-checking of answers using a solution key.'] },
    { title: 'Closure', points: ['Summarize main concepts and review key points.', 'Ask the student to explain a key concept in their own words.', 'Address any remaining questions or areas of difficulty.'] },
  ];

  protected readonly guidelines = [
    { title: 'Personalized Learning', points: ['Adapt instruction to the student\'s unique needs and strengths.', 'Use customized learning plans with specific resources and feedback.'] },
    { title: 'Technology Integration', points: ['Use digital whiteboards (Jamboard, Miro) for collaboration.', 'Incorporate polls, quizzes, and breakout rooms for engagement.', 'Use shared documents (e.g., Google Docs) for real-time feedback.'] },
    { title: 'Scaffolding & Chunking', points: ['Break content into manageable steps and gradually build complexity.', 'Focus on one concept at a time, offering tutorials for challenging topics.'] },
    { title: 'Active Learning', points: ['Encourage participation through prompts, discussions, and role reversal (student as teacher).', 'Use student-led activities to boost comprehension.'] },
    { title: 'Formative Assessment', points: ['Check understanding with quizzes, polls, or exit tickets.', 'Encourage self-assessment so students reflect on their progress.'] },
    { title: 'Multimodal Instruction', points: ['Cater to different learning styles with visual, audio, and text-based resources.'] },
    { title: 'Flipped Tutoring', points: ['Assign pre-session materials to introduce concepts, reserving session time for interactive activities.'] },
    { title: 'Engagement & Motivation', points: ['Set clear goals and celebrate small wins to keep morale high.', 'Encourage collaboration in small group sessions.'] },
    { title: 'Flexible Pacing', points: ['Allow flexible pacing, providing session recordings and extra practice materials as needed.'] },
    { title: 'Gamification', points: ['Use game-based tools (e.g., Kahoot!, Quizizz) to review topics in an engaging way.'] },
    { title: 'Building Rapport', points: ['Establish a personal connection through regular check-ins and a supportive environment.'] },
  ];
}
