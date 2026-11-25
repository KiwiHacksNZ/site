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
SANITY_WRITE_TOKEN=secret-token
SUBMISSION_NOTIFY_URL=https://hooks.example.com/services/...
```

`PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` must be `PUBLIC_`-prefixed.
Astro only exposes that prefix to the browser, which the Studio bundle needs.

`SANITY_WRITE_TOKEN` is server-only and needs Editor permission on the dataset.
The event form returns 503 without it. Submissions are saved with a
`submission.` ID, which Sanity only serves to signed-in requests, so the
submitter's details stay out of the public API. Uploaded photos are not hidden
that way. Approving a submission in Studio turns it into a community event and
deletes the submission.

`SUBMISSION_NOTIFY_URL` is optional. Each submission POSTs a Slack- or
Discord-style message there, including the submitter's email, so the team can
reply. Without it, new submissions only show up in Studio.

Set the same vars in Vercel. Add the site origin and `http://localhost:4321`
under Sanity → API → CORS origins with credentials allowed.
