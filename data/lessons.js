// Davar lesson data. Add a lesson by adding an object here and its audio files in /audio.
// item fields: id, h (pointed Hebrew), t (transliteration), en (meaning, hidden by default),
// pic (placeholder picture), size ("big"|"small", optional), audio (file name without .mp3),
// quiz (false for helper words taught only through sentences), kind ("sentence" optional)
window.DAVAR_LESSONS = [
  {
    id: 1, title: "People", heb: "אֲנָשִׁים",
    items: [
      { id: "ish",    h: "אִישׁ",   t: "ish",    en: "man",    pic: "🧔", audio: "ish" },
      { id: "ishah",  h: "אִשָּׁה",  t: "ishah",  en: "woman",  pic: "👩", audio: "ishah" },
      { id: "yeled",  h: "יֶלֶד",   t: "yeled",  en: "boy",    pic: "👦", audio: "yeled" },
      { id: "yaldah", h: "יַלְדָּה", t: "yaldah", en: "girl",   pic: "👧", audio: "yaldah" },
      { id: "av",     h: "אָב",     t: "av",     en: "father", pic: "👨‍👧", audio: "av" },
      { id: "em",     h: "אֵם",     t: "em",     en: "mother", pic: "👩‍👦", audio: "em" }
    ]
  },
  {
    id: 2, title: "Sky and land", heb: "שָׁמַיִם וָאָרֶץ",
    items: [
      { id: "shemesh", h: "שֶׁמֶשׁ", t: "shemesh", en: "sun",          pic: "☀️", audio: "shemesh" },
      { id: "yareach", h: "יָרֵחַ",  t: "yareach", en: "moon",         pic: "🌙", audio: "yareach" },
      { id: "kochav",  h: "כּוֹכָב", t: "kochav",  en: "star",         pic: "⭐", audio: "kochav" },
      { id: "mayim",   h: "מַיִם",   t: "mayim",   en: "water",        pic: "💧", audio: "mayim" },
      { id: "ets",     h: "עֵץ",     t: "ets",     en: "tree",         pic: "🌳", audio: "ets" },
      { id: "erets",   h: "אֶרֶץ",   t: "erets",   en: "land, earth",  pic: "🌍", audio: "erets" }
    ]
  },
  {
    id: 3, title: "Animals", heb: "חַיּוֹת",
    items: [
      { id: "sus",     h: "סוּס",    t: "sus",     en: "horse",   pic: "🐎", audio: "sus" },
      { id: "kelev",   h: "כֶּלֶב",  t: "kelev",   en: "dog",     pic: "🐕", audio: "kelev" },
      { id: "gamal",   h: "גָּמָל",  t: "gamal",   en: "camel",   pic: "🐪", audio: "gamal" },
      { id: "nachash", h: "נָחָשׁ",  t: "nachash", en: "serpent", pic: "🐍", audio: "nachash" },
      { id: "tsippor", h: "צִפּוֹר", t: "tsippor", en: "bird",    pic: "🐦", audio: "tsippor" },
      { id: "dag",     h: "דָּג",    t: "dag",     en: "fish",    pic: "🐟", audio: "dag" }
    ]
  },
  {
    id: 4, title: "This is…", heb: "זֶה",
    tip: "Hebrew needs no word for “is” here. זֶה points to a masculine word, זֹאת to a feminine one.",
    items: [
      { id: "bayit",  h: "בַּיִת", t: "bayit",  en: "house",           pic: "🏠", audio: "bayit" },
      { id: "lechem", h: "לֶחֶם",  t: "lechem", en: "bread",           pic: "🍞", audio: "lechem" },
      { id: "zeh",    h: "זֶה",    t: "zeh",    en: "this (masculine)", pic: "👉", audio: "zeh", quiz: false },
      { id: "zot",    h: "זֹאת",   t: "zot",    en: "this (feminine)",  pic: "👉", audio: "zot", quiz: false },
      { id: "s-zeh-ish",     kind: "sentence", h: "זֶה אִישׁ",    t: "zeh ish",     en: "This is a man.",   pic: "👉🧔", audio: "s-zeh-ish" },
      { id: "s-zot-ishah",   kind: "sentence", h: "זֹאת אִשָּׁה",  t: "zot ishah",   en: "This is a woman.", pic: "👉👩", audio: "s-zot-ishah" },
      { id: "s-zeh-sus",     kind: "sentence", h: "זֶה סוּס",     t: "zeh sus",     en: "This is a horse.", pic: "👉🐎", audio: "s-zeh-sus" },
      { id: "s-zeh-bayit",   kind: "sentence", h: "זֶה בַּיִת",   t: "zeh bayit",   en: "This is a house.", pic: "👉🏠", audio: "s-zeh-bayit" },
      { id: "s-zot-tsippor", kind: "sentence", h: "זֹאת צִפּוֹר", t: "zot tsippor", en: "This is a bird.",  pic: "👉🐦", audio: "s-zot-tsippor" }
    ]
  },
  {
    id: 5, title: "The good horse", heb: "הַסּוּס הַטּוֹב",
    tip: "הַ on the front of a word means “the.” “The horse is big” is just “the horse big.”",
    items: [
      { id: "tov",   h: "טוֹב",  t: "tov",   en: "good",  pic: "👍", audio: "tov" },
      { id: "ra",    h: "רַע",   t: "ra",    en: "bad",   pic: "👎", audio: "ra" },
      { id: "gadol", h: "גָּדוֹל", t: "gadol", en: "big",   pic: "⭐", size: "big",   audio: "gadol" },
      { id: "katon", h: "קָטֹן",  t: "katon", en: "small", pic: "⭐", size: "small", audio: "katon" },
      { id: "s-hasus-gadol",   kind: "sentence", h: "הַסּוּס גָּדוֹל", t: "hasus gadol",   en: "The horse is big.",    pic: "🐎", size: "big",   audio: "s-hasus-gadol" },
      { id: "s-hakelev-katon", kind: "sentence", h: "הַכֶּלֶב קָטֹן", t: "hakelev katon", en: "The dog is small.",    pic: "🐕", size: "small", audio: "s-hakelev-katon" },
      { id: "s-halechem-tov",  kind: "sentence", h: "הַלֶּחֶם טוֹב",  t: "halechem tov",  en: "The bread is good.",   pic: "🍞👍", audio: "s-halechem-tov" },
      { id: "s-hanachash-ra",  kind: "sentence", h: "הַנָּחָשׁ רַע",   t: "hanachash ra",  en: "The serpent is bad.",  pic: "🐍👎", audio: "s-hanachash-ra" }
    ]
  }
];

window.DAVAR_LETTERS = [
  ["א","Aleph","silent"],["ב","Bet","b / v"],["ג","Gimel","g"],["ד","Dalet","d"],["ה","He","h"],
  ["ו","Vav","v"],["ז","Zayin","z"],["ח","Chet","ch"],["ט","Tet","t"],["י","Yod","y"],
  ["כ","Kaf","k / kh"],["ל","Lamed","l"],["מ","Mem","m"],["נ","Nun","n"],["ס","Samekh","s"],
  ["ע","Ayin","silent"],["פ","Pe","p / f"],["צ","Tsade","ts"],["ק","Qof","q"],["ר","Resh","r"],
  ["ש","Shin / Sin","sh / s"],["ת","Tav","t"],
  ["ך","Final Kaf","kh (end of word)"],["ם","Final Mem","m (end of word)"],["ן","Final Nun","n (end of word)"],
  ["ף","Final Pe","f (end of word)"],["ץ","Final Tsade","ts (end of word)"]
];

window.DAVAR_READINGS = [
  { id: "gen1-1", ref: "Genesis 1:1", audio: "gen1-1", words: [
    { h: "בְּרֵאשִׁית", en: "In the beginning", n: "בְּ (in) + רֵאשִׁית (beginning)" },
    { h: "בָּרָא", en: "he created", n: "Verb, completed action" },
    { h: "אֱלֹהִים", en: "God", n: "Plural form, used with a singular verb" },
    { h: "אֵת", en: "(object marker)", n: "Marks the definite direct object; not translated" },
    { h: "הַשָּׁמַיִם", en: "the heavens", n: "הַ (the) + שָׁמַיִם (heavens)" },
    { h: "וְאֵת", en: "and (object marker)", n: "וְ (and) + אֵת" },
    { h: "הָאָרֶץ", en: "the earth", n: "הָ (the) + אֶרֶץ (earth)" }
  ]}
];
