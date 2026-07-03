# Visión técnica

Este documento separa las decisiones técnicas de la especificación funcional.
Las tecnologías indicadas son una propuesta inicial y deberán confirmarse
mediante decisiones de arquitectura registradas.

## 1. Objetivos técnicos

- Una única experiencia mobile-first accesible también desde web.
- Infraestructura mínima para unos pocos cientos de usuarios.
- Bajo coste operativo y despliegues sencillos.
- Consistencia fuerte en reservas, aforos y límites semanales.
- Autorización verificable en servidor y base de datos.
- Evolución incremental sin introducir microservicios prematuramente.

## 2. Arquitectura propuesta

Monolito modular con una aplicación web progresiva y PostgreSQL.

Módulos iniciales:

- Identidad y acceso.
- Alumnos y tarifas.
- Horarios habituales.
- Calendarios y sesiones.
- Derechos semanales.
- Reservas.
- Publicación y asignación.
- Auditoría.
- Notificaciones futuras.

Las reglas esenciales deben aplicarse en los casos de uso del servidor y estar
reforzadas por restricciones y transacciones de la base de datos.

## 3. Stack candidato

- Next.js y React para una PWA responsive.
- TypeScript en cliente y servidor.
- PostgreSQL como base de datos relacional.
- Supabase como candidato para base de datos gestionada y autenticación.
- Tailwind CSS y componentes accesibles para la interfaz.
- Zod para validación en límites del sistema.
- Vitest para pruebas unitarias y de integración próximas al dominio.
- Playwright para recorridos de usuario completos.

La elección definitiva y sus alternativas se documentarán mediante ADR.

## 4. Principios de implementación

- El cliente no decide si una reserva es válida.
- Reservar, mover o cancelar se ejecuta transaccionalmente.
- Publicar una semana es repetible de forma segura y no crea duplicados.
- Las semanas publicadas conservan una fotografía de los derechos y reglas
  relevantes, evitando que cambios posteriores reescriban el pasado.
- Las excepciones son datos explícitos, no modificaciones silenciosas.
- Las bajas funcionales preservan el historial necesario.
- Las migraciones de base de datos se versionan junto al código.

## 5. Seguridad

- Registro por invitación, sin alta pública durante el MVP.
- Roles comprobados en servidor.
- Row Level Security si se adopta Supabase.
- Principio de mínimo privilegio.
- Secretos separados por entorno.
- Auditoría de excepciones administrativas.
- Recopilación mínima de datos personales y consideración del RGPD.

## 6. Despliegue candidato

- Aplicación Next.js en una plataforma gestionada.
- Supabase/PostgreSQL en región europea cuando sea posible.
- Entornos separados para desarrollo, pruebas y producción.
- Dominio propio, HTTPS, seguimiento de errores y copias de seguridad.

Antes de producción se compararán Vercel y Cloudflare para el frontend y se
confirmarán costes, límites, región y estrategia de restauración.

## 7. Estrategia de pruebas

- Pruebas unitarias para cálculo de derechos y reglas de asignación.
- Pruebas de integración para publicación y transacciones de reservas.
- Pruebas de concurrencia sobre la última plaza disponible.
- Pruebas de autorización por rol y propietario.
- Pruebas end-to-end de los recorridos de administrador y alumno.
- Accesibilidad con WCAG 2.2 AA como objetivo.

## 8. Decisiones técnicas pendientes

- Proveedor definitivo de autenticación y PostgreSQL.
- Plataforma de despliegue.
- Estrategia de acceso a datos y migraciones.
- Mecanismo de tareas programadas y notificaciones.
- Observabilidad y retención de registros.
- Estrategia de copias de seguridad y restauración.
- Forma de representar y ejecutar la publicación semanal de manera idempotente.
