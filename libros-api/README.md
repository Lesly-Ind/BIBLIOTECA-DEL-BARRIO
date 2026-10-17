# La biblioteca del barrio — NestJS

Requisito: Node.js 22 o superior.

```bash
npm install
npm start
```

API: http://localhost:3000/libros

Los datos se almacenan **solo en memoria**, sin base de datos. Reiniciar el servidor restaura los tres libros originales.

## Endpoints
- GET /libros (opcional: `?autor=Sabato`) — 200
- GET /libros/2 — 200; ID inexistente — 404
- POST /libros — 201 y cabecera `Location: /libros/4`
- PUT /libros/1 — 200, cuerpo completo
- PATCH /libros/2 — 200, solo campos a cambiar
- DELETE /libros/3 — 204, sin cuerpo

## Postman
Importa `../postman/Biblioteca.postman_collection.json`. Ejecuta la colección **con el servidor recién iniciado** y toma una captura real de las seis pruebas en verde. El orden importa porque las operaciones modifican el arreglo.

## Pruebas adicionales
`npm run test:e2e`

## Entrega
Incluye el Word contestado, esta carpeta sin `node_modules` ni `dist`, el JSON de Postman y una captura real del resultado de Postman. La captura no se incluye porque debe obtenerse al ejecutar las pruebas en tu equipo.
