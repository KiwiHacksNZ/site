# Event seed data

The past KiwiHacks events that were hardcoded on `/events` before it moved to
Sanity. Import them once (needs `npx sanity login` or `SANITY_IMPORT_TOKEN`):

```bash
cd sanity/seed
sed "s#__DIR__#$PWD#g" events.ndjson | npx sanity dataset import - -p "$PUBLIC_SANITY_PROJECT_ID" -d production --replace
```

The IDs are fixed, so running it again replaces those four events instead of
duplicating them. Check the dates in Studio afterwards: the Nova start date
and the Daydream and Scrapyard times are estimates.

Once imported, this folder can be deleted.
