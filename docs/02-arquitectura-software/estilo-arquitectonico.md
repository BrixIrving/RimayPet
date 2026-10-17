# Estilo arquitectónico

**Estilo seleccionado: microservicios con comunicación orientada a eventos (event-driven)**, con un cliente PWA en esquema cliente-servidor y organización en capas.

## Por qué este estilo

| Parte del estilo | Driver al que responde |
|---|---|
| Cliente-servidor (PWA con REST y WebSocket) | DA05 |
| Microservicios, cada uno con su API y su base de datos | DA01 |
| Comunicación por eventos (Redis Pub/Sub) | DA02 |
| API Gateway con JWT | DA03 |
| Contenedores en dos servidores gratuitos | DA04 |

## Alternativa descartada: monolito modular

Es la opción del marketplace de ejemplo. Se descarta porque la restricción RC05 exige desplegar en más de un servidor y DA01 exige escalar capacidades por separado. Se conserva su principio de módulos bien delimitados, aplicado dentro de cada servicio mediante Clean Architecture.

## Diagrama

![Estilo arquitectónico](../img/arquitectura-tecnica.png)

## Supuesto de diseño

El módulo de Moderación y Reportes se aloja en el servicio de Perfiles para no multiplicar servicios (RC02). Puede extraerse como servicio propio si crece.
