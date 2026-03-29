import { useState, useRef, useMemo, useCallback } from "react";
import { countries } from "@/data/providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown, Upload, Download, Copy, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FlatProvider {
  name: string;
  slug: string;
  country: string;
  countryCode: string;
}

function slugToVarName(slug: string): string {
  return slug
    .split("-")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("") + "Png";
}

function nameToRegex(name: string): string {
  return name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s*");
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

    // Resize to 256x256 via canvas
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
    toast.success(`${label} copied!`);
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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Logo Prep Tool</h1>
          <p className="text-muted-foreground mt-1">
            Select a provider, upload a logo, get ready-to-paste code.
          </p>
        </div>

        {/* Step 1: Provider Picker */}
        <Card className="border-2 border-border shadow-brutal">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">1. Select Provider</CardTitle>
          </CardHeader>
          <CardContent>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between border-2"
                >
                  {selected
                    ? `${selected.name} (${selected.country})`
                    : "Search providers..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search provider..." />
                  <CommandList>
                    <CommandEmpty>No provider found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-y-auto">
                      {allProviders.map((p) => (
                        <CommandItem
                          key={`${p.countryCode}-${p.slug}`}
                          value={`${p.name} ${p.country}`}
                          onSelect={() => {
                            setSelected(p);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selected?.slug === p.slug && selected?.countryCode === p.countryCode
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <span className={`fi fi-${p.countryCode.toLowerCase()} mr-2`} />
                          {p.name}
                          <span className="ml-auto text-xs text-muted-foreground">{p.country}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        {/* Step 2: Upload */}
        <Card className="border-2 border-border shadow-brutal">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">2. Upload Logo</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            >
              {preview ? (
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-contain rounded-lg border border-border"
                  />
                  <p className="text-sm text-muted-foreground">{file?.name}</p>
                  <p className="text-xs text-muted-foreground">Click or drop to replace</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload className="h-8 w-8" />
                  <p className="text-sm font-medium">Drop image here or click to browse</p>
                  <p className="text-xs">PNG, JPG, SVG, WebP</p>
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
          </CardContent>
        </Card>

        {/* Step 3: Generated Output */}
        {selected && file && (
          <Card className="border-2 border-border shadow-brutal">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                3. Generated Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Download */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">
                  Renamed file: <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{filename}</code>
                </p>
                <Button onClick={downloadFile} variant="outline" className="border-2 gap-2">
                  <Download className="h-4 w-4" />
                  Download to src/assets/provider-logos/repo/
                </Button>
              </div>

              {/* Import line */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">Import statement</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(importLine, "Import")}
                    className="h-7 gap-1 text-xs"
                  >
                    <Copy className="h-3 w-3" /> Copy
                  </Button>
                </div>
                <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto border border-border">
                  {importLine}
                </pre>
              </div>

              {/* Map entry */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">logoMap entry</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(mapEntry, "Map entry")}
                    className="h-7 gap-1 text-xs"
                  >
                    <Copy className="h-3 w-3" /> Copy
                  </Button>
                </div>
                <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto border border-border">
                  {mapEntry}
                </pre>
              </div>

              {/* Full snippet */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">Full snippet</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      copyToClipboard(`${importLine}\n\n// Add to logoMap:\n${mapEntry}`, "Full snippet")
                    }
                    className="h-7 gap-1 text-xs"
                  >
                    <Copy className="h-3 w-3" /> Copy All
                  </Button>
                </div>
                <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto border border-border whitespace-pre-wrap">
                  {importLine}{"\n\n"}// Add to logoMap:{"\n"}{mapEntry}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LogoPrep;
