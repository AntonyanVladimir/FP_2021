// HTTP Modul einbinden
var http = require("http");

// URL Modul einbinden
var url = require("url");

// HTTP Server erzeugen
var server = http.createServer(serve);

// Server an Port binden
server.listen(3300);

// Funktion des HTTP-Servers
// req: Anfrage vom Client (Request)
// res: Antwort des Servers (Response)
function serve(req, res) {
  const urlFromServer = url.parse(req.url, true);
  var ergebnis = undefined;
  var contentType = "application/json";
  var statusCode = 200;
  let params = urlFromServer.pathname.split("/");
  let queryParams = urlFromServer.query;
  let tag = queryParams["tag"];
  let suchwort = queryParams["suchwort"];
  if (tag) {
    ergebnis = JSON.stringify(artikels.filter((m) => !m.tags.includes(tag)));
  } else if (suchwort) {
    ergebnis = JSON.stringify(getBySuchwort(suchwort));
  } else {
    if (params[1] === "artikels" && !Number.isNaN(Number(params[2]))) {
      let artikel = artikels.find((m) => m.id === params[2]);

      if (artikel) {
        ergebnis = JSON.stringify(artikel);
      } else {
        ergebnis = `Artikel mit der id ${params[2]} wurde nicht gefunden.`;
        statusCode = 404;
        contentType = "text/plain";
      }
    } else if (params[1] === "artikels" || urlFromServer.pathname === "/") {
      ergebnis = JSON.stringify(artikels);
    } else {
      ergebnis = "Die Seite wurde nicht gefunden...";
      statusCode = 404;
      contentType = "text/plain";
    }
  }

  res.writeHead(statusCode, {
    "content-type": contentType,
    "Access-Control-Allow-Origin": "*",
  });

  res.write(ergebnis);
}
function getBySuchwort(suchwort) {
  var arts = [];
  artikels.forEach((artikel) => {
    for (let [key, value] of Object.entries(artikel)) {
      if (
        key == "text" ||
        key == "ueberschrift" ||
        key == "autor" ||
        key == "anriss"
      ) {
        if (value.search(suchwort) == -1) {
          continue;
        } else arts.push(artikel);
      }
    }
  });
  return arts;
}

const artikels = [
  {
    id: "7",
    ueberschrift: "HTML Dokumente",
    autor: "Thomas Richter",
    datum: new Date("17. Januar 2018 20:48").toISOString().substr(0, 10),
    anriss: "Eine kurze Einführung in HTML-Dokumente",
    text:
      "HTML Dokumente dienen der Strukturierung von Inhalten, die im Web bzw. mit Webtechnologien wie Internetbrowser und Hypertext Transfer Protocol (HTTP) verbreitet werden sollen. HTML Dokumente bestehen aus HTML-Elementen. Das einfachste HTML5 Dokument ist: <br>" +
      "<pre>" +
      "&lt;!DOCTYPE html&gt;\n" +
      "&lt;html&gt;\n" +
      "  &lt;head&gt;\n" +
      "    &lt;title&gt;Titel des Dokuments&lt;/title&gt;\n" +
      "  &lt;/head&gt;\n" +
      "  &lt;body&gt;\n" +
      "  &lt;/body&gt;\n" +
      "&lt;/html&gt;\n" +
      "</pre>",
    bild: "https://cdn.pixabay.com/photo/2019/06/12/21/10/ocean-4270251_1280.jpg",
    tags: ["HTML5", "Dokument", "HTTP"],
  },
  {
    id: "8",
    ueberschrift: "HTML Elemente",
    autor: "Thomas Richter",
    datum: new Date("16. Januar 2018 21:14").toISOString().substr(0, 10),
    anriss: "Eine kurze Einführung in HTML Elemente",
    text: 'Die HTML Elemente eines HTML Dokuments sind ineinander geschachtelt und bilden damit eine hierarchische Struktur, einen Baum. Ein Element besteht üblicherweise aus einem öffnenden und einem schließenden Tag. Zwischen den beiden Tags befindet sich der eigentliche Inhalt des Elements.<br> Weiterhin können im öffnenden Tag Attribute in Form von Schlüssel-Wert Paaren notiert werden.<br><br>Beispiel: <code>&lt;a href="https://w3.org"&gt;Das ist ein Link auf ein anderes HTML-Dokument (W3C)&lt;/a&gt;</code> wird dargestellt als:<br><br><a href="https://w3.org">Das ist ein Link auf ein anderes HTML-Dokument (W3C)</a>',
    bild: "https://cdn.pixabay.com/photo/2021/07/28/19/02/macroperspective-6503070_1280.jpg",
    tags: ["HTML5", "Element"],
  },
  {
    id: "9",
    ueberschrift: "Semantische Strukturierung von HTML-Seiten",
    autor: "Thomas Richter",
    datum: new Date("16. Januar 2018 19:03").toISOString().substr(0, 10),
    anriss: "Ein kurzer Überblick über semantische Elemente in HTML5.",
    text: "In der Vergangenheit wurden HTML-Dokumente häufig mit Tabellen oder Frames (ok, sehr weit zurückliegende Vergangenheit...) strukturiert. Später wurden dafür <code>&lt;div&gt;</code>-Elemente verwendet. In HTML5 gibt es Elemente, die es erlauben, den einzelnen Teilen des Dokuments eine Semantik zu verleihen, die von modernen Browsern ausgewertet wird und ggf. die Darstellung - z. B. auf Mobilgeräten und in Readern - beeinflusst. Beispielsweise lässt sich ein Dokument mit den Elementen <code>&lt;header&gt;, &lt;main&gt;, &lt;footer&gt;</code> grob in Kopf-, Inhalts- und Fußbereich unterteilen. Weitere semantische Elemente sind <code>&lt;nav&gt;, &lt;aside&gt;, &lt;article&gt;, &lt;section&gt;</code>",
    bild: "https://cdn.pixabay.com/photo/2021/07/30/04/17/orange-6508617_1280.jpg",
    tags: ["Semantik", "HTML5", "Element"],
  },
];
