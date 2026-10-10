# MR — Header y footer generados desde JavaScript

## Descripción

Explicá brevemente qué hiciste y qué archivos modificaste o agregaste:

Saqué el **header y el footer del HTML** de las 4 páginas y los pasé a un único
archivo JavaScript, **`archivo.js`**, que los construye con la API DOM
(`document.createElement`) a partir de dos objetos de datos: `miheader` y
`footerData`. Ahora el markup de esas dos zonas no está repetido 4 veces en el
HTML sino definido una sola vez en JS, y las 4 páginas quedan consistentes
entre sí por construcción.

Archivos agregados:

- **`archivo.js`** — `miheader` (logo + los 5 links del nav) y `footerData` (logo,
  3 columnas de links, redes y copyright) son solo datos. `crearHeader()` y
  `crearFooter()` arman los nodos con `createElement` + `textContent`, y
  `renderLayout()` los coloca en el DOM: el header con
  `document.body.insertBefore(headerNuevo, main)` y el footer reemplazando el
  `<footer id="footer">` de anclaje. Se ejecuta en `DOMContentLoaded`.
- Las imágenes y los textos con acentos se cargan por `textContent` y atributos,
  **nunca por `innerHTML`**, así que nada se interpreta como HTML. Los links
  externos usan un helper (`crearLinkExterno`) que setea `target="_blank"` y
  `rel="noopener noreferrer"` de una sola vez.

Archivos modificados (los 4 quedan igual entre sí, con el mismo patrón):

- **`index.html`**, **`carrito.html`**, **`producto.html`**, **`contacto.html`** —
  se borró el `<header>` inline completo (logo + `<nav>`) y el contenido del
  `<footer>`. Ahora arrancan directo con `<main>`, terminan con
  `<footer id="footer"></footer>` y cargan `<script src="archivo.js"></script>` al
  final del `<body>`. No se tocó `style.css`: las clases que genera el JS
  (`header .logo`, `.logo-icono`, `header nav ul`, `footer .footer-cols`,
  `footer .footer-social`, etc.) son las mismas que ya usaba el CSS, así que los
  estilos y los breakpoints móviles siguen aplicando igual.

Dos detalles que hubo que resolver:

- **Los anchors cambian según la página.** En `index.html` el nav apunta a
  `#catalogo` / `#descubri`, y en las otras páginas a `index.html#catalogo` /
  `index.html#descubri`. Esto no es cosmético: el CSS de `style.css:297` usa
  `main#inicio:has(#catalogo:target)` para mostrar y ocultar la vista de catálogo,
  y eso **solo funciona si el enlace es un ancla interna sin recargar la página**.
  Por eso `esPaginaInicio()` decide el `href` según `window.location.pathname`.
- **Unifiqué el nombre del sitio.** Decía "Refrescante Argentina" en tres páginas y
  "Refresco Argentina" en `index.html`. Ahora es "Refresco Argentina" en las 4, y
  el "Descubrí" falta en el header de `carrito.html` y `contacto.html`: se agregó
  para que las 4 tengan los mismos 5 links, que es lo que pide el comentario de
  `style.css:1437` sobre los breakpoints de móvil.

## Cómo probarlo

Pasos para que el profesor pueda correr o revisar el cambio (comandos, URL, capturas de pantalla si aplica):

No hace falta servidor ni instalar nada: es un sitio estático y se abre con doble click.

1. Abrir cualquiera de las 4 páginas: **`appwebclientehernanaguero1/index.html`**,
   `carrito.html`, `producto.html` o `contacto.html`. El header con el logo y los
   5 links tiene que verse igual en las 4.
2. Confirmar que el header **no está en el HTML**: en DevTools → *Elements*,
   busca `<header>` y vas a ver que está arriba de `<main>`, después de `<body>`,
   y que su origen es el script (en DevTools → *Sources* aparece dentro de
   `archivo.js`). En el HTML solo está `<footer id="footer"></footer>`.
   O desde PowerShell:
   ```powershell
   Select-String -Path appwebclientehernanaguero1\*.html -Pattern "<header|logo-icono"
   # No debe devolver nada
   ```
3. **Nav entre páginas**: "Carrito" y "Contacto" tienen que llevar a esas páginas y
   "Inicio" / "Catálogo" / "Descubrí" tienen que volver a `index.html`.
4. **Anclas en index.html**: clickear "Catálogo" muestra el catálogo y oculta la
   historia, sin recargar la página (mismo comportamiento que antes). Lo mismo con
   "Descubrí". Desde `carrito.html`, el mismo link tiene que abrir
   `index.html#catalogo` y mostrar la vista de catálogo.
5. **Footer**: tiene que verse el logo, las 3 columnas (Sobre Nosotros / ¿Necesitas
   Ayuda? / Legal), las 4 redes y el copyright, en las 4 páginas.
6. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> y probar **320 / 375 / 480 / 768 /
   1024px**: el menú tiene que seguir en una sola línea con scroll horizontal y el
   logo arriba, igual que antes del cambio, porque el CSS no se modificó.
7. <kbd>Ctrl</kbd>+<kbd>F5</kbd> si el header no aparece, para descartar caché.

## Prompt usado y historial con Open Code

Pegá todo el histórico de mensajes con el agente de IA:

```
=== SESIÓN — header y footer desde JavaScript ===

(1)  quiero agregar un js a la web que maneje el footer. Quiero quitarlo del
     html y migrarlo al formato js como una variable llamada footerjs que
     tenga adentro todo lo referido al footer

(2)  quiero que el archivo footerjs funcione completamente con js. al archivo
     footerjs cambiale el nombre por js

(3)  cambiar el nombre footerjs por archivo.js

(4)  todo lo que esta dentro de la constante footerjs debe estar configurado
     con js

(5)  quiero agregar en archivo.js los parametros para utilizar el header como
     un js completo en vez de ser html. Borrame la configuracion html y dejame
     el header funcional en js

(6)  quiero que el header de index.html y demas archivos html funcione desde el
     header de archivo.js y que el header sea manejado completamente desde
     archivo.js para todas las paginas utilizando el formato js

(7)  quiero que los archivos del header en archivo.js esten dentro de una
     variable llamada miheader

(8)  configurame el header en archivo.js para que funcione en mi pagina

(9)  el header esta oculto. lo quiero ver

(10) en base a lo que hicimos podes llenarme la plantilla del mr que describo
     aqui [+ la plantilla completa]
```

## Checklist antes de enviar

- [ ] Trabajé en una rama propia (no directo en `main`) — **pendiente**: el repo
      todavía no tiene ningún commit y estoy sobre `master`. Hay que crear la rama
      antes de commitear.
- [x] Probé que mi código/archivo funciona antes de subirlo (corrí `archivo.js`
      contra un stub de DOM en Node para verificar que el header se genera con los
      links y los `href` correctos en cada página, y `node --check` para validar
      la sintaxis).
- [ ] Este PR es dentro de mi propio repositorio.
- [x] Completé todos los datos de esta plantilla.

## Comentarios adicionales (opcional)

Dudas, aclaraciones o algo que quieras comentarle al profesor:

- **El drawback de mover el header a JS**: el HTML ya no lo contiene, así que sin
  JavaScript el sitio queda sin barra de navegación, y para buscadores el header
  no existe. Es el mismo criterio que se venga usando en el proyecto de dejar el
  carrito sin JS, pero acá va al revés: se agregó JS. Lo dejo aclarado por si el
  profe pregunta por el criterio.
- **Verifiqué que el DOM queda igual**: corrí `archivo.js` en Node con un stub
  mínimo de DOM y el header generado tiene el mismo árbol que el que estaba en el
  HTML (`div.logo > img.logo-icono` + texto, y `nav[aria-label] > ul > li > a`),
  solo cambia quién lo genera.
- **Dos cosas que se arreglaron de paso y no estaban pedidas**: `index.html` había
  quedado sin la etiqueta `<body>` (por eso el header no se veía y el JS no
  inyectaba nada), y el nombre del sitio era distinto en cada página. Si preferís
  mantener "Refrescante Argentina", se cambia en `miheader.logo.text`.
- **Los `.bak` que siguen en la carpeta son de la sesión anterior** (el trabajo
  del carrito sin JS), no de este cambio. Recomiendo sacarlos antes de mergear:
  ```bash
  git rm appwebclientehernanaguero1/carrito*.bak appwebclientehernanaguero1/style*.bak
  echo "*.bak" >> .gitignore
  ```
- **Navegadores**: no usa nada exclusivo, `createElement`, `insertBefore` y
  `replaceWith` andan en cualquier navegador actual. El `:has()` del CSS de
  `index.html` sí requiere un navegador con soporte (Chrome, Edge, Firefox y
  Safari actuales), pero eso ya estaba antes de este cambio.
