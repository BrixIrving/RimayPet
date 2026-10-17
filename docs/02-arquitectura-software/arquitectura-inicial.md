# Arquitectura inicial

A partir de los drivers (DA01 a DA06), la arquitectura organiza sus responsabilidades en tres capas.

![Arquitectura en capas de RimayPet](../img/arquitectura-capas.png)

| Capa | Pregunta que responde | Contenido |
|---|---|---|
| Presentación | ¿Cómo interactúa el usuario? | Aplicación web progresiva (PWA) que consume la API REST y el canal WebSocket. |
| Servicios (lógica de negocio) | ¿Qué hace el sistema? | Microservicios de Perfiles (con Moderación), Publicaciones, Mensajería, Alertas y Notificaciones, detrás de un API Gateway. |
| Datos | ¿Dónde se almacena la información? | Una base PostgreSQL por microservicio y el almacenamiento de medios en un CDN. |

## Diagrama integrado

![Diagrama de la arquitectura inicial](../img/arquitectura-inicial.png)

```mermaid
flowchart TD
  subgraph ACTORES
    Dueno["Dueño de mascota"]
    Mod["Moderador"]
  end
  subgraph PRESENTACION
    Web["PWA · REST y WebSocket"]
  end
  subgraph NEGOCIO["NEGOCIO (MICROSERVICIOS)"]
    GW["API Gateway · JWT"]
    Perfiles["Perfiles + Moderación"]
    Publicaciones["Publicaciones"]
    Mensajeria["Mensajería"]
    Alertas["Alertas"]
    Notif["Notificaciones"]
  end
  subgraph DATOS
    BD["PostgreSQL (una BD por servicio)"]
  end
  subgraph EXTERNOS
    CDN["CDN de medios"]
    Push["Servicio push"]
  end
  ACTORES --> PRESENTACION
  PRESENTACION --> GW
  GW --> Perfiles
  GW --> Publicaciones
  GW --> Mensajeria
  GW --> Alertas
  Alertas -- evento --> Notif
  NEGOCIO --> DATOS
  Publicaciones -.-> CDN
  Notif -.-> Push
```
