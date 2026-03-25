# 🛒 E-Commerce — Portafolio Módulo 9

## 🌐 Demo en vivo
https://portafolio-ecommerce-mod8.onrender.com/

API REST desarrollada con Node.js + Express + PostgreSQL, incluye autenticación con JWT + bcrypt + Bootstrap. También incluye Carrito de compras y Upload de imagen.
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)


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
