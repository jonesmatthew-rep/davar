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

## Reliability (recommended)

- **Paid Gemini tier**: in Google AI Studio, turn on billing for the project that owns the key
  (Upgrade / Set up billing). Paid requests get priority and higher limits, and Google doesn't use them
  for training. Add a budget alert in Google Cloud Billing → Budgets & alerts.
- **Claude backup**: when Gemini can't answer, the Worker asks Claude instead. In console.anthropic.com,
  add credit, set a monthly spend limit, and create an API key. Add it to the Worker as a **Secret** named
  `ANTHROPIC_API_KEY` (Settings → Variables and Secrets, not the Build section).

## Settings

- `GEMINI_MODEL` (in `wrangler.toml`): empty tries `gemini-2.5-flash`, then the latest Flash, then the
  Flash-Lite models. Set a model id to pin one.
- `ANTHROPIC_MODEL` (optional): the backup Claude model; defaults to `claude-haiku-5-5`.
- Limits: 8 questions per minute per visitor, 12 recent messages and about 9,000 characters of
  conversation per request, replies up to about 900 tokens. Gemini's free tier adds its own daily limit.
- Only requests from davarhebrew.app (and localhost for testing) are answered.

Free-tier note: Google may use free-tier prompts to improve its products. The app tells learners not to
share personal details.
