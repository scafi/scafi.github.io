// Run with: node --test test/
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../js/papers.js", import.meta.url), "utf8");
const { parseBibtex, formatAuthors } = await import("data:text/javascript," + encodeURIComponent(source));
const bib = await readFile(new URL("../assets/biblio.bib", import.meta.url), "utf8");

test("parses every entry of the site bibliography", () => {
  const entries = parseBibtex(bib);
  assert.equal(entries.length, bib.match(/^@/gm).length);
  for (const e of entries) {
    assert.ok(e.title, `${e.key} has a title`);
    assert.match(e.year, /^\d{4}$/, `${e.key} has a year`);
  }
});

test("reads braced, quoted, bare and multi-line values", () => {
  const [e] = parseBibtex('% comment\n@Article{k,\n title = {A {B} c},\n author="Casadei, Roberto and\n   Viroli, Mirko",\n _editor = {X},\n year = 2020\n}');
  assert.deepEqual([e.type, e.key, e.title, e.author, e.year], ["article", "k", "A B c", "Casadei, Roberto and Viroli, Mirko", "2020"]);
});

test("formats author lists", () => {
  assert.equal(formatAuthors("Casadei, Roberto"), "Roberto Casadei");
  assert.equal(formatAuthors("Casadei, Roberto and Mirko Viroli"), "Roberto Casadei and Mirko Viroli");
  assert.equal(formatAuthors("A B and C D and E F"), "A B, C D, and E F");
});
