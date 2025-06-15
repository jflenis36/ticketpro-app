
# 🧩 TicketPro – Frontend

¡Bienvenido al frontend de **TicketPro**, tu herramienta de gestión de tickets tipo Jira/Notion!  
Este proyecto está creado con **Vue 3**, **Vite**, **Pinia**, y estilizado con **Tailwind CSS**.

---

## 📋 Descripción

TicketPro es una app web para:
- 🔐 Login (autenticación)
- 📊 Dashboard (diseño visual, con datos *mocked*)
- ➕ Crear tickets
- 📃 Listar tickets
- ✍️ Editar tickets
- 🔍 Ver detalle de ticket
- 💬 Comentar y responder

⚠️ *El Dashboard actualmente está solo de diseño: los datos están "quemados" (mock).*  
Cada módulo está integrado y listo para conectar a la API backend.

---

## 🚀 Comenzando

### Prerrequisitos

- [Node.js](https://nodejs.org/) v16+
- [Git](https://git-scm.com/)

### Instalación

```bash
git clone https://github.com/jflenis36/ticketpro-front.git
cd ticketpro-front
npm install
```



### Variables de entorno

Crea un `.env` con:

```ini
VITE_API_URL=https://ticketpro-api.onrender.com/api/auth
```

### Ejecución

```bash
npm run dev
```

Abre: `http://localhost:5173`

---

## 🔑 Credenciales de Prueba

Puedes acceder directamente a la aplicación desplegada para probarla:

🌐 **URL:** [https://ticketpro-qhysqgk5r-jflenis36s-projects.vercel.app](https://ticketpro-qhysqgk5r-jflenis36s-projects.vercel.app)

### 👤 Usuario de prueba:

```bash
📧 Correo: admin@email.com  
🔑 Clave: admin
```

---

## 🧠 Estructura del Proyecto

```
src/
├── assets/          # Estilos, imágenes
├── components/      # UI reutilizables
├── layouts/         # Layouts de página
├── pages/           # Vistas (Login, Dashboard, Tickets)
├── router/          # Rutas de Vue Router
├── services/        # Llamadas API
├── stores/          # Pinia (auth, tickets, loading)
└── utils/           # Helpers (e.g., formateo de fechas)
```

---

## 🔧 Módulos implementados

| Módulo             | Estado    | Notas                                               |
|--------------------|-----------|-----------------------------------------------------|
| Login              | ✅ Listo   | Formulario con validación + login + toasts         |
| Dashboard          | 🧩 Diseño  | Componentes listos, datos estáticos                |
| Crear Ticket       | ✅ Listo   | Formulario + validaciones + toast de éxito         |
| Listar Tickets     | ✅ Listo   | Tabla estilizada y responsive                      |
| Editar Ticket      | ✅ Listo   | Reutilización de formulario + toast                |
| Detalle Ticket     | ✅ Listo   | Tarjeta con información + sección de comentarios   |
| Comentar/Responder | ✅ Listo   | Formulario + vista anidada hasta nivel 2           |

---

## 📚 Tecnologías utilizadas

- **Vue 3** + `<script setup>`
- **Vite**
- **Pinia** (Estado global: auth, tickets, loading)
- **Vue Router**
- **Tailwind CSS** + componentes UI personalizados
- **Libs**:
  - vue-toast-notification (toasts)
- **Servicios HTTP** con axios hacia backend

---

## 🧩 Cómo usar los módulos

1. **Login**: envía email/password → recibe token → se guarda en Pinia + localStorage
2. **Dashboard**: muestra cards, datos mock, botones de acción
3. **Crear/Editar ticket**: abrimos `TicketForm.vue` con validación y toasts
4. **Listar tickets**: tabla con acciones edit/ver
5. **Ver detalle**: `TicketDetails.vue` con `CommentList` y `CommentForm`
6. **Comentar/Responder**: uso de `CommentItem` y `CommentReplies` con carga dinámica

---

## ✅ Buenas prácticas

- Componentes por responsabilidad
- Reaccionamos a estados con Pinia
- Loading overlay global
- Feedback inmediato con toasts
- Validación y UX con Tailwind

---

## 🚧 Próximos pasos

- 🧠 Conectar dashboard con datos reales del backend
- 🔄 Paginación/búsqueda en lista de tickets
- 🛡️ Autorización de roles (Admin vs user)
- 🔔 Live updates con WebSockets (opcional)
- 🧪 Pruebas unitarias (Vitest / Testing Library)

---

## 📝 Contribuciones y Licencia

Contribuciones y mejoras son bienvenidas.  
Este proyecto es open-source bajo la licencia **MIT**.

---

## 👤 Autor

- **Felipe J. Lenis** – [@jflenis36](https://github.com/jflenis36) – felipe@mail.com
