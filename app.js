const express = require("express");
const bodyParser = require('body-parser');
const app = express();

// Middleware: Permite a Express leer datos del body de las peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Sirve archivos estáticos desde las carpetas 'public' y 'assets'
app.use(express.static('public'));
app.use('/assets', express.static('assets'));

// RUTA para el cálculo del interés compuesto
app.post('/calcular-interes', (req, res) => {
    // Obtiene los datos enviados desde el front-end
    const { inversion, meses } = req.body;

    // Valida los datos
    if (isNaN(inversion) || isNaN(meses) || inversion <= 0 || meses <= 0) {
        return res.status(400).json({ error: 'Valores inválidos.' });
    }

    // Tasa de interés mensual (¡solo el servidor la conoce!)
    const tasaMensual = 0.02; 

    // Realiza el cálculo del interés compuesto
    const montoFinal = inversion * Math.pow((1 + tasaMensual), meses);

    // Envía el resultado de vuelta al front-end
    res.json({
        montoFinal: montoFinal.toFixed(2)
    });
});

// Inicia el servidor
app.listen(5000, () => {
    console.log('Servidor escuchando en el puerto 5000');
});