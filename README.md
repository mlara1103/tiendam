# GrooveShelf — Mini tienda MERN de discos

Proyecto completo para una prueba técnica: catálogo, CRUD de productos, vista individual, carrito persistente, subida de portadas desde el PC con Multer y checkout simulado con validación básica.

## Tecnologías

- MongoDB + Mongoose
- Express + Node.js
- React + React Router
- Axios
- Multer
- Vite

## Funciones incluidas

- CRUD completo de productos.
- Portadas subidas desde el computador (`jpg`, `jpeg`, `png`, `webp`, máximo 5 MB).
- Eliminación de la imagen anterior al reemplazarla y al borrar un producto.
- Vista de detalle de cada disco.
- Carrito con cantidades y persistencia en `localStorage`.
- Checkout en una ruta diferente, con validación mínima y confirmación simulada.
- Buscador y filtro por género.
- Diseño responsive y profesional.
- Cabecera central personalizable y espacios reservados para banners laterales.
- Estados de carga, vacío y error.
- Semilla opcional con productos de ejemplo.

## Requisitos

- Node.js 20 o superior.
- MongoDB local o una conexión de MongoDB Atlas.

## Instalación rápida

Desde la carpeta raíz:

```bash
npm run setup
```

El comando `setup` instala las dependencias de `server` y `client`, y crea `server/.env` automáticamente.

Revisa este archivo:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/grooveshelf
CLIENT_URL=http://localhost:5173
```

Para cargar discos de ejemplo:

```bash
npm run seed
```

Para iniciar frontend y backend a la vez:

```bash
npm run dev
```

Para comprobar el flujo durante una entrevista, revisa `GUIA_PRUEBA_TECNICA.md`.

- Tienda: `http://localhost:5173`
- API: `http://localhost:5000/api/products`

## Build de producción

```bash
npm run build
npm start
```

Después del build, Express sirve tanto la API como el frontend compilado desde el mismo proceso.

## Ejecución por separado

Backend:

```bash
cd server
npm install
npm run dev
```

Frontend:

```bash
cd client
npm install
npm run dev
```

## Personalización visual

- Texto de la cabecera: `client/src/components/StoreHero.jsx`
- Banners laterales: `client/src/components/SideBanner.jsx`
- Colores, tamaños y responsive: `client/src/styles.css`
- Nombre/logo de la tienda: `client/src/components/Header.jsx`

## Estructura

```text
mini-tienda-discos-mern/
├── client/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── utils/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── uploads/
└── scripts/
```

## Notas para producción

Este proyecto guarda archivos en el disco local del servidor. En servicios con almacenamiento efímero conviene reemplazar Multer local por Cloudinary, Amazon S3 u otro almacenamiento persistente. El checkout es una simulación: no procesa pagos reales ni guarda pedidos.
