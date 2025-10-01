# 🚀 QUICK START GUIDE - CRUD Blog API DevOps

## ⚡ Instalación Rápida (15 minutos)

### 📋 **PRERREQUISITOS**
```bash
# Verificar instalaciones
node --version    # v20+
docker --version  # 24+
git --version     # 2+
```

---

## 🔧 **PASO 1: SETUP PROYECTO**
```bash
# 1. Clonar repositorio
git clone https://github.com/fedemarty/crud-blog-nodejs-postgresql.git
cd crud-blog-nodejs-postgresql

# 2. Instalar dependencias
yarn install

# 3. Configurar variables (editar con tus datos)
cp .env.example .env
```

### `.env` - **CONFIGURACIÓN MÍNIMA:**
```env
# Database (usar tus credenciales PostgreSQL)
POSTGRES_HOST=tu-host-postgres
POSTGRES_PORT=5432
POSTGRES_USER=tu-usuario
POSTGRES_PASSWORD=tu-password
POSTGRES_DB=tu-database

# App
PORT=8081
NODE_ENV=development

# New Relic (dejar vacío por ahora)
NEW_RELIC_LICENSE_KEY=
NEW_RELIC_APP_NAME=CRUD Blog API
```

---

## 🧪 **PASO 2: TESTING**
```bash
# Ejecutar tests (15 pruebas unitarias)
yarn test

# Output esperado: ✅ 15 tests passed
```

---

## 🏗️ **PASO 3: DESARROLLO LOCAL**
```bash
# Iniciar en desarrollo
yarn dev

# Verificar funcionamiento
curl http://localhost:8081/api/healthchecker
curl http://localhost:8081/api/blogs
```

---

## 🐳 **PASO 4: DOCKER**
```bash
# Build y run con Docker
docker-compose up --build -d

# Verificar container
docker ps
docker logs blog_api
```

---

## ⚙️ **PASO 5: CI/CD (GitHub)**

### **1. Fork/Clone Repository:**
- Fork el repositorio a tu GitHub
- Clone tu fork local

### **2. Configurar GitHub Secrets:**
```
Settings > Secrets and variables > Actions > New repository secret
```

**Secrets requeridos:**
```
DOCKER_USERNAME = tu-usuario-docker-hub
DOCKER_PASSWORD = tu-password-docker-hub
```

### **3. Activar Pipeline:**
```bash
# Push para trigger CI/CD
git add .
git commit -m "Setup CI/CD"
git push origin main

# Verificar en: GitHub > Actions tab
```

---

## 📊 **PASO 6: NEW RELIC MONITORING**

### **1. Crear Cuenta New Relic:**
- Ir a [newrelic.com](https://newrelic.com)
- Sign up gratuito
- Crear aplicación Node.js

### **2. Generar License Key:**
```
New Relic Dashboard > Settings > API Keys > Create key
Tipo: "Ingest - License"
Nombre: "CRUD Blog API License"
```

### **3. Configurar License Key:**
```bash
# Editar .env
NEW_RELIC_LICENSE_KEY=tu-license-key-aquí

# Restart container
docker-compose down
docker-compose up --build -d
```

### **4. Generar Tráfico:**
```bash
# Script para generar datos en New Relic
for i in {1..20}; do
  curl http://localhost:8081/api/blogs
  sleep 2
done
```

### **5. Verificar Dashboard:**
- Ir a New Relic dashboard
- Buscar "CRUD Blog API"
- Ver métricas en tiempo real ✅

---

## ✅ **VERIFICACIÓN FINAL**

### **🎯 Checklist Completo:**
- [ ] ✅ Tests passing (15/15)
- [ ] ✅ App corriendo local (localhost:8081)
- [ ] ✅ Docker container funcionando
- [ ] ✅ CI/CD pipeline activo (GitHub Actions)
- [ ] ✅ Image en Docker Hub
- [ ] ✅ New Relic mostrando datos
- [ ] ✅ API endpoints respondiendo

### **🔍 URLs de Verificación:**
```bash
# Health Check
http://localhost:8081/api/healthchecker

# API Endpoints
GET    http://localhost:8081/api/blogs
POST   http://localhost:8081/api/blogs
GET    http://localhost:8081/api/blogs/:id
PATCH  http://localhost:8081/api/blogs/:id
DELETE http://localhost:8081/api/blogs/:id
```

---

## 🚨 **TROUBLESHOOTING RÁPIDO**

### **❌ Tests Failing:**
```bash
yarn install
yarn jest --clearCache
yarn test --verbose
```

### **❌ Docker Issues:**
```bash
docker-compose down
docker system prune -a
docker-compose up --build -d
```

### **❌ New Relic Sin Datos:**
```bash
# Verificar license key
docker exec blog_api env | grep NEW_RELIC

# Verificar logs
docker exec blog_api cat newrelic_agent.log

# Generar más tráfico
curl -X POST http://localhost:8081/api/blogs \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Blog","description":"Testing New Relic","category":"test"}'
```

### **❌ CI/CD Pipeline Failing:**
- Verificar GitHub Secrets (DOCKER_USERNAME, DOCKER_PASSWORD)
- Check Node.js version en workflow
- Revisar Docker Hub permissions

---

## 🎯 **ENDPOINTS PARA TESTING**

### **📝 Crear Blog:**
```bash
curl -X POST http://localhost:8081/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi Primer Blog",
    "description": "Descripción del blog",
    "category": "tecnologia",
    "published": true
  }'
```

### **📖 Obtener Blogs:**
```bash
curl http://localhost:8081/api/blogs
```

### **📝 Actualizar Blog:**
```bash
curl -X PATCH http://localhost:8081/api/blogs/blog-id-aquí \
  -H "Content-Type: application/json" \
  -d '{"title": "Título Actualizado"}'
```

### **🗑️ Eliminar Blog:**
```bash
curl -X DELETE http://localhost:8081/api/blogs/blog-id-aquí
```

---

## 📊 **COMANDOS DE MONITOREO**

```bash
# Container stats
docker stats blog_api --no-stream

# Application logs
docker logs blog_api -f

# New Relic agent logs
docker exec blog_api tail -f newrelic_agent.log

# Database connection test
docker exec blog_api node -e "
const { sequelize } = require('./dist/db.js');
sequelize.authenticate()
  .then(() => console.log('DB ✅'))
  .catch(err => console.log('DB ❌', err));
"
```

---

## 🎉 **¡PROYECTO COMPLETO!**

**Si todos los checks están ✅, tienes:**
- 🏗️ **API CRUD funcional**
- 🧪 **15 tests automatizados**
- 🚀 **CI/CD pipeline completo**
- 🐳 **Containerización optimizada**
- 📊 **Monitoreo APM en tiempo real**

### **📚 Documentación Completa:**
- Ver `INFORME_DEVOPS_COMPLETO.md` para detalles técnicos
- Ver `README.md` para documentación del proyecto

### **🔗 Enlaces Importantes:**
- **GitHub Repo**: https://github.com/fedemarty/crud-blog-nodejs-postgresql
- **Docker Hub**: https://hub.docker.com (tu imagen)
- **New Relic**: https://rpm.newrelic.com (tu dashboard)

---

**⏱️ Tiempo total de setup: ~15 minutos**  
**🎯 Stack DevOps completo funcionando**  
**✅ Listo para producción**