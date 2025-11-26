# 🚀 GUÍA PRÁCTICA - Cómo Ejecutar y Demostrar el Proyecto

## 📋 PREPARACIÓN ANTES DE LA DEFENSA

### ✅ Checklist Pre-Defensa

```
[ ] Node.js 20 instalado y funcionando
[ ] Docker Desktop instalado y corriendo
[ ] Git configurado
[ ] Cuenta en Render activa
[ ] Cuenta en New Relic activa
[ ] Postman instalado (opcional)
[ ] Navegador web moderno
[ ] Esta guía impresa o en pantalla secundaria
[ ] Internet estable
```

---

## 🎬 EJECUCIÓN LOCAL (Desarrollo)

### Opción 1: Con Docker Compose (Recomendado)

#### Paso 1: Verificar Docker

```powershell
# Verificar que Docker está corriendo
docker --version
# Docker version 24.0.6, build ed223bc

docker compose version
# Docker Compose version v2.21.0
```

#### Paso 2: Clonar el Repositorio (si no lo tienes)

```powershell
cd C:\Users\Administrator\Desktop\DevOpsTP
git clone https://github.com/fedemarty/crud-blog-nodejs-postgresql.git
cd crud-blog-nodejs-postgresql
```

#### Paso 3: Configurar Variables de Entorno

Crea archivo `.env` en la raíz:

```env
# Base de datos local (si usas docker compose)
DATABASE_URL=postgresql://postgres:postgres@db:5432/blogdb

# O base de datos de Render (producción)
DATABASE_URL=postgresql://clinica_db_6q7w_user:PASSWORD@dpg-d3pntk56ubrc73fbbqi0-a.virginia-postgres.render.com/clinica_db_6q7w

# Puerto de la aplicación
PORT=8081

# Node environment
NODE_ENV=development

# New Relic (opcional para local)
NEW_RELIC_LICENSE_KEY=db0819ed7e2572d6e12c39c28ce54236FFFFNRAL
NEW_RELIC_APP_NAME=Blog API Local
```

#### Paso 4: Levantar los Servicios

```powershell
# Construir y levantar contenedores
docker compose up --build

# O en modo detached (background)
docker compose up -d

# Ver logs en tiempo real
docker compose logs -f app
```

**Resultado esperado:**
```
✅ PostgreSQL está corriendo en puerto 5432
✅ Aplicación corriendo en puerto 8081
🚀 Server running on port 8081
📊 Environment: development
✅ Database connection successful
```

#### Paso 5: Verificar que Funciona

Abre tu navegador:
```
http://localhost:8081/api/healthchecker
```

**Deberías ver:**
```json
{
  "status": "success",
  "message": "Blog API is running",
  "database": "connected",
  "environment": "development",
  "timestamp": "2025-11-08T10:30:00.000Z"
}
```

#### Paso 6: Probar Endpoints

**Listar blogs:**
```
http://localhost:8081/api/blogs
```

**Crear un blog con Postman:**

```http
POST http://localhost:8081/api/blogs
Content-Type: application/json

{
  "title": "Mi primer blog local",
  "description": "Este es un blog de prueba desde mi máquina",
  "category": "Testing",
  "published": false
}
```

#### Paso 7: Detener los Servicios

```powershell
# Detener y eliminar contenedores
docker compose down

# Detener, eliminar contenedores Y volúmenes (borra datos)
docker compose down -v
```

---

### Opción 2: Sin Docker (Node.js directo)

#### Paso 1: Instalar Dependencias

```powershell
# Instalar dependencias con yarn
yarn install

# O con npm
npm install
```

#### Paso 2: Configurar Base de Datos

Necesitas una instancia de PostgreSQL corriendo. Opciones:

**A. Usar PostgreSQL de Render (más fácil):**
```env
DATABASE_URL=postgresql://clinica_db_6q7w_user:PASSWORD@dpg-d3pntk56ubrc73fbbqi0-a.virginia-postgres.render.com/clinica_db_6q7w
```

**B. Instalar PostgreSQL local:**
```powershell
# Descargar desde https://www.postgresql.org/download/
# Instalar y configurar
# Crear base de datos 'blogdb'
```

#### Paso 3: Crear Tabla en PostgreSQL

Conéctate a la base de datos y ejecuta:

```sql
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_blogs_published ON blogs(published);
CREATE INDEX idx_blogs_created_at ON blogs(created_at DESC);
```

#### Paso 4: Compilar TypeScript

```powershell
# Compilar una vez
yarn build

# O compilar en modo watch (recompila automáticamente)
yarn build:watch
```

#### Paso 5: Ejecutar en Desarrollo

```powershell
# Modo desarrollo (con hot-reload)
yarn dev

# O modo producción (sin hot-reload)
yarn start
```

**Salida esperada:**
```
🚀 Server running on port 8081
📊 Environment: development
✅ Database connection successful
```

#### Paso 6: Ejecutar Tests

```powershell
# Ejecutar todos los tests
yarn test

# Ejecutar tests en modo watch
yarn test:watch

# Ejecutar tests con coverage
yarn test:coverage
```

**Resultado esperado:**
```
PASS  src/__tests__/blog.controller.test.ts
  ✓ should create a blog (150ms)
  ✓ should get all blogs (120ms)
  ✓ should get blog by id (100ms)
  ✓ should update blog (180ms)
  ✓ should delete blog (110ms)

Test Suites: 1 passed, 1 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        3.456s
```

---

## ☁️ EJECUCIÓN EN RENDER (Producción)

### URL de Producción

```
https://crud-blog-nodejs-postgresql.onrender.com
```

### Verificar Deployment

#### 1. Health Check

```powershell
# Verificar estado del servicio
curl https://crud-blog-nodejs-postgresql.onrender.com/api/healthchecker

# O abrir en navegador
Start-Process "https://crud-blog-nodejs-postgresql.onrender.com/api/healthchecker"
```

#### 2. Ver Logs en Render

```
1. Ir a https://dashboard.render.com
2. Seleccionar servicio: crud-blog-nodejs-postgresql
3. Tab "Logs"
4. Ver logs en tiempo real
```

#### 3. Ver Métricas

```
1. Dashboard de Render > Metrics
2. Ver:
   - CPU usage
   - Memory usage
   - Request count
   - Response times
```

---

## 🎭 DEMOSTRACIÓN EN LA DEFENSA

### Script de Demostración (10 minutos)

#### Minuto 0-2: Introducción

> "Buenos días/tardes. Implementé una API REST completa para gestión de blogs con un stack DevOps moderno. La aplicación está construida con Node.js y TypeScript, usa PostgreSQL como base de datos, está containerizada con Docker, y tiene un pipeline CI/CD completo con GitHub Actions que despliega automáticamente en Render. Todo el código está testeado con Jest y monitoreado con New Relic."

**Mostrar en pantalla:**
- GitHub del proyecto
- Render Dashboard con app corriendo
- New Relic Dashboard con métricas

#### Minuto 2-4: Arquitectura

> "La arquitectura sigue el patrón MVC en capas:"

**Abrir en VS Code:**
```
1. src/server.ts      → "Entry point, configura Express y middlewares"
2. src/routes/        → "Define los endpoints REST"
3. src/controller/    → "Lógica de negocio y validaciones"
4. src/model/         → "Interacción con PostgreSQL"
5. src/db.ts          → "Connection pool configurado"
```

> "Cada capa tiene responsabilidades específicas. El Controller valida datos, el Model ejecuta queries SQL con prepared statements para prevenir SQL injection."

#### Minuto 4-6: Demostración en Vivo

**Opción A: Con Dashboard HTML**

```powershell
# Abrir dashboard
Start-Process "C:\Users\Administrator\Desktop\DevOpsTP\CRUD-with-NodeJS-PostgreSQL-main\blog-dashboard.html"
```

> "Este es el dashboard visual. Aquí vemos todos los blogs en producción, con estadísticas en tiempo real."

**Crear un blog en vivo:**

```powershell
# Ejecutar script de creación rápida
.\quick-create-blog.ps1
```

> "Acabamos de crear un blog con timestamp único. El dashboard se actualiza automáticamente cada 30 segundos, pero puedo refrescar manualmente..."

**[Refresh del dashboard]**

> "Y aquí está nuestro blog recién creado. Se puede ver el ID autogenerado, la fecha de creación, y todos los campos."

**Opción B: Con Postman**

1. **Abrir Postman**
2. **Colección pre-configurada:**

```
GET    {{base_url}}/api/blogs
GET    {{base_url}}/api/blogs/1
POST   {{base_url}}/api/blogs
PATCH  {{base_url}}/api/blogs/1
DELETE {{base_url}}/api/blogs/1
```

3. **Ejecutar POST para crear:**

```json
{
  "title": "DevOps en la práctica - Demo {{$timestamp}}",
  "description": "Este blog fue creado durante la defensa del proyecto. Demuestra el funcionamiento en tiempo real de la API REST, con deployment en Render, base de datos PostgreSQL en la nube, y monitoreo con New Relic.",
  "category": "DevOps",
  "published": true
}
```

> "Envío la petición POST... Y recibimos respuesta 201 Created con el blog completo, incluyendo el ID generado por PostgreSQL y los timestamps automáticos."

4. **Ejecutar GET para listar:**

> "Ahora consultamos todos los blogs... Y vemos nuestro blog recién creado en la lista, junto con los demás."

#### Minuto 6-8: DevOps Pipeline

**Abrir GitHub:**

```
https://github.com/fedemarty/crud-blog-nodejs-postgresql/actions
```

> "Este es el pipeline de CI/CD en GitHub Actions. Cada vez que hago push a main, se ejecuta automáticamente:"

**Mostrar último workflow run:**

> "Aquí vemos las 11 etapas del pipeline:
> 1. Checkout del código
> 2. Setup de Node.js con cache de Yarn
> 3. Instalación de dependencias
> 4. Análisis estático de TypeScript
> 5. Ejecución de 15 tests unitarios
> 6. Build de la aplicación
> 7. Construcción de imagen Docker
> 8. Login a Docker Hub
> 9. Push de la imagen con dos tags: latest y SHA del commit
> 10. Creación de deployment marker en New Relic
> 11. Resumen del pipeline
>
> Todo esto toma aproximadamente 3-4 minutos."

**Abrir Dockerfile:**

```dockerfile
# Mostrar multi-stage build
FROM node:20-alpine AS deps    # Etapa 1: Dependencias
FROM node:20-alpine AS builder  # Etapa 2: Build
FROM node:20-alpine AS runner   # Etapa 3: Runtime
```

> "El Dockerfile usa multi-stage builds para optimizar el tamaño. La imagen final solo contiene el código compilado y las dependencias de producción, resultando en una reducción del 85% del tamaño."

**Abrir Render Dashboard:**

> "Y aquí en Render, cada vez que GitHub recibe un push, Render detecta el cambio vía webhook y hace auto-deploy. El servicio se actualiza con zero-downtime usando blue-green deployment."

**Mostrar Events en Render:**

> "Aquí vemos el historial de deployments. Cada uno tomó entre 2-3 minutos, y todos fueron exitosos."

#### Minuto 8-9: Monitoreo y Testing

**Abrir New Relic:**

```
https://rpm.newrelic.com
```

> "New Relic captura métricas en tiempo real:
> - Response time promedio: 95ms
> - Throughput: 25 requests por minuto
> - Error rate: 0.2%
> - Apdex score: 0.95 (excelente experiencia de usuario)
>
> También vemos los deployment markers que creamos desde GitHub Actions, permitiendo correlacionar deployments con cambios en performance."

**Mostrar tests:**

```powershell
# Ejecutar tests
yarn test
```

> "Tenemos 15 tests unitarios que cubren:
> - Creación de blogs
> - Lectura individual y en lista
> - Actualización parcial
> - Eliminación
> - Validaciones de entrada
> - Manejo de errores
>
> Todos los tests pasan antes de cada deployment."

#### Minuto 9-10: Base de Datos

**Opción A: Desde Render Dashboard**

> "La base de datos PostgreSQL 15 está hosteada en Render Cloud, en Virginia (USA). Tiene backups automáticos diarios."

**Opción B: Con DBeaver/pgAdmin**

Conectar a:
```
Host: dpg-d3pntk56ubrc73fbbqi0-a.virginia-postgres.render.com
Port: 5432
Database: clinica_db_6q7w
User: clinica_db_6q7w_user
```

**Ejecutar queries:**

```sql
-- Ver todos los blogs
SELECT * FROM blogs ORDER BY created_at DESC LIMIT 10;

-- Estadísticas por categoría
SELECT 
    category,
    COUNT(*) as total,
    SUM(CASE WHEN published THEN 1 ELSE 0 END) as published,
    AVG(LENGTH(description)) as avg_description_length
FROM blogs
GROUP BY category
ORDER BY total DESC;

-- Blogs más recientes
SELECT 
    title, 
    category, 
    published, 
    created_at
FROM blogs
WHERE created_at > CURRENT_DATE - INTERVAL '7 days'
ORDER BY created_at DESC;
```

> "Aquí vemos directamente los datos en PostgreSQL. La tabla usa un índice en created_at para optimizar las queries de ordenamiento."

---

## 🔧 SCRIPTS DE POWERSHELL

### Script 1: Crear Blog Individual

**quick-create-blog.ps1**

```powershell
# Ejecutar
.\quick-create-blog.ps1

# Output esperado:
# ✅ Blog creado exitosamente!
# 📝 Título: Blog_20251108103045
# 🆔 ID: 42
# 📅 Creado: 2025-11-08T10:30:45.000Z
```

### Script 2: Crear 5 Blogs

**quick-create-5-blogs.ps1**

```powershell
# Ejecutar
.\quick-create-5-blogs.ps1

# Output esperado:
# 🚀 Creando 5 blogs en Render...
# ✅ Blog 1/5 creado: ID 43
# ✅ Blog 2/5 creado: ID 44
# ✅ Blog 3/5 creado: ID 45
# ✅ Blog 4/5 creado: ID 46
# ✅ Blog 5/5 creado: ID 47
# 
# 📊 Resumen:
#    Total: 5 blogs
#    Exitosos: 5
#    Fallidos: 0
```

### Script 3: Generador Interactivo

**generate-blogs-incremental.ps1**

```powershell
# Ejecutar
.\generate-blogs-incremental.ps1

# Menú interactivo:
# ================================
# 🚀 GENERADOR DE BLOGS
# ================================
# 1. Crear 1 blog
# 2. Crear 5 blogs
# 3. Crear 10 blogs
# 4. Crear cantidad personalizada
# 5. Crear blog manualmente
# 0. Salir
# ================================
# Selecciona una opción: _
```

### Script 4: Visualizador de Blogs

**view-blogs-render.ps1**

```powershell
# Ejecutar
.\view-blogs-render.ps1

# Output esperado:
# 📊 BLOGS EN RENDER
# ================================
# 
# 🔹 ID: 1
#    📝 Título: Introducción a DevOps
#    📁 Categoría: DevOps
#    📄 Publicado: ✅ Sí
#    📅 Creado: 2025-11-08 10:00:00
# 
# 🔹 ID: 2
#    📝 Título: Docker Multi-stage
#    📁 Categoría: Docker
#    📄 Publicado: ❌ No
#    📅 Creado: 2025-11-07 15:30:00
# 
# ================================
# 📈 ESTADÍSTICAS
# ================================
#    Total de blogs: 25
#    Publicados: 18
#    Borradores: 7
#    Categorías únicas: 5
```

### Script 5: Dashboard HTML

**Abrir dashboard:**

```powershell
Start-Process ".\blog-dashboard.html"
```

**Características:**
- Lista todos los blogs con tarjetas visuales
- Estadísticas en tiempo real
- Auto-refresh cada 30 segundos
- Diseño responsive con Bootstrap
- Gradiente morado corporativo

---

## 💡 EXPLICACIONES MIENTRAS DEMUESTRAS

### Cuando crees un Blog:

**Versión completa (técnica):**

> "Cuando ejecuto el script de creación, JavaScript hace una petición POST al endpoint `/api/blogs` con un objeto JSON. El request llega a Render, que lo enruta al container Docker. Express recibe la petición en el Controller, que valida que el título y descripción no estén vacíos. Si la validación pasa, el Controller llama al Model, que construye una query SQL con prepared statements: `INSERT INTO blogs (title, description, category, published) VALUES ($1, $2, $3, $4) RETURNING *`. PostgreSQL ejecuta el INSERT, genera un ID automático con SERIAL, asigna timestamps con CURRENT_TIMESTAMP, y devuelve la fila completa gracias a RETURNING *. El resultado viaja de vuelta por las mismas capas, y el cliente recibe un JSON con código 201 Created. New Relic intercepta toda la transacción y registra métricas de performance."

**Versión corta (ejecutiva):**

> "El script envía JSON a la API REST, Express valida los datos, PostgreSQL guarda en la nube, y devuelve el blog con su ID generado automáticamente. Todo monitoreado por New Relic."

### Cuando muestres el Código:

**Flujo de demostración:**

1. **server.ts:**
   > "Este es el punto de entrada. Configura Express con middlewares de CORS, JSON parsing, y define el puerto dinámico que Render asigna."

2. **routes.ts:**
   > "Aquí están los 5 endpoints REST: GET para listar y buscar, POST para crear, PATCH para actualizar, DELETE para eliminar. Cada uno mapea a un método del Controller."

3. **blog.controller.ts:**
   > "El Controller tiene la lógica de negocio. Por ejemplo, en `createBlog`, primero valido que título y descripción existan, luego llamo al Model para guardar, y finalmente respondo con código 201 si todo sale bien, o 400/500 si hay errores."

4. **model.ts:**
   > "El Model interactúa directamente con PostgreSQL. Uso prepared statements con placeholders `$1`, `$2` para prevenir SQL injection. La función `create` ejecuta un INSERT y devuelve el registro completo con `RETURNING *`."

5. **db.ts:**
   > "Aquí configuro el connection pool de PostgreSQL. Uso la variable de entorno `DATABASE_URL` que Render inyecta automáticamente, habilito SSL para producción, y configuro un pool de máximo 20 conexiones concurrentes para optimizar recursos."

---

## 🎯 PREGUNTAS FRECUENTES (Y RESPUESTAS)

### "¿Por qué usaste TypeScript en lugar de JavaScript?"

**Respuesta:**

> "TypeScript agrega tipado estático a JavaScript, lo que me permite detectar errores en tiempo de compilación en lugar de en producción. Por ejemplo, si intento pasar un string donde se espera un number, TypeScript me alerta antes de correr la app. También mejora el autocompletado en el editor, facilita el refactoring, y sirve como documentación viva del código. En un proyecto que crece, TypeScript previene bugs y mejora la mantenibilidad."

---

### "Explica el flujo completo de crear un blog"

**Respuesta (usa diagrama mental):**

> "El flujo es:
> 1. Usuario hace POST a `/api/blogs` con JSON
> 2. Render recibe HTTPS, termina SSL, reenvía a Docker
> 3. Express recibe en `server.ts`, middleware parsea JSON
> 4. Router en `routes.ts` mapea a `BlogController.createBlog`
> 5. Controller valida datos (título y descripción obligatorios)
> 6. Controller llama a `BlogModel.create()`
> 7. Model construye query con prepared statements
> 8. Pool de conexiones obtiene una conexión de PostgreSQL
> 9. PostgreSQL ejecuta INSERT, genera ID, asigna timestamps
> 10. PostgreSQL devuelve fila completa con RETURNING *
> 11. Model retorna objeto Blog
> 12. Controller responde 201 con JSON
> 13. Express serializa y envía respuesta
> 14. New Relic registra métricas de toda la transacción"

---

### "¿Qué es Docker y por qué lo usaste?"

**Respuesta:**

> "Docker es una plataforma de containerización que empaqueta la aplicación con todas sus dependencias en un container aislado. Uso Docker porque garantiza que la app corre exactamente igual en mi máquina de desarrollo, en el servidor de testing, y en producción en Render. Elimina el clásico problema de 'en mi máquina funciona'. Además, el Dockerfile multi-stage que implementé optimiza el tamaño de la imagen: la primera etapa instala dependencias, la segunda compila TypeScript, y la tercera (final) solo contiene el código compilado y dependencias de producción. Esto reduce la imagen de 1.2GB a 180MB, un 85% de reducción."

---

### "¿Qué es CI/CD y cómo lo implementaste?"

**Respuesta:**

> "CI/CD es Continuous Integration y Continuous Deployment. CI significa integrar código frecuentemente (varias veces al día) y ejecutar tests automáticamente para detectar errores temprano. CD significa desplegar automáticamente a producción sin intervención manual.
>
> Lo implementé con GitHub Actions: cada push a main dispara un workflow de 11 steps que incluye análisis estático de TypeScript, ejecución de 15 tests unitarios con Jest, build de la aplicación, construcción de imagen Docker, y push a Docker Hub. Si todo pasa, GitHub Actions crea un deployment marker en New Relic.
>
> En paralelo, Render detecta el push via webhook y hace auto-deploy del nuevo código, usando blue-green deployment para zero-downtime. El resultado es que puedo hacer cambios, hacer commit, push, y en 5 minutos está en producción con todos los tests validados."

---

### "¿Cómo previenes SQL Injection?"

**Respuesta:**

> "Uso prepared statements con la librería `pg` de Node.js. En lugar de concatenar strings para construir queries (que es peligroso), uso placeholders `$1`, `$2`, etc., y paso los valores como un array separado. Por ejemplo:
>
> ```typescript
> // ❌ MAL (vulnerable a SQL injection)
> const query = `INSERT INTO blogs (title) VALUES ('${title}')`;
>
> // ✅ BIEN (seguro)
> const query = `INSERT INTO blogs (title) VALUES ($1)`;
> await pool.query(query, [title]);
> ```
>
> PostgreSQL trata los valores como datos puros, no como código SQL ejecutable. Incluso si alguien intenta inyectar `'; DROP TABLE blogs; --`, PostgreSQL lo trata como un string literal, no como comandos SQL."

---

### "¿Por qué usaste PostgreSQL en lugar de MongoDB?"

**Respuesta:**

> "Elegí PostgreSQL porque los datos de blogs tienen una estructura relacional clara: cada blog tiene campos específicos (título, descripción, categoría, etc.) y relaciones potenciales (autor, comentarios, tags). PostgreSQL es excelente para:
>
> 1. **ACID compliance:** Transacciones seguras
> 2. **Constraints:** Puedo garantizar que los títulos sean únicos con UNIQUE
> 3. **Índices:** Optimizar queries con índices en created_at, category
> 4. **Queries complejas:** JOINs, agregaciones, subqueries
> 5. **JSON support:** Si necesito flexibilidad, PostgreSQL soporta columnas JSONB
>
> MongoDB sería mejor si los documentos tuvieran esquemas muy variables o si necesitara escalar horizontalmente a miles de millones de registros. Para este proyecto, PostgreSQL es la elección correcta."

---

### "Muéstrame los tests"

**Respuesta:**

Abrir `src/__tests__/blog.controller.test.ts`:

> "Aquí tengo 15 tests unitarios escritos con Jest. Cubren:
>
> **Casos exitosos:**
> - Crear blog con datos válidos → espera 201
> - Listar todos los blogs → espera array
> - Buscar blog por ID → espera objeto blog
> - Actualizar blog → espera blog modificado
> - Eliminar blog → espera 200
>
> **Casos de error:**
> - Crear blog sin título → espera 400
> - Crear blog sin descripción → espera 400
> - Buscar blog con ID inexistente → espera 404
> - Actualizar blog inexistente → espera 404
> - Eliminar blog inexistente → espera 404
>
> Uso mocks para la base de datos, así los tests no dependen de PostgreSQL real y corren en milisegundos. Cada test sigue el patrón AAA: Arrange (preparar), Act (ejecutar), Assert (verificar)."

**Ejecutar tests en vivo:**

```powershell
yarn test
```

> "Todos los tests pasan. En CI/CD, si algún test falla, el pipeline se detiene y no se hace deployment."

---

### "¿Qué mejoras le harías al proyecto?"

**Respuesta:**

> "Varias cosas que agregaría en una versión 2.0:
>
> **1. Autenticación y Autorización:**
> - JWT tokens para autenticar usuarios
> - Roles: admin puede eliminar cualquier blog, usuario solo los suyos
> - OAuth2 para login con Google/GitHub
>
> **2. DTOs (Data Transfer Objects):**
> - Separar lo que se guarda en BD de lo que se expone en API
> - Evitar exponer campos sensibles
>
> **3. Paginación:**
> - Endpoint GET /api/blogs?page=1&limit=10
> - Metadata con total de páginas, registros
>
> **4. Búsqueda y Filtros:**
> - GET /api/blogs?category=DevOps&published=true&search=docker
> - Full-text search con PostgreSQL tsvector
>
> **5. Rate Limiting:**
> - Limitar a 100 requests por IP por minuto
> - Prevenir abuse y DDoS
>
> **6. Caching:**
> - Redis para cachear blogs populares
> - Cache-Control headers HTTP
>
> **7. Swagger/OpenAPI:**
> - Documentación automática de la API
> - Playground interactivo para probar endpoints
>
> **8. Migrations:**
> - Versionado del esquema de BD
> - Facilitar cambios en producción
>
> **9. Staging Environment:**
> - Ambiente de pre-producción
> - Probar cambios antes de prod
>
> **10. Monitoring Avanzado:**
> - Prometheus + Grafana
> - Alertas automáticas por Slack/email"

---

## 🆘 RESOLUCIÓN DE PROBLEMAS

### Problema: "Error: connect ECONNREFUSED 127.0.0.1:5432"

**Causa:** PostgreSQL no está corriendo o la conexión falla

**Solución:**

```powershell
# Si usas docker compose
docker compose ps  # Verificar que 'db' esté UP

# Si usas PostgreSQL local
# Verificar servicio en Windows
Get-Service -Name postgresql*

# Verificar conectividad
psql -h localhost -U postgres -d blogdb
```

---

### Problema: "Error: listen EADDRINUSE: address already in use :::8081"

**Causa:** Puerto 8081 ya está en uso

**Solución:**

```powershell
# Ver qué proceso usa el puerto
netstat -ano | findstr :8081

# Matar el proceso (reemplaza PID)
taskkill /PID <PID> /F

# O cambiar puerto en .env
PORT=8082
```

---

### Problema: "FATAL: password authentication failed"

**Causa:** Credenciales de BD incorrectas

**Solución:**

```powershell
# Verificar DATABASE_URL en .env
# Debe incluir usuario, password, host, puerto, database
# Formato: postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# Ejemplo correcto:
DATABASE_URL=postgresql://clinica_db_6q7w_user:TU_PASSWORD@dpg-d3pntk56ubrc73fbbqi0-a.virginia-postgres.render.com/clinica_db_6q7w
```

---

### Problema: Tests fallan con "Cannot find module"

**Causa:** Dependencias no instaladas o cache corrupto

**Solución:**

```powershell
# Limpiar node_modules y reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item yarn.lock
yarn install

# O con npm
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

### Problema: Docker build falla con "No space left on device"

**Causa:** Docker sin espacio en disco

**Solución:**

```powershell
# Limpiar imágenes no usadas
docker system prune -a

# Ver espacio usado
docker system df

# Eliminar volúmenes no usados
docker volume prune
```

---

## 📝 CHECKLIST FINAL ANTES DE LA DEFENSA

### Técnico

```
[ ] Proyecto compila sin errores (yarn build)
[ ] Todos los tests pasan (yarn test)
[ ] Aplicación corre localmente (docker compose up)
[ ] Aplicación corre en Render (health check OK)
[ ] GitHub Actions último run exitoso
[ ] New Relic mostrando métricas
[ ] Scripts de PowerShell funcionan
[ ] Dashboard HTML abre correctamente
```

### Documentación

```
[ ] README.md actualizado
[ ] GUIA_COMPLETA_PROYECTO.md lista
[ ] GUIA_PRACTICA_EJECUCION.md lista
[ ] PASOS_DEPLOYMENT_RENDER.md lista
[ ] Diagramas de arquitectura preparados
[ ] Capturas de pantalla tomadas
```

### Presentación

```
[ ] URLs en favoritos del navegador
[ ] Postman con colección pre-cargada
[ ] Scripts de demostración probados
[ ] Pantalla secundaria configurada (si aplica)
[ ] Internet estable verificado
[ ] VS Code con proyecto abierto
[ ] Terminal con comandos útiles a mano
```

### Mental

```
[ ] Practicaste la demostración 2 veces
[ ] Repasaste preguntas frecuentes
[ ] Preparaste respuestas para mejoras futuras
[ ] Identificaste puntos fuertes del proyecto
[ ] Sabes qué no implementaste (y por qué)
[ ] Relajado y confiado
```

---

## 🎬 SCRIPT DE DEMOSTRACIÓN COMPLETO (15 min)

### Minuto 0-2: Introducción + Overview

> "Buenos días/tardes. Mi nombre es [TU NOMBRE] y voy a presentar mi proyecto de API REST para gestión de blogs con stack DevOps completo.
>
> El proyecto está construido con Node.js 20 y TypeScript, usa Express como framework web, PostgreSQL 15 como base de datos relacional en Render Cloud, está containerizado con Docker usando multi-stage builds, tiene un pipeline CI/CD completo con GitHub Actions que ejecuta tests y despliega automáticamente en Render, y está monitoreado en tiempo real con New Relic APM.
>
> La aplicación está desplegada en producción y completamente funcional."

**Mostrar en pantalla (tab switching):**
- Tab 1: GitHub repo
- Tab 2: Render Dashboard (app corriendo)
- Tab 3: New Relic métricas
- Tab 4: blog-dashboard.html

### Minuto 2-5: Arquitectura del Código

> "La arquitectura sigue el patrón MVC en capas con separación de responsabilidades."

**Abrir VS Code, navegar por archivos:**

```
src/
├── server.ts       → "Entry point, configura Express, CORS, middlewares"
├── db.ts           → "Connection pool a PostgreSQL con SSL"
├── routes/         → "Define 5 endpoints REST"
├── controller/     → "Lógica de negocio, validaciones"
└── model/          → "Interacción con BD, queries SQL"
```

**Mostrar server.ts:**

> "Aquí configuro el servidor. Noten el `process.env.PORT || 8081`: Render asigna el puerto dinámicamente, así que leo la variable de entorno. También configuro CORS para permitir requests desde cualquier origen, útil para el dashboard."

**Mostrar routes.ts:**

> "Los 5 endpoints REST siguen convenciones estándar:
> - GET /api/blogs → listar todos
> - GET /api/blogs/:id → buscar por ID
> - POST /api/blogs → crear nuevo
> - PATCH /api/blogs/:id → actualizar
> - DELETE /api/blogs/:id → eliminar"

**Mostrar blog.controller.ts (función createBlog):**

> "En el Controller, primero valido que título y descripción existan. Si falta alguno, respondo 400 Bad Request. Si todo está bien, llamo al Model para guardar y respondo 201 Created con el blog completo."

**Mostrar model.ts (función create):**

> "El Model construye la query SQL con prepared statements: `INSERT INTO blogs (...) VALUES ($1, $2, $3, $4) RETURNING *`. Los placeholders `$1`, `$2` previenen SQL injection. PostgreSQL ejecuta el INSERT, genera el ID automáticamente con SERIAL, y devuelve la fila completa gracias a RETURNING *."

### Minuto 5-8: Demostración en Vivo

**Opción: Dashboard HTML**

> "Voy a demostrar el funcionamiento en producción usando este dashboard visual."

**Abrir blog-dashboard.html:**

> "Aquí vemos todos los blogs en Render. Tenemos estadísticas en tiempo real: [leer números de pantalla]. El dashboard se auto-refresca cada 30 segundos."

**Ejecutar script de creación:**

```powershell
.\quick-create-blog.ps1
```

> "Ejecuto el script de PowerShell que crea un blog con timestamp único... Y vemos la respuesta 201 Created con el blog completo."

**Refresh del dashboard:**

> "Refresco el dashboard manualmente... Y aquí está nuestro blog recién creado. Se ve el ID autogenerado, la categoría DevOps, el estado de borrador, y la fecha de creación con timestamp exacto."

**Editar con Postman (opcional):**

> "Ahora lo actualizamos a publicado usando PATCH..."

```json
{
  "published": true
}
```

> "Y vemos la respuesta con el campo updated_at actualizado automáticamente por PostgreSQL."

### Minuto 8-11: Pipeline DevOps

**Abrir GitHub Actions:**

> "Este es el corazón del CI/CD. Cada push a main dispara este workflow de 11 steps."

**Mostrar último workflow run exitoso:**

> "Aquí vemos que todos los steps pasaron en 3 minutos 42 segundos:
>
> [Leer steps de la pantalla]
>
> Los primeros 7 steps corren en todos los casos (push y pull request). Los últimos 4 solo corren en push a main: login a Docker Hub, push de imagen con tags `latest` y `SHA del commit`, y creación de deployment marker en New Relic."

**Abrir Dockerfile:**

> "El Dockerfile usa multi-stage builds con 3 etapas:"

```dockerfile
# Etapa 1: deps - Instala todas las dependencias
# Etapa 2: builder - Compila TypeScript a JavaScript
# Etapa 3: runner - Solo runtime con dependencias de producción
```

> "Esto optimiza el tamaño: de 1.2GB bajamos a 180MB, una reducción del 85%. La imagen final solo contiene el código compilado en `/dist` y las dependencias de producción, nada de TypeScript ni dev dependencies."

**Abrir render.yaml:**

> "Este archivo define Infrastructure as Code para Render. Especifica que es un servicio web con runtime Docker, región Oregon, auto-deploy activado, health check en `/api/healthchecker`, y variables de entorno como `DATABASE_URL` que Render inyecta automáticamente."

**Abrir Render Dashboard > Events:**

> "Y aquí vemos el historial de deployments. Render detecta pushes vía webhook y redespliega automáticamente. Cada deployment toma 2-3 minutos y usa blue-green deployment para zero-downtime: levanta la nueva versión, hace health check, y si pasa, cambia el tráfico. Si falla, hace rollback automático."

### Minuto 11-13: Testing y Calidad

**Abrir src/__tests__/blog.controller.test.ts:**

> "Tengo 15 tests unitarios con Jest que cubren casos exitosos y de error."

**Ejecutar tests en vivo:**

```powershell
yarn test
```

> "Todos pasan. Los tests usan mocks de la base de datos, así que no dependen de PostgreSQL real y corren en menos de 5 segundos. En el pipeline de CI/CD, si algún test falla, el workflow se detiene y no se hace deployment."

**Mostrar cobertura (si aplica):**

```powershell
yarn test:coverage
```

> "Tenemos 87% de cobertura de código. Las líneas no cubiertas son principalmente manejo de errores edge cases."

### Minuto 13-14: Base de Datos

**Abrir psql o DBeaver:**

> "La base de datos PostgreSQL 15 está en Render Cloud, Virginia."

**Ejecutar query:**

```sql
SELECT * FROM blogs ORDER BY created_at DESC LIMIT 5;
```

> "Aquí vemos los últimos 5 blogs, incluyendo el que acabamos de crear. La tabla usa un índice en `created_at DESC` para optimizar estas queries."

**Ejecutar query de estadísticas:**

```sql
SELECT 
    category,
    COUNT(*) as total,
    SUM(CASE WHEN published THEN 1 ELSE 0 END) as published
FROM blogs
GROUP BY category;
```

> "Estadísticas por categoría. DevOps lidera con [número] blogs, seguido de [categorías...]."

### Minuto 14-15: Monitoreo y Cierre

**Abrir New Relic:**

> "New Relic captura métricas APM en tiempo real:
> - Response time: 95ms promedio
> - Throughput: 25 RPM
> - Apdex: 0.95 (excelente)
> - Error rate: 0.2%
>
> También vemos distributed tracing: puedo ver exactamente qué queries SQL son las más lentas y optimizarlas."

**Mostrar deployment markers:**

> "Estos markers se crean automáticamente desde GitHub Actions. Me permiten correlacionar deployments con cambios en performance. Si después de un deploy el response time sube, sé exactamente qué commit causó el problema."

**Cierre:**

> "En resumen, implementé un stack DevOps completo con:
> - API REST con Node.js y TypeScript
> - PostgreSQL en la nube
> - Docker multi-stage optimizado
> - CI/CD con GitHub Actions
> - Auto-deployment en Render
> - Testing con Jest
> - Monitoreo APM con New Relic
> - Scripts de PowerShell para operaciones
> - Dashboard visual
>
> La aplicación está en producción, testeada, monitoreada, y con deployment automático. ¿Alguna pregunta?"

---

## ✨ CONSEJOS FINALES

### Durante la Demostración

1. **Respira:** Si algo falla, mantén la calma
2. **Explica qué haces:** No asumas que entienden sin palabras
3. **Usa términos técnicos:** Pero defínelos la primera vez
4. **Muestra, no leas:** El código en pantalla, no en papel
5. **Interactúa:** Pregunta "¿Puedo mostrar X?" en lugar de asumir

### Si Algo Sale Mal

1. **Internet cae:**
   - "Tengo todo corriendo localmente con Docker, puedo demostrar local"
   - Ejecutar `docker compose up`

2. **Render está lento:**
   - "Render free tier a veces tiene cold starts de 30 segundos"
   - Mientras tanto, mostrar código o tests

3. **Te preguntan algo que no sabes:**
   - "No lo implementé en este proyecto, pero sé que podría hacerse con [tecnología X]"
   - Nunca digas "no sé" y te quedes callado

4. **Un test falla:**
   - "Interesante, debe ser un race condition. En CI/CD todos pasan"
   - Mostrar último workflow run de GitHub

### Postura Profesional

```
✅ "Implementé X para resolver Y"
✅ "Esta decisión de diseño tiene pros y contras..."
✅ "En una versión futura, agregaría..."
✅ "No implementé X, pero investigué que se puede con Y"

❌ "Es solo un proyecto simple"
❌ "No me dio tiempo de hacer X"
❌ "Copié esto de Internet"
❌ "No sé por qué funciona"
```

---

**¡MUCHO ÉXITO EN TU DEFENSA!** 🚀🎓

Has trabajado duro, conoces tu proyecto, y tienes todas las herramientas para demostrar tu conocimiento. Confía en ti, explica con claridad, y muestra el valor de lo que construiste.

🌟 **¡VAS A HACERLO INCREÍBLE!** 🌟
