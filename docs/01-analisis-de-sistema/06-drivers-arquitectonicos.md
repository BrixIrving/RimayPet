# Drivers arquitectónicos

Un driver es un requisito, atributo o restricción que influye de forma significativa en la arquitectura.

| ID | Driver | Origen | Problema que plantea | Decisión que responde |
|---|---|---|---|---|
| **DA01** | Escalar cada capacidad de negocio de forma independiente | AC03 | Feed, mensajería y alertas crecen a ritmos distintos. | Microservicios (ADR-001, ADR-005) |
| **DA02** | Propagar una alerta masiva sin bloquear el flujo que la origina | AC01, RF06 | Una alerta puede alcanzar a toda la comunidad a la vez. | Bus de eventos asíncrono con Redis Pub/Sub (ADR-003, ADR-008) |
| **DA03** | Proteger datos y comunicaciones | AC04 | Hay datos personales y de ubicación. | API Gateway con JWT y HTTPS (ADR-002) |
| **DA04** | Operar gratis y con una sola persona | RC01, RC02 | Recursos y tiempo muy limitados. | Oracle Free Tier, Docker Compose y CI/CD (ADR-006, ADR-007) |
| **DA05** | Comunicar frontend y backend por REST y WebSocket | RC03 | Se necesita un canal en tiempo real independiente. | PWA, API REST y canal WebSocket separados (ADR-002) |
| **DA06** | Modificar una funcionalidad sin afectar innecesariamente otras | AC05 | Los cambios no deben propagarse entre módulos. | Modularidad y Clean Architecture (ADR-004) |

**Priorización:** (1) DA02 y DA01; (2) DA03 y DA04; (3) DA05 y DA06.
