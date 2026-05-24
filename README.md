# CookiBooks 🍪

Tienda de libros online con backend Node.js/Express/Sequelize y frontend React/Vite/Tailwind.

## Requisitos
- Node.js 18+
- PostgreSQL

## Instalación

### 1. Clonar
```bash
git clone https://github.com/Yagogo39/Libreria_CookiBooks
cd Libreria_CookiBooks
```

### 2. Base de datos
Crear la base de datos en PostgreSQL y correr el script de migración:
```bash
psql -U tu_usuario -d cookibooks_db -f migrate_cookibooks.sql
```

### 3. Backend
```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus datos
node src/index.js
```

### 4. Frontend
```bash
cd frontend
npm install
npm run dev
```

## Variables de entorno (backend/.env)
| Variable | Descripción |
|---|---|
| DATABASE_URL | URL de PostgreSQL |
| EMAIL_USER | Correo Gmail para cotizaciones |
| EMAIL_PASS | Contraseña de aplicación de Google |
| PORT | Puerto del servidor (default 5000) |

## Acceso admin
Doble clic en "CookiBooks" del footer → ingresar PIN


Si quieren ya le dan npm run dev desde la raiz y deberia de funcionar, sino, siganle por separado jaja

