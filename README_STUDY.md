# 📚 CRUD Blog API - Guía de Estudio Completa

> **Proyecto educativo**: API REST completa con Node.js, TypeScript, PostgreSQL y CI/CD
> 
> **Propósito**: Demostrar implementación completa de DevOps con todas las mejores prácticas

## 🎯 Qué vas a aprender

- ✅ **Backend API REST** con Node.js + TypeScript
- ✅ **Base de datos** PostgreSQL con Sequelize ORM  
- ✅ **Testing unitario** con Jest (15 tests)
- ✅ **Containerización** con Docker multi-stage
- ✅ **CI/CD completo** con GitHub Actions
- ✅ **Validación de datos** con Zod schemas
- ✅ **Manejo de errores** robusto
- ✅ **Documentación** profesional

---

## 📋 Tabla de Contenidos

1. [🏗️ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
2. [🚀 Quick Start](#-quick-start)
3. [📁 Estructura del Proyecto](#-estructura-del-proyecto)
4. [🔧 Configuración Técnica](#-configuración-técnica)
5. [🧪 Sistema de Testing](#-sistema-de-testing)
6. [🐳 Docker & Containerización](#-docker--containerización)
7. [⚙️ CI/CD Pipeline](#️-cicd-pipeline)
8. [📊 API Endpoints](#-api-endpoints)
9. [🔒 Seguridad y Validación](#-seguridad-y-validación)
10. [📖 Guía de Estudio](#-guía-de-estudio)

---

## 🏗️ Arquitectura del Proyecto

```
┌─────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA COMPLETA                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────────┐ │
│  │   CLIENTE   │───▶│  API REST    │───▶│   BASE DATOS    │ │
│  │ (Frontend)  │    │ (Node.js +   │    │  (PostgreSQL)   │ │
│  │             │    │  TypeScript) │    │                 │ │
│  └─────────────┘    └──────────────┘    └─────────────────┘ │
│                             │                               │
│                             ▼                               │
│                  ┌──────────────────────┐                   │
│                  │    VALIDACIONES      │                   │
│                  │   (Zod Schemas)      │                   │
│                  └──────────────────────┘                   │
│                                                             │
├─────────────────────────── DEVOPS ──────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────────┐ │
│  │   TESTING   │    │    CI/CD     │    │     DOCKER      │ │
│  │ (Jest 15    │───▶│ (GitHub      │───▶│  (Multi-stage   │ │
│  │  tests)     │    │  Actions)    │    │   Dockerfile)   │ │
│  └─────────────┘    └──────────────┘    └─────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 🎯 Flujo de Desarrollo Completo

1. **Desarrollo Local** → Escribir código + tests
2. **Git Push** → Activar pipeline automático  
3. **CI Pipeline** → Tests + Build + Docker
4. **CD Pipeline** → Deploy automático a Docker Hub
5. **Producción** → Imagen lista para usar

---

## 🚀 Quick Start

### Prerequisitos
```bash
# Verificar versiones
node --version    # >= 18.0.0
npm --version     # >= 8.0.0
git --version     # >= 2.30.0
docker --version  # >= 20.0.0
```

### 1. Clonar y Setup
```bash
# Clonar repositorio
git clone https://github.com/fedemarty/crud-blog-nodejs-postgresql.git
cd crud-blog-nodejs-postgresql

# Instalar dependencias
yarn install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de BD
```

### 2. Ejecutar en Desarrollo
```bash
# Modo desarrollo (con hot reload)
yarn dev

# Ejecutar tests
yarn test

# Build para producción
yarn build
```

### 3. Ejecutar con Docker
```bash
# Opción 1: Build local
docker-compose up --build

# Opción 2: Usar imagen de Docker Hub
docker run -p 8081:8081 \
  -e DATABASE_URL="tu_database_url" \
  fedemarty/blog-api:latest
```

---

## 📁 Estructura del Proyecto

```
crud-blog-nodejs-postgresql/
├── 📂 src/                          # Código fuente principal
│   ├── 📂 controller/               # Controladores de la API
│   │   ├── blog.controller.ts       # Lógica CRUD de blogs
│   │   └── blog.schema.ts           # Validaciones con Zod
│   ├── 📂 middleware/               # Middlewares personalizados
│   │   └── validate.ts              # Middleware de validación
│   ├── 📂 model/                    # Modelos de base de datos
│   │   └── model.ts                 # Modelo Blog (Sequelize)
│   ├── 📂 routes/                   # Definición de rutas
│   │   └── routes.ts                # Rutas de la API
│   ├── 📂 __tests__/                # Tests unitarios
│   │   └── blog.controller.test.ts  # 15 tests completos
│   ├── db.ts                        # Configuración de BD
│   └── server.ts                    # Servidor principal
├── 📂 .github/workflows/            # CI/CD con GitHub Actions
│   └── ci.yml                       # Pipeline completo
├── 📂 logs/                         # Logs de la aplicación
├── 🐳 Dockerfile                    # Multi-stage build
├── 🐳 docker-compose.yml            # Orquestación local
├── ⚙️ package.json                  # Dependencias y scripts
├── ⚙️ tsconfig.json                 # Configuración TypeScript
├── 🧪 jest.config.js                # Configuración de tests
├── 📋 Makefile                      # Comandos útiles
├── 🔒 .env                          # Variables de entorno
└── 📖 README.md                     # Esta documentación
```

### 🔍 Explicación de Cada Directorio

#### `src/controller/`
**Propósito**: Contiene la lógica de negocio de la aplicación
- `blog.controller.ts`: Implementa los 5 endpoints CRUD
- `blog.schema.ts`: Define validaciones con Zod para entrada de datos

#### `src/middleware/`
**Propósito**: Funciones que se ejecutan entre request y response
- `validate.ts`: Valida datos de entrada usando los schemas de Zod

#### `src/model/`
**Propósito**: Define la estructura de datos y interacción con BD
- `model.ts`: Modelo Sequelize para la tabla `blogs`

#### `src/routes/`
**Propósito**: Define los endpoints de la API
- `routes.ts`: Mapea URLs a controladores

#### `src/__tests__/`
**Propósito**: Tests unitarios completos
- `blog.controller.test.ts`: 15 tests que cubren todos los casos

---

## 🔧 Configuración Técnica

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",           // JavaScript moderno
    "module": "commonjs",         // Para Node.js
    "outDir": "./dist",           // Output de compilación
    "rootDir": "./src",           // Código fuente
    "strict": true,               // Máxima strictness
    "esModuleInterop": true,      // Compatibilidad ESM
    "skipLibCheck": true,         // Optimización build
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",      // Desarrollo con hot reload
    "build": "tsc",                      // Compilar TypeScript
    "start": "node dist/server.js",      // Producción
    "test": "jest",                      // Ejecutar tests
    "test:watch": "jest --watch",        // Tests en modo watch
    "test:coverage": "jest --coverage"   // Coverage report
  }
}
```

### Variables de Entorno (`.env`)
```bash
# Base de datos PostgreSQL
POSTGRES_HOST=tu_host
POSTGRES_PORT=5432
POSTGRES_USER=tu_usuario
POSTGRES_PASSWORD=tu_password
POSTGRES_DB=tu_database

# URL completa (alternativa)
DATABASE_URL=postgresql://user:pass@host:port/db

# Servidor
PORT=8081
NODE_ENV=development
```

---

## 🧪 Sistema de Testing

### Configuración Jest (`jest.config.js`)
```javascript
const { createDefaultPreset } = require("ts-jest");

module.exports = {
  testEnvironment: "node",           // Entorno Node.js
  transform: {
    ...createDefaultPreset().transform // TypeScript support
  },
  collectCoverageFrom: [
    "src/**/*.ts",                   // Incluir archivos fuente
    "!src/**/*.test.ts"              // Excluir tests del coverage
  ]
};
```

### Tests Implementados (15 total)

#### ✅ `createBlogController` (3 tests)
1. **Creación exitosa**: Verifica que se crea un blog correctamente
2. **Error título duplicado**: Maneja constraint de unicidad
3. **Error genérico**: Maneja errores de base de datos

#### ✅ `updateBlogController` (3 tests)
1. **Actualización exitosa**: Verifica actualización correcta
2. **Blog no encontrado**: Retorna 404 para ID inexistente  
3. **Error de base de datos**: Maneja errores de BD

#### ✅ `findBlogController` (3 tests)
1. **Búsqueda exitosa**: Encuentra blog por ID
2. **Blog no encontrado**: Retorna 404 correctamente
3. **Error de base de datos**: Maneja errores

#### ✅ `findAllBlogsController` (3 tests)
1. **Paginación por defecto**: Retorna blogs con paginación
2. **Paginación personalizada**: Respeta parámetros de query
3. **Error de base de datos**: Maneja errores

#### ✅ `deleteBlogController` (3 tests)
1. **Eliminación exitosa**: Elimina blog correctamente
2. **Blog no encontrado**: Retorna 404 para ID inexistente
3. **Error de base de datos**: Maneja errores

### Estrategia de Testing
```typescript
// Ejemplo de test unitario
describe('createBlogController', () => {
  it('debería crear un blog exitosamente', async () => {
    // Arrange: Preparar datos de prueba
    const mockBlog = {
      id: 'uuid-test',
      title: 'Test Blog',
      description: 'Test Description'
    };
    
    // Mock del modelo
    mockedBlogModel.create.mockResolvedValue(mockBlog);
    
    // Act: Ejecutar función
    await createBlogController(req, res);
    
    // Assert: Verificar resultado
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: mockBlog
    });
  });
});
```

---

## 🐳 Docker & Containerización

### Dockerfile Multi-Stage

```dockerfile
# -------- Etapa 1: Dependencias --------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# -------- Etapa 2: Build --------
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build   # TypeScript → JavaScript

# -------- Etapa 3: Runtime --------
FROM node:20-alpine AS runner
WORKDIR /app

# Solo archivos necesarios para producción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 8081
CMD ["node", "dist/server.js"]
```

### ¿Por qué Multi-Stage?

1. **Optimización de tamaño**: Imagen final solo contiene lo necesario
2. **Seguridad**: No incluye código fuente ni herramientas de desarrollo
3. **Eficiencia**: Reutiliza capas en builds posteriores
4. **Separación**: Build y runtime separados

### Docker Compose (docker-compose.yml)

```yaml
version: "3.8"
services:
  api:
    build: .                    # Build local
    # image: fedemarty/blog-api:latest  # O usar imagen de Docker Hub
    container_name: blog_api
    ports:
      - "8081:8081"
    env_file:
      - .env                    # Variables de entorno
    depends_on:
      - db                      # Esperar a la BD

  db:
    image: postgres:15-alpine   # PostgreSQL oficial
    container_name: blog_db
    environment:
      POSTGRES_DB: blog_db
      POSTGRES_USER: blog_user  
      POSTGRES_PASSWORD: blog_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:                # Persistencia de datos
```

---

## ⚙️ CI/CD Pipeline

### GitHub Actions Workflow (`.github/workflows/ci.yml`)

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]          # Trigger en push a main
  pull_request:
    branches: [ main ]          # Trigger en PR a main

jobs:
  ci-cd:
    runs-on: ubuntu-latest      # Runner de GitHub

    steps:
    # 1. CHECKOUT DEL CÓDIGO
    - name: 📥 Checkout Repository
      uses: actions/checkout@v4

    # 2. SETUP NODE.JS
    - name: 🟢 Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'yarn'           # Cache de dependencias

    # 3. INSTALACIÓN DE DEPENDENCIAS
    - name: 📋 Install Dependencies
      run: yarn install --frozen-lockfile

    # 4. ANÁLISIS ESTÁTICO
    - name: 🔍 TypeScript Static Analysis  
      run: npx tsc --noEmit     # Verificar tipos sin compilar

    # 5. EJECUCIÓN DE PRUEBAS
    - name: 🧪 Run Unit Tests
      run: yarn test

    # 6. BUILD DE LA APLICACIÓN
    - name: 🏗️ Build Application
      run: yarn build

    # 7. BUILD DE DOCKER IMAGE
    - name: 🐳 Build Docker Image
      run: docker build -t blog-api:${{ github.sha }} .

    # 8. LOGIN A DOCKER HUB (solo en main)
    - name: 🔐 Login to Docker Hub
      if: github.event_name == 'push' && github.ref == 'refs/heads/main'
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    # 9. PUSH A DOCKER HUB (solo en main)
    - name: 🚀 Push Docker Image
      if: github.event_name == 'push' && github.ref == 'refs/heads/main'
      run: |
        docker tag blog-api:${{ github.sha }} ${{ secrets.DOCKER_USERNAME }}/blog-api:latest
        docker tag blog-api:${{ github.sha }} ${{ secrets.DOCKER_USERNAME }}/blog-api:${{ github.sha }}
        docker push ${{ secrets.DOCKER_USERNAME }}/blog-api:latest
        docker push ${{ secrets.DOCKER_USERNAME }}/blog-api:${{ github.sha }}
```

### Flujo del Pipeline

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    PUSH     │───▶│  CHECKOUT   │───▶│ SETUP NODE  │
│   (main)    │    │   CÓDIGO    │    │   (v20)     │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   DOCKER    │◀───│    BUILD    │◀───│  INSTALAR   │
│    BUILD    │    │ APLICACIÓN  │    │ DEPENDENCIAS│
└─────────────┘    └─────────────┘    └─────────────┘
       │                                      │
       ▼                               ┌─────────────┐
┌─────────────┐    ┌─────────────┐    │    TESTS    │
│ PUSH DOCKER │◀───│ LOGIN DOCKER│    │ UNITARIOS   │
│    HUB      │    │    HUB      │    │  (15 tests) │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
       ✅                              ┌─────────────┐
    COMPLETO                          │ TYPESCRIPT  │
                                      │   CHECK     │
                                      └─────────────┘
```

### Secrets de GitHub

Para que el pipeline funcione, necesitas configurar estos secrets:

1. **DOCKER_USERNAME**: Tu username de Docker Hub
2. **DOCKER_PASSWORD**: Tu password o Access Token de Docker Hub

**Configurar en**: GitHub → Tu Repo → Settings → Secrets and variables → Actions

---

## 📊 API Endpoints

### Base URL
```
Local: http://localhost:8081
Docker: http://localhost:8081
```

### 1. 📝 Crear Blog
```http
POST /api/blogs
Content-Type: application/json

{
  "title": "Mi primer blog",
  "description": "Descripción del blog",
  "category": "Tecnología",
  "published": true
}
```

**Respuesta exitosa (201):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid-generado",
    "title": "Mi primer blog",
    "description": "Descripción del blog", 
    "category": "Tecnología",
    "published": true,
    "createdAt": "2025-01-01T10:00:00.000Z",
    "updatedAt": "2025-01-01T10:00:00.000Z"
  }
}
```

### 2. 📖 Obtener Todos los Blogs
```http
GET /api/blogs?page=1&limit=10
```

**Respuesta:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid-1",
      "title": "Blog 1",
      "description": "Descripción 1",
      "category": "Tech",
      "published": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

### 3. 🔍 Obtener Blog por ID
```http
GET /api/blogs/:id
```

### 4. ✏️ Actualizar Blog
```http
PUT /api/blogs/:id
Content-Type: application/json

{
  "title": "Título actualizado",
  "description": "Nueva descripción"
}
```

### 5. 🗑️ Eliminar Blog
```http
DELETE /api/blogs/:id
```

---

## 🔒 Seguridad y Validación

### Validación con Zod

```typescript
// blog.schema.ts
import { z } from 'zod';

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string()
      .min(1, 'El título es requerido')
      .max(100, 'El título no puede exceder 100 caracteres'),
    
    description: z.string()
      .min(1, 'La descripción es requerida'),
    
    category: z.string()
      .max(50, 'La categoría no puede exceder 50 caracteres')
      .optional(),
    
    published: z.boolean()
      .default(false)
  })
});
```

### Middleware de Validación

```typescript
// validate.ts
export const validate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          message: 'Datos de entrada inválidos',
          errors: error.errors
        });
      }
      next(error);
    }
  };
};
```

### Manejo de Errores

```typescript
// Ejemplo en controller
try {
  const blog = await BlogModel.create(req.body);
  res.status(201).json({
    status: 'success',
    data: blog
  });
} catch (error: any) {
  // Error de título duplicado
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      status: 'error',
      message: 'Ya existe un blog con ese título'
    });
  }
  
  // Error genérico
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor'
  });
}
```

---

## 📖 Guía de Estudio

### 🎯 Orden Recomendado de Estudio

#### 1. **Fundamentos (Semana 1)**
- [ ] Revisar estructura del proyecto
- [ ] Entender configuración TypeScript
- [ ] Analizar modelos de Sequelize
- [ ] Ejecutar la aplicación localmente

#### 2. **API y Validación (Semana 2)**  
- [ ] Estudiar controladores CRUD
- [ ] Entender validación con Zod
- [ ] Probar todos los endpoints con Postman
- [ ] Analizar manejo de errores

#### 3. **Testing (Semana 3)**
- [ ] Ejecutar tests unitarios
- [ ] Entender mocking con Jest
- [ ] Agregar nuevos tests
- [ ] Generar coverage report

#### 4. **Docker (Semana 4)**
- [ ] Entender Dockerfile multi-stage
- [ ] Ejecutar con docker-compose
- [ ] Modificar configuración
- [ ] Build y push a Docker Hub

#### 5. **CI/CD (Semana 5)**
- [ ] Analizar workflow de GitHub Actions
- [ ] Entender cada step del pipeline
- [ ] Configurar secrets
- [ ] Hacer cambios y ver pipeline ejecutarse

### 🔧 Ejercicios Prácticos

#### Ejercicio 1: Agregar nuevo endpoint
```typescript
// Agregar endpoint GET /api/blogs/published
// Que retorne solo blogs publicados
```

#### Ejercicio 2: Nuevo campo en el modelo
```typescript
// Agregar campo "author" al modelo Blog
// Actualizar validaciones y tests
```

#### Ejercicio 3: Middleware personalizado
```typescript
// Crear middleware de logging
// Que registre todas las peticiones
```

#### Ejercicio 4: Optimizar Docker
```typescript
// Reducir el tamaño de la imagen Docker
// Usar imagen base más pequeña
```

### 📚 Recursos Adicionales

#### Documentación Oficial
- [Node.js](https://nodejs.org/docs/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Sequelize](https://sequelize.org/docs/v6/)
- [Jest](https://jestjs.io/docs/getting-started)
- [Docker](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/actions)

#### Tutoriales Recomendados
- TypeScript con Node.js
- Testing con Jest y mocking
- Docker multi-stage builds
- CI/CD con GitHub Actions

### 🎓 Conceptos Clave a Dominar

#### Backend Development
- [x] **REST API Design**: Endpoints RESTful
- [x] **TypeScript**: Tipado estático para JavaScript
- [x] **ORM**: Object-Relational Mapping con Sequelize
- [x] **Validation**: Validación de datos con Zod
- [x] **Error Handling**: Manejo robusto de errores

#### Testing
- [x] **Unit Testing**: Tests unitarios con Jest
- [x] **Mocking**: Simulación de dependencias
- [x] **Test Coverage**: Cobertura de código
- [x] **TDD**: Test Driven Development

#### DevOps
- [x] **Containerization**: Docker y multi-stage builds
- [x] **CI/CD**: Integración y despliegue continuo
- [x] **Pipeline**: Automatización de workflows
- [x] **Deployment**: Publicación automática

---

## 🏆 Resultado Final

Al completar este proyecto habrás implementado:

✅ **API REST completa** con 5 endpoints CRUD  
✅ **15 tests unitarios** con cobertura completa  
✅ **Pipeline CI/CD** totalmente automatizado  
✅ **Containerización** con Docker multi-stage  
✅ **Validación robusta** con Zod schemas  
✅ **Documentación profesional** completa  
✅ **Mejores prácticas** de desarrollo  

### 🎯 Skills Desarrollados

- **Backend Development**: Node.js + TypeScript
- **Database Management**: PostgreSQL + Sequelize  
- **Testing**: Jest + Unit Testing + Mocking
- **DevOps**: Docker + CI/CD + GitHub Actions
- **Code Quality**: Linting + Type Safety + Validation

---

## 🤝 Contribución

¿Encontraste algo que mejorar? ¡Perfecto!

1. Fork el repositorio
2. Crea una rama feature: `git checkout -b feature/mejora`
3. Commit tus cambios: `git commit -m 'Agregar mejora'`
4. Push a la rama: `git push origin feature/mejora`  
5. Abre un Pull Request

---

## 👨‍💻 Autor

**Federico Marty**
- GitHub: [@fedemarty](https://github.com/fedemarty)
- Docker Hub: [fedemarty/blog-api](https://hub.docker.com/r/fedemarty/blog-api)

---

## 📄 Licencia

Este proyecto es con fines educativos. Siéntete libre de usarlo para aprender y practicar.

---

**🎉 ¡Happy Coding!** 🚀

> "El mejor código es el que se entiende, se puede mantener y funciona confiablemente en producción."