# 📝 CRUD Blog API - Node.js + PostgreSQL

[![CI Pipeline](https://github.com/fedemarty/crud-blog-nodejs-postgresql/actions/workflows/ci.yml/badge.svg)](https://github.com/fedemarty/crud-blog-nodejs-postgresql/actions/workflows/ci.yml)

Una API REST completa para gestión de blogs desarrollada con Node.js, Express.js, TypeScript, Sequelize y PostgreSQL. Incluye validaciones con Zod, pruebas unitarias con Jest, CI/CD con GitHub Actions, y containerización con Docker.

## ✨ Características

- ✅ **CRUD Completo**: Create, Read, Update, Delete para blogs
- ✅ **TypeScript**: Tipado estático para mayor robustez
- ✅ **Pruebas Unitarias**: 15 pruebas con Jest (100% de cobertura en controladores)
- ✅ **Validaciones**: Esquemas Zod para validación de entrada
- ✅ **Docker**: Containerización con multi-stage build
- ✅ **Base de Datos**: PostgreSQL con Sequelize ORM
- ✅ **Variables de Entorno**: Configuración flexible
- ✅ **Paginación**: Sistema de paginación integrado
- ✅ **CI/CD**: Pipeline automatizado con GitHub Actions

## 🛠️ Tecnologías

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **Base de Datos**: PostgreSQL
- **ORM**: Sequelize
- **Validación**: Zod
- **Testing**: Jest + Supertest
- **Containerización**: Docker + Docker Compose 

## 📋 API Endpoints

These are the methods chosen on the Postman which is used for testing the endpoints.

| Method   | Description                              |
| -------- | ---------------------------------------- |
| `GET`    | Used to retrieve a single item or collection of items. |
| `POST`   | Used when creating new items e.g. a new blog |
| `PATCH`  | Used to update one or more fields on an item e.g. update title of a blog. |
| `DELETE` | Used to delete an item.                  |

## Endpoints

Now that we’ve learned about the anatomy of our endpoints and the different request methods that we should use, it’s time for some examples: 

`BASE_URL: http://localhost:8081`

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/blogs`                             | Retrieve all blogs.    
| `GET`    | `/api/blogs/:id`                             | Retrieve a blog.                   |
| `POST`   | `/api/blogs`                             | Create a new blog.                       |
| `PATCH`    | `/api/blogs/:id`                          | Update a blog.                    |
| `DELETE`  | `/api/blogs/:id`                          | Delete a blog.                 |
| `GET`  | `/api/healthchecker`                          | To test succession of the API.                 |

## Technologies

* [Node](https://nodejs.org/en) should be installed on your PC. 
* [PostgreSQL](https://www.postgresql.org/download/) needs to be installed and running.
* [Docker](https://www.docker.com/) should be installed and Makefile is in the repository folder to create compose docker.
* [Postman](https://www.postman.com/) to perform CRUD operations on the backend database.

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/fedemarty/crud-blog-nodejs-postgresql.git
cd crud-blog-nodejs-postgresql
```

### 2. Instalar dependencias
```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto:

```env
# Configuración de PostgreSQL
DATABASE_URL=postgresql://usuario:password@localhost:5432/blog_db

# Configuración del servidor
PORT=8081
NODE_ENV=development
```

### 4. Ejecutar la aplicación

#### Modo Desarrollo
```bash
npm start
# o
yarn start
```

#### Modo Producción
```bash
npm run build
npm run start:prod
```

## 🐳 Docker

### Usar Docker Compose (Recomendado)
```bash
# Construir y ejecutar
docker-compose up --build

# En segundo plano
docker-compose up -d --build

# Ver logs
docker-compose logs -f api

# Parar servicios
docker-compose down
```

## 🧪 Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

### Cobertura de Pruebas Actual
- ✅ **15 pruebas unitarias** (todas pasando)
- ✅ **Controladores**: 100% cobertura
- ✅ **Casos de éxito y error** cubiertos
- ✅ **Validaciones de entrada** probadas
- ✅ **Manejo de errores** verificado

## 📊 Modelo de Datos

### Blog Entity
```typescript
{
  id: string (UUID, Primary Key),
  title: string (Requerido, Único),
  description: string (Requerido),
  category: string (Opcional),
  published: boolean (Default: false),
  createdAt: Date (Auto-generado),
  updatedAt: Date (Auto-actualizado)
}
```

## 🎯 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| Desarrollo | `npm start` | Inicia servidor con hot-reload |
| Construcción | `npm run build` | Compila TypeScript |
| Producción | `npm run start:prod` | Ejecuta versión compilada |
| Pruebas | `npm test` | Ejecuta suite de pruebas |
| Pruebas (watch) | `npm run test:watch` | Pruebas en modo observación |
| Cobertura | `npm run test:coverage` | Reporte de cobertura |

## � CI/CD Pipeline

Este proyecto implementa un pipeline básico de integración continua con GitHub Actions:

### Pipeline Automatizado
- **📋 Instalación**: Dependencias con `npm ci`
- **🔍 Análisis**: Verificación TypeScript estática
- **🧪 Pruebas**: Ejecución de 15 pruebas unitarias
- **🏗️ Build**: Compilación de TypeScript
- **🐳 Docker**: Build y push automático de imagen

### Estado del Pipeline
[![CI Status](https://github.com/fedemarty/crud-blog-nodejs-postgresql/actions/workflows/ci.yml/badge.svg)](https://github.com/fedemarty/crud-blog-nodejs-postgresql/actions)

### Configuración
Ver [SETUP-CI.md](SETUP-CI.md) para instrucciones de configuración de Docker Hub y protección de ramas.

## �📈 Estado del Proyecto

### ✅ Requisitos del TP Cumplidos
- **✅ API CRUD**: 5 endpoints (supera mínimo de 3)
- **✅ Variables de entorno**: Configuradas y documentadas en .env
- **✅ Pruebas unitarias**: 15 pruebas (supera mínimo de 2)
- **✅ Dockerfile**: Multi-stage build optimizado
- **✅ Docker Compose**: Configurado y funcional
- **✅ Repositorio Git**: Versionado y en GitHub

### 📊 Estadísticas del Proyecto
- **Líneas de código**: ~500+ líneas
- **Cobertura de pruebas**: 100% en controladores
- **Endpoints funcionales**: 6 endpoints
- **Tecnologías integradas**: 8+ tecnologías

## 👨‍💻 Autor

**Federico Marty**
- GitHub: [@fedemarty](https://github.com/fedemarty)
- Email: fede.a.marty@gmail.com
- Repositorio: [crud-blog-nodejs-postgresql](https://github.com/fedemarty/crud-blog-nodejs-postgresql)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
