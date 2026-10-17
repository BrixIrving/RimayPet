# Principios de diseño: SOLID

| Principio | Idea | Aplicación en RimayPet |
|---|---|---|
| **S** · Responsabilidad única | Una clase, una razón para cambiar. | Cada caso de uso hace una sola cosa: `ReportarMascotaPerdida` no envía notificaciones, solo crea, guarda y publica. |
| **O** · Abierto/Cerrado | Agregar sin modificar. | Para un nuevo proveedor de medios se crea otra implementación de `AlmacenMedios`, sin tocar `PublicarContenido`. |
| **L** · Sustitución de Liskov | Las implementaciones son intercambiables. | `PublicadorRedis` y `PublicadorEventosMemoria` cumplen el mismo contrato; los casos de uso funcionan con cualquiera. |
| **I** · Segregación de interfaces | Interfaces pequeñas. | `PublicadorEventos` solo publica; `RepositorioReportes` solo guarda y consulta reportes. No hay una interfaz “servicio de alertas” con todo. |
| **D** · Inversión de dependencias | Depender de contratos. | `ReportarMascotaPerdida` recibe `RepositorioReportes` y `PublicadorEventos` por constructor; la composición se hace en un solo archivo. |

## Cómo se verifica

La prueba de dependencias de `tecnologia/boilerplate-clean-architecture` revisa que `domain/` y `application/` no importen `infrastructure/` ni `presentation/`. Es la comprobación automática del escenario EQ-05.
