"use client";

export default function AnimatedBackground() {
  return (
    <div className="aqua-bg" aria-hidden>
      <div className="wave" style={{opacity:0.9, transform: 'translateY(0)'}} />
      <div className="wave" style={{bottom:'5%', opacity:0.6, transform: 'scale(0.9) translateY(-6px)'}} />
      <div className="particles" />
      <div className="grid" />

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(6,182,212,0.14)" />
            <stop offset="100%" stopColor="rgba(3,105,147,0.08)" />
          </linearGradient>
        </defs>
        <path d="M0,200 C480,300 720,120 1280,200 C1680,260 1920,180 1920,180 L1920,400 L0,400 Z" fill="url(#g1)" opacity="0.45" />
      </svg>
    </div>
  );
}
