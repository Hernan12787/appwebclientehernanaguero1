

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

  obtenerProductos().forEach((producto) => {
    fragmento.appendChild(crearProducto(producto));
  });
  contenedor.appendChild(fragmento);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderProductos);
} else {
  renderProductos();
}
const DireccionesSupabase = async () => {
  const url = "https://hangxmottfnjoxtrnxzy.supabase.co/rest/v1/DireccionesSupabase";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "apikey": "sb_publishable_caiELbjOQdhK6NS9Ws2wuQ_ZyNeEMHl"
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
    console.error('Error en la solicitud a Supabase:', error);
    return [];
  });
};

const  encuestasupabase = async () => {
  const url = "https://ytyjalgshnjfaqpckuxr.supabase.co/rest/v1/Encuesta";

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "apikey": "sb_publishable_AsYscH20ZSRlzNTpffXfqQ_fEkb_8Mt"
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
  });
};
window.traerDireccionesSupabase = DireccionesSupabase;
window.encuestasupabase = encuestasupabase;

async function actualizarEncuesta(id, cambios) {
  const url = 'https://ytyjalgshnjfaqpckuxr.supabase.co/rest/v1/Encuesta?id=eq.' + encodeURIComponent(id);
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': 'sb_publishable_AsYscH20ZSRlzNTpffXfqQ_fEkb_8Mt',
      'Authorization': 'Bearer sb_publishable_AsYscH20ZSRlzNTpffXfqQ_fEkb_8Mt',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(cambios)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    const detalle = await response.text();
    throw new Error('Error al actualizar la encuesta: ' + response.status + ' ' + detalle);
  }
  return response.json();
}
window.actualizarEncuesta = actualizarEncuesta;

const SUPABASE_CONTACTOS_URL = "https://hangxmottfnjoxtrnxzy.supabase.co/rest/v1/supabasecontactos";
const SUPABASE_CONTACTOS_KEY = "sb_publishable_caiELbjOQdhK6NS9Ws2wuQ_ZyNeEMHl";

const insertarContactoSupabase = async (datos) => {
  const fila = {
    "nombre y apellido": datos.nombre,
    email: datos.email,
    telefono: datos.telefono,
    asunto: datos.asunto,
    mensaje: datos.mensaje
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_CONTACTOS_KEY,
      "Authorization": "Bearer " + SUPABASE_CONTACTOS_KEY,
      "Prefer": "return=representation"
    },
    body: JSON.stringify(fila)
  };
  const response = await fetch(SUPABASE_CONTACTOS_URL, options);
  if (!response.ok) {
    const detalle = await response.text();
    throw new Error('Error al guardar el contacto: ' + response.status + ' ' + detalle);
  }
  return response.json();
};
window.insertarContactoSupabase = insertarContactoSupabase;

const supabasecontactos = async () => {
  const url = "https://hangxmottfnjoxtrnxzy.supabase.co/rest/v1/supabasecontactos";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": "sb_publishable_caiELbjOQdhK6NS9Ws2wuQ_ZyNeEMHl"

    },
  };
  return fetch(url, options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al conectar los contactos');
    }
    return response.json();
  })
  .then(data => {
    return data;
  })
  .catch(error => {
    console.error('Error en la solicitud a Supabase:', error);
    return [];
  });
};
const  supabasemap = async () => {
  const url = "https://hangxmottfnjoxtrnxzy.supabase.co/rest/v1/supabasemap";

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "apikey": "sb_publishable_caiELbjOQdhK6NS9Ws2wuQ_ZyNeEMHl"
    }
    };
    return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener el mapa');
      }
      return response.json();
    })
    .then(data => { 
      return data;
    })
    .catch(error => {
    console.error('Error en la solicitud a Supabase:', error);
    return [];
  });
};
window.supabasemap = supabasemap;

const SUPABASE_NUEVOPRODUCTO_URL = "https://hangxmottfnjoxtrnxzy.supabase.co/rest/v1/nuevoproducto";
const SUPABASE_NUEVOPRODUCTO_KEY = "sb_publishable_caiELbjOQdhK6NS9Ws2wuQ_ZyNeEMHl";

const obtenerProductosNuevos = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_NUEVOPRODUCTO_KEY
    }
  };
  return fetch(SUPABASE_NUEVOPRODUCTO_URL, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error en la solicitud a Supabase:', error);
      return [];
    });
};

const actualizarProductoNuevoproducto = async (id, cambios) => {
  const url = SUPABASE_NUEVOPRODUCTO_URL + "?id=eq." + encodeURIComponent(id);
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_NUEVOPRODUCTO_KEY,
      "Authorization": "Bearer " + SUPABASE_NUEVOPRODUCTO_KEY,
      "Prefer": "return=representation"
    },
    body: JSON.stringify(cambios)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    const detalle = await response.text();
    throw new Error('Error al actualizar el producto: ' + response.status + ' ' + detalle);
  }
  return response.json();
};

window.obtenerProductosNuevos = obtenerProductosNuevos;
window.actualizarProductoNuevoproducto = actualizarProductoNuevoproducto;


const insertarProductoNuevoproducto = async (datos) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_NUEVOPRODUCTO_KEY,
      "Authorization": "Bearer " + SUPABASE_NUEVOPRODUCTO_KEY,
      "Prefer": "return=representation"
    },
    body: JSON.stringify(datos)
  };
  const response = await fetch(SUPABASE_NUEVOPRODUCTO_URL, options);
  if (!response.ok) {
    const detalle = await response.text();
    throw new Error('Error al guardar el producto: ' + response.status + ' ' + detalle);
  }
  return response.json();
};

window.insertarProductoNuevoproducto = insertarProductoNuevoproducto;

