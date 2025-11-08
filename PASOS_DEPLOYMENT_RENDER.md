# 🚀 PASOS PARA DEPLOYAR EN RENDER - GUÍA PASO A PASO

## ✅ **PASO 1: CÓDIGO YA ESTÁ LISTO**

Ya hicimos push a la branch `feature/render-deployment` con todos los cambios necesarios:
- ✅ Puerto dinámico configurado
- ✅ CORS para producción
- ✅ render.yaml creado
- ✅ Documentación completa

```
Branch: feature/render-deployment
Commit: feat: Preparar aplicación para deployment en Render
URL: https://github.com/fedemarty/crud-blog-nodejs-postgresql
```

---

## 🌐 **PASO 2: CREAR WEB SERVICE EN RENDER**

### **2.1. Ir a Render Dashboard**
1. Abre tu navegador
2. Ve a: **https://dashboard.render.com**
3. Inicia sesión (o crea cuenta si no tienes)

### **2.2. Crear Nuevo Web Service**
1. Click en el botón **"New +"** (arriba a la derecha)
2. Selecciona **"Web Service"**

### **2.3. Conectar Repositorio**
1. Si es la primera vez:
   - Click en **"Connect GitHub"**
   - Autoriza Render en GitHub
   
2. Busca y selecciona tu repositorio:
   ```
   fedemarty/crud-blog-nodejs-postgresql
   ```

3. Click en **"Connect"**

### **2.4. Configurar el Service**

Completa el formulario con estos valores:

| Campo | Valor |
|-------|-------|
| **Name** | `blog-api-nodejs` |
| **Region** | `Oregon (US West)` o `Virginia (US East)` |
| **Branch** | `feature/render-deployment` |
| **Runtime** | `Docker` |
| **Instance Type** | `Free` |

**Render detectará automáticamente:**
- ✅ Dockerfile en la raíz
- ✅ render.yaml (opcional)

### **2.5. NO cambiar estos campos** (Render los detecta):
- Root Directory: (dejar en blanco)
- Dockerfile Path: `./Dockerfile` (auto-detectado)
- Docker Command: (usa el CMD del Dockerfile)

---

## 🔐 **PASO 3: CONFIGURAR VARIABLES DE ENTORNO**

En la misma página, busca la sección **"Environment Variables"** y agrega:

### **Variables Requeridas:**

```bash
# 1. BASE DE DATOS (PostgreSQL en Render)
DATABASE_URL
postgresql://crud_blog_nodejs_postgresql_user:uk0GYPU1IYe36jmBOtP3s9BtCXY5LaV0@dpg-d3pntk56ubrc73fbbqi0-a.virginia-postgres.render.com/crud_blog_nodejs_postgresql

# 2. NEW RELIC - LICENSE KEY
NEW_RELIC_LICENSE_KEY
db0819ed7e2572d6e12c39c28ce54236FFFFNRAL

# 3. NEW RELIC - APP NAME
NEW_RELIC_APP_NAME
CRUD Blog API - Production

# 4. NEW RELIC - ENABLED
NEW_RELIC_ENABLED
true

# 5. NODE ENVIRONMENT
NODE_ENV
production
```

### **Cómo agregar cada variable:**
1. Click en **"Add Environment Variable"**
2. En **Key**: poner el nombre (ej: `DATABASE_URL`)
3. En **Value**: pegar el valor correspondiente
4. Repetir para cada variable

**⚠️ IMPORTANTE**: NO uses comillas en los valores, pégalos directamente.

---

## ⚕️ **PASO 4: CONFIGURAR HEALTH CHECK**

En la sección **"Health Check"**:

| Campo | Valor |
|-------|-------|
| **Health Check Path** | `/api/healthchecker` |

Esto permite a Render verificar que tu app está funcionando correctamente.

---

## 🚀 **PASO 5: CREAR Y DEPLOYAR**

1. Revisa toda la configuración
2. Click en el botón **"Create Web Service"** (abajo)
3. Render comenzará a:
   - ✅ Clonar tu repositorio
   - ✅ Detectar el Dockerfile
   - ✅ Construir la imagen Docker (multi-stage build)
   - ✅ Desplegar el contenedor
   - ✅ Asignar una URL pública

**⏱️ Tiempo estimado**: 3-5 minutos

---

## 📊 **PASO 6: MONITOREAR EL DEPLOYMENT**

### **Ver logs en tiempo real:**

En la página del service, verás una terminal con logs:

```bash
==> Cloning from https://github.com/fedemarty/crud-blog-nodejs-postgresql...
==> Building Dockerfile...
==> Step 1/10 : FROM node:20-alpine AS deps
==> Step 2/10 : WORKDIR /app
...
==> Successfully built image
==> Deploying...
==> Your service is live 🎉
```

### **Busca estos mensajes exitosos:**
```
✅ Server started on port 10000
✅ Environment: production
✅ Connection Successful
✅ Database Connected Successfully
```

---

## 🌐 **PASO 7: OBTENER TU URL PÚBLICA**

Una vez desplegado, Render te asignará una URL:

```
https://blog-api-nodejs.onrender.com
```

**O algo similar con un hash:**
```
https://blog-api-nodejs-abc123.onrender.com
```

Esta URL estará visible en:
- ✅ Arriba de la página del service
- ✅ En el dashboard principal
- ✅ En la sección "Settings"

---

## 🧪 **PASO 8: PROBAR TU API EN PRODUCCIÓN**

### **Usando PowerShell:**

```powershell
# Reemplaza TU-URL con tu URL de Render

# 1. Health Check
Invoke-RestMethod -Uri "https://TU-URL.onrender.com/api/healthchecker" -Method GET

# 2. Listar todos los blogs
Invoke-RestMethod -Uri "https://TU-URL.onrender.com/api/blogs" -Method GET

# 3. Crear un nuevo blog
$body = @{
    title = "Blog desde Render"
    description = "¡Funciona en producción!"
    published = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://TU-URL.onrender.com/api/blogs" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"

# 4. Ver un blog específico (reemplaza con ID real)
Invoke-RestMethod -Uri "https://TU-URL.onrender.com/api/blogs/ID-AQUI" -Method GET
```

### **Usando el navegador:**

Simplemente abre:
```
https://TU-URL.onrender.com/api/healthchecker
https://TU-URL.onrender.com/api/blogs
```

---

## 📊 **PASO 9: VERIFICAR MONITOREO EN NEW RELIC**

1. Ve a: **https://one.newrelic.com**
2. Inicia sesión
3. Busca tu aplicación: **"CRUD Blog API - Production"**
4. Verás métricas en tiempo real:
   - Response times
   - Throughput
   - Error rate
   - Database queries

---

## 🔄 **PASO 10: AUTO-DEPLOYMENT (CONFIGURADO AUTOMÁTICAMENTE)**

De ahora en adelante, cada vez que hagas:

```powershell
git add .
git commit -m "Mi cambio"
git push origin feature/render-deployment
```

**Render automáticamente:**
1. ✅ Detecta el push
2. ✅ Re-construye la imagen Docker
3. ✅ Re-despliega la nueva versión
4. ✅ Mantiene la misma URL

---

## ⚠️ **IMPORTANTE: PLAN FREE DE RENDER**

### **Limitaciones:**
- ⏸️ **Sleep después de 15 min de inactividad**
- 🐌 **Cold start**: primer request toma ~30-60 segundos
- ✅ **750 horas gratis por mes** (suficiente para demos)

### **Cómo "despertar" el service:**
Simplemente haz una petición a cualquier endpoint:
```powershell
Invoke-RestMethod -Uri "https://TU-URL.onrender.com/api/healthchecker"
```

### **Si necesitas eliminar el sleep:**
- Upgrade a plan **Starter** ($7/mes)
- Tu app estará disponible 24/7 sin cold starts

---

## 🎯 **RESULTADO FINAL**

### **ANTES (Local):**
```
❌ Solo en tu PC
❌ http://localhost:8081/api/blogs
❌ Requiere: docker compose up
❌ No es público
```

### **DESPUÉS (Render):**
```
✅ En la nube 24/7
✅ https://tu-app.onrender.com/api/blogs
✅ Accesible desde cualquier lugar
✅ HTTPS automático
✅ Auto-deploy en git push
```

---

## 🆘 **TROUBLESHOOTING**

### **Error: "Build failed"**
1. Revisa los logs en Render Dashboard
2. Verifica que el Dockerfile sea correcto
3. Asegúrate que `yarn build` funcione localmente

### **Error: "Health check failed"**
1. Verifica que el path sea `/api/healthchecker`
2. Revisa que las variables de entorno estén correctas
3. Chequea los logs del contenedor

### **Error: "Cannot connect to database"**
1. Verifica que `DATABASE_URL` esté correcta
2. Asegúrate que PostgreSQL esté activo en Render
3. Revisa que el SSL esté habilitado en db.ts

### **Error: "Port binding failed"**
✅ Ya está resuelto con `process.env.PORT`

---

## 📞 **NEXT STEPS**

Después del deployment exitoso:

1. ✅ **Compartir URL con el profesor**:
   ```
   https://tu-app.onrender.com/api/blogs
   ```

2. ✅ **Demostrar funcionalidad**:
   - Crear blogs desde la URL de Render
   - Listar blogs desde la URL de Render
   - Actualizar blogs desde la URL de Render

3. ✅ **Monitorear en New Relic**:
   - Mostrar métricas de performance
   - Deployment markers automáticos

4. ✅ **Merge a main** (opcional, después de probar):
   ```powershell
   git checkout main
   git merge feature/render-deployment
   git push origin main
   ```

---

## 🎉 **¡LISTO PARA DEPLOYAR!**

Ahora simplemente sigue los pasos en orden y tendrás tu API funcionando en producción en la nube.

**URL del proyecto en GitHub:**
```
https://github.com/fedemarty/crud-blog-nodejs-postgresql/tree/feature/render-deployment
```

---

*Última actualización: Noviembre 8, 2025*
*Branch: feature/render-deployment*
