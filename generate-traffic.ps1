# Script para generar tráfico masivo de blogs
# Uso: ./generate-traffic.ps1 -cantidad 20 -intervalo 2

param(
    [int]$cantidad = 10,
    [int]$intervalo = 1
)

$baseUrl = "http://localhost:8081/api/blogs"
$categorias = @("tecnologia", "deportes", "ciencia", "arte", "música", "educación", "salud", "viajes")
$adjectives = @("Increíble", "Fascinante", "Útil", "Innovador", "Práctico", "Moderno", "Eficiente")
$topics = @("Tutorial", "Guía", "Análisis", "Review", "Comparación", "Estudio", "Investigación")

Write-Host "🚀 Iniciando generación de $cantidad blogs con intervalo de $intervalo segundos" -ForegroundColor Yellow
Write-Host "📡 Endpoint: $baseUrl" -ForegroundColor Cyan
Write-Host ""

$exitosos = 0
$errores = 0

for ($i = 1; $i -le $cantidad; $i++) {
    $categoria = $categorias | Get-Random
    $adjective = $adjectives | Get-Random  
    $topic = $topics | Get-Random
    
    $body = @{
        title = "$adjective $topic de $categoria #$i"
        description = "Este es un $topic.ToLower() completo sobre $categoria que incluye información detallada y ejemplos prácticos. Generado automáticamente para pruebas de carga el $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        category = $categoria
        published = @($true, $false) | Get-Random
    } | ConvertTo-Json

    try {
        Write-Host "📝 [$i/$cantidad] Creando: '$($adjective) $($topic) de $($categoria)'..." -ForegroundColor Green
        
        $response = Invoke-RestMethod -Uri $baseUrl -Method POST -Body $body -ContentType "application/json" -TimeoutSec 10
        
        # Acceder correctamente a la estructura de respuesta
        $blogId = $response.data.blog.id
        Write-Host "   ✅ Blog creado exitosamente - ID: $blogId" -ForegroundColor Cyan
        $exitosos++
        
    } catch {
        Write-Host "   ❌ Error al crear blog: $($_.Exception.Message)" -ForegroundColor Red
        $errores++
    }
    
    if ($i -lt $cantidad) {
        Write-Host "   ⏳ Esperando $intervalo segundo(s)..." -ForegroundColor Gray
        Start-Sleep -Seconds $intervalo
    }
}

Write-Host ""
Write-Host "📊 RESUMEN DE EJECUCIÓN:" -ForegroundColor Yellow
Write-Host "✅ Blogs creados exitosamente: $exitosos" -ForegroundColor Green
Write-Host "❌ Errores: $errores" -ForegroundColor Red
Write-Host "📈 Tasa de éxito: $([math]::Round(($exitosos / $cantidad) * 100, 2))%" -ForegroundColor Cyan

# Verificar algunos blogs creados
Write-Host ""
Write-Host "🔍 Verificando últimos blogs creados..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method GET
    Write-Host "📋 Total de blogs en la base: $($response.results)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Error al verificar blogs: $($_.Exception.Message)" -ForegroundColor Red
}