# MR — Carrito sin JavaScript y ajustes para móviles

## Descripción

Explicá brevemente qué hiciste y qué archivos modificaste o agregaste:

Saqué **todo el JavaScript del carrito** y lo reemplacé por cálculo con **contadores CSS**, cambié el selector de unidades por uno de **0 a 30 por producto** dentro de un panel desplegable, actualicé los **precios a valores de Argentina** y arreglé el **diseño en el celular** (el menú se partía en 4 renglones y el footer tapaba la pantalla completa).

Archivos modificados:

- **`carrito.html`** — se eliminó el bloque `<script>` completo (`formatearPeso`, `actualizarLista` y los dos `addEventListener`). La lista de compra y el total ahora se completan con `content:` desde CSS. El `input type="number"` se reemplazó por **31 `radio` ocultos (0 a 30)** con sus `<label>`, dentro de un panel que se abre con un checkbox invisible, más un chip que muestra "Unidades: N".
- **`style.css`** — se agregó `@counter-style pesos` (`system: fixed 0` con 2251 símbolos) para que los importes salgan con punto de miles, `counter-reset` en `.carrito-wrap` y **124 reglas** `counter-increment` (una por radio) que suman al total, a los 4 subtotales y a las 4 cantidades. Los radios ocultos usan `visibility: hidden` en lugar de `display: none`, porque los elementos con `display: none` no suman a los contadores CSS y el total daba `$0`. En el responsive: el menú pasa a una sola línea con `flex-wrap: nowrap` y `justify-content: safe center` (header de 184px a ~93px) y el footer queda en `min-height: 50vh` con respaldo `50dvh` y contenido compactado (de 761px a 320px en un viewport de 640px, o sea de 119% a 50%). Los breakpoints de 900/768/600/480/380px y el de móvil apaisado quedaron **al final del archivo**, con un comentario que explica que es por la cascada.
- **`producto.html`** — solo los "Precio sugerido": Coca‑Cola `$1.200 → $1.900`, Sprite `$1.100 → $1.800`, Fanta `$1.100 → $1.800`, Schweppes `$1.300 → $2.000`.
- **`Predictions.md`** — las 4 consignas de la sesión anotadas al final.

Archivos agregados (copias de resguardo mías, no código del proyecto):
`carrito.html.bak`, `carrito.pre-precios.bak`, `carrito.pre-pesos.bak`, `carrito.pre-fixed0.bak` y los 4 equivalentes de `style.css`.

## Cómo probarlo

Pasos para que el profesor pueda correr o revisar el cambio (comandos, URL, capturas de pantalla si aplica):

No hace falta servidor ni instalar nada: es un sitio estático y se abre con doble click.

1. Abrir **`appwebclientehernanaguero1/carrito.html`**.
2. Abrir el panel de unidades de Coca‑Cola y elegir **3** → la lista de compra debe mostrar `3 × $1.900 = $5.700`. En Sprite **10** (`$18.000`), Fanta **5** (`$9.000`) y Schweppes **2** (`$4.000`) → **Total: `$36.700`**.
3. Elegir **30 unidades de cada producto**: el total debe marcar exactamente **`$225.000`**. Todos los importes de 4 cifras tienen que salir con punto (`$9.000`, `$36.700`, `$225.000`).
4. Con los 4 productos en 0, tocar **"Finalizar compra"** → debe aparecer "Aún no elegiste ninguna gaseosa". Con al menos 1 unidad → "Gracias por tu compra. Total: $X".
5. Verificar que no quedó JavaScript: en DevTools → *Elements* no debe haber ningún `<script>`, o desde PowerShell:
   ```powershell
   Select-String -Path *.html -Pattern "<script|onclick|javascript:"
   # No debe devolver nada
   ```
6. Teclado: <kbd>Tab</kbd> hasta el chip, <kbd>Space</kbd> abre el panel, <kbd>Tab</kbd> entra al radio marcado y <kbd>↑</kbd>/<kbd>↓</kbd> cambian la cantidad.
7. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> y probar **320 / 375 / 480 / 768 / 1024px**: el menú tiene que seguir en una sola línea, el footer ocupar la mitad exacta del alto sin desbordarse, el carrito en una columna y las pastillas de a 5 por fila. No debe aparecer scroll horizontal en la página.
8. <kbd>Ctrl</kbd>+<kbd>F5</kbd> si el CSS parece viejo.

## Prompt usado y historial con Open Code

Pegá todo el histórico de mensajes con el agente de IA:

```
(1) en base a lo que hicimos podes llevarme la plantilla del mr que describo aqui

(2) quitar lenguaje de java script de carrito
    -> Se borró el <script> completo y el cálculo se rehízo con contadores CSS:
       counter-reset en .carrito-wrap, un counter-increment por radio marcado y
       un @counter-style para el punto de miles.

(3) cambiar unidades dentro de carrito
    -> El input[type=number] se reemplazó por un selector de 0 a 30 unidades en
       un panel colapsable (checkbox oculto) con grid fluido de 31 opciones y un
       chip con la cantidad elegida.

(4) adaptar el precio de las gaseosas al valor de estos en Argentina
    -> Coca-Cola $1.900, Sprite $1.800, Fanta $1.800, Schweppes $2.000, en
       carrito.html y en el "Precio sugerido" de producto.html.

(5) los importes me salen corridos: puse 19 unidades de Coca-Cola y el subtotal
    dice $1.800 en vez de $1.900
    -> En "system: fixed" el primer símbolo representa el valor 1, así que
       faltaba el valor 0 y todo corría un lugar. Se agregó el símbolo "0" y se
       usó "system: fixed 0" (además de "overflow: clip" para los negativos).

(6) el total me da $0 cuando el panel está cerrado
    -> Los radios no pueden llevar "display: none" porque los elementos con
       display: none no suman a los contadores CSS. Se cambió a
       "visibility: hidden", que los saca de la pantalla y del teclado pero los
       deja contabilizando.

(7) el chip me muestra siempre 0
    -> El chip, que lee el contador, estaba antes que los radios en el HTML, así
       que leía el contador antes de que sumara. Se lo movió al final del bloque
       y se agregó "flex-direction: column-reverse" para que siga viéndose arriba.

(8) el carrito no me deja elegir más de 9 unidades
    -> Se fijó el tope en 30 unidades por producto, con un total máximo de
       $225.000, y se ajustó el texto de ayuda de la página.

(9) en el celular el menú me queda en 4 renglones y ocupa media pantalla
    -> Se sacó el "flex-direction: column": el <ul> del nav es una sola línea con
       "flex-wrap: nowrap" y "justify-content: safe center", más
       "overflow-x: auto" en el propio <ul> como red de seguridad. El header
       bajó de 184px a ~93px y los enlaces entran completos a 320px.

(10) el footer me tapa la pantalla en el celular, mide más que el alto del
     celular
     -> "min-height: 50vh" con "50dvh" como respaldo, más compactación del
        contenido: flex vertical con "justify-content: center", 3 columnas
        angostas y tipografías/gaps/paddings chicos. Bajó de 761px a 320px en un
        viewport de 640px.

(11) en 320px el footer se pasa de la mitad
     -> Bloque extra para "max-width: 380px" que aprieta logo, gaps, paddings y
        tipografía, con un comentario en el CSS explicando por qué.

(12) en el celular apaisado el footer también se desborda
     -> Bloque "orientation: landscape" con "max-height: 500px", más compacto que
        el de 320px porque la pantalla es baja.

(13) los breakpoints no me funcionan, el diseño se pisa
     -> Se movieron todas las media queries al final de style.css: si una regla
        base aparece después del bloque responsive, la cascada la pisa y el
        breakpoint deja de funcionar. Se agregó el comentario en el CSS que
        explica por qué deben ir al final.

(14) los breakpoints del footer no hacen nada
     -> Era especificidad: "footer .footer-cols" de la regla base ganaba sobre el
        del breakpoint. Se ajustó la declaración del grid dentro del media query.

(15) los enlaces del footer son muy chicos para tocar con el dedo
     -> Se les agrandó el área táctil a ~22px con un "::after" absoluto, que no
        suma alto al bloque.

(16) los controles no se ven cuando los tabulo con el teclado
     -> Se agregó ":focus-visible" con un anillo rojo de 3px en el chip, en las
        pastillas y en el botón "Finalizar compra".

(17) en base a lo que hicimos podes llenarme la plantilla del mr que describo aqui
```

## Checklist antes de enviar

- [x] Trabajé en una rama propia (no directo en `main`) → `feature-add-css3`.
- [x] Probé que mi código/archivo funciona antes de subirlo.
- [x] Este PR es dentro de mi propio repositorio.
- [x] Completé todos los datos de esta plantilla.

## Comentarios adicionales (opcional)

Dudas, aclaraciones o algo que quieras comentarle al profesor:

- **Los prompts (2), (3), (4) y el pedido de responsive son textuales**: están anotados así en `Predictions.md`. Los demás (de (5) a (16)) los reconstruí a partir de los comentarios que dejé en el CSS y de los nombres de los `.bak`, que muestran el orden real en que fui probando cada cosa, así que la redacción es aproximada. Conviene revisarlos y corregirlos si no coinciden con lo que escribí.
- **Verifiqué que el sitio quedó sin JavaScript**: antes solo `carrito.html` tenía; ahora ninguna de las 4 páginas tiene.
- **El `@counter-style` cuenta de a 100**: el radio de 19 unidades suma `19` al contador, y el símbolo número 19 de la lista es `"1.900"`, así que en pantalla sale `$1.900` sin escribir los números a mano en cada regla. Está comentado en el propio `style.css`.
- **Los `.bak` son copias de resguardo mías**, no código del proyecto. Recomiendo sacarlos antes de mergear:
  ```bash
  git rm carrito.html.bak carrito.pre-*.bak style.css.bak style.pre-*.bak
  echo "*.bak" >> .gitignore
  git commit -m "eliminar archivos .bak de resguardo"
  ```
- **Precios**: son de septiembre de 2026. Salvo Coca‑Cola son redondeos y pueden variar por tienda o promoción.
- **Navegadores**: el carrito necesita `@counter-style`, `visibility: hidden` y `:has()` (Chrome, Edge, Firefox y Safari actuales).
