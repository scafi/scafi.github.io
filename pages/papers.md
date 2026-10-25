---
layout: page
title: Papers
permalink: /papers/
excerpt: Bibliography related to the ScaFi aggregate programming toolkit. This page includes relevant peer-reviewed articles that describe or leverage ScaFi.
main: true
order: 4
custom_js:
- https://cdn.jsdelivr.net/npm/moment@2.22.2/min/moment.min.js
- /js/bibtex_js.js
---


# Papers

{% include cite.html %}

<bibtex src="{{ '/assets/biblio.bib' | relative_url }}"></bibtex>

<div class="bibtex_structure">
  <div class="sections bibtextypekey">
    <div class="section @article">
      <h3>Journal Articles</h3>
      <div class="sort year" extra="DESC number">
        <div class="templates"></div>
      </div>
    </div>
    <div class="section @book|@incollection">
      <h3>Books and Book Chapters</h3>
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
      <h3>Other Publications (theses, tech reports...)</h3>
      <div class="sort year" extra="DESC number">
        <div class="templates"></div>
      </div>
    </div>
  </div>
</div>

<div class="bibtex_template">
  <div class="paperTitle"><span class="title"></span></div>
  <div class="paper-meta">
    <span class="if author"><span class="author"><span class="first"></span> <span class="last"></span></span>.</span>
    <span class="if journal"><em><span class="journal"></span></em>,</span>
    <span class="if booktitle"><em><span class="booktitle"></span></em>,</span>
    <span class="if year"><span class="year"></span>.</span>
    <span class="if url"><a class="url">Link</a></span>
  </div>
  <div class="if note"><div class="paper-note"><span class="note"></span></div></div>
</div>

<div id="bibtex_display"></div>
