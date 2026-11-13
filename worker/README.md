# Davar tutor relay

A small Cloudflare Worker that sits between the app and Google's Gemini API. The app sends the
conversation to `https://tutor.davarhebrew.app/chat`; the Worker adds the secret API key, asks Gemini,
and returns the reply. The key never appears in the app.

## One-time setup

1. **Gemini key**: in Google AI Studio (aistudio.google.com), choose Get API key → Create API key, and copy it.
2. **Deploy**: in the Cloudflare dashboard, Workers & Pages → Create → Import a repository → pick
   `jonesmatthew-rep/davar`, set the root directory to `worker`, and deploy. Every push to GitHub then
   redeploys it automatically.
3. **Add the key**: open the `davar` Worker → Settings → Variables and Secrets → Add →
   type **Secret**, name `GEMINI_API_KEY`, paste the key → Deploy.
4. **Check**: https://tutor.davarhebrew.app/health should show `"keySet": true`.

## Settings

- `GEMINI_MODEL` (in `wrangler.toml`): empty uses Google's current Flash model, falling back to
  `gemini-2.5-flash`. Set a model id to pin one.
- Limits: 8 questions per minute per visitor, 12 recent messages and about 9,000 characters of
  conversation per request, replies up to about 900 tokens. Gemini's free tier adds its own daily limit.
- Only requests from davarhebrew.app (and localhost for testing) are answered.

Free-tier note: Google may use free-tier prompts to improve its products. The app tells learners not to
share personal details.
