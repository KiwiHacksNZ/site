import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
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
