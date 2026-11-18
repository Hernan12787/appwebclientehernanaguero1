# MR — Formulario de contacto conectado a Supabase (`supabasecontactos`)

## Descripción

Explicá brevemente qué hiciste y qué archivos modificaste o agregaste:

Conecté la plantilla de contacto con la tabla **`supabasecontactos`** de Supabase.
Al tocar **Enviar**, los datos del formulario (nombre y apellido, correo,
teléfono, asunto y mensaje) se insertan en la tabla mediante la API REST de
Supabase. El formulario muestra el estado del envío ("Guardando...", éxito o
error) sin recargar la página y se limpia cuando el guardado fue exitoso.

La tabla no tiene columna `nombre`: la columna real se llama
**`"nombre y apellido"`** (con espacios), así que el JS mapea el campo `nombre`
del formulario a esa clave antes de hacer el `POST`. Las columnas de la tabla son:

- `"nombre y apellido"` (texto)
- `email` (texto)
- `telefono` (texto)
- `asunto` (texto)
- `mensaje` (texto)

> La tabla no tiene `id` ni `created_at`. Para guardar no hacen falta, pero si más
> adelante se quiere listar/editar/borrar desde la página conviene agregarlos.

### Archivos modificados

- **`contacto.html`** — se agregó el párrafo de estado junto al botón Enviar:
  ```html
  <p id="contacto-estado" role="status" aria-live="polite"></p>
  ```
- **`accion.js`** — nueva función `activarFormularioContacto()`:
  - Escucha el `submit` de `#contacto form` y hace `event.preventDefault()`.
  - Arma el objeto `{ nombre, email, telefono, asunto, mensaje }` leyendo los
    campos por `id` y aplicando `trim()`.
  - Valida los campos obligatorios, deshabilita el botón y muestra "Guardando...".
  - En éxito: muestra "Mensaje guardado correctamente" y ejecuta `form.reset()`.
  - En error: muestra "No se pudo guardar. Intentá de nuevo.", registra el detalle
    en consola y conserva lo que escribió el usuario.
  - Se invoca desde `activarTodo()` (`accion.js`), que corre en `DOMContentLoaded`.
- **`producto.js`** — nueva función `insertarContactoSupabase(datos)`:
  - `POST` a `https://hangxmottfnjoxtrnxzy.supabase.co/rest/v1/supabasecontactos`.
  - Headers: `apikey`, `Authorization: Bearer <publishable key>`,
    `Content-Type: application/json` y `Prefer: return=representation`.
  - Mapea `datos.nombre` a la columna `"nombre y apellido"`.
  - Si la respuesta no es `ok`, lanza un `Error` con el status y el texto que
    devuelve Supabase; si es correcta, devuelve la fila creada.
  - Queda expuesta como `window.insertarContactoSupabase` para que la use
    `accion.js`.

Otros cambios incluidos en esta sesión:

- **`productos.js`** (nuevo) — la lista de productos dejó de ser un `const` dentro
  de `producto.js` y ahora la devuelve la función `obtenerProductos()`.
- **`producto.js`** — `renderProductos()` usa `obtenerProductos().forEach(...)`.
- **`index.html` / `producto.html` / `contacto.html`** — cargan
  `<script src="productos.js"></script>` antes de `producto.js`.
- **`producto.js`** — se corrigió un `SyntaxError` que rompía todo el archivo
  (la API key estaba sin comillas) y se expuso `window.traerDireccionesSupabase`.
- **`style.css`** — borde rojo para los productos del catálogo y para el resto de
  las bebidas dentro de `#catalogo`:
  ```css
  #catalogo .item-cards .producto,
  #catalogo .aguas-detalles .agua {
      border: 1px solid #ff0000;
  }
  ```

## Cómo probarlo

Pasos para que el profesor pueda correr o revisar el cambio (comandos, URL, capturas de pantalla si aplica):

1. **Configurar Supabase** (una sola vez). En el proyecto
   `hangxmottfnjoxtrnxzy` → *SQL Editor*, ejecutar:

   ```sql
   create table if not exists public.supabasecontactos (
     "nombre y apellido" text not null,
     email text not null,
     telefono text,
     asunto text,
     mensaje text not null
   );

   alter table public.supabasecontactos enable row level security;

   create policy "contactos_insert_anon"
   on public.supabasecontactos
   for insert
   to anon, authenticated
   with check (true);

   create policy "contactos_select_anon"
   on public.supabasecontactos
   for select
   to anon, authenticated
   using (true);
   ```

   Las políticas son necesarias: sin ellas Supabase responde
   `401 / 42501 new row violates row-level security policy`.

2. **Abrir el sitio**: `appwebclientehernanaguero1/contacto.html` con doble click
   (es un sitio estático, no hace falta servidor).

3. Completar el formulario:
   - Nombre y apellido: `Prueba Profesor`
   - Correo: `profesor@example.com`
   - Teléfono: `1122334455`
   - Asunto: `Consulta`
   - Mensaje: `Prueba de guardado`
   Tocar **Enviar**. Debe aparecer **"Mensaje guardado correctamente"** y el
   formulario debe quedar vacío.

4. Verificar en Supabase → **Table Editor** → `supabasecontactos`: la fila nueva
   debe estar con esos valores. También por REST:
   ```powershell
   $k = "sb_publishable_caiELbjOQdhK6NS9Ws2wuQ_ZyNeEMHl"
   curl.exe -s "https://hangxmottfnjoxtrnxzy.supabase.co/rest/v1/supabasecontactos?select=*" -H "apikey: $k"
   ```

5. Probar el caso de error: desactivar temporalmente la política de insert (o
   ejecutar `alter table public.supabasecontactos disable row level security;`,
   que funciona pero es menos seguro) y volver a enviar. Debe mostrarse
   **"No se pudo guardar. Intentá de nuevo."** sin perder los datos escritos.

6. Verificar sintaxis de los JS:
   ```powershell
   node --check appwebclientehernanaguero1\producto.js
   node --check appwebclientehernanaguero1\accion.js
   ```

7. Verificar el catálogo y el borde rojo: abrir
   `appwebclientehernanaguero1/index.html#catalogo`. Las 4 gaseosas (Coca-Cola,
   Sprite, Fanta, Schweppes) y todas las bebidas dentro de "Otras bebidas"
   (aguas, saborizadas, deportivas y jugos) deben tener borde rojo.

8. <kbd>Ctrl</kbd>+<kbd>F5</kbd> si no aparece el cambio, para descartar caché.

## Prompt usado y historial con Open Code

Pegá todo el histórico de mensajes con el agente de IA:

```
=== SESIÓN — productos.js, borde rojo y contacto → Supabase ===

(1)  convertir const productos de producto.js en una funcion js de productos.js

(2)  a cada columna de producto en productos.js agregale un borde color rojo.
     Tambien agregale dicho borde al resto de las gaseosas que hay dentro de la
     pagina #catalogo

(3)  a cada columna de producto en productos.js agregale un borde color rojo.
     Tambien agregale dicho borde al resto de las gaseosas que hay dentro de la
     pagina #catalogo
     -> Respuesta: se verificó con Chrome headless; el borde ya se vio y se
        mostró la captura del catálogo.

(4)  las conecciones supabase donde estan en mi codigo?
     -> Respuesta: todas en producto.js (3 funciones) y su uso en accion.js.

(5)  quiero que mi plantilla de contacto (nombre y apellido, correo electronico,
     telefono, asunto, mensaje), guarde los datos en mi tabla supabase llamada
     supabasecontactos, esta tabla se debe poder modificar por el usuario de la
     pagina utilizando la plantilla contacto. Hacelo en js
     -> Respuesta: se propuso el plan; se detectó que la tabla no existía (404).

(6)  quiero que al tocar el boton enviar en contacto, los datos ingresados se
     guarden en supabasecontactos

(7)  que tipo de error es?
     -> Respuesta: 404 de PostgREST = tabla inexistente; aparte había un
        SyntaxError por la API key sin comillas.

(8)  conectar supabasecontactos con mi plantilla de contacto. cuando toco el
     boton enviar los datos se guardan

(9)  conectar supabasecontactos con mi plantilla de contacto. cuando toco el
     boton enviar los datos se guardan en mi supabase supabasecontactos

(10) [se respondió la plantilla de preguntas] ¿Cómo creamos la tabla?
     -> "Dame el SQL para ejecutarlo"; alcance: "Solo guardar al llegar".
     ¿Qué debe hacer además de guardar?
     -> "Solo guardar al enviar (Recomendado)".

(11) dale

(12) sali del modo plan

(13) sali del modo plan implementa las nuevas instrucciones
     -> Respuesta: implementadas las 3 partes (producto.js, accion.js,
        contacto.html) y verificación con node --check + POST.

(14) mis contactos deben copiarse en supabasecontactos
     -> Respuesta: se detectó que la columna real es "nombre y apellido" (la
        tabla no tiene id) y se ajustó el mapeo. El POST seguía fallando por RLS.

(15) cual es el error que tira?
     -> Respuesta: 401 con {"code":"42501","message":"new row violates
        row-level security policy for table \"supabasecontactos\""}.

(16) proba si funciona ahora
     -> Respuesta: POST 201 con la fila creada, GET 200 y DELETE 200; se probó
        también desde el navegador con Chrome headless y se borraron las filas
        de prueba. La tabla quedó vacía.

(17) en base a lo que hicimos podes llenarme la plantilla del mr que describo
     aqui [plantilla del MR]
```

## Checklist antes de enviar

- [ ] Trabajé en una rama propia (no directo en `main`).
- [x] Probé que mi código/archivo funciona antes de subirlo.
- [x] Este PR es dentro de mi propio repositorio.
- [x] Completé todos los datos de esta plantilla.

## Comentarios adicionales (opcional)

Dudas, aclaraciones o algo que quieras comentarle al profesor:

- **Clave en el frontend**: se usa la **publishable key** de Supabase, que está
  pensada para ser pública; la seguridad real la dan las políticas RLS. Nunca se
  usó la `service_role` key en el navegador.
- **Política de insert abierta**: como el formulario es público, cualquiera puede
  insertar filas (spam). Para un TP alcanza; en producción convendría agregar un
  captcha o una Edge Function que valide el envío.
- **La tabla no tiene `id`**: para guardar no es necesario, pero si se quiere
  editar o borrar desde la página hay que agregar una PK (`id bigint generated
  by default as identity primary key`) y políticas de `update`/`delete`.
- **Columna con espacios**: `"nombre y apellido"` obliga a comillas dobles tanto
  en SQL como en las queries de PostgREST (`select="nombre y apellido"`). Se
  podría renombrar a `nombre_apellido` para simplificar, pero se respetó el
  esquema existente.
- **Abrir con doble click (`file://`)**: funciona porque Supabase habilita CORS;
  no hace falta servidor local ni instalar dependencias.
- **Rama**: el working tree de este entorno está en `master` sin commits, así que
  el punto de la rama propia queda a cargo de quien publique el PR.
- El archivo `MR.md` anterior (catálogo/detalle desde JavaScript) se dejó intacto;
  este MR está en un archivo aparte.