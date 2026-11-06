# Sprint 1 - Fundamentos, análisis y arquitectura base

## Objetivo del sprint

Dejar una base arquitectónica coherente y verificable para iniciar la implementación de RimayPet: alcance MVP priorizado, historias y requisitos trazables, monolito modular con Clean Architecture, módulos y dependencias definidos, atributos de calidad medibles, C4 actualizado y esqueleto de desarrollo preparado.

## Duración y capacidad

Duración sugerida: 2 semanas académicas. La capacidad se ajusta a un desarrollador. Las estimaciones son propuestas iniciales y pueden cambiar según la revisión docente.

## Alcance incluido

- Confirmar actores, alcance, 25 historias y prioridades MoSCoW.
- Consolidar 15 requisitos funcionales y restricciones.
- Definir los cuatro atributos prioritarios y escenarios EQ.
- Aceptar ADR-001 a ADR-011.
- Definir seis módulos, esquemas y fachadas.
- Definir comunicación REST, WebSocket, fachadas y Outbox.
- Documentar C4 niveles 1–4 y despliegue en dos VM.
- Preparar estructura de carpetas, convenciones, pruebas y CI inicial.
- Definir pruebas de carga y criterios de aceptación para 1000 concurrentes.

## Fuera del sprint

- Implementación funcional completa del MVP.
- IA, reconocimiento de imágenes, recomendaciones ML y asistente.
- Aplicaciones nativas.
- Alta disponibilidad multi-zona o réplica PostgreSQL.
- Despliegue productivo con dominio definitivo.

## Backlog del sprint

| ID | Actividad / entregable | Criterio de aceptación | Prioridad |
|---|---|---|---|
| S1-01 | Consolidar actores y alcance del producto | Actores y límites documentados; fuera de alcance explícito. | Alta |
| S1-02 | Completar historias de usuario | 25 HU, criterios verificables y MoSCoW (11/10/4). | Alta |
| S1-03 | Consolidar requisitos funcionales | 15 RF, cada uno asignado a módulo e historias. | Alta |
| S1-04 | Definir restricciones y drivers | RC y DA identificados, priorizados y trazables. | Alta |
| S1-05 | Definir atributos de calidad | EQ con estímulo, entorno, respuesta, medida y herramienta. | Alta |
| S1-06 | Decidir estilo y enfoque | Monolito modular + Clean Architecture justificado frente a alternativas. | Alta |
| S1-07 | Definir módulos y fronteras | Seis módulos, responsabilidad, datos, fachada, eventos y dependencias. | Alta |
| S1-08 | Diseñar comunicación | Contratos REST/WS, DTO, eventos Outbox, idempotencia y flujo de alerta. | Alta |
| S1-09 | Diseñar despliegue Oracle | Distribución de dos VM, límites, API secundaria condicional y sin réplica DB en MVP. | Alta |
| S1-10 | Elaborar C4 | C1 contexto, C2 contenedores, C3 Alertas y C4 caso de uso; diagramas legibles. | Alta |
| S1-11 | Definir patrones y buenas prácticas | Catálogo con problema, aplicación y justificación. | Media |
| S1-12 | Preparar estructura y convenciones | Estructura modular propuesta, ramas, commits y configuración por entorno. | Media |
| S1-13 | Preparar estrategia de pruebas | Unitarias, arquitectura, integración, contrato, seguridad, carga y resiliencia. | Media |
| S1-14 | Trazabilidad y revisión final | Historia → RF → módulo → componente → EQ/ADR → prueba. | Alta |

## Secuencia sugerida

| Día | Trabajo |
|---|---|
| 1–2 | Alcance, actores, historias y prioridades. |
| 3–4 | RF, restricciones, drivers y escenarios de calidad. |
| 5–6 | ADR, estilo, Clean Architecture y módulos. |
| 7–8 | Comunicación, datos, capacidad y despliegue. |
| 9 | C4 niveles 1–4, revisión de diagramas. |
| 10 | Trazabilidad, revisión por pares, correcciones y demostración. |

## Entregables

1. Backlog de 25 historias y 15 requisitos funcionales.
2. Matriz de atributos de calidad EQ-01 a EQ-10.
3. Documento de estilo, enfoque, módulos, comunicación y despliegue.
4. ADR-001 a ADR-011.
5. Diagramas C4 y diagramas de estilo/despliegue.
6. Estructura inicial del repositorio y ejemplo de corte vertical.
7. Matriz de trazabilidad y plan de pruebas.
8. Evidencias: capturas de diagramas, pipeline, pruebas y revisión de repositorio.

## Definition of Done del Sprint 1

- No existen referencias activas a microservicios, base de datos por servicio ni Redis Pub/Sub como bus.
- Todas las historias tienen criterios de aceptación y prioridad.
- Los RF tienen trazabilidad a historias y módulos.
- Las dependencias entre módulos son acíclicas y usan fachadas.
- Los diagramas no presentan flechas ambiguas ni texto cortado.
- Los escenarios de calidad tienen métricas y herramientas.
- Las decisiones no medidas están identificadas como propuestas.
- El repositorio puede ser clonado y el ejemplo ejecutable corre sus pruebas.
- El equipo puede explicar por qué el escalado no equivale a dividir el sistema en microservicios.

## Riesgos y decisiones pendientes para el siguiente sprint

- Validar el rendimiento real del corte vertical con PostgreSQL y PostGIS.
- Medir CPU y memoria por proceso en las dos VM.
- Confirmar límites vigentes de Oracle y Cloudflare al desplegar.
- Definir retención de Outbox, dead-letter y bitácora.
- Concretar política de privacidad, radio máximo y datos públicos de una alerta.
- Seleccionar librerías definitivas de JWT, Argon2id, WebSocket y validación.
