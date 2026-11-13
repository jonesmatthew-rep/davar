// Davar tutor relay (Cloudflare Worker).
// The app sends the conversation here; this adds the secret Gemini key and returns the tutor's reply.
// Secrets/vars (set in the Cloudflare dashboard):  GEMINI_API_KEY (secret), GEMINI_MODEL (optional).

const ALLOWED_ORIGINS = [
  "https://davarhebrew.app",
  "https://www.davarhebrew.app",
  "https://jonesmatthew-rep.github.io",
  "http://localhost:8000",
  "http://localhost:8765"
];
const MAX_TURNS = 12;          // most recent messages sent to the model
const MAX_CHARS_PER_MSG = 1500;
const MAX_TOTAL_CHARS = 9000;

const SYSTEM_PROMPT = `You are the Davar Tutor, a warm, patient tutor inside Davar, a free app that teaches Biblical Hebrew to beginners, mostly adults in church Sunday school classes and Bible studies.

How to answer:
- Keep answers short and conversational: usually 2 to 5 short paragraphs or a short list, under about 170 words unless the learner asks for more. Your answers may be read aloud, so avoid tables, headings and long lists.
- Whenever you show Hebrew, give it with vowel points, then a transliteration and the meaning, for example: אִישׁ (ish, "man").
- Build on what the learner already knows. Prefer examples from the words they have learned (listed below). Explain grammar terms in plain English the first time you use them.
- End with a short question or a tiny practice task when it helps the learner keep going, but not every time.
- Davar's audio uses modern Israeli pronunciation. When it matters, you may mention how academic or traditional pronunciations differ.
- Be accurate. If you are not sure of a verse reference, a form, or a fact, say so rather than guessing. Never invent Bible verses or quotations.

Scope:
- Help with Biblical Hebrew and Biblical Aramaic: letters, vowels, pronunciation, words, grammar, and reading verses of the Hebrew Bible, plus the history and background that helps explain the language.
- Many learners are Christians reading Scripture. Be respectful of faith. On questions where denominations or traditions disagree, briefly describe the main views fairly and focus on what the Hebrew text itself says, without taking sides.
- If asked about something unrelated to these topics, kindly say you're here to help with Biblical Hebrew and offer a related way you can help.
- Keep everything family-friendly.`;

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    const reply = (status, body) => new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/health") return reply(200, { ok: true, keySet: !!env.GEMINI_API_KEY });
    if (request.method !== "POST" || url.pathname !== "/chat") return reply(404, { error: "Not found." });
    if (!ALLOWED_ORIGINS.includes(origin)) return reply(403, { error: "This tutor only answers from the Davar app." });
    if (!env.GEMINI_API_KEY) return reply(503, { error: "The tutor isn't set up yet (no API key)." });

    // Per-visitor rate limit (Cloudflare rate limiting binding; skipped if not configured).
    if (env.TUTOR_LIMITER) {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const { success } = await env.TUTOR_LIMITER.limit({ key: ip });
      if (!success) return reply(429, { error: "You're asking quickly! Wait a minute and try again." });
    }

    let body;
    try { body = await request.json(); } catch { return reply(400, { error: "Bad request." }); }
    // Keep the newest messages that fit; older ones quietly drop off so a long conversation keeps going.
    const msgs = Array.isArray(body.messages) ? body.messages.slice(-MAX_TURNS) : [];
    const contents = [];
    let total = 0;
    for (let i = msgs.length - 1; i >= 0; i--) {
      const m = msgs[i];
      const text = String(m && m.text || "").slice(0, MAX_CHARS_PER_MSG).trim();
      if (!text) continue;
      if (total + text.length > MAX_TOTAL_CHARS) break;
      total += text.length;
      contents.unshift({ role: m.role === "model" ? "model" : "user", parts: [{ text }] });
    }
    while (contents.length && contents[0].role !== "user") contents.shift(); // Gemini expects the user to speak first
    if (!contents.length || contents[contents.length - 1].role !== "user") return reply(400, { error: "Ask a question first." });

    // What the learner has done in the app, so answers fit their level.
    const ctx = body.context || {};
    const learned = Array.isArray(ctx.learnedWords) ? ctx.learnedWords.slice(0, 200).map(String).join(", ").slice(0, 3000) : "";
    const extra = [
      ctx.lessonsDone ? `The learner has finished ${Number(ctx.lessonsDone) || 0} of Davar's lessons.` : "The learner is just starting Davar.",
      learned ? `Words the learner has met so far: ${learned}.` : "",
      ctx.topic ? `They opened the tutor from: ${String(ctx.topic).slice(0, 200)}.` : ""
    ].filter(Boolean).join("\n");

    const payload = {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT + "\n\nAbout this learner:\n" + extra }] },
      contents,
      generationConfig: { temperature: 0.6, maxOutputTokens: 900 }
    };

    // Try models in order. A busy model (500/503) gets one quick retry, then the next, lighter model.
    // A retired model name (404) or a model with no free quota left (429) also moves on to the next one.
    const models = [env.GEMINI_MODEL, "gemini-flash-latest", "gemini-2.5-flash", "gemini-flash-lite-latest", "gemini-2.5-flash-lite"].filter(Boolean);
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    let lastStatus = 500, sawQuota = false;
    for (const model of [...new Set(models)]) {
      for (let attempt = 0; attempt < 2; attempt++) {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
          body: JSON.stringify(payload)
        });
        lastStatus = r.status;
        if (r.ok) {
          const data = await r.json();
          const cand = data.candidates && data.candidates[0];
          const text = cand && cand.content && Array.isArray(cand.content.parts) ? cand.content.parts.map(p => p.text || "").join("").trim() : "";
          if (!text) return reply(200, { reply: "I couldn't answer that one. Try asking it a different way." });
          return reply(200, { reply: text, model });
        }
        const detail = (await r.text().catch(() => "")).slice(0, 500);
        console.log(`gemini ${model} attempt ${attempt + 1}: ${r.status} ${detail}`); // visible in Cloudflare > Observability
        if (r.status === 400 || r.status === 401 || r.status === 403) {
          return reply(502, { error: r.status === 400 ? "The tutor couldn't read that question. Try rewording it." : "The tutor's API key isn't working. Let the app's owner know." });
        }
        if (r.status === 429) sawQuota = true;
        if ((r.status === 500 || r.status === 503) && attempt === 0) { await sleep(700); continue; }
        break; // 404, 429, or still busy: next model
      }
    }
    if (sawQuota) return reply(429, { error: "The tutor has reached its limit for now. Try again later." });
    return reply(503, { error: `The tutor is very busy right now (${lastStatus}). Wait a minute and try again.` });
  }
};
