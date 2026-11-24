import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBand } from '../../shared/cta-band';
import { Reveal } from '../../shared/reveal';
import { Parallax } from '../../shared/parallax';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CtaBand, Reveal, Parallax],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  protected readonly heroImages = [
    'assets/img/hero.jpg',
    'assets/img/education.jpg',
    'assets/img/tutoring.jpg',
    'assets/img/college.jpg',
    'assets/img/community.jpg',
    'assets/img/mentor.jpg',
  ];
  protected readonly activeSlide = signal(0);
  private slideTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.slideTimer = setInterval(() => {
      this.activeSlide.update((i) => (i + 1) % this.heroImages.length);
    }, 6000);
  }

  ngOnDestroy(): void {
    clearInterval(this.slideTimer);
  }

  protected goToSlide(i: number): void {
    this.activeSlide.set(i);
    clearInterval(this.slideTimer);
    this.slideTimer = setInterval(() => {
      this.activeSlide.update((n) => (n + 1) % this.heroImages.length);
    }, 6000);
  }
  protected readonly stats = [
    { num: '2015', lbl: 'Founded In', icon: '🏛️', tone: 'b' },
    { num: '350+', lbl: 'Students Supported', icon: '🎓', tone: 'a' },
    { num: '500+', lbl: 'Volunteers', icon: '🤝', tone: 't' },
    { num: '90%', lbl: 'Funds to Programs', icon: '💛', tone: 'c' },
  ];

  protected readonly programs = [
    {
      icon: '📚',
      warm: false,
      tone: '#2d4fdd',
      gradient: 'linear-gradient(to bottom, #5b7bff, #2d4fdd)',
      img: 'assets/img/tutoring.jpg',
      tag: 'Grades 6–12 · Online',
      title: 'Peer Tutoring & Academics',
      text: 'One-on-one online coaching in math, science, English, and history for middle and high school students — plus homework help and test prep.',
      link: '/academics',
    },
    {
      icon: '🌱',
      warm: true,
      tone: '#0f9d8f',
      gradient: 'linear-gradient(to bottom, #2cc4b3, #0f9d8f)',
      img: 'assets/img/mentor.jpg',
      tag: 'Beyond the classroom',
      title: 'Life Skills & Leadership',
      text: 'Training in communication, goal setting, time management, public speaking, and leadership that prepares students for life beyond the classroom.',
      link: '/life-skill-training',
    },
    {
      icon: '🤝',
      warm: false,
      tone: '#d97706',
      gradient: 'linear-gradient(to bottom, #f5a524, #ef7d3c)',
      img: 'assets/img/community.jpg',
      tag: 'Give back · Grow',
      title: 'Social Responsibility',
      text: 'Building character through empathy, community service, peer mentoring, and respect for diversity — one student at a time.',
      link: '/social-responsibility',
    },
  ];

  protected readonly events = [
    {
      title: 'Thanksgiving Drive-Thru',
      tag: 'Community Outreach',
      text: 'Awareness USA volunteers teamed up with Feed Our Children Ministry to serve families during a Thanksgiving food drive-thru.',
    },
    {
      title: 'Food for Families in Need',
      tag: 'Food Drive',
      text: 'A community food distribution event hosted at Bible Truth Ministries Academy, supporting local families facing food insecurity.',
    },
    {
      title: 'Dream Big!',
      tag: 'Motivation',
      text: 'Dr. Bikkasani delivered an interactive motivational talk inspiring students at Bible Truth Ministry to aim high and believe in themselves.',
    },
  ];

  protected readonly testimonials = [
    {
      quote:
        'Awareness USA has provided homework help and tutoring for my two girls during a chaotic time in my life. We set up daily sessions over Zoom and I have seen real improvement in their grades and social interaction. To every tutor who worked with my girls — thank you for your dedication and patience. My girls love you!',
      name: 'Barbara',
      role: 'Mother of 2',
    },
    {
      quote:
        'Tutoring at Awareness USA has pushed me to grow and face situations I never would have otherwise. The variety of subjects I help with has strengthened my own academics, and every student I have met has been amazing. I am excited to watch this organization reach more students.',
      name: 'Jessica',
      role: 'Homework Help Tutor',
    },
    {
      quote:
        'I learned so much from the Joy trainings given by Dr. Bikkasani — listening fully and without judgment, and learning to be happy and appreciative.',
      name: 'Melissa Celik',
      role: 'Student',
    },
    {
      quote:
        'Dr. Bikkasani’s workshop helped me in my personal and professional life. In uncertain times, we need to stay calm and reach out to those in need — his workshop teaches and inspires exactly that. One child helping another, and then another — the butterfly effect.',
      name: 'Beth Pansire',
      role: 'Student',
    },
  ];
}
