<p align="center"><img src="docs/img/RimayPet_logo.png" alt="RimayPet" width="360"></p>

# RimayPet · Documentación de arquitectura

Red social para dueños de mascotas de Ayacucho, con alerta geolocalizada de mascotas perdidas.

**Curso:** Arquitectura de Software [IS-488] · Semestre 2026-II · UNSCH

## Decisiones principales

| Aspecto | Decisión |
|---|---|
| Estilo arquitectónico | Microservicios con comunicación orientada a eventos (Redis Pub/Sub) |
| Enfoque interno | Clean Architecture con cuatro capas (Dominio, Aplicación, Presentación, Infraestructura) |
| Entrada | API Gateway con JWT; PWA como cliente |
| Despliegue | Docker Compose en dos servidores de Oracle Cloud Free Tier |

## Contenido

| Carpeta | Contenido |
|---|---|
| `docs/00-propuesta` | Propuesta de arquitectura de software |
| `docs/01-analisis-de-sistema` | Actores, historias, requisitos, calidad, restricciones, drivers, decisiones arquitectónicas y escenarios de calidad |
| `docs/02-arquitectura-software` | Arquitectura inicial, estilo, enfoque y componentes arquitectónicos |
| `docs/03-diseño-de-software` | Diseño interno, patrones y principios |
| `docs/04-modelo-c4` | Modelo C4, niveles 1 a 4 |
| `docs/trazabilidad.md` | De qué requisito sale cada componente |
| `tecnologia/boilerplate-clean-architecture` | Ejemplo de Clean Architecture: dominio, aplicación, infraestructura, presentación y pruebas completas |
