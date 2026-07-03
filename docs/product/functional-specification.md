# Especificación funcional

## 1. Propósito

Gym Checking ayuda a un gimnasio con calendario variable a organizar sus
sesiones semanales y las reservas de sus alumnos.

Cada sábado, o en el momento que determine, el administrador prepara las
sesiones de la semana siguiente. Los alumnos tienen una tarifa con un número de
sesiones semanales y unos horarios habituales prefijados. Como el gimnasio no
abre siempre los mismos días y horas, esos horarios no siempre pueden
materializarse y deben poder recolocarse dentro de la semana.

## 2. Objetivos

- Reducir el trabajo manual del administrador.
- Asignar automáticamente las plazas habituales cuando estén disponibles.
- Mostrar claramente al alumno sus reservas y derechos pendientes.
- Impedir que un alumno reserve por encima de su tarifa.
- Controlar el aforo, salvo excepción explícita del administrador.
- Evitar que el alumno tenga que confirmar cada semana sus reservas habituales.
- Mantener una experiencia sencilla, mobile-first y disponible también en web.

## 3. Alcance del MVP

### Incluido

- Autenticación por invitación.
- Autorización con roles de administrador y alumno.
- Gestión de alumnos, tarifas y horarios prefijados.
- Creación y publicación de calendarios semanales variables.
- Gestión de sesiones, horarios y aforos.
- Asignación automática de reservas habituales.
- Identificación de derechos semanales no asignados.
- Recolocación manual dentro de la misma semana.
- Inscripción, cambio y cancelación de reservas.
- Excepciones administrativas de aforo y límite semanal.
- Historial mínimo de operaciones administrativas.

### Fuera del MVP

- Asignación automática basada en preferencias alternativas.
- Algoritmos de prioridad o desempate.
- Lista de espera y promoción automática.
- Penalización por cancelación tardía.
- Traslado de derechos entre semanas.
- Control de asistencia.
- Pagos y facturación.
- Aplicación nativa publicada en tiendas.
- Funcionalidad completa para entrenadores.

Estas capacidades deberán poder añadirse sin alterar los conceptos centrales
del dominio.

## 4. Actores y permisos

### Administrador

Puede:

- Crear, editar, desactivar y reactivar alumnos.
- Crear y modificar tarifas.
- Asignar una tarifa y horarios prefijados a un alumno.
- Crear, copiar, modificar, publicar y cerrar una semana.
- Crear, modificar y cancelar sesiones.
- Cambiar el aforo de una sesión.
- Revisar el resultado de la asignación antes de publicar.
- Crear, mover y cancelar reservas.
- Conceder sesiones adicionales a un alumno.
- Añadir alumnos por encima de su tarifa o del aforo.
- Consultar las excepciones y operaciones realizadas.

### Alumno

Puede:

- Iniciar sesión y consultar su perfil y tarifa.
- Consultar el calendario semanal.
- Ver sus reservas automáticas y manuales.
- Ver cuántos derechos semanales tiene pendientes.
- Conocer qué horario habitual no pudo asignarse y por qué.
- Reservar una plaza disponible dentro de su límite semanal.
- Mover o cancelar una reserva mientras las reglas lo permitan.

### Entrenador futuro

El rol se contempla para una fase posterior. Podrá consultar las sesiones que
imparte y sus participantes; el alcance definitivo queda pendiente.

## 5. Conceptos funcionales

### Tarifa

Concede al alumno `N` sesiones por semana. Podrán existir tarifas de una, dos,
tres o más sesiones.

En el MVP todas las sesiones consumen una unidad. Las restricciones por tipo de
clase o franja horaria se posponen, aunque el diseño debe admitirlas después.

### Horario prefijado

Preferencia recurrente del alumno expresada mediante día de la semana y hora,
por ejemplo lunes, martes y jueves a las 19:30.

Es la primera opción para la asignación automática, pero no garantiza que el
gimnasio ofrezca una sesión compatible cada semana.

### Calendario semanal

Plan de sesiones ofrecidas durante una semana concreta. Su estructura puede
variar completamente de una semana a otra.

### Sesión

Clase concreta con fecha, hora de inicio, hora de fin y aforo. Habitualmente
dura una hora, pero el modelo no fija esa duración.

### Derecho semanal

Unidad que permite reservar una sesión durante una semana. Los derechos se
originan en la tarifa y pueden complementarse mediante una excepción del
administrador.

### Reserva

Asignación de un alumno a una sesión. Puede proceder de un horario habitual, de
una recolocación, de una reserva libre o de una intervención administrativa.

## 6. Ciclo de vida semanal

### 6.1 Borrador

El administrador crea la semana, preferiblemente copiando una anterior, y
configura sus sesiones. Los alumnos todavía no pueden operar sobre ella.

### 6.2 Previsualización

El sistema simula la publicación y muestra:

- Reservas habituales que se crearán.
- Horarios prefijados sin una sesión compatible.
- Conflictos de aforo.
- Alumnos cuya configuración habitual no cubre su tarifa.

La previsualización no altera reservas ni derechos.

### 6.3 Publicación

Al publicar:

1. Se determinan los derechos de cada alumno según su tarifa vigente.
2. Se busca una sesión exacta para cada horario prefijado.
3. Se crean las reservas habituales compatibles.
4. Se registran los intentos que no pudieron asignarse.
5. Los derechos restantes quedan disponibles para recolocación.

Las reservas habituales se consideran confirmadas y no requieren acción del
alumno.

### 6.4 Periodo protegido

Tiene una fecha de inicio y fin configurable. Durante el MVP, el alumno puede:

- Mantener sus reservas automáticas.
- Mover o cancelar una reserva.
- Recolocar manualmente un derecho pendiente en una sesión con plaza.

No se asignan automáticamente alternativas ni se resuelven empates.

### 6.5 Periodo abierto

El alumno puede ocupar cualquier plaza disponible que cumpla las reglas, pero
nunca superar el número de sesiones concedido para esa semana.

### 6.6 Cierre

La semana deja de aceptar cambios. Los derechos sin utilizar caducan y no se
trasladan a otra semana en el MVP.

## 7. Reglas de negocio

### RB-01. Límite semanal del alumno

Un alumno no puede mantener más reservas que los derechos concedidos para la
semana.

### RB-02. Excepción administrativa al límite

El administrador puede conceder derechos adicionales o crear una reserva que
no consuma derecho. La excepción debe quedar identificada.

### RB-03. Aforo

Un alumno solo puede reservar si existe una plaza disponible.

### RB-04. Excepción administrativa al aforo

El administrador puede crear una reserva por encima del aforo tras recibir una
advertencia explícita. La sesión debe mostrar el sobreaforo resultante.

### RB-05. Asignación habitual automática

Al publicar una semana, una preferencia habitual produce una reserva automática
si existe una sesión con el mismo día y hora y la asignación es posible.

### RB-06. Ausencia de sesión habitual

Si no existe una sesión compatible, no se consume el derecho y se registra el
motivo para mostrárselo al alumno.

### RB-07. Recolocación semanal

Un derecho no asignado solo puede utilizarse en otra sesión de la misma semana.

### RB-08. Sin confirmación

Las reservas habituales se asumen confirmadas desde la publicación.

### RB-09. Cambio de reserva

Mover una reserva debe ser una operación indivisible. Si la nueva plaza no
puede obtenerse, la reserva original se conserva.

### RB-10. Cancelación en el MVP

Una cancelación anterior al comienzo de la sesión devuelve el derecho para esa
misma semana. Las penalizaciones por antelación se incorporarán posteriormente.

### RB-11. Sin reservas adicionales del alumno

Aunque existan plazas libres, un alumno no puede superar el límite semanal de
su tarifa.

### RB-12. Duración flexible

Las sesiones tienen inicio y fin configurables. Una hora es el valor habitual,
no una restricción del sistema.

### RB-13. Sin solapamientos

Un alumno no puede tener dos reservas activas que se solapen.

### RB-14. Empates

El MVP no asigna automáticamente una alternativa cuando varios alumnos podrían
optar a ella. Los alumnos reservan manualmente las plazas abiertas.

## 8. Casos de uso principales

### CU-01. Gestionar un alumno

El administrador crea o actualiza al alumno, su tarifa, vigencia y horarios
prefijados. El sistema advierte si el número de horarios no coincide con las
sesiones semanales o si existe un conflicto habitual de capacidad.

### CU-02. Preparar una semana

El administrador crea una semana vacía o copia otra, genera las sesiones y
ajusta horarios y aforos individualmente.

### CU-03. Previsualizar y publicar

El administrador revisa asignaciones y conflictos. Al confirmar, el sistema
crea derechos y reservas de forma consistente.

### CU-04. Consultar mi semana

El alumno ve las sesiones confirmadas, los derechos pendientes, la próxima
reserva y los problemas de asignación.

### CU-05. Recolocar un derecho pendiente

El alumno elige una sesión con plaza. El sistema comprueba semana, aforo,
solapamiento y límite antes de reservar.

### CU-06. Mover una reserva

El alumno selecciona una nueva sesión. El sistema realiza el cambio de forma
atómica o conserva la reserva anterior.

### CU-07. Cancelar una reserva

El alumno cancela y recupera el derecho de esa semana, mientras la sesión no
haya comenzado.

### CU-08. Aplicar una excepción

El administrador puede ignorar aforo o límite semanal de forma consciente. El
sistema advierte del incumplimiento y registra la operación.

## 9. Requisitos de experiencia de usuario

- Diseño prioritario para móvil y adaptado a escritorio.
- Lenguaje directo, evitando terminología técnica.
- La pantalla inicial muestra sesiones confirmadas y pendientes.
- Las acciones frecuentes deben poder realizarse con pocos pasos.
- Los estados no se comunicarán exclusivamente mediante color.
- Una excepción administrativa debe ser visible sin resultar alarmista.
- La estética será deportiva y enérgica, pero no agresiva ni recargada.

## 10. Requisitos no funcionales con impacto de producto

- La reserva de la última plaza debe ser segura ante acciones simultáneas.
- Ningún alumno puede consultar información privada de otro.
- Las operaciones administrativas excepcionales son trazables.
- Las semanas publicadas conservan su historial aunque cambien tarifas o
  preferencias posteriores.
- Fechas y horas se interpretan en la zona horaria configurada para el gimnasio.

## 11. Cuestiones pendientes

- Momento exacto en que una sesión deja de aceptar cambios.
- Contenido y obligatoriedad del motivo de una excepción administrativa.
- Tratamiento de una sesión cancelada después de publicar la semana.
- Política futura de cancelación tardía.
- Criterios futuros de preferencias, prioridades y desempate.
- Restricciones de tarifas por clase o franja horaria.
- Canales y eventos de notificación del MVP.
