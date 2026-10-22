const productos = [
  {
    "id": "detalle-coca-cola",
    "imagen": {
      "src": "img/coca-cola.jpg",
      "alt": "Coca-Cola Original 500ml"
    },
    "titulo": "Coca-Cola Original 500ml",
    "descripcion": "El sabor original de siempre, en botella de 500ml. Perfecta para compartir cada momento.",
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
    "imagen": {
      "src": "img/sprite.jpg",
      "alt": "Sprite Lima-Limón 500ml"
    },
    "titulo": "Sprite Lima-Limón 500ml",
    "descripcion": "Frescura lima-limón con burbujas que despiertan los sentidos. En botella de 500ml.",
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
    "imagen": {
      "src": "img/fanta.jpg",
      "alt": "Fanta Naranja 500ml"
    },
    "titulo": "Fanta Naranja 500ml",
    "descripcion": "Diversión y sabor a naranja en cada sorbo. En botella de 500ml.",
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
    "imagen": {
      "src": "img/schweppes.jpg",
      "alt": "Schweppes Tónica 500ml"
    },
    "titulo": "Schweppes Tónica 500ml",
    "descripcion": "Un clásico para grandes ocasiones. Agua tónica en botella de 500ml.",
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

  const fragmento = document.createDocumentFragment();
  productos.forEach((producto) => {
    fragmento.appendChild(crearProductoDetalle(producto));
  });
  contenedor.appendChild(fragmento);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderProductos);
} else {
  renderProductos();
}
