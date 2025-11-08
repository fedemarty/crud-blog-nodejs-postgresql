# 📝 GENERADOR INCREMENTAL DE BLOGS PARA RENDER
# Este script crea blogs con títulos únicos y descripciones variadas

$API_URL = "https://crud-blog-nodejs-postgresql.onrender.com/api/blogs"

# Contador para títulos únicos (basado en timestamp)
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$contador = 1

# Categorías variadas
$categorias = @(
    "DevOps",
    "Cloud Computing",
    "Backend Development",
    "Docker",
    "CI/CD",
    "Microservicios",
    "Base de Datos",
    "APIs REST",
    "Arquitectura",
    "Testing",
    "Seguridad",
    "Monitoreo",
    "Deployment",
    "Automatización",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Contenedores"
)

# Prefijos para títulos únicos
$prefijos = @(
    "Guía Completa de",
    "Tutorial Avanzado de",
    "Mejores Prácticas en",
    "Introducción a",
    "Deep Dive en",
    "Implementando",
    "Optimización de",
    "Arquitectura de",
    "Estrategias para",
    "Fundamentos de"
)

# Descripciones base variadas
$descripcionesBase = @(
    "Este artículo explora en profundidad las mejores prácticas y estrategias para implementar soluciones robustas y escalables.",
    "Una guía completa que cubre desde conceptos básicos hasta técnicas avanzadas, con ejemplos prácticos y casos de uso reales.",
    "Análisis detallado de las tecnologías modernas y cómo aplicarlas efectivamente en proyectos de producción.",
    "Tutorial paso a paso que demuestra cómo construir, desplegar y mantener aplicaciones de alto rendimiento.",
    "Exploración técnica de patrones de diseño, arquitecturas y soluciones a problemas comunes en desarrollo.",
    "Documentación completa con ejemplos de código, diagramas y mejores prácticas de la industria.",
    "Estudio profundo de las herramientas y metodologías que todo desarrollador debe conocer.",
    "Guía práctica con casos reales de implementación, troubleshooting y optimización.",
    "Análisis comparativo de diferentes enfoques y tecnologías disponibles en el ecosistema actual.",
    "Manual técnico que cubre configuración, deployment, monitoreo y mantenimiento de aplicaciones modernas."
)

function New-UniqueBlog {
    param(
        [int]$numero
    )
    
    # Seleccionar elementos aleatorios
    $prefijo = $prefijos | Get-Random
    $categoria = $categorias | Get-Random
    $descripcionBase = $descripcionesBase | Get-Random
    
    # Crear título único con timestamp y número
    $titulo = "$prefijo $categoria - Deploy #$timestamp-$numero"
    
    # Crear descripción extendida
    $descripcion = @"
$descripcionBase

CONTENIDO CLAVE:
- Implementación de mejores prácticas de $categoria
- Configuración paso a paso con ejemplos reales
- Integración con herramientas modernas del ecosistema
- Patrones de diseño y arquitectura escalable
- Testing y validación automatizada
- Deployment continuo y estrategias de rollback
- Monitoreo y observabilidad con métricas clave
- Optimización de performance y recursos

TECNOLOGÍAS RELACIONADAS:
✅ Node.js 20 LTS con TypeScript
✅ Docker para containerización
✅ PostgreSQL para persistencia de datos
✅ GitHub Actions para CI/CD
✅ Render.com para deployment cloud
✅ New Relic APM para monitoreo

Este blog fue generado automáticamente el $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') como parte del proyecto CRUD Blog API - DevOps Stack.

ID único del blog: Blog-$timestamp-$numero
Timestamp de creación: $(Get-Date -Format 'o')
"@

    # Decidir aleatoriamente si está publicado
    $publicado = (Get-Random -Minimum 0 -Maximum 2) -eq 1
    
    return @{
        title = $titulo
        description = $descripcion
        category = $categoria
        published = $publicado
    }
}

function Add-BlogToRender {
    param(
        [hashtable]$blogData,
        [int]$numero
    )
    
    try {
        $json = $blogData | ConvertTo-Json -Depth 10
        
        Write-Host "`n[$numero] 📝 Creando blog..." -ForegroundColor Cyan
        Write-Host "    Título: $($blogData.title)" -ForegroundColor White
        Write-Host "    Categoría: $($blogData.category)" -ForegroundColor Gray
        Write-Host "    Publicado: $($blogData.published)" -ForegroundColor $(if($blogData.published){"Green"}else{"Yellow"})
        
        $response = Invoke-RestMethod -Uri $API_URL `
            -Method POST `
            -Body $json `
            -ContentType "application/json" `
            -ErrorAction Stop
        
        Write-Host "    ✅ Creado con ID: $($response.data.blog.id)" -ForegroundColor Green
        
        return $response.data.blog
    }
    catch {
        Write-Host "    ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# ============================================
# MENÚ PRINCIPAL
# ============================================

Write-Host @"

╔══════════════════════════════════════════════════════════╗
║  📝 GENERADOR INCREMENTAL DE BLOGS - RENDER             ║
║  🌐 URL: $API_URL  ║
╚══════════════════════════════════════════════════════════╝

"@ -ForegroundColor Cyan

Write-Host "Opciones:" -ForegroundColor Yellow
Write-Host "  1. Crear 1 blog" -ForegroundColor White
Write-Host "  2. Crear 5 blogs" -ForegroundColor White
Write-Host "  3. Crear 10 blogs" -ForegroundColor White
Write-Host "  4. Crear cantidad personalizada" -ForegroundColor White
Write-Host "  5. Crear blog personalizado (manual)" -ForegroundColor White
Write-Host ""

$opcion = Read-Host "Selecciona una opción (1-5)"

$cantidad = 0
switch ($opcion) {
    "1" { $cantidad = 1 }
    "2" { $cantidad = 5 }
    "3" { $cantidad = 10 }
    "4" { 
        $cantidad = Read-Host "¿Cuántos blogs quieres crear?"
        $cantidad = [int]$cantidad
    }
    "5" {
        # Modo personalizado
        Write-Host "`n📝 CREAR BLOG PERSONALIZADO" -ForegroundColor Cyan
        Write-Host "===========================`n" -ForegroundColor Cyan
        
        $titulo = Read-Host "Título del blog"
        $descripcion = Read-Host "Descripción del blog"
        $categoria = Read-Host "Categoría (opcional, presiona Enter para omitir)"
        $publicadoInput = Read-Host "¿Publicar? (s/n)"
        $publicado = $publicadoInput -eq "s"
        
        if ([string]::IsNullOrWhiteSpace($categoria)) {
            $categoria = $null
        }
        
        $blogPersonalizado = @{
            title = $titulo
            description = $descripcion
            category = $categoria
            published = $publicado
        }
        
        $resultado = Add-BlogToRender -blogData $blogPersonalizado -numero 1
        
        if ($resultado) {
            Write-Host "`n✅ Blog creado exitosamente!" -ForegroundColor Green
            Write-Host "🆔 ID: $($resultado.id)" -ForegroundColor White
            Write-Host "🌐 URL: $API_URL/$($resultado.id)" -ForegroundColor Gray
        }
        
        exit
    }
    default {
        Write-Host "❌ Opción inválida" -ForegroundColor Red
        exit
    }
}

if ($cantidad -eq 0) {
    Write-Host "❌ Cantidad inválida" -ForegroundColor Red
    exit
}

# ============================================
# GENERACIÓN DE BLOGS
# ============================================

Write-Host "`n🚀 Generando $cantidad blog(s)...`n" -ForegroundColor Green

$blogsCreados = @()
$errores = 0

for ($i = 1; $i -le $cantidad; $i++) {
    $blogData = New-UniqueBlog -numero $i
    $resultado = Add-BlogToRender -blogData $blogData -numero $i
    
    if ($resultado) {
        $blogsCreados += $resultado
    } else {
        $errores++
    }
    
    # Pequeña pausa para evitar rate limiting
    if ($i -lt $cantidad) {
        Start-Sleep -Milliseconds 500
    }
}

# ============================================
# RESUMEN FINAL
# ============================================

Write-Host "`n`n╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                  📊 RESUMEN FINAL                    ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

Write-Host "✅ Blogs creados exitosamente: $($blogsCreados.Count)" -ForegroundColor Green
Write-Host "❌ Errores: $errores" -ForegroundColor $(if($errores -gt 0){"Red"}else{"Gray"})
Write-Host "📊 Total intentos: $cantidad" -ForegroundColor Yellow

if ($blogsCreados.Count -gt 0) {
    Write-Host "`n🆔 IDs de blogs creados:" -ForegroundColor Cyan
    foreach ($blog in $blogsCreados) {
        Write-Host "   • $($blog.id) - $($blog.title)" -ForegroundColor Gray
    }
    
    Write-Host "`n🌐 Ver todos los blogs:" -ForegroundColor Cyan
    Write-Host "   $API_URL" -ForegroundColor White
    
    Write-Host "`n💡 Ver blog específico (ejemplo):" -ForegroundColor Cyan
    Write-Host "   $API_URL/$($blogsCreados[0].id)" -ForegroundColor White
}

Write-Host "`n✨ Proceso completado!`n" -ForegroundColor Green

# Opción para abrir el dashboard
$abrirDashboard = Read-Host "¿Quieres abrir el dashboard HTML para ver los blogs? (s/n)"
if ($abrirDashboard -eq "s") {
    Start-Process ".\blog-dashboard.html"
}
