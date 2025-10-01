# 📊 New Relic Integration

## ¿Qué es New Relic?

New Relic es una plataforma de observabilidad que te permite:
- 🔍 **Monitorear performance** de la aplicación en tiempo real
- 🐛 **Detectar errores** y problemas antes que los usuarios
- 📈 **Analizar métricas** de CPU, memoria, base de datos
- 🚨 **Alertas automáticas** cuando algo falla
- 📊 **Dashboards** para visualizar el health de tu app

## Configuración

### 1. Obtener License Key
1. Crear cuenta en [New Relic](https://newrelic.com/)
2. Ir a **Account settings** → **API keys**
3. Copiar tu **License key**

### 2. Configurar variables de entorno
```bash
# En .env (desarrollo)
NEW_RELIC_LICENSE_KEY=tu_license_key_aqui
NEW_RELIC_APP_NAME=CRUD Blog API

# En GitHub Secrets (CI/CD)
NEW_RELIC_LICENSE_KEY=tu_license_key_aqui
```

### 3. Configurar en Docker
```bash
# Al ejecutar el container
docker run -e NEW_RELIC_LICENSE_KEY=tu_license_key fedemarty/blog-api:latest
```

## ¿Qué monitorea?

✅ **Performance de endpoints** (tiempo de respuesta)  
✅ **Errores de la aplicación** (500, 404, exceptions)  
✅ **Queries de base de datos** (Sequelize/PostgreSQL)  
✅ **Uso de memoria y CPU**  
✅ **Throughput** (requests por minuto)  
✅ **Distributed tracing** entre servicios  

## Dashboards importantes

- **APM Summary**: Overview general de performance
- **Databases**: Queries más lentas y problemáticas  
- **Errors**: Errores más frecuentes
- **External services**: APIs externas que usas
- **Infrastructure**: Métricas del servidor/container

## Beneficios para DevOps

🚀 **Proactive monitoring**: Detecta problemas antes que afecten usuarios  
🎯 **Performance optimization**: Identifica bottlenecks en el código  
🔧 **Debugging**: Stack traces completos cuando algo falla  
📊 **Business insights**: Métricas que importan al negocio  
⚡ **Faster resolution**: Reduce tiempo de resolución de issues  

¡Perfecto para completar tu stack DevOps con observabilidad! 📈