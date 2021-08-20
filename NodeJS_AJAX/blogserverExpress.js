const express = require("express");

const fs = require("fs");
var cors = require('cors')
const app = express();
app.use(cors());
let filename = __dirname + "/data.json";

let ARTICLES = [];
try {
  let filedata = fs.readFileSync(filename);
  ARTICLES = JSON.parse(filedata);
  console.log(ARTICLES.length + " Datensätze eingelesen.");
} catch (err) {
  console.log(err);
  // Datei existiert nicht, wir müssen nichts tun
  console.log("Keine Datensätze eingelesen.");
}

const port = 3000;

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/artikels", (req, res) => {
  let artikels = fs.readFileSync(filename);
  res.send(JSON.parse(artikels)).status(200);
  res.end();
});

app.get("/artikels/:id", (req, res) => {
  let artikel = undefined;
  let status = 200;
  const id = req.params.id;
  if (id) {
    let artikels = JSON.parse(fs.readFileSync(filename));
    let art = artikels.find((m) => m.id === id);
    if (art) artikel = art;
    else {
      artikel = `Artikel mit der Id ${id} kann nicht gefunden werden...`;
      status = 404;
    }
  } else {
    status = 400;
  }

  res.send(JSON.stringify(artikel)).status(status);
  res.end();
});

app.put("/artikels/:id", (req, res) => {
  let id = req.params.id;
  let artikel = ARTICLES.find((m) => m.id);
  if (artikel) {
    let index = ARTICLES.indexOf(artikel);
    ARTICLES[index] = req.body;
  }

  artikel = req.body;

  res.send("Ist aktualisiert").status(200);
});
app.post("/artikels", (req, res) => {
  let artikel = req.body;
  if (ARTICLES.find((m) => m.id === artikel.id))
    res
      .send(`Artikel mit der id ${artikel.id} bereits existiert...`)
      .status(400);
  else {
    artikel.id = Number(ARTICLES[ARTICLES.length - 1].id) + 1;
    ARTICLES.push(artikel);
  }

  res.send(`ein neues Artikel mit der id ${artikel.id} wurde hinzugefügt.`);
});

app.get("/tags", (req, res) => {
  const tags = getTagMap();
  res.send(JSON.stringify(tags));
});

// Alle sonstigen
app.get("*", function (req, res) {
  let result = { error: "Anfrage nicht unterstützt." };

  res.contentType("application/json");
  res.status(400).send(JSON.stringify(result));
});

app.listen(port, (req, res) => {
  console.log(`Listenung to PORT ${port}...`);
});

// function updateFile() {
//   fs.writeFileSync(__dirname + "/data.json", JSON.stringify(ARTICLES));
// }

function getTagMap() {
  var tagMap = {};

  // größte Häufigkeit eines Tags
  var max = 1;
  // Alle Artikel durchlaufen
  for (var article in ARTICLES) {
    var a = ARTICLES[article];

    // Alle Tags des Artikels durchlaufen
    if (a.tags) {
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
  }
  return tagMap;
}
