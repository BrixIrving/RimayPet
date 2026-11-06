# Atributos de calidad

## Prioridades arquitectónicas

| Prioridad | Atributo | Objetivo para RimayPet |
|---|---|---|
| 1 | Escalabilidad y rendimiento | Atender hasta 1000 sesiones concurrentes con actividad normal, manteniendo tiempos de respuesta aceptables y uso controlado de CPU. |
| 2 | Disponibilidad | Mantener la API operativa durante el procesamiento de alertas; tolerar la caída temporal del worker sin perder eventos confirmados. |
| 3 | Seguridad | Proteger identidad, datos personales, ubicación y recursos mediante autenticación, autorización, cifrado y auditoría. |
| 4 | Desplegabilidad | Construir y desplegar el mismo artefacto de forma reproducible en dos VM, con verificación y posibilidad de rollback. |

## Atributos transversales

- **Mantenibilidad:** fronteras modulares, Clean Architecture, pruebas de arquitectura y contratos explícitos.
- **Observabilidad:** logs estructurados, identificador de correlación, métricas, health checks y alertas operativas.
- **Testabilidad:** dominio y casos de uso verificables sin infraestructura externa.
- **Interoperabilidad:** API REST versionada y contrato OpenAPI; WebSocket documentado para mensajería.

Las metas numéricas son objetivos de diseño propuestos y deben validarse en la infraestructura real. No se presentan como resultados medidos.
