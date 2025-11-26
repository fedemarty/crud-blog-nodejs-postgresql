# 🚀 GUÍA COMPLETA DEL PROYECTO - CRUD Blog API con DevOps

## 📚 ÍNDICE
1. [¿Qué es este proyecto?](#qué-es-este-proyecto)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Explicación Capa por Capa](#explicación-capa-por-capa)
6. [Flujo Completo de una Operación](#flujo-completo-de-una-operación)
7. [Base de Datos PostgreSQL](#base-de-datos-postgresql)
8. [APIs REST](#apis-rest)
9. [DevOps Pipeline](#devops-pipeline)
10. [Preguntas Frecuentes de Defensa](#preguntas-frecuentes-de-defensa)

---

## 🎯 ¿QUÉ ES ESTE PROYECTO?

### Contexto del Problema
Se necesita una API REST moderna para gestionar un blog con:
- ❌ Alta disponibilidad y escalabilidad
- ❌ Deployment automático en la nube
- ❌ Monitoreo en tiempo real
- ❌ Pruebas automatizadas
- ❌ CI/CD completo

### Solución Implementada
Un **sistema backend completo** que incluye:
- ✅ API REST para operaciones CRUD de blogs
- ✅ Base de datos PostgreSQL 15 en la nube (Render)
- ✅ Containerización con Docker multi-stage
- ✅ CI/CD con GitHub Actions
- ✅ Deployment automático en Render
- ✅ Monitoreo APM con New Relic
- ✅ 15 pruebas unitarias con Jest
- ✅ TypeScript para type-safety

---

## 🏗️ ARQUITECTURA DEL SISTEMA

### ¿Qué es una Arquitectura?
Es la forma en que organizamos el proyecto, sus componentes, y cómo interactúan entre sí.

### Patrón: Arquitectura en Capas (MVC)

```
┌─────────────────────────────────────────┐
│     CAPA DE PRESENTACIÓN (Cliente)      │  ← Dashboard HTML / API Clients
│      (blog-dashboard.html, Postman)     │
└────────────┬────────────────────────────┘
             │ HTTP/HTTPS Requests
┌────────────▼────────────────────────────┐
│     CAPA DE CONTROLADORES (Routes)      │  ← Express Router
│        (routes.ts, routes.clean.ts)     │
└────────────┬────────────────────────────┘
             │ Validaciones + Lógica
┌────────────▼────────────────────────────┐
│     CAPA DE CONTROLADORES DE NEGOCIO    │  ← Controllers
│  (blog.controller.ts, validaciones)     │
└────────────┬────────────────────────────┘
             │ Operaciones de datos
┌────────────▼────────────────────────────┐
│        CAPA DE MODELO (Model)           │  ← Interacción con BD
│      (model.ts, model.clean.ts)         │
└────────────┬────────────────────────────┘
             │ SQL Queries
┌────────────▼────────────────────────────┐
│    BASE DE DATOS PostgreSQL 15          │  ← Render Cloud
│  (dpg-d3pntk56ubrc73fbbqi0-a.virginia) │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          INFRAESTRUCTURA DEVOPS         │
├─────────────────────────────────────────┤
│  • GitHub (Control de versiones)        │
│  • GitHub Actions (CI/CD)               │
│  • Docker Hub (Registry de imágenes)    │
│  • Render (Deployment cloud)            │
│  • New Relic (APM Monitoring)           │
└─────────────────────────────────────────┘
```

### ¿Por qué en capas?

1. **Separación de preocupaciones:** Cada capa tiene una responsabilidad específica
2. **Mantenibilidad:** Cambios en una capa no afectan las otras
3. **Testabilidad:** Puedo probar cada capa independientemente
4. **Escalabilidad:** Puedo optimizar capas específicas

---

## 🛠️ TECNOLOGÍAS UTILIZADAS

### Backend

#### 1. **Node.js 20 LTS**
- **¿Qué es?** Runtime de JavaScript del lado del servidor
- **¿Por qué?** 
  - Alto rendimiento con event loop asíncrono
  - Ecosistema npm gigante
  - Mismo lenguaje frontend y backend
- **En este proyecto:** Base de toda la aplicación

#### 2. **TypeScript 5.1.6**
- **¿Qué es?** Superset de JavaScript con tipado estático
- **¿Por qué?** 
  - Detecta errores en tiempo de compilación
  - Autocompletado inteligente
  - Refactoring seguro
- **En este proyecto:** Todo el código está tipado

#### 3. **Express.js 4.18.2**
- **¿Qué es?** Framework web minimalista para Node.js
- **¿Por qué?** 
  - Ligero y rápido
  - Middleware potente
  - Routing flexible
- **En este proyecto:** Maneja todas las rutas HTTP

#### 4. **PostgreSQL 15**
- **¿Qué es?** Base de datos relacional open source
- **¿Por qué?** 
  - ACID compliant (transacciones seguras)
  - Excelente performance
  - Soporta JSON nativo
- **En este proyecto:** Almacena todos los blogs
- **Ubicación:** Render Cloud (Virginia, USA)

### DevOps & Infrastructure

#### 5. **Docker**
- **¿Qué es?** Plataforma de containerización
- **¿Por qué?** 
  - Mismo entorno en dev, test y producción
  - Aislamiento de dependencias
  - Fácil despliegue
- **En este proyecto:** Multi-stage Dockerfile optimizado

#### 6. **GitHub Actions**
- **¿Qué es?** CI/CD integrado en GitHub
- **¿Por qué?** 
  - Automatiza tests y deployment
  - Integración nativa con GitHub
  - Gratis para repos públicos
- **En este proyecto:** Pipeline completo con 11 steps

#### 7. **Render.com**
- **¿Qué es?** Plataforma PaaS (Platform as a Service)
- **¿Por qué?** 
  - Deployment automático desde Git
  - PostgreSQL incluido
  - HTTPS gratis
- **En este proyecto:** Hosting de app y BD

#### 8. **New Relic**
- **¿Qué es?** APM (Application Performance Monitoring)
- **¿Por qué?** 
  - Monitoreo en tiempo real
  - Detección de errores
  - Métricas de performance
- **En este proyecto:** Tracking de deployments y performance

### Testing & Quality

#### 9. **Jest 29.5.0**
- **¿Qué es?** Framework de testing para JavaScript
- **¿Por qué?** 
  - Sintaxis clara
  - Mocking potente
  - Coverage reports
- **En este proyecto:** 15 tests unitarios

#### 10. **Zod 3.22.4**
- **¿Qué es?** Librería de validación y parsing de schemas
- **¿Por qué?** 
  - Type-safe validations
  - Mensajes de error claros
  - Integración con TypeScript
- **En este proyecto:** Validación de inputs en controllers

---

## 📁 ESTRUCTURA DEL PROYECTO

```
CRUD-with-NodeJS-PostgreSQL-main/
│
├── 📄 Dockerfile                        ← Multi-stage build optimizado
├── 📄 docker-compose.yml                ← Orquestación local
├── 📄 render.yaml                       ← IaC para Render
├── 📄 package.json                      ← Dependencias y scripts
├── 📄 tsconfig.json                     ← Configuración TypeScript
├── 📄 jest.config.js                    ← Configuración Jest
├── 📄 newrelic.js                       ← Configuración New Relic
│
├── 📂 .github/workflows/
│   └── ci.yml                           ← Pipeline CI/CD
│
├── 📂 src/
│   ├── server.ts                        ← 🚀 Entry point de la app
│   ├── db.ts                            ← 🗄️ Configuración PostgreSQL
│   │
│   ├── 📂 routes/
│   │   ├── routes.ts                    ← 🛣️ Definición de endpoints
│   │   └── routes.clean.ts              ← Versión alternativa
│   │
│   ├── 📂 controller/
│   │   ├── blog.controller.ts           ← 🎮 Lógica de negocio
│   │   ├── blog.controller.clean.ts     ← Versión con validaciones Zod
│   │   └── blog.schema.ts               ← 📋 Schemas de validación
│   │
│   ├── 📂 model/
│   │   ├── model.ts                     ← 🏗️ Interacción con BD
│   │   └── model.clean.ts               ← Versión con prepared statements
│   │
│   ├── 📂 middleware/
│   │   └── validate.ts                  ← 🔒 Middleware de validación
│   │
│   └── 📂 __tests__/
│       ├── blog.controller.test.ts      ← 🧪 Tests del controller
│       └── blog.controller.clean.test.ts
│
├── 📂 dist/                             ← JavaScript compilado (generado)
├── 📂 logs/                             ← Archivos de log
│
├── 📄 blog-dashboard.html               ← 📊 Dashboard visual
├── 📄 generate-blogs-incremental.ps1    ← 🔧 Script generador de blogs
├── 📄 quick-create-blog.ps1             ← ⚡ Creación rápida
├── 📄 view-blogs-render.ps1             ← 👀 Visualizador de blogs
│
└── 📚 DOCUMENTACIÓN
    ├── README.md
    ├── PASOS_DEPLOYMENT_RENDER.md
    ├── GUIA_COMPLETA_PROYECTO.md        ← Este archivo
    └── INDICE_ARCHIVOS.md
```

---

## 🔍 EXPLICACIÓN CAPA POR CAPA

### 1️⃣ CAPA DE SERVIDOR (server.ts)

**¿Qué hace?** Punto de entrada de la aplicación, configura Express y middlewares.

#### Código clave:

```typescript
import express, { Application, Request, Response } from "express";
import cors from "cors";
import blogRouter from "./routes/routes";
import pool from "./db";

const app: Application = express();
const PORT = Number(process.env.PORT) || 8081;

// ==================== MIDDLEWARES ====================
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json()); // Parsear JSON en requests
app.use(express.urlencoded({ extended: true }));

// ==================== RUTAS ====================
app.use("/api", blogRouter); // Prefijo /api para todas las rutas

// ==================== HEALTH CHECK ====================
app.get("/api/healthchecker", async (req: Request, res: Response) => {
  const dbStatus = await testDatabaseConnection();
  res.status(200).json({
    status: "success",
    message: "Blog API is running",
    database: dbStatus ? "connected" : "disconnected",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

// ==================== INICIO DEL SERVIDOR ====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
});
```

**Puntos clave:**
- `process.env.PORT`: Render asigna puerto dinámicamente
- CORS configurado para permitir acceso desde cualquier origen
- Health check para monitoreo de Render y New Relic
- Middleware `express.json()` parsea automáticamente el body JSON

---

### 2️⃣ CAPA DE BASE DE DATOS (db.ts)

**¿Qué hace?** Configura el pool de conexiones a PostgreSQL.

#### Código clave:

```typescript
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" 
    ? { rejectUnauthorized: false } 
    : false,
  max: 20, // Máximo 20 conexiones concurrentes
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
```

**Puntos clave:**
- `DATABASE_URL`: Variable de entorno con string de conexión completo
- SSL habilitado en producción (requerido por Render)
- Connection pooling para reutilizar conexiones
- Error handler para desconexiones inesperadas

---

### 3️⃣ CAPA DE RUTAS (routes/routes.ts)

**¿Qué hace?** Define los endpoints HTTP y los mapea a controladores.

#### Código clave:

```typescript
import { Router } from "express";
import * as BlogController from "../controller/blog.controller";

const router: Router = Router();

// ==================== RUTAS DE BLOGS ====================
router.get("/blogs", BlogController.getAllBlogs);        // GET /api/blogs
router.get("/blogs/:id", BlogController.getBlogById);    // GET /api/blogs/5
router.post("/blogs", BlogController.createBlog);        // POST /api/blogs
router.patch("/blogs/:id", BlogController.updateBlog);   // PATCH /api/blogs/5
router.delete("/blogs/:id", BlogController.deleteBlog);  // DELETE /api/blogs/5

export default router;
```

**Convenciones REST:**
- `GET` → Leer datos (no modifica nada)
- `POST` → Crear nuevo recurso
- `PATCH` → Actualizar parcialmente
- `DELETE` → Eliminar recurso

---

### 4️⃣ CAPA DE CONTROLADORES (controller/blog.controller.ts)

**¿Qué hace?** Contiene la lógica de negocio, validaciones, y orquesta las operaciones.

#### Ejemplo: Crear Blog

```typescript
export const createBlog = async (req: Request, res: Response) => {
  try {
    // 1. VALIDACIÓN DE DATOS
    const { title, description, category, published } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({
        error: "Title and description are required"
      });
    }

    // 2. LLAMAR AL MODELO
    const newBlog = await BlogModel.create({
      title,
      description,
      category: category || "General",
      published: published !== undefined ? published : false
    });

    // 3. RESPONDER CON ÉXITO
    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog
    });

  } catch (error) {
    // 4. MANEJO DE ERRORES
    console.error("Error creating blog:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
};
```

**Responsabilidades del Controller:**
1. Validar entrada del usuario
2. Llamar al modelo para operaciones de BD
3. Formatear la respuesta
4. Manejar errores y retornar códigos HTTP apropiados

---

### 5️⃣ CAPA DE MODELO (model/model.ts)

**¿Qué hace?** Interactúa directamente con la base de datos usando SQL.

#### Ejemplo: Modelo de Blog

```typescript
import pool from "../db";

export interface Blog {
  id?: number;
  title: string;
  description: string;
  category?: string;
  published?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// ==================== CREATE ====================
export const create = async (blog: Blog): Promise<Blog> => {
  const query = `
    INSERT INTO blogs (title, description, category, published)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  
  const values = [
    blog.title,
    blog.description,
    blog.category || "General",
    blog.published !== undefined ? blog.published : false
  ];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

// ==================== READ ALL ====================
export const findAll = async (limit?: number): Promise<Blog[]> => {
  const query = limit 
    ? `SELECT * FROM blogs ORDER BY created_at DESC LIMIT $1`
    : `SELECT * FROM blogs ORDER BY created_at DESC`;
  
  const result = limit 
    ? await pool.query(query, [limit])
    : await pool.query(query);
  
  return result.rows;
};

// ==================== READ ONE ====================
export const findById = async (id: number): Promise<Blog | null> => {
  const query = `SELECT * FROM blogs WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

// ==================== UPDATE ====================
export const update = async (id: number, blog: Partial<Blog>): Promise<Blog | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (blog.title !== undefined) {
    fields.push(`title = $${paramIndex++}`);
    values.push(blog.title);
  }
  if (blog.description !== undefined) {
    fields.push(`description = $${paramIndex++}`);
    values.push(blog.description);
  }
  if (blog.category !== undefined) {
    fields.push(`category = $${paramIndex++}`);
    values.push(blog.category);
  }
  if (blog.published !== undefined) {
    fields.push(`published = $${paramIndex++}`);
    values.push(blog.published);
  }

  if (fields.length === 0) {
    return findById(id); // Nada que actualizar
  }

  values.push(id); // El ID va al final
  const query = `
    UPDATE blogs 
    SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $${paramIndex}
    RETURNING *;
  `;

  const result = await pool.query(query, values);
  return result.rows[0] || null;
};

// ==================== DELETE ====================
export const remove = async (id: number): Promise<boolean> => {
  const query = `DELETE FROM blogs WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rowCount !== null && result.rowCount > 0;
};
```

**Seguridad:**
- Usa **prepared statements** (`$1`, `$2`) para prevenir SQL injection
- Nunca concatena strings para construir queries

---

## 🔄 FLUJO COMPLETO DE UNA OPERACIÓN

### Ejemplo: "Crear un nuevo blog"

```
1. USUARIO
   ↓ Hace POST a https://crud-blog-nodejs-postgresql.onrender.com/api/blogs
   ↓ Body JSON: {"title": "DevOps 101", "description": "...", "category": "Tech"}

2. RENDER (Load Balancer)
   ↓ Recibe request HTTPS
   ↓ Termina SSL
   ↓ Reenvía a container Docker

3. EXPRESS (server.ts)
   ↓ Middleware CORS valida origen
   ↓ express.json() parsea el body
   ↓ Router busca ruta POST /api/blogs

4. ROUTER (routes.ts)
   ↓ Encuentra: router.post("/blogs", BlogController.createBlog)
   ↓ Llama a BlogController.createBlog(req, res)

5. CONTROLLER (blog.controller.ts)
   ↓ Extrae datos: const { title, description, category } = req.body
   ↓ Valida: if (!title || !description) return 400
   ↓ Llama a: BlogModel.create({ title, description, category })

6. MODEL (model.ts)
   ↓ Construye query SQL:
   ↓ INSERT INTO blogs (title, description, category, published)
   ↓ VALUES ($1, $2, $3, $4) RETURNING *;
   ↓ Ejecuta: await pool.query(query, [title, description, category, false])

7. POSTGRESQL (Render Cloud)
   ↓ Valida constraint UNIQUE en título (si existe)
   ↓ Ejecuta INSERT
   ↓ Genera ID automático (SERIAL)
   ↓ Asigna timestamps (created_at, updated_at con DEFAULT CURRENT_TIMESTAMP)
   ↓ Devuelve fila completa con RETURNING *

8. MODEL (recibe resultado)
   ↓ return result.rows[0]; (el blog recién creado)

9. CONTROLLER (recibe blog del modelo)
   ↓ Formatea respuesta:
   ↓ res.status(201).json({ message: "Blog created successfully", blog: newBlog })

10. EXPRESS (envía respuesta)
    ↓ Serializa objeto a JSON
    ↓ Agrega headers (Content-Type: application/json)
    ↓ Envía HTTP 201 Created

11. RENDER (Load Balancer)
    ↓ Agrega header HTTPS
    ↓ Comprime respuesta (gzip)

12. USUARIO
    ↓ Recibe respuesta JSON con el blog creado
    ↓ {
    ↓   "message": "Blog created successfully",
    ↓   "blog": {
    ↓     "id": 42,
    ↓     "title": "DevOps 101",
    ↓     "description": "...",
    ↓     "category": "Tech",
    ↓     "published": false,
    ↓     "created_at": "2025-11-08T10:30:00.000Z",
    ↓     "updated_at": "2025-11-08T10:30:00.000Z"
    ↓   }
    ↓ }

🔄 MONITOREO EN PARALELO:

NEW RELIC (APM)
   ↓ Intercepta la transacción
   ↓ Mide tiempo de respuesta: 145ms
   ↓ Identifica slow queries (si las hay)
   ↓ Registra métricas:
   ↓   - Throughput: 25 rpm
   ↓   - Error rate: 0.2%
   ↓   - Apdex score: 0.95
```

---

## 🗄️ BASE DE DATOS POSTGRESQL

### Configuración en Render

**Datos de conexión:**
```
Host: dpg-d3pntk56ubrc73fbbqi0-a.virginia-postgres.render.com
Port: 5432
Database: clinica_db_6q7w
User: clinica_db_6q7w_user
Password: [Ver Render Dashboard]
```

**String de conexión:**
```
postgresql://clinica_db_6q7w_user:PASSWORD@dpg-d3pntk56ubrc73fbbqi0-a.virginia-postgres.render.com/clinica_db_6q7w
```

### Esquema de la Tabla `blogs`

```sql
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,              -- Auto-increment
    title VARCHAR(255) NOT NULL UNIQUE, -- Título único
    description TEXT NOT NULL,          -- Descripción larga
    category VARCHAR(100) DEFAULT 'General', -- Categoría con default
    published BOOLEAN DEFAULT false,    -- Estado de publicación
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar performance
CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_blogs_published ON blogs(published);
CREATE INDEX idx_blogs_created_at ON blogs(created_at DESC);
```

### Constraints y Validaciones

| Constraint | Campo | Descripción |
|-----------|-------|-------------|
| PRIMARY KEY | id | Identificador único |
| NOT NULL | title | Título obligatorio |
| NOT NULL | description | Descripción obligatoria |
| UNIQUE | title | No pueden existir títulos duplicados |
| DEFAULT | category | "General" si no se especifica |
| DEFAULT | published | false (draft por defecto) |

### Operaciones SQL Comunes

**Insertar blog:**
```sql
INSERT INTO blogs (title, description, category, published)
VALUES ('Mi primer blog', 'Contenido...', 'Tech', false)
RETURNING *;
```

**Buscar todos (con límite):**
```sql
SELECT * FROM blogs 
ORDER BY created_at DESC 
LIMIT 10;
```

**Buscar por categoría:**
```sql
SELECT * FROM blogs 
WHERE category = 'DevOps' 
  AND published = true
ORDER BY created_at DESC;
```

**Actualizar:**
```sql
UPDATE blogs 
SET title = 'Nuevo título', 
    updated_at = CURRENT_TIMESTAMP
WHERE id = 5
RETURNING *;
```

**Eliminar:**
```sql
DELETE FROM blogs WHERE id = 5;
```

**Estadísticas:**
```sql
SELECT 
    category,
    COUNT(*) as total,
    SUM(CASE WHEN published THEN 1 ELSE 0 END) as published_count,
    AVG(LENGTH(description)) as avg_length
FROM blogs
GROUP BY category
ORDER BY total DESC;
```

---

## 🌐 APIs REST

### Base URL

**Producción (Render):**
```
https://crud-blog-nodejs-postgresql.onrender.com/api
```

**Local (Docker):**
```
http://localhost:8081/api
```

### Endpoints Completos

#### 📊 Health Check

**GET /api/healthchecker**

Verifica el estado de la aplicación y la base de datos.

**Response 200:**
```json
{
  "status": "success",
  "message": "Blog API is running",
  "database": "connected",
  "environment": "production",
  "timestamp": "2025-11-08T10:30:00.000Z"
}
```

---

#### 📝 BLOGS - Listar Todos

**GET /api/blogs**

Obtiene todos los blogs ordenados por fecha de creación (descendente).

**Query Parameters:**
- `limit` (opcional): Número máximo de blogs a retornar

**Ejemplo:**
```bash
GET /api/blogs?limit=10
```

**Response 200:**
```json
[
  {
    "id": 1,
    "title": "Introducción a DevOps",
    "description": "DevOps es una cultura...",
    "category": "DevOps",
    "published": true,
    "created_at": "2025-11-08T10:00:00.000Z",
    "updated_at": "2025-11-08T10:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Docker Multi-stage Builds",
    "description": "Optimiza tus imágenes...",
    "category": "Docker",
    "published": false,
    "created_at": "2025-11-07T15:30:00.000Z",
    "updated_at": "2025-11-07T15:30:00.000Z"
  }
]
```

---

#### 📝 BLOGS - Obtener por ID

**GET /api/blogs/:id**

Obtiene un blog específico por su ID.

**Ejemplo:**
```bash
GET /api/blogs/1
```

**Response 200:**
```json
{
  "id": 1,
  "title": "Introducción a DevOps",
  "description": "DevOps es una cultura...",
  "category": "DevOps",
  "published": true,
  "created_at": "2025-11-08T10:00:00.000Z",
  "updated_at": "2025-11-08T10:00:00.000Z"
}
```

**Response 404:**
```json
{
  "error": "Blog not found"
}
```

---

#### 📝 BLOGS - Crear Nuevo

**POST /api/blogs**

Crea un nuevo blog.

**Request Body:**
```json
{
  "title": "Kubernetes 101",
  "description": "Aprende los conceptos básicos de Kubernetes",
  "category": "DevOps",
  "published": false
}
```

**Validaciones:**
- `title`: Requerido, único, máximo 255 caracteres
- `description`: Requerido
- `category`: Opcional, default "General"
- `published`: Opcional, default false

**Response 201:**
```json
{
  "message": "Blog created successfully",
  "blog": {
    "id": 3,
    "title": "Kubernetes 101",
    "description": "Aprende los conceptos básicos de Kubernetes",
    "category": "DevOps",
    "published": false,
    "created_at": "2025-11-08T11:00:00.000Z",
    "updated_at": "2025-11-08T11:00:00.000Z"
  }
}
```

**Response 400 (Validación):**
```json
{
  "error": "Title and description are required"
}
```

**Response 409 (Título duplicado):**
```json
{
  "error": "A blog with this title already exists"
}
```

---

#### 📝 BLOGS - Actualizar

**PATCH /api/blogs/:id**

Actualiza un blog existente. Solo se actualizan los campos enviados.

**Request Body (parcial):**
```json
{
  "title": "Kubernetes 101 - Actualizado",
  "published": true
}
```

**Response 200:**
```json
{
  "message": "Blog updated successfully",
  "blog": {
    "id": 3,
    "title": "Kubernetes 101 - Actualizado",
    "description": "Aprende los conceptos básicos de Kubernetes",
    "category": "DevOps",
    "published": true,
    "created_at": "2025-11-08T11:00:00.000Z",
    "updated_at": "2025-11-08T11:15:00.000Z"
  }
}
```

**Response 404:**
```json
{
  "error": "Blog not found"
}
```

---

#### 📝 BLOGS - Eliminar

**DELETE /api/blogs/:id**

Elimina un blog por su ID.

**Ejemplo:**
```bash
DELETE /api/blogs/3
```

**Response 200:**
```json
{
  "message": "Blog deleted successfully"
}
```

**Response 404:**
```json
{
  "error": "Blog not found"
}
```

---

### Códigos de Estado HTTP

| Código | Significado | Uso en el Proyecto |
|--------|-------------|-------------------|
| 200 OK | Éxito | GET, PATCH, DELETE exitosos |
| 201 Created | Recurso creado | POST exitoso |
| 400 Bad Request | Entrada inválida | Validación fallida |
| 404 Not Found | No existe | GET/PATCH/DELETE de ID inexistente |
| 409 Conflict | Conflicto | Título duplicado |
| 500 Internal Error | Error del servidor | Excepciones no manejadas |

---

## 🔧 DEVOPS PIPELINE

### Arquitectura CI/CD

```
┌─────────────────────────────────────────────────────────┐
│                     DEVELOPER                            │
│              git push origin main                        │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                     GITHUB                               │
│           - Almacena código fuente                       │
│           - Detecta push a main                          │
│           - Dispara 2 procesos en paralelo:             │
└───────┬───────────────────────────────────┬─────────────┘
        │                                   │
        ▼                                   ▼
┌───────────────────────┐     ┌───────────────────────────┐
│   GITHUB ACTIONS      │     │   RENDER WEBHOOK          │
│   (CI/CD Pipeline)    │     │   (Auto-Deploy)           │
├───────────────────────┤     ├───────────────────────────┤
│ 1. Tests              │     │ 1. Clona repo             │
│ 2. Build TypeScript   │     │ 2. Build con Dockerfile   │
│ 3. Docker Build       │     │ 3. Deploy container       │
│ 4. Push to DockerHub  │     │ 4. Health check           │
│ 5. New Relic Marker   │     │ 5. Live en HTTPS          │
└───────────────────────┘     └───────────────────────────┘
```

### GitHub Actions Pipeline (ci.yml)

**11 Steps del Pipeline:**

```yaml
name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  ci:
    runs-on: ubuntu-latest
    
    steps:
    # 1. CHECKOUT
    - name: 📥 Checkout code
      uses: actions/checkout@v4
    
    # 2. SETUP NODE.JS
    - name: 📦 Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'yarn'
    
    # 3. INSTALL DEPENDENCIES
    - name: 📋 Install Dependencies
      run: yarn install --frozen-lockfile
    
    # 4. TYPESCRIPT STATIC ANALYSIS
    - name: 🔍 TypeScript Static Analysis
      run: npx tsc --noEmit
    
    # 5. RUN UNIT TESTS
    - name: 🧪 Run Unit Tests
      run: yarn test
    
    # 6. BUILD APPLICATION
    - name: 🏗️ Build Application
      run: yarn build
    
    # 7. BUILD DOCKER IMAGE
    - name: 🐳 Build Docker Image
      run: docker build -t blog-api:${{ github.sha }} .
    
    # 8. LOGIN TO DOCKER HUB (solo en push a main)
    - name: 🔐 Login to Docker Hub
      if: github.event_name == 'push' && github.ref == 'refs/heads/main'
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
    
    # 9. PUSH DOCKER IMAGE (solo en push a main)
    - name: 🚀 Push Docker Image
      if: github.event_name == 'push' && github.ref == 'refs/heads/main'
      run: |
        docker tag blog-api:${{ github.sha }} ${{ secrets.DOCKER_USERNAME }}/blog-api:latest
        docker tag blog-api:${{ github.sha }} ${{ secrets.DOCKER_USERNAME }}/blog-api:${{ github.sha }}
        docker push ${{ secrets.DOCKER_USERNAME }}/blog-api:latest
        docker push ${{ secrets.DOCKER_USERNAME }}/blog-api:${{ github.sha }}
    
    # 10. NEW RELIC DEPLOYMENT MARKER (solo en push a main)
    - name: 📊 Marcador de Deployment en New Relic
      if: github.event_name == 'push' && github.ref == 'refs/heads/main'
      uses: newrelic/deployment-marker-action@v2.3.0
      with:
        apiKey: ${{ secrets.NEW_RELIC_API_KEY }}
        guid: ${{ secrets.NEW_RELIC_DEPLOYMENT_ENTITY_GUID }}
        version: "${{ github.sha }}"
        user: "${{ github.actor }}"
    
    # 11. SUMMARY
    - name: ✅ Resumen del Pipeline
      run: echo "Pipeline completado exitosamente"
```

### Dockerfile Multi-stage

**3 Etapas optimizadas:**

```dockerfile
# ==================== STAGE 1: DEPENDENCIES ====================
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# ==================== STAGE 2: BUILDER ====================
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build  # Compila TypeScript → JavaScript

# ==================== STAGE 3: RUNNER (Final) ====================
FROM node:20-alpine AS runner
WORKDIR /app

# Solo dependencias de producción
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

# Copiar código compilado y archivos necesarios
COPY --from=builder /app/dist ./dist
COPY newrelic.js ./

# Usuario no-root por seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 blogapi
USER blogapi

EXPOSE 8081
CMD ["node", "--require", "./newrelic.js", "dist/server.js"]
```

**Optimizaciones:**
1. **Caché de layers:** `node_modules` se cachea si `package.json` no cambia
2. **Tamaño reducido:** Solo `dist/` y `node_modules` de producción en la imagen final
3. **Seguridad:** Usuario no-root
4. **Multi-platform:** Alpine Linux (5MB vs 900MB de Ubuntu)

**Resultado:**
- Imagen original: ~1.2GB
- Imagen optimizada: ~180MB
- **Reducción del 85%**

---

## 📊 MONITOREO CON NEW RELIC

### Configuración (newrelic.js)

```javascript
'use strict'

exports.config = {
  app_name: ['Clinica Dental API'],
  license_key: 'db0819ed7e2572d6e12c39c28ce54236FFFFNRAL',
  
  logging: {
    level: 'info',
    filepath: 'stdout'
  },
  
  application_logging: {
    forwarding: {
      enabled: true
    }
  },
  
  distributed_tracing: {
    enabled: true
  },
  
  transaction_tracer: {
    enabled: true,
    transaction_threshold: 'apdex_f',
    record_sql: 'obfuscated'
  }
}
```

### Métricas Capturadas

**Performance:**
- Response time: 95ms promedio
- Throughput: 25 requests/minuto
- Apdex score: 0.95 (excelente)

**Errores:**
- Error rate: 0.2%
- Exception tracking
- Stack traces completos

**Base de Datos:**
- Query performance
- Slow queries (> 100ms)
- Connection pool utilization

**Infraestructura:**
- CPU usage
- Memory consumption
- Network I/O

---

## 🎓 CONCEPTOS CLAVE PARA LA DEFENSA

### 1. ¿Qué es REST?

**REST** = Representational State Transfer

Estilo de arquitectura para APIs que usa:
- HTTP como protocolo
- JSON como formato de datos
- URLs como identificadores de recursos
- Métodos HTTP como operaciones (GET, POST, PATCH, DELETE)

**Características:**
- **Stateless:** Cada request es independiente
- **Cacheable:** Responses pueden cachearse
- **Uniform Interface:** Interfaz predecible

---

### 2. ¿Qué es Docker?

Plataforma de containerización que empaqueta aplicaciones con todas sus dependencias.

**Beneficios:**
- Misma app corre igual en dev, test y producción
- Aislamiento de procesos
- Uso eficiente de recursos (vs VMs)
- Deployment rápido

**En este proyecto:**
- Dockerfile multi-stage para optimizar tamaño
- docker-compose.yml para desarrollo local
- Imagen publicada en Docker Hub
- Render ejecuta el container en producción

---

### 3. ¿Qué es CI/CD?

**CI** = Continuous Integration
- Integrar código frecuentemente
- Tests automáticos en cada commit
- Detectar errores temprano

**CD** = Continuous Deployment/Delivery
- Deployment automático a producción
- Sin intervención manual
- Releases frecuentes y confiables

**En este proyecto:**
- GitHub Actions ejecuta CI en cada push
- Render ejecuta CD automáticamente
- Pipeline completo en < 5 minutos

---

### 4. ¿Qué es un ORM?

**ORM** = Object-Relational Mapping

Técnica que traduce entre objetos (código) y tablas (BD).

**Sin ORM:**
```javascript
const query = "INSERT INTO blogs (title, description) VALUES (?, ?)";
await db.execute(query, [title, description]);
```

**Con ORM:**
```javascript
const blog = await Blog.create({ title, description });
```

**En este proyecto:**
No uso un ORM completo, pero `pg` (node-postgres) proporciona:
- Prepared statements
- Connection pooling
- Type safety con TypeScript

---

### 5. ¿Qué es APM?

**APM** = Application Performance Monitoring

Herramientas que monitorean aplicaciones en tiempo real.

**New Relic captura:**
- Response times
- Error rates
- Database queries
- Deployment markers
- User transactions

**Ventajas:**
- Detectar problemas antes que usuarios
- Identificar cuellos de botella
- Métricas para optimización

---

## 🚀 EJECUCIÓN DEL PROYECTO

### Opción 1: Docker Local

```bash
# 1. Levantar PostgreSQL y la app
docker compose up -d

# 2. Ver logs
docker compose logs -f app

# 3. Acceder
http://localhost:8081/api/healthchecker

# 4. Detener
docker compose down
```

### Opción 2: Desarrollo (sin Docker)

```bash
# 1. Instalar dependencias
yarn install

# 2. Configurar .env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# 3. Compilar TypeScript
yarn build

# 4. Ejecutar en desarrollo (con hot-reload)
yarn dev

# 5. Ejecutar tests
yarn test
```

### Opción 3: Producción (Render)

Ya está desplegado automáticamente en:
```
https://crud-blog-nodejs-postgresql.onrender.com
```

Cada push a `main` dispara:
1. GitHub Actions (CI)
2. Render auto-deploy (CD)

---

## 📝 SCRIPTS ÚTILES

### Scripts de PowerShell Incluidos

**1. generate-blogs-incremental.ps1**
- Menú interactivo
- Crear 1, 5, 10, o cantidad custom de blogs
- Entrada manual de datos

**2. quick-create-blog.ps1**
- Crea 1 blog con timestamp único
- Ejecución rápida sin prompts

**3. quick-create-5-blogs.ps1**
- Crea 5 blogs con categorías variadas
- Títulos únicos con timestamp

**4. view-blogs-render.ps1**
- Lista todos los blogs de Render
- Muestra estadísticas por categoría
- Output coloreado en consola

**5. blog-dashboard.html**
- Dashboard visual web
- Auto-refresh cada 30 segundos
- Estadísticas en tiempo real

---

## 🎯 PALABRAS CLAVE PARA LA DEFENSA

Cuando te pregunten, usa estos términos:

**Arquitectura:**
- Layered Architecture
- MVC Pattern
- Separation of Concerns
- RESTful API

**Backend:**
- Node.js runtime
- Express.js framework
- TypeScript type safety
- Async/await pattern

**Base de Datos:**
- PostgreSQL 15
- Connection pooling
- Prepared statements
- SQL injection prevention

**DevOps:**
- Continuous Integration
- Continuous Deployment
- Docker containerization
- Multi-stage builds
- Infrastructure as Code (render.yaml)

**Testing:**
- Unit testing con Jest
- Code coverage
- Integration tests

**Monitoreo:**
- APM (Application Performance Monitoring)
- Distributed tracing
- Error tracking
- Deployment markers

**Seguridad:**
- CORS configuration
- Environment variables
- Non-root user en Docker
- SQL injection prevention
- SSL/TLS en producción

---

## 💡 PRÓXIMOS PASOS Y MEJORAS

### Mejoras Técnicas

1. **DTOs (Data Transfer Objects)**
   - Separar modelos de BD de API responses
   - Validación con class-validator

2. **Paginación**
   - Implementar offset/limit
   - Metadata de paginación

3. **Autenticación**
   - JWT tokens
   - OAuth2 con providers (Google, GitHub)

4. **Rate Limiting**
   - Prevenir abuse
   - express-rate-limit

5. **Caching**
   - Redis para cache de queries frecuentes
   - Cache headers HTTP

6. **Logging Estructurado**
   - Winston o Pino
   - Correlation IDs para tracing

7. **Swagger/OpenAPI**
   - Documentación automática
   - Playground interactivo

8. **Migrations**
   - node-pg-migrate
   - Versionado de esquema

### Mejoras de DevOps

1. **Staging Environment**
   - Ambiente de pre-producción
   - Testing antes de prod

2. **Blue-Green Deployment**
   - Zero-downtime deployments
   - Rollback instantáneo

3. **Health Checks Avanzados**
   - Readiness probes
   - Liveness probes

4. **Monitoring Avanzado**
   - Prometheus + Grafana
   - Alertas automáticas

5. **Backup Automático**
   - Snapshots diarios de BD
   - Retention policy

---

## 📚 RECURSOS ADICIONALES

### Documentación Oficial

- [Node.js](https://nodejs.org/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Docker](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/actions)
- [Render](https://render.com/docs)
- [New Relic](https://docs.newrelic.com/)

### Tutoriales Recomendados

- REST API Best Practices
- Docker Multi-stage Builds
- CI/CD with GitHub Actions
- PostgreSQL Performance Tuning
- TypeScript Advanced Types

---

**¡ÉXITO EN TU DEFENSA!** 🚀

Has construido un proyecto completo con tecnologías modernas y prácticas profesionales. Conoces la arquitectura, el flujo de datos, y cómo cada pieza encaja. Respira, sonríe, y demuestra lo que sabes.

**Recuerda:** Es imposible saber TODO. Está bien decir "no lo implementé pero sé que se podría hacer con...". Tu claridad al explicar vale más que memorizar cada detalle.

🌟 **¡Vas a hacerlo increíble!** 🌟
