# Registro de Decisiones de Arquitectura

Este documento registra las principales decisiones de arquitectura del proyecto,
con el objetivo de mantener trazabilidad técnica y justificar cambios relevantes
a lo largo del tiempo.

---

## Decisión 001 – Backend único en Quarkus

### Estado
✅ Aprobada

### Decisión
El backend del sistema será implementado exclusivamente en **Quarkus**, reemplazando
cualquier otro framework backend previamente considerado.

### Motivo
- Alto rendimiento y baja latencia, ideal para uso intensivo desde aplicaciones móviles.
- Excelente soporte para APIs REST.
- Soporte nativo y robusto para seguridad, JWT y OAuth2.
- Menor consumo de recursos y tiempos de arranque reducidos.
- Mejor alineación con una arquitectura limpia y moderna.

### Impacto
- Un solo backend responsable de autenticación y lógica de negocio.
- Simplificación de la arquitectura.
- Eliminación de duplicidad de responsabilidades.

---

## Decisión 002 – Autenticación híbrida (usuarios locales + Microsoft)

### Estado
✅ Aprobada

### Decisión
El sistema soportará dos tipos de usuarios:
- Usuarios locales (credenciales propias).
- Usuarios corporativos autenticados mediante Microsoft Entra ID.

Ambos tipos de usuario se unifican internamente mediante **JWT propios del sistema**.

### Motivo
- Permitir acceso a usuarios que no pertenecen al dominio corporativo.
- Mantener compatibilidad con usuarios corporativos existentes.
- Unificar el mecanismo de sesión para simplificar frontend y backend.

### Impacto
- El frontend no distingue el tipo de usuario.
- El backend solo confía en JWT emitidos por Quarkus.
- Simplificación del control de acceso y auditoría.

---

## Decisión 003 – Uso de JWT como mecanismo único de sesión

### Estado
✅ Aprobada

### Decisión
Todos los accesos al backend se realizarán mediante **JWT** emitidos por Quarkus.

### Motivo
- Arquitectura stateless.
- Mejor escalabilidad.
- Simplificación del manejo de sesiones en aplicaciones móviles.
- Integración nativa con Quarkus Security.

### Impacto
- El backend no mantiene estado de sesión.
- El cliente envía el JWT en cada request.
- Control de expiración y renovación de tokens.

---

## Decisión 004 – Base de datos MySQL como motor principal

### Estado
✅ Aprobada

### Decisión
Se utilizará **MySQL** como base de datos principal del sistema.

SQLite podrá utilizarse únicamente para pruebas locales o testing automatizado.

### Motivo
- Facilidad de uso e integración.
- Menor curva de aprendizaje.
- Rendimiento suficiente para el alcance del proyecto.
- Amplio soporte y estabilidad en producción.

### Impacto
- Migraciones y consultas diseñadas para MySQL.
- Simplificación del entorno de desarrollo.
- Reducción de complejidad innecesaria.

---

## Decisión 005 – Auditoría obligatoria y transversal

### Estado
✅ Aprobada

### Decisión
Toda acción crítica del sistema debe generar un registro de auditoría en la tabla
`audit_logs`.

### Motivo
- Necesidad de trazabilidad completa.
- Detección de errores operativos.
- Soporte a auditorías internas.
- Mejora continua del sistema.

### Impacto
- La auditoría no puede ser deshabilitada.
- Todas las operaciones críticas pasan por el backend.
- Mayor control y visibilidad del sistema.

---

## Decisión 006 – Docker Compose en raíz como única fuente de verdad

### Estado
✅ Aprobada

### Decisión
El archivo **`docker-compose.yml` en la raíz del proyecto** es la **única fuente de verdad** para la orquestación de servicios.

No se mantendrán archivos de docker-compose duplicados en subdirectorios (ej: `backend/docker/docker-compose.yml`).

### Motivo
- Evitar confusión sobre cuál archivo es definitivo.
- Permitir orquestación de múltiples servicios desde un lugar central.
- Simplificar el setup para nuevos desarrolladores.
- Facilitar CI/CD y despliegues.

### Impacto
- Un solo punto de entrada para levantar toda la infraestructura.
- Referencias desde documentación apuntan a archivo único.
- Backend, MySQL, y otros servicios se definen centralizadamente.

---

## Decisión 007 – React Native como framework móvil

### Estado
✅ Aprobada

### Decisión
El frontend móvil será desarrollado exclusivamente con **React Native** (con soporte a Expo para desarrollo rápido).

Se descarta Flutter y desarrollo nativo.

### Motivo
- Máxima reutilización de código JavaScript/TypeScript con frontend web.
- Un equipo unificado puede trabajar en web + mobile.
- Soporte robusto de la comunidad.
- Integración seamless con API REST y JWT.
- Viable para desarrollo inicial por una persona.

### Impacto
- Frontend web y mobile comparten lógica en `frontend/shared/`.
- Ambas aplicaciones usan JavaScript/TypeScript y npm.
- Testing y auditoría simplificados.
- Escalable a monorepo si crece el equipo.

**Ver también**: `MOBILE_STACK_DECISION.md`

---

## Decisión 008 – OpenAPI como contrato compartido de API

### Estado
✅ Aprobada

### Decisión
La especificación **`docs/api/openapi.yaml`** es la **única fuente de verdad** para el contrato entre Frontend y Backend.

Backend y Frontend implementan exactamente lo que define OpenAPI.

### Motivo
- Evitar desincronización entre lo que documentamos, lo que el backend implementa, y lo que el frontend espera.
- Permitir generación automática de clientes HTTP.
- Facilitar comunicación clara entre equipos.
- Soporta OpenAPI Linting y validación continua.

### Impacto
- Clientes TypeScript pueden generarse automáticamente desde spec.
- Cambios en endpoints requieren actualizar spec primero.
- OpenAPI es validada en CI/CD.
- Documentación interactiva con Swagger UI / Redoc.

**Ver también**: `docs/api/README.md`

---

## Decisión 009 – Flyway como única herramienta de migraciones de BD

### Estado
✅ Aprobada

### Decisión
**Flyway** es la única herramienta para migraciones de BD.

Todos los cambios de esquema se implementan en `backend/quarkus-app/src/main/resources/db/migration/` siguiendo la convención `V#__description.sql`.

No se permiten scripts `init.sql` duplicados ni migraciones manuales.

### Motivo
- Single source of truth para el esquema de BD.
- Integración nativa con Quarkus.
- Versionado automático de cambios.
- Previene divergencias entre ambientes.

### Impacto
- Migraciones deben seguir patrón Flyway: `V1__init.sql`, `V2__add_audits.sql`, etc.
- BD se actualiza automáticamente al iniciar backend.
- Testing de migraciones en CI/CD.
- Reversión de cambios requiere nueva migración "undo".

---

## Gestión de cambios futuros

Cualquier nueva decisión de arquitectura deberá:
- Registrarse en este documento.
- Incluir motivo e impacto.
- Ser aprobada antes de su implementación.

Este documento es parte fundamental de la documentación oficial del proyecto.
