function obtenerAdminEstado() {
  return document.getElementById('admin-estado');
}

function setAdminEstado(mensaje) {
  const estado = obtenerAdminEstado();
  if (estado) estado.textContent = mensaje || '';
}

function renderAdminLista(productos) {
  const contenedor = document.getElementById('admin-lista');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  if (!Array.isArray(productos) || !productos.length) {
    contenedor.innerHTML = '<p class="admin-vacio">No hay productos cargados.</p>';
    return;
  }
  const lista = document.createElement('ul');
  lista.className = 'admin-lista-items';
  productos.forEach(function (producto) {
    const item = document.createElement('li');
    item.className = 'admin-item';

    const campos = document.createElement('div');
    campos.className = 'admin-item-campos';

    const grupoNombre = document.createElement('div');
    grupoNombre.className = 'admin-campo';
    const labelNombre = document.createElement('label');
    labelNombre.textContent = 'Nombre';
    const nombre = document.createElement('input');
    nombre.type = 'text';
    nombre.value = producto.nombre || '';
    nombre.readOnly = true;
    grupoNombre.appendChild(labelNombre);
    grupoNombre.appendChild(nombre);

    const grupoPrecio = document.createElement('div');
    grupoPrecio.className = 'admin-campo';
    const labelPrecio = document.createElement('label');
    labelPrecio.textContent = 'Precio';
    const precio = document.createElement('input');
    precio.type = 'number';
    precio.step = 'any';
    precio.value = producto.precio === null || producto.precio === undefined ? '' : String(producto.precio);
    precio.readOnly = true;
    grupoPrecio.appendChild(labelPrecio);
    grupoPrecio.appendChild(precio);

    const grupoUrl = document.createElement('div');
    grupoUrl.className = 'admin-campo admin-campo-url';
    const labelUrl = document.createElement('label');
    labelUrl.textContent = 'URL imagen';
    const url = document.createElement('input');
    url.type = 'text';
    url.value = producto.url || '';
    url.readOnly = true;
    grupoUrl.appendChild(labelUrl);
    grupoUrl.appendChild(url);

    campos.appendChild(grupoNombre);
    campos.appendChild(grupoPrecio);
    campos.appendChild(grupoUrl);

    const acciones = document.createElement('div');
    acciones.className = 'admin-item-acciones';

    const idBadge = document.createElement('span');
    idBadge.className = 'admin-id-badge';
    idBadge.textContent = 'ID: ' + producto.id;

    const botones = document.createElement('div');
    botones.className = 'admin-item-botones';

    const botonEliminar = document.createElement('button');
    botonEliminar.type = 'button';
    botonEliminar.className = 'admin-btn-eliminar';
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', async function () {
      if (typeof window.eliminarProductoNuevoproducto !== 'function') {
        setAdminEstado('No se encontró la función de eliminación.');
        return;
      }
      try {
        botonEliminar.disabled = true;
        setAdminEstado('Eliminando...');
        await window.eliminarProductoNuevoproducto(producto.id);
        setAdminEstado('Producto eliminado.');
        await cargarAdmin(false).catch(function () {});
      } catch (error) {
        console.error(error);
        setAdminEstado('Error al eliminar: ' + (error && error.message ? error.message : 'desconocido'));
      } finally {
        botonEliminar.disabled = false;
      }
    });

    botones.appendChild(botonEliminar);
    acciones.appendChild(idBadge);
    acciones.appendChild(botones);

    item.appendChild(campos);
    item.appendChild(acciones);
    lista.appendChild(item);
  });
  contenedor.appendChild(lista);
}

async function cargarAdmin(mostrarError) {
  if (mostrarError === undefined) mostrarError = true;
  if (typeof window.obtenerProductosNuevos !== 'function') {
    if (mostrarError) setAdminEstado('No se encontró la función para cargar productos.');
    return [];
  }
  try {
    const productos = await window.obtenerProductosNuevos();
    renderAdminLista(Array.isArray(productos) ? productos : []);
    return Array.isArray(productos) ? productos : [];
  } catch (error) {
    console.error(error);
    if (mostrarError) setAdminEstado('Error al cargar: ' + (error && error.message ? error.message : 'desconocido'));
    return null;
  }
}

async function guardarAdmin(evento) {
  evento.preventDefault();
  const id = document.getElementById('admin-id');
  const nombre = document.getElementById('admin-nombre');
  const precio = document.getElementById('admin-precio');
  const url = document.getElementById('admin-url');
  const boton = document.getElementById('admin-guardar');

  const datos = {
    nombre: nombre.value.trim(),
    precio: precio.value === '' ? 0 : Number(precio.value),
    url: url.value.trim()
  };

  if (!datos.nombre) {
    setAdminEstado('Completá el nombre del producto.');
    return;
  }

  try {
    if (boton) boton.disabled = true;
    if (typeof window.insertarProductoNuevoproducto !== 'function') {
      throw new Error('No se encontró la función de guardado.');
    }
    setAdminEstado('Guardando...');
    const creado = await window.insertarProductoNuevoproducto(datos);
    const creadoItem = Array.isArray(creado) ? creado[0] : creado;
    const form = document.getElementById('admin-form');
    if (form) form.reset();
    if (id) id.value = '';
    if (creadoItem && creadoItem.id !== undefined && creadoItem.id !== null) {
      setAdminEstado('Producto guardado correctamente (ID ' + creadoItem.id + ').');
    } else {
      setAdminEstado('Producto guardado correctamente.');
    }
    await cargarAdmin(false).catch(function () {});
  } catch (error) {
    console.error(error);
    setAdminEstado('No se pudo guardar: ' + (error && error.message ? error.message : 'error desconocido'));
  } finally {
    if (boton) boton.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const botonNuevo = document.getElementById('admin-nuevo');
  const form = document.getElementById('admin-form');

  if (botonNuevo) {
    botonNuevo.addEventListener('click', function () {
      if (form) form.reset();
      const id = document.getElementById('admin-id');
      if (id) id.value = '';
      setAdminEstado('Nuevo producto: completá los datos y hacé clic en Guardar.');
    });
  }
  if (form) {
    form.addEventListener('submit', function (evento) {
      guardarAdmin(evento);
    });
  }

  cargarAdmin(false);
});
