# Roadmap por Fases (Ruta A)

## Enfoque general

El proyecto se desarrolla por fases con el objetivo de:
- Reducir riesgos técnicos
- Asegurar estabilidad
- Evitar retrabajos
- Permitir crecimiento progresivo

Cada fase construye sobre la anterior y **no rompe la arquitectura base**.

---

## Fase 0 – Fundamentos (Base del sistema)

### Objetivo
Establecer una base técnica sólida y segura antes de desarrollar funcionalidades visibles.

### Qué se construye
- Repositorio Git y control de versiones
- Infraestructura con Docker
- API base en Quarkus
- Conexión a MySQL
- Autenticación con Microsoft Entra ID
- Gestión inicial de usuarios, roles y permisos
- Auditoría base (`audit_logs`)

### Por qué es crítica
Sin esta fase:
- la seguridad se improvisa,
- la auditoría se agrega tarde,
- el sistema se vuelve frágil.

Esta fase **no se ve**, pero **sostiene todo el proyecto**.

---

## Fase 1 – MVP (Operación mínima completa)

### Objetivo
Permitir operar el proceso principal de negocio de punta a punta.

### Qué se construye
- Creación de solicitudes de insectos
- Gestión de estados (Pendiente, Aprobado, Entregado, Recibido)
- Panel administrador funcional
- Control de inventario
- Confirmación de recepción
- Auditoría completa de acciones críticas

### Resultado
El sistema ya puede usarse en producción de forma controlada.

---

## Fase 2 – Operación avanzada

### Objetivo
Optimizar la operación y agregar reglas de negocio más complejas.

### Qué se construye
- Programación semanal
- Ventanas de tiempo (30h / 48h)
- Evaluación de nematodos
- Alertas automáticas
- Validaciones avanzadas

### Resultado
El sistema pasa de “funciona” a “funciona bien”.

---

## Fase 3 – Gestión y escalabilidad

### Objetivo
Convertir el sistema en una herramienta de análisis y gestión.

### Qué se construye
- Reportes históricos
- Exportación a Excel
- Roles avanzados
- Preparación para integraciones futuras

### Resultado
El sistema soporta toma de decisiones y crecimiento organizacional.

---

## Gestión del cambio

El roadmap admite evolución, bajo estas reglas:
- Cambios documentados
- Cambios aprobados
- Arquitectura base intacta
- Auditoría siempre activa
