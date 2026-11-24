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

Showcase projects and community events live in Sanity. Create `.env` with:

```bash
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
```

Both must be `PUBLIC_`-prefixed — Astro only exposes that prefix to the browser,
which the Studio bundle needs.

Set the same two vars in Vercel. Edit content at `/studio` (locally
`http://localhost:4321/studio`), and add both origins under
Sanity → API → CORS origins with credentials allowed.

Community events on `/events` come from the **Event** type in
Studio. Organisers request a listing through the Fillout form at
`/submit-event`; a developer checks the request and adds it in Studio.
