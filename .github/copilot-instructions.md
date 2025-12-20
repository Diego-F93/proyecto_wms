# WMS Project - AI Coding Agent Instructions

## Architecture Overview
This is a Warehouse Management System (WMS) with a React frontend and Django REST API backend, using MySQL database. The system manages inventory through categories, products, lots, and operations (entries, exits, adjustments).

- **Frontend**: React SPA with Bootstrap UI, JWT authentication via localStorage, axios for API calls
- **Backend**: Django 5.2 with DRF, JWT auth, custom user model (email-based), role-based permissions (Administrador/Supervisor/Operador)
- **Database**: MySQL with PyMySQL driver
- **Key Models**: CustomUser (loginApp), Categoria/Producto/Lote (catalogo), OperacionInventario/Transaccion (operaciones)

## API Endpoints
- **Authentication**:
  - `POST /api/login/` - Login (email, password) → returns access/refresh tokens and user data
  - `POST /api/logout/` - Logout
  - `POST /api/token/` - Obtain JWT token pair
  - `POST /api/token/refresh/` - Refresh access token

- **Catalog (api/catalogo/)**:
  - `GET /api/catalogo/categorias/` - List categories
  - `POST /api/catalogo/categorias/` - Create category
  - `GET /api/catalogo/categorias/{id}/` - Retrieve category
  - `PUT /api/catalogo/categorias/{id}/` - Update category
  - `DELETE /api/catalogo/categorias/{id}/` - Soft delete category (toggle estado)
  - `GET /api/catalogo/productos/` - List products
  - `POST /api/catalogo/productos/` - Create product
  - `GET /api/catalogo/productos/{sku}/` - Retrieve product
  - `PUT /api/catalogo/productos/{sku}/` - Update product
  - `DELETE /api/catalogo/productos/{sku}/` - Soft delete product
  - `GET /api/catalogo/lotes/` - List lots
  - `POST /api/catalogo/lotes/` - Create lot
  - `GET /api/catalogo/lotes/{id}/` - Retrieve lot
  - `PUT /api/catalogo/lotes/{id}/` - Update lot
  - `DELETE /api/catalogo/lotes/{id}/` - Soft delete lot

- **Operations (api/operacion/)**:
  - `POST /api/operacion/ingreso/` - Create inventory entry operation (with lots)
  - `GET /api/operacion/lista/` - List operations (with filters: tipo, fecha_desde, fecha_hasta, sku, usuario_id)
  - `GET /api/operacion/lista/{id}/` - Retrieve operation details

## Development Workflows
- **Backend**: `cd backend && python manage.py runserver` (port 8000), `python manage.py makemigrations && python manage.py migrate`
- **Frontend**: `cd frontend && npm start` (port 3000), CORS configured for localhost:3000
- **Database**: MySQL 'wms' database, root user no password (dev only)
- **Auth Flow**: Login via `/api/login/`, stores JWT tokens in localStorage, refresh via `/api/token/refresh/`

## Code Patterns
- **Views**: Use ModelViewSet for CRUD, override destroy for soft delete, custom lookup_field for Producto (sku)
- **Serializers**: Standard DRF serializers, include computed fields like stock_actual
- **Frontend Components**: Use React Router for protected routes, AuthContext for state management
- **Error Handling**: Return 404/400 with detail messages in Spanish

## Reference Files
- [backend/wmsApp/settings.py](backend/wmsApp/settings.py) - Django config, installed apps, JWT settings
- [backend/loginApp/models.py](backend/loginApp/models.py) - CustomUser model and manager
- [backend/operaciones/models.py](backend/operaciones/models.py) - Inventory operation models
- [frontend/src/context/AuthContext.jsx](frontend/src/context/AuthContext.jsx) - Frontend auth logic
- [diagramas/diag Componentes.mmd](diagramas/diag Componentes.mmd) - System component diagram
- [diagramas/modelo_datos.mmd](diagramas/modelo_datos.mmd) - Data model ER diagram
- [diagramas/estructura_codigo.mmd](diagramas/estructura_codigo.mmd) - Source code structure mindmap
- [diagramas/estructura_carpetas.mmd](diagramas/estructura_carpetas.mmd) - Main folder structure flowchart</content>
<parameter name="filePath">c:\Users\diego\OneDrive\Desktop\proyecto_wms\.github\copilot-instructions.md