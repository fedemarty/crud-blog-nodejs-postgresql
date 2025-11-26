# 🚀 GUÍA RÁPIDA: DEPLOYMENT A RENDER

## ✅ **CAMBIOS YA REALIZADOS EN EL CÓDIGO**

### ✔️ Modificado: `src/server.ts`
- **Puerto dinámico**: `process.env.PORT` (Render lo asigna automáticamente)
- **CORS flexible**: Acepta múltiples orígenes
- **Health check mejorado**: Incluye environment y timestamp

---

## 📋 **PASOS PARA DEPLOYAR EN RENDER**

### **1. Crear Web Service en Render**

1. Ve a: https://dashboard.render.com
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio: `fedemarty/crud-blog-nodejs-postgresql`
4. Configura:
   - **Name**: `blog-api-nodejs`
   - **Region**: `Oregon` (o `Virginia` para estar cerca de tu DB)
   - **Branch**: `main`
   - **Runtime**: `Docker`

### **2. Configurar Variables de Entorno**

En Render Dashboard → **Environment** tab, agregar:

```bash
# Base de Datos (ya existente en Render)
DATABASE_URL=postgresql://crud_blog_nodejs_postgresql_user:uk0GYPU1IYe36jmBOtP3s9BtCXY5LaV0@dpg-d3pntk56ubrc73fbbqi0-a.virginia-postgres.render.com/crud_blog_nodejs_postgresql

# New Relic APM
NEW_RELIC_LICENSE_KEY=db0819ed7e2572d6e12c39c28ce54236FFFFNRAL
NEW_RELIC_APP_NAME=CRUD Blog API - Production
NEW_RELIC_ENABLED=true

# Application
NODE_ENV=production

# CORS (opcional - solo si tienes frontend)
FRONTEND_URL=https://tu-frontend.onrender.com
```

### **3. Configurar Health Check**

En Render Dashboard → **Settings**:
- **Health Check Path**: `/api/healthchecker`

### **4. Deploy!**

Click en **"Create Web Service"** y Render:
- ✅ Clonará tu repositorio
- ✅ Construirá la imagen Docker
- ✅ Desplegará automáticamente
- ✅ Te dará una URL pública: `https://blog-api-nodejs.onrender.com`

---

## 🧪 **PROBAR TU API EN PRODUCCIÓN**

Una vez desplegado, prueba con:

```powershell
# Health Check
Invoke-RestMethod -Uri "https://TU-APP.onrender.com/api/healthchecker" -Method GET

# Listar Blogs
Invoke-RestMethod -Uri "https://TU-APP.onrender.com/api/blogs" -Method GET

# Crear Blog
$body = @{
    title = "Blog desde Render"
    description = "Funciona en la nube!"
    published = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://TU-APP.onrender.com/api/blogs" -Method POST -Body $body -ContentType "application/json"
```

---

## 🔄 **DEPLOYMENT AUTOMÁTICO**

Cada vez que hagas `git push origin main`:
1. ✅ GitHub Actions ejecuta tests
2. ✅ Construye y publica imagen Docker
3. ✅ Render detecta el cambio automáticamente
4. ✅ Re-despliega la nueva versión

---

## 📊 **MONITOREO POST-DEPLOYMENT**

### **Render Dashboard**
- Ver logs en tiempo real
- Métricas de CPU/RAM
- Status del health check

### **New Relic APM**
- Response times
- Throughput
- Error rate
- Database queries

---

## ⚠️ **IMPORTANTE: PLAN FREE DE RENDER**

### **Limitaciones:**
- App **entra en sleep** después de 15 min de inactividad
- Primer request después del sleep toma ~30-60 segundos (cold start)
- 750 horas gratis por mes

### **Solución (Plan Starter $7/mes):**
- ✅ Sin sleep
- ✅ Más recursos
- ✅ Mejor performance

---

## 🎯 **URLS FINALES**

Después del deployment tendrás:

```
API: https://blog-api-nodejs.onrender.com
Health Check: https://blog-api-nodejs.onrender.com/api/healthchecker
Blogs: https://blog-api-nodejs.onrender.com/api/blogs
```

---

## 🆘 **TROUBLESHOOTING**

### **Error: Build Failed**
→ Revisar logs en Render Dashboard
→ Verificar que Dockerfile es correcto
→ Verificar que `yarn build` funciona localmente

### **Error: Health Check Failed**
→ Verificar que `/api/healthchecker` responde
→ Revisar variables de entorno
→ Verificar que DATABASE_URL es correcta

### **Error: Cannot Connect to Database**
→ Verificar DATABASE_URL en variables de entorno
→ Verificar que PostgreSQL está activo en Render
→ Revisar logs de la app

---

*¡Tu app está lista para producción! 🚀*
