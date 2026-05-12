# Checklist Técnico de Arranque

Este checklist sirve como guía para asegurar que la base técnica del proyecto
esté correctamente configurada antes de avanzar en el desarrollo funcional.

Está alineado a una arquitectura con **backend único en Quarkus**, autenticación
mediante **JWT**, soporte para **usuarios locales y Microsoft**, y **MySQL** como
base de datos principal.

---

## Infraestructura y entorno

- [ ] Repositorio Git creado y accesible
- [ ] Rama principal definida (main/master)
- [ ] Docker instalado y funcionando
- [ ] Docker Compose configurado
- [ ] Entornos definidos: DEV / QA / PROD
- [ ] Variables de entorno separadas por ambiente

---

## Backend (Quarkus)

- [ ] Proyecto Quarkus inicializado
- [ ] Dependencias REST configuradas (RESTEasy / RESTEasy Reactive)
- [ ] Conexión correcta a MySQL
- [ ] Configuración de datasource por entorno
- [ ] Migraciones de base de datos configuradas (Flyway o Liquibase)
- [ ] Modelos de dominio definidos
- [ ] Repositorios de acceso a datos implementados

---

## Autenticación y seguridad

- [ ] Autenticación de usuarios locales implementada
- [ ] Hash seguro de contraseñas configurado
- [ ] Integración con Microsoft Entra ID (OAuth 2.0 / OpenID Connect)
- [ ] Validación de tokens Microsoft en backend
- [ ] Generación de JWT propios del sistema
- [ ] Validación de JWT en todos los endpoints protegidos
- [ ] Manejo de expiración y renovación de tokens

---

## Roles y control de acceso

- [ ] Definición de roles base (Usuario Operativo, Administrador Funcional, Administrador Sistema)
- [ ] Inclusión de roles en el JWT
- [ ] Restricción de endpoints por rol
- [ ] Validación de ownership (usuario solo accede a su información)

---

## Auditoría y trazabilidad

- [ ] Tabla `audit_logs` creada
- [ ] Servicio de auditoría implementado en Quarkus
- [ ] Registro de login (local y Microsoft)
- [ ] Registro de creación de solicitudes
- [ ] Registro de cambios de estado
- [ ] Registro de errores relevantes
- [ ] Auditoría obligatoria en operaciones críticas

---

## Base de datos

- [ ] MySQL configurado como base principal
- [ ] Índices definidos para tablas críticas
- [ ] Relaciones correctamente modeladas
- [ ] Integridad referencial validada
- [ ] SQLite configurado solo para testing (opcional)

---

## Frontend (Web / Mobile)

- [ ] Proyecto React inicializado
- [ ] Proyecto React Native inicializado
- [ ] Tailwind CSS configurado
- [ ] Manejo de JWT en cliente
- [ ] Envío de JWT en headers de cada request
- [ ] Manejo de errores de autenticación (401 / 403)

---

## Calidad y control

- [ ] Pruebas básicas de endpoints críticos
- [ ] Manejo centralizado de errores
- [ ] Logs técnicos configurados
- [ ] Código versionado y documentado
- [ ] Documentación técnica actualizada

---

## Antes de avanzar de fase

- [ ] Flujo principal funciona de punta a punta
- [ ] Auditoría activa y verificable
- [ ] Roles correctamente aplicados
- [ ] No hay accesos directos a la base de datos
- [ ] Documentación alineada con la implementación
