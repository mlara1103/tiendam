# Guía breve para demostrar el proyecto

## Flujo sugerido de presentación

1. Abre el catálogo y muestra que se adapta al ancho de la pantalla.
2. Entra a **Administrar** y crea un disco con una portada desde el PC.
3. Edita el producto recién creado y cambia precio, stock o portada.
4. Abre la vista individual del producto.
5. Agrégalo al carrito, cambia la cantidad y continúa al checkout.
6. Intenta comprar con campos vacíos para mostrar la validación.
7. Completa los datos y confirma la compra simulada.
8. Regresa a Administración y elimina el producto de prueba.

## Qué explicar en la entrevista

- El backend sigue una separación por rutas, controladores, modelos y middleware.
- Multer valida tipo y tamaño de archivo; las portadas se guardan en `server/uploads`.
- Al reemplazar o eliminar una portada, el archivo anterior también se elimina.
- El carrito vive en Context API y se conserva en `localStorage`.
- Axios centraliza la comunicación con la API.
- El checkout está separado en su propia ruta y no procesa pagos reales.
- El diseño utiliza CSS responsive sin depender de una librería visual.
- Para producción real, las imágenes deberían ir a almacenamiento persistente como S3 o Cloudinary.

## Endpoints

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
GET    /api/health
```

Los métodos `POST` y `PUT` usan `multipart/form-data`. El campo de archivo se llama `image`.
