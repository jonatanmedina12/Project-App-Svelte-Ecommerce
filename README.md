# E-commerce Platform Frontend

Este proyecto es una implementación frontend de una plataforma de e-commerce utilizando Svelte y SvelteKit. Proporciona funcionalidades básicas de catálogo de productos, gestión de pedidos y autenticación de usuarios.

## Características

- Catálogo de productos
- Gestión de pedidos
- Autenticación de usuarios (registro, inicio de sesión, recuperación de contraseña)
- Carrito de compras
- Diseño responsivo utilizando Bootstrap

## Requisitos previos

- Node.js (versión 14 o superior)

## Configuración del proyecto

1. Clona este repositorio:
   ```
   git clone https://github.com/jonatanmedina12/Project-App-Svelte-ecommerce.git
   cd Project-App-Svelte-ecommerce/ecommerce-frontend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y configura la URL de tu API backend:
   ```
   API_URL_BACKEND="localhost"
   ```

## Ejecutar el proyecto

Para ejecutar el proyecto en modo de desarrollo:

```
npm run dev
```

El sitio estará disponible en `http://localhost:5173`.

Para construir el proyecto para producción:

```
npm run build
```

Para previsualizar la versión de producción:

```
npm run preview
```

## Estructura del proyecto

```
src/
  lib/
    components/   # Componentes reutilizables
    services/     # Servicios de API
    stores/       # Stores de Svelte
  routes/         # Páginas y layout de la aplicación
  app.css         # Estilos globales
  app.html        # Plantilla HTML principal
static/           # Archivos estáticos (imágenes, etc.)
```

## Componentes principales

- `ProductList.svelte`: Muestra la lista de productos
- `ProductCard.svelte`: Tarjeta individual de producto
- `OrderList.svelte`: Muestra la lista de pedidos del usuario
- `OrderForm.svelte`: Formulario para crear un nuevo pedido
- `Login.svelte`: Página de inicio de sesión
- `Register.svelte`: Página de registro
- `ForgotPassword.svelte`: Página de recuperación de contraseña

## Servicios de API

El archivo `src/lib/services/api.ts` contiene todas las funciones para interactuar con el backend:

- Autenticación: `login`, `register`, `forgotPassword`, `logout`
- Productos: `getProducts`, `getProduct`
- Pedidos: `getOrders`, `createOrder`, `getOrder`

## Stores

- `auth.ts`: Maneja el estado de autenticación del usuario
- `cart.ts`: Maneja el estado del carrito de compras

## Personalización

Puedes personalizar los estilos editando `src/app.css` y los archivos de componentes individuales.

## Conexión con el backend

Asegúrate de que tu backend proporcione los endpoints necesarios para las operaciones de autenticación, productos y pedidos. Ajusta las URLs en `src/lib/services/api.ts` si es necesario.


## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Contacto

Tu Nombre - JonatanAlbeniomedina@outlook.com

Link del proyecto: https://github.com/jonatanmedina12/Project-App-Svelte-ecommerce.git