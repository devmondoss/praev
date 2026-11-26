# 10 · PRAEV Pay — pagos y recargas no custodiales

## Principio económico

El usuario paga por acceder a inteligencia, no por apostar ni participar en el resultado. Precio fijo antes de pagar. El autor recibe remuneración independientemente de si ocurre el evento. No saldo interno mantenido por PRAEV, no pooling, no depósitos a cuentas controladas por el equipo, no derecho unilateral sobre fondos de clientes.

## Compra MVP en Stellar Testnet

1. Vendedor publica oferta (ID, hash del informe, precio, activo, comisión si existe, vencimiento y términos).
2. Comprador revisa contenido de muestra, precio total, destinatarios, red y costo de transacción estimado.
3. App prepara transacción de compra; wallet del comprador simula/revisa y firma. PRAEV nunca pide frase semilla ni clave privada.
4. Router ejecuta transferencias autorizadas desde comprador a vendedor y receptor de comisión si aplica, atómicamente. No retiene fondos.
5. Indexador verifica confirmación, contrato, asset, términos y `purchase_id`; servicio concede acceso una sola vez. Entitlement vinculado a identidad/dirección; requiere prueba de control al acceder.
6. Usuario recibe enlace de transacción, recibo, estado de acceso y soporte si hubo fallo.

Activo: USDC de prueba oficial si existe y es utilizable en testnet con la configuración elegida; si no, activo de prueba explícitamente etiquetado `TEST_USD`, sin valor monetario ni afirmación de ser USDC. Identificar emisor/contrato y decimales en README; bloquear confusión con mainnet. En producción, verificar activos oficiales y trustline o configuración necesaria según tipo de cuenta, activo y wallet.

Ejemplo económico ilustrativo: informe 3 unidades, comisión hipotética 10% (0.3), vendedor 2.7; fee de red separado y revelado. No es precio real ni comisión decidida. La fórmula usa enteros en unidades mínimas: `fee = floor(total * fee_bps / 10000); seller = total - fee`. Validar rango y overflow. P0 puede usar fee 0 para simplificar y luego habilitar split con pruebas.

## Recarga de cuenta (wallet, no balance interno)

`Funding` significa que el titular aporta fondos a su wallet Stellar. La app muestra dirección, red, activo y requisitos de cuenta, con confirmación explícita y QR; nunca instruir enviar a un wallet del equipo. MVP: flujo guiado para obtener fondos de prueba en una cuenta de testnet (fuente de faucet/activo a verificar) y detectar saldo confirmado. Lectura del balance de cadena; no acreditación contable por promesa de pago. En producción, una integración de on-ramp externa debe realizar el envío directamente a la wallet del usuario y explicitar comisiones, red, KYC y jurisdicciones. No prometer proveedor, fiat disponible, bypass de controles o soporte de recargas hasta validar.

## Entrega y límites

Una transferencia atómica no asegura que un informe privado llegue correctamente: la entrega off-chain depende del servicio. Para P0, validar que el informe existe antes de publicar oferta, preparar contenido y habilitar recuperación idempotente con recibo. Si el comprador pagó y no recibió acceso, reconciliar; soporte y política de devolución clara. Un reembolso depende del vendedor o un mecanismo específicamente autorizado, no de reversibilidad garantizada. No usar escrow en P0; cualquier versión futura requiere auditoría de control, disputas y permisos.

## Riesgos y cumplimiento

No custodial es objetivo arquitectónico, no dictamen regulatorio. Analizar control real de fondos/claves, fees, roles administrativos, AML/KYC de terceros, impuestos, propiedad intelectual de contenido y reglas de mercado en cada jurisdicción antes de mainnet. Evitar lenguaje de rendimiento, inversión o apuestas. Sin token propio especulativo. No lanzar dinero real en la buildathon: las bases piden testnet.

## Pruebas

Saldo insuficiente, red errónea, activo incorrecto, firma rechazada, oferta vencida, términos alterados, duplicate purchase ID, transferencia fallida, evento duplicado, retraso de RPC, pago confirmado sin acceso, reintento de entrega y verificación de que router no conserva saldo. Mostrar recibo real de testnet y cambios en balances de comprador/vendedor.
