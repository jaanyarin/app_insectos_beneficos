# Guías Prácticas de Desarrollo

Este documento sirve como guía práctica para iniciar y mantener el desarrollo
del proyecto de forma ordenada, segura y sostenible.

Está pensado para un desarrollador único trabajando en un proyecto empresarial
con backend implementado en **Quarkus**, autenticación mediante **JWT** y
persistencia en **MySQL**.

---

## Guía 1 – Mentalidad correcta para este proyecto

Este proyecto:
- No es pequeño
- No se termina rápido
- No debe improvisarse

El uso principal será desde dispositivos móviles, por lo que la estabilidad,
rapidez y seguridad son prioritarias frente a la complejidad innecesaria.

Avanzar lento pero firme es mejor que avanzar rápido y romper la base.

---

## Guía 2 – Antes de escribir una sola línea de código

Antes de programar, asegúrate de haber leído y entendido:

- `README.md`
- `arquitectura.md`
- `mvp.md`
- `roadmap_fases.md`
- `cronograma.md`
- `decisiones_arquitectura.md`

Si algo no está claro en la documentación, **acláralo antes de programar**.

---

## Guía 3 – Orden recomendado de desarrollo (Fase 0)

Sigue estrictamente este orden:

1. Crear repositorio Git
2. Configurar Docker y Docker Compose
3. Inicializar proyecto Quarkus
4. Configurar conexión a MySQL
5. Configurar migraciones (Flyway o Liquibase)
6. Implementar autenticación de usuarios locales
7. Integrar Microsoft Entra ID
8. Implementar emisión y validación de JWT
9. Configurar roles y permisos
10. Crear servicio de auditoría (`audit_logs`)
11. Probar login + JWT + auditoría

Si el login o el JWT no funcionan bien, **no avances**.

---

## Guía 4 – Desarrollo del MVP (Fase 1)

### Backend primero (Quarkus)

Desarrolla primero:
- Migraciones y modelo de datos
- Entidades de dominio
- Reglas de negocio
- Estados de los procesos
- Auditoría obligatoria

Luego:
- Endpoints REST
- Validaciones
- Seguridad por rol

### Frontend después

Cuando el backend esté estable:
- Login (local y Microsoft)
- Creación de solicitudes
- Historial
- Panel administrador básico

No desarrolles pantallas sin endpoints funcionales.

---

## Guía 5 – JWT como contrato del sistema

El JWT es el contrato entre cliente y backend.

Toda petición al backend debe:
- Incluir JWT válido
- Ser validada en Quarkus
- Respetar roles y permisos

Si una operación no está protegida por JWT:
👉 es un error de diseño.

---

## Guía 6 – Auditoría como regla, no como excepción

Toda acción crítica debe:
- Pasar por el backend
- Generar un registro en `audit_logs`
- Indicar quién, qué y cuándo

La auditoría no es opcional ni temporal.

---

## Guía 7 – Manejo de bloqueos y errores

Si te bloqueas:
- Divide el problema
- Revisa la documentación
- Documenta la decisión
- No improvises soluciones permanentes

Es mejor avanzar lento que rehacer semanas de trabajo.

---

## Guía 8 – Gestión de cambios

Cuando aparezca un nuevo requerimiento:

1. Verifica si entra en el MVP
2. Si no entra, documéntalo para una fase futura
3. Registra la decisión en `docs/decisiones_arquitectura.md`
4. No rompas arquitectura ni seguridad

---

## Guía 9 – Cierre de cada fase

Antes de cerrar una fase, verifica:

- Flujo principal funciona de punta a punta
- JWT y roles aplicados correctamente
- Auditoría activa
- Código limpio
- Documentación actualizada

No cierres fases “a medias”.

---

## Mensaje final

Este proyecto se construye con orden, no con prisa.

Si mantienes la documentación viva, el proyecto se mantendrá sano.
