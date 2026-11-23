import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, Download, Terminal, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

const BRAND_COLORS = [
  { name: "Orange", hex: "#FF4C00", hsl: "18 100% 50%", token: "--brand-orange", usage: "Primary mark, CTAs, active highlights" },
  { name: "Charcoal", hex: "#0E0E0E", hsl: "0 0% 5.5%", token: "--brand-charcoal", usage: "Dark canvas, primary wordmark ink" },
  { name: "Off-white", hex: "#F7F7F7", hsl: "0 0% 96.9%", token: "--brand-off-white", usage: "Light canvas background" },
  { name: "Cloud", hex: "#EAEAEA", hsl: "0 0% 91.8%", token: "--brand-cloud", usage: "Hairline borders, subtle dividers" },
  { name: "Peach", hex: "#FFE6D9", hsl: "20 100% 92.5%", token: "--brand-peach", usage: "Warm tint containers & icon surfaces" },
];

const CSS_TOKENS = `:root {
  --brand-orange: #FF4C00;
  --brand-charcoal: #0E0E0E;
  --brand-off-white: #F7F7F7;
  --brand-cloud: #EAEAEA;
  --brand-peach: #FFE6D9;
  --brand-font: "Suisse Intl", Inter, sans-serif;
}`;

const HORIZONTAL_LOGOS = [
  {
    title: "Horizontal — Primary",
    subtitle: "Use on light backgrounds (#F7F7F7 / #FFFFFF)",
    src: "/assets/aistudio/afrimoney-horizontal-primary_0604f76c.png",
    downloadName: "afrimoney-horizontal-primary.png",
    bg: "bg-[#F7F7F7]",
  },
  {
    title: "Horizontal — Reversed",
    subtitle: "Use on dark backgrounds (#0E0E0E)",
    src: "/assets/aistudio/afrimoney-horizontal-reversed_b391116d.png",
    downloadName: "afrimoney-horizontal-reversed.png",
    bg: "bg-[#0E0E0E]",
  },
  {
    title: "Horizontal — Black",
    subtitle: "Single-color monochrome on light",
    src: "/assets/aistudio/afrimoney-horizontal-black_73b045ff.png",
    downloadName: "afrimoney-horizontal-black.png",
    bg: "bg-[#F7F7F7]",
  },
  {
    title: "Horizontal — White",
    subtitle: "Single-color monochrome on dark",
    src: "/assets/aistudio/afrimoney-horizontal-white_53a2de33.png",
    downloadName: "afrimoney-horizontal-white.png",
    bg: "bg-[#0E0E0E]",
  },
];

const STACKED_LOGOS = [
  {
    title: "Stacked — Primary",
    src: "/assets/aistudio/afrimoney-stacked-primary_405c0857.png",
    downloadName: "afrimoney-stacked-primary.png",
    bg: "bg-[#F7F7F7]",
  },
  {
    title: "Stacked — Reversed",
    src: "/assets/aistudio/afrimoney-stacked-reversed_256aa491.png",
    downloadName: "afrimoney-stacked-reversed.png",
    bg: "bg-[#0E0E0E]",
  },
  {
    title: "Stacked — Black",
    src: "/assets/aistudio/afrimoney-stacked-black_94f40adf.png",
    downloadName: "afrimoney-stacked-black.png",
    bg: "bg-[#F7F7F7]",
  },
  {
    title: "Stacked — White",
    src: "/assets/aistudio/afrimoney-stacked-white_13feb246.png",
    downloadName: "afrimoney-stacked-white.png",
    bg: "bg-[#0E0E0E]",
  },
];

const MARKS_AND_WORDMARKS = [
  {
    title: "Mark — Primary",
    src: "/assets/aistudio/afrimoney-mark-primary_35aab509.png",
    downloadName: "afrimoney-mark-primary.png",
    bg: "bg-[#F7F7F7]",
    imgClass: "h-20 w-auto",
  },
  {
    title: "Mark — Reversed",
    src: "/assets/aistudio/afrimoney-mark-reversed_35aab509.png",
    downloadName: "afrimoney-mark-reversed.png",
    bg: "bg-[#0E0E0E]",
    imgClass: "h-20 w-auto",
  },
  {
    title: "Mark — Black",
    src: "/assets/aistudio/afrimoney-mark-black_13c81170.png",
    downloadName: "afrimoney-mark-black.png",
    bg: "bg-[#F7F7F7]",
    imgClass: "h-20 w-auto",
  },
  {
    title: "Mark — White",
    src: "/assets/aistudio/afrimoney-mark-white_28d1a86a.png",
    downloadName: "afrimoney-mark-white.png",
    bg: "bg-[#0E0E0E]",
    imgClass: "h-20 w-auto",
  },
  {
    title: "Wordmark — Black",
    src: "/assets/aistudio/afrimoney-wordmark-black_9c284fb4.png",
    downloadName: "afrimoney-wordmark-black.png",
    bg: "bg-[#F7F7F7]",
    imgClass: "h-9 w-auto",
  },
  {
    title: "Wordmark — White",
    src: "/assets/aistudio/afrimoney-wordmark-white_f0231d4b.png",
    downloadName: "afrimoney-wordmark-white.png",
    bg: "bg-[#0E0E0E]",
    imgClass: "h-9 w-auto",
  },
];

type IconSize = 32 | 48 | 64 | 128 | 192 | 512 | 1024;
const ICON_SIZES: IconSize[] = [32, 48, 64, 128, 192, 512, 1024];

const ICON_ASSETS: Record<"dark" | "light" | "transparent", Record<IconSize, string>> = {
  dark: {
    32: "/assets/aistudio/afrimoney-icon-dark-32_944adfa4.png",
    48: "/assets/aistudio/afrimoney-icon-dark-48_3736d990.png",
    64: "/assets/aistudio/afrimoney-icon-dark-64_8bd73d47.png",
    128: "/assets/aistudio/afrimoney-icon-dark-128_9cd5b53f.png",
    192: "/assets/aistudio/afrimoney-icon-dark-192_89d288bf.png",
    512: "/assets/aistudio/afrimoney-icon-dark-512_ecedd5dd.png",
    1024: "/assets/aistudio/afrimoney-icon-dark-1024_c39cfa8e.png",
  },
  light: {
    32: "/assets/aistudio/afrimoney-icon-light-32_35c90c84.png",
    48: "/assets/aistudio/afrimoney-icon-light-48_6357a238.png",
    64: "/assets/aistudio/afrimoney-icon-light-64_8d1f813d.png",
    128: "/assets/aistudio/afrimoney-icon-light-128_c6591c52.png",
    192: "/assets/aistudio/afrimoney-icon-light-192_4a613a4e.png",
    512: "/assets/aistudio/afrimoney-icon-light-512_a13479a6.png",
    1024: "/assets/aistudio/afrimoney-icon-light-1024_1fc04125.png",
  },
  transparent: {
    32: "/assets/aistudio/afrimoney-icon-transparent-32_fec4ae07.png",
    48: "/assets/aistudio/afrimoney-icon-transparent-48_431ed094.png",
    64: "/assets/aistudio/afrimoney-icon-transparent-64_5b54f0f8.png",
    128: "/assets/aistudio/afrimoney-icon-transparent-128_36b85a16.png",
    192: "/assets/aistudio/afrimoney-icon-transparent-192_3d3a525f.png",
    512: "/assets/aistudio/afrimoney-icon-transparent-512_9ef8738d.png",
    1024: "/assets/aistudio/afrimoney-icon-transparent-1024_f77a995d.png",
  },
};

function downloadAsset(src: string, filename: string) {
  const a = document.createElement("a");
  a.href = src;
  a.download = filename;
  a.click();
  toast.success(`Downloaded ${filename}`);
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success(`Copied ${text}`);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function AssetCard({
  title,
  subtitle,
  src,
  downloadName,
  bg,
  imgClass = "h-12 w-auto object-contain",
}: {
  title: string;
  subtitle?: string;
  src: string;
  downloadName: string;
  bg: string;
  imgClass?: string;
}) {
  return (
    <div className="fc-card overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
        <div className="min-w-0">
          <span className="block truncate font-display text-xs font-semibold text-foreground">
            {title}
          </span>
          {subtitle && (
            <span className="block truncate text-[11px] text-muted-foreground">{subtitle}</span>
          )}
        </div>
        <button
          onClick={() => downloadAsset(src, downloadName)}
          className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          title={`Download ${downloadName}`}
        >
          <Download className="h-3 w-3" />
          PNG
        </button>
      </div>
      <div className={`flex min-h-[164px] items-center justify-center p-8 ${bg}`}>
        <img src={src} alt={title} className={imgClass} />
      </div>
    </div>
  );
}

function SocialPreview({
  title,
  width,
  height,
  children,
}: {
  title: string;
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  const aspect = width / height;
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-display text-xs font-semibold text-foreground">{title}</span>
        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
          {width}×{height}
        </span>
      </div>
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        {children}
      </div>
    </div>
  );
}

export default function Brand() {
  const [selectedIconSize, setSelectedIconSize] = useState<IconSize>(512);
  const [copiedTokens, setCopiedTokens] = useState(false);

  const handleCopyTokens = async () => {
    await navigator.clipboard.writeText(CSS_TOKENS);
    setCopiedTokens(true);
    toast.success("Copied CSS tokens");
    setTimeout(() => setCopiedTokens(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14 space-y-16">
        {/* Header */}
        <div className="border-b border-border pb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Directory
          </Link>
          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Afrimoney Brand Kit
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                A directory of Africa's fintech ecosystem. Official logos, app icons, clear-space rules, color tokens, and typography specifications.
              </p>
            </div>
            <button
              onClick={() =>
                downloadAsset("/assets/aistudio/brand-board_323b1189.png", "afrimoney-brand-board.png")
              }
              className="fc-btn-primary inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
            >
              <Download className="h-3.5 w-3.5" />
              Download Brand Board
            </button>
          </div>
        </div>

        {/* 01. Brand Board & Usage Guidelines */}
        <section>
          <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              01. Brand Overview & Usage Rules
            </h2>
            <span className="font-mono text-xs text-muted-foreground">Guidelines</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="overflow-hidden rounded-xl border border-border bg-card lg:col-span-8">
              <img
                src="/assets/aistudio/brand-board_323b1189.png"
                alt="Afrimoney Official Brand Board"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-xl border border-border bg-card p-6 lg:col-span-4">
              <div className="space-y-4">
                <h3 className="font-display text-sm font-bold text-foreground">
                  Usage Guidelines
                </h3>
                <ul className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>
                      Use <strong className="text-foreground">Primary</strong> lockups on light backgrounds (<code className="font-mono">#F7F7F7</code> / <code className="font-mono">#FFFFFF</code>).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>
                      Use <strong className="text-foreground">Reversed</strong> lockups on dark surfaces (<code className="font-mono">#0E0E0E</code>).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>
                      Use <strong className="text-foreground">Monochrome (Black/White)</strong> for single-color print or watermark applications.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>
                      Maintain <strong className="text-foreground">clear space ≥ 0.25×</strong> the mark height around all sides.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>
                      Assets are transparent raster PNGs; the Africa continent cutout inside the A mark is transparent.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Clear space diagram */}
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                  <span>Clear Space Specification</span>
                  <span>x = ¼ mark height</span>
                </div>
                <div className="relative flex items-center justify-center rounded-md border border-dashed border-primary/50 bg-white p-6 dark:bg-zinc-950">
                  <span className="absolute left-2 top-1.5 font-mono text-[10px] text-primary">x</span>
                  <span className="absolute right-2 top-1.5 font-mono text-[10px] text-primary">x</span>
                  <span className="absolute left-2 bottom-1.5 font-mono text-[10px] text-primary">x</span>
                  <span className="absolute right-2 bottom-1.5 font-mono text-[10px] text-primary">x</span>
                  <img
                    src="/assets/aistudio/afrimoney-mark-primary_35aab509.png"
                    alt="Clear space mark example"
                    className="h-14 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02. Horizontal Lockups */}
        <section>
          <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              02. Horizontal Lockups
            </h2>
            <span className="font-mono text-xs text-muted-foreground">4 Variants · PNG</span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {HORIZONTAL_LOGOS.map((item) => (
              <AssetCard key={item.title} {...item} imgClass="h-10 sm:h-12 w-auto object-contain" />
            ))}
          </div>
        </section>

        {/* 03. Stacked Lockups */}
        <section>
          <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              03. Stacked Lockups
            </h2>
            <span className="font-mono text-xs text-muted-foreground">4 Variants · PNG</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STACKED_LOGOS.map((item) => (
              <AssetCard key={item.title} {...item} imgClass="h-24 w-auto object-contain" />
            ))}
          </div>
        </section>

        {/* 04. Marks & Wordmarks */}
        <section>
          <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              04. Standalone Marks & Wordmarks
            </h2>
            <span className="font-mono text-xs text-muted-foreground">Transparent PNG</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MARKS_AND_WORDMARKS.map((item) => (
              <AssetCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        {/* 05. App & Favicon Icons */}
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-3">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                05. App & Favicon Icons
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Select pixel resolution to preview and download square icons for favicons, PWAs, and social avatars.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-card p-1">
              {ICON_SIZES.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedIconSize(sz)}
                  className={`rounded-md px-2.5 py-1 font-mono text-xs font-medium transition-colors tabular-nums ${
                    selectedIconSize === sz
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {sz}px
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <AssetCard
              title={`Dark Square (${selectedIconSize}×${selectedIconSize})`}
              subtitle="Charcoal #0E0E0E tile"
              src={ICON_ASSETS.dark[selectedIconSize]}
              downloadName={`afrimoney-icon-dark-${selectedIconSize}.png`}
              bg="bg-muted/30"
              imgClass="h-24 w-24 rounded-2xl object-contain shadow-sm"
            />
            <AssetCard
              title={`Light Square (${selectedIconSize}×${selectedIconSize})`}
              subtitle="Off-white #F7F7F7 tile"
              src={ICON_ASSETS.light[selectedIconSize]}
              downloadName={`afrimoney-icon-light-${selectedIconSize}.png`}
              bg="bg-muted/30"
              imgClass="h-24 w-24 rounded-2xl border border-border object-contain shadow-sm"
            />
            <AssetCard
              title={`Transparent (${selectedIconSize}×${selectedIconSize})`}
              subtitle="Alpha channel background"
              src={ICON_ASSETS.transparent[selectedIconSize]}
              downloadName={`afrimoney-icon-transparent-${selectedIconSize}.png`}
              bg="fc-checkerboard"
              imgClass="h-24 w-24 object-contain"
            />
          </div>
        </section>

        {/* 06. Brand Colors & CSS Tokens */}
        <section>
          <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              06. Color System & Tokens
            </h2>
            <span className="font-mono text-xs text-muted-foreground">tokens.css</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {BRAND_COLORS.map((c) => (
              <div
                key={c.hex}
                className="fc-card overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="h-24 border-b border-border" style={{ backgroundColor: c.hex }} />
                <div className="space-y-2 p-3.5">
                  <p className="font-display text-sm font-bold text-foreground">{c.name}</p>
                  <div className="flex items-center justify-between">
                    <code className="font-mono text-xs text-muted-foreground">{c.hex}</code>
                    <CopyButton text={c.hex} />
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="font-mono text-[11px] text-muted-foreground">{c.hsl}</code>
                    <CopyButton text={c.hsl} />
                  </div>
                  <p className="text-[11px] leading-snug text-muted-foreground">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-[#111114] text-zinc-200">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400">
                <Terminal className="h-3.5 w-3.5 text-primary" />
                tokens.css
              </span>
              <button
                onClick={handleCopyTokens}
                className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                {copiedTokens ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                {copiedTokens ? "Copied" : "Copy CSS"}
              </button>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-300">
              <code>{CSS_TOKENS}</code>
            </pre>
          </div>
        </section>

        {/* 07. Typography */}
        <section>
          <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              07. Typography
            </h2>
            <span className="font-mono text-xs text-muted-foreground">Suisse Intl / Inter Fallback</span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="font-mono text-xs text-primary mb-2">Brand Spec Primary</p>
              <p className="font-display text-2xl font-extrabold tracking-tight">Suisse Intl</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Regular (400), Medium (500), Bold (700). Licensed separately. Recommended alternative: Inter or Plus Jakarta Sans.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <p className="font-mono text-xs text-primary mb-2">Web Display & UI</p>
              <p className="font-display text-2xl font-extrabold tracking-tight">Plus Jakarta Sans</p>
              <p className="mt-3 font-display text-sm text-muted-foreground break-all">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
              <p className="font-display text-sm text-muted-foreground break-all">
                abcdefghijklmnopqrstuvwxyz
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <p className="font-mono text-xs text-primary mb-2">Code & Tabular Data</p>
              <p className="font-mono text-2xl font-semibold">JetBrains Mono</p>
              <p className="mt-3 font-mono text-xs text-muted-foreground break-all">
                *955# · #FF4C00 · 0123456789
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                tabular-nums aligned metrics
              </p>
            </div>
          </div>
        </section>

        {/* 08. Social Templates */}
        <section>
          <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              08. Social Templates
            </h2>
            <span className="font-mono text-xs text-muted-foreground">OG & Banners</span>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <SocialPreview title="Twitter / X Banner" width={1500} height={500}>
              <div className="absolute inset-0 flex items-center justify-between bg-[#0E0E0E] px-[8%]">
                <div className="flex flex-col gap-3">
                  <img
                    src="/assets/aistudio/afrimoney-horizontal-reversed_b391116d.png"
                    alt="Afrimoney"
                    className="h-10 w-auto object-contain md:h-14"
                  />
                  <p className="font-display text-sm font-medium tracking-wide text-[#FFE6D9] md:text-base">
                    A directory of Africa's fintech ecosystem
                  </p>
                </div>
                <img
                  src="/assets/aistudio/afrimoney-mark-reversed_35aab509.png"
                  alt=""
                  className="h-20 w-auto opacity-25 md:h-32"
                />
              </div>
            </SocialPreview>

            <SocialPreview title="Open Graph Image" width={1200} height={630}>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0E0E0E]">
                <img
                  src="/assets/aistudio/afrimoney-mark-reversed_35aab509.png"
                  alt=""
                  className="h-16 w-auto md:h-24"
                />
                <img
                  src="/assets/aistudio/afrimoney-wordmark-white_f0231d4b.png"
                  alt="Afrimoney"
                  className="h-8 w-auto md:h-11"
                />
                <div className="h-1 w-14 rounded-full bg-[#FF4C00]" />
                <p className="font-body text-sm text-[#EAEAEA]/80 md:text-base">
                  A directory of Africa's fintech ecosystem
                </p>
              </div>
            </SocialPreview>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <SocialPreview title="Instagram Post — Charcoal" width={1080} height={1080}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#0E0E0E] p-8">
                  <img
                    src="/assets/aistudio/afrimoney-stacked-reversed_256aa491.png"
                    alt="Afrimoney"
                    className="h-28 w-auto object-contain md:h-36"
                  />
                  <div className="h-1 w-12 rounded-full bg-[#FF4C00]" />
                  <p className="text-center font-display text-xs text-[#EAEAEA]/75">
                    A directory of Africa's fintech ecosystem
                  </p>
                </div>
              </SocialPreview>

              <SocialPreview title="Instagram Post — Off-White" width={1080} height={1080}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#F7F7F7] p-8">
                  <img
                    src="/assets/aistudio/afrimoney-stacked-primary_405c0857.png"
                    alt="Afrimoney"
                    className="h-28 w-auto object-contain md:h-36"
                  />
                  <div className="h-1 w-12 rounded-full bg-[#FF4C00]" />
                  <p className="text-center font-display text-xs text-[#0E0E0E]/70">
                    A directory of Africa's fintech ecosystem
                  </p>
                </div>
              </SocialPreview>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
