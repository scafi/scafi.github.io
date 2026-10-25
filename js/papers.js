// Renders assets/biblio.bib: the paper list on the Papers page and inline citations ([data-cite]) in the Docs.

const clean = (value) => value.replace(/[{}]/g, "").replace(/\s+/g, " ").trim();

// Reads the value starting at src[i] ({...} with nesting, "..." or a bare word); returns [value, nextIndex].
function readValue(src, i) {
  if (src[i] === "{") {
    let depth = 0, j = i;
    do {
      if (src[j] === "{") depth++;
      else if (src[j] === "}") depth--;
      j++;
    } while (depth > 0 && j < src.length);
    return [src.slice(i + 1, j - 1), j];
  }
  if (src[i] === '"') {
    const j = src.indexOf('"', i + 1);
    return [src.slice(i + 1, j), j + 1];
  }
  const bare = /[^,}\s]+/y;
  bare.lastIndex = i;
  const word = bare.exec(src)[0];
  return [word, i + word.length];
}

export function parseBibtex(src) {
  const entries = [];
  const head = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g;
  const field = /\s*([\w-]+)\s*=\s*/y;
  const separator = /\s*,?/y;
  let match;
  while ((match = head.exec(src))) {
    const entry = { type: match[1].toLowerCase(), key: match[2] };
    let i = head.lastIndex;
    for (field.lastIndex = i; field.exec(src); field.lastIndex = i) {
      const name = src.slice(i, field.lastIndex).split("=")[0].trim().toLowerCase();
      const [value, next] = readValue(src, field.lastIndex);
      entry[name] = clean(value);
      separator.lastIndex = next;
      separator.exec(src);
      i = separator.lastIndex;
    }
    head.lastIndex = i;
    entries.push(entry);
  }
  return entries;
}

export function formatAuthors(authors) {
  const names = authors.split(/\s+and\s+/).map((name) =>
    name.includes(",") ? name.split(",").reverse().map((part) => part.trim()).join(" ") : name);
  return names.length < 3 ? names.join(" and ") : `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`;
}

function element(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

function paper(entry) {
  const item = element("article", "paper");
  const title = element(entry.url ? "a" : "span", "paper-title", entry.title);
  if (entry.url) title.href = entry.url;
  const venue = entry.journal || entry.booktitle || entry.school || entry.publisher;
  const meta = [entry.author && formatAuthors(entry.author), venue, entry.year].filter(Boolean).join(" · ");
  item.append(title, element("div", "paper-meta", meta));
  if (entry.note) item.append(element("div", "paper-note", entry.note));
  return item;
}

const groups = [
  ["Journal Articles", ["article"]],
  ["Books and Book Chapters", ["book", "incollection"]],
  ["Conference and Workshop Papers", ["inproceedings"]],
  ["Theses and Other Publications", ["phdthesis", "mastersthesis", "bachelorsthesis", "misc", "techreport"]],
];

function renderPapers(container, entries) {
  for (const [heading, types] of groups) {
    const papers = entries.filter((e) => types.includes(e.type)).sort((a, b) => b.year - a.year);
    if (!papers.length) continue;
    const section = element("section", "paper-group");
    section.append(element("h2", null, `${heading} (${papers.length})`), ...papers.map(paper));
    container.append(section);
  }
}

if (typeof document !== "undefined") {
  const targets = document.querySelectorAll("#paper-list, [data-cite]");
  try {
    const response = await fetch(new URL("../assets/biblio.bib", import.meta.url));
    const entries = parseBibtex(await response.text());
    const byKey = new Map(entries.map((e) => [e.key, e]));
    document.querySelectorAll("[data-cite]").forEach((el) =>
      el.append(...el.dataset.cite.split("|").filter((k) => byKey.has(k)).map((k) => paper(byKey.get(k)))));
    const list = document.getElementById("paper-list");
    if (list) renderPapers(list, entries);
  } catch {
    targets.forEach((el) => el.append(element("p", "paper-note", "The bibliography could not be loaded.")));
  }
}
