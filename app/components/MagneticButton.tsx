"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "ghost" | "cream" | "outline";
  className?: string;
  download?: boolean;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const variantClasses: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  dark: "bg-foreground text-background hover:bg-walnut",
  ghost:
    "border border-line bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
  cream: "bg-background text-foreground hover:bg-walnut hover:text-background",
  outline:
    "border border-white/15 bg-white/5 text-background hover:border-white/50 hover:bg-white/10"
};

export default function MagneticButton({
  href,
  children,
  variant = "dark",
  className = "",
  download,
  external,
  onClick,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 280, damping: 18, mass: 0.35 });
  const innerX = useTransform(springX, (value) => value * 0.38);
  const innerY = useTransform(springY, (value) => value * 0.38);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    x.set(offsetX * 0.18);
    y.set(offsetY * 0.18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 ${variantClasses[variant]} ${className}`}
      data-cursor="interactive"
    >
      <motion.span style={{ x: innerX, y: innerY }}>{children}</motion.span>
    </motion.a>
  );
}