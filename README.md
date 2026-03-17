# 🛒 E-Commerce — Portafolio Módulo 8

API REST con Node.js + Express + PostgreSQL + JWT + bcrypt + Bootstrap.

## Instalación

npm install
cp .env.example .env
# credenciales de PostgreSQL
npm run dev


App en **http://localhost:3000**

---

## Variables de entorno (.env)

```
DATABASE_URL=postgres://postgres:password@localhost:5432/ecommerce_db
JWT_SECRET=clave_secreta_muy_larga
PORT=3000
```

---

## Endpoints

### Auth
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | ❌ |
| POST | `/api/auth/login` | Login → devuelve JWT | ❌ |

### Productos
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/products` | Listar productos | ✅ JWT |
| POST | `/api/products` | Crear producto | ✅ JWT |
| DELETE | `/api/products/:id` | Eliminar producto | ✅ JWT |

### Carrito
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/cart` | Ver carrito | ✅ JWT |
| POST | `/api/cart` | Agregar producto | ✅ JWT |
| DELETE | `/api/cart/:productId` | Eliminar del carrito | ✅ JWT |

### Upload
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/upload` | Subir imagen | ✅ JWT |

---

## Códigos HTTP usados

| Código | Situación |
|--------|-----------|
| 200 | OK — lectura / logout |
| 201 | Created — registro, producto, carrito, upload |
| 400 | Bad Request — datos inválidos o faltantes |
| 401 | Unauthorized — token inválido o faltante |
| 404 | Not Found — recurso no existe |
| 409 | Conflict — email ya registrado |
| 415 | Unsupported Media Type — tipo de archivo inválido |
| 500 | Internal Server Error |

---

## Seguridad
- Contraseñas hasheadas con **bcrypt** (10 rondas)
- Rutas protegidas con **JWT** (expira en 8h)
- Validación de archivos por extensión y tamaño
- Variables sensibles en **.env**
