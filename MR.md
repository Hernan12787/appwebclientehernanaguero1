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
=== SESIÓN 1 (25/09/2026, 18:39 a 20:50) — la del trabajo ===
(Copiados textualmente del historial de la sesión. Los 5 mensajes "Continue
if you have next steps..." los agrega el cliente automáticamente, no los
escribí yo, así que van aparte al final.)

(1)  Cambiar el codigo de js en carrito.html por codigo html y css que
     funcione de la misma manera

(2)  necesito que el codigo sea responsivo

(3)  quiero que la opcion unidades dentro de carrito.html tenga la opcion de
     agregarle la cantidad de bebidas a comprar que necesito con el teclado y
     no tenga el limite de 9 unidades

(4)  quiero que lo haga en html y css.quitame los botones de 0 al 9 y
     permitime poner a mi la cantidad de bebidas desde el teclado

(5)  quiero que unidades de carrito.html no sea una coleccion de radio
     buttons sino que yo pueda poner numericamente la cantidad de gaseosas

(6)  quiero que el precio de todas las gaseosas se ajusten al precio real de
     las gaseosas en Argentina en toda mi pagina

(7)  realizar el codigo con css y html, no js

(8)  quiero que en la pagina responsive para moviles la barra de header se
     alinee horizontalmente

(9)  quiero que el footer ocupe la mitad de espacio verticalmente dentro de mi
     pagina responsive para moviles

(10) quiero que #inicio, #catalogo, #descubri, carrito.html y contacto.html
     ocupe la mitad de tamaño% verticalmente para mi pagina responsive para
     celulares

(11) quiero abortionar los cambios y volver al estado anterior

(12) quiero que el header de la pagina se alinee horizontalmente y el footer
     se la mitad de alto verticalmente, para mi pagina responsive de moviles


--- Mensajes automáticos del cliente (no los escribí yo) ---

     Continue if you have next steps, or stop and ask for clarification if you
     are unsure how to proceed.
     (aparece 5 veces: 18:59, 19:38, 19:54, 20:06 y 20:44)


=== SESIÓN 2 (25/09/2026, 21:05 en adelante) — la de armar esta MR ===
(Los mensajes (1) a (6), (8) y (10) son el mismo pedido de llenar la plantilla,
pegado con pequeñas diferencias de redacción; los abrevio para no repetirla 8
veces. Los demás son los cambios de formato que pedí.)

(1)  en base a lo que hicimos podes llenarme la plantilla del mr que describo
     aqui  [+ la plantilla completa]
     [repetido, con redacción levemente distinta]

(2)  en base a lo que hicimos hoy podes llenarme la plantilla del mr que
     describo aqui  [+ la plantilla completa]

(3)  hacer la plantilla mejor exlicada

(4)  repondeme la plantilla de esta manera  [+ la plantilla en el formato del
     enunciado, sin el bloque de MR.md]

(5)  hacerme un plantilla con todos los promts utilizados hoy

(6)  en base a lo que hicimos podes llenarme las plantilla del mr que describo
     aqui  [+ la plantilla completa]

(7)  commitea e e l mr

(8)  en base a lo que hicimos podes llenarme la pantilla del mr que describo
     aqui  [+ la plantilla completa]

(9)  quiero que me pongas los promts utilizados no inventes nada

(10) llename esta planilla  [+ la plantilla completa]

(11) quiero que lo completes vos, no yo
```

## Checklist antes de enviar

- [x] Trabajé en una rama propia (no directo en `main`) → `feature-add-css3`.
- [x] Probé que mi código/archivo funciona antes de subirlo.
- [x] Este PR es dentro de mi propio repositorio.
- [x] Completé todos los datos de esta plantilla.

## Comentarios adicionales (opcional)

Dudas, aclaraciones o algo que quieras comentarle al profesor:

- **El historial de prompts de arriba es el real, no una reconstrucción.** Lo
  saqué de la base de datos de sesiones de OpenCode
  (`~/.local/share/opencode/opencode.db`), de las dos sesiones del 25/09/2026
  (`ses_f26223cd…` y `ses_f259cf84…`). En una versión anterior de esta
  plantilla había puesto prompts **inventados** (tipo "el total me da $0" o
  "los breakpoints no me funcionan"); los borré porque no existieron.
- **Los 5 mensajes "Continue if you have next steps…" no los escribí yo**: los
  inyecta el cliente de OpenCode automáticamente. Van aparte, aclarados.
- **El prompt (5) pedía lo contrario de lo que quedó**: "quiero que unidades de
  carrito.html **no sea una colección de radio buttons** sino que yo pueda
  poner numéricamente la cantidad". Al final quedó con 31 `radio` (0 a 30) en
  un panel, que es lo que hay en el código. Con un `input type="number"` no
  se puede hacer el cálculo con contadores CSS, que es el requisito de no usar
  JS. Dejo la aclaración por si el profe pregunta por la diferencia.
- **El prompt (11) fue un "abortar los cambios y volver al estado anterior"**,
  y es la razón de que existan los archivos `.bak`: al volver atrás se
  guardaron las versiones previas.
- **Verifiqué que el sitio quedó sin JavaScript**: antes solo `carrito.html`
  tenía; ahora ninguna de las 4 páginas tiene.
- **El `@counter-style` cuenta de a 100**: el radio de 19 unidades suma `19` al contador, y el símbolo número 19 de la lista es `"1.900"`, así que en pantalla sale `$1.900` sin escribir los números a mano en cada regla. Está comentado en el propio `style.css`.
- **Los `.bak` son copias de resguardo mías**, no código del proyecto. Recomiendo sacarlos antes de mergear:
  ```bash
  git rm carrito.html.bak carrito.pre-*.bak style.css.bak style.pre-*.bak
  echo "*.bak" >> .gitignore
  git commit -m "eliminar archivos .bak de resguardo"
  ```
- **Precios**: son de septiembre de 2026. Salvo Coca‑Cola son redondeos y pueden variar por tienda o promoción.
- **Navegadores**: el carrito necesita `@counter-style`, `visibility: hidden` y `:has()` (Chrome, Edge, Firefox y Safari actuales).
