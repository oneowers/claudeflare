import { env } from '@/lib/env';
import type { Language } from '@/i18n/config';

// MyMemory free translation API. No key required; supports Uzbek.
// Works directly from the browser (CORS enabled).
// Free tier: ~5000 words/day anonymous, ~50000/day with an email (VITE_MYMEMORY_EMAIL).
// Hard limit: 500 chars per request, so long text is chunked.
const ENDPOINT = 'https://api.mymemory.translated.net/get';
const MAX_QUERY = 480;

export function isTranslationConfigured(): boolean {
  // MyMemory needs no API key, so translation is always available.
  return true;
}

interface TranslateTextParams {
  text: string;
  source: Language;
  target: Language;
  signal?: AbortSignal;
}

/**
 * Translate a single string. Long input is split into <=500-char chunks
 * (MyMemory's per-request limit) and re-joined. Throws on quota/errors so
 * the caller can mark a target language as failed.
 */
export async function translateText({
  text,
  source,
  target,
  signal,
}: TranslateTextParams): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return '';
  if (source === target) return text;

  const chunks = chunkText(trimmed, MAX_QUERY);
  const out: string[] = [];
  for (const chunk of chunks) {
    out.push(await translateChunk(chunk, source, target, signal));
  }
  return out.join('');
}

async function translateChunk(
  text: string,
  source: Language,
  target: Language,
  signal?: AbortSignal,
): Promise<string> {
  const params = new URLSearchParams({
    q: text,
    langpair: `${source}|${target}`,
  });
  if (env.VITE_MYMEMORY_EMAIL) params.set('de', env.VITE_MYMEMORY_EMAIL);

  const res = await fetch(`${ENDPOINT}?${params.toString()}`, { signal });
  if (!res.ok) throw new Error(`MyMemory ${res.status}`);

  const data = (await res.json()) as {
    responseStatus: number | string;
    responseData?: { translatedText?: string };
  };

  const status = Number(data.responseStatus);
  const translated = data.responseData?.translatedText ?? '';

  if (status !== 200) {
    throw new Error(`MyMemory: ${translated || status}`);
  }
  if (
    /MYMEMORY WARNING|YOU USED ALL AVAILABLE|INVALID|NO TARGET LANGUAGE/i.test(
      translated,
    )
  ) {
    throw new Error(translated);
  }

  return decodeHtmlEntities(translated);
}

/** Split text into chunks no longer than `max`, preferring sentence/line breaks. */
function chunkText(text: string, max: number): string[] {
  if (text.length <= max) return [text];

  const chunks: string[] = [];
  const parts = text.split(/(\n+|(?<=[.!?。…])\s+)/);
  let current = '';

  for (const part of parts) {
    if (current && (current + part).length > max) {
      chunks.push(current);
      current = '';
    }
    current += part;
    while (current.length > max) {
      chunks.push(current.slice(0, max));
      current = current.slice(max);
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}
