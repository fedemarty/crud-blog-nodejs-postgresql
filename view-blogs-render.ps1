# 📋 VISUALIZADOR DE BLOGS EN RENDER - VERSIÓN MEJORADA

# ===========================================
# 1. LISTAR TODOS LOS BLOGS
# ===========================================

Write-Host "`n🌐 Obteniendo todos los blogs de Render..." -ForegroundColor Cyan
$response = Invoke-RestMethod -Uri "https://crud-blog-nodejs-postgresql.onrender.com/api/blogs" -Method GET

Write-Host "✅ Status: $($response.status)" -ForegroundColor Green
Write-Host "📊 Total de blogs: $($response.results)" -ForegroundColor Yellow

# ===========================================
# 2. MOSTRAR LISTADO COMPLETO
# ===========================================

Write-Host "`n📋 LISTADO DE TODOS LOS BLOGS:" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

$contador = 1
foreach ($blog in $response.data.blogs) {
    Write-Host "[$contador/$($response.results)] 🔹 $($blog.title)" -ForegroundColor Blue
    Write-Host "    🆔 ID: $($blog.id)" -ForegroundColor DarkGray
    Write-Host "    📂 Categoría: $($blog.category)" -ForegroundColor Gray
    Write-Host "    ✅ Publicado: $($blog.published)" -ForegroundColor $(if($blog.published){"Green"}else{"Yellow"})
    Write-Host "    📅 Creado: $($blog.createdAt)" -ForegroundColor DarkGray
    
    # Mostrar preview de descripción
    $preview = if($blog.description.Length -gt 100) {
        $blog.description.Substring(0, 100) + "..."
    } else {
        $blog.description
    }
    Write-Host "    📝 $preview" -ForegroundColor DarkGray
    Write-Host ""
    $contador++
}

# ===========================================
# 3. ENCONTRAR Y MOSTRAR BLOG MÁS RECIENTE
# ===========================================

Write-Host "`n🆕 BLOG MÁS RECIENTE:" -ForegroundColor Cyan
Write-Host "=====================`n" -ForegroundColor Cyan

$blogReciente = $response.data.blogs | Sort-Object createdAt -Descending | Select-Object -First 1

Write-Host "🆔 ID: " -NoNewline -ForegroundColor Blue
Write-Host $blogReciente.id -ForegroundColor White
Write-Host "📝 Título: " -NoNewline -ForegroundColor Blue  
Write-Host $blogReciente.title -ForegroundColor White
Write-Host "📂 Categoría: " -NoNewline -ForegroundColor Blue
Write-Host $blogReciente.category -ForegroundColor White
Write-Host "✅ Publicado: " -NoNewline -ForegroundColor Blue
Write-Host $blogReciente.published -ForegroundColor $(if($blogReciente.published){"Green"}else{"Yellow"})
Write-Host "📅 Creado: " -NoNewline -ForegroundColor Blue
Write-Host $blogReciente.createdAt -ForegroundColor White
Write-Host "`n📄 DESCRIPCIÓN COMPLETA:" -ForegroundColor Cyan
Write-Host $blogReciente.description -ForegroundColor White

$idReciente = $blogReciente.id

# ===========================================
# 4. CONSULTAR BLOG ESPECÍFICO POR ID
# ===========================================

Write-Host "`n`n🔎 CONSULTANDO BLOG ESPECÍFICO POR ID..." -ForegroundColor Cyan
Write-Host "URL: https://crud-blog-nodejs-postgresql.onrender.com/api/blogs/$idReciente" -ForegroundColor DarkGray
Write-Host ""

$blogEspecifico = Invoke-RestMethod -Uri "https://crud-blog-nodejs-postgresql.onrender.com/api/blogs/$idReciente" -Method GET

Write-Host "✅ Status: $($blogEspecifico.status)" -ForegroundColor Green
Write-Host "`n📋 DETALLES COMPLETOS DEL BLOG:" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

$blog = $blogEspecifico.data.blog

Write-Host "🆔 ID:" -ForegroundColor Blue
Write-Host "   $($blog.id)" -ForegroundColor White
Write-Host "`n📝 TÍTULO:" -ForegroundColor Blue
Write-Host "   $($blog.title)" -ForegroundColor White
Write-Host "`n📂 CATEGORÍA:" -ForegroundColor Blue
Write-Host "   $($blog.category)" -ForegroundColor White
Write-Host "`n✅ ESTADO:" -ForegroundColor Blue
Write-Host "   Publicado: $($blog.published)" -ForegroundColor $(if($blog.published){"Green"}else{"Yellow"})
Write-Host "`n📅 FECHAS:" -ForegroundColor Blue
Write-Host "   Creado: $($blog.createdAt)" -ForegroundColor White
Write-Host "   Actualizado: $($blog.updatedAt)" -ForegroundColor White
Write-Host "`n📄 DESCRIPCIÓN COMPLETA:" -ForegroundColor Blue
Write-Host "   $($blog.description)" -ForegroundColor White

# ===========================================
# 5. ESTADÍSTICAS
# ===========================================

Write-Host "`n`n📊 ESTADÍSTICAS:" -ForegroundColor Cyan
Write-Host "================`n" -ForegroundColor Cyan

$publicados = $response.data.blogs | Where-Object { $_.published -eq $true }
$noPublicados = $response.data.blogs | Where-Object { $_.published -eq $false }

Write-Host "📋 Total de blogs: " -NoNewline -ForegroundColor White
Write-Host $response.results -ForegroundColor Yellow

Write-Host "✅ Publicados: " -NoNewline -ForegroundColor White
Write-Host $publicados.Count -ForegroundColor Green

Write-Host "⏸️  No publicados: " -NoNewline -ForegroundColor White
Write-Host $noPublicados.Count -ForegroundColor Yellow

# Estadísticas por categoría
Write-Host "`n📂 Blogs por categoría:" -ForegroundColor White
$categorias = $response.data.blogs | Group-Object category | Sort-Object Count -Descending
foreach ($cat in $categorias) {
    $catName = if([string]::IsNullOrEmpty($cat.Name)) { "(sin categoría)" } else { $cat.Name }
    Write-Host "   • $catName : " -NoNewline -ForegroundColor Gray
    Write-Host $cat.Count -ForegroundColor Yellow
}

# ===========================================
# 6. COMANDOS ÚTILES
# ===========================================

Write-Host "`n`n💡 COMANDOS ÚTILES:" -ForegroundColor Cyan
Write-Host "==================`n" -ForegroundColor Cyan

Write-Host "# Ver un blog específico:" -ForegroundColor DarkGray
Write-Host "Invoke-RestMethod -Uri `"https://crud-blog-nodejs-postgresql.onrender.com/api/blogs/$idReciente`" -Method GET`n" -ForegroundColor White

Write-Host "# Actualizar este blog:" -ForegroundColor DarkGray
Write-Host "`$update = @{title=`"Nuevo título`"} | ConvertTo-Json" -ForegroundColor White
Write-Host "Invoke-RestMethod -Uri `"https://crud-blog-nodejs-postgresql.onrender.com/api/blogs/$idReciente`" -Method PATCH -Body `$update -ContentType `"application/json`"`n" -ForegroundColor White

Write-Host "# Eliminar este blog:" -ForegroundColor DarkGray
Write-Host "Invoke-RestMethod -Uri `"https://crud-blog-nodejs-postgresql.onrender.com/api/blogs/$idReciente`" -Method DELETE`n" -ForegroundColor White

Write-Host "`n✨ Script completado!`n" -ForegroundColor Green
