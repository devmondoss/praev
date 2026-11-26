# 17 · Arranque del repositorio

## Estructura propuesta

El ZIP contiene documentación, no los directorios de código siguientes. Crearlos conforme se implemente, sin archivos vacíos que aparenten funcionalidad.

```text
praev/
├── README.md
├── docs/
│   └── 01-vision.md ... 17-repositorio.md
├── apps/
│   ├── web/                 # frontend
│   └── api/                 # servicios / indexador
├── contracts/
│   ├── registry/            # Rust/Soroban
│   └── payment-router/      # Rust/Soroban
├── packages/
│   ├── core/                # Brier, relevance, consensus, schemas
│   └── sdk/                 # cliente y canonización
├── examples/
│   └── agent/               # agente/CLI reproducible
├── fixtures/                # datos sintéticos, vectores de hash
├── tests/                   # integración y E2E
├── scripts/                 # despliegue, verificación, seed testnet
└── .github/workflows/       # CI
```

## Publicar la documentación

Extraer ZIP. Desde la carpeta raíz que contiene README:

```bash
git init
git add README.md docs/
git commit -m "docs: define PRAEV product and Stellar buildathon specification"
git branch -M main
git remote add origin <URL_REAL_DE_TU_REPO>
git push -u origin main
```

Si el repo remoto ya tiene commits, clonarlo y copiar README/docs en lugar de inicializar uno diferente; no forzar push. Registrar URL pública en Stellar Build Hub y confirmar que fue aceptada. No se ha creado ni publicado un repo desde este documento.

## Toolchain por decidir

Rust y toolchain WASM soportados por SDK Soroban actual, CLI Stellar, Node LTS, gestor de paquetes con lockfile, Postgres, wallet y RPC testnet. Verificar comandos oficiales de `stellar contract` y dependencias según versiones instaladas; no fijar ejemplos de comandos potencialmente obsoletos. Registrar `--version` y configuración reproducible. Añadir `.env.example` y `.gitignore` antes de guardar credenciales. Usar testnet exclusivamente y bloquear mainnet en P0.

Referencias para verificar: https://developers.stellar.org/ ; https://stellar.org/ ; https://github.com/stellar/rs-soroban-sdk . Estas son referencias de partida, no confirmación de integración. Consultar el Hub y canal oficial para fechas actualizadas.

## ADRs iniciales

| Decisión | Estado | Motivo |
|---|---|---|
| Stellar testnet como única red MVP | Aceptada para la especificación | Enfoque técnico y bases |
| Commit/reveal con ventanas separadas | Propuesta | Integridad y mitigación de copia |
| Relevance manual con rúbrica | Propuesta | Explicabilidad y plazo |
| Brier regularizado por dominio | Experimental | Mostrar historial sin exceso de confianza |
| Direct settlement sin escrow | Propuesta | Minimizar control sobre fondos |
| Indexer + DB para lecturas | Propuesta | UX y cálculo reproducible |
| Resolución de confianza centralizada P0 | Limitación explícita | Tiempo y fuente externa |
| Asset, wallet y versiones | Pendiente | Requiere verificación técnica |
| Licencia, comisión, marca | Pendiente | Decisión del equipo |

## Convenciones de trabajo

Issues `P0 / P1 / P2`, PR con criterio de aceptación y evidencia, commits descriptivos. Revisar seguridad de contratos con otra persona cuando sea posible. Documentar uso de IA y código previo con procedencia, licencia y cambios del periodo; no copiar documentos privados al repo. Añadir sección `Team`, `AI usage`, `Prior/third-party code`, `Deployment`, `Run locally`, `Tests` y `Known limitations` al README cuando haya datos reales. No inventar integrantes, direcciones, credenciales o enlaces.
