import { Directive, ElementRef, NgZone, OnDestroy, OnInit, inject, input } from '@angular/core';

/**
 * Scroll-driven parallax: translates the element vertically based on the
 * PARENT container's distance from the viewport center. Apply to an
 * oversized background layer inside a container with `overflow: hidden`.
 */
@Directive({ selector: '[appParallax]' })
export class Parallax implements OnInit, OnDestroy {
  /** Parallax intensity: 0 = none, ~0.15-0.3 = subtle to strong */
  readonly speed = input(0.18);

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private ticking = false;

  private readonly onScroll = () => {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
    }
  };

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
    });
    this.update();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
  }

  private update(): void {
    // Measure the PARENT (static, not transformed) so the offset is stable.
    const host = this.el.nativeElement.parentElement ?? this.el.nativeElement;
    const rect = host.getBoundingClientRect();
    const delta = rect.top + rect.height / 2 - window.innerHeight / 2;
    this.el.nativeElement.style.transform = `translate3d(0, ${-delta * this.speed()}px, 0)`;
  }
}
