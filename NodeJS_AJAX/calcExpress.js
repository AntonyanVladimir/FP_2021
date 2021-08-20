const express = require('express');
const path = require('path');
const app = express()
const port = 3000
app.use(express.static('public'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/add/:operand1/:operand2', (req, res) => {
    let ergebnis = undefined;
    const operand1 = Number(req.params.operand1);
    const operand2 = Number(req.params.operand2);

    if(isNaN(operand1) || isNaN(operand2))
     ergebnis = "Als Operanden sind nur Zahlen akzeptiert.";
     else
         ergebnis = operand1 + operand2;
         

    res.send(ergebnis.toString());
    res.end();
})
app.get('/sub/:operand1/:operand2', (req, res) => {
    let ergebnis = undefined;
    const operand1 = Number(req.params.operand1);
    const operand2 = Number(req.params.operand2);

    if(isNaN(operand1) || isNaN(operand2))
     ergebnis = "Als Operanden sind nur Zahlen akzeptiert.";
     else
         ergebnis = operand1 - operand2;
         

    res.send(ergebnis.toString());
    res.end();
})

app.get('/mul/:operand1/:operand2', (req, res) => {
    let ergebnis = undefined;
    const operand1 = Number(req.params.operand1);
    const operand2 = Number(req.params.operand2);

    if(isNaN(operand1) || isNaN(operand2))
     ergebnis = "Als Operanden sind nur Zahlen akzeptiert.";
     else
         ergebnis = operand1 * operand2;
         

    res.send(ergebnis.toString());
    res.end();
})

app.get('/div/:operand1/:operand2', (req, res) => {
    let ergebnis = undefined;
    const operand1 = Number(req.params.operand1);
    const operand2 = Number(req.params.operand2);

    if(isNaN(operand1) || isNaN(operand2))
     ergebnis = "Als Operanden sind nur Zahlen akzeptiert.";
     else
         ergebnis = operand1 / operand2;
         

    res.send(ergebnis.toString());
    res.end();
})


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})