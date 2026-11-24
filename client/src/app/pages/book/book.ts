import { Component } from '@angular/core';
import { CtaBand } from '../../shared/cta-band';

@Component({
  selector: 'app-book',
  imports: [CtaBand],
  template: `
    <section class="page-hero">
      <div class="container">
        <div class="ph-copy">
          <span class="eyebrow light">By Our Founder</span>
          <h1>The Book – Joy Of Life</h1>
          <p class="lead">Happiness is buildable — concrete pathways to a joyous life, by Dr. Purna Bikkasani.</p>
        </div>
        <img class="ph-media" src="assets/img/ph-book2.jpg" alt="Open book with glasses and coffee" />
      </div>
    </section>

    <section class="section" style="padding-top: 20px;">
      <div class="container book-intro">
        <div class="book-photo">
          <img src="assets/img/book-author.webp" alt="Dr. Purna Bikkasani holding Joy of Life" />
        </div>
        <div class="book-text">
          <h2>The book <em>Joy of Life</em> authenticates the idea that happiness is buildable in the modern world.</h2>
          <p>
            It provides the concrete pathways to build a joyous life of your own using the tools of
            happiness, adapting to adversity, and setpoint happiness. If you are like the majority of
            people who suffer and struggle in life financially, emotionally, or psychologically, I hope
            to take you through a step by step process to get over daily challenges in life. Practicing
            the tools and habits presented in this book will fuel greater success and happiness at any
            stage in life.
          </p>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 10px;">
      <div class="container book-blocks">
        <div class="blocks-text">
          <h2>The building blocks of happiness are as follows.</h2>
          <p>
            In this book, He shares the tools that have made him a happy man. He arose from poverty to
            richness, backwardness to sophistication, and ignorance to knowledge and wisdom. He explains
            the habits that have transcended his fears, frustrations, and insecurities in life. The book
            is written with sound scientific, evolutionary, social, and emotional underpinnings of the
            modern world. The tools of happiness recommended here are consistent with all belief
            systems, faiths, and philosophies.
          </p>
          <a class="btn btn-dark" href="https://www.amazon.com/Joy-Life-Effortless-Through-Self-Transformation-ebook/dp/B085FS469L" target="_blank" rel="noopener">Buy The Book</a>
        </div>
        <div class="blocks-visual">
          <img class="book-cover" src="assets/img/book-joy-of-life.jpg" alt="Joy of Life book cover" />
          <ul class="blocks-list">
            @for (b of blocks; track b) {
              <li>{{ b }}</li>
            }
          </ul>
        </div>
      </div>
    </section>

    <app-cta-band
      heading="Make a donation today!"
      title="Donate to Educate and Empower a Student's Life" />
  `,
  styles: [`
    .book-intro { display: grid; grid-template-columns: 400px 1fr; gap: 56px; align-items: center; }
    .book-photo img { width: 100%; border-radius: 16px; box-shadow: var(--shadow-lg); }
    .book-text h2 { font-size: 1.9rem; line-height: 1.3; margin: 0 0 20px; }
    .book-text h2 em { font-style: normal; color: var(--primary); }
    .book-text p { font-size: 1.02rem; line-height: 1.8; color: var(--ink); margin: 0; }
    .book-blocks { display: grid; grid-template-columns: 1fr 1.2fr; gap: 56px; align-items: center; }
    .blocks-text h2 { font-size: 1.9rem; line-height: 1.3; margin: 0 0 20px; }
    .blocks-text p { line-height: 1.8; margin: 0 0 28px; }
    .btn-dark { background: var(--ink); color: #fff; border-radius: 999px; padding: 13px 28px; font-weight: 700; text-decoration: none; display: inline-block; transition: transform .25s ease; }
    .btn-dark:hover { transform: translateY(-2px); }
    .blocks-visual { position: relative; }
    .book-cover { width: 62%; border-radius: 6px; box-shadow: var(--shadow-lg); }
    .blocks-list { list-style: none; margin: 0; padding: 28px 26px; position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 58%; background: #fff; border-radius: 12px; box-shadow: var(--shadow-lg); display: grid; gap: 18px; }
    .blocks-list li { position: relative; padding-left: 28px; font-size: 0.93rem; line-height: 1.5; color: var(--ink); font-weight: 600; }
    .blocks-list li::before { content: ''; position: absolute; left: 0; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: var(--primary); }
    @media (max-width: 900px) {
      .book-intro, .book-blocks { grid-template-columns: 1fr; gap: 36px; }
      .blocks-visual { padding-bottom: 40px; }
      .blocks-list { position: static; transform: none; width: 100%; margin-top: -30px; }
      .book-cover { width: 70%; }
    }
  `],
})
export class Book {
  blocks = [
    'Know the purpose of life is reached through self-help and helping others.',
    'Learn to replace your old habits and attitudes with the new ones to be happy in life.',
    'Manage your stress through memorizing goals and affirmations.',
    'Attain peace of mind by resolving inner, and outer conflicts.',
    'Work effortlessly through good body posture and awareness.',
    'Consciousize anxieties, fears, and frustrations to live a happy life.',
    'Embrace human diversity as a thing of beauty, not a cause for conflict.',
  ];
}
