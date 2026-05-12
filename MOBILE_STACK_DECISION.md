# Decisión Técnica: Stack Mobile - React Native

## Documento de Decisión

**Fecha de Decisión**: 4 de mayo de 2026  
**Estado**: ✅ APROBADA  
**Decisión ID**: MOBILE-001

---

## Decisión

El frontend móvil del proyecto **Gestión de Insectos Benéficos y Evaluación de Nematodos** será desarrollado utilizando **React Native** como framework multiplataforma.

---

## Alternativas Consideradas

### 1. React Native (SELECCIONADA ✅)

**Descripción**: Framework basado en JavaScript que compila a código nativo para iOS y Android.

**Ventajas**:
- Máxima reutilización de código JavaScript con el frontend web (ambos usan JavaScript/TypeScript)
- Un único equipo puede desarrollar web + mobile
- Excelente rendimiento y experiencia nativa
- Soporte robusto de la comunidad y Meta
- Soporta Expo para desarrollo rápido durante prototipado
- Integración seamless con API REST

**Desventajas**:
- Algunos módulos nativos requieren linking adicional
- Curva de aprendizaje si vienes de web puro

### 2. Flutter (NO seleccionada)

**Descripción**: Framework multiplataforma en Dart.

**Ventajas**:
- Rendimiento superior
- UI más consistente entre plataformas
- Documentación excelente

**Desventajas**:
- Requiere Dart (nuevo lenguaje)
- Equipo dividido: web (JavaScript) + mobile (Dart)
- Menos reutilización de código
- Curva de aprendizaje más pronunciada

### 3. Desarrollo Nativo (NO seleccionada)

**Descripción**: Swift/Kotlin nativo para cada plataforma.

**Ventajas**:
- Máximo control y rendimiento
- Acceso completo a APIs nativas

**Desventajas**:
- Duplicación de código
- Requiere múltiples equipos especializados
- Inviable para desarrollo inicial por una persona
- Mantenimiento exponencialmente más complejo

---

## Justificación

Se elige **React Native** porque:

1. **Alineación técnica**: El frontend web usa React, por lo que reutilizamos JavaScript/TypeScript
2. **Contexto del proyecto**: Desarrollo inicial por una sola persona, escalable a múltiples desarrolladores
3. **Time-to-market**: Desarrollo más rápido comparado con alternativas
4. **Flexibilidad**: Permite prototipado con Expo y compilación nativa cuando sea necesario
5. **Comunidad**: Soporte robusto y librerías maduras

---

## Impacto Técnico

### Estructura de Carpetas

```
frontend/
├── web/                    # React web
│   ├── src/
│   │   ├── components/     # Componentes web (puede incluir responsive)
│   │   ├── pages/
│   │   └── ...
│   └── package.json
│
└── mobile/                 # React Native
    ├── src/
    │   ├── components/     # Componentes RN (reutilizables con web)
    │   ├── screens/        # Pantallas mobile-specific
    │   └── ...
    ├── app.json           # Configuración Expo
    ├── babel.config.js    # Configuración Babel
    ├── package.json
    └── .env.example
```

### Stack Específico

| Componente        | Tecnología       | Versión |
| -----------       | -----------      | ------- |
| Framework         | React Native     | 0.71+   |
| JavaScript        | TypeScript       | 4.9+    |
| Gestor de estado  | Context API      | -       |
| HTTP Client       | axios            | 1.4+    |
| Storage Local     | AsyncStorage     | 1.12+   |
| Navegación        | React Navigation | 6.x     |
| Testing           | Jest + RTL       | 27+     |
| Linting           | ESLint           | 8.x     |
| Formatting        | Prettier         | 2.8+    |

### Configuración de Desarrollo

#### Requisitos

- Node.js 18+
- npm/yarn
- Expo CLI (para desarrollo rápido)
- Xcode 14+ (Mac, para iOS)
- Android Studio (para Android)

#### Flujo de Desarrollo

1. **Prototipado rápido con Expo**:
   ```bash
   npm start
   # Abre en iPhone/Android con app Expo
   ```

2. **Compilación nativa (cuando sea necesario)**:
   ```bash
   eas build --platform ios
   eas build --platform android
   ```

### Código Compartido

La siguiente lógica puede ser **reutilizada entre web y mobile**:

```
frontend/
├── shared/                 # ← NUEVO
│   ├── services/          # API calls, auth
│   ├── hooks/             # Custom hooks
│   ├── context/           # Global state
│   ├── types/             # TypeScript types
│   └── utils/             # Helpers
├── web/
│   ├── src/
│   │   ├── shared -> ../../shared
│   │   ├── components/    # Web-specific UI
│   │   └── ...
│   └── package.json
└── mobile/
    ├── src/
    │   ├── shared -> ../../shared
    │   ├── components/    # RN components
    │   └── ...
    └── package.json
```

### Diferencias en Componentes

**Web (React)**:
```jsx
<div className="container">
  <button onClick={handleClick}>Click</button>
</div>
```

**Mobile (React Native)**:
```jsx
<View style={styles.container}>
  <TouchableOpacity onPress={handleClick}>
    <Text>Click</Text>
  </TouchableOpacity>
</View>
```

### Monorepo (Fase 2)

Para la Fase 2, consideraremos un monorepo con `yarn workspaces`:

```
app_insectos_beneficos/
├── packages/
│   ├── shared/          # Código compartido
│   ├── frontend-web/
│   ├── frontend-mobile/
│   └── backend/
└── yarn.lock
```

---

## Ventajas Adicionales

1. **Reutilización de Componentes**: Componentes visuales pueden portarse entre web y mobile
2. **Equipo Unificado**: Un equipo JavaScript/TypeScript puede trabajar en todo
3. **Testing Compartido**: Lógica de negocio testeada en un lugar
4. **Escalabilidad**: Fácil crecer de 1 a múltiples desarrolladores
5. **Mantenibilidad**: Menos lenguajes, menos herramientas, menos complejidad

---

## Riesgos Mitigados

| Riesgo                    | Mitigación                                      |
| -----------               | -----------                                     |
| Performance               | React Native compila a nativo; Expo LAN para testing |
| Breaking changes RN       | Version pinning en package.json; testing continuo |
| Fragmentación iOS/Android | Code sharing y testing en ambas plataformas |
| Native modules            | Usar librerías establecidas (mapas, cámara, etc.) |

---

## Evolución Futura

- **Fase 1 (MVP)**: React Native con Expo para desarrollo rápido
- **Fase 2**: Posible migración a monorepo si crece el equipo
- **Fase 3+**: EAS Build para distribución en App Stores

---

## Referencias

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)

---

## Aprobación

Esta decisión ha sido revisada y aprobada como parte de la arquitectura del proyecto.

**Ver también**: [decisiones_arquitectura.md](project_documentacion/decisiones_arquitectura.md)
