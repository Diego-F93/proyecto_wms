Purpose
This file gives focused, actionable guidance to AI coding agents working in this repository so they can be productive immediately.

Architecture (high level)
- Backend: Django REST API in `backend/` (project: `wmsApp`). Settings: `backend/wmsApp/settings.py`.
- Frontend: React app in `frontend/` (CRA). Key code: `frontend/src/context/AuthContext.jsx`, `frontend/src/components/ProtectedRoute.jsx`, `frontend/src/pages/LoginPage.jsx`.
- Authentication: custom user model `loginApp.CustomUser` in `backend/loginApp/models.py`. `AUTH_USER_MODEL` is set in settings.
- Auth flow: DRF + `rest_framework_simplejwt`. Login endpoint: `POST /api/login/` (see `backend/loginApp/views.py`). Token endpoints: `POST /api/token/` and `POST /api/token/refresh/` (see `backend/loginApp/urls.py`).

Important project-specific patterns
- Custom user: Email is `USERNAME_FIELD`, required fields include `first_name`, `last_name`, `rut`. Manager: `backend/loginApp/models.py -> CustomUserManager` builds `username` from names.
- Groups are created automatically on migrate: `grupos = ['Administrador','Supervisor','Operador']` and `post_migrate` receiver in `backend/loginApp/models.py`.
- Serializer: `backend/loginApp/serializer.py` returns `groups` as names (SlugRelatedField) and hashes passwords via `make_password` in `validate_password`.
- Frontend expects token payload: `{ access, refresh, user }` returned from `POST /api/login/`. `AuthContext` stores `access`, `refresh`, and `user` in `localStorage` and exposes `hasRole()` which checks `user.groups` names.
- Protected routes: `frontend/src/components/ProtectedRoute.jsx` enforces authentication and role checks using group names above.

Key files to inspect for changes
- `backend/wmsApp/settings.py` — DB, CORS, JWT lifetimes, `AUTH_USER_MODEL`.
- `backend/loginApp/models.py` — custom user, group creation.
- `backend/loginApp/serializer.py` — how password and groups are serialized.
- `backend/loginApp/views.py` — login/logout behavior and token payload returned.
- `backend/loginApp/urls.py` — token endpoints and login/logout routes.
- `frontend/src/context/AuthContext.jsx` — where tokens are stored/used and how login/logout works.
- `frontend/src/components/ProtectedRoute.jsx` — route protection and role semantics.

Developer workflows & commands (PowerShell)
- Backend setup (recommended):
  ```powershell
  cd backend
  python -m venv .venv
  .\.venv\Scripts\Activate
  pip install django djangorestframework djangorestframework-simplejwt pymysql django-cors-headers
  python manage.py migrate
  python manage.py createsuperuser
  python manage.py runserver 8000
  ```
- Frontend setup:
  ```powershell
  cd frontend
  npm install
  npm start
  ```
- Notes:
  - `backend/wmsApp/settings.py` is currently configured for MySQL (pymysql). A `db.sqlite3` file is present in the repo; confirm which DB you want to use and update `DATABASES` or env variables accordingly.
  - JWT `ACCESS_TOKEN_LIFETIME` is short (10 minutes); refresh token lifetime is 1 day. Adjust in settings when changing client behavior.

API examples
- Login request (frontend uses this shape):
  POST http://localhost:8000/api/login/
  Body: `{ "email": "user@example.com", "password": "secret" }`
  Response: `{ "refresh": "...", "access": "...", "user": { id, email, first_name, last_name, groups: ["Administrador"] } }`
- Token refresh endpoints: `POST /api/token/` and `POST /api/token/refresh/` (standard SimpleJWT views wired in `loginApp/urls.py`).

Guidance for changes
- Do not change `AUTH_USER_MODEL` lightly — migrations and admin integration depend on it.
- If you change the user shape or group names, update both backend serializer and frontend `AuthContext`/`ProtectedRoute` accordingly.
- When adding new permission checks, prefer using group-name checks (existing pattern) or add DRF permission classes; keep frontend `hasRole()` compatible with backend `groups` serialization.

Where to look when debugging auth problems
- Inspect `backend/loginApp/views.py` and `backend/loginApp/serializer.py` (token creation, returned payload).
- Check `backend/wmsApp/settings.py` for CORS and CSRF trusted origins; frontend expects `http://localhost:3000`.
- Look at browser `localStorage` keys: `access`, `refresh`, `user` (set by `AuthContext`).

If you need clarification
- Ask the repo owner which DB is intended (MySQL vs included `db.sqlite3`).
- Ask about desired token lifetimes and whether the frontend should auto-refresh tokens.

Please review this file and tell me any unclear or missing areas you want emphasized (build steps, secrets management, CI, or coding style rules).