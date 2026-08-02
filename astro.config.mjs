import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import { loadEnv } from 'vite';

// astro.config runs before Astro loads .env, so read it explicitly.
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  '',
);

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2026-08-02',
      useCdn: true,
      studioBasePath: '/studio',
    }),
    react(),
  ],
  output: 'server',
  adapter: vercel(),
  redirects: {
    '/discord': 'https://discord.gg/SNdNUQ4Vp7',
    '/chat': 'https://discord.gg/SNdNUQ4Vp7',
    '/community': 'https://discord.gg/SNdNUQ4Vp7',
    '/dc': 'https://discord.gg/SNdNUQ4Vp7',
    '/github': 'https://github.com/N1k0s1/kiwihacks',
    '/code': 'https://github.com/N1k0s1/kiwihacks',
    '/repo': 'https://github.com/N1k0s1/kiwihacks',
    '/register': 'https://kiwihacks.fillout.com/nova',
    '/countmein': 'https://kiwihacks.fillout.com/nova',
    '/signup': 'https://kiwihacks.fillout.com/nova',
    '/parents-guide': 'https://docs.google.com/document/d/14HMPfRkPQrFVf1E87cvsUqguILbtwoifEJ5hYUwhgRM/edit',
    '/parentsguide': 'https://docs.google.com/document/d/14HMPfRkPQrFVf1E87cvsUqguILbtwoifEJ5hYUwhgRM/edit',
    '/parents': 'https://docs.google.com/document/d/14HMPfRkPQrFVf1E87cvsUqguILbtwoifEJ5hYUwhgRM/edit'
  }
});
