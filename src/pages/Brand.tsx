import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Copy, Check } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

import afripayWordmark from "@/assets/brand/afripay-wordmark.svg";
import afripayWordmarkWhite from "@/assets/brand/afripay-wordmark-white.svg";
import afriIcon from "@/assets/brand/afri-icon.png";
import afriIconAlt from "@/assets/brand/afri-icon-alt.png";

const BRAND_COLORS = [
  { name: "Dark Green", hex: "#01433F", hsl: "177 97% 13%", usage: "Primary, text, borders" },
  { name: "Gold", hex: "#E6C15D", hsl: "44 75% 63%", usage: "Accent, highlights" },
  { name: "Cream", hex: "#F7F3EB", hsl: "45 40% 94%", usage: "Backgrounds" },
  { name: "Dark Green Deep", hex: "#01332F", hsl: "177 97% 10%", usage: "Shadows, emphasis" },
  { name: "White", hex: "#FDFCFA", hsl: "45 40% 98%", usage: "Cards, light surfaces" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function LogoCard({ title, children, bg }: { title: string; children: React.ReactNode; bg: string }) {
  return (
    <div className="border-2 border-foreground shadow-brutal overflow-hidden">
      <div className="px-4 py-2 border-b-2 border-foreground bg-card">
        <span className="font-heading font-bold text-sm">{title}</span>
      </div>
      <div className={`flex items-center justify-center p-8 min-h-[180px] ${bg}`}>
        {children}
      </div>
    </div>
  );
}

function SocialPreview({ title, width, height, children }: { title: string; width: number; height: number; children: React.ReactNode }) {
  const aspect = width / height;
  return (
    <div className="border-2 border-foreground shadow-brutal overflow-hidden">
      <div className="px-4 py-2 border-b-2 border-foreground bg-card flex items-center justify-between">
        <span className="font-heading font-bold text-sm">{title}</span>
        <span className="text-xs text-muted-foreground">{width}×{height}</span>
      </div>
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        {children}
      </div>
    </div>
  );
}

export default function Brand() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <header className="border-b-2 border-foreground bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="rounded-md border-2 border-foreground p-2 shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all bg-card"
            >
              <ArrowLeft className="h-[18px] w-[18px]" />
            </Link>
            <h1 className="font-heading text-2xl font-bold">Brand Assets</h1>
          </div>
          <div className="flex items-center gap-2">
            <GithubLink />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-16">
        {/* Logos Section */}
        <section>
          <h2 className="font-heading text-xl font-bold mb-6 border-b-2 border-foreground pb-2">Logos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LogoCard title="Wordmark — Dark" bg="bg-[#F7F3EB]">
              <img src={afripayWordmark} alt="AfriPay wordmark dark" className="h-16 w-auto" />
            </LogoCard>
            <LogoCard title="Wordmark — Light" bg="bg-[#01433F]">
              <img src={afripayWordmarkWhite} alt="AfriPay wordmark white" className="h-16 w-auto" />
            </LogoCard>
            <LogoCard title="Icon — Primary" bg="bg-[#F7F3EB]">
              <img src={afriIcon} alt="AfriPay icon" className="h-24 w-auto" />
            </LogoCard>
            <LogoCard title="Icon — Alt" bg="bg-[#F7F3EB]">
              <img src={afriIconAlt} alt="AfriPay icon alt" className="h-24 w-auto" />
            </LogoCard>
            <LogoCard title="Icon on Dark" bg="bg-[#01433F]">
              <img src={afriIcon} alt="AfriPay icon on dark" className="h-24 w-auto" />
            </LogoCard>
            <LogoCard title="Wordmark — Gold bg" bg="bg-[#E6C15D]">
              <img src={afripayWordmark} alt="AfriPay wordmark on gold" className="h-16 w-auto" />
            </LogoCard>
          </div>
        </section>

        {/* Color Palette */}
        <section>
          <h2 className="font-heading text-xl font-bold mb-6 border-b-2 border-foreground pb-2">Color Palette</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BRAND_COLORS.map((c) => (
              <div key={c.hex} className="border-2 border-foreground shadow-brutal-sm overflow-hidden">
                <div className="h-24" style={{ backgroundColor: c.hex }} />
                <div className="p-3 bg-card space-y-1">
                  <p className="font-heading font-bold text-sm">{c.name}</p>
                  <div className="flex items-center justify-between">
                    <code className="text-xs text-muted-foreground">{c.hex}</code>
                    <CopyButton text={c.hex} />
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-xs text-muted-foreground">{c.hsl}</code>
                    <CopyButton text={c.hsl} />
                  </div>
                  <p className="text-xs text-muted-foreground">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="font-heading text-xl font-bold mb-6 border-b-2 border-foreground pb-2">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-foreground shadow-brutal p-6 bg-card">
              <p className="text-xs text-muted-foreground mb-2">Headings</p>
              <p className="font-heading text-4xl font-bold">Space Grotesk</p>
              <p className="font-heading text-lg mt-2">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="font-heading text-lg">abcdefghijklmnopqrstuvwxyz</p>
              <p className="font-heading text-lg">0123456789</p>
            </div>
            <div className="border-2 border-foreground shadow-brutal p-6 bg-card">
              <p className="text-xs text-muted-foreground mb-2">Body</p>
              <p className="font-body text-4xl font-bold">DM Sans</p>
              <p className="font-body text-lg mt-2">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="font-body text-lg">abcdefghijklmnopqrstuvwxyz</p>
              <p className="font-body text-lg">0123456789</p>
            </div>
          </div>
        </section>

        {/* Social Media Assets */}
        <section>
          <h2 className="font-heading text-xl font-bold mb-6 border-b-2 border-foreground pb-2">Social Media</h2>
          <div className="grid grid-cols-1 gap-8">

            {/* Twitter/X Banner — 1500×500 */}
            <SocialPreview title="Twitter / X Banner" width={1500} height={500}>
              <div className="absolute inset-0 bg-[#01433F] flex items-center justify-between px-[8%]">
                <div className="flex flex-col gap-3">
                  <img src={afripayWordmarkWhite} alt="AfriPay" className="h-12 md:h-16 w-auto" />
                  <p className="text-[#E6C15D] font-heading text-sm md:text-base font-medium tracking-wide">
                    Africa's Mobile Money Directory
                  </p>
                </div>
                <img src={afriIcon} alt="" className="h-20 md:h-32 w-auto opacity-30" />
              </div>
            </SocialPreview>

            {/* OG Image — 1200×630 */}
            <SocialPreview title="Open Graph Image" width={1200} height={630}>
              <div className="absolute inset-0 bg-[#01433F] flex flex-col items-center justify-center gap-4">
                <img src={afriIcon} alt="" className="h-16 md:h-24 w-auto" />
                <img src={afripayWordmarkWhite} alt="AfriPay" className="h-10 md:h-14 w-auto" />
                <div className="h-1 w-16 bg-[#E6C15D] rounded-full" />
                <p className="text-white/80 font-body text-sm md:text-base">
                  Explore mobile money providers across Africa
                </p>
              </div>
            </SocialPreview>

            {/* Square — 1080×1080 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SocialPreview title="Instagram Post — Dark" width={1080} height={1080}>
                <div className="absolute inset-0 bg-[#01433F] flex flex-col items-center justify-center gap-6 p-8">
                  <img src={afriIcon} alt="" className="h-24 md:h-32 w-auto" />
                  <img src={afripayWordmarkWhite} alt="AfriPay" className="h-10 md:h-12 w-auto" />
                  <div className="h-1 w-12 bg-[#E6C15D] rounded-full" />
                  <p className="text-white/70 font-heading text-xs text-center">
                    Africa's Mobile Money Directory
                  </p>
                </div>
              </SocialPreview>

              <SocialPreview title="Instagram Post — Gold" width={1080} height={1080}>
                <div className="absolute inset-0 bg-[#E6C15D] flex flex-col items-center justify-center gap-6 p-8">
                  <img src={afriIconAlt} alt="" className="h-24 md:h-32 w-auto" />
                  <img src={afripayWordmark} alt="AfriPay" className="h-10 md:h-12 w-auto" />
                  <div className="h-1 w-12 bg-[#01433F] rounded-full" />
                  <p className="text-[#01433F]/70 font-heading text-xs text-center">
                    Africa's Mobile Money Directory
                  </p>
                </div>
              </SocialPreview>
            </div>

            {/* LinkedIn Banner — 1584×396 */}
            <SocialPreview title="LinkedIn Banner" width={1584} height={396}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#01433F] to-[#01332F] flex items-center justify-between px-[6%]">
                <div className="flex items-center gap-4 md:gap-8">
                  <img src={afriIcon} alt="" className="h-14 md:h-20 w-auto opacity-80" />
                  <div>
                    <img src={afripayWordmarkWhite} alt="AfriPay" className="h-8 md:h-12 w-auto" />
                    <p className="text-[#E6C15D] font-body text-xs md:text-sm mt-1">
                      Mapping Africa's fintech ecosystem
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-3 w-3 rounded-full bg-[#E6C15D]" style={{ opacity: 1 - i * 0.3 }} />
                  ))}
                </div>
              </div>
            </SocialPreview>
          </div>
        </section>
      </main>
    </div>
  );
}
