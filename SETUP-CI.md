# 🚀 CI/CD Setup - GitHub Actions

## Pipeline Básico Configurado

Este proyecto tiene un pipeline de CI/CD básico que cumple con los siguientes requisitos:

### ✅ Pasos del Pipeline

1. **📋 Instalación de Dependencias**: `npm ci`
2. **🔍 Análisis Estático**: TypeScript check (`tsc --noEmit`)
3. **🧪 Ejecución de Pruebas**: `npm test` (15 pruebas unitarias)
4. **🏗️ Compilación**: `npm run build`
5. **🐳 Build Docker**: Construcción de imagen Docker
6. **🚀 Push Docker**: Publicación en Docker Hub (solo en main)

### 🔧 Configuración Requerida

Para que el pipeline funcione completamente, necesitas configurar estos **GitHub Secrets**:

1. Ve a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Agrega estos secrets:

```
DOCKER_USERNAME = tu_usuario_dockerhub
DOCKER_PASSWORD = tu_password_dockerhub
```

### 🛡️ Protección de Rama Principal

Para proteger la rama `main` y requerir aprobaciones:

1. Ve a Settings → Branches
2. Add branch protection rule
3. Branch name pattern: `main`
4. Configurar:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (mínimo 1)
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - Seleccionar: `CI - Test, Build & Docker`

### 🐳 Imágenes Docker

Las imágenes se publican automáticamente en:
- `tu_usuario/blog-api:latest`
- `tu_usuario/blog-api:commit_sha`

### 🚀 Uso

El pipeline se ejecuta automáticamente cuando:
- Haces push a `main`
- Creas un pull request hacia `main`

### 📊 Estado

Puedes ver el estado del pipeline en la pestaña "Actions" de tu repositorio.