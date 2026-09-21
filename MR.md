# MR — Refresco Argentina 🥤

## Descripción

Se trabajó sobre el sitio **Refresco Argentina** (réplica de la página de Coca‑Cola Argentina) para dejar la `index` y el resto de las páginas (`carrito.html`, `producto.html`, `contacto.html`) imitando la estructura y contenido reales del sitio oficial, usando **solo HTML y CSS** (sin JavaScript).

### Archivos modificados

- **`index.html`**
  - Link del favicon apuntando a `refresco.ico` (paquete de favicon.io) + PNGs, apple-touch-icon y `site.webmanifest`.
  - Ícono de `refresco.ico` en el hero.
  - Nueva sección **Tiendas Cencosud** (`#tiendas`) con Jumbo, Disco y Vea, debajo de `#marcas`.
  - Sección **Descubrí** (`#descubri`) con los elementos reales de la pestaña Descubrí de Coca‑Cola (Fanta Halloween, Copa Mundial FIFA 26™, Juntos en Todas y Coke Studio), con imágenes y enlaces oficiales.
  - Footer nuevo (logo blanco de Coca‑Cola, columnas Sobre Nosotros / ¿Necesitas Ayuda? / Legal y redes sociales) con links reales y funcionales.
  - Menú: "Descubrí" queda solo en esta página.

- **`carrito.html`**
  - Favicon + footer nuevo (igual que el resto).
  - Se quita "Descubrí" del menú.
  - Nueva sección **Tiendas Cencosud** (`#tiendas`) con Jumbo, Disco y Vea (imágenes de la página oficial de Coca‑Cola, respetando el tamaño de los logos).

- **`producto.html`** y **`contacto.html`**
  - Favicon + footer nuevo.
  - Se quita "Descubrí" del menú.

- **`style.css`**
  - Estilos del nuevo footer (columnas y redes).
  - Clase `.tienda` para las tarjetas de tiendas (separada de `.experiencia`).
  - Selectores `.experiencia` escopados a `#descubri` y ocultos por defecto (solo se ven dentro de `#descubri`).
  - Reglas `:target`: `#descubri` solo visible al acceder por el ancla `#descubri`; `#tiendas` en `index` solo visible al acceder por el ancla `#inicio`.
  - Tamaño de los logos de tiendas (`max-width: 320px; height: auto;`) respetando su proporción original (1327×1265).
  - Grid de `.item-cards` ampliado para `#carrito` y `#tiendas`.

### Archivos agregados

- **`img/`**: `jumbo.jpg`, `disco.jpg`, `vea.jpg`, `fanta-halloween.jpg`, `copa-mundial.jpg`, `juntos-en-todas.jpg`, `coke-studio.jpg`, `coca-cola-logo-white.svg`.
- **Favicons**: `refresco.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`, `site.webmanifest`.
- **`MR.md`** (esta plantilla).

### Archivos eliminados

- `favicon.ico` y `favicon.png` viejos (reemplazados por el paquete de favicon.io).

---

## Cómo probarlo

1. Clonar el repositorio.
2. Abrir **`appwebclientehernanaguero1/index.html`** en un navegador.
3. Verificar:
   - El favicon de la pestaña muestra el ícono `refresco.ico`.
   - Al hacer clic en **Inicio** del menú, la sección **Tiendas Cencosud** (Jumbo, Disco, Vea) se hace visible.
   - Al hacer clic en **Descubrí**, la sección `#descubri` con Fanta Halloween, Copa Mundial FIFA 26, Juntos en Todas y Coke Studio se hace visible.
   - Los links del **footer** funcionan (abren páginas reales de Coca‑Cola en otra pestaña).
4. Abrir **`carrito.html`**: la sección **Tiendas Cencosud** aparece siempre con los 3 logos.
5. Recargar con **Ctrl+F5** para forzar el refresco del CSS.

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

(14) en base a lo que hicimos podes llevarme la plantilla del mr que describo
     aqui (esta plantilla)
```

---

## Checklist antes de enviar

- [ ] Trabajé en una rama propia (no directo en `main`).
- [x] Probé que mi código/archivo funciona antes de subirlo.
- [x] Este PR es dentro de mi propio repositorio.
- [x] Completé todos los datos de esta plantilla.

## Comentarios adicionales (opcional)

- El repositorio sigue en la rama `master` y **sin commits** todavía (`main` no existe). Recomiendo crear una rama `feature/…` antes de subir: `git checkout -b feature/coca-cola-sitio`.
- La sección `#descubri` se oculta/muestra mediante CSS `:target`: solo se ve al entrar por el enlace del menú "Descubrí".
- La sección `#tiendas` en `index.html` solo se ve al entrar por "Inicio"; en `carrito.html` aparece siempre.
- Todo el cambio es estático (HTML + CSS), no se usa JavaScript.