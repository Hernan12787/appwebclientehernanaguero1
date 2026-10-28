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


