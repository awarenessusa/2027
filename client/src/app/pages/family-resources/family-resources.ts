import { Component } from '@angular/core';
import { CtaBand } from '../../shared/cta-band';

interface Resource { name: string; desc: string; url?: string }
interface Category { id: string; title: string; items: Resource[] }

@Component({
  selector: 'app-family-resources',
  imports: [CtaBand],
  template: `
    <section class="page-hero ph-education">
      <div class="container">
        <span class="eyebrow">Resources</span>
        <h1>Family Resources</h1>
        <p class="lead">Support services and programs for Tampa Bay families — from early childhood to college readiness.</p>
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
export class FamilyResources {
  protected readonly categories: Category[] = [
    {
      id: 'early-childhood', title: 'Early Childhood',
      items: [
        { name: 'Office of Early Learning', desc: 'School readiness tools, VPK applications, local early learning coalitions, and childcare search.', url: 'https://www.floridaearlylearning.com' },
        { name: 'Children\'s Board of Hillsborough County', desc: 'Seven centers throughout Hillsborough offering support to families with young children.', url: 'https://www.childrensboard.org' },
      ],
    },
    {
      id: 'college-readiness', title: 'College Readiness & Financial Aid',
      items: [
        { name: 'FAFSA', desc: 'The Free Application for Federal Student Aid — required for federal financial aid for college.', url: 'https://studentaid.gov' },
        { name: 'Florida Student Financial Aid', desc: 'State-level scholarships and grants for Florida students.', url: 'https://www.floridastudentfinancialaidsg.org' },
        { name: 'Scholarships360', desc: 'Florida scholarship listings and guidance.', url: 'https://scholarships360.org/scholarships/florida-scholarships/' },
        { name: 'Fastweb', desc: 'Scholarship matching service for students.', url: 'https://www.fastweb.com' },
        { name: 'Scholarships.com', desc: 'Searchable scholarship database.', url: 'https://www.scholarships.com' },
        { name: 'Unigo', desc: 'Undergraduate scholarship listings.', url: 'https://www.unigo.com/scholarships' },
        { name: 'Pigly', desc: 'Free online personal finance guide with 100+ financial calculators.', url: 'https://pigly.com' },
      ],
    },
    {
      id: 'bullying', title: 'Social/Emotional Development & Bullying',
      items: [
        { name: 'Edutopia SEL', desc: 'Social and Emotional Learning articles and activities for all ages.', url: 'https://www.edutopia.org' },
        { name: 'Hillsborough County', desc: 'Bully and harassment prevention and reporting for Hillsborough schools.', url: 'https://www.hillsboroughschools.org' },
        { name: 'Pasco County', desc: 'Student support and bullying reporting for Pasco schools.', url: 'https://www.pascoschools.org' },
        { name: 'Pinellas County', desc: 'Bullying resources for Pinellas schools.', url: 'https://www.pcsb.org' },
        { name: 'Say Something', desc: 'National anonymous reporting system for bullying and harassment.', url: 'https://www.sandyhookpromise.org/our-programs/say-something-anonymous-reporting-system/' },
        { name: 'StopBullying.gov', desc: 'Government resource for bullying, cyberbullying, and prevention.', url: 'https://www.stopbullying.gov' },
      ],
    },
    {
      id: 'diagnostic', title: 'Diagnostic Services',
      items: [
        { name: 'FDLRS', desc: 'Florida Diagnostic & Learning Resources System — diagnostic testing, guidance, and resources for exceptional education needs.', url: 'https://www.fdlrs.org' },
      ],
    },
    {
      id: 'special-needs', title: 'Special Needs & Behavioral',
      items: [
        { name: 'Early Learning — Special Needs', desc: 'Programs and resources for students and families of children with special needs.', url: 'https://www.floridaearlylearning.com' },
        { name: 'Hillsborough ESE', desc: 'Exceptional Student Education programs and services in Hillsborough County Schools.', url: 'https://www.hillsboroughschools.org' },
        { name: 'Pasco ESE', desc: 'ESE programs and services in Pasco County Schools.', url: 'https://www.pascoschools.org' },
        { name: 'Pinellas ESE', desc: 'ESE programs and services in Pinellas County Schools.', url: 'https://www.pcsb.org' },
        { name: 'Disability Rights Florida', desc: 'Florida\'s designated Protection and Advocacy system for individuals with disabilities.', url: 'https://disabilityrightsflorida.org' },
        { name: 'Lighthouse for the Blind', desc: 'Maximizing independence and employment for people who are blind or visually impaired, across Tampa Bay.', url: 'https://lighthouseblv.org' },
        { name: 'Best Buddies International', desc: 'One-to-one friendships, integrated employment, leadership, and inclusive living for people with IDD.', url: 'https://www.bestbuddies.org' },
        { name: 'Autism Speaks', desc: 'Advocacy, support, and research for individuals with autism and their families.', url: 'https://www.autismspeaks.org' },
        { name: 'Autism Society of Florida', desc: 'Information about ASD and resources across Florida.', url: 'https://autismfl.org' },
        { name: 'CARD at USF', desc: 'Center for Autism & Related Disabilities — no-cost training, consultation, and technical assistance.', url: 'https://www.card-usf.org' },
      ],
    },
    {
      id: 'transportation', title: 'Transportation & Busing',
      items: [
        { name: 'Hillsborough Transportation', desc: 'Busing and transportation info for Hillsborough County students, including Find My Bus Route.', url: 'https://www.hillsboroughschools.org' },
        { name: 'Pasco Transportation', desc: 'Transportation services for Pasco County students.', url: 'https://www.pascoschools.org' },
        { name: 'Pinellas Transportation', desc: 'Transportation services for Pinellas County students.', url: 'https://www.pcsb.org' },
      ],
    },
    {
      id: 'school-boards', title: 'County School Boards',
      items: [
        { name: 'Hillsborough County School Board', desc: 'Meetings and district information.', url: 'https://www.hillsboroughschools.org' },
        { name: 'Pinellas County School Board', desc: 'Meetings and district information.', url: 'https://www.pcsb.org' },
        { name: 'Pasco County School Board', desc: 'Meetings and district information.', url: 'https://www.pascoschools.org' },
      ],
    },
    {
      id: 'nutrition', title: 'Student Nutrition Services',
      items: [
        { name: 'Hillsborough School Nutrition', desc: 'School menus, allergy info, payments, and refunds for Hillsborough school meals.', url: 'https://www.hillsboroughschools.org' },
        { name: 'Pasco Nutrition Services', desc: 'School meal programs for Pasco County.', url: 'https://www.pascoschools.org' },
        { name: 'Pinellas Food & Nutrition', desc: 'Food and nutrition department for Pinellas County schools.', url: 'https://www.pcsb.org' },
      ],
    },
  ];
}
