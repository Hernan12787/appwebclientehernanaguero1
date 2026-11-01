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

function activarEncuesta() {
  var titulo = document.getElementById('encuesta-titulo');
  if (!titulo) {
    var h3s = document.getElementsByTagName('h3');
    for (var i = 0; i < h3s.length; i++) {
      if (h3s[i].textContent.indexOf('gusta') >= 0 || h3s[i].textContent.indexOf('opinion') >= 0) {
        titulo = h3s[i];
        break;
      }
    }
  }
  if (!titulo) return;
  titulo.setAttribute('style', 'cursor:pointer');
  titulo.onclick = function () {
    var cont = document.getElementById('encuesta') || document.querySelector('.encuesta');
    if (!cont) return;
    var est = document.getElementById('encuesta-estado2');
    if (cont.classList.contains('abierta')) {
      cont.classList.remove('abierta');
      if (est) est.textContent = '';
      return;
    }
    cont.classList.add('abierta');
    if (est) est.textContent = 'Cargando...';
    if (typeof encuestasupabase !== 'function') {
      if (est) est.textContent = 'Error';
      return;
    }
    encuestasupabase().then(function (d) {
      var tabla = document.getElementById('encuesta-tabla2');
      llenarTabla(tabla, d);
      if (tabla && d && d.length) {
        var tbody = tabla.querySelector('tbody');
        var claves = Object.keys(d[0]);
        d.forEach(function (x) {
          var trb = document.createElement('tr');
          var tdb = document.createElement('td');
          tdb.colSpan = claves.length;
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = 'Modificar';
          btn.onclick = function () {
            if (document.getElementById('encuesta-id') && x.id !== undefined) document.getElementById('encuesta-id').value = x.id;
            if (document.getElementById('nombre')) document.getElementById('nombre').value = x.nombre || x.Nombre || '';
            if (document.getElementById('email')) document.getElementById('email').value = x.email || x.Email || '';
            if (document.getElementById('telefono')) document.getElementById('telefono').value = x.telefono || x.Telefono || '';
            if (document.getElementById('asunto')) document.getElementById('asunto').value = x.asunto || x.Asunto || '';
            if (document.getElementById('mensaje')) document.getElementById('mensaje').value = x.mensaje || x.Mensaje || '';
            window.scrollTo(0, 0);
          };
          tdb.appendChild(btn);
          trb.appendChild(tdb);
          tbody.appendChild(trb);
        });
      }
      if (est) est.textContent = (d && d.length) ? '' : 'Sin datos';
    }).catch(function () {
      if (est) est.textContent = 'Error';
    });
  };
}

function activarTodo() {
  activarPlantas();
  activarEncuesta();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', activarTodo);
else activarTodo();
