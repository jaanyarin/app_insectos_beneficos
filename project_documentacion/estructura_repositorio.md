# Estructura del Repositorio del Proyecto

Este documento describe la **estructura oficial del repositorio**
del proyecto **Aplicativo de Gestión de Insectos Benéficos y Evaluación de Nematodos**.

La estructura ha sido definida bajo criterios de **arquitectura empresarial**,
basada en **experiencia senior**, **buenas prácticas**, y en el contexto real del proyecto:

- Backend único en **Quarkus**
- Autenticación con **usuarios locales + Microsoft**
- **JWT** como mecanismo único de sesión
- **MySQL** como base de datos principal
- Uso intensivo desde **aplicaciones móviles**
- Desarrollo inicial por **una sola persona**
- Preparación para crecimiento futuro sin reestructuración

Este documento es **normativo** y debe respetarse durante todo el ciclo de vida del proyecto.

---

## Objetivos de esta estructura

La estructura del repositorio busca:

- Claridad y orden desde el primer día
- Separación clara de responsabilidades
- Facilidad de mantenimiento
- Escalabilidad técnica
- Evitar deuda técnica temprana
- Facilitar la incorporación futura de más desarrolladores
- Alinear código, arquitectura y documentación

---

## Principios de diseño aplicados

La estructura se rige por los siguientes principios:

- **Un solo backend** responsable de seguridad y negocio
- **Arquitectura orientada a dominios**, no a capas genéricas
- **JWT como contrato único** entre frontend y backend
- **Mobile-first**: bajo acoplamiento y respuestas rápidas (React Native para máxima reutilización)
- **Documentación como parte del proyecto**
- **Auditoría obligatoria**
- **Cambios siempre documentados**
- **Testing explícito desde el inicio** (no como afterthought)
- **CI/CD automatizado** para garantizar calidad
- **OpenAPI como contrato compartido** entre frontend y backend

---

## Estructura del repositorio

```text
app_insectos_beneficos/
│
├── .github/
│   └── workflows/                # CI/CD: backend, frontend, docs, migrations
│
├── backend/
│   ├── quarkus-app/
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/ (dominio: pe.empresa.insectos)
│   │   │   │   └── resources/
│   │   │   │       └── db/migration/ (Flyway migrations)
│   │   │   └── test/
│   │   │       └── java/
│   │   ├── pom.xml
│   │   └── README.md
│   │
│   └── docker/ (opcional, mantener en root/docker-compose.yml)
│
├── frontend/
│   ├── web/                       # React + TypeScript + Tailwind
│   │   ├── src/
│   │   └── public/
│   │
│   └── mobile/                    # React Native (Expo) + TypeScript
│       ├── src/
│       ├── android/
│       └── ios/
│
├── docs/                          # Documentación de API y herramientas
│   └── api/
│       └── openapi.yaml           # OpenAPI 3.0.3 - contrato fuente
│
├── project_documentacion/         # Documentación de proyecto (onboarding, decisiones)
│   ├── SETUP.md                    # Guía de instalación y puesta en marcha
│   ├── MOBILE_STACK_DECISION.md    # Decisión técnica de mobile
│   ├── guias.md
│   ├── guias_adicionales.md
│   └── estructura_repositorio.md
│
├── test-resources/                 # Recursos de pruebas (si aplica)

├── scripts/                       # Scripts auxiliares (limpios, sin DDL principal)
│   └── docker/

├── .env.example                    # Plantilla de variables de entorno (raíz)
├── frontend.web.env.example        # Plantilla de variables de entorno (web)
├── frontend.mobile.env.example     # Plantilla de variables de entorno (mobile)

├── docker-compose.yml              # Orquestación principal (single source of truth)
├── .gitignore
└── README.md
```
│   │   │   │   │   └── db/
