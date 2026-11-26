# Praev Pay, pagos no custodiales

**Estado:** P1 opcional, fuera de P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

Visión: pago fijo por informe o financiación de pregunta, sin depender de outcome. Transferencia USDC de wallet comprador a destinatario identificado mediante transacción autorizada; Praev no mantiene saldo, claves ni permiso unilateral. Si se agrega split futuro, atomicidad, asset/issuer allowlist y receipt idempotente; no escrow especulativo. Revisión legal antes de producción; contrato por sí solo no demuestra no custodia.

P0 no checkout, recarga, balance ni token. Si P0 cerrado y se aprueba P1: testnet, verificar asset y dirección oficial Circle, trustline, fee, amount en stroops/unidades según asset, confirmar receipt, etiqueta “sin valor real”. Si activo de prueba distinto, no llamarlo USDC. No hardcode issuer sin docs verificadas. Onramp futuro directamente a wallet del usuario, tercero responsable del flujo. No usar claves reales.

Criterio P1: pago fijo sin pool ni outcome, autorización del usuario, tx verificable y no pago duplicado. La prueba tecnológica principal no depende de dinero. No implementar por cumplir cuota de Stellar: forecast/resolution son núcleo.
