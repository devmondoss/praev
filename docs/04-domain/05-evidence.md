# Evidence Engine y procedencia

**Estado:** P0 · **Versión:** 1.0 · **Fecha:** 2026-11-26

Objeto `Evidence`: id UUID, questionId, purpose `forecast|resolution`, mode, URL/URI, sourceLabel, publishedAt (nullable), retrievedAt, mime, bytes SHA256, bytes almacenados, metadata JSON, note. Conservar bytes exactos de CSV/JSON o extracto permitido, no reserializar al verificar. Para documentos de tercero, respetar términos y licencias: si no se puede conservar/publicar, usar hash y referencia, advertir limitación; elegir otra fuente si impide resolver auditablemente.

Fuentes predictivas pueden divergir; guardar supporting y contradicting IDs, sin inventar que corroboran. `publishedAt` desconocido no sirve para validar cutoff de agente, salvo fixture marcado. Evidence manifest de resolución enumera IDs, hashes, fuente, ventana, unidad, observaciones normalizadas, regla y outcome; hash del manifest ancla conjunto, no solo archivo aislado.

Sanitizar metadata, render texto plano, permitir únicamente URL HTTPS revisada, no ejecutar HTML/documentos. El agente no elige URLs arbitrarias. Aceptación: modificar un byte da mismatch; enlace roto se reporta como evidencia no disponible; fixture no aparece como oficial.
