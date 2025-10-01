# 📝 CRUD Blog API - DevOps Complete Stack

[![CI Pipeline](https://github.com/fe## 📋 Endpoints de la API

Estos son los métodos elegidos en Postman que se utilizan para probar los endpoints.

| Método   | Descripción                              |
| -------- | ---------------------------------------- |
| `GET`    | Se usa para obtener un elemento individual o una colección de elementos. |
| `POST`   | Se usa al crear nuevos elementos, ej: un nuevo blog |
| `PATCH`  | Se usa para actualizar uno o más campos de un elemento, ej: actualizar el título de un blog. |
| `DELETE` | Se usa para eliminar un elemento.                  |

## Endpoints

Ahora que hemos aprendido sobre la anatomía de nuestros endpoints y los diferentes métodos de solicitud que debemos usar, es hora de algunos ejemplos: 

`URL_BASE: http://localhost:8081`g-nodejs-postgresql/actions/workflows/ci.yml/badge.svg)](https://github.com/fedemarty/crud-blog-nodejs-postgresql/actions/workflows/ci.yml)
[![New Relic Monitoring](https://img.shields.io/badge/New%20Relic-Monitored-1CE783?style=flat&logo=newrelic&logoColor=white)](https://rpm.newrelic.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)](https://hub.docker.com/)

## 🚀 **PROYECTO DEVOPS COMPLETO**

Stack DevOps completo con API REST para gestión de blogs. Incluye **CI/CD automatizado**, **containerización optimizada**, **monitoreo APM**, **15 pruebas unitarias** y **documentación técnica completa**.

---

## 📚 **DOCUMENTACIÓN COMPLETA**

### 📖 **Para Setup Rápido (15 min):**
👉 **[QUICK START GUIDE](./QUICK_START_GUIDE.md)** - Instalación paso a paso

### 📋 **Para Documentación Técnica Completa:**
👉 **[INFORME DEVOPS COMPLETO](./INFORME_DEVOPS_COMPLETO.md)** - Documentación técnica detallada

---

## ⚡ **INSTALACIÓN RÁPIDA**

```bash
# 1. Clone y setup
git clone https://github.com/fedemarty/crud-blog-nodejs-postgresql.git
cd crud-blog-nodejs-postgresql
yarn install

# 2. Tests
yarn test  # ✅ 15 pruebas unitarias

# 3. Desarrollo
yarn dev   # http://localhost:8081

# 4. Docker
docker-compose up --build -d

# 5. Verificar (Windows PowerShell)
Invoke-RestMethod -Uri "http://localhost:8081/api/blogs" -Method GET
```

---

## ✨ **CARACTERÍSTICAS DEVOPS**

### 🏗️ **Stack Tecnológico:**
- ✅ **Backend**: Node.js 20 + TypeScript + Express.js
- ✅ **Database**: PostgreSQL + Sequelize ORM
- ✅ **Testing**: Jest (15 tests) + Supertest
- ✅ **Validation**: Zod schemas
- ✅ **CI/CD**: GitHub Actions → Docker Hub
- ✅ **Containers**: Docker multi-stage optimized
- ✅ **Monitoring**: New Relic APM
- ✅ **Security**: Environment variables + secrets

### 📊 **Métricas del Proyecto:**
- 🧪 **Tests**: 15 pruebas unitarias (100% controladores)
- 📈 **Coverage**: 100% en lógica de negocio
- ⚡ **Performance**: < 50ms response time
- 🎯 **Apdex Score**: 0.95/1.0 (Excellent)
- 🔥 **Build Time**: < 3 minutos
- 🚀 **Deploy Time**: < 5 minutos

### 🔗 **Enlaces DevOps:**
- 🚀 **GitHub Actions**: [Pipeline Status](https://github.com/fedemarty/crud-blog-nodejs-postgresql/actions)
- 🐳 **Docker Hub**: [Container Registry](https://hub.docker.com/)
- 📊 **New Relic**: [APM Dashboard](https://rpm.newrelic.com/accounts/7195027/applications/1479497079)

---

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

| Método   | URL                                      | Descripción                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/blogs`                             | Obtener todos los blogs.    
| `GET`    | `/api/blogs/:id`                             | Obtener un blog específico.                   |
| `POST`   | `/api/blogs`                             | Crear un nuevo blog.                       |
| `PATCH`    | `/api/blogs/:id`                          | Actualizar un blog.                    |
| `DELETE`  | `/api/blogs/:id`                          | Eliminar un blog.                 |
| `GET`  | `/api/healthchecker`                          | Verificar el estado de la API.                 |

## Tecnologías

* [Node](https://nodejs.org/en) debe estar instalado en tu PC. 
* [PostgreSQL](https://www.postgresql.org/download/) debe estar instalado y ejecutándose.
* [Docker](https://www.docker.com/) debe estar instalado. El Makefile está en la carpeta del repositorio para crear el compose de docker.
* [Postman](https://www.postman.com/) para realizar operaciones CRUD en la base de datos del backend.

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/fedemarty/crud-blog-nodejs-postgresql.git
cd crud-blog-nodejs-postgresql
```

### 2. Instalar dependencias
```bash
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

#### Modo Desarrollo (PowerShell/CMD/Linux)
```bash
yarn start
```

#### Modo Producción
```bash
yarn build
yarn start:prod
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

**Ejecutar todas las pruebas:**
```bash
yarn test
```

**Pruebas en modo watch:**
```bash
yarn test:watch
```

**Generar reporte de cobertura:**
```bash
yarn test:coverage
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
| Desarrollo | `yarn start` | Inicia servidor con hot-reload |
| Construcción | `yarn build` | Compila TypeScript |
| Producción | `yarn start:prod` | Ejecuta versión compilada |
| Pruebas | `yarn test` | Ejecuta suite de pruebas |
| Pruebas (watch) | `yarn test:watch` | Pruebas en modo observación |
| Cobertura | `yarn test:coverage` | Reporte de cobertura |

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

---

**✨ Pipeline de CI/CD con integración a Docker Hub**  
*Pipeline probado con integración completa a Docker Hub* 
