# Historias de usuario

Formato: **Como** [actor], **quiero** [acción], **para** [beneficio]. Las prioridades siguen MoSCoW: **Debe** (MVP), **Debería** (versión 1.1) y **Podría** (versión 1.2).

| ID | Épica / módulo | Historia de usuario | Criterios de aceptación principales | Prioridad |
|---|---|---|---|---|
| HU01 | Cuenta y perfiles / Perfiles | Como dueño, quiero crear el perfil de mi mascota, para presentarla a la comunidad. | Se guarda nombre, especie, raza opcional y foto; el propietario queda asociado; se valida que el usuario autenticado sea el dueño. | Debe |
| HU02 | Comunidad / Publicaciones | Como dueño, quiero publicar fotos o videos de mi mascota, para compartir sus actividades. | Se valida tipo y tamaño; se guarda la referencia del medio; la publicación aparece en el feed según visibilidad. | Debe |
| HU03 | Mensajería / Mensajería | Como usuario, quiero enviar mensajes directos a otro usuario, para coordinar asuntos relacionados con mascotas. | Solo participantes autorizados acceden a la conversación; el mensaje persistido se entrega en tiempo real si el destinatario está conectado. | Debe |
| HU04 | Mascotas perdidas / Alertas | Como dueño, quiero reportar a mi mascota como perdida con su última ubicación, para recibir ayuda cercana. | Se valida propiedad, ubicación y radio; el reporte se crea con estado PERDIDA; se devuelve identificador y enlace/estado inicial sin esperar los envíos push. | Debe |
| HU05 | Notificaciones / Notificaciones | Como usuario, quiero recibir alertas de mascotas perdidas dentro de mi radio, para poder ayudar. | Se seleccionan destinatarios elegibles dentro del radio; se respeta consentimiento y preferencias; el envío se procesa fuera de la petición HTTP. | Debe |
| HU06 | Privacidad / Perfiles | Como dueño, quiero configurar quién ve mi perfil y mis mascotas, para proteger mi privacidad. | Se ofrecen niveles público, seguidores y privado; cada consulta aplica la política de visibilidad. | Debería |
| HU07 | Cuenta y perfiles / Identidad | Como visitante, quiero registrarme e iniciar sesión, para utilizar las funciones protegidas. | Correo único; contraseña almacenada con hash seguro; token de acceso y renovación emitidos; errores no revelan si una cuenta existe. | Debe |
| HU08 | Confianza / Perfiles | Como dueño, quiero verificar mi mascota mediante un carnet de vacunación, para aumentar la confianza de la comunidad. | Se carga un archivo permitido; se registra estado PENDIENTE/VERIFICADO/OBSERVADO; la revisión queda asociada al perfil. | Debería |
| HU09 | Comunidad / Publicaciones | Como usuario, quiero reaccionar a una publicación, para expresar apoyo o interés. | Una reacción por usuario y publicación; puede cambiarse o retirarse; se actualiza el contador sin duplicados. | Debería |
| HU10 | Comunidad / Publicaciones | Como dueño, quiero seguir a otros dueños o mascotas, para mantenerme al tanto de sus publicaciones. | Se crea o elimina la relación de seguimiento; no se permiten duplicados ni seguirse a sí mismo. | Debe |
| HU11 | Comunidad / Publicaciones | Como usuario, quiero consultar un feed cronológico de las cuentas que sigo, para ver sus novedades. | El feed pagina por cursor; respeta privacidad; orden estable por fecha e identificador. | Debe |
| HU12 | Comunidad / Publicaciones | Como usuario, quiero comentar publicaciones, para conversar con otros dueños. | El comentario se asocia al autor y publicación; puede ocultarse según moderación; se valida longitud y contenido vacío. | Debería |
| HU13 | Comunidad / Publicaciones | Como usuario, quiero consultar mi historial de publicaciones e interacciones, para recuperar mi actividad. | Se muestran solo elementos propios o autorizados; se pagina y ordena del más reciente al más antiguo. | Debería |
| HU14 | Notificaciones / Notificaciones | Como usuario, quiero recibir avisos de nuevas interacciones y actividad de cuentas que sigo, para no perder novedades. | Se genera una notificación interna; push es opcional según suscripción y preferencias; el fallo push no bloquea la operación principal. | Debería |
| HU15 | Mascotas perdidas / Perfiles | Como dueño, quiero registrar mi ubicación aproximada y un radio de alerta, para recibir avisos relevantes. | Se solicita consentimiento; se limita el radio a valores configurados por el producto; se almacena ubicación aproximada y fecha de actualización. | Debe |
| HU16 | Mascotas perdidas / Alertas | Como usuario, quiero registrar el avistamiento de una mascota reportada, para aportar información al dueño. | El avistamiento guarda hora, ubicación y descripción; se vincula al reporte; se notifica al dueño de forma asíncrona. | Debe |
| HU17 | Mascotas perdidas / Alertas | Como dueño, quiero actualizar el estado de mi reporte, para informar si mi mascota fue vista o encontrada. | Solo el propietario o rol autorizado puede cambiarlo; se valida la transición; se registra fecha y autor. | Debe |
| HU18 | Mascotas perdidas / Alertas | Como visitante, quiero consultar el estado público de una mascota perdida mediante un enlace, para ayudar aunque no tenga cuenta. | El enlace usa un identificador no predecible; solo expone datos autorizados; permite ver estado y datos de contacto que el dueño decidió publicar. | Debería |
| HU19 | Descubrimiento / Publicaciones | Como usuario, quiero buscar perfiles y publicaciones por texto, para encontrar mascotas o contenido de interés. | Se normaliza la búsqueda; se respeta privacidad; se pagina y limita el volumen de resultados. | Podría |
| HU20 | Descubrimiento / Perfiles | Como usuario, quiero recibir sugerencias de cuentas o mascotas, para ampliar mi comunidad. | Las sugerencias consideran señales configuradas (por ejemplo, cercanía o intereses); excluyen bloqueados y perfiles no visibles. | Podría |
| HU21 | Comunidad / Publicaciones | Como usuario, quiero crear o participar en grupos temáticos, para compartir información con personas de intereses comunes. | Se define nombre, descripción y reglas; el creador administra miembros; el contenido respeta la privacidad del grupo. | Podría |
| HU22 | Moderación / Perfiles | Como usuario, quiero reportar contenido o una cuenta, para alertar sobre posibles incumplimientos. | Se registra motivo, elemento reportado y autor; se evita reportar repetidamente el mismo elemento sin control. | Debería |
| HU23 | Moderación / Perfiles | Como moderador, quiero revisar reportes y tomar acciones, para mantener una comunidad segura. | Puede descartar, ocultar contenido o solicitar suspensión; toda acción registra actor, motivo y fecha. | Debería |
| HU24 | Administración / Perfiles | Como administrador, quiero consultar indicadores de usuarios, publicaciones y alertas resueltas, para evaluar la actividad de la plataforma. | Los indicadores se calculan con filtros de fecha; solo roles autorizados acceden; se muestra la fecha de actualización. | Podría |
| HU25 | Auditoría / Perfiles | Como administrador, quiero consultar la bitácora de acciones sensibles, para rastrear cambios y responsabilidades. | Registra actor, acción, recurso, fecha y correlación; no permite edición desde la interfaz normal; acceso restringido. | Debería |

## Resumen MoSCoW

| Prioridad | Cantidad | Historias |
|---|---:|---|
| Debe (MVP 1.0) | 11 | HU01–HU05, HU07, HU10, HU11, HU15–HU17 |
| Debería (1.1) | 10 | HU06, HU08, HU09, HU12–HU14, HU18, HU22, HU23, HU25 |
| Podría (1.2) | 4 | HU19–HU21, HU24 |
| **Total** | **25** | |

## Definition of Ready (DoR)

Una historia entra al sprint cuando tiene actor, valor, prioridad, criterios verificables, reglas de negocio identificadas, dependencias conocidas y tamaño estimado.

## Definition of Done (DoD)

Una historia se considera terminada cuando cumple todos sus criterios, tiene pruebas automatizadas, revisión de seguridad aplicable, documentación actualizada, no rompe reglas de arquitectura y está integrada en la rama principal.
