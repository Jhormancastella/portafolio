# Portafolio | Jhorman Jesus Castellanos Morales

> Desarrollador Web Junior · Fotógrafo · Técnico en Sistemas

[![Portfolio](https://img.shields.io/badge/Ver-Portafolio-ffd700?style=for-the-badge)](https://jhormancastella.github.io/portafolio/)
[![GitHub last commit](https://img.shields.io/github/last-commit/jhormancastella/portafolio?style=for-the-badge)](https://github.com/Jhormancastella/portafolio)

---

## Estructura del proyecto

```
portfolio/
├── index.html              # Portafolio público
├── admin.html              # Panel de administración (protegido con Firebase Auth)
├── css/
│   └── styles.css          # Estilos globales
├── js/
│   ├── config.js           # ⚠️ IGNORADO EN GIT — credenciales locales
│   ├── config.example.js   # Plantilla de configuración (sí se sube)
│   ├── main.js             # Lógica del portafolio público (lee de Supabase)
│   └── admin.js            # CRUD Supabase + Firebase Auth
└── supabase/
    └── schema.sql          # Schema y seed de la base de datos
```

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5, CSS3, JavaScript vanilla |
| Base de datos | Supabase (PostgreSQL) |
| Autenticación | Firebase Auth (Email/Password) |
| Efectos | Canvas API (Matrix), CSS 3D transforms |
| Fuentes/íconos | Google Fonts (Inter), Font Awesome 6 |
| Formulario | FormSubmit |

---

## Configuración inicial

### 1. Clonar el repositorio

```bash
git clone https://github.com/Jhormancastella/portafolio.git
cd portafolio
```

### 2. Crear el archivo de credenciales

```bash
cp js/config.example.js js/config.js
```

Edita `js/config.js` con tus keys reales:

- **Firebase**: [console.firebase.google.com](https://console.firebase.google.com) → Tu proyecto → Configuración → Tu app web
- **Supabase**: [supabase.com](https://supabase.com) → Tu proyecto → Settings → API

> ⚠️ `js/config.js` está en `.gitignore` y nunca se sube a GitHub.

### 3. Crear las tablas en Supabase

1. Ve a tu proyecto en Supabase → **SQL Editor**
2. Pega y ejecuta el contenido de `supabase/schema.sql`
3. Esto crea las tablas y carga los datos iniciales

### 4. Crear usuario admin en Firebase

1. Ve a [console.firebase.google.com](https://console.firebase.google.com)
2. Authentication → Sign-in method → habilita **Email/Password**
3. Authentication → Users → **Add user**

### 5. Abrir el portafolio

Abre `index.html` en el navegador o usa un servidor local:

```bash
# Con VS Code Live Server, o:
npx serve .
```

---

## Modo Admin

El portafolio incluye un panel de administración para editar todo el contenido sin tocar código.

**Acceso:** Haz clic en el ícono 🔒 junto a ES/EN en el navbar → ingresa tus credenciales de Firebase.

**Desde el panel admin puedes editar:**
- Información personal (nombre, descripción, links, ES/EN)
- Imágenes del carrusel hero
- Habilidades del carrusel 3D
- Proyectos (título, descripción, imagen, botones, tags)
- Párrafos de "Sobre Mí"

---

## Características

- Efecto Matrix animado de fondo (Canvas API)
- Modo oscuro / claro con persistencia en localStorage
- Soporte bilingüe Español / Inglés
- Carrusel 3D de habilidades
- Carrusel automático de imágenes en el hero
- Diseño responsive (360px → 1400px+)
- Formulario de contacto via FormSubmit
- Panel admin con Firebase Auth + Supabase

---

## Seguridad

- Las keys de Firebase y Supabase viven en `js/config.js` (ignorado en git)
- La Supabase `anon key` solo permite lectura pública y escritura autenticada vía RLS
- La `service_role key` de Supabase **nunca** se usa en el frontend
- El panel admin está protegido por Firebase Authentication

---

## Contacto

- Email: [jesusjhorman@gmail.com](mailto:jesusjhorman@gmail.com)
- LinkedIn: [Jhorman Castellanos](https://www.linkedin.com/in/jhorman-jesus-castellanos-morales-245b97261)
- GitHub: [Jhormancastella](https://github.com/Jhormancastella)

---

© 2025 Jhorman Jesus Castellanos Morales
