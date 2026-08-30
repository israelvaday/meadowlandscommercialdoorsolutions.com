"use client";

import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked parallax. Moves child up/down as the section moves through
 * the viewport.
 */
export function Parallax({
  children,
  strength = -80,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Fixed scroll-progress bar — sits at the top of the viewport and fills
 * left-to-right as the user scrolls.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brass-600 via-brass-400 to-brass-300 shadow-[0_0_12px_rgba(34,211,238,0.55)]"
    />
  );
}

/**
 * Wraps content with a scroll-linked rotate + scale that gently breathes as
 * you scroll through the section.
 */
export function FloatOnScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ rotate, scale }}>{children}</motion.div>
    </div>
  );
}
