# Boilerplate Clean Architecture · Servicio de Alertas de RimayPet

Ejemplo **de lectura y ejecución** (no es el sistema completo). Muestra cómo se organizan las responsabilidades y dependencias del servicio de Alertas con las cuatro capas del proyecto. No tiene dependencias externas: solo requiere Node.js 18 o superior.

```bash
npm test        # pruebas del dominio, del caso de uso y de la regla de dependencia
npm run demo    # ejecuta el flujo "reportar mascota perdida" en memoria
```

## Estructura

```text
src/
├── alertas/
│   ├── domain/           # Dominio: entidades, objetos de valor, errores (no importa nada)
│   ├── application/      # Aplicación: casos de uso y puertos
│   │   ├── casos-de-uso/
│   │   └── ports/
│   ├── infrastructure/   # Infraestructura: adaptadores (aquí en memoria)
│   └── presentation/     # Presentación: controlador sin framework
└── composition/          # Único lugar que conoce todas las capas
test/
```

## Dónde irían las tecnologías reales

| Puerto | Adaptador de este ejemplo | Adaptador real |
|---|---|---|
| `RepositorioReportes` | `RepositorioReportesMemoria` | `RepositorioReportesPostGIS` (PostgreSQL + PostGIS) |
| `PublicadorEventos` | `PublicadorEventosMemoria` | `PublicadorRedis` (Redis Pub/Sub) |

Cambiar de adaptador solo exige modificar `src/composition/`. El dominio y los casos de uso no cambian (escenario EQ-05).

## Regla de dependencia

La prueba `test/regla-de-dependencia.test.js` revisa que `domain/` y `application/` no importen `infrastructure/` ni `presentation/`.
