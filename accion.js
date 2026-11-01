function llenarTabla(tabla, datos) {
  if (!tabla) return;
  var thead = tabla.querySelector('thead');
  var tbody = tabla.querySelector('tbody');
  if (!thead) {
    thead = document.createElement('thead');
    tabla.appendChild(thead);
  }
  if (!tbody) {
    tbody = document.createElement('tbody');
    tabla.appendChild(tbody);
  }
  thead.innerHTML = '';
  tbody.innerHTML = '';
  if (!datos || !datos.length) return;
  var claves = Object.keys(datos[0]);
  var trh = document.createElement('tr');
  claves.forEach(function (k) {
    var th = document.createElement('th');
    th.textContent = k;
    trh.appendChild(th);
  });
  thead.appendChild(trh);
  datos.forEach(function (x) {
    var tr = document.createElement('tr');
    claves.forEach(function (k) {
      var td = document.createElement('td');
      var v = x[k];
      if (v === null || v === undefined) td.textContent = '';
      else if (typeof v === 'object') td.textContent = JSON.stringify(v);
      else td.textContent = String(v);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function activarPlantas() {
  var cont = document.getElementById('contacto-plantas') || document.querySelector('.contacto-plantas');
  if (!cont) return;
  var titulo = document.getElementById('plantas-titulo');
  if (titulo) titulo.style.cursor = 'pointer';
  cont.style.cursor = 'pointer';

  cont.onclick = function (evento) {
    if (evento && evento.target && evento.target.closest && evento.target.closest('.plantas-tabla-wrap')) {
      return;
    }
    var est = document.getElementById('plantas-estado');
    if (cont.classList.contains('abierta')) {
      cont.classList.remove('abierta');
      if (est) est.textContent = '';
      return;
    }
    cont.classList.add('abierta');
    if (est) est.textContent = 'Cargando...';
    if (typeof window.traerDireccionesSupabase !== 'function') {
      if (est) est.textContent = 'Error';
      return;
    }
    window.traerDireccionesSupabase().then(function (d) {
      llenarTabla(document.getElementById('plantas-tabla'), d);
      if (est) est.textContent = (d && d.length) ? '' : 'Sin datos';
    }).catch(function () {
      if (est) est.textContent = 'Error';
    });
  };
}

function inyectarEstilosModalEncuesta() {
  if (document.getElementById('encuesta-modal-estilos')) return;
  var estilo = document.createElement('style');
  estilo.id = 'encuesta-modal-estilos';
  estilo.textContent = [
    '.encuesta-modal-overlay{position:fixed;inset:0;background:rgba(17,24,39,.55);display:none;align-items:center;justify-content:center;z-index:9999;padding:1rem;}',
    '.encuesta-modal-overlay.abierto{display:flex;}',
    '.encuesta-modal{background:#fff;color:#111827;border-radius:1rem;width:min(1100px,100%);max-height:85vh;display:flex;flex-direction:column;box-shadow:0 20px 50px rgba(0,0,0,.25);}',
    '.encuesta-modal-header{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.25rem;border-bottom:1px solid #e5e7eb;}',
    '.encuesta-modal-header h3{margin:0;color:#111827;}',
    '.encuesta-modal-cerrar{border:none;background:transparent;font-size:1.75rem;line-height:1;cursor:pointer;color:#6b7280;padding:0 .25rem;}',
    '.encuesta-modal-cerrar:hover{color:#e11d48;}',
    '.encuesta-modal-cuerpo{padding:1rem 1.25rem 1.25rem;overflow:auto;}',
    '.encuesta-modal-estado{min-height:1.25rem;margin:0 0 .75rem;color:#6b7280;font-size:.95rem;}',
    '.encuesta-modal-tabla{width:100%;border-collapse:collapse;font-size:.95rem;}',
    '.encuesta-modal-tabla th,.encuesta-modal-tabla td{padding:.5rem .6rem;border-bottom:1px solid #e5e7eb;text-align:left;vertical-align:middle;}',
    '.encuesta-modal-tabla th{background:#f9fafb;font-weight:600;white-space:nowrap;}',
    '.encuesta-modal-tabla input{width:100%;min-width:120px;padding:.45rem .55rem;border:1px solid #d1d5db;border-radius:.5rem;font:inherit;color:#111827;background:#fff;}',
    '.encuesta-modal-tabla input:focus{outline:none;border-color:#e11d48;box-shadow:0 0 0 2px rgba(225,29,72,.15);}',
    '.encuesta-modal-tabla input[type="number"]{min-width:80px;width:90px;}',
    '.encuesta-modal-tabla .encuesta-modal-id,.encuesta-modal-tabla .encuesta-modal-fecha{color:#6b7280;white-space:nowrap;}',
    '.encuesta-modal-guardar{border:none;border-radius:2rem;background:#e11d48;color:#fff;font-weight:600;padding:.5rem 1rem;cursor:pointer;white-space:nowrap;}',
    '.encuesta-modal-guardar:hover{background:#be123c;}',
    '.encuesta-modal-guardar:disabled{opacity:.6;cursor:wait;}',
    '.encuesta-modal-salir{display:block;margin-top:.5rem;border:1px solid #d1d5db;border-radius:2rem;background:#fff;color:#374151;font-weight:600;padding:.5rem 1rem;cursor:pointer;white-space:nowrap;}',
    '.encuesta-modal-salir:hover{background:#f3f4f6;color:#111827;}',
    '.encuesta-modal-borrar{display:block;margin-top:.5rem;border:1px solid #e11d48;border-radius:2rem;background:#fff;color:#e11d48;font-weight:600;padding:.5rem 1rem;cursor:pointer;white-space:nowrap;}',
    '.encuesta-modal-borrar:hover{background:#e11d48;color:#fff;}',
    '.encuesta-modal-fila-estado{display:inline-block;margin-left:.5rem;font-size:.85rem;vertical-align:middle;}',
    '.encuesta-modal-fila-ok{color:#15803d;}',
    '.encuesta-modal-fila-error{color:#b91c1c;}',
    '.encuesta-modal-guardadas-wrap{margin-top:1.25rem;border-top:1px solid #e5e7eb;padding-top:1rem;}',
    '.encuesta-modal-guardadas-wrap h4{margin:0 0 .75rem;color:#111827;font-size:1.05rem;}',
    '.encuesta-modal-guardadas{display:flex;flex-direction:column;gap:.75rem;}',
    '.encuesta-guardada{border:1px solid #e5e7eb;border-radius:.75rem;padding:.85rem 1rem;background:#f9fafb;}',
    '.encuesta-guardada-titulo{font-weight:700;color:#111827;margin-bottom:.25rem;}',
    '.encuesta-guardada-opinion{margin:0 0 .35rem;color:#374151;}',
    '.encuesta-guardada-meta{font-size:.8rem;color:#6b7280;}',
    '.encuesta-modal-guardadas-vacio{margin:0;color:#6b7280;font-size:.9rem;}',
    '@media (max-width:640px){.encuesta-modal-tabla th,.encuesta-modal-tabla td{padding:.4rem;}}'
  ].join('');
  document.head.appendChild(estilo);
}

function obtenerModalEncuesta() {
  var overlay = document.getElementById('encuesta-modal-overlay');
  if (overlay) return overlay;
  inyectarEstilosModalEncuesta();
  overlay = document.createElement('div');
  overlay.id = 'encuesta-modal-overlay';
  overlay.className = 'encuesta-modal-overlay';
  overlay.innerHTML =
    '<div class="encuesta-modal" role="dialog" aria-modal="true" aria-labelledby="encuesta-modal-titulo">' +
      '<div class="encuesta-modal-header">' +
        '<h3 id="encuesta-modal-titulo">Encuestas</h3>' +
        '<button type="button" class="encuesta-modal-cerrar" aria-label="Cerrar">&times;</button>' +
      '</div>' +
      '<div class="encuesta-modal-cuerpo">' +
        '<p class="encuesta-modal-estado" id="encuesta-modal-estado"></p>' +
        '<div class="encuesta-modal-tabla-wrap">' +
          '<table class="encuesta-modal-tabla" id="encuesta-modal-tabla"></table>' +
        '</div>' +
        '<div class="encuesta-modal-guardadas-wrap">' +
          '<h4>Encuestas guardadas</h4>' +
          '<div class="encuesta-modal-guardadas" id="encuesta-modal-guardadas"></div>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  overlay.querySelector('.encuesta-modal-cerrar').addEventListener('click', cerrarModalEncuesta);
  overlay.addEventListener('click', function (evento) {
    if (evento.target === overlay) cerrarModalEncuesta();
  });
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && overlay.classList.contains('abierto')) cerrarModalEncuesta();
  });
  return overlay;
}

function abrirModalEncuesta() {
  var overlay = obtenerModalEncuesta();
  overlay.classList.add('abierto');
  document.body.style.overflow = 'hidden';
  renderEncuestasGuardadas();
  cargarTablaEncuesta();
}

function cerrarModalEncuesta() {
  var overlay = document.getElementById('encuesta-modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('abierto');
  document.body.style.overflow = '';
}

function obtenerEncuestasGuardadas() {
  try {
    var guardadas = localStorage.getItem('encuestasguardadas');
    if (!guardadas) return [];
    var datos = JSON.parse(guardadas);
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error('No se pudo leer encuestasguardadas:', error);
    return [];
  }
}

function guardarEncuestaEnLocalStorage(encuesta) {
  if (!encuesta) return;
  var guardadas = obtenerEncuestasGuardadas();
  guardadas.unshift(encuesta);
  try {
    localStorage.setItem('encuestasguardadas', JSON.stringify(guardadas));
  } catch (error) {
    console.error('No se pudo guardar en encuestasguardadas:', error);
  }
}

function borrarUnaEncuestaGuardadaDeRegistro(id) {
  var guardadas = obtenerEncuestasGuardadas();
  var indice = -1;
  for (var i = 0; i < guardadas.length; i++) {
    if (String(guardadas[i].id) === String(id)) {
      indice = i;
      break;
    }
  }
  if (indice === -1) {
    renderEncuestasGuardadas();
    return { eliminada: false, quedan: 0 };
  }
  guardadas.splice(indice, 1);
  try {
    localStorage.setItem('encuestasguardadas', JSON.stringify(guardadas));
  } catch (error) {
    console.error('No se pudo borrar de encuestasguardadas:', error);
    return { eliminada: false, quedan: 0 };
  }
  renderEncuestasGuardadas();
  var quedan = guardadas.filter(function (item) {
    return String(item.id) === String(id);
  }).length;
  return { eliminada: true, quedan: quedan };
}

function crearElementoEncuestaGuardada(encuesta) {
  var item = document.createElement('div');
  item.className = 'encuesta-guardada';

  var titulo = document.createElement('div');
  titulo.className = 'encuesta-guardada-titulo';
  var nombre = encuesta.Nombre || 'Sin nombre';
  var puntuacion = encuesta['Puntuación de 1 a10'];
  titulo.textContent = nombre + (puntuacion !== null && puntuacion !== undefined ? ' — Puntuación: ' + puntuacion : '');
  item.appendChild(titulo);

  var opinion = document.createElement('p');
  opinion.className = 'encuesta-guardada-opinion';
  opinion.textContent = encuesta.Opinion || 'Sin opinión';
  item.appendChild(opinion);

  var meta = document.createElement('div');
  meta.className = 'encuesta-guardada-meta';
  var partes = [];
  if (encuesta.id !== null && encuesta.id !== undefined) partes.push('ID: ' + encuesta.id);
  if (encuesta.created_at) partes.push('Fecha: ' + encuesta.created_at);
  meta.textContent = partes.join(' · ');
  item.appendChild(meta);

  return item;
}

function renderEncuestasGuardadas() {
  var contenedor = document.getElementById('encuesta-modal-guardadas');
  if (!contenedor) return;
  var guardadas = obtenerEncuestasGuardadas();
  contenedor.innerHTML = '';
  if (!guardadas.length) {
    var vacio = document.createElement('p');
    vacio.className = 'encuesta-modal-guardadas-vacio';
    vacio.textContent = 'Todavía no guardaste ninguna encuesta.';
    contenedor.appendChild(vacio);
    return;
  }
  guardadas.forEach(function (encuesta) {
    contenedor.appendChild(crearElementoEncuestaGuardada(encuesta));
  });
}

function etiquetaColumna(clave) {
  if (clave === 'id') return 'ID';
  if (clave === 'created_at') return 'Fecha';
  if (clave === 'Opinion') return 'Opinión';
  if (clave === 'Puntuación de 1 a10') return 'Puntuación (1-10)';
  return clave;
}

function crearInputEncuesta(clave, valor) {
  var input = document.createElement('input');
  if (clave === 'Puntuación de 1 a10') {
    input.type = 'number';
    input.min = '1';
    input.max = '10';
    input.step = '1';
    input.value = valor === null || valor === undefined ? '' : String(valor);
  } else {
    input.type = 'text';
    input.value = valor === null || valor === undefined ? '' : String(valor);
  }
  input.dataset.clave = clave;
  return input;
}

function guardarFilaEncuesta(boton, estado, fila, registro) {
  var cambios = {};
  var valido = true;
  var inputs = fila.querySelectorAll('input[data-clave]');
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    var clave = input.dataset.clave;
    var valor = input.value;
    input.style.borderColor = '';
    if (clave === 'Puntuación de 1 a10') {
      if (valor === '') {
        cambios[clave] = null;
      } else {
        var numero = Number(valor);
        if (isNaN(numero) || numero < 1 || numero > 10) {
          valido = false;
          input.style.borderColor = '#b91c1c';
        } else {
          cambios[clave] = numero;
        }
      }
    } else {
      cambios[clave] = valor;
    }
  }
  if (!valido) {
    estado.className = 'encuesta-modal-fila-estado encuesta-modal-fila-error';
    estado.textContent = 'Puntuación inválida (1-10).';
    return;
  }
  if (typeof window.actualizarEncuesta !== 'function') {
    estado.className = 'encuesta-modal-fila-estado encuesta-modal-fila-error';
    estado.textContent = 'No se encontró actualizarEncuesta().';
    return;
  }
  var actualizado = Object.assign({}, registro, cambios);
  guardarEncuestaEnLocalStorage(actualizado);
  renderEncuestasGuardadas();
  boton.disabled = true;
  boton.textContent = 'Guardado';
  estado.className = 'encuesta-modal-fila-estado encuesta-modal-fila-ok';
  estado.textContent = 'Guardado';
  setTimeout(function () { estado.textContent = ''; }, 2500);
  window.actualizarEncuesta(registro.id, cambios).then(function () {
    boton.disabled = false;
    boton.textContent = 'Guardar';
  }).catch(function (error) {
    boton.disabled = false;
    boton.textContent = 'Guardar';
    estado.className = 'encuesta-modal-fila-estado encuesta-modal-fila-error';
    estado.textContent = 'Error al sincronizar';
    console.error(error);
  });
}

function renderTablaEncuesta(tabla, datos) {
  tabla.innerHTML = '';
  if (!datos || !datos.length) return;
  var claves = Object.keys(datos[0]);
  var noEditables = { id: true, created_at: true };

  var thead = document.createElement('thead');
  var trh = document.createElement('tr');
  claves.forEach(function (clave) {
    var th = document.createElement('th');
    th.textContent = etiquetaColumna(clave);
    trh.appendChild(th);
  });
  var thAcciones = document.createElement('th');
  thAcciones.textContent = 'Acciones';
  trh.appendChild(thAcciones);
  thead.appendChild(trh);
  tabla.appendChild(thead);

  var tbody = document.createElement('tbody');
  datos.forEach(function (registro) {
    var tr = document.createElement('tr');
    claves.forEach(function (clave) {
      var td = document.createElement('td');
      if (noEditables[clave]) {
        td.textContent = registro[clave] === null || registro[clave] === undefined ? '' : String(registro[clave]);
        td.className = clave === 'id' ? 'encuesta-modal-id' : 'encuesta-modal-fecha';
      } else {
        td.appendChild(crearInputEncuesta(clave, registro[clave]));
      }
      tr.appendChild(td);
    });
    var tdAcciones = document.createElement('td');
    var boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'encuesta-modal-guardar';
    boton.textContent = 'Guardar';
    var estadoFila = document.createElement('span');
    estadoFila.className = 'encuesta-modal-fila-estado';
    if (registro.id === null || registro.id === undefined) {
      boton.disabled = true;
      boton.textContent = 'Sin ID';
    } else {
      boton.addEventListener('click', function () {
        guardarFilaEncuesta(boton, estadoFila, tr, registro);
      });
    }
    tdAcciones.appendChild(boton);
    tdAcciones.appendChild(estadoFila);
    var botonSalir = document.createElement('button');
    botonSalir.type = 'button';
    botonSalir.className = 'encuesta-modal-salir';
    botonSalir.textContent = 'Salir';
    botonSalir.addEventListener('click', cerrarModalEncuesta);
    tdAcciones.appendChild(botonSalir);
    var botonBorrar = document.createElement('button');
    botonBorrar.type = 'button';
    botonBorrar.className = 'encuesta-modal-borrar';
    botonBorrar.textContent = 'Borrar';
    botonBorrar.addEventListener('click', function () {
      var resultado = borrarUnaEncuestaGuardadaDeRegistro(registro.id);
      estadoFila.className = 'encuesta-modal-fila-estado ' + (resultado.eliminada ? 'encuesta-modal-fila-ok' : 'encuesta-modal-fila-error');
      estadoFila.textContent = resultado.eliminada
        ? (resultado.quedan ? 'Borrada 1 (quedan ' + resultado.quedan + ')' : 'Borrado')
        : 'No había guardadas';
      setTimeout(function () { estadoFila.textContent = ''; }, 2500);
    });
    tdAcciones.appendChild(botonBorrar);
    tr.appendChild(tdAcciones);
    tbody.appendChild(tr);
  });
  tabla.appendChild(tbody);
}

function cargarTablaEncuesta() {
  var estado = document.getElementById('encuesta-modal-estado');
  var tabla = document.getElementById('encuesta-modal-tabla');
  if (!tabla) return;
  if (estado) estado.textContent = 'Cargando...';
  tabla.innerHTML = '';
  if (typeof window.encuestasupabase !== 'function') {
    if (estado) estado.textContent = 'No se encontró encuestasupabase().';
    return;
  }
  window.encuestasupabase().then(function (datos) {
    if (!datos || !datos.length) {
      if (estado) estado.textContent = 'No hay encuestas para mostrar.';
      return;
    }
    if (estado) estado.textContent = 'Editá los campos y presioná Guardar.';
    renderTablaEncuesta(tabla, datos);
  }).catch(function (error) {
    if (estado) estado.textContent = 'Error al cargar las encuestas.';
    console.error(error);
  });
}

function activarEncuesta() {
  var titulo = document.getElementById('encuesta-titulo');
  if (!titulo) return;
  titulo.onclick = abrirModalEncuesta;
}

function activarTodo() {
  activarPlantas();
  activarEncuesta();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', activarTodo);
else activarTodo();
