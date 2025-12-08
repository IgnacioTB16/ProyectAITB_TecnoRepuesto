# Sistema de Gestión - TecnoRepuestos S.A.

## Descripción
Sistema web para la gestión de inventario, compras, ventas y atención al cliente de TecnoRepuestos S.A.

## Características principales
- Gestión completa de inventario con control de stock mínimo
- Registro de compras a proveedores con actualización automática
- Sistema de ventas con validación de stock en tiempo real
- Portal del cliente para consulta de pedidos y comprobantes
- Roles y permisos: Administrador, Vendedor, Cliente
- Reportes en PDF y Excel
- API REST documentada

## Tecnologías utilizadas
- **Backend**: Node.js 18, Express, TypeScript, Prisma ORM
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Base de datos**: PostgreSQL 14
- **Autenticación**: JWT (JSON Web Tokens)
- **Contenedores**: Docker, Docker Compose

## Instalación y ejecución
Ver [INSTALL.md](docs/INSTALL.md) para instrucciones detalladas.

## Desarrollo
1. Clonar repositorio
2. Configurar variables de entorno (.env)
3. Instalar dependencias: `npm install`
4. Ejecutar migraciones: `npm run db:migrate`
5. Iniciar servidor: `npm run dev`

## Licencia
MIT