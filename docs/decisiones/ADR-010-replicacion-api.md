# ADR-010: Segunda instancia API condicional y balanceo Caddy

- **Estado:** Aceptada con condición
- **Contexto:** el proceso API puede ser cuello de botella para 1000 sesiones, pero el segundo nodo aloja la base de datos.
- **Decisión:** comenzar con una API en VM1. Si EQ-01 falla por CPU de API y VM2 mantiene margen medido de CPU/memoria, iniciar el mismo artefacto como `api-2` en VM2 y configurar Caddy como reverse proxy balanceado. No se replica PostgreSQL en el MVP.
- **Alternativas:** activar siempre la segunda API; réplica síncrona de PostgreSQL; microservicios.
- **Consecuencias:** permite aumentar capacidad de proceso sin dividir módulos; la instancia secundaria compite por recursos con PostgreSQL y se desactiva si perjudica la base.
- **Verificación:** prueba A/B con k6 y métricas de CPU/latencia de API y PostgreSQL.
