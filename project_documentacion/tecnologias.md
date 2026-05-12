# Tecnologías del Proyecto - Registro de Versiones y Justificación

Este documento registra las tecnologías seleccionadas para el proyecto **Gestión de Insectos Benéficos y Evaluación de Nematodos**, junto con sus versiones y la justificación técnica de cada elección.

**Proyecto**: App Móvil + App Web para registro de solicitudes  
**Fecha de creación**: Mayo 2026

---

## 1. Backend

### 1.1 Quarkus Framework

|属性|Valor|
|---|---|
|Versión|3.15.1|
|Java|17 (OpenJDK)|
|Tipo|Framework Full-Stack|

#### Justificación

Se selecciona **Quarkus** como framework backend por las siguientes razones:

1. **Rendimiento superior**: Diseñado para GraalVM y native compilation, ofreciendo tiempos de arranque ultra-rápidos y bajo consumo de memoria. Esto es crítico para aplicaciones móviles donde la latencia y el uso de recursos son factores determinantes.

2. **Enfoque reactivo**: Built-in support para programación reactiva con Mutiny, permitiendo manejar múltiples conexiones concurrentes de manera eficiente sin bloquear threads.

3. **Ecosistema empresarial**: Integración nativa con Hibernate, Flyway, RESTEasy, y seguridad JWT. Todo lo necesario para una aplicación corporativa sin añadir complejidad.

4. **Cloud-native**: Diseñado desde cero para contenedores Docker/Kubernetes. El backendará desplegado en cloud y Quarkus optimiza recursos.

5. **Desarrollo rápido**: Live reload con `mvn quarkus:dev`, configuración sobre convención, y hotoks pragmáticos.

6. **Madurez**: Versión 3.15.1 estable y madura, con comunidad activa (Red Hat + comunidad open source).

> **Alternativa considerada**: Spring Boot. Descartado por ser más heavyweight para este caso de uso específico donde el rendimiento móvil es prioritario.

---

### 1.2 RESTEasy Reactive

|属性|Valor|
|---|---|
|Versión|Incluida en Quarkus 3.15.1|
|Componente|quarkus-resteasy-reactive|
|Tipo|Framework REST|

#### Justificación

1. **Enfoque reactivo**: RESTEasy Reactive trabaja de forma no bloqueante, alineado con el paradigma reactivo de Quarkus y las necesidades de aplicaciones móviles.

2. **Menor overhead**: Compared to traditional JAX-RS, reduce thread consumption y mejora throughput.

3. **JSON native**: Integración con Jackson sin configuración adicional.

4. **Streaming support**: Habilitado para futuros casos de uso que requieran respuestas streaming (ej: uploads grandes).

---

### 1.3 Hibernate ORM

|属性|Valor|
|---|---|
|Versión|Incluida en Quarkus 3.15.1|
|Componente|quarkus-hibernate-orm|
|JPA|2.2+|

#### Justificación

1. **Estándar Java**: JPA es el estándar de la industria para ORM en Java. Facilita la contratación de desarrolladores y mantenimiento a largo plazo.

2. **Productividad**: Reduce boilerplate de SQL directo. El equipo puede enfocarse en lógica de negocio.

3. **Portable**: Abstraction sobre MySQL permite cambiar de motor de base de datos si es necesario.

4. **Integración Quarkus**: Soporte de primera clase con Hibernate ORM panache para DAOs simplificados.

> **Alternativa considerada**: jOOQ. Descartado por requerir más código boilerplate y menor productividad inicial.

---

### 1.4 MySQL 8.0

|属性|Valor|
|---|---|
|Versión|8.0|
|Engine|InnoDB|
|Port|3306|

#### Justificación

1. **Compatibilidad con-Quarkus**: MySQL tiene soporte nativo en Quarkus via JDBC, sin necesidad de drivers adicionales complejos.

2. **JSON support**: MySQL 8.0 soporta JSON nativas, útil para campos semi-estructurados típicos de aplicaciones móviles.

3. **Window functions**: MySQL 8.0 introduce window functions, esenciales para analytics y reportes sin exportar a otras herramientas.

4. **Popularidad**: MySQL es la base de datos más popular para aplicaciones web/móviles en startups y empresas medianas. Fácil de encontrar hosting, soporte, y talento.

5. **docker-compose**: La imagen oficial `mysql:8.0` es estable y bien mantenida.

> **Alternativa considerada**: PostgreSQL. Podría ser necesaria en el futuro si se requieren features avanzadas como arrays nativos o full-text search. MySQL es suficiente por ahora.

---

### 1.5 Flyway

|属性|Valor|
|---|---|
|Versión|Incluida en Quarkus 3.15.1|
|Componente|quarkus-flyway|
|Tipo|Migration tool|

#### Justificación

1. **Version control de schema**: Cada cambio de base de datos es un archivo SQL versionado. Esto es obligatorio para trabajo en equipo y CI/CD.

2. **Rollback seguro**: Si un migration falla, Flyway detecta y previene ejecución parcial.

3. **Integración automática**: Quarkus ejecuta Flyway al startup automáticamente. No hay pasos manuales.

4. **Collaboration**: Los archivos SQL en `src/main/resources/db/migration` pueden ser revisados en PRs.

---

### 1.6 JWT (JSON Web Tokens)

|属性|Valor|
|---|---|
|Estandar|RFC 7519|
|Algoritmo|RS256|
|Signing|KEYCLOAK/Quarkus JWT|

#### Justificación

1. **Stateless**: El servidor no guarda sesión. El token contiene toda la información necesaria. Esto escala horizontally sin sessions sticky.

2. **Mobile-first**: Los tokens se almacenan en el dispositivo móvil (SecureStorage). Cada request es autónomo.

3. **Expiration**: Tokens expiran eventualmente. Si el token se roba, el acceso se corta solo. No hay logout server-side necesario.

4. **Integración Quarkus**: Soporte nativo con `smallrye-jwt`. Configuración minima.

> **Alternativa considerada**: Sessions tradicionales. Descartado因为 no escala bien para aplicaciones móviles donde el server-side Session management es costoso.

---

## 2. Frontend Mobile

### 2.1 React Native (Expo)

|属性|Valor|
|---|---|
|Versión|0.71+ (SDK 49+)|
|TypeScript|4.9+|
|Gestor|Expo|
|Expo SDK|49+|

#### Justificación

1. **Single codebase**: Un 95% del código core sirve para iOS y Android. Esto reduce a la mitad el esfuerzo de desarrollo.

2. **Reutilización con web**: Ambos frontends comparten TypeScript y lógica de negocio. El equipo mobile puede contribuir a web.

3. **Expo**: Permite desarrollo rápido sin necesidad de Xcode/Android Studio en fase inicial. Publishing a Expo Go para testing.

4. **Comunidad**: React Native es el framework multiplataforma más usado. Miles de librerías disponibles.

5. **Performance**: Código compila a nativo, no es un WebView. Experience similar a apps nativas.

6. **Hiring pool**: Hay más developers React que Flutter/Kotlin. Facilidad para escalar el equipo.

> **Alternativa considerada**: Flutter. Exige aprender Dart, no reutiliza código con web, curva más pronunciada. Descartado.

> **Alternativa considerada**: Swift/Kotlin nativos. Requiere dos codebases, dos equipos. No viable para desarrollo inicial unipersonal.

---

### 2.2 TypeScript

|属性|Valor|
|---|---|
|Versión|4.9+|
|Strict Mode|Yes|
|ECMAScript|2022|

#### Justificación

1. **Type safety**: Reduce errores en runtime significant. Refactoring seguro. Esto es crítico para mantenimiento a largo plazo.

2. **Frontend shared**: Types se comparten entre web y mobile. API contracts documentados automáticamente.

3. **Autocomplete**: IDE assist improves productivity. Menos bugs por typos.

4. **Standard**: TypeScript es el estándar de la industria frontend. Facilita hiring.

---

### 2.3 Axios

|属性|Valor|
|---|---|
|Versión|1.4+|
|HTTP Client|SPA|
|Interceptors|Yes|

#### Justificación

1. **API centralizada**: Todas las llamadas HTTP centralizadas en una instancia configurada. Manejo de errores global, auth headers automatic.

2. **Interceptors**: Puedo agregar el token JWT a todas las requests automáticamente.

3. **TypeScript**: Tipos incluidos desde el package. Type-safe HTTP calls.

4. **Abstraction**: API layer abstracta, no hay lógica HTTP en componentes.

> **Alternativa considerada**: Fetch API nativa. Descartado porque Axios ofrece más features listas para producción (interceptors, cancellation, progress).

---

### 2.4 React Navigation

|属性|Valor|
|---|---|
|Versión|6.x|
|Navigation Type|Stack + Tab + Drawer|
|Deep Linking|Yes|

#### Justificación

1. **Estándar**: React Navigation es la solución oficial recomendada por React Native.文档 completa, comunidad activa.

2. **Native performance**: Navigation corre en threads nativos, no JS threads. Transiciones suaves.

3. **Deep linking**: Configuración simple para handling de URLs externos (notification links).

4. **Patterns incluidos**: Stack (auth flow), Tab (main navigation), Drawer (sidebar). Todo lo necesario.

---

### 2.5 AsyncStorage

|属性|Valor|
|---|---|
|Versión|1.12+|
|Package|@react-native-async-storage/async-storage|
|Tipo|Persistent key-value storage|

#### Justificación

1. **Token storage**: AsyncStorage guarda el JWT de forma persistente. El usuario no hace login cada vez que abre la app.

2. **Settings**: Preferencias de usuario (theme, notifications) almacenadas localmente.

3. **Offline cache**: Datos básicos cacheados para uso sin conexión.

4. **Simple API**: API Promise-based, fácil de usar.

---

### 2.6 Context API

|属性|Valor|
|---|---|
|Versión|Incluida en React|
|Type|State management|
|Hooks|useContext, useReducer|

#### Justificación

1. **Suficiente para MVP**: No se necesita Redux/Zustand para una app de este tamaño. Context + useReducer manages global state.

2. **Menos dependencias**: Menos packages = menos complejidad. Menos bugs potenciales.

3. **No learning curve**: Todo developer React conoce Context. Onboarding fácil.

4. **Performance**: Context es suficientemente performante para esta app. Solo re-renders cuando el context cambia.

---

## 3. Frontend Web

### 3.1 React

|属性|Valor|
|---|---|
|Versión|18.x|
|TypeScript|Yes|
|Vite|5.x|

#### Justificación

1. **Reutilización**: Componentes, hooks, y lógica de negocio se comparten con mobile. Un equipo trabaja en ambos frontends.

2. **React ecosystem**: La librería más madura para frontend. Miles de componentes listos.

3. **Component-based**: Reusable components.reduce código duplicado. Maintenability.

4. **Hiring**: React es la skill más demandada en frontend. Hiring pool amplio.

>Alternativa considerada**: Vue/Angular. Descartado porque aumenta la fragmentación en el equipo (JS + TS + Vue + Dart).

---

### 3.2 Vite

|属性|Valor|
|---|---|
|Versión|5.x|
|Bundler|Vite|
|Dev Server|Yes|
|HMR|Yes|

#### Justificación

1. **Velocidad**: Vite usa native ES modules + esbuild. Developmentserver arrancain seconds.

2. **HMR instantáneo**: Cambios se reflejan immediately sin reload completo.

3. **Bundle optimization**: Production builds optimizadas automáticamente.

4. **Standard**: Vite es el bundler recomendado para React moderno.

---

### 3.3 Tailwind CSS

|属性|Valor|
|---|---|
|Versión|3.x|
|Approach|Utility-first|
|Dark mode|Yes|
|JIT|Yes|

#### Justificación

1. **Productividad**: CSS en el markup. No hay que cambiar de archivo para estilear.

2. **Consistency**: Design tokens centralizados (colors, spacing). UI consistente sin esfuerzo.

3. **Dark mode**: Soporte built-in. Útil para future dark theme.

4. **No learning curve**: CSS utilities son intuitivos. Menos tiempo estilando.

>Alternativa considerada**: Styled Components. Descartado porque Tailwind es más popular y ofrece mejor consistencia.

---

## 4. Infrastructure

### 4.1 Docker

|属性|Valor|
|---|---|
|Compose Version|3.8|
|Base Image|jdk:17-slim (backend)|
|Node|18-alpine (frontend)|

#### Justificación

1. **Reproducibilidad**: Todo corre en containers. El equipo tiene el mismo ambiente. No más "funciona en mi máquina".

2. **CI/CD**: Las imágenes se buildan en GitHub Actions. Deploy a cualquier cloud.

3. **Orchestration**: docker-compose orquestra DB + backend + web en un comando.

4. **Resource isolation**: Cada servicio corre aislado. Si uno falla, los demás siguen corriendo.

---

### 4.2 GitHub Actions

|属性|Valor|
|---|---|
|CI/CD Platform|GitHub Actions|
|Workflows|Backend test, Frontend test, Docker build|
|Triggers|Push to main, PR|

#### Justificación

1. **Gratuito para repos públicos**: No hay costo adicional para proyectos open source.

2. **Integración GitHub**: Todo en un solo lugar. No hay dashboard separado.

3. **Workflows reusable**: Templates para Java (Maven) y Node.js disponibles.

4. **Caching**: Maven/npm cache reduce tiempos de build.

---

## 5. Resumen de Versiones

| Capa | Tecnología | Versión |
|------|------------|---------|
| Backend | Quarkus | 3.15.1 |
| Backend | Java | 17 |
| Backend | RESTEasy Reactive | (en Quarkus) |
| Backend | Hibernate ORM | (en Quarkus) |
| Backend | MySQL | 8.0 |
| Backend | Flyway | (en Quarkus) |
| Mobile | React Native | 0.71+ |
| Mobile | Expo | SDK 49+ |
| Mobile | TypeScript | 4.9+ |
| Mobile | Axios | 1.4+ |
| Mobile | React Navigation | 6.x |
| Mobile | AsyncStorage | 1.12+ |
| Web | React | 18.x |
| Web | Vite | 5.x |
| Web | Tailwind CSS | 3.x |
| Web | TypeScript | 5.x |
| Infra | Docker | Latest |
| Infra | Docker Compose | 3.8 |
| Infra | Node.js | 18+ |

---

## 6. Criterios de Selección Aplicados

Las tecnologías fueron seleccionadas siguiendo estos criterios de senior:

1. **Mobile-first**: Cada decisión prioriza el rendimiento y UX móvil. Latencia, offline, y tamaño de bundle son considerados.

2. **Single team**: El stack permite que 1-3 developers manejen todo (backend + web + mobile). No hay fragmentación de lenguajes.

3. **Mantenibilidad**: Tecnologías con comunidad activa, documentación madura, y hiring pool amplio.

4. **Escalabilidad**: El stack soporta crecer de 1 a 10+ developers sin refactorización.

5. **Cloud-ready**: Todo corre en contenedores. Deploy a cualquier cloud provider.

6. **Futuro**: Las choices permiten evolución (monorepo, micro-frontends, serverless) sin reescribir todo.

---

## 7. Actualización de Versiones

Las versiones deben actualizarse siguiendo estas reglas:

- **Patch releases**: Pueden aplicarse sin revisar. Actualizan bug fixes.
- **Minor releases**: Revisar changelog. Testing manual requerido.
- **Major releases**: Evaluar en staging. Testing completo requerido.

Las actualizaciones se documentan en `CHANGELOG.md` y este documento se actualiza en consecuencia.

---

## 8. Referencias

- [Quarkus Documentation](https://quarkus.io/guides/)
- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [MySQL 8.0 Reference](https://dev.mysql.com/doc/refman/8.0/en/)
- [Docker Documentation](https://docs.docker.com/)

---

*Documento generado como parte del setup inicial del proyecto.*
*Última actualización: Mayo 2026*