# 🧑‍💻 Portafolio | Jhorman Castellanos

![Version](https://img.shields.io/badge/version-2.0-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-181717?style=flat&logo=github&logoColor=white)

## 🌐 Web en vivo

<div align="center">
  <a href="https://jhormancastella.github.io/portafolio/" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Ver_Portafolio_En_Vivo-Click_Aquí-ffd700?style=for-the-badge&logo=google-chrome&logoColor=black" alt="Ver Portafolio en Vivo">
  </a>
</div>

---

## 📖 Descripción

Portafolio personal de **Jhorman Jesus Castellanos Morales** — Desarrollador Web Junior, Fotógrafo y Técnico en Sistemas. Construido en vanilla JS con contenido dinámico gestionado desde **Supabase** y un panel de administración protegido con **Firebase Auth**, todo sin frameworks ni dependencias de build.

---

## ✨ Características principales

- **Efecto Matrix** – Fondo animado con Canvas API, adaptado al tema claro/oscuro.
- **Modo oscuro/claro** – Cambio de tema con persistencia en localStorage.
- **Bilingüe ES/EN** – Todo el contenido alterna entre español e inglés con un clic.
- **Carrusel 3D de habilidades** – Animación CSS 3D con rotación automática.
- **Carrusel hero automático** – Imágenes que rotan con transición suave.
- **Panel Admin** – Edita todo el portafolio sin tocar código, protegido con Firebase Auth.
- **Contenido dinámico** – Proyectos, habilidades, perfil y textos cargados desde Supabase.
- **Responsive** – Optimizado desde 360px hasta pantallas 1400px+.
- **Formulario de contacto** – Integrado con FormSubmit.

---

## 🧭 Flujo del modo Admin

```mermaid
flowchart TD
A[Portafolio público] --> B[Clic en 🔒 junto a ES/EN]
B --> C[Modal de login]
C --> D{Firebase Auth}
D -->|Credenciales válidas| E[Panel Admin]
D -->|Error| C
E --> F[Editar Perfil / Proyectos / Skills / About / Hero]
F --> G[Guardar en Supabase]
G --> H[Portafolio actualizado en tiempo real]
E --> I[Cerrar sesión]
I --> A
```

---

## 🛠️ Tecnologías utilizadas

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5, CSS3, JavaScript vanilla |
| Base de datos | Supabase (PostgreSQL + RLS) |
| Autenticación | Firebase Auth (Email/Password) |
| Efectos | Canvas API (Matrix), CSS 3D transforms |
| Fuentes/íconos | Google Fonts (Inter), Font Awesome 6 |
| Formulario | FormSubmit |
| Hosting | GitHub Pages |

---

## 📂 Estructura del proyecto

```
portfolio/
├── index.html              # Portafolio público
├── admin.html              # Panel de administración
├── css/
│   └── styles.css          # Estilos globales y responsive
└── js/
    ├── config.js           # Keys de Firebase y Supabase
    ├── main.js             # Lógica pública (lee de Supabase)
    └── admin.js            # CRUD Supabase + Firebase Auth
```

---

## 🚀 Uso local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Jhormancastella/portafolio.git
cd portafolio
```

### 2. Configurar servicios

**Supabase** — crea un proyecto, configura las tablas necesarias y obtén tu `Project URL` y `anon key`.

**Firebase** — crea un proyecto, habilita Authentication → Email/Password y agrega tu usuario admin.

Edita `js/config.js` con tus propias keys.

### 3. Abrir el proyecto

Abre `index.html` directamente en el navegador o usa un servidor local:

```bash
npx serve .
```

⚠️ No requiere backend ni instalación de dependencias.

---

## 🔐 Seguridad

- La `anon key` de Supabase es pública por diseño — solo permite lo que las políticas RLS autorizan.
- La escritura en Supabase está protegida por Firebase Auth en el frontend.
- La `service_role key` de Supabase **nunca** se usa en el frontend.
- El panel admin solo es accesible con credenciales válidas de Firebase.

---

## 🔍 SEO

- Metatags Open Graph y Twitter Card configurados.
- `robots` meta tag con `index, follow`.
- Estructura semántica HTML5 (`header`, `main`, `section`, `article`, `footer`).

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

---

## 📬 Contacto

- 📧 Email: [jesusjhorman@gmail.com](mailto:jesusjhorman@gmail.com)
- 💼 LinkedIn: [Jhorman Castellanos](https://www.linkedin.com/in/jhorman-jesus-castellanos-morales-245b97261)
- 🐱 GitHub: [Jhormancastella](https://github.com/Jhormancastella)

---

© 2026 Jhorman Jesus Castellanos Morales – Hecho con ❤️ para mostrar mi trabajo al mundo.
