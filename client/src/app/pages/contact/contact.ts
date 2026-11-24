import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CtaBand } from '../../shared/cta-band';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CtaBand],
  template: `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">Contact Us</span>
        <h1>Inquire about our programs or volunteering</h1>
        <p class="lead">We'd love to hear from you — reach out by phone, email, or the form below.</p>
      </div>
    </section>

    <section class="section">
      <div class="container contact-grid">
        <div class="contact-info">
          <div class="card lift info-card">
            <div class="icon">📞</div>
            <h3>Call Us</h3>
            <p><a href="tel:+18136449735">+1 (813) 644-9735</a></p>
          </div>
          <div class="card lift info-card">
            <div class="icon warm">✉️</div>
            <h3>Email</h3>
            <p><a href="mailto:social&#64;awarenessusa.org">social&#64;awarenessusa.org</a></p>
          </div>
          <div class="card lift info-card">
            <div class="icon">📍</div>
            <h3>Location</h3>
            <p>Tampa Bay, Florida</p>
          </div>
        </div>

        <div class="card form-card">
          <h2>Send us a message</h2>
          @if (status() === 'ok') {
            <div class="alert ok">{{ statusMsg() }}</div>
          }
          @if (status() === 'err') {
            <div class="alert err">{{ statusMsg() }}</div>
          }
          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="name-row">
              <div class="field">
                <label for="firstName">First Name *</label>
                <input id="firstName" type="text" formControlName="firstName" autocomplete="given-name" />
              </div>
              <div class="field">
                <label for="lastName">Last Name *</label>
                <input id="lastName" type="text" formControlName="lastName" autocomplete="family-name" />
              </div>
            </div>
            <div class="field">
              <label for="email">Email *</label>
              <input id="email" type="email" formControlName="email" autocomplete="email" />
            </div>
            <div class="field">
              <label for="message">Comment or Message *</label>
              <textarea id="message" rows="6" formControlName="message"></textarea>
            </div>
            <button class="btn btn-primary" type="submit" [disabled]="sending()">
              {{ sending() ? 'Sending…' : 'Send a Message' }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: [`
    .contact-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 32px; align-items: start; }
    .contact-info { display: grid; gap: 20px; }
    .info-card p { margin: 0; font-weight: 600; font-size: 1.05rem; }
    .info-card a { color: var(--ink); }
    .form-card { padding: 40px; }
    .form-card h2 { margin-bottom: 24px; }
    .name-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    @media (max-width: 860px) {
      .contact-grid { grid-template-columns: 1fr; }
      .name-row { grid-template-columns: 1fr; }
      .form-card { padding: 28px; }
    }
  `],
})
export class Contact {
  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);

  protected readonly sending = signal(false);
  protected readonly status = signal<'idle' | 'ok' | 'err'>('idle');
  protected readonly statusMsg = signal('');

  protected readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status.set('err');
      this.statusMsg.set('Please fill in all required fields with a valid email.');
      return;
    }
    this.sending.set(true);
    this.status.set('idle');
    this.http.post<{ message?: string }>('/api/contact', this.form.getRawValue()).subscribe({
      next: (res) => {
        this.sending.set(false);
        this.status.set('ok');
        this.statusMsg.set(res.message ?? 'Thank you! Your message has been received.');
        this.form.reset();
      },
      error: (err) => {
        this.sending.set(false);
        this.status.set('err');
        this.statusMsg.set(err?.error?.error ?? 'Something went wrong. Please try again later.');
      },
    });
  }
}
