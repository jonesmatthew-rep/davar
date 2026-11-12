// Davar lesson data. Add a lesson by adding an object here and its audio files in /audio.
// item fields: id, h (pointed Hebrew), t (transliteration), en (meaning, hidden by default),
// pic (placeholder picture), size ("big"|"small", optional), audio (file name without .mp3),
// quiz (false for helper words taught only through sentences), kind ("sentence" optional)
window.DAVAR_LESSONS = [
  {
    id: 1, title: "People", heb: "אֲנָשִׁים",
    items: [
      { id: "ish", img: "img/ish.webp",    h: "אִישׁ",   t: "ish",    en: "man",    pic: "🧔", audio: "ish" },
      { id: "ishah", img: "img/ishah.webp",  h: "אִשָּׁה",  t: "ishah",  en: "woman",  pic: "👩", audio: "ishah" },
      { id: "yeled", img: "img/yeled.webp",  h: "יֶלֶד",   t: "yeled",  en: "boy",    pic: "👦", audio: "yeled" },
      { id: "yaldah", img: "img/yaldah.webp", h: "יַלְדָּה", t: "yaldah", en: "girl",   pic: "👧", audio: "yaldah" },
      { id: "av", img: "img/av.webp",     h: "אָב",     t: "av",     en: "father", pic: "👨‍👧", audio: "av" },
      { id: "em", img: "img/em.webp",     h: "אֵם",     t: "em",     en: "mother", pic: "👩‍👦", audio: "em" }
    ]
  },
  {
    id: 2, title: "Sky and land", heb: "שָׁמַיִם וָאָרֶץ",
    items: [
      { id: "shemesh", img: "img/shemesh.webp", h: "שֶׁמֶשׁ", t: "shemesh", en: "sun",          pic: "☀️", audio: "shemesh" },
      { id: "yareach", img: "img/yareach.webp", h: "יָרֵחַ",  t: "yareach", en: "moon",         pic: "🌙", audio: "yareach" },
      { id: "kochav", img: "img/kochav.webp",  h: "כּוֹכָב", t: "kochav",  en: "star",         pic: "⭐", audio: "kochav" },
      { id: "mayim", img: "img/mayim.webp",   h: "מַיִם",   t: "mayim",   en: "water",        pic: "💧", audio: "mayim" },
      { id: "ets", img: "img/ets.webp",     h: "עֵץ",     t: "ets",     en: "tree",         pic: "🌳", audio: "ets" },
      { id: "erets", img: "img/erets.webp",   h: "אֶרֶץ",   t: "erets",   en: "land, earth",  pic: "🌍", audio: "erets" }
    ]
  },
  {
    id: 3, title: "Animals", heb: "חַיּוֹת",
    items: [
      { id: "sus", img: "img/sus.webp",     h: "סוּס",    t: "sus",     en: "horse",   pic: "🐎", audio: "sus" },
      { id: "kelev", img: "img/kelev.webp",   h: "כֶּלֶב",  t: "kelev",   en: "dog",     pic: "🐕", audio: "kelev" },
      { id: "gamal", img: "img/gamal.webp",   h: "גָּמָל",  t: "gamal",   en: "camel",   pic: "🐪", audio: "gamal" },
      { id: "nachash", img: "img/nachash.webp", h: "נָחָשׁ",  t: "nachash", en: "serpent", pic: "🐍", audio: "nachash" },
      { id: "tsippor", img: "img/tsippor.webp", h: "צִפּוֹר", t: "tsippor", en: "bird",    pic: "🐦", audio: "tsippor" },
      { id: "dag", img: "img/dag.webp",     h: "דָּג",    t: "dag",     en: "fish",    pic: "🐟", audio: "dag" }
    ]
  },
  {
    id: 4, title: "This is…", heb: "זֶה",
    tip: "Hebrew needs no word for “is” here. זֶה points to a masculine word, זֹאת to a feminine one.",
    items: [
      { id: "bayit", img: "img/bayit.webp",  h: "בַּיִת", t: "bayit",  en: "house",           pic: "🏠", audio: "bayit" },
      { id: "lechem", img: "img/lechem.webp", h: "לֶחֶם",  t: "lechem", en: "bread",           pic: "🍞", audio: "lechem" },
      { id: "zeh", img: "img/point.webp",    h: "זֶה",    t: "zeh",    en: "this (masculine)", pic: "👉", audio: "zeh", quiz: false },
      { id: "zot", img: "img/point.webp",    h: "זֹאת",   t: "zot",    en: "this (feminine)",  pic: "👉", audio: "zot", quiz: false },
      { id: "s-zeh-ish", img: "img/s-zeh-ish.webp",     kind: "sentence", h: "זֶה אִישׁ",    t: "zeh ish",     en: "This is a man.",   pic: "👉🧔", audio: "s-zeh-ish" },
      { id: "s-zot-ishah", img: "img/s-zot-ishah.webp",   kind: "sentence", h: "זֹאת אִשָּׁה",  t: "zot ishah",   en: "This is a woman.", pic: "👉👩", audio: "s-zot-ishah" },
      { id: "s-zeh-sus", img: "img/s-zeh-sus.webp",     kind: "sentence", h: "זֶה סוּס",     t: "zeh sus",     en: "This is a horse.", pic: "👉🐎", audio: "s-zeh-sus" },
      { id: "s-zeh-bayit", img: "img/s-zeh-bayit.webp",   kind: "sentence", h: "זֶה בַּיִת",   t: "zeh bayit",   en: "This is a house.", pic: "👉🏠", audio: "s-zeh-bayit" },
      { id: "s-zot-tsippor", img: "img/s-zot-tsippor.webp", kind: "sentence", h: "זֹאת צִפּוֹר", t: "zot tsippor", en: "This is a bird.",  pic: "👉🐦", audio: "s-zot-tsippor" }
    ]
  },
  {
    id: 5, title: "The good horse", heb: "הַסּוּס הַטּוֹב",
    tip: "הַ on the front of a word means “the.” “The horse is big” is just “the horse big.”",
    items: [
      { id: "tov", img: "img/tov.webp",   h: "טוֹב",  t: "tov",   en: "good",  pic: "👍", audio: "tov" },
      { id: "ra", img: "img/ra.webp",    h: "רַע",   t: "ra",    en: "bad",   pic: "👎", audio: "ra" },
      { id: "gadol", img: "img/gadol.webp", h: "גָּדוֹל", t: "gadol", en: "big",   pic: "⭐", size: "big",   audio: "gadol" },
      { id: "katon", img: "img/katon.webp", h: "קָטֹן",  t: "katon", en: "small", pic: "⭐", size: "small", audio: "katon" },
      { id: "s-hasus-gadol", img: "img/s-hasus-gadol.webp",   kind: "sentence", h: "הַסּוּס גָּדוֹל", t: "hasus gadol",   en: "The horse is big.",    pic: "🐎", size: "big",   audio: "s-hasus-gadol" },
      { id: "s-hakelev-katon", img: "img/s-hakelev-katon.webp", kind: "sentence", h: "הַכֶּלֶב קָטֹן", t: "hakelev katon", en: "The dog is small.",    pic: "🐕", size: "small", audio: "s-hakelev-katon" },
      { id: "s-halechem-tov", img: "img/s-halechem-tov.webp",  kind: "sentence", h: "הַלֶּחֶם טוֹב",  t: "halechem tov",  en: "The bread is good.",   pic: "🍞👍", audio: "s-halechem-tov" },
      { id: "s-hanachash-ra", img: "img/s-hanachash-ra.webp",  kind: "sentence", h: "הַנָּחָשׁ רַע",   t: "hanachash ra",  en: "The serpent is bad.",  pic: "🐍👎", audio: "s-hanachash-ra" }
    ]
  },
  {
    id: 6, unit: 2, title: "Many", heb: "רַבִּים",
    tip: "Adding ־ִים to a word usually means “many.” Some words change shape: אִישׁ becomes אֲנָשִׁים. Many feminine words end in ־וֹת.",
    items: [
      { id: "susim", img: "img/susim.webp",    h: "סוּסִים",   t: "susim",    en: "horses",   pic: "🐎🐎🐎", audio: "susim" },
      { id: "kelavim", img: "img/kelavim.webp",  h: "כְּלָבִים",  t: "kelavim",  en: "dogs",     pic: "🐕🐕🐕", audio: "kelavim" },
      { id: "etsim", img: "img/etsim.webp",    h: "עֵצִים",    t: "etsim",    en: "trees",    pic: "🌳🌳🌳", audio: "etsim" },
      { id: "kochavim", img: "img/kochavim.webp", h: "כּוֹכָבִים", t: "kochavim", en: "stars",    pic: "⭐⭐⭐", audio: "kochavim" },
      { id: "yeladim", img: "img/yeladim.webp",  h: "יְלָדִים",   t: "yeladim",  en: "boys, children", pic: "👦👦👦", audio: "yeladim" },
      { id: "yeladot", img: "img/yeladot.webp",  h: "יְלָדוֹת",   t: "yeladot",  en: "girls",    pic: "👧👧👧", audio: "yeladot" },
      { id: "anashim", img: "img/anashim.webp",  h: "אֲנָשִׁים",  t: "anashim",  en: "men",      pic: "🧔🧔🧔", audio: "anashim" },
      { id: "nashim", img: "img/nashim.webp",   h: "נָשִׁים",    t: "nashim",   en: "women",    pic: "👩👩👩", audio: "nashim" }
    ]
  },
  {
    id: 7, unit: 2, title: "I and you", heb: "אֲנִי וְאַתָּה",
    tip: "Again, no word for “am” or “are”: אֲנִי אִישׁ is “I am a man.” Hebrew has two words for “you”: אַתָּה for a man, אַתְּ for a woman.",
    items: [
      { id: "ani", img: "img/s-ani-ish.webp",  h: "אֲנִי", t: "ani",  en: "I",            pic: "🙋", audio: "ani", quiz: false },
      { id: "atah", img: "img/s-zeh-ish.webp", h: "אַתָּה", t: "atah", en: "you (a man)",  pic: "👉🧔", audio: "atah", quiz: false },
      { id: "at", img: "img/s-zot-ishah.webp",   h: "אַתְּ",  t: "at",   en: "you (a woman)", pic: "👉👩", audio: "at", quiz: false },
      { id: "hu", img: "img/ish.webp",   h: "הוּא",  t: "hu",   en: "he, it",       pic: "🧔", audio: "hu", quiz: false },
      { id: "hi", img: "img/ishah.webp",   h: "הִיא",  t: "hi",   en: "she, it",      pic: "👩", audio: "hi", quiz: false },
      { id: "s-ani-ish", img: "img/s-ani-ish.webp",    kind: "sentence", h: "אֲנִי אִישׁ",   t: "ani ish",    en: "I am a man.",      pic: "🙋‍♂️", audio: "s-ani-ish" },
      { id: "s-ani-ishah", img: "img/s-ani-ishah.webp",  kind: "sentence", h: "אֲנִי אִשָּׁה",  t: "ani ishah",  en: "I am a woman.",    pic: "🙋‍♀️", audio: "s-ani-ishah" },
      { id: "s-atah-yeled", img: "img/s-atah-yeled.webp", kind: "sentence", h: "אַתָּה יֶלֶד",  t: "atah yeled", en: "You are a boy.",   pic: "👉👦", audio: "s-atah-yeled" },
      { id: "s-at-yaldah", img: "img/s-at-yaldah.webp",  kind: "sentence", h: "אַתְּ יַלְדָּה", t: "at yaldah",  en: "You are a girl.",  pic: "👉👧", audio: "s-at-yaldah" },
      { id: "s-hu-av", img: "img/av.webp",      kind: "sentence", h: "הוּא אָב",     t: "hu av",      en: "He is a father.",  pic: "👨‍👧", audio: "s-hu-av" },
      { id: "s-hi-em", img: "img/em.webp",      kind: "sentence", h: "הִיא אֵם",     t: "hi em",      en: "She is a mother.", pic: "👩‍👦", audio: "s-hi-em" }
    ]
  },
  {
    id: 8, unit: 2, title: "In the house", heb: "בַּבַּיִת",
    tip: "Some little words join onto the front of the next word: בְּ “in” and לְ “to, for.” With “the,” בְּ + הַ becomes בַּ, so בַּבַּיִת is “in the house.”",
    items: [
      { id: "al", img: "img/al.webp",    h: "עַל",  t: "al",    en: "on, upon", pic: "⬆️", audio: "al", quiz: false },
      { id: "tachat", img: "img/tachat.webp", h: "תַּחַת", t: "tachat", en: "under",  pic: "⬇️", audio: "tachat", quiz: false },
      { id: "s-hadag-bamayim", img: "img/s-hadag-bamayim.webp",  kind: "sentence", h: "הַדָּג בַּמַּיִם",      t: "hadag bamayim",      en: "The fish is in the water.",   pic: "🐟💧", audio: "s-hadag-bamayim" },
      { id: "s-haish-babayit", img: "img/s-haish-babayit.webp",  kind: "sentence", h: "הָאִישׁ בַּבַּיִת",     t: "haish babayit",      en: "The man is in the house.",    pic: "🧔🏠", audio: "s-haish-babayit" },
      { id: "s-tsippor-al-ets", img: "img/s-tsippor-al-ets.webp", kind: "sentence", h: "הַצִּפּוֹר עַל הָעֵץ",   t: "hatsippor al haets", en: "The bird is on the tree.",    pic: "🐦🌳", audio: "s-tsippor-al-ets" },
      { id: "s-kelev-tachat-ets", img: "img/s-kelev-tachat-ets.webp", kind: "sentence", h: "הַכֶּלֶב תַּחַת הָעֵץ", t: "hakelev tachat haets", en: "The dog is under the tree.", pic: "🐕🌳", audio: "s-kelev-tachat-ets" },
      { id: "s-lechem-laish", img: "img/s-lechem-laish.webp",   kind: "sentence", h: "הַלֶּחֶם לָאִישׁ",      t: "halechem laish",     en: "The bread is for the man.",   pic: "🍞🧔", audio: "s-lechem-laish" }
    ]
  },
  {
    id: 9, unit: 2, title: "And, also, not", heb: "וְ · גַּם · לֹא",
    tip: "“And” is just וְ joined to the front of the next word: אִישׁ וְאִשָּׁה, “a man and a woman.” לֹא before a word means “not.”",
    items: [
      { id: "gam", img: "img/s-gam-hi-yaldah.webp", h: "גַּם", t: "gam", en: "also, too", pic: "➕", audio: "gam", quiz: false },
      { id: "lo", img: "img/lo.webp",  h: "לֹא",  t: "lo",  en: "not, no",   pic: "🚫", audio: "lo", quiz: false },
      { id: "s-ish-veishah", img: "img/s-ish-veishah.webp",   kind: "sentence", h: "אִישׁ וְאִשָּׁה",      t: "ish veishah",      en: "A man and a woman.",       pic: "🧔👩", audio: "s-ish-veishah" },
      { id: "s-sus-vegamal", img: "img/s-sus-vegamal.webp",   kind: "sentence", h: "סוּס וְגָמָל",       t: "sus vegamal",      en: "A horse and a camel.",     pic: "🐎🐪", audio: "s-sus-vegamal" },
      { id: "s-zeh-lo-kelev", img: "img/s-zeh-lo-kelev.webp",  kind: "sentence", h: "זֶה לֹא כֶּלֶב",      t: "zeh lo kelev",     en: "This is not a dog.",       pic: "👉🐈", audio: "s-zeh-lo-kelev" },
      { id: "s-lechem-lo-tov", img: "img/s-lechem-lo-tov.webp", kind: "sentence", h: "הַלֶּחֶם לֹא טוֹב",   t: "halechem lo tov",  en: "The bread is not good.",   pic: "🍞🚫", audio: "s-lechem-lo-tov" },
      { id: "s-gam-hi-yaldah", img: "img/s-gam-hi-yaldah.webp", kind: "sentence", h: "גַּם הִיא יַלְדָּה",   t: "gam hi yaldah",    en: "She is a girl too.",       pic: "👧👧", audio: "s-gam-hi-yaldah" }
    ]
  },
  {
    id: 10, unit: 2, title: "A short story", heb: "סִפּוּר",
    tip: "Every word in this story is one you already know. Read each line, listen, and see if you understand it before you tap Show meaning.",
    items: [
      { id: "st-1", img: "img/st-1.webp", kind: "sentence", h: "זֶה אִישׁ וְזֹאת אִשָּׁה",          t: "zeh ish vezot ishah",            en: "This is a man and this is a woman.",       pic: "👉🧔👩", audio: "st-1" },
      { id: "st-2", img: "img/st-2.webp", kind: "sentence", h: "הָאִישׁ אָב וְהָאִשָּׁה אֵם",        t: "haish av vehaishah em",          en: "The man is a father and the woman is a mother.", pic: "👨‍👩‍👧", audio: "st-2" },
      { id: "st-3", img: "img/st-3.webp", kind: "sentence", h: "הַיֶּלֶד וְהַיַּלְדָּה בַּבַּיִת",      t: "hayeled vehayaldah babayit",     en: "The boy and the girl are in the house.",   pic: "👦👧🏠", audio: "st-3" },
      { id: "st-4", img: "img/st-4.webp", kind: "sentence", h: "הַסּוּס תַּחַת הָעֵץ",              t: "hasus tachat haets",             en: "The horse is under the tree.",             pic: "🐎🌳", audio: "st-4" },
      { id: "st-5", img: "img/st-5.webp", kind: "sentence", h: "הַסּוּס גָּדוֹל וְהַכֶּלֶב קָטֹן",     t: "hasus gadol vehakelev katon",    en: "The horse is big and the dog is small.",   pic: "🐎🐕", audio: "st-5" },
      { id: "st-6", img: "img/st-6.webp", kind: "sentence", h: "הַצִּפּוֹר עַל הַבַּיִת",             t: "hatsippor al habayit",           en: "The bird is on the house.",                pic: "🐦🏠", audio: "st-6" },
      { id: "st-7", img: "img/st-7.webp", kind: "sentence", h: "הַנָּחָשׁ לֹא בַּבַּיִת",             t: "hanachash lo babayit",           en: "The serpent is not in the house.",         pic: "🐍🚫🏠", audio: "st-7" }
    ]
  },
  {
    id: 11, unit: 3, title: "He walked", heb: "הָלַךְ",
    tip: "These words tell what someone did. Each one is the “he did it” form: הָלַךְ is “he walked.” Hebrew dictionaries list verbs in this same form.",
    items: [
      { id: "halakh", img: "img/halakh.webp", h: "הָלַךְ", t: "halakh", en: "he walked, went", pic: "🚶", audio: "halakh" },
      { id: "yashav", img: "img/yashav.webp", h: "יָשַׁב", t: "yashav", en: "he sat", pic: "🪑", audio: "yashav" },
      { id: "akhal", img: "img/akhal.webp",  h: "אָכַל", t: "akhal",  en: "he ate", pic: "🍞", audio: "akhal" },
      { id: "raah", img: "img/raah.webp",   h: "רָאָה", t: "ra'ah",  en: "he saw", pic: "👀", audio: "raah" },
      { id: "s3-ish-halakh", img: "img/s3-ish-halakh.webp",   kind: "sentence", h: "הָאִישׁ הָלַךְ",            t: "haish halakh",              en: "The man walked.",             pic: "🧔🚶", audio: "s3-ish-halakh" },
      { id: "s3-yeled-yashav", img: "img/s3-yeled-yashav.webp", kind: "sentence", h: "הַיֶּלֶד יָשַׁב תַּחַת הָעֵץ", t: "hayeled yashav tachat haets", en: "The boy sat under the tree.", pic: "👦🌳", audio: "s3-yeled-yashav" },
      { id: "s3-kelev-akhal", img: "img/s3-kelev-akhal.webp",  kind: "sentence", h: "הַכֶּלֶב אָכַל לֶחֶם",        t: "hakelev akhal lechem",      en: "The dog ate bread.",          pic: "🐕🍞", audio: "s3-kelev-akhal" },
      { id: "s3-ish-raah", img: "img/s3-ish-raah.webp",     kind: "sentence", h: "הָאִישׁ רָאָה נָחָשׁ",        t: "haish ra'ah nachash",       en: "The man saw a serpent.",      pic: "🧔👀🐍", audio: "s3-ish-raah" }
    ]
  },
  {
    id: 12, unit: 3, title: "He said", heb: "אָמַר",
    tip: "In these lessons a colon starts what someone said: הָאִישׁ אָמַר: טוֹב, “The man said, ‘Good.’” קָרָא can mean “call” or “read.”",
    items: [
      { id: "amar", img: "img/amar.webp",  h: "אָמַר", t: "amar",  en: "he said", pic: "🗣️", audio: "amar" },
      { id: "qara", img: "img/qara.webp",  h: "קָרָא", t: "qara",  en: "he called, read", pic: "📣", audio: "qara" },
      { id: "shama", img: "img/shama.webp", h: "שָׁמַע", t: "shama", en: "he heard", pic: "👂", audio: "shama" },
      { id: "s3-ish-amar-tov", img: "img/s3-ish-amar-tov.webp", kind: "sentence", h: "הָאִישׁ אָמַר: טוֹב",   t: "haish amar: tov",     en: "The man said, “Good.”",          pic: "🧔🗣️👍", audio: "s3-ish-amar-tov" },
      { id: "s3-yeled-shama", img: "img/s3-yeled-shama.webp",  kind: "sentence", h: "הַיֶּלֶד שָׁמַע צִפּוֹר", t: "hayeled shama tsippor", en: "The boy heard a bird.",        pic: "👦👂🐦", audio: "s3-yeled-shama" },
      { id: "s3-av-qara", img: "img/s3-av-qara.webp",      kind: "sentence", h: "הָאָב קָרָא לַיֶּלֶד",    t: "haav qara layeled",   en: "The father called to the boy.", pic: "👨📣👦", audio: "s3-av-qara" },
      { id: "s3-hu-amar-lo", img: "img/s3-hu-amar-lo.webp",   kind: "sentence", h: "הוּא אָמַר: לֹא",       t: "hu amar: lo",         en: "He said, “No.”",                pic: "🧔🚫", audio: "s3-hu-amar-lo" }
    ]
  },
  {
    id: 13, unit: 3, title: "God and the light", heb: "אֱלֹהִים",
    tip: "אֱלֹהִים ends in ־ִים like a plural, but when it means the God of Israel it takes a “he” verb: אֱלֹהִים אָמַר, “God said.” Davar doesn't picture God. The light from above is a reminder, not a portrait.",
    items: [
      { id: "elohim", img: "img/elohim.webp",   h: "אֱלֹהִים", t: "elohim",   en: "God", pic: "☁️", audio: "w-elohim", quiz: false },
      { id: "shamayim", img: "img/shamayim.webp", h: "שָׁמַיִם", t: "shamayim", en: "heavens, sky", pic: "☁️🌤️", audio: "shamayim" },
      { id: "or", img: "img/or.webp",       h: "אוֹר",    t: "or",       en: "light", pic: "🪔", audio: "or" },
      { id: "choshekh", img: "img/choshekh.webp", h: "חֹשֶׁךְ",  t: "choshekh", en: "darkness", pic: "🌑", audio: "choshekh" },
      { id: "s3-or-tov", img: "img/s3-or-tov.webp",             kind: "sentence", h: "הָאוֹר טוֹב",        t: "haor tov",            en: "The light is good.",           pic: "🪔👍", audio: "s3-or-tov" },
      { id: "s3-shemesh-bashamayim", img: "img/s3-shemesh-bashamayim.webp", kind: "sentence", h: "הַשֶּׁמֶשׁ בַּשָּׁמַיִם", t: "hashemesh bashamayim", en: "The sun is in the sky.",       pic: "☀️☁️", audio: "s3-shemesh-bashamayim" },
      { id: "s3-yareach-bachoshekh", img: "img/s3-yareach-bachoshekh.webp", kind: "sentence", h: "הַיָּרֵחַ בַּחֹשֶׁךְ",   t: "hayareach bachoshekh", en: "The moon is in the darkness.", pic: "🌙🌑", audio: "s3-yareach-bachoshekh" },
      { id: "s3-elohim-amar", img: "img/elohim.webp",        kind: "sentence", h: "אֱלֹהִים אָמַר",      t: "elohim amar",         en: "God said.",                    pic: "☁️🗣️", audio: "s3-elohim-amar" }
    ]
  },
  {
    id: 14, unit: 3, title: "Created and made", heb: "בָּרָא",
    tip: "אֵת has no English word. It stands in front of a definite object, the thing the action happens to: רָאָה אֶת הַסּוּס, “he saw the horse.” You'll meet it twice in Genesis 1:1.",
    items: [
      { id: "bara", img: "img/bara.webp",   h: "בָּרָא",   t: "bara",   en: "he created", pic: "🌍✨", audio: "w-bara", quiz: false },
      { id: "asah", img: "img/asah.webp",   h: "עָשָׂה",   t: "asah",   en: "he made, did", pic: "🏺", audio: "asah" },
      { id: "hayah", img: "img/s3-yeled-hayah-babayit.webp",  h: "הָיָה",    t: "hayah",  en: "he was, it was", pic: "⏳", audio: "hayah", quiz: false },
      { id: "reshit", img: "img/reshit.webp", h: "רֵאשִׁית", t: "reshit", en: "beginning", pic: "🌅", audio: "reshit", quiz: false },
      { id: "et", img: "img/s3-yeled-raah-et-sus.webp",     h: "אֵת",     t: "et",     en: "(marks the object)", pic: "🎯", audio: "w-et", quiz: false },
      { id: "s3-ish-asah-lechem", img: "img/s3-ish-asah-lechem.webp",     kind: "sentence", h: "הָאִישׁ עָשָׂה לֶחֶם",       t: "haish asah lechem",        en: "The man made bread.",         pic: "🧔🍞", audio: "s3-ish-asah-lechem" },
      { id: "s3-yeled-raah-et-sus", img: "img/s3-yeled-raah-et-sus.webp",   kind: "sentence", h: "הַיֶּלֶד רָאָה אֶת הַסּוּס",   t: "hayeled ra'ah et hasus",   en: "The boy saw the horse.",      pic: "👦👀🐎", audio: "s3-yeled-raah-et-sus" },
      { id: "s3-yeled-hayah-babayit", img: "img/s3-yeled-hayah-babayit.webp", kind: "sentence", h: "הַיֶּלֶד הָיָה בַּבַּיִת",    t: "hayeled hayah babayit",    en: "The boy was in the house.",   pic: "👦🏠", audio: "s3-yeled-hayah-babayit" },
      { id: "s3-elohim-bara", img: "img/bara.webp",         kind: "sentence", h: "אֱלֹהִים בָּרָא אֶת הָאָרֶץ", t: "elohim bara et haarets",   en: "God created the earth.",      pic: "🌍✨☁️", audio: "s3-elohim-bara" }
    ]
  },
  {
    id: 15, unit: 3, title: "The dog and the bread", heb: "הַכֶּלֶב וְהַלֶּחֶם",
    tip: "A short story using only words you know. Read each line and see if you understand it before you tap Show meaning.",
    items: [
      { id: "st3-1", img: "img/st3-1.webp", kind: "sentence", h: "הָאִישׁ יָשַׁב בַּבַּיִת",            t: "haish yashav babayit",            en: "The man sat in the house.",        pic: "🧔🏠", audio: "st3-1" },
      { id: "st3-2", img: "img/st3-2.webp", kind: "sentence", h: "הוּא שָׁמַע כֶּלֶב",                t: "hu shama kelev",                  en: "He heard a dog.",                  pic: "👂🐕", audio: "st3-2" },
      { id: "st3-3", img: "img/st3-3.webp", kind: "sentence", h: "הוּא רָאָה אֶת הַכֶּלֶב תַּחַת הָעֵץ", t: "hu ra'ah et hakelev tachat haets", en: "He saw the dog under the tree.",   pic: "👀🐕🌳", audio: "st3-3" },
      { id: "st3-4", img: "img/st3-4.webp", kind: "sentence", h: "הַכֶּלֶב אָכַל אֶת הַלֶּחֶם",         t: "hakelev akhal et halechem",       en: "The dog ate the bread.",           pic: "🐕🍞😋", audio: "st3-4" },
      { id: "st3-5", img: "img/st3-5.webp", kind: "sentence", h: "הָאִישׁ אָמַר: לֹא טוֹב",           t: "haish amar: lo tov",              en: "The man said, “Not good!”",        pic: "🧔👎", audio: "st3-5" },
      { id: "st3-6", img: "img/st3-6.webp", kind: "sentence", h: "הַיֶּלֶד עָשָׂה לֶחֶם",              t: "hayeled asah lechem",             en: "The boy made bread.",              pic: "👦🍞", audio: "st3-6" },
      { id: "st3-7", img: "img/st3-7.webp", kind: "sentence", h: "וְהַלֶּחֶם הָיָה טוֹב",              t: "vehalechem hayah tov",            en: "And the bread was good.",          pic: "🍞👍", audio: "st3-7" }
    ]
  }
];

window.DAVAR_UNITS = [
  { id: 1, title: "Things you can point at" },
  { id: 2, title: "Who and where" },
  { id: 3, title: "Things happen" }
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
    { h: "בְּרֵאשִׁית", en: "In the beginning", n: "בְּ (in) + רֵאשִׁית (beginning)", audio: "w-bereshit" },
    { h: "בָּרָא", en: "he created", n: "Verb, completed action", audio: "w-bara" },
    { h: "אֱלֹהִים", en: "God", n: "Plural form, used with a singular verb", audio: "w-elohim" },
    { h: "אֵת", en: "(object marker)", n: "Marks the definite direct object; not translated", audio: "w-et" },
    { h: "הַשָּׁמַיִם", en: "the heavens", n: "הַ (the) + שָׁמַיִם (heavens)", audio: "w-hashamayim" },
    { h: "וְאֵת", en: "and (object marker)", n: "וְ (and) + אֵת", audio: "w-veet" },
    { h: "הָאָרֶץ", en: "the earth", n: "הָ (the) + אֶרֶץ (earth)", audio: "w-haarets" }
  ]}
];
