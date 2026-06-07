import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView
} from "framer-motion";

/* ============================================================
   Hooks
   ============================================================ */

export function useShouldAnimate() {
  const reduceMotion = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handle = () => setMobile(mq.matches);
    handle();
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);
  if (reduceMotion) return "off";
  if (mobile) return "lite";
  return "full";
}

/* ============================================================
   Reusable motion presets
   ============================================================ */

const EASE_OUT = [0.22, 1, 0.36, 1];
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const DUR = { full: 0.55, lite: 0.4, off: 0 };
const STAGGER = { full: 0.045, lite: 0.025, off: 0 };
const DELAY_CHILDREN = { full: 0.05, lite: 0.02, off: 0 };

/* ============================================================
   ScrollReveal — single element reveal on scroll
   ============================================================ */

export function ScrollReveal({
  children,
  delay = 0,
  y = 22,
  x = 0,
  scale = 1,
  duration,
  amount = 0.1,
  once = true,
  className = "",
  as = "div",
  ...rest
}) {
  const mode = useShouldAnimate();
  const MotionTag = motion[as] || motion.div;

  if (mode === "off") {
    const Tag = as;
    return <Tag className={className} {...rest}>{children}</Tag>;
  }

  const initial = mode === "lite" ? { opacity: 0, y: Math.min(y, 10), x: 0, scale: 1 } : { opacity: 0, y, x, scale };
  const animate = { opacity: 1, y: 0, x: 0, scale };
  const d = duration ?? (mode === "lite" ? DUR.lite : DUR.full);

  return (
    <MotionTag
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ amount, once, margin: "0px 0px -8% 0px" }}
      transition={{ duration: d, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/* ============================================================
   StaggerReveal — children reveal in a quick cascade
   ============================================================ */

export function StaggerReveal({
  children,
  className = "",
  stagger,
  delayChildren,
  y = 18,
  amount = 0.1,
  once = true,
  as = "div"
}) {
  const mode = useShouldAnimate();
  const MotionTag = motion[as] || motion.div;

  if (mode === "off") {
    return <div className={className}>{children}</div>;
  }

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger ?? STAGGER[mode],
        delayChildren: delayChildren ?? DELAY_CHILDREN[mode]
      }
    }
  };
  const item = {
    hidden: { opacity: 0, y: mode === "lite" ? Math.min(y, 8) : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: mode === "lite" ? DUR.lite : DUR.full, ease: EASE_OUT }
    }
  };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ amount, once, margin: "0px 0px -8% 0px" }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </MotionTag>
  );
}

/* ============================================================
   TextReveal — word-by-word or char-by-char reveal
   ============================================================ */

export function TextReveal({
  text,
  as = "span",
  className = "",
  delay = 0,
  staggerWords = 0.025,
  staggerChars,
  amount = 0.2,
  by = "word"
}) {
  const mode = useShouldAnimate();
  const MotionTag = motion[as] || motion.span;

  if (mode === "off" || !text) {
    return <span className={className}>{text}</span>;
  }

  const segments = by === "char" ? Array.from(text) : text.split(" ");
  const stagger = by === "char"
    ? (staggerChars ?? 0.012)
    : (mode === "lite" ? Math.min(staggerWords, 0.015) : staggerWords);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };
  const seg = {
    hidden: { y: mode === "lite" ? "60%" : "105%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: mode === "lite" ? 0.35 : 0.55, ease: EASE_OUT }
    }
  };

  return (
    <MotionTag
      className={`tr-container ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ amount, once: true, margin: "0px 0px -8% 0px" }}
      aria-label={text}
    >
      {segments.map((s, i) => (
        <span key={i} className="tr-word-wrap" aria-hidden="true">
          <motion.span className="tr-word" variants={seg}>
            {s}
            {by === "word" && i < segments.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ============================================================
   MagneticButton — desktop-only cursor follow
   ============================================================ */

export function MagneticButton({
  children,
  strength = 0.25,
  className = "",
  as = "button",
  ...rest
}) {
  const ref = useRef(null);
  const mode = useShouldAnimate();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (mode !== "full") return;
    const el = ref.current;
    if (!el) return;
    let rafId = null;
    const onMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setPos({
          x: (e.clientX - cx) * strength,
          y: (e.clientY - cy) * strength
        });
        rafId = null;
      });
    };
    const onLeave = () => setPos({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mode, strength]);

  if (mode !== "full") {
    const Comp = as;
    return <Comp ref={ref} className={className} {...rest}>{children}</Comp>;
  }

  return (
    <motion.button
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.5 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

/* ============================================================
   Parallax — subtle Y translation tied to scroll progress
   ============================================================ */

export function Parallax({ children, speed = 0.15, className = "", as = "div" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const mode = useShouldAnimate();
  const range = mode === "full" ? 80 * speed : 25 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const MotionTag = motion[as] || motion.div;

  if (mode === "off") {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <MotionTag ref={ref} style={{ y }} className={className}>
      {children}
    </MotionTag>
  );
}

/* ============================================================
   ScrollScale — element scales up as it enters viewport
   ============================================================ */

export function ScrollScale({
  children,
  from = 0.92,
  to = 1,
  amount = 0.3,
  className = ""
}) {
  const mode = useShouldAnimate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount, margin: "0px 0px -8% 0px" });

  if (mode === "off") {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ scale: mode === "lite" ? 0.96 : from, opacity: 0.6 }}
      animate={inView ? { scale: to, opacity: 1 } : {}}
      transition={{ duration: mode === "lite" ? 0.4 : 0.7, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   CountUp — animates a number from 0 to value
   ============================================================ */

export function CountUp({ to = 100, duration = 1.4, prefix = "", suffix = "", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const mode = useShouldAnimate();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (mode === "off") {
      setVal(to);
      return;
    }
    const start = performance.now();
    const run = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * to));
      if (t < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, [inView, to, duration, mode]);

  return <span ref={ref} className={className}>{prefix}{val}{suffix}</span>;
}

/* ============================================================
   Marquee — infinitely scrolling strip
   ============================================================ */

export function Marquee({
  children,
  speed = 40,
  className = "",
  pauseOnHover = true,
  reverse = false
}) {
  const mode = useShouldAnimate();
  if (mode === "off") {
    return <div className={className}>{children}</div>;
  }
  const duration = Math.max(8, 200 / Math.max(0.1, speed));
  return (
    <div className={`mq ${pauseOnHover ? "mq-pause-hover" : ""} ${className}`}>
      <div
        className="mq-track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal"
        }}
      >
        <div className="mq-set">{children}</div>
        <div className="mq-set" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

/* ============================================================
   TiltCard — 3D tilt on hover (desktop)
   ============================================================ */

export function TiltCard({ children, className = "", max = 5, scale = 1.015 }) {
  const ref = useRef(null);
  const mode = useShouldAnimate();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, s: 1 });

  useEffect(() => {
    if (mode !== "full") return;
    const el = ref.current;
    if (!el) return;
    let rafId = null;
    const onMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        setTilt({
          rx: (0.5 - py) * 2 * max,
          ry: (px - 0.5) * 2 * max,
          s: scale
        });
        rafId = null;
      });
    };
    const onLeave = () => setTilt({ rx: 0, ry: 0, s: 1 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mode, max, scale]);

  if (mode !== "full") {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ rotateX: tilt.rx, rotateY: tilt.ry, scale: tilt.s }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      style={{ transformStyle: "preserve-3d", transformPerspective: 1000, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   FadeInOnScroll — convenience alias
   ============================================================ */

export function FadeInOnScroll({ children, className = "", y = 18, amount = 0.15, delay = 0 }) {
  return (
    <ScrollReveal y={y} amount={amount} delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}

/* ============================================================
   RevealLine — draws an underline / divider as it enters view
   ============================================================ */

export function RevealLine({ className = "", height = 1, delay = 0 }) {
  const mode = useShouldAnimate();
  if (mode === "off") {
    return <div className={className} style={{ height }} />;
  }
  return (
    <motion.div
      className={className}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      style={{ height, transformOrigin: "left center" }}
    />
  );
}
