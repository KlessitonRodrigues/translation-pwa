---
description: "Use when adding or changing user-facing text, language routing, or locale dictionaries in applications or shared packages. Recommends the existing i18n hook and key patterns."
name: "Monorepo i18n Patterns"
applyTo: "applications/**/app/**/*.{ts,tsx}, applications/**/lib/hooks/**/*.{ts,tsx}, applications/**/public/i18n/*.json, packages/**/*.{ts,tsx}"
---
# i18n Patterns

- Keep translations in `applications/template-page/public/i18n/{lang}.json`.
- Keep translation keys flat strings with dot notation (for example, `home.heroTitleHtml`), matching the current dictionary format.
- For server-rendered pages and layouts, use `useServerTranslations(props)` and read text through `t("...")`.
- For client components, use `useClientTranslations()` and read text through `t("...")`.
- Keep locale fallback behavior aligned with current hooks: missing locale falls back to `en`.
- Keep missing key fallback behavior aligned with current hooks: missing key returns `NO_TEXT`.
- When adding locales, update both the dictionaries mapping and static params generation so routes remain prebuilt.
- Preserve key parity across locale files as a best practice: keys added in one locale should be added in all supported locales.

## Examples

Server component pattern:

```tsx
import { useServerTranslations } from '@/lib/hooks/useServerTranslation';

export default async function Page(props: any) {
  const { t } = await useServerTranslations(props);

  return <h1>{t('metadata.title')}</h1>;
}
```

Client component pattern:

```tsx
'use client';

import { useClientTranslations } from '@/lib/hooks/useClientTranslation';

export function CtaButton() {
  const { t } = useClientTranslations();

  return <button>{t('home.primaryCta')}</button>;
}
```
