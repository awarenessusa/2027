import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_BASE = 'https://globalstudenthub.org/api';
const CREATOR_EMAILS = new Set(['contactus@awarenessusa.org', 'narukullapati.harikrishna@gmail.com']);

interface GalleryItem {
  url: string;
  caption: string;
  kind: 'flyer' | 'photo';
}

interface GalleryEvent {
  id: number;
  title: string;
  flyerUrl?: string | null;
  createdByEmail?: string;
  createdBy?: { email?: string };
}

interface EventPhoto {
  id: number;
  url: string;
  name?: string;
}

@Component({
  selector: 'app-event-gallery',
  template: `
    <section class="page-hero ph-about">
      <div class="container">
        <span class="eyebrow">Captured Moments</span>
        <h1>Event gallery</h1>
        <p class="lead">Flyers and photos from Awareness USA events and volunteer drives — hover any tile to see it in full color.</p>
      </div>
    </section>

    <div class="gallery-scroll">
      <section class="section">
        <div class="container">
          @if (loading) {
            <p class="gallery-status"><i class="bi bi-hourglass-split"></i> Loading gallery…</p>
          }
          @if (!loading && !items.length) {
            <p class="gallery-status"><i class="bi bi-images"></i> No event photos yet — check back soon.</p>
          }

          <div class="gallery">
            @for (item of items; track $index) {
              <figure class="gallery__thumb" (click)="open(item)">
                <img [src]="item.url" [alt]="item.caption" class="gallery__image" loading="lazy">
                <figcaption class="gallery__caption">
                  <span class="gallery__kind">{{ item.kind === 'flyer' ? 'Flyer' : 'Photo' }}</span>
                  {{ item.caption }}
                </figcaption>
              </figure>
            }
          </div>


        </div>
      </section>
    </div>

    @if (preview) {
      <div class="gpreview" (click)="preview = null">
        <img [src]="preview.url" [alt]="preview.caption">
        <p>{{ preview.caption }}</p>
        <button type="button" class="gpreview-close" aria-label="Close"><i class="bi bi-x-lg"></i></button>
      </div>
    }
  `,
  styles: [`
    .gallery-scroll {
      height: calc(100vh - 76px);
      overflow-y: auto;
      scrollbar-width: none;               /* Firefox */
      -ms-overflow-style: none;            /* legacy Edge */
      overscroll-behavior: contain;
    }
    .gallery-scroll::-webkit-scrollbar { display: none; }  /* Chrome/Safari */

    .gallery-status { text-align: center; color: var(--ink-soft, #68738f); padding: 2rem 0; }
    .gallery-hint { font-size: 0.82rem; padding-top: 1.25rem; }

    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      grid-auto-rows: 240px;
      grid-auto-flow: dense;
      gap: 10px;
    }

    .gallery__thumb {
      position: relative;
      margin: 0;
      overflow: hidden;
      border-radius: 12px;
      cursor: zoom-in;
      background: #eef1f7;
    }
    /* vary tile shapes like the pen's masonry feel */
    .gallery__thumb:nth-child(6n + 1) { grid-row: span 2; }
    .gallery__thumb:nth-child(8n + 4) { grid-column: span 2; }

    .gallery__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: grayscale(1);
      transform: scale(1.03);
      transition: filter 0.45s ease, transform 0.45s ease;
    }
    .gallery__thumb:hover .gallery__image,
    .gallery__thumb:focus-within .gallery__image {
      filter: grayscale(0);
      transform: scale(1.12);
    }

    .gallery__caption {
      position: absolute;
      inset: auto 0 0 0;
      padding: 2.2rem 0.9rem 0.8rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(to top, rgba(10, 16, 32, 0.85), transparent);
      opacity: 0;
      transform: translateY(12px);
      transition: opacity 0.35s ease, transform 0.35s ease;
    }
    .gallery__thumb:hover .gallery__caption { opacity: 1; transform: none; }
    .gallery__kind {
      display: inline-block;
      margin-right: 6px;
      padding: 2px 8px;
      border-radius: 99px;
      background: rgba(255, 255, 255, 0.18);
      font-size: 0.62rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .gpreview {
      position: fixed;
      inset: 0;
      z-index: 1500;
      display: grid;
      place-items: center;
      padding: 2rem;
      background: rgba(5, 10, 24, 0.85);
      backdrop-filter: blur(8px);
      cursor: zoom-out;
    }
    .gpreview img {
      max-width: 92vw;
      max-height: 80vh;
      border-radius: 12px;
      box-shadow: 0 30px 90px rgba(0, 0, 0, 0.5);
    }
    .gpreview p { position: fixed; bottom: 1.5rem; color: #cbd5e1; font-size: 0.9rem; }
    .gpreview-close {
      position: fixed;
      top: 1.2rem;
      right: 1.4rem;
      width: 38px;
      height: 38px;
      border: 0;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
      cursor: pointer;
      font-size: 1rem;
    }
    .gpreview-close:hover { background: #ef4444; }

    @media (max-width: 640px) {
      .gallery { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); grid-auto-rows: 160px; }
      .gallery__thumb:nth-child(8n + 4) { grid-column: span 1; }
    }
  `],
})
export class EventGallery {
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  loading = true;
  items: GalleryItem[] = [];
  preview: GalleryItem | null = null;

  constructor() {
    void this.load;
  }

  private readonly load = Promise.all([this.localItems(), this.apiItems()]).then(([local, api]) => {
    // interleave API items among the local gallery images for variety
    const merged = [...local];
    api.forEach((p, i) => merged.splice(Math.min((i + 1) * 3, merged.length), 0, p));
    this.items = merged;
    this.loading = false;
    this.cdr.markForCheck();
  });

  /** Images dropped into public/gallery — listed via manifest.json. */
  private localItems(): Promise<GalleryItem[]> {
    return new Promise((resolve) => {
      this.http.get<string[]>('gallery/manifest.json').subscribe({
        next: (files) => resolve((files ?? []).map((f) => ({
          url: 'gallery/' + encodeURIComponent(f),
          caption: this.prettyName(f),
          kind: 'photo' as const,
        }))),
        error: () => resolve([]),
      });
    });
  }

  /** Event flyers + photos from the production events API. */
  private apiItems(): Promise<GalleryItem[]> {
    return new Promise((resolve) => {
      this.http.get<GalleryEvent[] | { events: GalleryEvent[] }>(`${API_BASE}/events`).subscribe({
        next: (res) => {
          const list = (Array.isArray(res) ? res : (res?.events ?? []))
            .filter((ev) => CREATOR_EMAILS.has((ev.createdByEmail ?? ev.createdBy?.email ?? '').toLowerCase()));

          const flyers: GalleryItem[] = list
            .filter((ev) => ev.flyerUrl)
            .map((ev) => ({ url: this.abs(ev.flyerUrl!), caption: ev.title, kind: 'flyer' as const }));

          const photoRequests = list.map((ev) =>
            new Promise<GalleryItem[]>((done) => {
              this.http.get<{ photos: EventPhoto[] }>(`${API_BASE}/events/${ev.id}/photos`).subscribe({
                next: (r) => done((r?.photos ?? []).map((p) => ({ url: this.abs(p.url), caption: ev.title, kind: 'photo' as const }))),
                error: () => done([]),
              });
            }),
          );

          Promise.all(photoRequests).then((sets) => resolve([...flyers, ...sets.flat()]));
        },
        error: () => resolve([]),
      });
    });
  }

  /** Turn "541534655_1788918..._n..jpg" into "Event photo"; keep real names like "Volunteer corps". */
  private prettyName(file: string): string {
    const base = file.replace(/\.(jpe?g|png|webp|gif|avif)$/i, '').replace(/\.+$/, '');
    if (/^[\d_]+n?\.?(\s*\(\d+\))?$/i.test(base)) return 'Event photo';
    if (/^Screenshot/i.test(base)) return 'Event photo';
    return base.replace(/\s*\(\d+\)\s*$/, '').trim() || 'Event photo';
  }

  private abs(url: string): string {
    if (!url) return '';
    if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
    return `https://globalstudenthub.org${url.startsWith('/') ? '' : '/'}${url}`;
  }

  open(item: GalleryItem): void {
    this.preview = item;
    this.cdr.markForCheck();
  }
}
