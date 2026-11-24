import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Seg { x: number; y: number; w: number; h: number }

// Seven-segment layout inside a 22×42 digit box
const SEG: Record<string, Seg> = {
  a: { x: 2, y: 0, w: 18, h: 4 },
  b: { x: 18, y: 2, w: 4, h: 17 },
  c: { x: 18, y: 23, w: 4, h: 17 },
  d: { x: 2, y: 38, w: 18, h: 4 },
  e: { x: 0, y: 23, w: 4, h: 17 },
  f: { x: 0, y: 2, w: 4, h: 17 },
  g: { x: 2, y: 19, w: 18, h: 4 },
};

const DIGITS: Record<string, string> = {
  '0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '4': 'fgbc',
  '5': 'afgcd', '6': 'afgedc', '7': 'abc', '8': 'abcdefg', '9': 'abfgcd',
};

@Component({
  selector: 'app-digital-clock',
  template: `
    <div class="dclock" aria-label="Current time">
      <div class="dclock-days">
        <span class="on">{{ dayNames[dow()] }}</span>
        <span class="dclock-zone">{{ zoneLabel() }}</span>
      </div>
      <div class="dclock-digits">
        @for (ch of digits(); track $index) {
          @if (ch === ':') {
            <span class="dclock-colon">:</span>
          } @else {
            <svg class="dclock-seg" viewBox="0 0 22 42" aria-hidden="true">
              @for (seg of segsOf(ch); track seg.key) {
                <rect [attr.x]="seg.x" [attr.y]="seg.y" [attr.width]="seg.w" [attr.height]="seg.h" rx="1.2" />
              }
            </svg>
          }
        }
        <span class="dclock-meridiem">{{ meridiem() }}</span>
      </div>
    </div>
  `,
  styles: [`
    :host { position: fixed; top: 10px; right: 8px; z-index: 110; }
    .dclock {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 4px 2px;
      background: transparent;
      border: none;
      border-radius: 8px;
      user-select: none;
    }
    .dclock-meridiem {
      font-size: 8px;
      font-weight: 700;
      color: #33415e;
      margin-left: 3px;
      align-self: flex-end;
      padding-bottom: 2px;
      line-height: 1;
    }
    .dclock-zone {
      font-size: 6.8px;
      font-weight: 600;
      letter-spacing: 0.4px;
      color: #9aa0ad;
      line-height: 1;
      white-space: nowrap;
    }
    .dclock-days { display: flex; align-items: baseline; gap: 5px; }
    .dclock-days span {
      font-size: 7.5px;
      font-weight: 600;
      letter-spacing: 0.4px;
      color: #9aa0ad;
      line-height: 1;
    }
    .dclock-days span.on { color: #33415e; }
    .dclock-days .dclock-zone { font-size: 6.8px; }
    .dclock-digits { display: flex; align-items: center; }
    .dclock-seg { width: 13px; height: 25px; margin: 0 0.5px; fill: #2f3644; }
    .dclock-gap { width: 6px; }
    .dclock-colon {
      font-size: 16px;
      font-weight: 800;
      color: #2f3644;
      margin: 0 1px;
      line-height: 1;
      padding-bottom: 4px;
    }
    @media (max-width: 1150px) { .dclock { display: none; } }
  `],
})
export class DigitalClock implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  protected readonly dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  private readonly now = signal(new Date());
  private readonly timer = setInterval(() => this.now.set(new Date()), 1000);
  private readonly tz = signal(Intl.DateTimeFormat().resolvedOptions().timeZone);
  private readonly place = signal('');

  ngOnInit(): void {
    // IP-based location → show the visitor's actual timezone + city
    this.http.get<{ timezone?: string; city?: string; region_code?: string }>('https://ipapi.co/json/').subscribe({
      next: (res) => {
        if (res?.timezone) this.tz.set(res.timezone);
        const city = [res?.city, res?.region_code].filter(Boolean).join(', ');
        if (city) this.place.set(city);
        this.cdr.markForCheck();
      },
      error: () => {},
    });
  }

  private parts(): Record<string, string> {
    const out: Record<string, string> = {};
    for (const p of new Intl.DateTimeFormat('en-US', {
      timeZone: this.tz(), hour: 'numeric', minute: '2-digit', second: '2-digit',
      hour12: true, weekday: 'short', timeZoneName: 'short',
    }).formatToParts(this.now())) {
      out[p.type] = p.value;
    }
    return out;
  }

  protected dow = () => ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].indexOf(this.parts()['weekday']?.toUpperCase() ?? '');

  protected meridiem = () => this.parts()['dayPeriod'] ?? '';

  protected zoneLabel = () => {
    const short = this.parts()['timeZoneName'] ?? '';
    const zone = this.tz().split('/').pop()?.replace(/_/g, ' ') ?? '';
    return [this.place() || zone, short].filter(Boolean).join(' · ');
  };

  protected digits = () => {
    const p = this.parts();
    return `${p['hour']?.padStart(2, '0') ?? '00'}:${p['minute'] ?? '00'}:${p['second'] ?? '00'}`.split('');
  };

  protected segsOf(ch: string): (Seg & { key: string })[] {
    return [...(DIGITS[ch] ?? '')].map((key) => ({ key, ...SEG[key] }));
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
