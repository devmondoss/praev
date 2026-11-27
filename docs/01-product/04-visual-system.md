# Sistema visual y responsive

**Estado:** P0; shell implementado (HU-26) · **Versión:** 1.1 · **Fecha:** 2026-11-27

Identidad editorial, analítica, sobria. No tarjetas de apuestas, porcentajes verdes/rojos como BUY/SELL ni gráficos decorativos de precios. Tipografía Inter o system fallback; números tabulares. Tokens: bg #F8FAFA, surface #FFFFFF, ink #172526, muted #526568, accent #12665A, border #DCE5E4, focus #205CC0, warning #9A5500. Verificar contraste WCAG AA; no depender solo de color.

Layout escritorio max 1280px, padding 32px, grid 12 columnas gap 24; detalle 8/4. Tablet 24px y 2 columnas; móvil 16px, una columna; breakpoint 768/1024. Header 64px, títulos 32/24, cuerpo 15–16, etiquetas 12–13, espaciado múltiplos de 4/8, radios 8–12. Usar componentes Tailwind simples; no agregar biblioteca pesada. Tablas con scroll accesible y resumen móvil.

Estados: skeleton breve, sin dato, pendiente, fallo, demo, confirmado, invalidado. Ninguna cifra ficticia sin etiqueta. Todo campo tiene label visible, foco y mensaje de error; gráficos con tabla equivalente. No hero gigante que empuje el radar. Iconos consistentes, decoración mínima.

## Implementación (HU-26, 27 nov)

- **Tokens** en `src/app/globals.css` (`:root` + `@theme inline` de Tailwind 4). Contraste WCAG calculado por `tests/unit/visual-system.test.ts` sobre los valores reales del CSS:

| Token | sobre `bg` | sobre `surface` |
|---|---:|---:|
| ink | 15,08 | 15,80 |
| muted | 5,86 | 6,14 |
| accent | 6,52 | 6,83 |
| warning | 5,46 | 5,72 |
| focus | 5,98 | 6,26 |

  Texto blanco sobre `accent`: 6,83. Todos superan 4,5:1 (AA texto normal); el anillo de foco supera 3:1.
- **Shell** en `src/components/ui/`: header con `praev.`, Radar, Makers, Proponer, Metodología, indicador Testnet (texto + punto, no solo color) y botón de wallet deshabilitado hasta HU-30; footer con Metodología, Fuentes, repositorio y disclaimer. El ítem activo lleva `aria-current="page"` y subrayado. Con Cache Components, `usePathname` va dentro de `Suspense` para no bloquear rutas dinámicas como `/q/[id]`.
- **Accesibilidad:** enlace "Saltar al contenido", `main` enfocable, foco visible global (`:focus-visible`), objetivos táctiles de 44 px (`min-h-11`), `lang="es"`. 404 honesto en `not-found.tsx`.
- **Layout:** max 1280 px; padding 16/24/32 px en móvil/tablet/escritorio; en móvil la navegación pasa a una segunda fila sin menú JS.
- **Pendiente de verificar a mano en navegador:** ancho 360 px, zoom 200 % y lector de pantalla. No se declara cumplido hasta probarlo (08-copy-accessibility); queda en la checklist de HU-40.
