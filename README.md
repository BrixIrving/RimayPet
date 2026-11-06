# RimayPet - Arquitectura de Software

RimayPet es una red social para dueños de mascotas que integra perfiles, publicaciones, mensajería y alertas geolocalizadas para mascotas perdidas.

## Decisión arquitectónica vigente

- **Estilo:** monolito modular.
- **Enfoque:** Clean Architecture aplicada dentro de cada módulo.
- **Procesos:** API HTTP/WebSocket y worker asíncrono, construidos desde el mismo código y artefacto.
- **Persistencia:** una instancia PostgreSQL + PostGIS, con un esquema por módulo.
- **Eventos:** patrón Transactional Outbox en PostgreSQL; consumidores idempotentes.
- **Infraestructura:** dos VM Oracle Cloud Free Tier (1 OCPU y 6 GB RAM por VM, según el dimensionamiento documentado).
- **Meta de capacidad:** hasta 1000 sesiones concurrentes con perfil de actividad normal; es un objetivo de prueba, no una capacidad certificada.

## Mapa de documentación

| Carpeta | Contenido |
|---|---|
| `docs/01-analisis-de-sistema/` | Actores, 25 historias, requisitos, calidad, restricciones y drivers |
| `docs/02-arquitectura-software/` | Estilo, Clean Architecture, módulos, comunicación, capacidad y despliegue |
| `docs/04-modelo-c4/` | C4 niveles 1 a 4 |
| `docs/05-sprint-1/` | Objetivo, alcance, backlog, tareas, criterios de terminado, resumen DOCX y presentación PPTX alineada |
| `docs/decisiones/` | ADR vigentes |
| `docs/diagramas/` | Fuentes Mermaid y SVG de los diagramas principales |
| `tecnologia/boilerplate-clean-architecture/` | Ejemplo ejecutable del caso de uso de Alertas |

## Orden de lectura

1. `docs/05-sprint-1/plan-sprint-1.md`
2. `docs/01-analisis-de-sistema/02-historias-del-usuario.md`
3. `docs/01-analisis-de-sistema/03-requisitos-funcionales.md`
4. `docs/02-arquitectura-software/estilo-arquitectonico.md`
5. `docs/02-arquitectura-software/modulos-y-fronteras.md`
6. `docs/02-arquitectura-software/capacidad-y-despliegue.md`
7. `docs/04-modelo-c4/`

## Estructura objetivo del código

```text
src/
├── modules/
│   ├── identidad/
│   ├── perfiles/
│   ├── publicaciones/
│   ├── mensajeria/
│   ├── alertas/
│   └── notificaciones/
├── shared/
│   ├── auth/
│   ├── config/
│   ├── database/
│   ├── events/
│   ├── http/
│   ├── observability/
│   └── errors/
├── composition/
├── main-api.ts
└── main-worker.ts
specs/
tests/
migrations/
deploy/
.github/workflows/
```

Cada módulo contiene `domain/`, `application/`, `presentation/`, `infrastructure/` y `index.ts`. El archivo `index.ts` es la única fachada pública del módulo.

## Comandos del ejemplo de Alertas

```bash
cd tecnologia/boilerplate-clean-architecture
npm install
npm test
npm run demo
```

El ejemplo es un corte vertical didáctico con adaptadores en memoria; no representa todavía la integración productiva con PostgreSQL, Caddy, R2 o Web Push.
