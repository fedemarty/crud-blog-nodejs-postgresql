# Script integrado: Generar tráfico + Visualizar resultados
# Uso: ./generate-and-view.ps1 -cantidad 5

param(
    [int]$cantidad = 5,
    [int]$intervalo = 1,
    [switch]$showDetails = $false
)

$baseUrl = "http://localhost:8081/api/blogs"
$categorias = @("tecnologia", "deportes", "ciencia", "arte", "música", "educación", "salud", "viajes")
$adjectives = @("Increíble", "Fascinante", "Útil", "Innovador", "Práctico", "Moderno", "Eficiente")
$topics = @("Tutorial", "Guía", "Análisis", "Review", "Comparación", "Estudio", "Investigación")

Write-Host "🚀 GENERACIÓN DE TRÁFICO + VISUALIZACIÓN EN TIEMPO REAL" -ForegroundColor Yellow
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

# Verificar estado inicial
try {
    $responseBefore = Invoke-RestMethod -Uri $baseUrl -Method GET -Body @{limit=1000}
    $blogsBefore = $responseBefore.blogs
    $totalBlogsInicial = $blogsBefore.Count
    Write-Host "📊 Blogs actuales en la base: $totalBlogsInicial (consultando con límite expandido)"
    Write-Host ""
} catch {
    Write-Host "❌ No se puede conectar a la API. Asegúrate de que esté corriendo." -ForegroundColor Red
    return
}

Write-Host "🔥 Generando $cantidad nuevos blogs..." -ForegroundColor Green
Write-Host ""

$blogIds = @()
$exitosos = 0

for ($i = 1; $i -le $cantidad; $i++) {
    $categoria = $categorias | Get-Random
    $adjective = $adjectives | Get-Random  
    $topic = $topics | Get-Random
    
    $body = @{
        title = "$adjective $topic de $categoria #$i"
        description = "Este es un $($topic.ToLower()) completo sobre $categoria que incluye información detallada y ejemplos prácticos. Generado automáticamente para pruebas de carga el $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        category = $categoria
        published = @($true, $false) | Get-Random
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri $baseUrl -Method POST -Body $body -ContentType "application/json" -TimeoutSec 10
        
        # Acceder correctamente a la estructura de respuesta
        $blogData = $response.data.blog
        $requestData = $body | ConvertFrom-Json
        
        $status = if ($requestData.published) { "✅ PUBLICADO" } else { "❌ BORRADOR" }
        $statusColor = if ($requestData.published) { "Green" } else { "Red" }
        
        Write-Host "[$i/$cantidad] 📝 CREADO:" -ForegroundColor Green
        Write-Host "   🆔 ID: $($blogData.id)" -ForegroundColor Cyan
        Write-Host "   📰 Título: $($blogData.title)" -ForegroundColor White
        Write-Host "   🏷️  Categoría: $($blogData.category)" -ForegroundColor Magenta
        Write-Host "   📋 Estado: " -NoNewline -ForegroundColor Gray
        Write-Host "$status" -ForegroundColor $statusColor
        
        if ($showDetails) {
            Write-Host "   📄 Descripción: $($blogData.description.Substring(0, [Math]::Min(100, $blogData.description.Length)))..." -ForegroundColor Gray
            Write-Host "   📅 Creado: $($blogData.createdAt)" -ForegroundColor DarkGray
        }
        
        $blogIds += $blogData.id
        $exitosos++
        
        Write-Host "   " + "-" * 50 -ForegroundColor DarkGray
        
    } catch {
        Write-Host "[$i/$cantidad] ❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    if ($i -lt $cantidad -and $intervalo -gt 0) {
        Start-Sleep -Seconds $intervalo
    }
}

Write-Host ""
Write-Host "📊 RESUMEN DE LA SESIÓN:" -ForegroundColor Yellow
Write-Host "-" * 40 -ForegroundColor Gray

# Obtener estado final
try {
    $responseAfter = Invoke-RestMethod -Uri $baseUrl -Method GET
    $blogsAfter = $responseAfter.blogs
    $nuevosBlogs = $blogsAfter.Count - $blogsBefore.Count
    
    Write-Host "✅ Blogs creados exitosamente: $exitosos" -ForegroundColor Green
    Write-Host "📈 Total blogs en la base: $($blogsAfter.Count) (antes: $($blogsBefore.Count))" -ForegroundColor Cyan
    Write-Host "🎯 Tasa de éxito: $([math]::Round(($exitosos / $cantidad) * 100, 2))%" -ForegroundColor White
    Write-Host ""
    
    # Mostrar estadísticas por categoría de los nuevos blogs
    if ($exitosos -gt 0) {
        Write-Host "📚 ESTADÍSTICAS DE LOS NUEVOS BLOGS:" -ForegroundColor Yellow
        
        $nuevosCreados = $blogsAfter | Where-Object { $_.id -in $blogIds }
        $categoriesCount = $nuevosCreados | Group-Object category | Sort-Object Count -Descending
        $publishedCount = ($nuevosCreados | Where-Object { $_.published -eq $true }).Count
        
        Write-Host "🏷️  Por categoría:" -ForegroundColor Cyan
        foreach ($cat in $categoriesCount) {
            Write-Host "   • $($cat.Name): $($cat.Count) blogs" -ForegroundColor White
        }
        
        Write-Host "📊 Estado:" -ForegroundColor Cyan
        Write-Host "   • Publicados: $publishedCount" -ForegroundColor Green
        Write-Host "   • Borradores: $($exitosos - $publishedCount)" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Error al obtener estadísticas finales: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "💡 COMANDOS PARA CONTINUAR:" -ForegroundColor Yellow
Write-Host "   • Ver todos los blogs: ./view-blogs.ps1" -ForegroundColor Gray
Write-Host "   • Ver con detalles: ./view-blogs.ps1 -detailed -stats" -ForegroundColor Gray
Write-Host "   • Generar más: ./generate-and-view.ps1 -cantidad 10 -showDetails" -ForegroundColor Gray
Write-Host ""