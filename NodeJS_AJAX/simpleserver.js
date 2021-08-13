// HTTP Modul einbinden
var http = require('http');

// URL Modul einbinden
var url = require('url');

// HTTP Server erzeugen
var server = http.createServer(serve);

// Server an Port binden
server.listen(3000);

// Funktion des HTTP-Servers
// req: Anfrage vom Client (Request)
// res: Antwort des Servers (Response)
function serve(req, res) {

	// Map mit den Antworten
	var answers = {
		order: {
			food: ['fish and chips', 'tomato soup', 'mashed potatoes', 'candy bar'],
			drink: ['milk', 'orange juice', 'sparkling water']
		},
		location: {
			river: ['ruhr', 'colorado', 'thames', 'rhine'],
			city: ['kamp-lintfort', 'cologne', 'kleve', 'essen']
		}
	};
	
	// URL
	console.log(req.url);

	// URL parsen, QueryString ermitteln
	var qs = url.parse(req.url, true).query;
	
	console.log(qs);

	// Platzhalter für die Antwort
	var answer = undefined;

	// wir wissen nicht, welcher Schlüssel (order oder location) im Querystring
	// enthalten ist --> versuchen beide
	// qs.order ist der Wert, den der Schlüssel order des Querystrings hat,
	// also 'food' oder 'drink'
	switch (qs.order) {
	case 'food':
	case 'drink':
		// answers.order ist das Attribut order des Objekts answers. Es enthält
		// die beiden Arrays food und drink
		// Auf Attribute von Objekten kann mit [attributname] zugegriffen werden.
		// Das ist sinnvoll, wenn der Name des Attributs dynamisch bestimmt wird.
		// answers.order[qs.order] ist also entweder
		// answers.order['food'] bzw. answers.order.food
		// oder
		// answers.order['drink'] bzw. answers.order.drink
		// Beide sind Arrays.
		var len = answers.order[qs.order].length;
		answer = answers.order[qs.order][Math.floor(Math.random() * len)];
		break;
	}
	
	// Für location gelten die Kommentare von order analog
	switch (qs.location) {
	case 'river':
	case 'city':
		var len = answers.location[qs.location].length;
		answer = answers.location[qs.location][Math.floor(Math.random() * len)];
		break;
	}
	
	// Status
	var status = 200;
	
	// Keine Antwort gesetzt: Fehler
	if (answer === undefined) {
		status = 400;
		answer = 'bad request';
	}
	
	res.writeHead(status, {
		'content-type': 'text/plain',
		'Access-Control-Allow-Origin': 'null'
	});
	
	res.write(answer);
	
	// abschließen
	res.end();
}
