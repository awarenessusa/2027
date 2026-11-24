import { Component } from '@angular/core';
import { CtaBand } from '../../shared/cta-band';

interface Resource { name: string; desc: string; url?: string }
interface Category { id: string; title: string; items: Resource[] }

@Component({
  selector: 'app-educational-resources',
  imports: [CtaBand],
  template: `
    <section class="page-hero ph-college">
      <div class="container">
        <span class="eyebrow">Resources</span>
        <h1>Educational Resources</h1>
        <p class="lead">Free and trusted learning tools for students, organized by subject.</p>
      </div>
    </section>

    <section class="section tight">
      <div class="container">
        <div class="toc">
          @for (c of categories; track c.id) {
            <a class="pill link" [href]="'#' + c.id">{{ c.title }}</a>
          }
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 24px">
      <div class="container">
        @for (c of categories; track c.id) {
          <div class="cat" [id]="c.id">
            <h2>{{ c.title }}</h2>
            <div class="grid cols-3">
              @for (r of c.items; track r.name) {
                <div class="card lift">
                  <h3>{{ r.name }}</h3>
                  <p>{{ r.desc }}</p>
                  @if (r.url) {
                    <a [href]="r.url" target="_blank" rel="noopener" class="card-link">Visit resource ↗</a>
                  }
                </div>
              }
            </div>
          </div>
        }
      </div>
    </section>

    <app-cta-band />
  `,
  styles: [`
    .toc { display: flex; flex-wrap: wrap; }
    .pill.link { text-decoration: none; }
    .pill.link:hover { background: var(--accent); color: #fff; text-decoration: none; }
    .cat { margin-bottom: 56px; scroll-margin-top: 110px; }
    .cat h2 { padding-bottom: 14px; border-bottom: 3px solid var(--accent); display: inline-block; margin-bottom: 28px; }
    .card-link { font-weight: 600; font-size: 0.92rem; }
  `],
})
export class EducationalResources {
  protected readonly categories: Category[] = [
    {
      id: 'math', title: 'Math',
      items: [
        { name: 'Khan Academy', desc: 'Free K-12 videos and interactive practice, from basic arithmetic to higher-level math.', url: 'https://www.khanacademy.org' },
        { name: 'CK-12', desc: 'Free K-12 explanations, videos, and interactive practice across math topics.', url: 'https://www.ck12.org' },
        { name: 'IXL Math', desc: 'Math practice broken into individual skills for grades K-12. Limited daily use is free.', url: 'https://www.ixl.com/math' },
        { name: 'Virtual Nerd', desc: 'Online study help for math from 6th grade through high school.', url: 'https://virtualnerd.com' },
        { name: 'Math Drills', desc: 'Thousands of free math worksheets.', url: 'https://www.math-drills.com' },
        { name: 'Math Is Fun', desc: 'Free randomly generated math worksheets with answers.', url: 'https://www.mathsisfun.com' },
        { name: 'Desmos', desc: 'Free online math tools and a graphing calculator, with a downloadable app.', url: 'https://www.desmos.com' },
        { name: 'MEP Math (CIMT)', desc: 'Mathematics Enhancement Programme: free lesson plans and workbooks for grades 1-12.', url: 'https://www.cimt.org.uk/projects/mep/' },
      ],
    },
    {
      id: 'language-arts', title: 'Language Arts',
      items: [
        { name: 'Word Hippo', desc: 'All-in-one reference: definitions, opposites, pronunciation, rhymes, context, and translation.', url: 'https://www.wordhippo.com' },
        { name: 'Reading Rockets', desc: 'From the U.S. Dept. of Education — activities for reading and writing fun.', url: 'https://www.readingrockets.org' },
        { name: 'Scholastic Reading Activities', desc: 'Engaging literacy activities across all grade levels and subjects.', url: 'https://www.scholastic.com' },
        { name: 'CommonLit', desc: 'A free text library to improve reading fluency and comprehension.', url: 'https://www.commonlit.org' },
        { name: 'Spelling Words Well', desc: 'Online spelling help for K-12 students and adults.', url: 'https://www.spelling-words-well.com' },
        { name: 'OWL Purdue', desc: 'A writing resource for high school students.', url: 'https://owl.purdue.edu' },
        { name: 'Quizlet', desc: 'Create flashcards to practice vocabulary and terminology, or use sets others have made.', url: 'https://quizlet.com' },
        { name: 'myON Reader', desc: 'Digital library access for children in Hillsborough County — books in English, French, and Spanish.', url: 'https://www.myon.com' },
      ],
    },
    {
      id: 'science', title: 'Science',
      items: [
        { name: 'PhET Simulations', desc: 'Interactive physics, chemistry, and biology simulations from the University of Colorado.', url: 'https://phet.colorado.edu' },
        { name: 'Khan Academy Science', desc: 'Free explanations of physics, chemistry, biology, anatomy, cosmology, and more.', url: 'https://www.khanacademy.org/science' },
        { name: 'SciShow', desc: 'Short, high-interest videos on a wide variety of science topics.', url: 'https://www.youtube.com/@SciShow' },
        { name: 'Amoeba Sisters', desc: 'Animated videos that explain biology concepts in a fun, understandable way.', url: 'https://www.amoebasisters.com' },
        { name: 'Crash Course', desc: 'Witty, visually appealing videos on high school level science topics.', url: 'https://thecrashcourse.com' },
        { name: 'Science Snacks', desc: 'Hands-on, teacher-tested experiments using cheap, available materials.', url: 'https://www.exploratorium.edu/snacks' },
        { name: 'NASA for Educators', desc: 'Lesson plans, teacher guides, activities, videos, and more for grades K-12+.', url: 'https://www.nasa.gov/learning-resources/' },
        { name: 'Steve Spangler Science', desc: 'Fun, hands-on experiments to demonstrate and teach scientific principles.', url: 'https://www.stevespanglerscience.com' },
      ],
    },
    {
      id: 'coding', title: 'Coding',
      items: [
        { name: 'Scratch', desc: 'Block-based visual programming for children ages 8-16.', url: 'https://scratch.mit.edu' },
        { name: 'Code.org', desc: 'A nonprofit dedicated to teaching students to code at their own pace.', url: 'https://code.org' },
        { name: 'CodeCombat', desc: 'A coding-based game for children to play and learn the basics.', url: 'https://codecombat.com' },
        { name: 'Crunchzilla', desc: 'Coding tutorials for young children (Code Monster) and ages 12+.', url: 'https://www.crunchzilla.com' },
        { name: 'Learn Unity', desc: 'Tutorials from the Unity engine to teach kids how to create video games.', url: 'https://learn.unity.com' },
        { name: 'CodinGame', desc: 'Learn by solving fun challenges in 25+ languages. Recommended for ages 15+.', url: 'https://www.codingame.com' },
        { name: 'Swift Playgrounds', desc: 'A game-making and Swift language app for Apple/iOS devices.', url: 'https://www.apple.com/swift/playgrounds/' },
      ],
    },
    {
      id: 'social-studies', title: 'Social Studies',
      items: [
        { name: 'Khan Academy', desc: 'Free K-12 videos and resources across social studies topics.', url: 'https://www.khanacademy.org/humanities' },
        { name: 'Library of Congress', desc: 'Thematic primary source sets for high school history topics.', url: 'https://www.loc.gov' },
        { name: 'Crash Course', desc: 'Engaging videos on a wide variety of high school level history topics.', url: 'https://thecrashcourse.com' },
      ],
    },
    {
      id: 'time-management', title: 'Time Management & Organization',
      items: [
        { name: 'Cozi', desc: 'A free app to organize events, family schedules, and more.', url: 'https://www.cozi.com' },
        { name: 'Trello', desc: 'A free organizational app for planning and workflows.', url: 'https://trello.com' },
      ],
    },
    {
      id: 'sel', title: 'Social-Emotional Development',
      items: [
        { name: 'Edutopia SEL Activities', desc: 'Social and Emotional Learning (SEL) articles and activities to build social skills and emotional health.', url: 'https://www.edutopia.org' },
      ],
    },
    {
      id: 'ese', title: 'Exceptional Student Education',
      items: [
        { name: 'FDLRS', desc: 'Florida Diagnostic & Learning Resources System — programs and resources for exceptional education needs.', url: 'https://www.fdlrs.org' },
      ],
    },
  ];
}
