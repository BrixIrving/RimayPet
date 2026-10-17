# Boilerplate Clean Architecture · Servicio de Alertas de RimayPet

**Parte 1: dominio y aplicación.** Muestra las dos capas internas del servicio de Alertas, sin dependencias externas (solo Node.js 18 o superior).

```bash
npm test   # pruebas del dominio y de la regla de dependencia
```

```text
src/alertas/
├── domain/        # entidades, objetos de valor y errores (no importa nada)
└── application/   # casos de uso y puertos
```

La infraestructura, la presentación y la composición se agregan en la siguiente etapa.
