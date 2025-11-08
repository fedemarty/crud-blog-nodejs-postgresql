# 🚀 Crear 5 Blogs Rápidos con Títulos Únicos

$API_URL = "https://crud-blog-nodejs-postgresql.onrender.com/api/blogs"
$timestamp = Get-Date -Format "yyyyMMddHHmmss"

$categorias = @("DevOps", "Cloud", "Backend", "Docker", "CI/CD")
$prefijos = @("Tutorial de", "Guía de", "Introducción a", "Mejores prácticas en", "Implementando")

Write-Host "`n🚀 Creando 5 blogs en Render...`n" -ForegroundColor Cyan

for ($i = 1; $i -le 5; $i++) {
    $categoria = $categorias[$i-1]
    $prefijo = $prefijos[$i-1]
    
    $blog = @{
        title = "$prefijo $categoria - #$timestamp-$i"
        description = @"
Blog número $i creado automáticamente el $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss').

CONTENIDO:
- Explicación detallada de $categoria
- Ejemplos prácticos y casos de uso
- Mejores prácticas de la industria
- Integración con herramientas modernas
- Testing y deployment automatizado

TECNOLOGÍAS:
✅ Node.js + TypeScript
✅ PostgreSQL
✅ Docker
✅ Render Cloud
✅ GitHub Actions
✅ New Relic APM

Timestamp único: $timestamp-$i
Número de secuencia: $i/5
"@
        category = $categoria
        published = ($i % 2 -eq 1)  # Publicar los impares
    } | ConvertTo-Json
    
    try {
        Write-Host "[$i/5] Creando: $prefijo $categoria..." -ForegroundColor Yellow
        
        $response = Invoke-RestMethod -Uri $API_URL -Method POST -Body $blog -ContentType "application/json"
        
        Write-Host "      ✅ Creado con ID: $($response.data.blog.id)" -ForegroundColor Green
        
        # Pausa pequeña entre requests
        if ($i -lt 5) {
            Start-Sleep -Milliseconds 300
        }
    }
    catch {
        Write-Host "      ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n✨ ¡5 blogs creados exitosamente!`n" -ForegroundColor Green
Write-Host "🌐 Ver todos: $API_URL`n" -ForegroundColor Cyan
