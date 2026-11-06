# ADR-001: Monolito modular

- **Estado:** Aceptada
- **Contexto:** RimayPet debe ser mantenible por un desarrollador y operar con dos VM pequeñas de Oracle. El proyecto necesita fronteras de negocio y capacidad para evolucionar.
- **Decisión:** una sola aplicación desplegable organizada en seis módulos con fachadas públicas. API y worker son procesos del mismo código y artefacto.
- **Alternativas:** microservicios; monolito sin modularidad.
- **Consecuencias positivas:** menor complejidad operativa, transacciones ACID, menor consumo por proceso, despliegue reproducible.
- **Consecuencias negativas:** no se escala cada módulo de forma independiente; la API se replica como unidad completa.
- **Mitigación:** modularidad estricta, caché, paginación, worker separado y extracción futura solo con evidencia.
