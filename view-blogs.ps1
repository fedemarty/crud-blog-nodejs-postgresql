# Script para visualizar todos los blogs insertados en la base de datos
# Uso: ./view-blogs.ps1

param(
    [string]$baseUrl = "http://localhost:8081/api/blogs",
    [switch]$detailed = $false,
    [switch]$stats = $false
)

Write-Host "📊 VISUALIZADOR DE BLOGS INSERTADOS" -ForegroundColor Yellow
Write-Host "=" * 50 -ForegroundColor Gray
Write-Host ""

try {
    # Verificar conectividad
    Write-Host "🔍 Verificando conexión con la API..." -ForegroundColor Cyan
    $healthCheck = Invoke-RestMethod -Uri "http://localhost:8081/api/healthchecker" -Method GET -TimeoutSec 5
    Write-Host "✅ API disponible: $($healthCheck.message)" -ForegroundColor Green
    Write-Host ""
    
    # Obtener todos los blogs (sin límite de paginación)
    Write-Host "📥 Obteniendo blogs de la base de datos..." -ForegroundColor Cyan
    $response = Invoke-RestMethod -Uri "$baseUrl" -Method GET -Body @{limit=1000} -TimeoutSec 10
    $blogs = $response.blogs
    
    if ($blogs.Count -eq 0) {
        Write-Host "📭 No hay blogs en la base de datos." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "💡 Sugerencia: Ejecuta primero ./generate-traffic.ps1 para crear algunos blogs" -ForegroundColor Gray
        return
    }
    
    Write-Host "✅ Encontrados $($blogs.Count) blogs en total (API devuelve $($response.results) por página)" -ForegroundColor Green
    Write-Host ""
    
    # Mostrar estadísticas si se solicita
    if ($stats) {
        Write-Host "📈 ESTADÍSTICAS:" -ForegroundColor Yellow
        Write-Host "-" * 30 -ForegroundColor Gray
        
        $published = ($blogs | Where-Object { $_.published -eq $true }).Count
        $unpublished = $blogs.Count - $published
        
        $categories = $blogs | Group-Object category | Sort-Object Count -Descending
        
        Write-Host "📊 Total de blogs: $($blogs.Count)" -ForegroundColor White
        Write-Host "✅ Publicados: $published" -ForegroundColor Green
        Write-Host "❌ No publicados: $unpublished" -ForegroundColor Red
        Write-Host ""
        
        Write-Host "🏷️  Blogs por categoría:" -ForegroundColor Cyan
        foreach ($cat in $categories) {
            $percentage = [math]::Round(($cat.Count / $blogs.Count) * 100, 1)
            Write-Host "   • $($cat.Name): $($cat.Count) blogs ($percentage%)" -ForegroundColor White
        }
        Write-Host ""
    }
    
    # Mostrar blogs
    Write-Host "📚 LISTADO DE BLOGS:" -ForegroundColor Yellow
    Write-Host "-" * 50 -ForegroundColor Gray
    
    $counter = 1
    foreach ($blog in $blogs) {
        # Encabezado del blog
        $status = if ($blog.published) { "✅ PUBLICADO" } else { "❌ BORRADOR" }
        $statusColor = if ($blog.published) { "Green" } else { "Red" }
        
        Write-Host ""
        Write-Host "[$counter/$($blogs.Count)] 📝 Blog ID: $($blog.id)" -ForegroundColor Cyan
        Write-Host "🏷️  Título: $($blog.title)" -ForegroundColor White
        Write-Host "📂 Categoría: $($blog.category)" -ForegroundColor Magenta
        Write-Host "📋 Estado: " -NoNewline -ForegroundColor Gray
        Write-Host "$status" -ForegroundColor $statusColor
        
        if ($detailed) {
            Write-Host "📄 Descripción: $($blog.description)" -ForegroundColor Gray
            Write-Host "📅 Creado: $($blog.createdAt)" -ForegroundColor DarkGray
            Write-Host "🔄 Actualizado: $($blog.updatedAt)" -ForegroundColor DarkGray
        }
        
        Write-Host "-" * 40 -ForegroundColor DarkGray
        $counter++
    }
    
    Write-Host ""
    Write-Host "🎉 Visualización completada!" -ForegroundColor Green
    Write-Host ""
    
    # Mostrar comandos útiles
    Write-Host "💡 COMANDOS ÚTILES:" -ForegroundColor Yellow
    Write-Host "   • Ver con detalles: ./view-blogs.ps1 -detailed" -ForegroundColor Gray
    Write-Host "   • Ver estadísticas: ./view-blogs.ps1 -stats" -ForegroundColor Gray
    Write-Host "   • Ver todo: ./view-blogs.ps1 -detailed -stats" -ForegroundColor Gray
    Write-Host "   • Generar más blogs: ./generate-traffic.ps1 -cantidad 10" -ForegroundColor Gray
    
} catch {
    Write-Host "❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 POSIBLES SOLUCIONES:" -ForegroundColor Yellow
    Write-Host "   1. Verificar que la aplicación esté corriendo:" -ForegroundColor Gray
    Write-Host "      yarn start" -ForegroundColor Cyan
    Write-Host "   2. Verificar que Docker esté corriendo:" -ForegroundColor Gray  
    Write-Host "      docker-compose up -d" -ForegroundColor Cyan
    Write-Host "   3. Verificar conectividad:" -ForegroundColor Gray
    Write-Host "      curl http://localhost:8081/api/healthchecker" -ForegroundColor Cyan
}