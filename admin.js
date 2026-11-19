function obtenerAdminEstado() {
  return document.getElementById('admin-estado');
}

function setAdminEstado(mensaje) {
  const estado = obtenerAdminEstado();
  if (estado) estado.textContent = mensaje || '';
}

function llenarAdminForm(producto) {
  const id = document.getElementById('admin-id');
  const nombre = document.getElementById('admin-nombre');
  const precio = document.getElementById('admin-precio');
  const url = document.getElementById('admin-url');
  if (!id || !nombre || !precio || !url) return;
  id.value = producto.id;
  nombre.value = producto.nombre || '';
  precio.value = producto.precio === null || producto.precio === undefined ? '' : String(producto.precio);
  url.value = producto.url || '';
}

function renderAdminLista(productos) {
  const contenedor = document.getElementById('admin-lista');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  if (!productos || !productos.length) {
    contenedor.textContent = 'No hay productos cargados.';
    return;
  }
  const lista = document.createElement('ul');
  lista.className = 'admin-lista';
  productos.forEach(function (producto) {
    const item = document.createElement('li');
    item.className = 'admin-item';

    const nombre = document.createElement('input');
    nombre.type = 'text';
    nombre.value = producto.nombre || '';

    const precio = document.createElement('input');
    precio.type = 'number';
    precio.step = 'any';
    precio.value = producto.precio === null || producto.precio === undefined ? '' : String(producto.precio);

    const url = document.createElement('input');
    url.type = 'text';
    url.value = producto.url || '';

    const botonActualizar = document.createElement('button');
    botonActualizar.type = 'button';
    botonActualizar.textContent = 'Actualizar';
    botonActualizar.addEventListener('click', async function () {
      if (typeof window.actualizarProductoNuevoproducto !== 'function') {
        setAdminEstado('No se encontró la función de actualización.');
        return;
      }
      const cambios = {
        nombre: nombre.value.trim(),
        precio: precio.value === '' ? 0 : Number(precio.value),
        url: url.value.trim()
      };
      try {
        botonActualizar.disabled = true;
        setAdminEstado('Actualizando...');
        await window.actualizarProductoNuevoproducto(producto.id, cambios);
        setAdminEstado('Producto actualizado.');
        await cargarAdmin();
      } catch (error) {
        console.error(error);
        setAdminEstado('Error al actualizar: ' + (error && error.message ? error.message : 'desconocido'));
      } finally {
        botonActualizar.disabled = false;
      }
    });

    item.appendChild(nombre);
    item.appendChild(precio);
    item.appendChild(url);
    item.appendChild(botonActualizar);
    lista.appendChild(item);
  });
  contenedor.appendChild(lista);
}

async function cargarAdmin() {
  if (typeof window.obtenerProductosNuevos !== 'function') {
    setAdminEstado('No se encontró la función para cargar productos.');
    return;
  }
  try {
    const productos = await window.obtenerProductosNuevos();
    renderAdminLista(productos);
  } catch (error) {
    console.error(error);
    setAdminEstado('Error al cargar: ' + (error && error.message ? error.message : 'desconocido'));
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
    if (id.value) {
      if (typeof window.actualizarProductoNuevoproducto !== 'function') {
        throw new Error('No se encontró la función de actualización.');
      }
      setAdminEstado('Actualizando...');
      await window.actualizarProductoNuevoproducto(Number(id.value), datos);
      setAdminEstado('Producto actualizado correctamente.');
    } else {
      if (typeof window.insertarProductoNuevoproducto !== 'function') {
        throw new Error('No se encontró la función de guardado.');
      }
      setAdminEstado('Guardando...');
      await window.insertarProductoNuevoproducto(datos);
      setAdminEstado('Producto guardado correctamente.');
      const form = document.getElementById('admin-form');
      if (form) form.reset();
    }
    await cargarAdmin();
  } catch (error) {
    console.error(error);
    setAdminEstado('No se pudo guardar: ' + (error && error.message ? error.message : 'error desconocido'));
  } finally {
    if (boton) boton.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const botonCargar = document.getElementById('admin-cargar');
  const form = document.getElementById('admin-form');

  if (botonCargar) {
    botonCargar.addEventListener('click', function () {
      cargarAdmin();
    });
  }
  if (form) {
    form.addEventListener('submit', function (evento) {
      guardarAdmin(evento);
    });
  }

  cargarAdmin();
});
