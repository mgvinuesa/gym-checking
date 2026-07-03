# Decisiones de arquitectura

Las decisiones técnicas relevantes se documentarán como Architecture Decision
Records (ADR). La especificación funcional describe qué debe hacer el producto;
los ADR explican por qué se elige una solución técnica concreta.

## Convención

- `0001-titulo-de-la-decision.md`
- Estados: propuesta, aceptada, reemplazada o descartada.
- Una decisión reemplazada se conserva y enlaza a su sucesora.

## Decisiones

- [ADR-0001: Stack for the deployment spike](0001-deployment-spike-stack.md)

## Plantilla

```md
# ADR-NNNN: Título

- Estado: propuesta
- Fecha: AAAA-MM-DD

## Contexto

Problema y restricciones que motivan la decisión.

## Decisión

Solución elegida.

## Alternativas consideradas

Opciones descartadas y motivos.

## Consecuencias

Beneficios, costes, riesgos y trabajo posterior.
```
