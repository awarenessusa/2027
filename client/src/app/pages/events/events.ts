import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UpperCasePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CtaBand } from '../../shared/cta-band';

const API_BASE = 'https://globalstudenthub.org/api';

const CREATOR_EMAILS = new Set(['contactus@awarenessusa.org', 'narukullapati.harikrishna@gmail.com']);

;;

const REACTION_TYPES = ['like', 'dislike', 'excellent'] as const;

@Component({
  selector: 'app-events',
  imports: [FormsModule, UpperCasePipe, CtaBand],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sanitizer = inject(DomSanitizer);

  loading = true;
  loadError = '';
  viewMode: 'detail' = 'detail';
  orgFilter: string | null = null;

  events: VolunteerEvent[] = [];
  private interactions = new Map<number, { like: number; dislike: number; excellent: number; comments: number; mine: string | null }>();
  private photoCache = new Map<number, EventPhoto[]>();
  private pendingPhotoRequests = new Set<number>();

  // Sign-up modal state;

  // Modals
  flyerPreviewUrl: string | null = null;
  flyerPreviewTitle = '';
  commentsEvent: VolunteerEvent | null = null;
  comments: EventComment[] = [];
  commentsLoading = false;
  commentDraft = '';
  guestName = '';
  commentBusy = false;
  photosEvent: VolunteerEvent | null = null;

  ngOnInit(): void {
    this.http.get<VolunteerEvent[] | { events: VolunteerEvent[] }>(`${API_BASE}/events`).subscribe({
      next: (res) => {
        const list = Array.isArray(res) ? res : (res?.events ?? []);
        this.events = list
          .filter((ev) => CREATOR_EMAILS.has((ev.createdByEmail ?? ev.createdBy?.email ?? '').toLowerCase()))
          .map((ev) => ({
            ...ev,
            flyerUrl: this.absoluteUrl(ev.flyerUrl ?? null),
            organizations: (ev.organizations ?? []).map((o: EventOrg) => ({ ...o, logoUrl: this.absoluteUrl(o.logoUrl ?? null) })),
          }))
          .sort(this.eventSort);
        this.loading = false;
        this.loadInteractions();
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.loadError = 'Could not load events right now. Please try again in a moment.';
        this.cdr.markForCheck();
      },
    });
  }

  private absoluteUrl(value: string | null): string | null {
    if (!value) return null;
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) return trimmed;
    return `https://globalstudenthub.org${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
  }

  // ---------- list ----------

  get displayedEvents(): VolunteerEvent[] {
    return this.orgFilter ? this.events.filter((e) => this.orgNameOf(e) === this.orgFilter) : this.events;
  }

  private eventSort = (a: VolunteerEvent, b: VolunteerEvent) => {
    const aClosed = this.isEventClosed(a);
    const bClosed = this.isEventClosed(b);
    if (aClosed !== bClosed) return aClosed ? 1 : -1;
    if (aClosed && bClosed) {
      return (this.eventCloseTime(b)?.getTime() ?? 0) - (this.eventCloseTime(a)?.getTime() ?? 0);
    }
    const aInternal = !this.isExternalEvent(a);
    const bInternal = !this.isExternalEvent(b);
    if (aInternal !== bInternal) return aInternal ? -1 : 1;
    return (a.createdAt ?? '').localeCompare(b.createdAt ?? '');
  };

  filterByOrg(event: VolunteerEvent, e: MouseEvent): void {
    e.stopPropagation();
    e.preventDefault();
    const org = this.orgNameOf(event);
    if (org) this.orgFilter = org;
  }

  clearOrgFilter(): void {
    this.orgFilter = null;
  }

  toggleEvent(event: VolunteerEvent): void {
    if (this.isExternalEvent(event)) this.openExternalSignup(event);
  }

  // ---------- event helpers ----------

  isExternalEvent(event: VolunteerEvent): boolean {
    return (event.eventType ?? 'internal') === 'external';
  }

  isPdf(url?: string | null): boolean {
    return /\.pdf($|\?)/i.test(url ?? '');
  }

  pdfUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  plainDesc(event: VolunteerEvent): string {
    const html = event.description ?? '';
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.length > 160 ? text.slice(0, 160) + '…' : text;
  }

  creatorInitials(name?: string | null, email?: string | null): string {
    const base = name || email || '?';
    const parts = base.replace(/@.*/, '').split(/[\s.]+/).filter(Boolean);
    return (parts[0]?.[0] ?? '?').toUpperCase() + (parts[1]?.[0] ?? '').toUpperCase();
  }

  websiteHref(site: string): string {
    return /^https?:\/\//i.test(site) ? site : `https://${site}`;
  }

  detailInitial(event: VolunteerEvent): string {
    return (event.title?.trim()?.[0] ?? '?').toUpperCase();
  }

  postedAgo(createdAt?: string | null): string {
    if (!createdAt) return '';
    const ms = Date.now() - new Date(createdAt).getTime();
    const days = Math.floor(ms / 86400000);
    if (days < 1) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return months < 12 ? `${months}mo ago` : `${Math.floor(months / 12)}y ago`;
  }

  getCardGradient(index: number): string {
    const hues = [262, 205, 175, 330, 25, 140];
    const h1 = hues[index % hues.length];
    const h2 = hues[(index + 2) % hues.length];
    return `linear-gradient(135deg, hsl(${h1} 70% 55%), hsl(${h2} 72% 45%))`;
  }

  organizationsOf(event: VolunteerEvent): EventOrg[] {
    return (event.organizations ?? []).filter((o) => o && (o.name || '').trim());
  }

  orgNameOf(event: VolunteerEvent): string {
    const primary = this.organizationsOf(event).find((o) => o.isPrimary) ?? this.organizationsOf(event)[0];
    return primary?.name?.trim() ?? '';
  }

  // ---------- timing / capacity ----------

  private localDateFromYmd(ymd: string): Date | null {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(ymd ?? '');
    if (!m) return null;
    return new Date(+m[1], +m[2] - 1, +m[3]);
  }

  private parseClock(time: string): [number, number] | null {
    if (!time) return null;
    const m = /^\s*(\d{1,2}):(\d{2})(?::\d{2})?\s*([AaPp][Mm])?/.exec(time);
    if (!m) return null;
    let h = +m[1];
    const min = +m[2];
    const mer = m[3]?.toLowerCase();
    if (mer === 'pm' && h !== 12) h += 12;
    if (mer === 'am' && h === 12) h = 0;
    return [h, min];
  }

  private shiftStartAt(shift: EventShift, event: VolunteerEvent): Date | null {
    const base = this.localDateFromYmd(shift.date ?? event.date ?? '');
    const clock = this.parseClock(shift.startTime);
    if (!base || !clock) return base;
    const d = new Date(base);
    d.setHours(clock[0], clock[1], 0, 0);
    return d;
  }

  private shiftEndAt(shift: EventShift, event: VolunteerEvent): Date | null {
    const base = this.localDateFromYmd(shift.date ?? event.date ?? '');
    const clock = this.parseClock(shift.endTime);
    if (!base || !clock) return base;
    const d = new Date(base);
    d.setHours(clock[0], clock[1], 0, 0);
    const start = this.shiftStartAt(shift, event);
    if (start && d.getTime() <= start.getTime()) d.setDate(d.getDate() + 1);
    return d;
  }

  eventCloseTime(event: VolunteerEvent): Date | null {
    const shifts = event.shifts ?? [];
    if (!shifts.length) {
      const start = this.localDateFromYmd(event.date ?? '');
      if (!start) return null;
      const end = new Date(start);
      end.setHours(23, 59, 59, 999);
      return end;
    }
    let latest: Date | null = null;
    for (const shift of shifts) {
      const end = this.shiftEndAt(shift, event) ?? this.localDateFromYmd(shift.date ?? event.date ?? '');
      if (end && (!latest || end > latest)) latest = end;
    }
    return latest;
  }

  isEventClosed(event: VolunteerEvent): boolean {
    if (this.isExternalEvent(event)) return false;
    const closeAt = this.eventCloseTime(event);
    return !!closeAt && closeAt.getTime() <= Date.now();
  }

  private formatShiftTime(value?: string | null): string {
    const parsed = this.parseClock(value ?? '');
    if (!parsed) return value ?? '';
    const mer = parsed[0] >= 12 ? 'PM' : 'AM';
    const h = parsed[0] % 12 || 12;
    return `${h}:${String(parsed[1]).padStart(2, '0')} ${mer}`;
  }

  eventTiming(event: VolunteerEvent): string {
    const shifts = event.shifts ?? [];
    if (!shifts.length) {
      const d = this.localDateFromYmd(event.date ?? '');
      if (!d) return event.date ?? '';
      return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    }
    const first = shifts.reduce((a, b) => {
      const da = this.localDateFromYmd(a.date ?? '')?.getTime() ?? Infinity;
      const db = this.localDateFromYmd(b.date ?? '')?.getTime() ?? Infinity;
      return db < da ? b : a;
    });
    const d = this.localDateFromYmd(first.date ?? '');
    if (!d) return event.date ?? '';
    const day = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    const start = this.formatShiftTime(first.startTime);
    const end = this.formatShiftTime(first.endTime);
    const tz = event.timeZone ? ` ${event.timeZone}` : '';
    return `${day} · ${start} – ${end}${tz}`;
  }

  availableSpots(shift: EventShift): number {
    return Math.max(0, (shift.capacity ?? 0) - (shift.signupCount ?? 0));
  }

  isShiftFull(shift: EventShift): boolean {
    return (shift.availableSpots ?? this.availableSpots(shift)) <= 0;
  }

  totalAvailableSpots(event: VolunteerEvent): number {
    return (event.shifts ?? []).reduce((sum, s) => sum + this.availableSpots(s), 0);
  }

  isEventFull(event: VolunteerEvent): boolean {
    const shifts = event.shifts ?? [];
    return shifts.length > 0 && shifts.every((s) => this.isShiftFull(s));
  }

  // ---------- signup state ----------

  openExternalSignup(event: VolunteerEvent): void {
    const url = event.signUpLink?.trim();
    if (!url) return;
    if (!window.confirm(`You'll be redirected to the organizer's website to complete sign-up:\n\n${url}\n\nContinue?`)) return;
    this.http.post(`${API_BASE}/events/${event.id}/external-click`, {}).subscribe({ error: () => {} });
    window.open(this.websiteHref(url), '_blank', 'noopener');
  }

  // ---------- info / share ----------

  // ---------- flyer ----------

  openFlyerPreview(event: VolunteerEvent, e: MouseEvent): void {
    e.stopPropagation();
    if (!event.flyerUrl) return;
    this.flyerPreviewUrl = event.flyerUrl;
    this.flyerPreviewTitle = event.title;
    this.cdr.markForCheck();
  }

  closeFlyerPreview(): void {
    this.flyerPreviewUrl = null;
  }

  // ---------- interactions ----------

  interactionFor(event: VolunteerEvent) {
    return this.interactions.get(event.id) ?? { like: 0, dislike: 0, excellent: 0, comments: 0, mine: null };
  }

  private loadInteractions(): void {
    const ids = this.events.map((e) => e.id).filter(Boolean);
    if (!ids.length) return;
    this.http.get<InteractionsResponse>(`${API_BASE}/events/interactions`, { params: { ids: ids.join(',') } }).subscribe({
      next: (res) => {
        for (const e of this.events) {
          const r = res?.reactions?.[e.id] ?? {};
          this.interactions.set(e.id, {
            like: r['like'] ?? 0, dislike: r['dislike'] ?? 0, excellent: r['excellent'] ?? 0,
            comments: res?.comments?.[e.id] ?? 0, mine: null,
          });
        }
        this.cdr.markForCheck();
      },
      error: () => {},
    });
  }



  photosFor(event: VolunteerEvent | null): EventPhoto[] {
    if (!event) return [];
    return this.photoCache.get(event.id) ?? [];
  }

  extraPhotoCount(event: VolunteerEvent): number {
    return Math.max(0, this.photosFor(event).length - 4);
  }

  loadPhotos(event: VolunteerEvent): void {
    if (this.photoCache.has(event.id) || this.pendingPhotoRequests.has(event.id)) return;
    this.pendingPhotoRequests.add(event.id);
    this.http.get<{ photos: EventPhoto[] }>(`${API_BASE}/events/${event.id}/photos`).subscribe({
      next: (res) => {
        this.pendingPhotoRequests.delete(event.id);
        this.photoCache.set(event.id, (res?.photos ?? []).map((p) => ({ ...p, url: this.absoluteUrl(p.url) ?? '' })));
        this.cdr.markForCheck();
      },
      error: () => { this.pendingPhotoRequests.delete(event.id); },
    });
  }

  openPhotos(event: VolunteerEvent, e: MouseEvent): void {
    e.stopPropagation();
    this.photosEvent = event;
    this.loadPhotos(event);
    this.cdr.markForCheck();
  }

  closePhotos(): void {
    this.photosEvent = null;
  }

  openPhotoPreview(photo: EventPhoto, _event: VolunteerEvent, e: MouseEvent): void {
    e.stopPropagation();
    this.flyerPreviewUrl = photo.url;
    this.flyerPreviewTitle = 'Event photo';
    this.cdr.markForCheck();
  }

  // ---------- comments ----------

  openComments(event: VolunteerEvent, e: MouseEvent): void {
    e.stopPropagation();
    this.commentsEvent = event;
    this.commentsLoading = true;
    this.commentDraft = '';
    this.http.get<{ comments: EventComment[] }>(`${API_BASE}/events/${event.id}/comments`).subscribe({
      next: (res) => {
        this.comments = res?.comments ?? [];
        this.commentsLoading = false;
        this.cdr.markForCheck();
      },
      error: () => { this.commentsLoading = false; this.cdr.markForCheck(); },
    });
    this.cdr.markForCheck();
  }

  closeComments(): void {
    this.commentsEvent = null;
  }

  commentDate(ts?: string): string {
    if (!ts) return '';
    return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  postComment(): void {
    const event = this.commentsEvent;
    const text = this.commentDraft.trim();
    if (!event || !text || this.commentBusy) return;
    const name = this.guestName.trim();
    if (!name) return;
    this.commentBusy = true;
    this.http.post<{ comment: EventComment }>(`${API_BASE}/events/${event.id}/comments`, { comment: text, name }).subscribe({
      next: (res) => {
        this.commentBusy = false;
        if (res?.comment) this.comments = [...this.comments, res.comment];
        const cur = this.interactionFor(event);
        this.interactions.set(event.id, { ...cur, comments: cur.comments + 1 });
        this.commentDraft = '';
        this.cdr.markForCheck();
      },
      error: () => { this.commentBusy = false; this.cdr.markForCheck(); },
    });
  }
}

interface EventShift {
  id: number;
  date: string;
  label?: string;
  startTime: string;
  endTime: string;
  capacity: number;
  signupCount?: number;
  availableSpots?: number;
}

interface EventOrg {
  id?: number;
  name: string;
  isPrimary?: boolean;
  logoUrl?: string | null;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  contactName?: string;
  contactTitle?: string;
}

interface EventPhoto {
  id: number;
  url: string;
  name?: string;
  email?: string;
  mine?: boolean;
}

interface EventComment {
  id: number;
  name?: string;
  email?: string;
  comment: string;
  createdAt?: string;
  mine?: boolean;
}

interface VolunteerEvent {
  id: number;
  title: string;
  date: string;
  eventType?: string;
  timeZone?: string;
  volunteerType?: string;
  location?: string;
  description?: string;
  shifts: EventShift[];
  volunteersNeeded?: number;
  flyerUrl?: string | null;
  flyerName?: string;
  contactPerson?: string;
  contactNumber?: string;
  signUpLink?: string;
  externalDisclaimerUrl?: string;
  carpoolRequired?: boolean;
  requiresApproval?: boolean;
  createdAt?: string;
  createdByEmail?: string;
  createdBy?: { name?: string; email?: string; avatarUrl?: string; photoUrl?: string };
  organizations?: EventOrg[];
}



interface InteractionsResponse {
  reactions?: Record<number, Record<string, number>>;
  comments?: Record<number, number>;
}
