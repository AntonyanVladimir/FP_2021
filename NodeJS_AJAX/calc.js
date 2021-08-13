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
  const urlParams = url.parse(req.url, true).pathname;
  let loesung = undefined;
  var params = urlParams.split("/");

  let operand1 = Number(params[1]);
  let operator = params[2];
  let operand2 = Number(params[3]);

  console.log(operand2);

  if (isNaN(operand1)) loesung = "opeand1 is not a number!!!";
  else if (isNaN(operand2)) loesung = "opeand2 is not a number!!!";
  else {
    switch (operator) {
      case "add":
        loesung = operand1 + operand2;
        break;
      case "sub":
        loesung = operand1 - operand2;
        break;
      case "mul":
        loesung = operand1 * operand2;
        break;
      case "div": {
        if (operand2 == 0) loesung = "can not divide by 0 !!!";
        else loesung = operand1 / operand2;
        break;
      }
      default:
        loesung = "wrong operator !!!";
        
    }
  }

  var status = 200;

  if (isNaN(loesung) || loesung === undefined) {
    status = 400;
  }

  res.writeHead(status, {
    "content-type": "text/plain",
    "Access-Control-Allow-Origin": "*",
  });

 
  res.write(loesung.toString());

  // abschließen
  res.end();
}
