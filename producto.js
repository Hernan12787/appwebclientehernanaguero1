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
const traerDireccionesSupabase = async () => {
  const url = "https://hangxmottfnjoxtrnxzy.supabase.co/rest/v1/Coca-Cola?select=*";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "apikey": "sb_publishable_caiELbjOQdhK6NS9Ws2wuQ_ZyNeEMHl",
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

const PAISES_LATINOAMERICA = [
  "argentina", "bolivia", "brasil", "brazil", "chile", "colombia", "costa rica",
  "cuba", "ecuador", "el salvador", "guatemala", "haiti", "honduras",
  "mexico", "méxico", "nicaragua", "panama", "panamá", "paraguay", "peru",
  "perú", "republica dominicana", "república dominicana", "uruguay", "venezuela",
  "puerto rico",
];

const COLUMNAS_PLANTA_PREFERIDAS = [
  "Nombre Planta", "Pais", "Ciudad", "Direccion Planta", "Direccion", "Dirección",
];

function normalizarTexto(valor) {
  return String(valor == null ? "" : valor).toLowerCase().trim();
}

function esPaisLatinoamericano(valorPais) {
  const pais = normalizarTexto(valorPais);
  return PAISES_LATINOAMERICA.some((p) => pais === p || pais.includes(p));
}

function elegirColumnasPlanta(filas) {
  const claves = [];
  filas.forEach((fila) => {
    Object.keys(fila).forEach((clave) => {
      if (!claves.includes(clave)) {
        claves.push(clave);
      }
    });
  });

  const preferidas = COLUMNAS_PLANTA_PREFERIDAS.filter((clave) => claves.includes(clave));
  const restantes = claves.filter((clave) => !preferidas.includes(clave) && normalizarTexto(clave) !== "id");
  return preferidas.concat(restantes);
}

function etiquetaColumna(clave) {
  return clave.replace(/_/g, " ");
}

function crearTablaPlantas(filas) {
  const columnas = elegirColumnasPlanta(filas);
  const tabla = document.createElement("table");

  const thead = document.createElement("thead");
  const filaEncabezado = document.createElement("tr");
  columnas.forEach((clave) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = etiquetaColumna(clave);
    filaEncabezado.appendChild(th);
  });
  thead.appendChild(filaEncabezado);
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");
  filas.forEach((fila) => {
    const tr = document.createElement("tr");
    columnas.forEach((clave) => {
      const td = document.createElement("td");
      td.textContent = fila[clave] == null ? "" : fila[clave];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  tabla.appendChild(tbody);

  return tabla;
}

function setEstadoPlantas(texto) {
  const estado = document.querySelector("#plantas-estado");
  if (!estado) {
    return;
  }
  estado.textContent = texto;
  estado.hidden = !texto;
}

async function fillTablaPlantas() {
  const contenedor = document.querySelector("#abrir-plantas");
  const tablaVieja = document.querySelector("#plantas-tabla");
  if (!contenedor || !tablaVieja) {
    return;
  }

  setEstadoPlantas("Cargando plantas…");

  const direcciones = await traerDireccionesSupabase();
  const filas = (Array.isArray(direcciones) ? direcciones : []).filter((fila) =>
    esPaisLatinoamericano(fila && (fila.Pais || fila.pais))
  );

  if (filas.length === 0) {
    tablaVieja.hidden = true;
    setEstadoPlantas("No hay plantas de producción para mostrar.");
    return;
  }

  const nuevaTabla = crearTablaPlantas(filas);
  nuevaTabla.id = "plantas-tabla";
  nuevaTabla.classList.add("plantas-tabla");
  nuevaTabla.hidden = false;
  tablaVieja.replaceWith(nuevaTabla);
  setEstadoPlantas("");
}

function iniciarPlantas() {
  if (!document.querySelector("#abrir-plantas")) {
    return;
  }
  fillTablaPlantas();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarPlantas);
} else {
  iniciarPlantas();
}