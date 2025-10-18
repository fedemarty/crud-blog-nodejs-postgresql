# 📊 Integración de Seguimiento de Cambios con New Relic

## 🎯 Configuración de Secrets de GitHub

Para que funcione el seguimiento de cambios de New Relic, necesitas configurar estos secrets en tu repositorio de GitHub:

### 🔑 Secrets Requeridos:

#### 1. `NEW_RELIC_API_KEY`
- **Tipo:** User API Key de New Relic
- **Obtención:** 
  1. Ve a https://one.newrelic.com/
  2. Haz click en tu perfil → API Keys
  3. Busca una key de tipo **USER** (empieza con `NRAK-`)
  4. Si no tienes una, crea una nueva del tipo **USER**

#### 2. `NEW_RELIC_DEPLOYMENT_ENTITY_GUID`
- **Tipo:** GUID de tu aplicación en New Relic
- **Obtención:**
  1. Ve a tu dashboard de la aplicación: https://rpm.newrelic.com/accounts/7195027/applications/1479497079
  2. En la URL o en los detalles de la aplicación, busca el GUID
  3. También puedes encontrarlo en: APM & Services → Tu App → Settings → Application settings

### 🚀 Cómo configurar los secrets:

1. **Ve a tu repositorio en GitHub:** https://github.com/fedemarty/crud-blog-nodejs-postgresql
2. **Haz click en "Settings"** (en la barra superior del repositorio)
3. **En el menú lateral, click en "Secrets and variables" → "Actions"**
4. **Click "New repository secret"** para cada secret:
   - Nombre: `NEW_RELIC_API_KEY`
   - Valor: Tu USER API key de New Relic
   - Nombre: `NEW_RELIC_DEPLOYMENT_ENTITY_GUID` 
   - Valor: El GUID de tu aplicación

## 📋 Workflows Configurados:

### 1. **Pipeline CI/CD** (`ci.yml`)
- **Activación:** Push a `main` y Pull Requests
- **Seguimiento de Cambios:** Se ejecuta cuando hay push exitoso a `main`
- **Versión:** Usa el SHA del commit
- **Descripción:** "Deployment desde rama main - SHA: [commit]"

### 2. **Seguimiento de Release** (`release.yml`)
- **Activación:** Cuando publicas un Release en GitHub
- **Seguimiento de Cambios:** Se ejecuta en cada release publicado
- **Versión:** Usa el tag del release (ej: v1.0.0)
- **Descripción:** "🚀 Release [versión] publicado por [usuario]"

## 🎯 Beneficios del Seguimiento de Cambios:

1. **Correlación de Deployments:** Ver el impacto de cada deployment en las métricas
2. **Análisis de Rendimiento:** Comparar métricas antes/después de cada release
3. **Detección de Problemas:** Identificar rápidamente si un deployment causó issues
4. **Timeline Visual:** Ver deployments marcados en los gráficos de New Relic
5. **Historial Completo:** Mantener un registro de todos los cambios en producción

## 🔧 Prueba del Setup:

1. **Configurar los secrets** como se describe arriba
2. **Hacer un push a main** → Verificar que aparezca el marcador de deployment en New Relic
3. **Crear un release** → Verificar que aparezca el marcador de release en New Relic
4. **Revisar el dashboard** → Los marcadores deberían aparecer como líneas verticales en los gráficos

## 📈 Visualización en New Relic:

- **Gráficos de Throughput:** Líneas verticales marcando deployments
- **Tiempo de Respuesta:** Correlación entre deployments y cambios de performance
- **Error Rate:** Identificación de aumentos de errores post-deployment
- **Apdex Score:** Impacto en la experiencia del usuario

¡Tu stack DevOps ahora tiene seguimiento completo de cambios en español! 🚀