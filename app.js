(function () {
  "use strict";
  const LESSONS = window.DAVAR_LESSONS, LETTERS = window.DAVAR_LETTERS, READINGS = window.DAVAR_READINGS;
  const UNITS = window.DAVAR_UNITS || [{ id: 1, title: "Lessons" }];
  const ITEMS = {}; LESSONS.forEach(l => l.items.forEach(it => { it.lesson = l.id; ITEMS[it.id] = it; }));
  const DAY = 86400000, INTERVALS = [0, 1, 2, 4, 8, 16, 32]; // days per review box

  /* ---------- storage ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("davar-" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("davar-" + k, JSON.stringify(v)); } catch (e) {} }
  };
  let progress = store.get("progress", { done: [] });     // completed lesson ids
  let cards = store.get("cards", {});                      // item id -> {box, due}
  const save = () => { store.set("progress", progress); store.set("cards", cards); };

  /* ---------- audio ---------- */
  let player = null;
  function play(name, slow) {
    if (!name) return;
    try {
      if (player) player.pause();
      player = new Audio("audio/" + name + ".mp3");
      player.playbackRate = slow ? 0.7 : 1;
      if ("preservesPitch" in player) player.preservesPitch = true;
      const p = player.play(); if (p && p.catch) p.catch(() => {});
    } catch (e) {}
  }

  /* ---------- speaking coach ---------- */
  // Uses the browser's built-in speech recognition (Chrome: Google, Safari: Apple), set to Hebrew.
  // It checks whether the recognizer understood the target word(s); spelling differences between
  // biblical and modern Hebrew (extra ו/י, final letters, vowel points) are ignored.
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  let activeRec = null;
  const NIQQUD = /[֑-ׇ]/g, FINALS = { "ך": "כ", "ם": "מ", "ן": "נ", "ף": "פ", "ץ": "צ" };
  const hebWords = s => String(s).replace(NIQQUD, "").replace(/[^א-ת\s]/g, " ").trim().split(/\s+/).filter(Boolean);
  const skel = w => { w = w.replace(/[ךםןףץ]/g, c => FINALS[c]); return w[0] + w.slice(1).replace(/[וי]/g, ""); };
  function checkSpeech(alts, target) {
    const T = hebWords(target).map(skel);
    let best = null;
    alts.forEach(a => {
      const H = hebWords(a).map(skel);
      const hits = T.map(t => H.includes(t));
      const n = hits.filter(Boolean).length;
      if (!best || n > best.n) best = { n, hits, heard: a.trim() };
    });
    return best ? { ok: best.n === T.length, heard: best.heard, hits: best.hits } : { ok: false, heard: "", hits: T.map(() => false) };
  }
  const SPEECH_ERRORS = {
    "not-allowed": "The microphone is blocked. Allow it for this site in your browser settings.",
    "service-not-allowed": "The microphone is blocked. Allow it for this site in your browser settings.",
    "no-speech": "I didn't hear anything. Tap and speak a little louder.",
    "audio-capture": "No microphone was found.",
    "network": "Checking your speech needs an internet connection.",
    "language-not-supported": "This browser can't recognize Hebrew."
  };
  function sayBox(it, el, onResult) {
    if (!el) return;
    if (!SR) { el.hidden = true; return; }
    el.innerHTML = `<button class="mic">🎙 Say it</button><div class="heard" aria-live="polite"></div>`;
    const btn = el.querySelector(".mic"), out = el.querySelector(".heard");
    const idle = () => { btn.classList.remove("on"); btn.textContent = "🎙 Say it"; };
    btn.onclick = () => {
      if (activeRec) { try { activeRec.stop(); } catch (e) {} return; }
      if (player) player.pause();
      let rec, settled = false;
      try { rec = new SR(); } catch (e) { out.className = "heard bad"; out.textContent = "Speech checking isn't available in this browser."; return; }
      rec.lang = "he-IL"; rec.interimResults = false; rec.maxAlternatives = 5; rec.continuous = false;
      rec.onresult = e => {
        settled = true;
        const res = checkSpeech(Array.from(e.results[0]).map(a => a.transcript), it.h);
        const words = it.h.split(/\s+/);
        if (res.ok) {
          out.className = "heard good";
          out.innerHTML = `✓ Yes! I heard <span class="heb-inline">${esc(res.heard)}</span>`;
        } else {
          out.className = "heard bad";
          const marked = words.length > 1 ? `<div class="heb-line" dir="rtl">${words.map((w, i) => `<span class="${res.hits[i] ? "w-ok" : "w-miss"}">${w}</span>`).join(" ")}</div>` : "";
          out.innerHTML = `${marked}Not quite. I heard <span class="heb-inline">${esc(res.heard) || "nothing clear"}</span>. Listen and try again.`;
        }
        if (onResult) onResult(res.ok);
      };
      rec.onerror = e => { settled = true; out.className = "heard bad"; out.textContent = SPEECH_ERRORS[e.error] || "Something went wrong. Tap and try again."; };
      rec.onend = () => { activeRec = null; idle(); if (!settled) { out.className = "heard"; out.textContent = "I didn't catch that. Tap and try again."; } };
      try { rec.start(); } catch (e) { out.className = "heard bad"; out.textContent = "Couldn't start the microphone. Try again."; return; }
      activeRec = rec;
      btn.classList.add("on"); btn.textContent = "● Listening… tap to stop";
      out.className = "heard"; out.textContent = "Say it now.";
    };
  }

  /* ---------- helpers ---------- */
  const $ = s => document.querySelector(s);
  const view = () => $("#view");
  const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const seg = window.Intl && Intl.Segmenter ? new Intl.Segmenter() : null;
  const glyphs = str => seg ? [...seg.segment(str)].length : Math.ceil([...str].length / 2);
  const picHTML = it => `<div class="pic ${it.size || ""} ${glyphs(it.pic) >= 3 ? "multi" : ""}" aria-hidden="true">${it.pic}</div>`;
  const isDone = id => progress.done.includes(id);
  const unlocked = id => id === 1 || isDone(id - 1) || isDone(id);
  const quizzable = it => it.quiz !== false;
  const learnedCount = () => Object.values(cards).filter(c => c.box >= 2).length;
  const dueList = () => Object.entries(cards).filter(([id, c]) => ITEMS[id] && c.due <= Date.now()).map(([id]) => ITEMS[id]);
  function grade(it, ok) {
    const c = cards[it.id] || { box: 0, due: 0 };
    c.box = ok ? Math.min(c.box + 1, INTERVALS.length - 1) : 1;
    c.due = Date.now() + INTERVALS[c.box] * DAY - (ok ? 0 : DAY); // wrong answers come back right away
    cards[it.id] = c; save();
  }
  function updateStat() { $("#stat").innerHTML = `Words known: <b>${learnedCount()}</b>`; }

  /* ---------- quiz engine (shared by lessons and review) ---------- */
  // Question types: "listen" = hear it, tap the picture; "read" = read the Hebrew, tap the picture;
  // "pick" = see the picture, tap the Hebrew.
  // two pictures can share an emoji only when both are size-contrasted (big vs small star)
  const distinctPic = (a, b) => a.pic !== b.pic || (a.size && b.size && a.size !== b.size);
  function distractors(it, pool) {
    const same = pool.filter(x => x !== it && quizzable(x) && (x.kind === "sentence") === (it.kind === "sentence") && distinctPic(x, it));
    let extra = [];
    if (same.length < 3) extra = Object.values(ITEMS).filter(x => x !== it && quizzable(x) && !same.includes(x) && (x.kind === "sentence") === (it.kind === "sentence") && distinctPic(x, it) && unlocked(x.lesson));
    return shuffle(same).concat(shuffle(extra)).slice(0, 3);
  }
  function runQuiz({ questions, pool, title, onDone }) {
    let i = 0, right = 0;
    function next() {
      if (i >= questions.length) return onDone(right, questions.length);
      const q = questions[i], it = q.item;
      const opts = shuffle([it, ...distractors(it, pool)]);
      const showText = q.type !== "listen";
      const prompt = q.type === "pick" ? picHTML(it) : `<div class="word">${showText ? it.h : "🔊"}</div>`;
      const optHTML = q.type === "pick"
        ? opts.map(o => `<button class="opt heb" data-id="${o.id}">${o.h}</button>`).join("")
        : opts.map(o => `<button class="opt" data-id="${o.id}" aria-label="${esc(o.en)}">${picHTML(o)}</button>`).join("");
      const label = { listen: "Listen and tap the picture", read: "Read it and tap the picture", pick: "Tap the matching Hebrew" }[q.type];
      view().innerHTML = `<h2>${title}</h2><p class="sub">${label}</p>
        <div class="card"><div class="progress"><b style="width:${(i / questions.length) * 100}%"></b></div>
        ${prompt}
        <div class="row"><button id="hear">▶ Hear it</button><button id="slow">🐢 Slower</button></div>
        <div class="grid">${optHTML}</div>
        <div class="feedback" id="fb" aria-live="polite"></div></div>`;
      $("#hear").onclick = () => play(it.audio);
      $("#slow").onclick = () => play(it.audio, true);
      if (q.type === "listen") play(it.audio);
      view().querySelectorAll(".opt").forEach(b => b.onclick = () => {
        if (view().querySelector(".opt.right")) return;
        const ok = b.dataset.id === it.id;
        if (ok) right++;
        grade(it, ok);
        b.classList.add(ok ? "right" : "wrong");
        view().querySelector(`.opt[data-id="${it.id}"]`).classList.add("right");
        const fb = $("#fb");
        fb.className = "feedback " + (ok ? "good" : "bad");
        fb.innerHTML = ok ? "טוֹב! Correct." : `That was <span class="heb-inline">${it.h}</span> (${esc(it.t)}).`;
        if (q.type !== "listen") play(it.audio);
        i++; setTimeout(next, ok ? 1000 : 2200); updateStat();
      });
    }
    next();
  }
  function buildQuestions(items) {
    const qs = [];
    items.filter(quizzable).forEach(it => {
      qs.push({ type: "listen", item: it });
      qs.push({ type: it.kind === "sentence" ? "read" : (Math.random() < .5 ? "read" : "pick"), item: it });
    });
    // keep the two questions about one item apart
    const s = shuffle(qs);
    for (let k = 1; k < s.length; k++) if (s[k].item === s[k - 1].item) { const j = (k + 2) % s.length; [s[k], s[j]] = [s[j], s[k]]; }
    return s;
  }

  /* ---------- screens ---------- */
  function home() {
    const due = dueList();
    const nextLesson = LESSONS.find(l => !isDone(l.id));
    view().innerHTML = `<div class="home">
      ${due.length ? `<div class="review-banner"><p><b>${due.length}</b> ${due.length === 1 ? "word is" : "words are"} ready for review.</p><a href="#review"><button class="primary">Review</button></a></div>` : ""}
      ${nextLesson ? `<div class="card"><p class="section-label">Up next</p><div class="word">${nextLesson.heb}</div><h2>Lesson ${nextLesson.id} · ${esc(nextLesson.title)}</h2><a href="#lesson-${nextLesson.id}"><button class="primary">Start lesson</button></a></div>`
        : `<div class="card"><h2>All lessons done</h2><p class="sub">More lessons are on the way. Keep your words fresh with review.</p></div>`}
      ${UNITS.map(u => {
        const ls = LESSONS.filter(l => (l.unit || 1) === u.id);
        if (!ls.length) return "";
        return `<p class="section-label">Unit ${u.id} · ${esc(u.title)}</p>
      <ul class="lessons">${ls.map(l => {
        const open = unlocked(l.id), done = isDone(l.id);
        return `<li><button class="lesson ${done ? "done" : ""}" data-id="${l.id}" ${open ? "" : "disabled"}>
          <span class="num">${done ? "✓" : l.id}</span>
          <span class="meta"><b>${esc(l.title)}</b><span>${l.heb}</span></span>
          <span class="state">${done ? "Done" : open ? "Start" : "Locked"}</span></button></li>`;
      }).join("")}</ul>`;
      }).join("")}</div>`;
    view().querySelectorAll(".lesson").forEach(b => b.onclick = () => { location.hash = "lesson-" + b.dataset.id; });
  }

  function lesson(id) {
    const L = LESSONS.find(l => l.id === id);
    if (!L || !unlocked(id)) return home();
    let i = 0;
    function step() {
      const it = L.items[i];
      view().innerHTML = `<h2>Lesson ${L.id} · ${esc(L.title)}</h2><p class="sub">Look, listen, and say it out loud.</p>
        <div class="card">
        ${i === 0 && L.tip ? `<div class="tip">${L.tip.replace(/([֐-׿]+)/g, '<span class="heb-inline">$1</span>')}</div>` : ""}
        ${picHTML(it)}<div class="word">${it.h}</div><div class="translit">${esc(it.t)}</div>
        <div class="row"><button id="hear">▶ Hear it</button><button id="slow">🐢 Slower</button><button id="mean" class="ghost">Show meaning</button></div>
        <div id="meaning" class="translit" hidden>${esc(it.en)}</div>
        <div class="say" id="sayBox"></div>
        <div class="dots">${L.items.map((_, k) => `<i class="${k <= i ? "on" : ""}"></i>`).join("")}</div>
        <div class="row"><button id="back" ${i === 0 ? "disabled" : ""}>Back</button><button id="next" class="primary">${i === L.items.length - 1 ? "Practice" : "Next"}</button></div></div>`;
      play(it.audio);
      $("#hear").onclick = () => play(it.audio);
      $("#slow").onclick = () => play(it.audio, true);
      $("#mean").onclick = () => { $("#meaning").hidden = !$("#meaning").hidden; };
      sayBox(it, $("#sayBox"));
      $("#back").onclick = () => { i--; step(); };
      $("#next").onclick = () => { if (i === L.items.length - 1) practice(); else { i++; step(); } };
    }
    function practice() {
      runQuiz({ questions: buildQuestions(L.items), pool: L.items, title: `Lesson ${L.id} · Practice`, onDone(right, total) {
        if (!isDone(L.id)) progress.done.push(L.id);
        L.items.filter(quizzable).forEach(it => { if (!cards[it.id]) cards[it.id] = { box: 1, due: Date.now() + DAY }; });
        save(); updateStat();
        const nextL = LESSONS.find(l => l.id === L.id + 1);
        view().innerHTML = `<div class="card"><p class="section-label">Lesson ${L.id} complete</p><p class="big-num">${right}/${total}</p>
          <p class="sub">These words will come back in review so they stick.</p>
          <div class="row"><a href="#home"><button>Home</button></a>${nextL ? `<a href="#lesson-${nextL.id}"><button class="primary">Next lesson</button></a>` : ""}</div></div>`;
      }});
    }
    step();
  }

  function review() {
    const due = shuffle(dueList()).slice(0, 15);
    if (!due.length) {
      view().innerHTML = `<h2>Review</h2><div class="card"><p class="big-num">✓</p><p class="sub">Nothing is due right now. Finish a lesson, or come back tomorrow.</p><a href="#home"><button class="primary">Home</button></a></div>`;
      return;
    }
    const qs = due.map(it => ({ type: it.kind === "sentence" ? (Math.random() < .5 ? "listen" : "read") : ["listen", "read", "pick"][Math.floor(Math.random() * 3)], item: it }));
    runQuiz({ questions: qs, pool: due, title: "Review", onDone(right, total) {
      view().innerHTML = `<div class="card"><p class="section-label">Review done</p><p class="big-num">${right}/${total}</p>
        <p class="sub">Missed words will come back sooner.</p><a href="#home"><button class="primary">Home</button></a></div>`;
    }});
  }

  /* ---------- speak tab ---------- */
  let spRight = 0, spCount = 0, spLast = null;
  function speak() {
    if (!SR) {
      view().innerHTML = `<h2>Speak</h2><div class="card"><p class="sub">This browser can't check speech. Speaking practice works in Chrome (Android, Windows, Mac) and in Safari on iPhone and Mac.</p></div>`;
      return;
    }
    const pool = LESSONS.filter(l => isDone(l.id)).flatMap(l => l.items);
    const items = pool.length ? pool : LESSONS[0].items;
    let it; do { it = items[Math.floor(Math.random() * items.length)]; } while (items.length > 1 && it === spLast);
    spLast = it;
    const tally = () => `Listen, then say it back. Said right: ${spRight} of ${spCount}`;
    view().innerHTML = `<h2>Speak</h2><p class="sub" id="tally">${tally()}</p>
      <div class="card">${picHTML(it)}<div class="word">${it.h}</div><div class="translit">${esc(it.t)}</div>
      <div class="row"><button id="hear">▶ Hear it</button><button id="slow">🐢 Slower</button></div>
      <div class="say" id="sayBox"></div>
      <div class="row"><button id="nxt" class="primary">Next word</button></div></div>
      <p class="note">${pool.length ? "Words come from the lessons you've finished." : "Finish a lesson to practice its words here. For now, here are Lesson 1's words."}
      When you tap Say it, your browser sends your voice to its speech service (Google in Chrome, Apple in Safari) to check it. Davar doesn't record or keep it.</p>`;
    $("#hear").onclick = () => play(it.audio);
    $("#slow").onclick = () => play(it.audio, true);
    $("#nxt").onclick = speak;
    sayBox(it, $("#sayBox"), ok => { spCount++; if (ok) spRight++; $("#tally").textContent = tally(); });
  }

  /* ---------- letters: name, trace, write ---------- */
  const segHTML = cur => `<div class="seg">${[["letters", "Name it"], ["letters-trace", "Trace"], ["letters-write", "Write"]]
    .map(([h, l]) => `<a href="#${h}" ${cur === h ? 'aria-current="page"' : ""}>${l}</a>`).join("")}</div>`;
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const GLYPH_FONT = '"Noto Sans Hebrew", "Arial Hebrew", "FreeSans", sans-serif';
  let fontReady = null;
  const loadFont = () => fontReady || (fontReady = Promise.race([
    document.fonts ? document.fonts.load('600 100px "Noto Sans Hebrew"', "אב").catch(() => {}) : Promise.resolve(),
    new Promise(r => setTimeout(r, 1500))
  ]));
  // Place a glyph inside a square of side s: centered left-to-right, sitting on a shared baseline,
  // so tall letters (ל) rise above the top line and final letters (ן ך ף ץ) and ק drop below the baseline.
  function glyphBox(ctx, ch, s, font) {
    ctx.font = `600 ${s * 0.6}px ${font || GLYPH_FONT}`;
    const bh = ctx.measureText("ב").actualBoundingBoxAscent;
    const m = ctx.measureText(ch);
    const w = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
    const base = (s + bh) / 2;
    return { x: (s - w) / 2 + m.actualBoundingBoxLeft, y: base, top: base - bh, base };
  }

  // Shape check: draw both shapes on a small grid, then ask how much of the letter the
  // drawing covers and how much of the drawing stays on the letter (with some tolerance).
  const GN = 56;
  function maskFrom(draw) {
    const c = document.createElement("canvas"); c.width = c.height = GN;
    const x = c.getContext("2d"); x.fillStyle = x.strokeStyle = "#000"; draw(x);
    const d = x.getImageData(0, 0, GN, GN).data, m = new Uint8Array(GN * GN);
    for (let i = 0; i < GN * GN; i++) m[i] = d[i * 4 + 3] > 80 ? 1 : 0;
    return m;
  }
  function dilate(m, r) {
    const o = new Uint8Array(GN * GN);
    for (let y = 0; y < GN; y++) for (let x = 0; x < GN; x++) if (m[y * GN + x])
      for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        if (dx * dx + dy * dy > r * r) continue;
        const X = x + dx, Y = y + dy;
        if (X >= 0 && Y >= 0 && X < GN && Y < GN) o[Y * GN + X] = 1;
      }
    return o;
  }
  function strokePath(x, strokes, map, lw) {
    x.lineWidth = lw; x.lineCap = "round"; x.lineJoin = "round";
    strokes.forEach(st => {
      x.beginPath();
      st.forEach((p, i) => { const [a, b] = map(p); if (i) x.lineTo(a, b); else x.moveTo(a, b); });
      if (st.length === 1) { const [a, b] = map(st[0]); x.lineTo(a + 0.01, b); }
      x.stroke();
    });
  }
  const glyphMask = (ch, font) => maskFrom(x => { const g = glyphBox(x, ch, GN, font); x.fillText(ch, g.x, g.y); });
  const R = 2;
  let TARGETS = null;
  const targets = () => TARGETS || (TARGETS = LETTERS.map(l => {
    const T = glyphMask(l[0]); let t = 0; for (let i = 0; i < T.length; i++) t += T[i];
    return { ch: l[0], T, dT: dilate(T, R), t };
  }));
  // Score a drawing against every letter, in the pad's own frame (so size and position count).
  // When writing from memory, also try small shifts and size changes and keep each letter's best fit.
  function scoreAll(strokes, S, loose) {
    const k = GN / S, lw = S * 0.07 * k;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    strokes.forEach(st => st.forEach(p => { x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y); x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y); }));
    const cx = (x0 + x1) / 2 * k, cy = (y0 + y1) / 2 * k;
    const shifts = loose ? [-4, -2, 0, 2, 4] : [-1, 0, 1], scales = loose ? [0.85, 1, 1.18] : [1];
    const tg = targets(), best = new Map(tg.map(o => [o.ch, 0]));
    for (const sc of scales) for (const dx of shifts) for (const dy of shifts) {
      const U = maskFrom(x => strokePath(x, strokes, p => [cx + (p.x * k - cx) * sc + dx, cy + (p.y * k - cy) * sc + dy], lw));
      const dU = dilate(U, R);
      let u = 0; for (let i = 0; i < U.length; i++) u += U[i];
      if (!u) continue;
      for (const o of tg) {
        if (!o.t) continue;
        let tc = 0, up = 0;
        for (let i = 0; i < U.length; i++) { if (o.T[i] && dU[i]) tc++; if (U[i] && o.dT[i]) up++; }
        const c = tc / o.t, p = up / u, f = c + p ? 2 * c * p / (c + p) : 0;
        if (f > best.get(o.ch)) best.set(o.ch, f);
      }
    }
    return best;
  }
  const WRITE_GOOD = 0.75, WRITE_CLOSE = 0.55, MARGIN = 0.03;
  // Pass when the drawing fits the target at least about as well as any other letter.
  function judge(scores, ch) {
    const s = scores.get(ch) || 0;
    let rival = null, rs = 0;
    scores.forEach((v, c) => { if (c !== ch && v > rs) { rs = v; rival = c; } });
    const clearRival = rs > s + MARGIN && rs >= WRITE_GOOD ? rival : null;
    if (s >= WRITE_GOOD && !clearRival) return { level: "good" };
    if (s >= WRITE_CLOSE) return { level: "close", rival: clearRival };
    return { level: "miss", rival: clearRival };
  }

  function makePad(host) {
    host.innerHTML = `<canvas class="guide"></canvas><canvas class="ink"></canvas>`;
    const gc = host.querySelector(".guide"), ic = host.querySelector(".ink");
    const S = host.clientWidth || 280, dpr = window.devicePixelRatio || 1;
    [gc, ic].forEach(c => { c.width = S * dpr; c.height = S * dpr; c.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0); });
    const g = gc.getContext("2d"), k = ic.getContext("2d");
    const pad = { S, strokes: [] };
    function redraw() {
      k.clearRect(0, 0, S, S);
      k.strokeStyle = css("--ink"); k.lineWidth = S * 0.07; k.lineCap = "round"; k.lineJoin = "round";
      pad.strokes.forEach(st => {
        k.beginPath();
        st.forEach((p, i) => i ? k.lineTo(p.x, p.y) : k.moveTo(p.x, p.y));
        if (st.length === 1) k.lineTo(st[0].x + 0.1, st[0].y);
        k.stroke();
      });
    }
    // Writing lines: top line and baseline, like lined handwriting paper.
    pad.guide = (ch, color, alpha) => {
      g.clearRect(0, 0, S, S);
      const b = glyphBox(g, ch || "ב", S);
      g.save(); g.strokeStyle = css("--line"); g.lineWidth = 1.5; g.setLineDash([6, 6]);
      [b.top, b.base].forEach(y => { g.beginPath(); g.moveTo(S * 0.06, y); g.lineTo(S * 0.94, y); g.stroke(); });
      g.restore();
      if (!ch) return;
      g.globalAlpha = alpha; g.fillStyle = color; g.fillText(ch, b.x, b.y); g.globalAlpha = 1;
    };
    pad.clear = () => { pad.strokes = []; redraw(); };
    let cur = null;
    const pos = e => { const r = ic.getBoundingClientRect(); return { x: (e.clientX - r.left) * S / r.width, y: (e.clientY - r.top) * S / r.height }; };
    ic.addEventListener("pointerdown", e => { e.preventDefault(); try { ic.setPointerCapture(e.pointerId); } catch (_) {} cur = [pos(e)]; pad.strokes.push(cur); redraw(); if (pad.onInk) pad.onInk(); });
    ic.addEventListener("pointermove", e => { if (!cur) return; e.preventDefault(); cur.push(pos(e)); redraw(); });
    const end = () => { cur = null; };
    ic.addEventListener("pointerup", end); ic.addEventListener("pointercancel", end);
    return pad;
  }
  function writeFeedback(v, ch, fb) {
    const like = v.rival ? ` It looks more like <span class="heb-inline">${v.rival}</span> (${esc(LETTERS.find(l => l[0] === v.rival)[1])}).` : "";
    if (v.level === "good") { fb.className = "feedback good"; fb.innerHTML = `Well done! That's <span class="heb-inline">${ch}</span>.`; }
    else if (v.level === "close") { fb.className = "feedback"; fb.innerHTML = `Close.${like} Compare your letter with the outline.`; }
    else { fb.className = "feedback bad"; fb.innerHTML = `Not quite.${like} Compare with the outline and try again.`; }
  }

  let traceIdx = 0;
  function trace() {
    const L = LETTERS[traceIdx];
    view().innerHTML = `<h2>Letters</h2>${segHTML("letters-trace")}<p class="sub">Trace the letter with your finger or mouse, then tap Check.</p>
      <div class="card"><div class="letter-head"><span class="ltr">${L[0]}</span><span><b>${L[1]}</b> · ${L[2]}</span><span class="count">${traceIdx + 1} of ${LETTERS.length}</span></div>
      <div class="pad" id="pad"></div>
      <div class="feedback" id="fb" aria-live="polite"></div>
      <div class="row"><button id="clr">Clear</button><button id="chk" class="primary">Check</button></div>
      <div class="row"><button id="prv" ${traceIdx === 0 ? "disabled" : ""}>Previous letter</button><button id="nxt">Next letter</button></div></div>`;
    $("#prv").onclick = () => { traceIdx = Math.max(0, traceIdx - 1); trace(); };
    $("#nxt").onclick = () => { traceIdx = (traceIdx + 1) % LETTERS.length; trace(); };
    loadFont().then(() => {
      if (location.hash !== "#letters-trace") return;
      const pad = makePad($("#pad")), fb = $("#fb");
      const fresh = () => pad.guide(L[0], css("--muted"), 0.3);
      fresh();
      pad.onInk = () => { if (fb.textContent) { fb.textContent = ""; fresh(); } };
      $("#clr").onclick = () => { pad.clear(); fb.textContent = ""; fresh(); };
      $("#chk").onclick = () => {
        if (!pad.strokes.length) { fb.className = "feedback"; fb.textContent = "Trace the letter first."; return; }
        writeFeedback(judge(scoreAll(pad.strokes, pad.S, false), L[0]), L[0], fb);
        pad.guide(L[0], css("--accent"), 0.45);
      };
    });
  }

  let wLast = null, wRight = 0, wCount = 0;
  function write() {
    let L; do { L = LETTERS[Math.floor(Math.random() * LETTERS.length)]; } while (L === wLast);
    wLast = L;
    view().innerHTML = `<h2>Letters</h2>${segHTML("letters-write")}<p class="sub">Write the letter from memory between the lines, then tap Check. Well done: ${wRight} of ${wCount}</p>
      <div class="card"><div class="letter-head"><span>Write <b>${L[1]}</b> · ${L[2]}</span></div>
      <div class="pad" id="pad"></div>
      <div class="feedback" id="fb" aria-live="polite"></div>
      <div class="row"><button id="clr">Clear</button><button id="chk" class="primary">Check</button><button id="nxt">Next letter</button></div></div>`;
    $("#nxt").onclick = write;
    loadFont().then(() => {
      if (location.hash !== "#letters-write") return;
      const pad = makePad($("#pad")), fb = $("#fb");
      let checked = false;
      pad.guide(null);
      $("#clr").onclick = () => { pad.clear(); pad.guide(null); fb.textContent = ""; };
      $("#chk").onclick = () => {
        if (!pad.strokes.length) { fb.className = "feedback"; fb.textContent = "Write the letter first."; return; }
        const v = judge(scoreAll(pad.strokes, pad.S, true), L[0]);
        if (!checked) { checked = true; wCount++; if (v.level === "good") wRight++; }
        writeFeedback(v, L[0], fb);
        pad.guide(L[0], css("--accent"), 0.35);
      };
    });
  }

  let lScore = 0, lCount = 0;
  function letters() {
    const L = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    const opts = shuffle([L, ...shuffle(LETTERS.filter(x => x !== L)).slice(0, 3)]);
    view().innerHTML = `<h2>Letters</h2>${segHTML("letters")}<p class="sub">Name the letter. Score: ${lScore}/${lCount}</p>
      <div class="card"><div class="prompt">${L[0]}</div>
      <div class="grid">${opts.map(o => `<button class="opt text" data-n="${o[1]}">${o[1]}<small style="color:var(--muted)">${o[2]}</small></button>`).join("")}</div>
      <div class="feedback" id="fb" aria-live="polite"></div></div>`;
    view().querySelectorAll(".opt").forEach(b => b.onclick = () => {
      if (view().querySelector(".opt.right")) return;
      const ok = b.dataset.n === L[1]; lCount++; if (ok) lScore++;
      b.classList.add(ok ? "right" : "wrong");
      view().querySelector(`.opt[data-n="${L[1]}"]`).classList.add("right");
      const fb = $("#fb"); fb.className = "feedback " + (ok ? "good" : "bad"); fb.textContent = ok ? "Correct." : `That's ${L[1]}.`;
      setTimeout(() => { if (location.hash === "#letters") letters(); }, ok ? 800 : 1600);
    });
  }

  function read() {
    const R = READINGS[0];
    view().innerHTML = `<h2>Read Scripture</h2><p class="sub">Tap any word to hear it and see its meaning. Hebrew reads right to left.</p>
      <div class="card"><div class="ref">${R.ref}</div>
      <div class="verse">${R.words.map((w, k) => `<span tabindex="0" role="button" data-i="${k}">${w.h}</span>`).join(" ")}</div>
      <div class="gloss" id="gl" aria-live="polite"><span class="g-note">Start with the first word on the right.</span></div>
      <div class="row"><button id="hear">▶ Hear the verse</button><button id="slow">🐢 Slower</button></div></div>`;
    const show = k => {
      const w = R.words[k];
      if (w.audio) play(w.audio);
      view().querySelectorAll(".verse span").forEach(s => s.classList.toggle("sel", s.dataset.i == k));
      $("#gl").innerHTML = `<div class="g-heb">${w.h}</div><div class="g-en">${esc(w.en)}</div><div class="g-note">${w.n.replace(/([֐-׿]+)/g, '<span class="heb-inline">$1</span>')}</div>`;
    };
    view().querySelectorAll(".verse span").forEach(s => { s.onclick = () => show(s.dataset.i); s.onkeydown = e => { if (e.key === "Enter") show(s.dataset.i); }; });
    $("#hear").onclick = () => play(R.audio);
    $("#slow").onclick = () => play(R.audio, true);
  }

  /* ---------- router ---------- */
  function route() {
    if (player) player.pause();
    if (activeRec) { try { activeRec.abort(); } catch (e) {} activeRec = null; }
    const h = location.hash.replace("#", "") || "home";
    const tab = h.startsWith("lesson") ? "home" : h.startsWith("letters") ? "letters" : h;
    document.querySelectorAll("nav a").forEach(a => a.setAttribute("aria-current", a.dataset.tab === tab ? "page" : "false"));
    const m = h.match(/^lesson-(\d+)$/);
    if (m) lesson(+m[1]);
    else if (h === "review") review();
    else if (h === "letters") letters();
    else if (h === "letters-trace") trace();
    else if (h === "letters-write") write();
    else if (h === "speak") speak();
    else if (h === "read") read();
    else home();
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  window.__davarTest = { checkSpeech, glyphBox, scoreAll, judge, loadFont, LETTERS };
  updateStat(); route();

  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost") &&!location.hostname.endsWith("claude.ai") && !location.hostname.includes("claudeusercontent")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
