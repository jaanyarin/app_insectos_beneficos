# Guía de Setup del Proyecto

Este documento proporciona **instrucciones paso a paso** para que un nuevo desarrollador pueda clonar, configurar y ejecutar el proyecto completo de forma local.

**Tiempo estimado**: 20-30 minutos

---

## Requisitos Previos

Asegúrate de tener instalado:

- **Git** (>=2.30)
- **Docker** (>=20.10) y **Docker Compose** (>=2.0)
- **Java 17+** (JDK)
- **Maven 3.8+**
- **Node.js 18+** (para frontend)
- **npm** o **yarn**
- **Expo CLI** (para desarrollo mobile: `npm install -g expo-cli`)

### Verificar instalaciones

```bash
git --version
docker --version
docker-compose --version
java -version
mvn -version
node --version
npm --version
```

---

## 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-organizacion/app_insectos_beneficos.git
cd app_insectos_beneficos
```

---

## 2. Configurar Variables de Entorno

### 2.1 Crear archivo `.env` en la raíz

```bash
cp .env.example .env
```

Edita `.env` con tus valores específicos (contraseñas, puertos, etc.):

```env
MYSQL_ROOT_PASSWORD=tu_password_seguro
MYSQL_DATABASE=insectos_db
MYSQL_USER=app_user
MYSQL_PASSWORD=app_password
QUARKUS_PORT=8080
```

### 2.2 Frontend Web

```bash
cd frontend/web
cp .env.example .env.local
```

Edita `frontend/web/.env.local`:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_JWT_STORAGE_KEY=jwt_token
```

### 2.3 Frontend Mobile

```bash
cd ../mobile
cp .env.example .env.local
```

Edita `frontend/mobile/.env.local`:

```env
EXPO_API_BASE_URL=http://localhost:8080/api
EXPO_JWT_STORAGE_KEY=jwt_token
```

---

## 3. Iniciar Servicios (Docker)

Desde la raíz del proyecto:

```bash
docker-compose up -d
```

Esto levantará:
- **MySQL** en puerto 3306
- **Quarkus Backend** en puerto 8080

Verifica que los servicios estén corriendo:

```bash
docker-compose ps
```

Deberías ver:
- `insectos_mysql` (running)
- `insectos_backend` (running)

Para ver logs:

```bash
docker-compose logs -f backend
docker-compose logs -f mysql
```

---

## 4. Configurar Backend (Quarkus)

### 4.1 Navegar al directorio

```bash
cd backend/quarkus-app
```

### 4.2 Instalar dependencias

```bash
mvn clean install
```

### 4.3 Ejecutar en modo desarrollo (opcional, si prefieres fuera de Docker)

```bash
mvn quarkus:dev
```

Quarkus estará disponible en `http://localhost:8080`

### 4.4 Verificar health

```bash
curl http://localhost:8080/health
```

Deberías ver:

```json
{"status":"UP"}
```

---

## 5. Configurar Frontend Web

### 5.1 Navegar al directorio

```bash
cd frontend/web
```

### 5.2 Instalar dependencias

```bash
npm install
```

### 5.3 Ejecutar en desarrollo

```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

---

## 6. Configurar Frontend Mobile

### 6.1 Navegar al directorio

```bash
cd frontend/mobile
```

### 6.2 Instalar dependencias

```bash
npm install
```

### 6.3 Ejecutar en desarrollo

Para iOS (Mac only):

```bash
npm run ios
```

Para Android:

```bash
npm run android
```

Para Expo:

```bash
npm start
```

---

## 7. Verificar Arquitectura de Autenticación

### 7.1 Obtener JWT local

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario_test",
    "password": "password_test"
  }'
```

Deberías recibir un JWT.

### 7.2 Usar el JWT

```bash
curl http://localhost:8080/api/solicitudes \
  -H "Authorization: Bearer <tu_jwt_aqui>"
```

---

## 8. Verificar Base de Datos

Acceder a MySQL:

```bash
docker exec -it insectos_mysql mysql -u app_user -p

# Luego ingresar la contraseña y ejecutar:
USE insectos_db;
SHOW TABLES;
```

---

## 9. Ejecutar Pruebas

### Backend

```bash
cd backend/quarkus-app
mvn test
```

### Frontend Web

```bash
cd frontend/web
npm test
```

### Frontend Mobile

```bash
cd frontend/mobile
npm test
```

---

## 10. Cambios Comunes en Desarrollo

### Reiniciar backend

```bash
docker-compose restart backend
```

### Limpiar base de datos (CUIDADO - elimina datos)

```bash
docker-compose down -v
docker-compose up -d
```

### Ver logs en tiempo real

```bash
docker-compose logs -f
```

---

## 11. Troubleshooting

### Puerto 8080 ya en uso

```bash
# Encontrar proceso
lsof -i :8080

# Detener el proceso
kill -9 <PID>
```

### MySQL no inicia

Verifica permisos y espacio en disco:

```bash
docker-compose logs mysql
```

### Frontend no conecta con backend

Verifica que `.env.local` tenga la URL correcta:

```bash
cat frontend/web/.env.local
```

### Dependencias desactualizadas

```bash
# Backend
cd backend/quarkus-app
mvn clean install

# Frontend Web
cd frontend/web
npm install

# Frontend Mobile
cd frontend/mobile
npm install
```

---

## 12. Próximos Pasos

Una vez que todo esté corriendo:

1. Lee [arquitectura.md](arquitectura.md)
2. Lee [mvp.md](mvp.md)
3. Abre la OpenAPI spec en `docs/api/openapi.yaml`
4. Comienza con la [Guía 3 de guias.md](guias.md#guía-3--orden-recomendado-de-desarrollo-fase-0)

---

## Soporte

Si encuentras problemas:

1. Revisa este documento completo
2. Verifica `docker-compose logs`
3. Consulta la documentación en `project_documentacion/`
4. Abre un issue en GitHub

Bienvenido al proyecto! 🚀
