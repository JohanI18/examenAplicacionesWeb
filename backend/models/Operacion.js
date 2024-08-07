const mongoose = require('mongoose');

const operacionSchema = new mongoose.Schema({
  operacion: String,
  num1: Number,
  num2: Number,
  result: Number,
  date: { type: Date, default: Date.now }
});

const Operacion = mongoose.model('Operacion', operacionSchema);

module.exports = Operacion;
