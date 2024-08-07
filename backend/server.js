const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db');
const Operacion = require('./models/Operacion');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, num1, num2");
  next();
});

const operaciones = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b,
  multiplicar: (a, b) => a * b,
  dividir: (a, b) => a / b,
  potencia: (a, b) => Math.pow(a, b),
  raiz: (a) => Math.sqrt(a)
};

Object.keys(operaciones).forEach((op) => {
  app.get(`/${op}`, async (req, res) => {
    const num1 = parseFloat(req.headers.num1);
    const num2 = parseFloat(req.headers.num2);
    const result = operaciones[op](num1, num2);

    const operacion = new Operacion({ operacion: op, num1, num2, result });
    try {
      await operacion.save();
      res.status(200).send({ result });  // Devuelve 402 en caso de éxito
    } catch (error) {
      console.error('Error saving operation:', error);
      res.status(500).send({ error: 'Error saving operation' });  // Devuelve 500 en caso de error
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
