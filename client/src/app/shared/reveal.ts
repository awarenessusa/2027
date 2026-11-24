import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

@Directive({ selector: '[appReveal]' })
export class Reveal implements OnInit, OnDestroy {
  /** Optional stagger delay in ms */
  readonly delay = input(0);

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    node.classList.add('reveal');
    if (this.delay() > 0) {
      node.style.transitionDelay = `${this.delay()}ms`;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
