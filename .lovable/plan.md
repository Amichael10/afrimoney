

# Logo Prep Tool — `/tools/logo-prep`

A standalone helper page where you select a provider, upload a logo, and get ready-to-paste code + a properly renamed file.

## What it does

1. **Provider picker** — dropdown/search of all providers from `providers.ts`
2. **Image upload** — drag-and-drop or file picker, shows preview
3. **Auto-generates**:
   - Correct filename (e.g., `mtn-momo.png` derived from provider slug)
   - The `import` statement for `providerLogoOverrides.ts`
   - The regex `logoMap` entry
   - A download button for the renamed file
4. **Copy buttons** on each code snippet for quick paste

## User workflow

1. Go to `/tools/logo-prep`
2. Pick provider → drop new logo
3. Click "Download renamed file" → save to `src/assets/provider-logos/repo/`
4. Copy the two code snippets → paste into `providerLogoOverrides.ts`
5. Done in ~30 seconds

## Technical plan

### Files to create/modify

| File | Action |
|------|--------|
| `src/pages/LogoPrep.tsx` | New page — provider search, file upload, code generator, file download |
| `src/App.tsx` | Add route `/tools/logo-prep` |

### Implementation details

- Import `countries` from `providers.ts` to build a flat provider list with names + slugs
- Use `URL.createObjectURL` for image preview
- Generate filename from slug + uploaded file extension
- Use canvas to optionally resize to standard dimensions (e.g., 256x256)
- Provide a download link via `<a download>` with the renamed blob
- Generate import line: `import {varName} from "@/assets/provider-logos/repo/{filename}";`
- Generate map entry: `[/{regex}/i, {varName}],`
- Style with existing neobrutalist theme

