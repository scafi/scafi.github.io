---
layout: page
title: Papers
permalink: /papers/
main: true
custom_js:
- https://cdn.rawgit.com/pcooksey/bibtex-js/5ccf967/src/bibtex_js.js
---


# Papers

<bibtex src="{{ '/assets/biblio.bib' | relative_url }}"></bibtex>

<div class="bibtex_structure">
  <div class="sections bibtextypekey">
    <div class="section @article">
      <h3>Journal Articles</h3>
      <div class="sort year" extra="DESC number">
        <div class="templates"></div>
      </div>
    </div>
    <div class="section @book">
      <h3>Books</h3>
      <div class="sort year" extra="DESC number">
        <div class="templates"></div>
      </div>
    </div>
    <div class="section @inproceedings">
      <h3>Conference and Workshop Papers</h3>
      <div class="sort year" extra="DESC number">
        <div class="templates"></div>
      </div>
    </div>
    <div class="section @misc|@phdthesis|@mastersthesis|@bachelorsthesis|@techreport">
      <h3>Other Publications</h3>
      <div class="sort year" extra="DESC number">
        <div class="templates"></div>
      </div>
    </div>
  </div>
</div>

<div class="bibtex_template">
  <div class="if author">
  <span class="author"><span class="first"></span> <span class="last"></span></span>
  </div>
  <div>
    <span class="if booktitle"><span class="booktitle"></span>.</span>
    <span class="if journal"><span class="journal"></span>.</span>
    <span class="if year">
      <span class="year"></span>.
    </span>
    <span class="if url">
      <a class="url">(view online)</a>
    </span>
  </div>
  <div class="paperTitle">
    <span class="title"></span>
  </div>
  <span class="if note">
  <div>
  <span class="label">Short summary:</span>
    <span class="note"></span>
  </div>
  </span>
</div>

<div id="bibtex_display"></div>
