"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { TankVisualization } from "./tank-visualization";

export default function InteractiveTank({ baseLevel = 72 }: { baseLevel?: number }) {
  const [level, setLevel] = useState(baseLevel);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setLevel((v) => Math.max(8, Math.min(98, Math.round((baseLevel + (Math.random() - 0.5) * 4) * 10) / 10)));
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, [baseLevel]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-200, 200], [15, -15]);
  const rotateX = useTransform(mouseY, [-200, 200], [-10, 10]);
  const translateX = useTransform(mouseX, [-200, 200], [-30, 30]);
  const translateY = useTransform(mouseY, [-200, 200], [-15, 15]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      mouseX.set(x);
      mouseY.set(y);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-10 flex items-center justify-end pr-12 md:pr-24 lg:pr-40">
      <motion.div
        style={{ rotateY, rotateX, x: translateX, y: translateY }}
        className="opacity-60"
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
      >
        <div className="w-[360px] md:w-[420px] lg:w-[520px] transform-gpu">
          <TankVisualization level={level} status={level > 80 ? "Full" : level > 50 ? "Medium" : level > 25 ? "Low" : "Critical"} />
        </div>
      </motion.div>
    </div>
  );
}
