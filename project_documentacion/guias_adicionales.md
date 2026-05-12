# Guías Adicionales

Este archivo complementa `guias.md` con guías modernas sobre variables de entorno, testing y CI/CD.

---

## Guía 9 – Configuración de Variables de Entorno

### Por qué variables de entorno

Diferentes ambientes (DEV, QA, PROD) requieren diferentes configuraciones sin cambiar código.

Usamos archivos `.env.example` como plantillas y `.env` o `.env.local` para valores reales.

### Paso 1: Copiar templates

```bash
# Raíz del proyecto
cp .env.example .env

# Frontend web
cd frontend/web
cp .env.example .env.local

# Frontend mobile
cd frontend/mobile
cp .env.example .env.local
```

### Paso 2: Completar valores por ambiente

#### Backend (raíz `.env`)

```env
# Desarrollo
MYSQL_PASSWORD=dev_password_123
JWT_SECRET_KEY=dev_secret_change_in_prod
MICROSOFT_TENANT_ID=tu_tenant_id
QUARKUS_PROFILE=dev
```

#### Frontend Web (`.env.local`)

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_DEBUG=true
```

#### Frontend Mobile (`.env.local`)

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080/api
EXPO_PUBLIC_DEBUG=true
```

### Paso 3: NUNCA commitear `.env`

Agregar a `.gitignore`:

```
.env
.env.local
.env.*.local
```

Solo commiteamos `.env.example` como plantilla.

### Paso 4: CI/CD y Producción

En CI/CD (GitHub Actions), las variables se configuran como **Secrets**:

```
Settings → Secrets and variables → Actions
```

Los workflows acceden con `${{ secrets.VAR_NAME }}`.

---

## Guía 10 – Testing y CI/CD

### Ejecutar tests localmente

```bash
# Backend
cd backend/quarkus-app
mvn test

# Frontend web
cd frontend/web
npm test

# Frontend mobile
cd frontend/mobile
npm test
```

### Entender CI/CD

GitHub Actions ejecuta automáticamente cuando haces push o creas PR:

1. **Backend CI** (`backend-ci.yml`) - Maven build, tests, linting, análisis de seguridad
2. **Frontend CI** (`frontend-ci.yml`) - npm build, tests, linting, auditoría de dependencias
3. **DB Migrations** (`database-migrations-validate.yml`) - Valida cambios de BD
4. **Documentation** (`documentation-check.yml`) - Valida documentación y especificación OpenAPI

Ver status en: **GitHub repo → Actions tab**

### Debugging CI/CD

Si un workflow falla:

1. Abre el workflow en GitHub
2. Haz click en el job que falló
3. Lee los logs (muy detallados)
4. Reproduce el error localmente
5. Haz commit del fix y push para rerun automático

### Pre-commit checks

Antes de hacer push:

```bash
# Ejecuta toda la suite de tests localmente
./scripts/pre-commit.sh  # (create if needed)
```

---

## Guía 11 – Cierre de cada fase

Antes de cerrar una fase, verifica:

- Flujo principal funciona de punta a punta
- JWT y roles aplicados correctamente
- Auditoría activa en todos los cambios críticos
- Código limpio (sin console.log innecesarios, etc)
- Documentación actualizada
- Variables de entorno configuradas y documentadas
- CI/CD workflows pasando (todos verde en Actions)
- Tests unitarios cubriendo lógica crítica (>70% cobertura)
- Code review completada

No cierres fases "a medias".

---

## Mensaje de cierre

Este proyecto se construye con orden, no con prisa.

Tres pilares mantienen la salud del proyecto:

1. **Documentación**: Viva, actualizada, confiable
   - Especificación OpenAPI es fuente de verdad
   - Arquitectura y decisiones documentadas
   - Setup guide actualizado

2. **Testing**: Desde el inicio, no al final
   - Tests unitarios desde Fase 0
   - Cobertura >70% en lógica crítica
   - CI/CD valida todo automáticamente

3. **Proceso**: CI/CD automatizado, nunca manual
   - No mergear sin pasar todos los checks
   - Todos los workflows deben pasar (backend, frontend, BD, docs)
   - Secrets seguros en GitHub

Si mantienes estos tres elementos, el proyecto escala sin problemas de arquitectura.

**Bienvenido a un proyecto verdaderamente profesional.** 🚀
