# Capacidad, distribución y despliegue en Oracle Cloud

## Recursos disponibles en el planteamiento

El diseño toma como base dos VM Arm Oracle Cloud Free Tier, cada una con 1 OCPU y 6 GB RAM (2 OCPU y 12 GB en total). Los límites y disponibilidad efectiva deben comprobarse en la cuenta y región al aprovisionar; Oracle puede modificar sus condiciones.

## Distribución recomendada

| Nodo | Recursos | Contenedores / procesos | Responsabilidad |
|---|---|---|---|
| **Servidor 1 — Aplicación** | 1 OCPU, 6 GB RAM | Caddy; PWA estática; `rimaypet-api-1`; `rimaypet-worker`; caché local limitada dentro de la API. | Entrada HTTPS, API principal, WebSocket y procesamiento asíncrono. |
| **Servidor 2 — Datos** | 1 OCPU, 6 GB RAM | PostgreSQL + PostGIS; respaldos y métricas de base. En modo de escalado, `rimaypet-api-2` del mismo artefacto, solo si las mediciones muestran margen de CPU en este nodo. | Persistencia primaria. API secundaria condicional. |

**Balanceo:** Caddy en el servidor 1 distribuye tráfico HTTP entre `api-1` y, si se activa, `api-2` en el servidor 2. WebSocket se enruta con afinidad por conexión; no se requiere sticky session para JWT sin estado. Para mensajes entre instancias se usa PostgreSQL `LISTEN/NOTIFY` como señal efímera; el mensaje de negocio ya está persistido.

**No se recomienda una réplica PostgreSQL en esta fase.** Con solo dos nodos y 1 OCPU cada uno, la réplica consume CPU/memoria y no aporta un tercer nodo independiente para alta disponibilidad. Se priorizan backups consistentes y restauración probada. La base primaria es un punto único de fallo conocido.

## Presupuesto orientativo de recursos

| Componente | Servidor 1 | Servidor 2 |
|---|---:|---:|
| SO, Docker y agentes | 0.8–1.2 GB | 0.8–1.2 GB |
| Caddy + estáticos | 100–200 MB | — |
| API principal | 300–500 MB | — |
| Worker | 150–300 MB | — |
| PostgreSQL + PostGIS | — | 1.5–2.5 GB (ajustable) |
| API secundaria (condicional) | — | 300–500 MB |
| Caché / margen | 0.5–1 GB | 1–2 GB para PostgreSQL y SO |
| **Objetivo** | Mantener margen operativo | Evitar que la API secundaria compita con la base |

Los valores son estimaciones iniciales, no mediciones. La CPU es el principal riesgo porque cada VM tiene una OCPU. Si el servidor de datos no tiene margen, no se activa `api-2`: se optimizan consultas, caché y paginación antes de replicar procesos.

## Tácticas para 1000 concurrentes

1. API sin estado de sesión: JWT firmado; refresh tokens persistidos y rotados.
2. Feed cache-aside con TTL de 30 segundos, invalidación al publicar y límite de memoria. Si hay dos API, invalidación entre instancias por PostgreSQL `NOTIFY` o TTL corto.
3. Paginación por cursor, lotes de 20–50 registros e índices por fecha/propietario/estado.
4. Pool PostgreSQL acotado: inicialmente 10 conexiones por proceso API y 5 para worker; revisar en carga.
5. WebSocket con ping/pong cada 30 segundos, límites de payload y backpressure.
6. Archivos fuera de la API, en R2 mediante URL firmadas.
7. Worker separado para notificaciones; concurrencia limitada (por ejemplo 20 envíos) y reintentos.
8. Rate limit por IP/usuario, especialmente login, búsqueda y creación de alertas.
9. Caddy sirve la PWA estática y aplica compresión, HTTPS y límites de tamaño.
10. k6 desde una máquina externa; no ejecutar el generador de carga en las VM bajo prueba.

## Interpretación de la meta

- 1000 sesiones WebSocket abiertas no equivalen a 1000 solicitudes por segundo.
- Perfil normal de diseño: una acción por usuario cada 10 segundos ≈ 100 solicitudes/s.
- Perfil intenso: una acción cada 5 segundos ≈ 200 solicitudes/s.
- Se acepta el objetivo normal solo si p95 ≤ 2 s, errores < 1 % y CPU de API < 80 % durante 5 minutos, bajo el escenario acordado.
- La capacidad real debe medirse con el corte vertical completo; no se garantiza por cálculo teórico.

## Estrategia de disponibilidad

- Docker `restart: unless-stopped` y health checks.
- `/health/live` comprueba proceso; `/health/ready` comprueba dependencias indispensables.
- Si worker cae, API sigue y Outbox retiene eventos.
- `pg_dump` nocturno cifrado hacia Object Storage; política de retención definida y prueba mensual de restauración.
- Caddy y el servidor 1 son puntos únicos de fallo; la arquitectura no promete alta disponibilidad multi-zona.
- RPO/RTO iniciales propuestos: RPO ≤ 24 h con backup nocturno; RTO ≤ 2 h mediante restauración documentada. Deben validarse en simulacro.

## Despliegue

Una imagen Docker multietapa para ARM contiene el código. Compose ejecuta comandos distintos (`main-api` y `main-worker`). La migración se ejecuta una sola vez antes de habilitar tráfico. El pipeline etiqueta por commit, realiza health check y conserva la etiqueta anterior para rollback.
