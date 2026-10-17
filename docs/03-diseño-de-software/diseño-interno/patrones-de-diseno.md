# Patrones de diseño

Los patrones son soluciones probadas a problemas frecuentes. Esta tabla indica cuáles se usan en RimayPet y dónde.

| Patrón | Problema que resuelve en RimayPet | Dónde se aplica | Estado |
|---|---|---|---|
| **Repository** | Aislar el acceso a datos del dominio. | `RepositorioReportes`, `RepositorioPerfiles`, etc. | Aplicado en el ejemplo |
| **Adapter** | Integrar proveedores con interfaces distintas sin tocar los casos de uso. | `AlmacenMedios` (R2 o Supabase), `ServicioPush` | Previsto |
| **Factory (método de fábrica)** | Crear entidades válidas siempre con sus reglas. | `ReporteMascotaPerdida.crear(...)` | Aplicado en el ejemplo |
| **Publicar/Suscribir** | Distribuir una alerta sin bloquear a quien la origina. | `PublicadorEventos` y suscriptor de Notificaciones | Aplicado (puerto en el ejemplo) |
| **API Gateway** | Un solo punto de entrada con autenticación centralizada. | Contenedor API Gateway | Previsto |
| **Circuit Breaker** | Evitar errores en cadena cuando el servicio push falla. | Cliente del servicio push en Notificaciones | Previsto |
| **Facade** | Dar a la PWA una interfaz simple sobre varios servicios. | API Gateway | Previsto |
| **CORS** | Permitir que la PWA consuma el Gateway desde su origen. | Configuración del Gateway | Previsto |

## Ejemplo: Factory en el dominio

El dominio no se construye con `new` directamente. El método `ReporteMascotaPerdida.crear(datos)` valida las reglas y devuelve una entidad siempre consistente. Ver `tecnologia/boilerplate-clean-architecture/src/alertas/domain/ReporteMascotaPerdida.js`.

## Ejemplo: Circuit Breaker en Notificaciones

Si el servicio push falla repetidamente, el cliente deja de llamarlo por un tiempo, registra el fallo (observabilidad, AC06) y reintenta luego. Así un servicio externo caído no degrada el resto del sistema.
