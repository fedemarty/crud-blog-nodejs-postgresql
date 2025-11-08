# 🚀 QUICK START - Crear 1 Blog Rápido

$API_URL = "https://crud-blog-nodejs-postgresql.onrender.com/api/blogs"
$timestamp = Get-Date -Format "yyyyMMddHHmmss"

$blog = @{
    title = "Blog Deploy Render #$timestamp"
    description = @"
Este es un blog de prueba creado automáticamente en $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss').

Características del deployment:
✅ API REST desplegada en Render
✅ PostgreSQL en la nube
✅ HTTPS con certificado SSL
✅ Auto-deploy con GitHub Actions
✅ Monitoreo con New Relic APM

URL del proyecto: https://crud-blog-nodejs-postgresql.onrender.com

Este blog tiene un timestamp único: $timestamp
"@
    category = "DevOps"
    published = $true
} | ConvertTo-Json

Write-Host "`n📝 Creando blog en Render..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri $API_URL -Method POST -Body $blog -ContentType "application/json"
    
    Write-Host "✅ Blog creado exitosamente!" -ForegroundColor Green
    Write-Host "`n🆔 ID: $($response.data.blog.id)" -ForegroundColor White
    Write-Host "📝 Título: $($response.data.blog.title)" -ForegroundColor White
    Write-Host "📂 Categoría: $($response.data.blog.category)" -ForegroundColor White
    Write-Host "✅ Publicado: $($response.data.blog.published)" -ForegroundColor Green
    Write-Host "`n🌐 Ver en navegador:" -ForegroundColor Cyan
    Write-Host "   $API_URL/$($response.data.blog.id)" -ForegroundColor Gray
    
    Write-Host "`n✨ ¡Listo!`n" -ForegroundColor Green
}
catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}
