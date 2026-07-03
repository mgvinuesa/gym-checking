# Gym Checking

Aplicación mobile-first para planificar el calendario semanal de un gimnasio y
gestionar automáticamente las reservas habituales de sus alumnos.

El gimnasio no dispone de un horario fijo: cada semana el administrador publica
las sesiones disponibles. La aplicación cruza ese calendario con los horarios
prefijados de cada alumno, crea las reservas posibles y muestra los derechos
semanales que todavía deben recolocarse.

## Estado

El proyecto se encuentra en fase de definición funcional. Todavía no se ha
seleccionado ni inicializado un framework de aplicación.

## Documentación

- [Especificación funcional](docs/product/functional-specification.md)
- [Glosario de dominio](docs/product/glossary.md)
- [Visión técnica](docs/architecture/technical-vision.md)
- [Decisiones de arquitectura](docs/decisions/README.md)

## Principios del producto

- La tarifa concede un número de sesiones por semana.
- Los horarios prefijados son una asignación habitual, no una obligación fija.
- La aplicación asigna automáticamente las sesiones habituales que existan.
- Los derechos no asignados se recolocan dentro de la misma semana.
- Un alumno nunca puede superar su tarifa ni el aforo de una sesión.
- El administrador puede autorizar excepciones, que quedan identificadas.
- La experiencia principal está diseñada para móvil y también funciona en web.
