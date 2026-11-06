# Enfoque arquitectónico: Clean Architecture

Clean Architecture se aplica dentro de cada módulo del monolito. La regla de dependencia es hacia el centro: Presentación e Infraestructura dependen de Aplicación/Dominio; Dominio permanece independiente.

| Capa | Responsabilidad | Puede conocer |
|---|---|---|
| **Dominio** | Entidades, objetos de valor, invariantes y reglas de negocio puras. | Solo el propio dominio y lenguaje del proyecto. |
| **Aplicación** | Casos de uso, coordinación, puertos de entrada/salida y DTO. | Dominio y contratos/puertos. |
| **Presentación** | Controladores REST, handlers WebSocket, validación de entrada y serialización. | Casos de uso y DTO públicos. |
| **Infraestructura** | Repositorios SQL, adaptadores Outbox, R2, Web Push, JWT y framework. | Puertos que implementa y librerías concretas. |

## Dirección de dependencias

- Presentación → Aplicación.
- Aplicación → Dominio y puertos.
- Infraestructura → puertos de Aplicación; implementa adaptadores.
- Dominio → ninguna capa externa.
- La composición (`composition/`) conecta implementaciones concretas con casos de uso.

## Estructura repetida por módulo

```text
modules/<modulo>/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   └── services/
├── application/
│   ├── use-cases/
│   ├── ports/
│   └── dto/
├── presentation/
│   ├── http/
│   └── websocket/       # solo si aplica
├── infrastructure/
│   ├── persistence/
│   └── adapters/
└── index.ts             # fachada pública
```

La profundidad de cada capa se ajusta a la complejidad real. No se crean clases o interfaces vacías por cumplir una plantilla.
