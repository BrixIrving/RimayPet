# Ejemplo Clean Architecture — módulo Alertas

Este directorio contiene un corte vertical didáctico del módulo Alertas dentro del **monolito modular RimayPet**. No es un microservicio independiente.

## Qué demuestra

- Dominio aislado de frameworks y persistencia.
- Casos de uso que dependen de puertos.
- Adaptadores en memoria para repositorio y publicación.
- Composición por inyección de dependencias.
- Pruebas de reglas de dominio, casos de uso y dirección de dependencias.

## Qué no implementa aún

La conexión productiva a PostgreSQL/PostGIS, Transactional Outbox, worker, JWT, R2, Web Push, API REST desplegable y pruebas de 1000 usuarios son trabajo de los siguientes incrementos.

## Ejecutar

```bash
npm install
npm test
npm run demo
```

Este ejemplo no debe describirse como una arquitectura de microservicios.
