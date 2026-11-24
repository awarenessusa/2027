import { DecimalPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

export interface OccupationHit {
  code: string;
  title: string;
  titleMatch: boolean;
  brightOutlook: boolean;
}

interface SearchResponse {
  query: string;
  total: number;
  occupations: OccupationHit[];
  source?: string;
  error?: string;
}

interface OccupationDetail {
  code: string;
  title: string;
  deprecated?: boolean;
  replacedBy?: { code: string; title: string }[];
  description: string;
  alsoCalled: string[];
  brightOutlook: boolean;
  updated: string | null;
  tasks: string[];
  software: { category: string; examples: string; hot: boolean }[];
  interests: { code: string | null; areas: string[] };
  jobZone: {
    title: string;
    education: string | null;
    relatedExperience: string | null;
    jobTraining: string | null;
    examples: string | null;
    svp: string | null;
  } | null;
  education: { pct: number; label: string }[];
  wages: {
    median: string | null;
    employment: string | null;
    growth: string | null;
    openings: string | null;
  };
  related: { code: string; title: string; brightOutlook: boolean }[];
  url: string;
  careerPath?: { mermaid: string; markdown: string };
}

interface CareerSchool {
  id: number;
  name: string;
  city: string | null;
  state: string | null;
  url: string | null;
  degree: string | null;
  students: number | null;
  tuition: number | null;
  tuitionOutState: number | null;
  acceptanceRate: number | null;
  satAverage: number | null;
  satMath25: number | null;
  satMath75: number | null;
  satReading25: number | null;
  satReading75: number | null;
  actMid: number | null;
  act25: number | null;
  act75: number | null;
  gradRate: number | null;
  earnings: number | null;
  matchPct: number;
  programs: { title: string; level: string | null }[];
}

interface SchoolsResponse {
  state: string;
  families: string[];
  scanned: number;
  schools: CareerSchool[];
  error?: string;
}

/** Student-friendly starting points for the keyword search. */
const QUICK_PICKS = [
  'electrician', 'registered nurse', 'software developer', 'teacher',
  'accountant', 'dental hygienist', 'physical therapist', 'welder',
  'graphic designer', 'chef', 'police officer', 'veterinarian',
];

const PAGE_SIZE = 25;

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota',
  'Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
  'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon',
  'Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee',
  'Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming',
];

const STATE_CODES: Record<string, string> = {
  Alabama:'AL',Alaska:'AK',Arizona:'AZ',Arkansas:'AR',California:'CA',Colorado:'CO',
  Connecticut:'CT',Delaware:'DE','District of Columbia':'DC',Florida:'FL',Georgia:'GA',
  Hawaii:'HI',Idaho:'ID',Illinois:'IL',Indiana:'IN',Iowa:'IA',Kansas:'KS',Kentucky:'KY',
  Louisiana:'LA',Maine:'ME',Maryland:'MD',Massachusetts:'MA',Michigan:'MI',Minnesota:'MN',
  Mississippi:'MS',Missouri:'MO',Montana:'MT',Nebraska:'NE',Nevada:'NV','New Hampshire':'NH',
  'New Jersey':'NJ','New Mexico':'NM','New York':'NY','North Carolina':'NC','North Dakota':'ND',
  Ohio:'OH',Oklahoma:'OK',Oregon:'OR',Pennsylvania:'PA','Puerto Rico':'PR','Rhode Island':'RI',
  'South Carolina':'SC','South Dakota':'SD',Tennessee:'TN',Texas:'TX',Utah:'UT',Vermont:'VT',
  Virginia:'VA',Washington:'WA','West Virginia':'WV',Wisconsin:'WI',Wyoming:'WY',
};

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './careers.html',
  styleUrls: ['./careers.scss'],
})
export class Careers {
  query = '';
  searched = false;
  isLoading = false;
  loadError = '';

  results: OccupationHit[] = [];
  total = 0;
  shown = PAGE_SIZE;

  selected: OccupationDetail | null = null;
  detailLoading = false;
  detailError = '';

  // "Where to study" — College Scorecard schools offering related programs
  schoolState = 'FL';
  schools: CareerSchool[] = [];
  schoolFamilies: string[] = [];
  schoolsLoading = false;
  schoolsError = '';
  schoolsShown = 12;

  // Career path diagram — mermaid is lazy-loaded only when a detail opens
  careerPathSvg: SafeHtml | null = null;
  pathZoom = false;
  relatedOpen = false;
  private mermaidApi?: typeof import('mermaid').default;
  private mermaidSeq = 0;

  readonly quickPicks = QUICK_PICKS;
  readonly states = US_STATES;
  private readonly apiBaseUrl = 'https://globalstudenthub.org/api/careers';
  private readonly resourcesApi = 'https://globalstudenthub.org/api/resources';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) {}

  search(q?: string): void {
    const keyword = (q ?? this.query).trim();
    if (!keyword) return;
    this.query = keyword;
    this.isLoading = true;
    this.loadError = '';
    this.selected = null;
    this.detailError = '';
    this.shown = PAGE_SIZE;

    const params = new HttpParams().set('q', keyword);
    this.http.get<SearchResponse>(`${this.apiBaseUrl}/search`, { params }).subscribe({
      next: result => {
        this.results = result.occupations || [];
        this.total = Number(result.total) || this.results.length;
        this.searched = true;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: error => {
        this.results = [];
        this.total = 0;
        this.searched = true;
        this.isLoading = false;
        this.loadError = error?.error?.error || 'Could not search occupations right now.';
        this.cdr.markForCheck();
      },
    });
  }

  /** Occupations that matched the keyword itself come first (O*NET "title" matches). */
  get titleMatches(): OccupationHit[] {
    return this.results.filter(o => o.titleMatch);
  }

  get relatedMatches(): OccupationHit[] {
    return this.results.filter(o => !o.titleMatch);
  }

  get visibleRows(): OccupationHit[] {
    return this.results.slice(0, this.shown);
  }

  get hasMore(): boolean {
    return this.results.length > this.shown;
  }

  showMore(): void {
    this.shown += PAGE_SIZE;
  }

  /** Opens an occupation summary — from the results table or a related-career chip. */
  openOccupation(code: string): void {
    this.detailLoading = true;
    this.detailError = '';
    this.selected = null;
    this.relatedOpen = false;
    this.http.get<OccupationDetail>(`${this.apiBaseUrl}/${encodeURIComponent(code)}`).subscribe({
      next: detail => {
        this.selected = detail;
        this.detailLoading = false;
        this.loadSchools();
        this.renderCareerPath(detail);
        this.cdr.markForCheck();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: error => {
        this.detailLoading = false;
        this.detailError = error?.error?.error || 'Could not load this occupation right now.';
        this.cdr.markForCheck();
      },
    });
  }

  /** Universities in `schoolState` offering programs in the occupation's field. */
  loadSchools(): void {
    if (!this.selected) return;
    this.schoolsLoading = true;
    this.schoolsError = '';
    this.schools = [];
    this.schoolsShown = 12;
    const params = new HttpParams().set('state', this.schoolState);
    this.http.get<SchoolsResponse>(
      `${this.apiBaseUrl}/${encodeURIComponent(this.selected.code)}/schools`,
      { params },
    ).subscribe({
      next: result => {
        this.schools = result.schools || [];
        this.schoolFamilies = result.families || [];
        this.schoolsLoading = false;
        this.cdr.markForCheck();
      },
      error: error => {
        this.schools = [];
        this.schoolsLoading = false;
        this.schoolsError = error?.error?.error || 'Could not load universities right now.';
        this.cdr.markForCheck();
      },
    });
  }

  onSchoolStateChange(stateName: string): void {
    this.schoolState = STATE_CODES[stateName] || 'FL';
    this.loadSchools();
  }

  get visibleSchools(): CareerSchool[] {
    return this.schools.slice(0, this.schoolsShown);
  }

  showMoreSchools(): void {
    this.schoolsShown += 12;
  }

  stateCodeToName(code: string): string {
    return US_STATES.find(s => STATE_CODES[s] === code) || code;
  }

  /** "Visit site" on a school card — records the click for the interest report. */
  openSchool(school: CareerSchool): void {
    if (!school.url) return;
    const url = school.url.startsWith('http') ? school.url : `https://${school.url}`;
    this.http.post(`${this.resourcesApi}/click`, {
      key: `career-school-${school.id}`,
      title: school.name,
      type: 'university',
      provider: this.selected?.title || 'Careers',
      section: 'careers',
      url,
    }).subscribe({ error: () => {} });
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  money(value: number | null): string {
    return value == null ? '' : `$${Math.round(value).toLocaleString('en-US')}`;
  }

  pct(value: number | null): string {
    return value == null ? '' : `${Math.round(value * 100)}%`;
  }

  /** "1240 – 1390" style range, or the midpoint when only one bound exists. */
  range(lo: number | null, hi: number | null, mid?: number | null): string | null {
    if (lo != null && hi != null) return `${lo} – ${hi}`;
    return mid != null ? `~${mid}` : null;
  }

  /** Composite SAT mid-50% range. */
  satComposite(s: CareerSchool): string | null {
    const lo = (s.satReading25 ?? 0) + (s.satMath25 ?? 0);
    const hi = (s.satReading75 ?? 0) + (s.satMath75 ?? 0);
    if (lo && hi) return `${lo} – ${hi}`;
    return s.satAverage != null ? `~${s.satAverage}` : null;
  }

  actRange(s: CareerSchool): string | null {
    return this.range(s.act25, s.act75, s.actMid);
  }

  hasAdmissions(s: CareerSchool): boolean {
    return this.satComposite(s) != null || this.actRange(s) != null || s.tuitionOutState != null;
  }

  /** Renders the API-generated mermaid flowchart into the side panel. */
  private async renderCareerPath(detail: OccupationDetail): Promise<void> {
    this.careerPathSvg = null;
    const code = detail.careerPath?.mermaid;
    if (!code) return;
    const seq = ++this.mermaidSeq;
    try {
      if (!this.mermaidApi) {
        this.mermaidApi = (await import('mermaid')).default;
        this.mermaidApi.initialize({
          startOnLoad: false,
          theme: 'neutral',
          flowchart: { htmlLabels: false, curve: 'basis' },
        });
      }
      const { svg } = await this.mermaidApi.render(`career-path-${seq}`, code);
      if (seq !== this.mermaidSeq) return;
      this.careerPathSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
      this.cdr.markForCheck();
    } catch {
      this.careerPathSvg = null; // diagram is a bonus — never fail the detail view
    }
  }

  @HostListener('document:keydown.escape')
  closePathZoom(): void {
    this.pathZoom = false;
    this.relatedOpen = false;
  }

  /** Closes the related-careers popover on any outside click. */
  @HostListener('document:click')
  closeRelated(): void {
    this.relatedOpen = false;
  }

  backToResults(): void {
    this.selected = null;
    this.detailError = '';
    this.pathZoom = false;
  }
}
