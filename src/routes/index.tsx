import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import portrait from "@/assets/srhoe-portrait.png";
import owlsecLogo from "@/assets/owlsec-owl-logo.jpeg";
import grayswanLogo from "@/assets/grayswan-logo.jpeg";
import bigoLogo from "@/assets/bigo-live-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SRHOE — (Un)professional Hacker" },
      {
        name: "description",
        content:
          "Official home of SRHOE. Find SRHOE on Owlsec, Grey Swan AI Arena and BIGO LIVE, or get in touch for business.",
      },
      { property: "og:title", content: "SRHOE — (Un)professional Hacker" },
      {
        property: "og:description",
        content: "Communities, platforms and business inquiries for SRHOE.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EMAIL = "srhoemgmt@gmail.com";

type Platform = {
  name: string;
  desc: string;
  href: string;
  logo?: string;
  logoClass?: string;
};

const platforms: Platform[] = [
  {
    name: "Owlsec",
    desc: "Join 200,000+ hackers in a community that never sleeps.",
    href: "https://owlsec.ai/",
    logo: owlsecLogo,
    logoClass: "object-cover",
  },
  {
    name: "Grey Swan AI Arena",
    desc: "Master AI red teaming. Compete for prizes and accelerate your AI safety career.",
    href: "https://app.grayswan.ai/arena/challenge/ipi-black-2026?utm_campaign=ipi-black&utm_source=srhoe",
    logo: grayswanLogo,
    logoClass: "object-cover",
  },
  {
    name: "BIGO LIVE",
    desc: "BIGO LIVE is a free live-streaming and video-chat platform.",
    href: "https://livestream.onelink.me/ZYcM/USbigolive623?utm_source=beacons&utm_medium=lib_share&utm_campaign=srhoe",
    logo: bigoLogo,
    logoClass: "object-contain p-1.5",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;
const cardList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } },
};
const cardItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-1/4 left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-silver/10 blur-3xl"
        animate={{ x: ["-50%", "-44%", "-50%"], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/3 -right-1/4 h-[60vmax] w-[60vmax] rounded-full bg-accent/60 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="grain absolute inset-0 opacity-60" />
    </div>
  );
}

function PortraitParticles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.clientWidth, h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr; ctx.scale(dpr, dpr);
    const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.32;
    const pts = Array.from({ length: 46 }, () => {
      const a = Math.random() * Math.PI * 2, d = r * (0.3 + Math.random() * 0.75);
      const sa = Math.random() * Math.PI * 2, sd = r * (1.4 + Math.random() * 0.8);
      return { sx: cx + Math.cos(sa) * sd, sy: cy + Math.sin(sa) * sd, tx: cx + Math.cos(a) * d, ty: cy + Math.sin(a) * d * 1.1, x: 0, y: 0 };
    });
    const DUR = 2400; let start = 0; let raf = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / DUR, 1);
      const k = 1 - Math.pow(1 - Math.min(p / 0.6, 1), 3);
      const alpha = p < 0.55 ? Math.min(p / 0.15, 1) : Math.max(0, 1 - (p - 0.55) / 0.45);
      ctx.clearRect(0, 0, w, h);
      for (const q of pts) { q.x = q.sx + (q.tx - q.sx) * k; q.y = q.sy + (q.ty - q.sy) * k; }
      ctx.lineWidth = 0.5;
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const A = pts[i]!, B = pts[j]!;
        const dx = A.x - B.x, dy = A.y - B.y, dd = Math.hypot(dx, dy);
        if (dd < 48) { ctx.strokeStyle = `rgba(220,224,232,${(1 - dd / 48) * 0.35 * alpha})`; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke(); }
      }
      ctx.fillStyle = `rgba(235,238,245,${0.8 * alpha})`;
      for (const q of pts) { ctx.beginPath(); ctx.arc(q.x, q.y, 1.1, 0, Math.PI * 2); ctx.fill(); }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-10 h-full w-full" />;
}

function PlatformCard({ p }: { p: Platform }) {
  return (
    <motion.a
      variants={cardItem}
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      className="glass glow-in group flex h-[60px] w-full min-w-0 items-center gap-3 rounded-2xl px-3 outline-none transition-colors hover:bg-glass focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`${p.name} — ${p.desc} (opens in new tab)`}
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-glass-border bg-background [@media(max-height:700px)]:h-9 [@media(max-height:700px)]:w-9">
        {p.logo ? (
          <img src={p.logo} alt={`${p.name} logo`} className={`h-full w-full ${p.logoClass}`} />
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-foreground" aria-hidden>
            <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.2H8v3.6h2.6V22H14v-9.9h2.7l.4-3.6H14z" />
          </svg>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] leading-tight text-foreground">{p.name}</p>
        <p className="font-hand mt-0.5 line-clamp-2 text-[11px] leading-tight text-muted-foreground">{p.desc}</p>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
    </motion.a>
  );
}

function Index() {
  return (
    <div
      className="relative flex h-svh w-full justify-center overflow-hidden"
      style={{
        paddingTop: "max(env(safe-area-inset-top), 0.75rem)",
        paddingBottom: "max(env(safe-area-inset-bottom), 0.75rem)",
      }}
    >
      <Ambient />
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="flex h-full min-h-0 w-full max-w-md flex-col px-4 sm:max-w-lg"
      >
        {/* Hero */}
        <section className="relative flex min-h-0 flex-1 flex-col items-center justify-center py-2">
          <motion.div variants={item} className="relative flex min-h-[120px] w-full flex-1 items-center justify-center">
            <div aria-hidden className="absolute aspect-square h-[85%] max-h-80 rounded-full bg-silver/15 blur-2xl" />
            <PortraitParticles />
            <motion.img
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)", y: [0, -8, 0] }}
              transition={{ opacity: { duration: 1.2, delay: 0.5, ease }, filter: { duration: 1.2, delay: 0.5, ease }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
              src={portrait}
              alt="SRHOE portrait"
              width={800}
              height={800}
              fetchPriority="high"
              className="absolute inset-0 m-auto h-full max-h-[22rem] w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
          <motion.h1
            variants={item}
            className="text-sheen title-glow text-[clamp(2rem,min(13vw,6.5svh),3.5rem)] leading-none tracking-[0.12em]"
          >
            SRHOE
          </motion.h1>
          <motion.p variants={item} className="mt-2 text-center text-[14px] tracking-[0.08em] text-silver">
            (Un)professional Hacker
          </motion.p>
        </section>

        {/* Platforms */}
        <motion.section variants={container} aria-labelledby="platforms" className="mt-1">
          <motion.h2
            variants={item}
            id="platforms"
            className="mb-2 px-1 text-[11px] tracking-[0.25em] text-muted-foreground"
          >
            FIND ME ON
          </motion.h2>
          <motion.div variants={cardList} className="flex flex-col gap-2 [@media(max-height:700px)]:gap-1.5">
            {platforms.map((p) => (
              <PlatformCard key={p.name} p={p} />
            ))}
          </motion.div>
        </motion.section>

        {/* Business */}
        <motion.a
          variants={item}
          href={`mailto:${EMAIL}`}
          className="mt-3 inline-flex items-center justify-center gap-2 self-center text-[13px] text-silver transition-colors hover:text-foreground"
        >
          <Mail className="h-4 w-4 shrink-0" aria-hidden />
          <span className="font-hand">{EMAIL}</span>
        </motion.a>

        <motion.footer variants={item} className="mt-2 text-center text-[10px] tracking-[0.25em] text-muted-foreground/70">
          © {new Date().getFullYear()} SRHOE
        </motion.footer>
      </motion.main>
    </div>
  );
}
