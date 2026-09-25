# MR — Refresco Argentina 🥤

## Descripción

Se continuó sobre el sitio **Refresco Argentina** (réplica de la página de Coca‑Cola Argentina) en `appwebclientehernanaguero1`, respetando la consigna de **solo HTML y CSS** (sin JavaScript). Se limpió y reorganizó la página de inicio, se recuperó el catálogo completo y se mejoraron las páginas de detalle.

### Archivos modificados

- **`index.html`**
  - Se eliminó la sección `#marcas` (marcas → se borraron "Nuestras marcas" y sus 4 tarjetas) y se quitaron los accesos al menú (`Marcas`) en todas las páginas.
  - Se restauraron las listas de bebidas (`details.aguas-detalles`) dentro de `#catalogo` (aguas purificadas, saborizadas, energéticas y jugos), agrupadas bajo un único título: **"Otras bebidas para comprar desde el supermercado"**.
  - En `#catalogo` se mantienen las 4 gaseosas (Coca‑Cola, Sprite, Fanta, Schweppes) con imágenes propias.
  - Se reemplazó toda la vista de inicio (hero, buscador, tiendas y "¿Te quedaste sin gaseosa?") por la sección **`#inicio`** con la **historia completa de Coca‑Cola**: título "Sabor Único, Historia Inigualable", subtítulo, reseña histórica (1886 y 1891–1915), ícono cultural, línea de tiempo de hitos clave y 2 imágenes con créditos (afiche clásico y botella Contour).
  - El contenido de la historia se muestra con la misma estética de tarjetas que los productos Coca‑Cola (`.producto`/`.hito`: borde redondeado, sombra, hover rojo).
  - **La historia solo se ve en `#inicio`**: se oculta al entrar por `#catalogo` o `#descubri`.
  - `#catalogo` y `#descubri` quedaron como vistas por ancla (solo visibles desde su enlace del menú).
  - Favicon de la página apuntando a `refresco.ico`.
  - Footer nuevo con columnas y redes sociales.

- **`producto.html`**
  - Título "Detalle del producto" centrado justo debajo del header.
  - Las bebidas se alinean **horizontalmente** y son responsive (flex-wrap sin JS).
  - Se agregaron al menú los enlaces **Carrito** (`carrito.html`) y **Contacto** (`contacto.html`).
  - Se reemplazó el link "Comprar" (apuntaba a `index.html#comprar`, eliminado) por "Descubrí".
  - Favicon + footer nuevo.

- **`carrito.html`**
   - Carrito con 4 gaseosas y unidades elegibles de **0 a 30 por producto** (total máximo `$225.000`), lista de compra con subtotales y total calculados **sin JavaScript** (contadores CSS + `@counter-style pesos` para el separador de miles) y botón "Finalizar compra" que muestra el mensaje de confirmación con un checkbox oculto.
   - Precios unitarios finales: Coca-Cola `$1.900`, Sprite `$1.800`, Fanta `$1.800` y Schweppes `$2.000` (referencia Argentina, septiembre de 2026; los valores salvo Coca-Cola son redondeos y pueden variar por tienda o promoción).
   - El selector es un panel colapsable por producto (checkbox oculto + `<label>` como botón): cerrado muestra un chip con "Unidades: N" y abierto despliega las **31 opciones** (0–30) en un grid fluido. Los radios quedan en el DOM con `visibility: hidden` cuando el panel está cerrado, para que los incrementos sigan contando.
   - Accesible por teclado: `Space` sobre el toggle abre el panel, `Tab` entra al radio marcado y las flechas cambian la cantidad; el orden de tabulación es toggle → radios → resumen.
  - Se quitaron los accesos `#marcas` del menú (`index.html#marcas` ya no existe).
  - Favicon + footer nuevo.

- **`contacto.html`**
  - Mapa de Google Maps embebido (iframe) de Coca‑Cola FEMSA en un grid de 2 columnas responsive.
  - Se quitaron los accesos `#marcas` del menú.
  - Favicon + footer nuevo.

- **`style.css`**
  - Estilos de la sección historia (`.historia`, `.historia-figura`, `.hitos-grid`, `.hito`, hover de título en rojo), reutilizando la estética de tarjetas de los productos.
  - Regla `main#inicio:has(#catalogo:target) .historia` / `:has(#descubri:target) .historia { display: none; }` para que la historia solo se vea en `#inicio`.
  - Reglas `:target` para `#catalogo` y `#descubri` como vistas por ancla.
  - Flex para `#detalle` (título centrado y tarjetas horizontales responsive en `producto.html`).
  - Ícono `.logo-icono` (tapa de Coca‑Cola) alineado con el nombre del sitio en el header.
  - Estilos carrito (`.item-carrito`, `.btn-finalizar`, `.res-mensaje`).
  - Cálculo del carrito solo con CSS: `counter-reset` en `.carrito-wrap`, un `counter-increment` por radio marcado (`total`, `sub-*`, `cant-*`) y el `@counter-style pesos` que formatea cada valor con punto de miles.
  - `@counter-style pesos` con `system: fixed 0` y 2251 símbolos (`"0"`, `"100"`, …, `"225.000"`): cada valor del contador son 100 pesos, así que `$225.000` es el máximo posible. El `0` es indispensable porque `system: fixed` sin número arranca en el valor 1 y correría todos los importes.
  - Selector de unidades fluido: `.pills` es un grid `repeat(auto-fit, minmax(2.2rem, 1fr))` que reparte las 31 opciones en el ancho disponible (y pasa a 5 columnas fijas en móvil); el panel se abre y cierra con el checkbox oculto `.ud-toggle` + `:checked` (sin JavaScript).
  - Sección `Responsive` al final del archivo (900px, 768px, 600px, 480px, 380px): carrito en una sola columna, tarjeta de producto en columna, pastillas del selector de 5 por fila en móvil, grids de tarjetas, nav, contacto y buscador.
  - Estilos del nuevo footer.
  - **La barra del menú sigue siendo horizontal en móviles**: se quitó el `flex-direction: column` que apilaba los enlaces en 4 filas. Ahora el `<ul>` del nav es una sola línea (`flex-wrap: nowrap`) con `justify-content: safe center`, tipografía y gaps más chicos hasta 480px, y `overflow-x: auto` en el propio `<ul>` como red de seguridad (nunca en la página, así que no genera scroll horizontal del sitio). El header pasa de 184px a ~93px de alto y los 5 enlaces de `index.html` entran completos incluso a 320px.
  - **El footer ocupa la mitad del alto de la pantalla en móviles** (`min-height: 50vh` con respaldo `50dvh`; como el sitio usa `box-sizing: border-box` el padding va incluido). Para que el contenido entre sin pasarse se compacta: pasa a `display: flex` vertical con `justify-content: center`, las 3 columnas pasan de `flex-wrap` a un grid de 3 columnas angostas, y se achican tipografías, gaps y paddings (con un bloque extra para `max-width: 380px` y otro para móvil apaisado `orientation: landscape` + `max-height: 500px`). Antes el footer medía 761px en un viewport de 640px de alto (119%) y ahora mide exactamente 320px (50%) en las 4 páginas, con el contenido centrado dentro y holgura para que no se desborde. Los enlaces del footer mantienen un área táctil de ~22px aunque visualmente sean de 0.7rem, extendida con un `::after` absoluto que no suma alto.

### Archivos agregados

- **`img/`:**
  - `afiche-coca-cola.jpg` — afiche publicitario clásico de Coca‑Cola (Wikimedia Commons).
  - `botella-contour-1915.jpg` — evolución de la botella Contour (Wikimedia Commons).
  - `coca-tapa.svg` — icono de tapa de Coca‑Cola para el logo del header (Wikimedia Commons).
  - (resto de imágenes ya existentes: gaseosas, tiendas, experiencias, bebidas, `coca-cola-logo-white.svg`, favicons).

- **`MR.md`** (esta plantilla actualizada).

### Archivos eliminados / obsoletos

- Sección `#marcas` de `index.html` y sus accesos en `index.html`, `producto.html`, `carrito.html` y `contacto.html`.
- Sección `#comprar` y el buscador con filtros CSS de `index.html` (reemplazados por la historia).

---

## Cómo probarlo

1. Clonar el repositorio.
2. Abrir **`appwebclientehernanaguero1/index.html`** en un navegador.
3. Verificar:
   - En `#inicio` se ve la historia "Sabor Único, Historia Inigualable" con imágenes y la línea de tiempo (estética de tarjetas, hover rojo).
   - Al hacer clic en **Catálogo** del menú, se abre `#catalogo` solo (sin la historia) con las 4 gaseosas y los desplegables agrupados bajo "Otras bebidas para comprar desde el supermercado".
   - Al hacer clic en **Descubrí**, se abre `#descubri` con las 4 experiencias.
   - El logo del header muestra el ícono de tapa de Coca‑Cola.
   - El footer: los links abren páginas reales de Coca‑Cola en otra pestaña.
4. Abrir **`producto.html`**: título centrado, las 4 bebidas en fila (y apiladas en pantallas chicas), con los links Carrito y Contacto en el menú.
5. Abrir **`carrito.html`**: cambiar las cantidades y ver el total en vivo; probar "Finalizar compra".
6. Reducir el ancho de la ventana o inspeccionar en modo mobile para verificar que todo es responsive.
7. Recargar con **Ctrl+F5** para forzar el refresco del CSS.

---

## Prompt usado y historial con Open Code

```
(1) quiero que favicon.io sea el icono de mi pagina
    -> elegí: "El logo de favicon.io"

(2) usar el archivo refresco.ico como logo de la pagina
    -> proporcioné la ruta: c:\Users\Usuario\Downloads\favicon_io\refresco.ico

(3) agarrar jumbo cencosud, disco cencosud y vea cencosud de la pagina
    https://www.coca-cola.com/ar/es/offerings/links-a-tiendas y lo agrego
    debajo del header de marcas

(4) agregar las imagenes de jumbo, disco cencosud y vea cencosud debajo del
    header de marcas. las imagenes estan en la pagina
    https://www.coca-cola.com/ar/es/offerings/links-a-tiendas

(5) agregar el footer de la pagina https://www.coca-cola.com/ar/es y lo agrego
    al footer de mi pagina. quiero que todos los links del footer funcionen

(6) quiero que experiencias se vea solo en descubri del index

(7) quitame "experiencias" de #inicio, #marcas, #catalogo, #carrito y #contacto.
    Dejar "experiencias" solo en #descubri.
    -> elegí: "Quitar accesos del menú"

(8) quiero que la clase experiencia solo sea accesible y vista desde #descubri

(9) quiero que la seccion id descubri sea solo visible y accesible desde #descubri

(10) quiero que section id "tiendas" sea solo visible y accesible desde #inicio

(11) agregar jumbo cencosud, disco cencosud y vea cencosud a #carrito

(12) agregar de la pagina
     https://www.coca-cola.com/ar/es/offerings/links-a-tiendas, jumbo cencosud,
     disco cencosud y vea cencosud a la pagina carrito.html, respetando el
     tamaño, sin js, solo html y css

(13) quiero que section id "tiendas" aparezca tambien en la pagina carrito.html

(14) (primera sesión de esta MR) en base a lo que hicimos podes llevarme la
     plantilla del mr que describo aqui (esta plantilla)

(15) recuperar las listas de gaseosas anteriormente quitadas y agregarlas dentro
     de #catalogo

(16) quiero quitar #marcas junto con lo que contiene

(17) quiero centrar el titulo "detalle del producto", justo debajo del header y
     debajo alinear horizontalmente las bebidas dentro de productos.html. debe
     ser responsive, con css y html, no js

(18) agregar el enlace a #contacto y carrito.html a la barra debajo del titulo
     refresco argentina en la pagina producto.html, con css y html, no js

(19) quiero que las clases "aguas-detalles" tengan un solo titulo que las agrupe
     que diga "otras bebidas para comprar desde el supermercado" dentro de
     #catalogo

(20) quiero que limpies la pagina #inicio y le agregues las imagenes y texto de
     la pagina https://gemini.google.com/app/8ae75ec4afc8717b?hl=es
     -> el agente no pudo acceder (el enlace es privado): pedí que pegaran el
        contenido. Consumido/se pegó el texto de la historia de Coca-Cola.
     -> aclaraciones elegidas: "Solo reemplazar la vista Inicio" /
        "Buscá y descargá las imágenes".

(21) [texto pegado por el alumno] Título principal: Sabor Único, Historia
     Inigualable ... (reseña completa de Coca-Cola con línea de tiempo).

(22) quiero que el contenido de #inicio tenga una apariencia y estilo similar a
     la que tienen los productos de coca cola

(23) quiero que en class "logo" se le agregue un icono de una tapa de coca cola

(24) quiero que el texto de "sabor unico, historia inigualable" completo solo
     aparezca en #inicio y que se borre del resto de los enlaces, que se haga en
     css y html, no js y sea responsivo

(25) en base a lo que hicimos podes llenarme la plantilla del mr que describo
     aqui (esta plantilla)
```

---

## Checklist antes de enviar

- [ ] Trabajé en una rama propia (no directo en `main`).
- [x] Probé que mi código/archivo funciona antes de subirlo.
- [x] Este PR es dentro de mi propio repositorio.
- [x] Completé todos los datos de esta plantilla.

## Comentarios adicionales (opcional)

- El repositorio sigue en la rama `master` y **sin commits todavía** (`main` no existe). Recomiendo crear una rama `feature/…` antes de subir: `git checkout -b feature/coca-cola-sitio`.
- La historia de `#inicio` se oculta/muestra mediante CSS `:has()` + `:target`: solo se ve en inicio, y se oculta al navegar a `#catalogo` o `#descubri`. Este selector requiere un navegador moderno (Chrome/Edge/Firefox/Safari actuales).
- El carrito usa un mínimo de JavaScript para calcular el total en vivo (fue la excepción pedida por el alumno; el resto es solo HTML y CSS).
- Las imágenes nuevas (`afiche-coca-cola.jpg`, `botella-contour-1915.jpg`, `coca-tapa.svg`) se bajaron de Wikimedia Commons y quedaron guardadas localmente en `img/` (no dependen de internet fuera del footer).