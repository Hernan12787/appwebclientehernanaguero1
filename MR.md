# MR — Catálogo y detalle de productos generados desde JavaScript

## Descripción

Explicá brevemente qué hiciste y qué archivos modificaste o agregaste:

Saqué del HTML las tarjetas de producto que estaban **hardcodeadas** y las pasé a
un archivo JavaScript nuevo, **`producto.js`**, que las construye con la API DOM
(`document.createElement`) a partir de un único array de datos llamado
`productos`. Ahora el contenido de los productos vive en un solo lugar (los datos)
y las dos vistas del sitio que los muestran comparten la misma fuente.

La lista de productos quedó en formato JSON dentro de `producto.js`: cada ítem
tiene `id`, `slug`, `clase`, `imagen` (`src` + `alt`), `titulo`, `descripcion`
(para el detalle), `descripcionCatalogo` (texto corto para el catálogo),
`especificaciones` (las viñetas del detalle) y `volver` (texto y URL del enlace al
catálogo). El mismo array alimenta las dos páginas.

Archivos agregados:

- **`producto.js`** — el array `productos` (los 4 productos: Coca-Cola, Sprite,
  Fanta y Schweppes) más tres funciones:
  - `crearProductoCatalogo(producto)` arma la tarjeta del catálogo:
    `article.producto producto-<marca>` con `img`, `h4`, `p` y el `<a>` "Ver
    detalle" apuntando a `producto.html?id=<slug>`.
  - `crearProductoDetalle(producto)` arma la ficha del detalle:
    `article.producto-detalle` con `img`, `h4`, `p`, la `<ul>` de
    especificaciones y el enlace "Volver al catálogo".
  - `renderProductos()` busca el contenedor `#productos` y decide qué renderizado
    usar según el contenedor: si tiene la clase `item-cards` es el **catálogo**
    (index), si no es el **detalle** (producto.html). Se ejecuta en
    `DOMContentLoaded`.
- Todo el texto y las imágenes se cargan con `textContent`, `src` y atributos,
  **nunca con `innerHTML`**, así que nada se interpreta como HTML.

Archivos modificados:

- **`index.html`** — borré las 4 tarjetas `<article class="producto producto-*">`
  hardcodeadas del catálogo y las reemplacé por
  `<div class="item-cards" id="productos"></div>`. Agregué
  `<script src="producto.js"></script>` después de `archivo.js`.
- **`producto.html`** — borré las 4 fichas `<article class="producto-detalle">`
  hardcodeadas y las reemplacé por `<div id="productos"></div>`. Agregué
  `<script src="producto.js"></script>` después de `archivo.js`.
- **`style.css`** — se agregó una regla nueva para `#detalle #productos`
  (`display:flex`, `flex-wrap`, `gap`, `flex-basis:100%`) para que el contenedor
  del detalle mantenga el mismo layout de fila centrada que tenían las fichas
  sueltas dentro del `#detalle` flex. La regla está acotada con `#detalle` para
  no pisar la grilla `.item-cards` del catálogo. No se tocó ninguna otra regla:
  las clases que genera el JS (`.producto producto-*`, `.producto-detalle`) son
  las mismas que ya usaba el CSS, así que los estilos y los breakpoints siguen
  aplicando igual.
- **`Predictions.md`** — se agregó el punto "crear un js de producto y reemplazar
  en el codigo" a la lista de consignas.

Dos detalles que hubo que resolver:

- **El buscador del catálogo es solo HTML/CSS.** El filtro de marcas
  (`style.css`) usa selectores como
  `#f-coca-cola:checked ~ #catalogo .item-cards .producto-coca-cola`, así que las
  tarjetas generadas por JS **tienen que conservar** las clases
  `producto producto-<marca>`. Por eso `producto.js` arma exactamente esas clases
  (campo `clase` de cada producto).
- **La vista de detalle no tenía un contenedor común.** Antes las fichas eran
  hijas directas del `#detalle` (que es `display:flex`). Al meterlas dentro de un
  `div#productos` para poder inyectarlas, ese div pasaba a ser un único flex item
  y las fichas se apilaban. Se resolvió con la regla `#detalle #productos` del
  punto anterior, dejando el mismo resultado visual que antes.

## Cómo probarlo

Pasos para que el profesor pueda correr o revisar el cambio (comandos, URL, capturas de pantalla si aplica):

No hace falta servidor ni instalar nada: es un sitio estático y se abre con doble click.

1. Abrir **`appwebclientehernanaguero1/index.html`**. En la sección
   "Nuestros productos" tienen que verse las 4 tarjetas (Coca-Cola, Sprite, Fanta
   y Schweppes) con imagen, título, descripción y el enlace **"Ver detalle"**,
   igual que antes del cambio.
2. Confirmar que las tarjetas **no están en el HTML**: en DevTools → *Elements*,
   el `#catalogo` ahora tiene `<div class="item-cards" id="productos">` y las
   `article.producto` aparecen generadas dentro (en DevTools → *Sources* salen
   desde `producto.js`). O desde PowerShell:
   ```powershell
   Select-String -Path appwebclientehernanaguero1\index.html -Pattern "producto-coca-cola"
   # No debe devolver nada: las tarjetas ya no están en el HTML
   ```
3. **Buscador de marcas**: probar el filtro por marca (Coca-Cola, Sprite, Fanta,
   Schweppes) y "Todas". Las tarjetas generadas por JS tienen que seguir
   apareciendo/ocultándose igual que antes, porque conservan las clases
   `producto-*`.
4. Clic en **"Ver detalle"** de cualquier tarjeta: tiene que abrir
   `producto.html?id=<slug>` (coca-cola, sprite, fanta o schweppes).
5. Abrir **`appwebclientehernanaguero1/producto.html`**. Tienen que verse las 4
   fichas de detalle con imagen, título, descripción, la lista de
   especificaciones ("Contenido neto", "Presentación", "Precio sugerido") y el
   enlace "Volver al catálogo".
6. Confirmar que el detalle tampoco está hardcodeado:
   ```powershell
   Select-String -Path appwebclientehernanaguero1\producto.html -Pattern "producto-detalle"
   # No debe devolver nada
   ```
7. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> y probar **320 / 375 / 480 / 768 /
   1024px**: el catálogo en grilla y las fichas de detalle tienen que verse igual
   que antes del cambio.
8. <kbd>Ctrl</kbd>+<kbd>F5</kbd> si no aparecen los productos, para descartar caché.

## Prompt usado y historial con Open Code

Pegá todo el histórico de mensajes con el agente de IA:

```
=== SESIÓN — productos (catálogo y detalle) desde JavaScript ===

(1)  quiero agregar un js a la web y que en ese js al cargar el dom se instancie
     la lista de productos (class= producto-detalle) que hoy esta en harcode en
     el html y se inserte en el div "productos". quita los del html y que la
     lista de productos este en un json. La pagina debe seguir funcionando igual

(2)  ¿Cómo abrís normalmente la página para probarla?
     -> Respuesta: Doble clic al HTML

(3)  Borrame de producto.html el harcode de class=producto-detalle para que
     funcione con el archivo producto.js

(4)  quiero que mi pagina web trabaje con producto.js en vez de html.
     -> Alcance elegido: También index.html (mover las 4 tarjetas del catálogo
        "Nuestros productos" a producto.js)

(5)  en base a todo lo que hicimos en la rama feature- js podes llenarme la
     plantilla del mr que describo aqui [+ la plantilla completa]
```

## Checklist antes de enviar

- [x] Trabajé en una rama propia (no directo en `main`) — se trabajó en la rama
      **`feature/adapt-to-js`**.
- [x] Probé que mi código/archivo funciona antes de subirlo (validé la sintaxis
      con `node --check producto.js` y verifiqué el DOM renderizado con Chrome
      headless: `index.html` genera las 4 tarjetas del catálogo con sus enlaces y
      `producto.html` genera las 4 fichas de detalle).
- [x] Este PR es dentro de mi propio repositorio.
- [x] Completé todos los datos de esta plantilla.

## Comentarios adicionales (opcional)

Dudas, aclaraciones o algo que quieras comentarle al profesor:

- **Por qué el JSON está dentro del `.js` y no en un `productos.json` aparte**:
  como la página se abre con doble click (`file://`), un `fetch` a un `.json`
  externo lo bloquea el navegador por política de origen. Por eso la lista de
  productos queda como un array JSON dentro de `producto.js`. Si en algún momento
  se sirve por HTTP (Live Server o GitHub Pages), se puede mover a un
  `productos.json` y cargarlo con `fetch` sin cambiar el resto.
- **El drawback de generar el catálogo desde JS**: igual que pasó con el header y
  footer, el HTML ya no contiene las tarjetas, así que sin JavaScript el catálogo
  no se ve y para buscadores no existe. Es el mismo criterio que se viene usando
  en el proyecto al mover partes del markup a JS.
- **Verifiqué que el DOM queda igual**: corrí las páginas en Chrome headless y el
  árbol generado por `producto.js` es el mismo que estaba en el HTML
  (`article.producto producto-*` con `img`/`h4`/`p`/`a` en el catálogo, y
  `article.producto-detalle` con `img`/`h4`/`p`/`ul`/`a` en el detalle), solo
  cambia quién lo genera.
- **El `id="productos"` se usa en las dos páginas** con el mismo `renderProductos()`,
  que decide el formato según si el contenedor tiene la clase `item-cards`. Es a
  propósito, para no duplicar la lógica de renderizado.
- **Navegadores**: no usa nada exclusivo, `createElement` y
  `createDocumentFragment` andan en cualquier navegador actual. El `:has()` del
  CSS de `index.html` ya estaba antes de este cambio.
