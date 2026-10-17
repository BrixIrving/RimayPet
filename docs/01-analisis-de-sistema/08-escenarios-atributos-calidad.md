# Escenarios de atributos de calidad de RimayPet

Cada escenario tiene seis partes: fuente del estímulo, estímulo, artefacto, entorno, respuesta y medida. Las medidas marcadas como **propuesta por validar** deben confirmarse con pruebas de carga en la infraestructura gratuita real.

## EQ-01. Rendimiento: consulta del feed

| Elemento | Descripción |
|---|---|
| **Atributo de calidad** | Rendimiento (AC01) |
| **Fuente** | Dueños de mascotas conectados |
| **Estímulo** | Solicitudes simultáneas de feed, con scroll infinito y reacciones. |
| **Artefacto** | Servicio de Publicaciones y su base de datos, con caché Redis. |
| **Entorno** | Operación normal, con 1000 usuarios concurrentes simulados. |
| **Respuesta** | El feed devuelve las publicaciones sin rechazar peticiones. |
| **Medida** | **Propuesta por validar:** el 95 % de las consultas responde en 2 segundos o menos, con menos del 1 % de errores técnicos. |
| **Verificación** | Prueba de carga con registro de tiempos y errores. |
| **Estado** | Pendiente de validar en la infraestructura de despliegue. |

## EQ-02. Disponibilidad: alerta de mascota perdida

| Elemento | Descripción |
|---|---|
| **Atributo de calidad** | Disponibilidad (AC02) y Rendimiento (AC01) |
| **Fuente** | Dueño que reporta una mascota perdida |
| **Estímulo** | Se registra un reporte que debe llegar a todos los usuarios dentro del radio. |
| **Artefacto** | Servicios de Alertas y Notificaciones, y bus Redis Pub/Sub. |
| **Entorno** | Envío masivo en curso y resto de usuarios usando feed y mensajería. |
| **Respuesta** | Alertas responde de inmediato y Notificaciones envía las alertas de forma asíncrona. |
| **Medida** | **Propuesta por validar:** la respuesta a quien reporta tarda 1 segundo o menos (percentil 95) aun con el envío en curso, y el feed y la mensajería mantienen sus tiempos de EQ-01. |
| **Verificación** | Reportar una alerta durante una prueba de carga y medir ambos tiempos. |
| **Estado** | Pendiente de definir el tiempo máximo aceptable de entrega de la alerta. |

## EQ-03. Escalabilidad: crecimiento de la comunidad

| Elemento | Descripción |
|---|---|
| **Atributo de calidad** | Escalabilidad (AC03) |
| **Fuente** | Crecimiento de usuarios conectados |
| **Estímulo** | La concurrencia sube progresivamente de 200 a 1000 usuarios. |
| **Artefacto** | Servicio de Mensajería (el más sensible a conexiones simultáneas). |
| **Entorno** | Dos servidores gratuitos con Docker Compose. |
| **Respuesta** | Se agregan réplicas solo del servicio saturado, sin tocar los demás. |
| **Medida** | **Propuesta por validar:** soportar 1000 usuarios con el 95 % de las respuestas por debajo de 3 segundos y menos del 1 % de errores. |
| **Verificación** | Aumentar la carga por etapas y registrar el uso de CPU y memoria por contenedor. |
| **Estado** | Pendiente de confirmar los recursos disponibles en Oracle Free Tier. |

## EQ-04. Seguridad: acceso no autorizado

| Elemento | Descripción |
|---|---|
| **Atributo de calidad** | Seguridad (AC04) |
| **Fuente** | Usuario sin sesión o con token inválido o vencido |
| **Estímulo** | Intenta usar una función protegida o abrir el canal WebSocket. |
| **Artefacto** | API Gateway y servicio de Perfiles (emisor del JWT). |
| **Entorno** | Operación normal, toda comunicación sobre HTTPS. |
| **Respuesta** | El Gateway rechaza la petición, no la reenvía y no expone datos. |
| **Medida** | Rechazar el 100 % de los intentos sin JWT válido (código 401), incluida la conexión WebSocket. |
| **Verificación** | Pruebas de acceso con y sin token, y con token vencido. |
| **Estado** | Pendiente de definir qué recursos son públicos (por ejemplo, el estado de una mascota perdida). |

## EQ-05. Mantenibilidad: cambio de proveedor de medios

| Elemento | Descripción |
|---|---|
| **Atributo de calidad** | Mantenibilidad (AC05) |
| **Fuente** | Equipo de desarrollo |
| **Estímulo** | Se debe cambiar Cloudflare R2 por Supabase Storage. |
| **Artefacto** | Servicio de Publicaciones. |
| **Entorno** | Código organizado en cuatro capas y con pruebas del dominio. |
| **Respuesta** | El cambio se limita a un adaptador de infraestructura. |
| **Medida** | 0 archivos modificados en las capas de Dominio y Aplicación; pruebas existentes aprobadas. |
| **Verificación** | Revisar el cambio de código y ejecutar las pruebas (incluida la prueba de dependencias de `tecnologia/`). |
| **Estado** | Pendiente de implementar el servicio de Publicaciones. |

## EQ-06. Observabilidad: diagnóstico de una alerta fallida

| Elemento | Descripción |
|---|---|
| **Atributo de calidad** | Observabilidad (AC06) |
| **Fuente** | Equipo de desarrollo |
| **Estímulo** | Un usuario informa que no recibió una alerta que debía recibir. |
| **Artefacto** | Servicios de Alertas y Notificaciones y sus registros. |
| **Entorno** | Operación normal con registros estructurados. |
| **Respuesta** | Se identifica en qué paso falló la propagación del reporte. |
| **Medida** | **Propuesta por validar:** localizar el reporte y el paso fallido en 5 minutos o menos. |
| **Verificación** | Simular un fallo de envío y buscar el identificador del reporte en los registros. |
| **Estado** | Pendiente de definir el formato de los registros y el identificador de correlación. |

## Resumen de escenarios

| Código | Atributo de calidad | Qué se busca comprobar |
|---|---|---|
| EQ-01 | Rendimiento | Que el feed responda dentro del tiempo establecido con 1000 usuarios. |
| EQ-02 | Disponibilidad | Que una alerta masiva no degrade al resto de la plataforma. |
| EQ-03 | Escalabilidad | Que se escale solo el servicio saturado. |
| EQ-04 | Seguridad | Que nada protegido se ejecute sin JWT válido. |
| EQ-05 | Mantenibilidad | Que cambiar un proveedor solo afecte un adaptador. |
| EQ-06 | Observabilidad | Que una alerta fallida pueda diagnosticarse con rapidez. |
