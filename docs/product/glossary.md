# Glosario de dominio

| Término | Definición |
| --- | --- |
| Administrador | Responsable que gestiona alumnos, tarifas, calendarios, sesiones y excepciones. |
| Alumno | Usuario que consulta y gestiona sus propias reservas. |
| Tarifa | Modalidad que concede un número de sesiones por semana. |
| Membresía | Asignación vigente de una tarifa a un alumno. |
| Horario prefijado | Día y hora recurrentes usados para intentar una asignación automática. |
| Calendario semanal | Conjunto de sesiones ofrecidas durante una semana concreta. |
| Sesión | Clase concreta con inicio, fin y aforo. En conversaciones iniciales también se denominó *slot*. |
| Derecho semanal | Unidad disponible para reservar una sesión durante una semana. |
| Reserva habitual | Reserva creada automáticamente desde un horario prefijado. |
| Recolocación | Uso de un derecho o cambio de una reserva en otra sesión de la misma semana. |
| Derecho pendiente | Derecho semanal que todavía no está consumido por una reserva. |
| Problema de asignación | Explicación persistida de por qué un horario prefijado no produjo una reserva. |
| Periodo protegido | Primera fase tras publicar, destinada a revisar y recolocar reservas. |
| Periodo abierto | Fase posterior en la que se ocupan las plazas restantes respetando la tarifa. |
| Aforo | Número ordinario máximo de reservas de una sesión. |
| Sobreaforo | Reserva por encima del aforo autorizada expresamente por un administrador. |
| Excepción administrativa | Operación autorizada que ignora una regla ordinaria y queda registrada. |

## Lenguaje recomendado en la interfaz

- Usar **sesión** o **clase**, no *slot*.
- Usar **sesiones disponibles esta semana**, no *créditos*, salvo que las pruebas
  con usuarios demuestren que ese término se entiende mejor.
- Usar **horario habitual**, no *preferencia recurrente*.
- Usar **te queda una sesión por colocar**, no *asignación fallida*.
