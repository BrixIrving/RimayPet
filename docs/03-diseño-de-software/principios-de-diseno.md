# Principios SOLID y buenas prácticas

| Principio | Aplicación |
|---|---|
| SRP | Un caso de uso representa una intención; `ReportarMascotaPerdida` no realiza el envío push. |
| OCP | Un adaptador nuevo de almacenamiento implementa `AlmacenMedios` sin modificar reglas de publicación. |
| LSP | Los adaptadores de repositorio y push respetan el contrato definido por sus puertos. |
| ISP | Puertos pequeños y específicos: `RepositorioReportes`, `PublicadorEventos`, `AlmacenMedios`. |
| DIP | Aplicación depende de puertos; composición inyecta adaptadores concretos. |

## Buenas prácticas verificables

- TypeScript estricto, ESLint y formato automático.
- Validación de entrada y DTO inmutables.
- SQL parametrizado y migraciones versionadas por esquema.
- No compartir tablas ni entidades entre módulos.
- Secretos en variables de entorno y GitHub Secrets.
- Logs JSON con `correlationId`, `eventId` y usuario cuando corresponda.
- Pruebas unitarias de Dominio y Aplicación; integración con PostgreSQL real.
- Conventional Commits, ramas cortas y revisión de cambios.
- Dependencias auditadas y contenedores mínimos.
- Backups cifrados y simulacro periódico de restauración.
