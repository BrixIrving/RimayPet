# ADR-005: Seguridad transversal

- **Estado:** Aceptada
- **Decisión:** Caddy termina HTTPS; API valida JWT RS256, expiración y rol; refresh token rotado; contraseñas con Argon2id; autorización por propiedad en cada recurso; CORS restringido, validación de entrada, rate limit y auditoría.
- **Alternativas:** sesión de servidor compartida; autorización distribuida en cada módulo sin política común.
- **Consecuencias:** seguridad uniforme; requiere gestión/rotación de claves y secretos fuera del repositorio.
- **Verificación:** pruebas 401/403, acceso horizontal/vertical, escaneo de dependencias y revisión de secretos.
