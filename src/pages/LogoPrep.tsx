import { useState, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { countries } from "@/data/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Upload,
  Download,
  Copy,
  ImageIcon,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface FlatProvider {
  name: string;
  slug: string;
  country: string;
  countryCode: string;
}

function slugToVarName(slug: string): string {
  return (
    slug
      .split("-")
      .map((part, i) =>
        i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
      )
      .join("") + "Png"
  );
}

function nameToRegex(name: string): string {
  return name
    .toLowerCase()
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\s+/g, "\\s*");
}

const LogoPrep = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<FlatProvider | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allProviders = useMemo<FlatProvider[]>(() => {
    return countries.flatMap((c) =>
      c.providers.map((p) => ({
        name: p.name,
        slug: p.slug,
        country: c.name,
        countryCode: c.code,
      }))
    );
  }, []);

  const processImage = useCallback((f: File) => {
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 256;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, size, size);

      const scale = Math.min(size / img.width, size / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);

      canvas.toBlob((blob) => {
        if (blob) setResizedBlob(blob);
      }, "image/png");
    };
    img.src = url;
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f && f.type.startsWith("image/")) processImage(f);
    },
    [processImage]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) processImage(f);
    },
    [processImage]
  );

  const ext = file?.name.split(".").pop()?.toLowerCase() || "png";
  const filename = selected ? `${selected.slug}.${ext}` : "";
  const varName = selected ? slugToVarName(selected.slug) : "";
  const importLine = selected
    ? `import ${varName} from "@/assets/provider-logos/repo/${filename}";`
    : "";
  const mapEntry = selected
    ? `[/${nameToRegex(selected.name)}/i, ${varName}],`
    : "";

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  const downloadFile = () => {
    if (!resizedBlob || !filename) return;
    const url = URL.createObjectURL(resizedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14 space-y-6">
        <div className="border-b border-border pb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Directory
          </Link>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground">
            Logo Prep Utility
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Select a provider, normalize any logo to a centered 256×256 PNG, and copy the repository import snippet.
          </p>
        </div>

        {/* Step 1: Provider Picker */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-3 font-display text-sm font-bold text-foreground">
            01. Select Provider
          </h2>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between border-border bg-background font-normal"
              >
                {selected ? (
                  <span className="flex items-center gap-2 font-medium">
                    <span className={`fi fi-${selected.countryCode.toLowerCase()} rounded-[2px]`} />
                    {selected.name}
                    <span className="text-muted-foreground">· {selected.country}</span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">Search providers...</span>
                )}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search provider..." />
                <CommandList>
                  <CommandEmpty>No provider found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-y-auto">
                    {allProviders.map((p, idx) => (
                      <CommandItem
                        key={`${p.countryCode}-${p.slug}-${idx}`}
                        value={`${p.name} ${p.country}`}
                        onSelect={() => {
                          setSelected(p);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 text-primary",
                            selected?.slug === p.slug &&
                              selected?.countryCode === p.countryCode
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <span className={`fi fi-${p.countryCode.toLowerCase()} mr-2`} />
                        <span>{p.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {p.country}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </section>

        {/* Step 2: Upload */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-3 font-display text-sm font-bold text-foreground">
            02. Upload & Center Image (256×256)
          </h2>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/40"
          >
            {preview ? (
              <div className="flex flex-col items-center gap-3">
                <div className="fc-checkerboard flex h-24 w-24 items-center justify-center rounded-xl border border-border p-2">
                  <img
                    src={preview}
                    alt="Uploaded logo preview"
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="font-mono text-xs text-foreground">{file?.name}</p>
                <p className="text-xs text-muted-foreground">
                  Click or drop another image to replace
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card">
                  <Upload className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Drop logo here or click to browse
                </p>
                <p className="font-mono text-xs">PNG, JPG, SVG, WebP</p>
              </div>
            )}
          </div>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </section>

        {/* Step 3: Generated Output */}
        {selected && file && (
          <section className="animate-fc-enter rounded-xl border border-border bg-card p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-primary" />
                <h2 className="font-display text-sm font-bold text-foreground">
                  03. Generated Asset & Code
                </h2>
              </div>
              <button
                onClick={downloadFile}
                className="fc-btn-primary inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Download className="h-3.5 w-3.5" />
                Download {filename}
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-[#111114] text-zinc-200">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                  <Terminal className="h-3.5 w-3.5 text-primary" />
                  src/data/providerLogoOverrides.ts
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${importLine}\n\n// Add to logoMap:\n${mapEntry}`,
                      "Full snippet"
                    )
                  }
                  className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300 hover:bg-white/10 hover:text-white"
                >
                  <Copy className="h-3 w-3" />
                  Copy All
                </button>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-300">
                <code>{`${importLine}\n\n// Add to logoMap:\n${mapEntry}`}</code>
              </pre>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LogoPrep;
