# Definición del MVP (Producto Mínimo Viable)

## Objetivo del MVP

El MVP tiene como objetivo entregar un sistema **totalmente operativo en producción**
que permita ejecutar el flujo principal del negocio de principio a fin, con seguridad,
trazabilidad y control.

El MVP **NO es un prototipo**, es una primera versión estable del sistema.

---

## Flujo cubierto por el MVP

El MVP cubre el siguiente flujo completo:

1. Autenticación del usuario mediante Microsoft Entra ID.
2. Creación de solicitudes de insectos benéficos por parte del usuario.
3. Visualización del historial de solicitudes del usuario.
4. Aprobación o rechazo de solicitudes por el administrador funcional.
5. Descuento automático de inventario al aprobar una solicitud.
6. Cambio de estados de la solicitud.
7. Confirmación de recepción por parte del usuario.
8. Registro de auditoría de todas las acciones críticas.

---

## Funcionalidades incluidas

### Autenticación y seguridad
- Login corporativo exclusivo con Microsoft Entra ID.
- Sin contraseñas locales.
- Asignación de roles al ingresar al sistema.

---

### Gestión de solicitudes
- Crear nuevas solicitudes de insectos.
- Consultar historial de solicitudes propias.
- Estados de solicitud:
  - PENDIENTE
  - APROBADO
  - ENTREGADO
  - RECIBIDO

---

### Gestión de inventario
- Visualización de stock disponible.
- Descuento automático de stock al aprobar solicitudes.
- Registro de movimientos de inventario.

---

### Panel de administración
- Visualización de todas las solicitudes.
- Aprobación o rechazo de solicitudes.
- Actualización de estados.
- Visualización de inventario básico.

---

### Auditoría y trazabilidad
- Registro obligatorio de acciones críticas:
  - Login
  - Creación de solicitud
  - Aprobación / rechazo
  - Cambios de estado
  - Confirmación de recepción
- Almacenamiento de auditoría en la tabla `audit_logs`.

---

## Funcionalidades excluidas del MVP

Las siguientes funcionalidades **NO forman parte del MVP** y se implementarán
en fases posteriores:

- Programación semanal avanzada.
- Evaluación de nematodos.
- Reportes avanzados.
- Exportación a Excel.
- Integraciones con ERP u otros sistemas.
- Gestión avanzada de roles.

---

## Criterios de aceptación del MVP

El MVP se considera completo cuando:

- El flujo principal funciona de principio a fin sin intervención manual.
- Todas las acciones críticas quedan auditadas.
- Los roles están correctamente aplicados.
- No existen accesos directos a la base de datos.
- El sistema puede operar en un entorno productivo controlado.

---

## Consideraciones de evolución

El MVP está diseñado para evolucionar sin romper la arquitectura.
Cualquier ampliación deberá respetar las decisiones técnicas establecidas.
