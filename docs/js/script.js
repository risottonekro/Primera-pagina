// Este código se ejecuta en el navegador del usuario

// Obtén el formulario por su ID
// Este código se ejecuta en el navegador del usuario
const forminv = document.getElementById('inversion22');
const resultadoElement = document.getElementById('resultado');

forminv.addEventListener('submit', async function (event) {
  event.preventDefault();

  const inversionInput = document.getElementById('inversioon');
  const mesesInput = document.getElementById('meses');

  // Obtiene los valores de los inputs
  const inversion = parseFloat(inversionInput.value);
  const meses = parseInt(mesesInput.value);

  // Valida que los campos no estén vacíos en el front-end
  if (isNaN(inversion) || isNaN(meses) || inversion <= 0 || meses <= 0) {
    resultadoElement.textContent = 'Por favor, ingresa valores válidos.';
    return;
  }

  try {
    // Envía los datos al servidor usando fetch
    const response = await fetch('/calcular-interes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inversion, meses }) // Convierte los datos a JSON
    });

    const data = await response.json();

    // Si el servidor envía un error, lo mostramos
    if (response.status !== 200) {
      resultadoElement.textContent = `Error: ${data.error}`;
      return;
    }

    // Muestra el resultado recibido del servidor
    resultadoElement.textContent = `Tu inversión de $${inversion.toFixed(2)} crecerá a $${data.montoFinal} en ${meses} meses.`;

    // Muestra la información en la consola
    console.log('Monto final recibido del servidor:', data.montoFinal);

  } catch (error) {
    resultadoElement.textContent = 'Ocurrió un error al conectar con el servidor.';
    console.error('Error:', error);
  }
});
