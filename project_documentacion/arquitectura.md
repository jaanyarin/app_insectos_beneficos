# Arquitectura Técnica del Sistema

## 1. Visión general

El sistema se diseña como una plataforma empresarial orientada principalmente
al uso móvil, priorizando rapidez de respuesta, simplicidad operativa y seguridad.

La solución se basa en una arquitectura en capas, con un **único backend implementado
en Quarkus**, responsable tanto de la autenticación como de la lógica de negocio,
y una base de datos relacional MySQL como sistema de persistencia principal.

---

## 2. Arquitectura en capas

### 2.1 Capa de Presentación

Incluye las aplicaciones cliente:

- **Aplicación Web**: React + Tailwind CSS
- **Aplicación Mobile**: React Native

Responsabilidades:
- Interfaz de usuario
- Validaciones visuales
- Gestión de sesión (almacenamiento del JWT)
- Consumo de la API REST

La capa de presentación **no contiene lógica de negocio ni validaciones críticas**.

---

### 2.2 Capa de Negocio (Backend)

Implementada como una **API REST en Quarkus**.

Responsabilidades principales:
- Autenticación de usuarios locales
- Validación de tokens de Microsoft Entra ID
- Emisión y validación de JWT propios del sistema
- Gestión de roles y permisos
- Aplicación de reglas de negocio
- Gestión de estados de los procesos
- Registro de auditoría y trazabilidad
- Exposición de endpoints REST seguros

Todo acceso a datos se realiza exclusivamente a través de esta capa.

---

### 2.3 Capa de Datos

Implementada con **MySQL** como base de datos principal.

Responsabilidades:
- Persistencia de datos operativos
- Integridad referencial
- Historial de operaciones
- Almacenamiento de auditoría

Consideraciones:
- MySQL es el motor principal para todos los entornos (DEV, QA, PROD).
- SQLite puede utilizarse opcionalmente para pruebas locales o testing automatizado.
- No se permite acceso directo a la base de datos desde clientes.

---

## 3. Modelo de autenticación y seguridad

El sistema utiliza un modelo de **autenticación híbrida**, soportando dos tipos
de usuarios, pero unificando el mecanismo de sesión mediante JWT.

### 3.1 Tipos de usuarios

#### Usuarios locales
- Credenciales propias (usuario / contraseña).
- Contraseñas almacenadas con hash seguro.
- Autenticación directa contra el backend Quarkus.

#### Usuarios Microsoft
- Autenticación mediante Microsoft Entra ID (OAuth 2.0 / OpenID Connect).
- No se almacenan contraseñas corporativas.
- El usuario se mapea a un registro interno del sistema.

---

### 3.2 Flujo de autenticación

#### Usuario local
1. El cliente envía credenciales al endpoint de login.
2. Quarkus valida las credenciales.
3. Quarkus genera un JWT propio.
4. El cliente utiliza el JWT en cada petición.

#### Usuario Microsoft
1. El cliente realiza login con Microsoft Entra ID.
2. El cliente recibe un token de Microsoft.
3. El token se envía al backend.
4. Quarkus valida el token contra Microsoft.
5. Quarkus genera un JWT propio.
6. El cliente utiliza el JWT en cada petición.

✅ **El backend solo confía en su propio JWT**  
✅ **El frontend no distingue el origen del usuario**

---

## 4. JWT y control de acceso

El JWT emitido por Quarkus contiene:
- Identificador del usuario
- Tipo de usuario (local / Microsoft)
- Roles asignados
- Fecha de expiración

El control de acceso se implementa mediante:
- Filtros de seguridad
- Anotaciones de roles
- Validaciones de ownership (usuario propietario del recurso)

---

## 5. Auditoría y trazabilidad

La auditoría es un componente transversal y obligatorio del sistema.

### 5.1 Tabla de auditoría
- `audit_logs`

Se registra:
- Usuario
- Rol
- Acción realizada
- Entidad afectada
- Resultado (éxito / error)
- Fecha y hora
- IP y contexto básico

Toda acción crítica debe generar un registro de auditoría.

---

## 6. Infraestructura y entornos

- Contenedores Docker para backend y base de datos.
- Entornos separados: DEV / QA / PROD.
- Variables de entorno por ambiente.
- CI/CD para construcción, pruebas y despliegue.

---

## 7. Especificación de API (OpenAPI)

### 7.1 Contrato único

La especificación **OpenAPI** (`docs/api/openapi.yaml`) es el **contrato único y oficial** entre Backend y Frontends.

Características:
- Define todos los endpoints, parámetros, y respuestas esperadas.
- Incluye esquemas completos de datos (JSON Schema).
- Documenta códigos de error y estados de respuesta.
- Permite generar clientes HTTP automáticamente.

### 7.2 Generación de clientes

Los clientes HTTP para web y mobile se pueden generar automáticamente:

```bash
openapi-generator-cli generate \
  -i docs/api/openapi.yaml \
  -g typescript-axios \
  -o frontend/web/src/api-client
```

### 7.3 Validación continua

- OpenAPI se valida en CI/CD (`documentation-check.yml`).
- Cambios en endpoints requieren actualizar la especificación primero.
- Linting automático detecta inconsistencias.

**Ver**: `docs/api/README.md`

---

## 8. Integración Continua / Despliegue Continuo (CI/CD)

### 8.1 Pipelines de CI/CD

El proyecto incluye 4 workflows de GitHub Actions:

#### Backend CI (`backend-ci.yml`)
- Compila código con Maven
- Ejecuta tests unitarios e integración
- Verifica código style
- Escanea vulnerabilidades (OWASP)
- Construye imagen Docker

#### Frontend CI (`frontend-ci.yml`)
- Ejecuta tests de web y mobile
- Linting y formato
- Auditoría de dependencias
- Construye artefactos

#### Database Migrations (`database-migrations-validate.yml`)
- Valida sintaxis SQL
- Verifica convención Flyway
- Detecta cambios destructivos
- Simula migraciones

#### Documentation Check (`documentation-check.yml`)
- Valida Markdown y YAML
- Verifica archivos requeridos
- Valida especificación OpenAPI
- Chequea links internos

### 8.2 Flujo de Pull Request

1. Desarrollador crea PR desde rama feature
2. Todos los workflows se ejecutan automáticamente
3. Requisitos para merge:
   - ✅ Backend CI pass
   - ✅ Frontend CI pass
   - ✅ DB Migrations CI pass
   - ✅ Documentation Check pass
   - ✅ Code review aprobada
4. Merge a develop o main

### 8.3 Despliegue

- Main branch: Deploy automático a Producción
- Develop branch: Deploy automático a QA
- PR branches: Deploy a Preview (opcional)

---

## 9. Escalabilidad y evolución

La arquitectura permite:
- Incorporar nuevos módulos funcionales.
- Agregar nuevos tipos de usuario.
- Extender reglas de negocio.
- Integrar servicios externos en el futuro.

Cualquier cambio debe:
- Ser documentado.
- Ser aprobado.
- Mantener la seguridad, auditoría y trazabilidad.
- Actualizar la especificación OpenAPI.
