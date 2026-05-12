# OpenAPI Specification - Contrato de API

Este directorio contiene la **especificación oficial OpenAPI** del sistema.

## 📋 Descripción

`openapi.yaml` define el **contrato único** entre el Backend (Quarkus) y los Frontends (Web y Mobile).

Esta especificación es la **fuente de verdad** para:
- Endpoints disponibles
- Parámetros requeridos
- Formatos de respuesta
- Códigos de error
- Esquemas de datos

---

## 🚀 Cómo Usar

### 1. Ver la especificación (UI interactiva)

#### Opción A: Swagger UI (recomendado)

```bash
# Instalar Swagger UI localmente
npx swagger-ui-dist

# O usar versión online
# Ir a https://editor.swagger.io/ y copiar contenido de openapi.yaml
```

#### Opción B: Redoc

```bash
# Instalar Redoc
npm install redoc

# Servir localmente
npx redoc-cli serve openapi.yaml
```

### 2. Generar cliente automáticamente

El contenido de esta especificación **puede usarse para generar clientes** en JavaScript, TypeScript, Python, Java, etc.

#### Frontend (TypeScript)

```bash
# Instalar OpenAPI Generator
npm install -g @openapitools/openapi-generator-cli

# Generar cliente TypeScript/Axios
openapi-generator-cli generate \
  -i docs/api/openapi.yaml \
  -g typescript-axios \
  -o frontend/web/src/api-client
```

#### Frontend Mobile (TypeScript)

```bash
openapi-generator-cli generate \
  -i docs/api/openapi.yaml \
  -g typescript-axios \
  -o frontend/mobile/src/api-client
```

### 3. Validar la especificación

```bash
# Instalar validador
npm install -g @stoplight/spectral-cli

# Validar
spectral lint docs/api/openapi.yaml
```

---

## 📖 Estructura de la Especificación

### Tags (Grupos de Endpoints)

La especificación está organizada en 5 grupos:

| Tag            | Descripción                           |
| -----------    | -----------                           |
| Autenticación  | Login y renovación de tokens         |
| Solicitudes    | CRUD de solicitudes de insectos      |
| Inventario     | Gestión de stock                     |
| Auditoría      | Historial de acciones (solo lectura) |
| Usuarios       | Gestión de usuarios                  |

### Esquemas (Data Models)

Todos los esquemas están definidos en `components/schemas/`:

- `Usuario`: Información de usuario
- `Solicitud`: Una solicitud de insectos
- `SolicitudDetalle`: Solicitud con historial completo
- `StockItem`: Item de inventario
- `AuditoriaLog`: Entrada de auditoría
- `Error`: Estructura de error estándar

### Seguridad

Todos los endpoints (excepto `/auth/login` y `/auth/login/microsoft`) requieren autenticación JWT:

```
Authorization: Bearer <jwt_aqui>
```

---

## ✅ Reglas de Evolución

Cuando la especificación cambie:

1. **Incrementar la versión** en `info.version`
2. **Documentar el cambio** en el changelog
3. **Notificar a los equipos frontend y backend**
4. **Actualizar generadores de cliente** si es necesario

**Nunca elimines un campo sin avisar a los equipos frontend/mobile**.

---

## 🔗 Referencias

- [OpenAPI 3.0 Spec](https://spec.openapis.org/oas/v3.0.3)
- [Swagger UI Docs](https://swagger.io/tools/swagger-ui/)
- [OpenAPI Generator](https://openapi-generator.tech/)

---

## 📞 Preguntas

¿Dudas sobre la API? Consulta:

1. Esta especificación
2. [arquitectura.md](../../project_documentacion/arquitectura.md#2-arquitectura-en-capas)
3. [mvp.md](../../project_documentacion/mvp.md)
