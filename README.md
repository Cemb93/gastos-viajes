# Presupuesto de viaje

Formulario responsive con React, Vite y TypeScript, inspirado en la hoja de presupuesto compartida.

## Requisitos
- Node.js LTS
- npm

## Ejecutar
1. Descomprime el proyecto.
2. Abre una terminal dentro de la carpeta `presupuesto-viaje`.
3. Ejecuta `npm install`.
4. Ejecuta `npm run dev` y abre la dirección que indique Vite.
npm run dev -- --host
5. Para comprobar la compilación, ejecuta `npm run build`.

## Incluye
- Fecha, empresa de transporte, origen, destino y anticipo real.
- Gastos en dos columnas: conductor, cargue, descargue, comisión, peaje, otros, ACPM/GAS, montada, calibración, aceite, engrasada, parqueadero, lavado, aseo y hotel.
- Formato monetario COP al escribir.
- Total de gastos calculado automáticamente.
- Notas extras y descarga como PDF o PNG.

No incluye flete ni saldo. Los datos se mantienen en el estado del navegador; no hay base de datos conectada.
