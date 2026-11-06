# Escenarios de atributos de calidad

Las métricas son objetivos de aceptación propuestos. Deben confirmarse con pruebas y mediciones del corte vertical; no son resultados ya obtenidos.

| ID | Atributo | Estímulo y entorno | Respuesta esperada | Medida / verificación |
|---|---|---|---|---|
| EQ-01 | Escalabilidad y rendimiento | 1000 sesiones concurrentes, una acción cada 10 s; operación normal. | API procesa feed y operaciones comunes sin saturación. | p95 ≤ 2 s, errores < 1 %, CPU API < 80 % como objetivo. k6 + docker stats. |
| EQ-02 | Escalabilidad | La carga sube de 200 a 1000 sesiones y la API supera umbral sostenido. | Se activa una segunda instancia del mismo artefacto detrás de Caddy, si el servidor de datos tiene CPU disponible. | Activación/configuración ≤ 15 min, sin cambio de código ni interrupción perceptible. Prueba k6. |
| EQ-03 | Disponibilidad | El proceso worker se detiene mientras hay eventos pendientes. | La API sigue atendiendo; el worker reinicia y procesa Outbox pendiente. | Recuperación del worker ≤ 60 s; ningún evento confirmado se pierde. `docker kill` + consulta Outbox. |
| EQ-04 | Disponibilidad | Web Push o R2 no responde. | La operación principal termina; el efecto externo se reintenta o queda en estado fallido. | API no espera al proveedor; hasta 5 intentos con backoff; dead-letter y registro. |
| EQ-05 | Seguridad | Petición REST o WebSocket sin token, token vencido o firma inválida. | Acceso protegido rechazado. | 100 % de intentos de prueba rechazados; 401/403 según el caso. Postman/Newman. |
| EQ-06 | Seguridad | Usuario intenta consultar o modificar recurso ajeno. | Se deniega acceso y no se filtra información. | Cero accesos indebidos en la batería automatizada. |
| EQ-07 | Desplegabilidad | Se integra un cambio aprobado en main. | Pipeline construye, prueba y despliega el artefacto reproducible. | Despliegue ≤ 10 min como objetivo; pipeline verde y health checks aprobados. |
| EQ-08 | Desplegabilidad | Prueba de humo posterior al despliegue falla. | Se restaura la etiqueta anterior y se verifica salud. | Rollback ≤ 5 min como objetivo; evidencia de versión activa. |
| EQ-09 | Mantenibilidad | Se cambia el proveedor de almacenamiento de medios. | Solo se modifica el adaptador de infraestructura. | Cero cambios en Dominio y Aplicación; pruebas de casos de uso aprobadas. |
| EQ-10 | Observabilidad | Se reporta que una alerta no llegó a un destinatario. | Se sigue el flujo desde reporte, evento Outbox, intento de envío y resultado. | Diagnóstico ≤ 5 min con `correlationId` y `eventId`. |

## Perfil de carga de referencia

| Perfil | Usuarios virtuales | Actividad | RPS aproximadas |
|---|---:|---|---:|
| Ligero | 1000 | Una acción cada 30 s | 33 |
| Normal de diseño | 1000 | Una acción cada 10 s | 100 |
| Intenso | 1000 | Una acción cada 5 s | 200 |

Para pruebas de pico se recomienda multiplicar temporalmente la tasa por 3. El supuesto de 3 ms de CPU por solicitud usado en el dimensionamiento es una hipótesis inicial que debe sustituirse por mediciones reales. La meta prioritaria es el perfil normal sostenido durante al menos 5 minutos.
