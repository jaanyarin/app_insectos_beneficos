# 🦟 Sistema de Gestión de Insectos Benéficos

Bienvenido al repositorio central del **Sistema de Gestión de Insectos Benéficos y Evaluación de Nematodos**. Esta plataforma empresarial está diseñada para digitalizar y asegurar los procesos de solicitud, programación y entrega de insectos benéficos, optimizada para dispositivos móviles.

---

## 📑 Índice del Proyecto (Navegación)

Para facilitar la exploración del proyecto, utiliza este índice para acceder a los diferentes módulos y documentación:

### 🛠️ Módulos de Software
*   [**`backend/`**](./backend/): API REST desarrollada con **Quarkus**. Contiene la lógica de negocio, autenticación (JWT/Microsoft) y acceso a datos.
*   [**`frontend/`**](./frontend/): Aplicaciones web y móviles (React y React Native) para la interacción con el usuario.
*   [**`mobile/`**](./mobile/): Código base específico de la aplicación móvil nativa.
*   [**`docker-compose.yml`**](./docker-compose.yml): Configuración para el despliegue rápido del entorno de desarrollo y base de datos.

### 📚 Documentación Oficial
*   [**`project_documentacion/`**](./project_documentacion/): Directorio central de documentación del proyecto.
    *   [Visión General y Objetivos](./project_documentacion/README.md)
    *   [Guía de Instalación (SETUP)](./project_documentacion/SETUP.md)
    *   [Arquitectura del Sistema](./project_documentacion/arquitectura.md)
    *   [Roadmap y Fases](./project_documentacion/roadmap_fases.md)
*   [**`docs/api/`**](./docs/api/): Especificaciones de la API (OpenAPI/Swagger).

---

## 🚀 Tecnologías Principales

| Componente | Tecnología |
| :--- | :--- |
| **Backend** | Quarkus (Java) |
| **Mobile** | React Native + Expo |
| **Web** | React + Tailwind CSS |
| **Base de Datos** | MySQL |
| **Seguridad** | JWT + Microsoft Entra ID |
| **Infraestructura** | Docker |

---

## 🛠️ Cómo Empezar

Si eres nuevo en el proyecto, te recomendamos seguir estos pasos:

1.  Revisa la [**Arquitectura**](./project_documentacion/arquitectura.md) para entender cómo se comunican los componentes.
2.  Sigue la [**Guía de Setup**](./project_documentacion/SETUP.md) para configurar tu entorno local.
3.  Consulta el [**Cronograma**](./project_documentacion/cronograma.md) para ver el progreso actual de las fases.

---

## 🛡️ Seguridad y Trazabilidad

Este sistema implementa un esquema de **Auditoría Transversal**. Todas las acciones críticas son registradas en la tabla `audit_logs` para asegurar la trazabilidad completa, un pilar fundamental de esta plataforma empresarial.

---

<sub>© 2026 - Proyecto de Gestión de Insectos Benéficos</sub>
