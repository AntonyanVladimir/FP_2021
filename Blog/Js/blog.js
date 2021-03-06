"use strict";

/**
 * Erzeugt ein DOM-Objekt für einen Blogbeitrag und liefert den DOM-Knoten
 * zurück. Der Knoten wird von der Funktion NICHT ins DOM eingehängt.
 */
function createArticle(article) {
  // Artikelinhalt zusammenbauen
  var newArticle = $(`
  <article>
  <h2><a href="artikel.html?articleId=${article.id}">
  ${article.ueberschrift} 
  </a></h2>
  <p>${article.datum} 
  Uhr von 
  article.autor 
  </p>
  <p><b>
  ${article.anriss}
  </b></p>
  </article> 
  `);

  // Text
  newArticle.append($(`<p>${article.text}</p>`));
  newArticle.append($(`<img src="${article.bild}" />`));
  // Tags einfügen
  for (var i = 0; i < article.tags.length; i++) {
    newArticle.append(
      $(
        `<a class="badge badge-pill badge-primary" href="tagliste.html?tagName=${encodeURI(
          article.tags[i]
        )}">${article.tags[i]}</a>`
      )
    );
  }

  // Social Media
  newArticle.append(
    $(`
  <div>
    <a title="Facebook" href="https://www.facebook.com/share.php?u=https%3A%2F%2Fmyblog.local%2Fartikelurl" target="_blank">Teilen auf Facebook</a> |'
    <a title="Twitter" href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fmyblog.local%2Fartikelurl&amp;text=HTML%20Dokumente&amp;via=myblog&amp;lang=de" target="_blank">Twittern</a> |
    <a href="teilenEmail.html">Teilen via E-Mail</a>
    </div>
  `)
  );

  return newArticle;
}

/**
 * Erzeugt das DOM-Objekt für die Sidebar. Hängt das Objekt NICHT ins DOM ein.
 * @param articles Array mit Artikel-Objekten
 * @returns DOM-Objekt mit der Sidebar (<aside>...)
 */
function createSidebar(articles) {
  // Login-Formular
  var sidebar =
    '<label for="login" class="col-6">Login</label> <input class="col-6" id="login" name="login" type="text" size="12" /><br>' +
    '<label for="password" class="col-6">Passwort</label> <input class="col-6" id="password" name="password" type="text" size="12" /><br>' +
    '<div class="col-12"><a class="btn btn-outline-primary btn-sm" href="#">Login</a></div>';

  // Suchformular
  sidebar +=
    '<hr class="col-12">' +
    '<div class="col-12 input-group input-group-sm pr-0">' +
    '<input id="searchquery" name="searchquery" type="text" class="form-control" aria-label="Suchen">' +
    '<div class="input-group-append">' +
    '<span id="searchBtn" class="btn btn-outline-primary">Suchen</span>' +
    "</div>" +
    "</div>";

  // Monatsliste
  sidebar +=
    '<hr class="col-12">' +
    '<ul class="list-group list-group-flush">' +
    '<li class="list-group-item"><a href="monatsliste.html">November 2017 (3)</a></li>' +
    '<li class="list-group-item"><a href="monatsliste.html">Dezember 2017 (1)</a></li>' +
    '<li class="list-group-item"><a href="monatsliste.html">März 2018 (2)</a></li>' +
    '<li class="list-group-item"><a href="monatsliste.html">April 2018 (1)</a></li>' +
    "</ul>";

  // Tagcloud
  sidebar += createTagCloud(articles);

  // Element erzeugen
  var siderow = document.createElement("div");
  // Bootstrap: row-Klasse hinzufügen
  siderow.setAttribute("class", "row");

  // HTML einhängen
  siderow.innerHTML = sidebar;

  return siderow;
}

/**
 * Erzeugt das HTML für die Tagcloud. Hängt KEIN DOM-Objekt ins DOM ein.
 * @param articles Array mit den Blogartikeln
 * @returns String mit dem HTML-Markup der Tagcloud
 */
function createTagCloud(articles) {
  // Alle Artikel durchgehen und alle Tags aufsammeln. Für die Schriftgrößen
  // benötigen wir für jedes Tag die Anzahl des Vorkommens über alle Artikel.
  // Je häufiger ein Tag vorkommt, desto größer soll es dargestellt werden.
  // Als Speicher für diese Daten bietet sich eine Map an, ein Objekt, das
  // Schlüssel-/Wert-Paare enthält. Die Schlüssel sind die Tags und die Werte
  // sind deren Häufigkeiten: {Tag1: Anzahl1, Tag2: Anzahl2, ...}

  // leeres Objekt anlegen
  var tagMap = {};

  // größte Häufigkeit eines Tags
  var max = 1;
  // Alle Artikel durchlaufen
  for (var article in articles) {
    var a = articles[article];

    // Alle Tags des Artikels durchlaufen
    for (var j = 0; j < a.tags.length; j++) {
      var tag = a.tags[j];
      // Testen, ob das Tag schon in der Map ist
      if (!(tag in tagMap)) {
        // Nein, taucht zum ersten Mal auf
        // --> mit Anzahl 1 in die Map schreiben
        tagMap[tag] = 1;
      } else {
        // war schon da, Anzahl erhöhen
        tagMap[tag]++;
        // Maximum ggf. anpassen
        if (tagMap[tag] > max) {
          max = tagMap[tag];
        }
      }
    }
  }

  // Schriftgröße nach Häufigkeit festlegen. Es gibt fünf Schriftgrößen,
  // die gleichverteilt von 1 bis Maximum vergeben werden:
  // Bsp.: Maximum ist 40
  // Häufigkeit  1 -  8: Schriftgröße 1
  // Häufigkeit  9 - 16: Schriftgröße 2
  // Häufigkeit 17 - 24: Schriftgröße 3
  // Häufigkeit 25 - 32: Schriftgröße 4
  // Häufigkeit 33 - 40: Schriftgröße 5

  // HTML mit den Tags erzeugen
  var tagcloud = '<hr class="col-12"><div class="col-12">';

  // alle Tags in der Map durchlaufen
  for (tag in tagMap) {
    // Entsprechend der Häufigkeit des Tags die Schriftgröße zuweisen
    // Schriftgröße bestimmen, nach Häufigkeit in fünf Klassen 1 - 5 einordnen
    // Häufigkeit des Tags steht in tagMap[tag]
    var size = Math.ceil(Math.floor(tagMap[tag] / (max / 5.0)));

    tagcloud +=
      '<a class="tag-' + size + '" href="tagliste.html">' + tag + "</a> ";
  }

  tagcloud += "</div>";

  return tagcloud;
}

function getArtListe(tagName) {
  console.log(tagName);
  let articleUeberschrifts = [];
  for (var article in articles) {
    var a = articles[article];
    for (var tag of a.tags) {
      if (tag === tagName) {
        articleUeberschrifts.push(a.ueberschrift);
        continue;
      }
    }
  }

  console.log(articleUeberschrifts);
  return articleUeberschrifts;
}

function Search(searchQuery) {
  console.log(searchQuery);
  var searchedArticles = [];
  for (var article in articles) {
    var a = articles[article];
    for (var prop in a) {
      if (prop == "datum" || prop == "id" || prop == "bild" || prop == "tags")
        continue;
      if (a[prop])
        if (a[prop].search(searchQuery) != -1){
          if (searchedArticles.indexOf(a) == -1)
           searchedArticles.push(a);
        }
    }
  }

  return searchedArticles;
}


function ImplementSearch(){
  //implementSearch
	let searchBtn = document.getElementById("searchBtn");
	searchBtn.addEventListener("click",()=>{
		let searchQuery = document.getElementById("searchquery").value;
		searchBtn.addEventListener("click", ()=>{
			location.href = `suchergebnis.html?searchQuery=${searchQuery}`;
		});
	})
}
