# Cronograma de Desarrollo (Ruta B)

## Enfoque del cronograma

Este cronograma está construido considerando que el proyecto será desarrollado por
**una sola persona**, con experiencia limitada en proyectos enterprise, e incluye
tiempos de aprendizaje, correcciones y ajustes.

Los tiempos indicados son **realistas y conservadores**, no optimistas.

---

## Estimación general

| Fase | Duración estimada |
|----|------------------|
| Fase 0 – Fundamentos | 3 a 4 semanas |
| Fase 1 – MVP | 6 a 8 semanas |
| Fase 2 – Operación avanzada | 5 a 7 semanas |
| Fase 3 – Gestión y escalabilidad | 3 a 4 semanas |
| **Total estimado** | **17 a 23 semanas (4 a 6 meses)** |

---

## Detalle por fases

### Fase 0 – Fundamentos (3 a 4 semanas)

- Configuración de repositorio Git y flujo de trabajo.
- Configuración de Docker Compose.
- Instalación y configuración de Laravel.
- Configuración de PostgreSQL.
- Integración de Microsoft Entra ID (login).
- Definición de roles y permisos.
- Creación de la auditoría base (`audit_logs`).
- Corrección de errores iniciales y ajustes.

---

### Fase 1 – MVP (6 a 8 semanas)

- Desarrollo del módulo de solicitudes.
- Implementación de estados y validaciones.
- Desarrollo del módulo de inventario.
- Desarrollo del panel administrador básico.
- Integración frontend (React).
- Implementación completa de auditoría.
- Pruebas funcionales y correcciones.

---

### Fase 2 – Operación avanzada (5 a 7 semanas)

- Desarrollo de programación semanal.
- Implementación de ventanas de tiempo (30h / 48h).
- Desarrollo del módulo de evaluación de nematodos.
- Implementación de alertas automáticas.
- Pruebas funcionales y ajustes.

---

### Fase 3 – Gestión y escalabilidad (3 a 4 semanas)

- Desarrollo de reportes.
- Exportación de datos a Excel.
- Gestión avanzada de roles.
- Preparación de integraciones futuras.
- Ajustes finales y estabilización.

---

## Consideraciones importantes

- Los tiempos incluyen curva de aprendizaje.
- Los tiempos incluyen correcciones y refactor menores.
- Cualquier cambio de alcance debe documentarse.
- El cronograma puede ajustarse sin romper la arquitectura.

Este cronograma debe usarse como **referencia**, no como presión.
