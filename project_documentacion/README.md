# Proyecto de Gestión de Insectos Benéficos y Evaluación de Nematodos

## Visión general

Este proyecto tiene como objetivo digitalizar, centralizar y asegurar los procesos
relacionados con la solicitud, programación, entrega y control de insectos benéficos,
así como la evaluación de nematodos, mediante una plataforma empresarial web y móvil.

El sistema está diseñado principalmente para su uso desde dispositivos móviles,
priorizando rapidez de acceso, simplicidad operativa y seguridad, sin perder
trazabilidad ni control.

---

## Objetivos del sistema

- Centralizar la información operativa en una única plataforma.
- Permitir el uso desde dispositivos móviles de forma rápida y segura.
- Asegurar trazabilidad completa de todas las acciones.
- Reducir errores manuales y reprocesos.
- Facilitar la toma de decisiones mediante información confiable.
- Garantizar control de accesos y seguridad corporativa.
- Permitir crecimiento funcional futuro sin rediseños mayores.

---

## Principios de diseño

El sistema se construye bajo los siguientes principios:

- **Backend único y liviano**  
  Un único backend implementado en Quarkus, optimizado para alto rendimiento y baja latencia.

- **Autenticación híbrida estandarizada**  
  Soporte para usuarios locales y usuarios Microsoft, unificados mediante JWT.

- **Arquitectura en capas**  
  Separación clara entre presentación, negocio y datos.

- **Auditoría y trazabilidad**  
  Registro obligatorio de todas las acciones críticas del sistema.

- **Escalabilidad y mantenibilidad**  
  Diseño modular y extensible.

- **Evolución controlada**  
  Cambios futuros documentados y aprobados.

---

## Stack tecnológico

- **Backend**: Quarkus (API REST)
- **Frontend Web**: React + Tailwind CSS
- **Frontend Mobile**: React Native
- **Autenticación**:
  - Usuarios locales (credenciales propias)
  - Usuarios corporativos Microsoft (Entra ID)
  - JWT como mecanismo único de sesión
- **Base de datos principal**: MySQL
- **Base de datos para desarrollo/testing**: SQLite (opcional)
- **Infraestructura**: Docker + CI/CD
- **Auditoría**: Tabla central `audit_logs`

---

## Arquitectura general (resumen)

El sistema se organiza en una arquitectura en tres capas, con un único backend
implementado en Quarkus.

1. **Capa de Presentación**
   - Aplicación Web (React)
   - Aplicación Mobile (React Native)

2. **Capa de Negocio**
   - API REST en Quarkus
   - Autenticación local y Microsoft
   - Emisión y validación de JWT
   - Reglas de negocio
   - Gestión de roles y permisos
   - Auditoría transversal

3. **Capa de Datos**
   - MySQL como base de datos principal
   - Persistencia de datos
   - Historial y auditoría

---

## Enfoque por fases

El desarrollo se divide en fases para reducir riesgos y asegurar estabilidad.

### Fase 0 – Fundamentos
Base técnica del sistema:
- Infraestructura
- Autenticación
- Seguridad
- Auditoría

### Fase 1 – MVP
Operación mínima completa:
- Solicitudes
- Aprobaciones
- Inventario
- Confirmaciones
- Auditoría

### Fase 2 – Operación avanzada
- Programación semanal
- Ventanas de tiempo
- Evaluaciones de nematodos
- Alertas automáticas

### Fase 3 – Gestión y escalabilidad
- Reportes
- Exportaciones
- Roles avanzados
- Integraciones futuras

---

## Gestión del cambio

El sistema está diseñado para evolucionar.
Cualquier modificación debe:

- Estar documentada
- Tener justificación técnica o funcional
- Ser aprobada
- No romper la arquitectura base
- Mantener la trazabilidad y seguridad

---

## Uso de esta documentación

Esta carpeta constituye la **base documental oficial del proyecto**.
Debe usarse como referencia para:

- Desarrollo
- Validaciones técnicas
- Auditorías
- Incorporación de nuevos colaboradores
- Control de cambios

---

## Documentos principales

- [Guía de Setup y Onboarding](SETUP.md)
- [Decisión técnica Mobile (React Native)](MOBILE_STACK_DECISION.md)
- [Guías adicionales (env, testing, CI/CD)](guias_adicionales.md)
