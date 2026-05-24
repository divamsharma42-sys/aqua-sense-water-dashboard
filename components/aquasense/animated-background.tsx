"use client";

export default function AnimatedBackground() {
  return (
    <div className="aqua-bg" aria-hidden>
      <div className="aqua-bg__grid" />
      <div className="aqua-bg__particles">
        {Array.from({ length: 14 }).map((_, index) => (
          <span key={index} className="aqua-bg__particle" />
        ))}
      </div>
      <div className="aqua-bg__wave aqua-bg__wave--back" />
      <div className="aqua-bg__wave aqua-bg__wave--front" />
      <div className="aqua-bg__network">
        <span className="aqua-bg__node aqua-bg__node-1" />
        <span className="aqua-bg__node aqua-bg__node-2" />
        <span className="aqua-bg__node aqua-bg__node-3" />
        <span className="aqua-bg__node aqua-bg__node-4" />
      </div>
    </div>
  );
}
