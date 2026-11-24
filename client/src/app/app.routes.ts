import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Founder } from './pages/founder/founder';
import { Team } from './pages/team/team';
import { Partners } from './pages/partners/partners';
import { Book } from './pages/book/book';
import { Academics } from './pages/academics/academics';
import { LifeSkills } from './pages/life-skills/life-skills';
import { SocialResponsibility } from './pages/social-responsibility/social-responsibility';
import { LearningGuidelines } from './pages/learning-guidelines/learning-guidelines';
import { TeachingGuidelines } from './pages/teaching-guidelines/teaching-guidelines';
import { EducationalResources } from './pages/educational-resources/educational-resources';
import { FamilyResources } from './pages/family-resources/family-resources';
import { Careers } from './pages/careers/careers';
import { Events } from './pages/events/events';
import { EventGallery } from './pages/event-gallery/event-gallery';
import { Faqs } from './pages/faqs/faqs';
import { Contact } from './pages/contact/contact';
import { Donate } from './pages/donate/donate';

export const routes: Routes = [
  { path: '', component: Home, title: 'Awareness USA | Empowering Students' },
  { path: 'about-us', component: About, title: 'About Us | Awareness USA' },
  { path: 'about-the-founder', component: Founder, title: 'About the Founder | Awareness USA' },
  { path: 'about-the-team', component: Team, title: 'Our Team | Awareness USA' },
  { path: 'our-partners', component: Partners, title: 'Our Partners | Awareness USA' },
  { path: 'the-book-joy-of-life', component: Book, title: 'The Book – Joy Of Life | Awareness USA' },
  { path: 'academics', component: Academics, title: 'Peer Tutoring & Academics | Awareness USA' },
  { path: 'life-skill-training', component: LifeSkills, title: 'Life Skill Training | Awareness USA' },
  { path: 'social-responsibility', component: SocialResponsibility, title: 'Social Responsibility | Awareness USA' },
  { path: 'learning-guidelines', component: LearningGuidelines, title: 'Learning Guidelines | Awareness USA' },
  { path: 'teaching-guidelines', component: TeachingGuidelines, title: 'Teaching Guidelines | Awareness USA' },
  { path: 'educational-resources', component: EducationalResources, title: 'Educational Resources | Awareness USA' },
  { path: 'family-resources', component: FamilyResources, title: 'Family Resources | Awareness USA' },
  { path: 'academic-careers', component: Careers, title: 'Academic Careers | Awareness USA' },
  { path: 'events', component: Events, title: 'Events | Awareness USA' },
  { path: 'event-gallery', component: EventGallery, title: 'Event Gallery | Awareness USA' },
  { path: 'faqs', component: Faqs, title: 'FAQs | Awareness USA' },
  { path: 'contact', component: Contact, title: 'Contact Us | Awareness USA' },
  { path: 'donate-now', component: Donate, title: 'Donate | Awareness USA' },
  { path: '**', redirectTo: '' },
];
