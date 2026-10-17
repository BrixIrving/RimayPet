# Actores de RimayPet

RimayPet es una red social para dueños de mascotas de Ayacucho con alerta geolocalizada de mascotas perdidas. Interactúan con el sistema dos actores humanos y dos sistemas externos.

```text
                    RIMAYPET
                       │
        ┌──────────────┴──────────────┐
        ↓                             ↓
 Dueño de mascota                 Moderador

   Sistemas externos:
        ↓                             ↓
 Almacenamiento de medios (CDN)   Servicio de notificaciones push
```

| Actor | Tipo | ¿Qué necesita realizar? |
|---|---|---|
| **Dueño de mascota** | Humano | Crear su perfil y el de sus mascotas, publicar fotos y videos, interactuar con otras publicaciones, enviar mensajes directos, reportar una mascota perdida y recibir alertas de mascotas perdidas cercanas. |
| **Moderador** | Humano | Revisar el contenido reportado por la comunidad, suspender cuentas que incumplan las normas y consultar reportes de actividad. |
| **Almacenamiento de medios (CDN)** | Sistema externo | Almacenar y servir las fotos y videos publicados por los usuarios. |
| **Servicio de notificaciones push** | Sistema externo | Entregar al dispositivo del usuario las alertas y notificaciones generadas por la plataforma. |

> Diferencia con el marketplace del ejemplo: en RimayPet el flujo central no es la compra, sino la **interacción social** y la **respuesta urgente ante una mascota perdida**.
