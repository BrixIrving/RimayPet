# C4 — Nivel 1: contexto del sistema

![C4 nivel 1](../diagramas/c4-nivel1-contexto.svg)

```mermaid
flowchart LR
  Owner[Dueño / usuario de la comunidad] -->|Usa| RP[RimayPet]
  Mod[Moderador / administrador] -->|Modera y administra| RP
  Visitor[Visitante] -->|Consulta enlace público| RP
  RP -->|Sube y descarga medios con URL firmada| R2[Cloudflare R2]
  RP -->|Entrega notificaciones push| Push[Servicio Web Push]
```

| Elemento | Tipo | Responsabilidad |
|---|---|---|
| Dueño / usuario | Persona | Gestiona mascotas, publica, conversa y reporta pérdidas. |
| Moderador / administrador | Persona | Revisa reportes y administra la comunidad. |
| Visitante | Persona | Consulta únicamente información pública compartida. |
| RimayPet | Sistema | Red social y plataforma de alertas geolocalizadas. |
| Cloudflare R2 | Sistema externo | Almacena medios mediante URLs firmadas. |
| Web Push | Sistema externo | Entrega notificaciones a dispositivos suscritos. |
