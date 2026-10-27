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
      "Presentación: Botella PET",
      "Precio sugerido: $1.900"
    ],
    "volver": {
      "texto": "Volver al catálogo",
      "url": "index.html#catalogo"
    }
  },
  {
    "id": "detalle-sprite",
    "slug": "sprite",
    "clase": "producto-sprite",
    "imagen": {
      "src": "img/sprite.jpg",
      "alt": "Sprite Lima-Limón 500ml"
    },
    "titulo": "Sprite Lima-Limón 500ml",
    "descripcion": "Frescura lima-limón con burbujas que despiertan los sentidos. En botella de 500ml.",
    "descripcionCatalogo": "Frescura lima-limón en botella de 500ml.",
    "especificaciones": [
      "Contenido neto: 500 ml",
      "Presentación: Botella PET",
      "Precio sugerido: $1.800"
    ],
    "volver": {
      "texto": "Volver al catálogo",
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
    "descripcion": "Diversión y sabor a naranja en cada sorbo. En botella de 500ml.",
    "descripcionCatalogo": "Diversión y sabor naranja en botella de 500ml.",
    "especificaciones": [
      "Contenido neto: 500 ml",
      "Presentación: Botella PET",
      "Precio sugerido: $1.800"
    ],
    "volver": {
      "texto": "Volver al catálogo",
      "url": "index.html#catalogo"
    }
  },
  {
    "id": "detalle-schweppes",
    "slug": "schweppes",
    "clase": "producto-schweppes",
    "imagen": {
      "src": "img/schweppes.jpg",
      "alt": "Schweppes Tónica 500ml"
    },
    "titulo": "Schweppes Tónica 500ml",
    "descripcion": "Un clásico para grandes ocasiones. Agua tónica en botella de 500ml.",
    "descripcionCatalogo": "Un clásico para grandes ocasiones en botella de 500ml.",
    "especificaciones": [
      "Contenido neto: 500 ml",
      "Presentación: Botella PET",
      "Precio sugerido: $2.000"
    ],
    "volver": {
      "texto": "Volver al catálogo",
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

var plantasCargadas = false;

function inicializarPlantas() {
  var tituloPlantas = document.getElementById("plantas-titulo");
  if (!tituloPlantas) {
    return;
  }
  tituloPlantas.addEventListener("click", function() {
    var tabla = document.getElementById("plantas-tabla");
    if (!tabla) {
      return;
    }
    if (plantasCargadas && tabla.innerHTML !== "") {
      tabla.innerHTML = "";
      var estado = document.getElementById("plantas-estado");
      if (estado) {
        estado.textContent = "";
      }
      plantasCargadas = false;
      return;
    }

    fetch("https://hangxmottfnjoxtrnxzy.supabase.co/rest/v1/Coca-Cola?select=*", {
      headers: {
        "Content-Type": "application/json",
        "apikey": "sb_publishable_caiELbjOQdhK6NS9Ws2wuQ_ZyNeEMHl"
      }
    })
    .then(function(r) { return r.ok ? r.json() : []; })
    .then(function(data) {
      var estado = document.getElementById("plantas-estado");
      if (!Array.isArray(data) || !data.length) {
        if (estado) {
          estado.textContent = "Sin datos.";
        }
        return;
      }
      tabla.innerHTML = "";
      var thead = document.createElement("thead");
      var trh = document.createElement("tr");
      Object.keys(data[0]).forEach(function(k) {
        var th = document.createElement("th");
        th.textContent = k;
        trh.appendChild(th);
      });
      thead.appendChild(trh);
      tabla.appendChild(thead);
      var tbody = document.createElement("tbody");
      data.forEach(function(fila) {
        var tr = document.createElement("tr");
        Object.keys(data[0]).forEach(function(k) {
          var td = document.createElement("td");
          td.textContent = fila[k] == null ? "" : fila[k];
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      tabla.appendChild(tbody);
      if (estado) {
        estado.textContent = "";
      }
      plantasCargadas = true;
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarPlantas);
} else {
  inicializarPlantas();
}
