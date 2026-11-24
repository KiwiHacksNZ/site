# KiwiHacks Site

Built with [Astro](https://astro.build) and [Bun](https://bun.sh).

## Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

## Content (Sanity)

Showcase projects live in Sanity. Create `.env` with:

```bash
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
```

Both must be `PUBLIC_`-prefixed — Astro only exposes that prefix to the browser,
which the Studio bundle needs.

Set the same two vars in Vercel. Edit content at `/studio` (locally
`http://localhost:4321/studio`), and add both origins under
Sanity → API → CORS origins with credentials allowed.

### Stories

Stories at `/showcase/stories` also live in Sanity, as the "Story" document type.
Anyone with Studio access can write and publish one, and it appears on the site
without a deploy. Studio won't publish a story until "Sign-off recorded" is
ticked, which means the student's sign-off (and their guardian's, where needed)
has been recorded outside Sanity. A story with a future published date stays off
the site until that date. Terms are defined in `GLOSSARY.md`.

## Tests

```bash
bun run test
```

The tests render the stories pages through Astro's container API, with Sanity
replaced by an in-memory fake that runs the real GROQ queries using `groq-js`.
No Sanity project or `.env` is needed to run them.
