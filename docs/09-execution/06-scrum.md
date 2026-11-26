# Plan Scrum

**Estado:** Vigente P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

Cómo organizamos el trabajo del 26 nov al 4 dic 2026. Las historias están en el [product backlog](07-product-backlog.md); el orden técnico de dependencias sigue el [backlog ejecutable](01-backlog.md).

## 1. Equipo y roles

| Rol Scrum | Quién | Responsabilidad |
|---|---|---|
| Product Owner | devmondoss | Prioriza el backlog, acepta o rechaza cada historia según sus criterios |
| Scrum Master | devmondoss | Protege el objetivo del sprint, registra bloqueos, aplica el orden de recorte |
| Equipo de desarrollo | devmondoss, con Claude Code como pair programmer | Implementa, prueba y documenta; todos los commits salen a nombre de devmondoss |

## 2. Sprints

Sprints cortos porque el plazo es de 9 días. Cada sprint cierra con un incremento desplegado y, cuando corresponde, con la solicitud de un hito en el Hub.

| Sprint | Fechas | Objetivo del sprint | Hito del Hub al cerrar |
|---|---|---|---|
| **S0 · Arranque** | Jue 26 nov | El proyecto arranca: la app vacía está desplegada con health, el toolchain Stellar está listo y la fuente LIVE tiene decisión GO/NO-GO | — |
| **S1 · Ciclo on-chain** | Vie 27 – Dom 29 nov | Una pregunta DEMO se crea, recibe pronósticos y se resuelve en Stellar Testnet desde la CLI, y la app la muestra en el Radar | Integración Stellar en testnet (10) |
| **S2 · Producto usable** | Lun 30 nov – Mié 2 dic | Un visitante sigue el ciclo completo desde la web: pronostica con su wallet, ve el pronóstico del agente de IA, registra su decisión y verifica la prueba | Funcionalidad (5) |
| **S3 · Release** | Jue 3 – Vie 4 dic | praev está listo para el jurado: E2E real en testnet, README con evidencia, video y entrega en APEX antes de las 18:00 | Pruebas, documentación o demo (5) |

Hay commit en `main` **todos los días**. Así se suman los 5 puntos de constancia en cada una de las dos semanas del Hub (23–29 nov y 30 nov–6 dic).

### Plan día a día (backend y frontend en paralelo)

| Día | Backend / contrato | Frontend | Cierre del día |
|---|---|---|---|
| Jue 26 (S0) | HU-01, HU-02, HU-03, HU-05 | HU-04 (deploy vacío) | App en Vercel, toolchain listo, GO/NO-GO |
| Vie 27 (S1) | HU-07, HU-08, HU-13, HU-14 | HU-26 (shell y sistema visual) | Dominio y contrato con tests en verde |
| Sáb 28 (S1) | HU-15, HU-16, HU-17, HU-18, HU-22 | HU-27 con datos de ejemplo tipados | **Contrato en testnet**, primera pregunta creada |
| Dom 29 (S1) | HU-06, HU-09, HU-10, HU-12, HU-19, HU-20, HU-23, HU-24 | HU-27 conectado a la API | Ciclo DEMO resuelto y visible · **Review S1** |
| Lun 30 (S2) | HU-25 (**LIVE antes de medianoche**), HU-21 | HU-28, HU-30 | Detalle de pregunta y wallet conectada |
| Mar 1 (S2) | HU-31 (prepare/submit), HU-11 | HU-31 (formulario), HU-32, HU-35, HU-36 | Pronóstico humano confirmado desde la web |
| Mié 2 (S2) | HU-33, HU-34 | HU-37, HU-38 | Agente real y verificador · **Review S2** |
| Jue 3 (S3) | HU-39, HU-40 | HU-29, ajustes de UX | E2E documentado, borrador del video |
| Vie 4 (S3) | HU-41, renovación de TTL | HU-42 | Entrega en APEX antes de las 18:00 · **Review final** |

El frontend no espera al backend: consume los tipos de `src/domain` y datos de ejemplo tipados hasta que la API correspondiente está lista. Esos datos se eliminan al conectar la API real y nunca llegan a producción como si fueran reales.

## 3. Ceremonias (adaptadas a un desarrollador)

| Ceremonia | Cuándo | Duración | Salida |
|---|---|---|---|
| Sprint Planning | Inicio de cada sprint | 30 min | Objetivo del sprint y su archivo `sprints/sprint-N.md` con las historias y tareas |
| Daily | Cada mañana | 5 min, por escrito | Entrada en el log del sprint: ayer, hoy, bloqueos |
| Sprint Review | Último día del sprint | 30 min | Demo del incremento, evidencia (tx, URL, tests), historias aceptadas o devueltas, hito del Hub si aplica |
| Retrospectiva | Tras la review | 10 min | Qué mantener, qué cambiar y una acción concreta para el siguiente sprint |
| Refinamiento | Cuando una historia no cumple la DoR | Lo necesario | Historia dividida, aclarada o con nuevos criterios |

## 4. Definition of Ready

Una historia entra en un sprint solo si:
- tiene criterios de aceptación verificables y enlaza a su documento dueño;
- sus dependencias están hechas o se hacen antes en el mismo sprint;
- está estimada y mide 8 puntos o menos;
- no convierte una hipótesis ni un P1 en trabajo P0.

## 5. Definition of Done

Una historia está hecha cuando cumple la DoD de [AGENTS.md](../../AGENTS.md) y además:
- todos sus criterios de aceptación se comprobaron de verdad, nunca se marcan sin ejecutarlos;
- los tests pertinentes pasan (`cargo test`, Vitest o Playwright según el track);
- el documento dueño está actualizado, o hay un ADR si cambió la semántica;
- está integrada en `main` con commits pequeños, sin merge commits;
- si toca la cadena, hay una tx real con `SUCCESS` y su evento reconciliado;
- si toca la UI, está desplegada en Vercel y probada en móvil y con teclado.

El sprint está hecho cuando su objetivo se cumple y la [checklist de release](05-release.md) avanza sin retrocesos.

## 6. Tablero

Columnas: **Backlog → Sprint → En curso → En revisión → Hecho**. Como máximo 2 historias en curso a la vez (una de backend y una de frontend). Si se puede, se refleja en GitHub Projects con una issue por historia (`HU-xx`), pero la fuente de verdad del alcance es el product backlog.

## 7. Capacidad y plan de recorte

S1 y S2 suman unos 110 puntos en 6 días, un ritmo ambicioso incluso con pair programming con IA. La velocidad real de S0 se mide hoy. Si al cerrar un día el sprint va con más de medio día de retraso, se aplica el orden de recorte del [backlog ejecutable](01-backlog.md), de arriba abajo:

1. HU-05: spike limitado a 2 h; si no hay GO, solo DEMO y bloqueo LIVE visible (HU-25 sale del sprint).
2. HU-31: sin `tx_intents` completos; el cliente firma y envía con los bindings y el servidor reconcilia por hash.
3. HU-19: cursor de `getEvents` + `getTransaction`, sin `raw_xdr` ni gestión de huecos.
4. HU-36: calculadora de umbral con un solo snapshot, sin historial ni export.
5. HU-40: los E2E de Playwright pasan a una checklist manual; Vitest y `cargo test` se mantienen.

**No se recortan:** HU-13 a HU-17 (contrato), HU-22 a HU-24 (ciclo CLI), HU-33 y HU-34 (agente con LLM real), HU-37 y HU-38 (verificación) ni el ciclo DEMO resuelto en testnet.

## 8. Plantilla de sprint

Cada `sprints/sprint-N.md` usa esta estructura:

```markdown
# Sprint N · <nombre>
**Fechas:** … · **Objetivo:** …

## Sprint backlog
| Historia | Pts | Estado | Tareas |

## Daily log
### <fecha>
- Ayer: …
- Hoy: …
- Bloqueos: …

## Review
Incremento, evidencia (tx, URL, tests), historias aceptadas y devueltas, hito del Hub.

## Retrospectiva
Mantener · Cambiar · Acción
```
