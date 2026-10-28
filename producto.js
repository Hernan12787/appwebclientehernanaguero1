const productos = [
  {
    "id": "detalle-coca-cola",
    "slug": "coca-cola",
    "clase": "producto-coca-cola",
    "imagen": {
      "src": "img/coca-cola.jpg",
      "alt": "Coca-Cola Original 500ml"
    },
    "titulo": "Coca-Cola Original 500ml",
    "descripcion": "El sabor original de siempre, en botella de 500ml. Perfecta para compartir cada momento.",
    "descripcionCatalogo": "El sabor original en botella de 500ml.",
    "especificaciones": [
      "Contenido neto: 500 ml",
      "PresentaciÃ³n: Botella PET",
      "Precio sugerido: $1.900"
    ],
    "volver": {
      "texto": "Volver al catÃ¡logo",
      "url": "index.html#catalogo"
    }
  },
  {
    "id": "detalle-sprite",
    "slug": "sprite",
    "clase": "producto-sprite",
    "imagen": {
      "src": "img/sprite.jpg",
      "alt": "Sprite Lima-LimÃ³n 500ml"
    },
    "titulo": "Sprite Lima-LimÃ³n 500ml",
    "descripcion": "Frescura lima-limÃ³n con burbujas que despiertan los sentidos. En botella de 500ml.",
    "descripcionCatalogo": "Frescura lima-limÃ³n en botella de 500ml.",
    "especificaciones": [
      "Contenido neto: 500 ml",
      "PresentaciÃ³n: Botella PET",
      "Precio sugerido: $1.800"
    ],
    "volver": {
      "texto": "Volver al catÃ¡logo",
      "url": "index.html#catalogo"
    }
  },
  {
    "id": "detalle-fanta",
    "slug": "fanta",
    "clase": "producto-fanta",
    "imagen": {
      "src": "img/fanta.jpg",
      "alt": "Fanta Naranja 500ml"
    },
    "titulo": "Fanta Naranja 500ml",
    "descripcion": "DiversiÃ³n y sabor a naranja en cada sorbo. En botella de 500ml.",
    "descripcionCatalogo": "DiversiÃ³n y sabor naranja en botella de 500ml.",
    "especificaciones": [
      "Contenido neto: 500 ml",
      "PresentaciÃ³n: Botella PET",
      "Precio sugerido: $1.800"
    ],
    "volver": {
      "texto": "Volver al catÃ¡logo",
      "url": "index.html#catalogo"
    }
  },
  {
    "id": "detalle-schweppes",
    "slug": "schweppes",
    "clase": "producto-schweppes",
    "imagen": {
      "src": "img/schweppes.jpg",
      "alt": "Schweppes TÃ³nica 500ml"
    },
    "titulo": "Schweppes TÃ³nica 500ml",
    "descripcion": "Un clÃ¡sico para grandes ocasiones. Agua tÃ³nica en botella de 500ml.",
    "descripcionCatalogo": "Un clÃ¡sico para grandes ocasiones en botella de 500ml.",
    "especificaciones": [
      "Contenido neto: 500 ml",
      "PresentaciÃ³n: Botella PET",
      "Precio sugerido: $2.000"
    ],
    "volver": {
      "texto": "Volver al catÃ¡logo",
      "url": "index.html#catalogo"
    }
  }
];

function crearProductoCatalogo(producto) {
  const articulo = document.createElement("article");
  articulo.className = `producto ${producto.clase}`;

  const imagen = document.createElement("img");
  imagen.src = producto.imagen.src;
  imagen.alt = producto.imagen.alt;
  articulo.appendChild(imagen);

  const titulo = document.createElement("h4");
  titulo.textContent = producto.titulo;
  articulo.appendChild(titulo);

  const descripcion = document.createElement("p");
  descripcion.textContent = producto.descripcionCatalogo;
  articulo.appendChild(descripcion);

  const enlace = document.createElement("a");
  enlace.href = `producto.html?id=${producto.slug}`;
  enlace.textContent = "Ver detalle";
  articulo.appendChild(enlace);

  return articulo;
}

function crearProductoDetalle(producto) {
  const articulo = document.createElement("article");
  articulo.className = "producto-detalle";
  articulo.id = producto.id;

  const imagen = document.createElement("img");
  imagen.src = producto.imagen.src;
  imagen.alt = producto.imagen.alt;
  articulo.appendChild(imagen);

  const titulo = document.createElement("h4");
  titulo.textContent = producto.titulo;
  articulo.appendChild(titulo);

  const descripcion = document.createElement("p");
  descripcion.textContent = producto.descripcion;
  articulo.appendChild(descripcion);

  const especificaciones = document.createElement("ul");
  producto.especificaciones.forEach((especificacion) => {
    const item = document.createElement("li");
    item.textContent = especificacion;
    especificaciones.appendChild(item);
  });
  articulo.appendChild(especificaciones);

  const enlace = document.createElement("a");
  enlace.href = producto.volver.url;
  enlace.textContent = producto.volver.texto;
  articulo.appendChild(enlace);

  return articulo;
}

function renderProductos() {
  const contenedor = document.querySelector("#productos");
  if (!contenedor) {
    return;
  }

  const esCatalogo = contenedor.classList.contains("item-cards");
  const crearProducto = esCatalogo ? crearProductoCatalogo : crearProductoDetalle;
  const fragmento = document.createDocumentFragment();

  productos.forEach((producto) => {
    fragmento.appendChild(crearProducto(producto));
  });
  contenedor.appendChild(fragmento);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderProductos);
} else {
  renderProductos();
}
const traerDireccionesSupabase = async () => {
        const url = 'https://hangxmottfnjoxtrnxzy.supabase.co/rest/v1/Coca-Cola?select=*';\r\n  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "apikey": sb_publishable_caiELbjOQdhK6NS9Ws2wuQ_ZyNeEMHl

    },
  };
  return fetch(url, options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener las direcciones');
    }
    return response.json();
  })
  .then(data => { 
    return data;
  })
  .catch(error => {
    console.error('Error en la solicitud a Spabase:', error);
    return [];
  });
};

const  encuestasupabase = async () => {
          const url = 'https://hangxmottfnjoxtrnxzy.supabase.co/rest/v1/Coca-Cola?select=*';\r\n  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "apikey": sb_publishable_AsYscH20ZSRlzNTpffXfqQ_fEkb_8Mt
    }
    };
    return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener las encuestas');
      }
      return response.json();
    })
    .then(data => { 
      return data;
    })
    .catch(error => {
      console.error('Error en la solicitud a Supabase:', error);
      return [];
    })
  };


// Plantas Supabase



document.addEventListener('DOMContentLoaded', function() {
  function togglePlantas() {
    var cont = document.getElementById('contacto-plantas');
    if (!cont) cont = document.querySelector('.contacto-plantas');
    var estado = document.getElementById('plantas-estado');
    if (cont.classList.contains('abierta')) {
      cont.classList.remove('abierta');
      if (estado) estado.innerHTML = '';
      return;
    }
    cont.classList.add('abierta');
    if (estado) estado.innerHTML = 'Cargando...';
    traerDireccionesSupabase().then(function(datos) {
      var tabla = document.getElementById('plantas-tabla');
      if (tabla) {
        var thead = tabla.querySelector('thead');
        var cuerpo = tabla.querySelector('tbody');
        if (!thead) { thead = document.createElement('thead'); tabla.appendChild(thead); }
        if (!cuerpo) { cuerpo = document.createElement('tbody'); tabla.appendChild(cuerpo); }
        thead.innerHTML = '';
        cuerpo.innerHTML = '';
        if (datos && datos.length > 0) {
          var trh = document.createElement('tr');
          Object.keys(datos[0]).forEach(function(k) {
            var th = document.createElement('th');
            th.textContent = k;
            trh.appendChild(th);
          });
          thead.appendChild(trh);
          datos.forEach(function(d) {
            var tr = document.createElement('tr');
            Object.keys(datos[0]).forEach(function(k) {
              var td = document.createElement('td');
              var v = d[k];
              if (v === null || v === undefined) td.textContent = '';
              else if (typeof v === 'object') td.textContent = JSON.stringify(v);
              else td.textContent = String(v);
              tr.appendChild(td);
            });
            cuerpo.appendChild(tr);
          });
        }
      }
      if (estado) estado.innerHTML = (datos && datos.length) ? '' : 'Sin datos';
    }).catch(function() {
      if (estado) estado.innerHTML = 'Error';
    });
  }

  var pt = document.getElementById('plantas-titulo');
  if (pt) {
    pt.style.cursor = 'pointer';
    pt.onclick = togglePlantas;
  }

  function toggleEncuesta() {
    var cont = document.getElementById('encuesta');
    if (!cont) cont = document.querySelector('.encuesta');
    var estado = document.getElementById('encuesta-estado2');
    if (cont.classList.contains('abierta')) {
      cont.classList.remove('abierta');
      if (estado) estado.innerHTML = '';
      return;
    }
    cont.classList.add('abierta');
    if (estado) estado.innerHTML = 'Cargando...';
    encuestasupabase().then(function(datos) {
      var tabla = document.getElementById('encuesta-tabla2');
      if (tabla) {
        var thead = tabla.querySelector('thead');
        var cuerpo = tabla.querySelector('tbody');
        if (!thead) { thead = document.createElement('thead'); tabla.appendChild(thead); }
        if (!cuerpo) { cuerpo = document.createElement('tbody'); tabla.appendChild(cuerpo); }
        thead.innerHTML = '';
        cuerpo.innerHTML = '';
        if (datos && datos.length > 0) {
          var trh = document.createElement('tr');
          Object.keys(datos[0]).forEach(function(k) {
            var th = document.createElement('th');
            th.textContent = k;
            trh.appendChild(th);
          });
          thead.appendChild(trh);
          datos.forEach(function(d) {
            var tr = document.createElement('tr');
            Object.keys(datos[0]).forEach(function(k) {
              var td = document.createElement('td');
              var v = d[k];
              if (v === null || v === undefined) td.textContent = '';
              else if (typeof v === 'object') td.textContent = JSON.stringify(v);
              else td.textContent = String(v);
              tr.appendChild(td);
            });
            cuerpo.appendChild(tr);
            var trb = document.createElement('tr');
            var tdb = document.createElement('td');
            tdb.colSpan = Object.keys(datos[0]).length;
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = 'Modificar';
            btn.onclick = function() {
              if (document.getElementById('encuesta-id') && d.id !== undefined) document.getElementById('encuesta-id').value = d.id;
              if (document.getElementById('nombre')) document.getElementById('nombre').value = d.nombre || '';
              if (document.getElementById('email')) document.getElementById('email').value = d.email || '';
              if (document.getElementById('telefono')) document.getElementById('telefono').value = d.telefono || '';
              if (document.getElementById('asunto')) document.getElementById('asunto').value = d.asunto || '';
              if (document.getElementById('mensaje')) document.getElementById('mensaje').value = d.mensaje || '';
              window.scrollTo(0, 0);
            };
            tdb.appendChild(btn);
            trb.appendChild(tdb);
            cuerpo.appendChild(trb);
          });
        }
      }
      if (estado) estado.innerHTML = (datos && datos.length) ? '' : 'Sin datos';
    }).catch(function() {
      if (estado) estado.innerHTML = 'Error';
    });
  }

  var et = document.getElementById('encuesta-titulo');
  if (et) {
    et.style.cursor = 'pointer';
    et.onclick = toggleEncuesta;
  }
});
function activarPlantas() {
  var titulo = document.getElementById('plantas-titulo');
  if (!titulo) return;
  titulo.onclick = function() {
    var cont = document.getElementById('contacto-plantas') || document.querySelector('.contacto-plantas');
    var estado = document.getElementById('plantas-estado');
    if (cont.classList.contains('abierta')) {
      cont.classList.remove('abierta');
      if (estado) estado.textContent = '';
      return;
    }
    cont.classList.add('abierta');
    if (estado) estado.textContent = 'Cargando...';
    traerDireccionesSupabase().then(function(datos) {
      var tabla = document.getElementById('plantas-tabla');
      if (tabla) {
        var thead = tabla.querySelector('thead');
        var tbody = tabla.querySelector('tbody');
        if (!thead) { thead = document.createElement('thead'); tabla.appendChild(thead); }
        if (!tbody) { tbody = document.createElement('tbody'); tabla.appendChild(tbody); }
        thead.innerHTML = '';
        tbody.innerHTML = '';
        if (datos && datos.length > 0) {
          var trh = document.createElement('tr');
          Object.keys(datos[0]).forEach(function(k) {
            var th = document.createElement('th');
            th.textContent = k;
            trh.appendChild(th);
          });
          thead.appendChild(trh);
          datos.forEach(function(d) {
            var tr = document.createElement('tr');
            Object.keys(datos[0]).forEach(function(k) {
              var td = document.createElement('td');
              var v = d[k];
              if (v === null || v === undefined) td.textContent = '';
              else if (typeof v === 'object') td.textContent = JSON.stringify(v);
              else td.textContent = String(v);
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
          });
        }
      }
      if (estado) estado.textContent = (datos && datos.length) ? '' : 'Sin datos';
    }).catch(function() {
      if (estado) estado.textContent = 'Error';
    });
  };
}

function activarEncuesta() {
  var titulo = document.getElementById('encuesta-titulo');
  if (!titulo) return;
  titulo.onclick = function() {
    var cont = document.getElementById('encuesta') || document.querySelector('.encuesta');
    var estado = document.getElementById('encuesta-estado2');
    if (cont.classList.contains('abierta')) {
      cont.classList.remove('abierta');
      if (estado) estado.textContent = '';
      return;
    }
    cont.classList.add('abierta');
    if (estado) estado.textContent = 'Cargando...';
    encuestasupabase().then(function(datos) {
      var tabla = document.getElementById('encuesta-tabla2');
      if (tabla) {
        var thead = tabla.querySelector('thead');
        var tbody = tabla.querySelector('tbody');
        if (!thead) { thead = document.createElement('thead'); tabla.appendChild(thead); }
        if (!tbody) { tbody = document.createElement('tbody'); tabla.appendChild(tbody); }
        thead.innerHTML = '';
        tbody.innerHTML = '';
        if (datos && datos.length > 0) {
          var trh = document.createElement('tr');
          Object.keys(datos[0]).forEach(function(k) {
            var th = document.createElement('th');
            th.textContent = k;
            trh.appendChild(th);
          });
          thead.appendChild(trh);
          datos.forEach(function(d) {
            var tr = document.createElement('tr');
            Object.keys(datos[0]).forEach(function(k) {
              var td = document.createElement('td');
              var v = d[k];
              if (v === null || v === undefined) td.textContent = '';
              else if (typeof v === 'object') td.textContent = JSON.stringify(v);
              else td.textContent = String(v);
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
            var trb = document.createElement('tr');
            var tdb = document.createElement('td');
            tdb.colSpan = Object.keys(datos[0]).length;
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = 'Modificar';
            btn.onclick = function() {
              var idInput = document.getElementById('encuesta-id');
              if (idInput && d.id !== undefined) idInput.value = d.id;
              if (document.getElementById('nombre')) document.getElementById('nombre').value = d.nombre || '';
              if (document.getElementById('email')) document.getElementById('email').value = d.email || '';
              if (document.getElementById('telefono')) document.getElementById('telefono').value = d.telefono || '';
              if (document.getElementById('asunto')) document.getElementById('asunto').value = d.asunto || '';
              if (document.getElementById('mensaje')) document.getElementById('mensaje').value = d.mensaje || '';
              window.scrollTo(0, 0);
            };
            tdb.appendChild(btn);
            trb.appendChild(tdb);
            tbody.appendChild(trb);
          });
        }
      }
      if (estado) estado.textContent = (datos && datos.length) ? '' : 'Sin datos';
    }).catch(function() {
      if (estado) estado.textContent = 'Error';
    });
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    activarPlantas();
    activarEncuesta();
  });
} else {
  activarPlantas();
  activarEncuesta();
}