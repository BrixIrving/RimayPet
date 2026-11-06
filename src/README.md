# Estructura objetivo del sistema

El código de la aplicación objetivo seguirá esta estructura. El corte vertical ejecutable disponible en `tecnologia/boilerplate-clean-architecture` sirve como ejemplo de Clean Architecture para Alertas.

```text
src/
├── modules/
│   ├── identidad/
│   ├── perfiles/
│   ├── publicaciones/
│   ├── mensajeria/
│   ├── alertas/
│   └── notificaciones/
├── shared/
│   ├── auth/
│   ├── config/
│   ├── database/
│   ├── events/
│   ├── http/
│   ├── observability/
│   └── errors/
├── composition/
├── main-api.ts
└── main-worker.ts
```

Cada módulo debe tener `domain/`, `application/`, `presentation/`, `infrastructure/` y `index.ts`. No se deben importar archivos internos de otro módulo.
