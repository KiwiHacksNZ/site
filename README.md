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
PUBLIC_SANITY_SUBMISSIONS_DATASET=submissions
SANITY_WRITE_TOKEN=secret-token
SUBMISSION_NOTIFY_URL=https://hooks.example.com/services/...
```

`PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` must be `PUBLIC_`-prefixed.
Astro only exposes that prefix to the browser, which the Studio bundle needs.

`SANITY_WRITE_TOKEN` is server-only. It needs permission to create documents in
the private `submissions` dataset. The event form returns 503 without it.
Approving a submission at `/studio/submissions` copies the public fields into
the production dataset. The token should not be able to write to production.

`SUBMISSION_NOTIFY_URL` is optional. Each submission POSTs a Slack- or
Discord-style message there, including the submitter's email, so the team can
reply. Without it, new submissions only show up in Studio.

Set the same vars in Vercel. Add the site origin and `http://localhost:4321`
under Sanity → API → CORS origins with credentials allowed.
