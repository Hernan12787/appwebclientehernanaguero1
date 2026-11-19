(function () {
  function slugify(texto) {
    return String(texto || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'producto';
  }

  function formatearPrecio(precio) {
    return '$' + Number(precio || 0).toLocaleString('es-AR');
  }

  var META_BEBIDAS = {
    "img/coca-cola.jpg": { id: "coca", slug: "coca-cola", clase: "producto-coca-cola", tipo: "gaseosa", cardClass: "card-coca", descripcionCatalogo: "El sabor original en botella de 500ml.", descripcion: "El sabor original de siempre, en botella de 500ml. Perfecta para compartir cada momento.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Botella PET", "Precio sugerido: $1.900"] },
    "img/sprite.jpg": { id: "sprite", slug: "sprite", clase: "producto-sprite", tipo: "gaseosa", cardClass: "card-sprite", descripcionCatalogo: "Frescura lima-limón en botella de 500ml.", descripcion: "Frescura lima-limón con burbujas que despiertan los sentidos. En botella de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Botella PET", "Precio sugerido: $1.800"] },
    "img/fanta.jpg": { id: "fanta", slug: "fanta", clase: "producto-fanta", tipo: "gaseosa", cardClass: "card-fanta", descripcionCatalogo: "Diversión y sabor naranja en botella de 500ml.", descripcion: "Diversión y sabor a naranja en cada sorbo. En botella de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Botella PET", "Precio sugerido: $1.800"] },
    "img/schweppes.jpg": { id: "schweppes", slug: "schweppes", clase: "producto-schweppes", tipo: "gaseosa", cardClass: "card-schweppes", descripcionCatalogo: "Un clásico para grandes ocasiones en botella de 500ml.", descripcion: "Un clásico para grandes ocasiones. Agua tónica en botella de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Botella PET", "Precio sugerido: $2.000"] },
    "img/bonaqua.jpg": { id: "bonaqua", slug: "bonaqua", clase: "producto-bonaqua", tipo: "aguas", cardClass: "card-bonaqua", descripcionCatalogo: "Agua purificada en botella de 500ml.", descripcion: "Agua purificada Bonaqua, ideal para hidratarte todos los días. En botella de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Botella PET", "Precio sugerido: $1.500"] },
    "img/dasani.png": { id: "dasani", slug: "dasani", clase: "producto-dasani", tipo: "aguas", cardClass: "card-dasani", descripcionCatalogo: "Agua mineralizada en botella de 500ml.", descripcion: "Agua mineralizada Dasani con pureza y frescura. En botella de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Botella PET", "Precio sugerido: $1.600"] },
    "img/ciel.png": { id: "ciel", slug: "ciel", clase: "producto-ciel", tipo: "aguas", cardClass: "card-ciel", descripcionCatalogo: "Agua purificada en botella de 1 litro.", descripcion: "Agua purificada Ciel para una hidratación confiable. En botella de 1 litro.", especificaciones: ["Contenido neto: 1 L", "Presentación: Botella PET", "Precio sugerido: $1.400"] },
    "img/ciel-exprim.jpg": { id: "ciel-exprim", slug: "ciel-exprim", clase: "producto-ciel-exprim", tipo: "aguas", cardClass: "card-ciel-exprim", descripcionCatalogo: "Agua saborizada pepino y piña en 600 ml.", descripcion: "Ciel Exprim con un toque refrescante de pepino y piña. En botella de 600 ml.", especificaciones: ["Contenido neto: 600 ml", "Presentación: Botella PET", "Precio sugerido: $1.700"] },
    "img/smartwater-flavors.jpg": { id: "smartwater", slug: "smartwater", clase: "producto-smartwater", tipo: "aguas", cardClass: "card-smartwater", descripcionCatalogo: "Agua con gas y sabores Smartwater.", descripcion: "Smartwater Flavors Sparkling, agua con gas y un toque de sabor refrescante.", especificaciones: ["Contenido neto: 591 ml", "Presentación: Botella PET", "Precio sugerido: $2.600"] },
    "img/aquarius.jpg": { id: "aquarius", slug: "aquarius", clase: "producto-aquarius", tipo: "deportivas", cardClass: "card-aquarius", descripcionCatalogo: "Bebida deportiva para hidratarte en 500ml.", descripcion: "Aquarius bebida deportiva, ideal para rehidratarte durante la actividad física. En botella de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Botella PET", "Precio sugerido: $2.000"] },
    "img/powerade.jpg": { id: "powerade", slug: "powerade", clase: "producto-powerade", tipo: "deportivas", cardClass: "card-powerade", descripcionCatalogo: "Bebida isotónica para el rendimiento en 500ml.", descripcion: "Powerade bebida isotónica que ayuda a reponer líquidos y electrolitos. En botella de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Botella PET", "Precio sugerido: $2.200"] },
    "img/monster.jpg": { id: "monster", slug: "monster", clase: "producto-monster", tipo: "energeticas", cardClass: "card-monster", descripcionCatalogo: "Bebida energética Monster en lata de 500ml.", descripcion: "Monster Energy, energía intensa para tus desafíos. En presentación de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Lata", "Precio sugerido: $3.000"] },
    "img/relentless.jpg": { id: "relentless", slug: "relentless", clase: "producto-relentless", tipo: "energeticas", cardClass: "card-relentless", descripcionCatalogo: "Bebida energética Relentless en 500ml.", descripcion: "Relentless Energy Drink, impulso y energía para tu día. En presentación de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Lata", "Precio sugerido: $3.200"] },
    "img/kin.jpg": { id: "kin", slug: "kin", clase: "producto-kin", tipo: "energeticas", cardClass: "card-kin", descripcionCatalogo: "Bebida energética Kin en 500ml.", descripcion: "Kin bebida energética para mantenerte activo. En presentación de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Lata", "Precio sugerido: $2.800"] },
    "img/burn.jpg": { id: "burn", slug: "burn", clase: "producto-burn", tipo: "energeticas", cardClass: "card-burn", descripcionCatalogo: "Bebida energética Burn en 473 ml.", descripcion: "Burn Energy Drink, energía que enciende tu día. En presentación de 473 ml.", especificaciones: ["Contenido neto: 473 ml", "Presentación: Lata", "Precio sugerido: $2.900"] },
    "img/predator.jpg": { id: "predator", slug: "predator", clase: "producto-predator", tipo: "energeticas", cardClass: "card-predator", descripcionCatalogo: "Bebida energética Predator en 473 ml.", descripcion: "Predator Energy para un impulso potente cuando lo necesitás. En presentación de 473 ml.", especificaciones: ["Contenido neto: 473 ml", "Presentación: Lata", "Precio sugerido: $2.700"] },
    "img/minutemaid.jpg": { id: "minutemaid", slug: "minutemaid", clase: "producto-minutemaid", tipo: "jugos", cardClass: "card-minutemaid", descripcionCatalogo: "Jugo Minute Maid en botella de 500ml.", descripcion: "Minute Maid, jugo con sabor a fruta para disfrutar en cualquier momento. En botella de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Botella PET", "Precio sugerido: $2.500"] },
    "img/delvalle.jpg": { id: "delvalle", slug: "delvalle", clase: "producto-delvalle", tipo: "jugos", cardClass: "card-delvalle", descripcionCatalogo: "Bebida a base de fruta Del Valle en 500ml.", descripcion: "Del Valle bebida a base de fruta, sabor refrescante y natural. En botella de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Botella PET", "Precio sugerido: $2.800"] },
    "img/simply-orange.jpg": { id: "simply-orange", slug: "simply-orange", clase: "producto-simply-orange", tipo: "jugos", cardClass: "card-simply-orange", descripcionCatalogo: "Jugo Simply Orange en botella de 500ml.", descripcion: "Simply Orange, jugo de naranja con sabor auténtico. En botella de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Botella PET", "Precio sugerido: $3.500"] },
    "img/simply-lemonade.jpg": { id: "simply-lemonade", slug: "simply-lemonade", clase: "producto-simply-lemonade", tipo: "jugos", cardClass: "card-simply-lemonade", descripcionCatalogo: "Limonada Simply en botella de 500ml.", descripcion: "Simply Lemonade, limonada refrescante con sabor natural. En botella de 500ml.", especificaciones: ["Contenido neto: 500 ml", "Presentación: Botella PET", "Precio sugerido: $3.300"] },
    "img/innocent.jpg": { id: "innocent", slug: "innocent", clase: "producto-innocent", tipo: "jugos", cardClass: "card-innocent", descripcionCatalogo: "Smoothie de frutas Innocent.", descripcion: "Innocent Fruit Smoothie, mezcla de frutas lista para disfrutar.", especificaciones: ["Contenido neto: 250 ml", "Presentación: Botella PET", "Precio sugerido: $3.400"] },
    "img/cepita.jpg": { id: "cepita", slug: "cepita", clase: "producto-cepita", tipo: "jugos", cardClass: "card-cepita", descripcionCatalogo: "Jugo Cepita del Valle sabor naranja en 1 L.", descripcion: "Cepita del Valle sabor naranja, ideal para compartir. En envase de 1 litro.", especificaciones: ["Contenido neto: 1 L", "Presentación: Tetra Pak", "Precio sugerido: $2.400"] },
    "img/andina.jpg": { id: "andina", slug: "andina", clase: "producto-andina", tipo: "jugos", cardClass: "card-andina", descripcionCatalogo: "Jugo Andina del Valle sabor durazno.", descripcion: "Andina del Valle sabor durazno, bebida a base de fruta con sabor suave. En presentación individual.", especificaciones: ["Contenido neto: 200 ml", "Presentación: Tetra Pak", "Precio sugerido: $2.300"] }
  };

  function mapearFilaProducto(row) {
    var nombre = row && row.nombre ? String(row.nombre) : 'Producto';
    var precio = Number(row && row.precio) || 0;
    var url = row && row.url ? String(row.url) : '';
    var meta = META_BEBIDAS[url] || null;
    var slug = meta ? meta.slug : (slugify(nombre) + '-' + (row && row.id != null ? row.id : 'nuevo'));
    var idBase = meta ? meta.id : ('nuevo-' + (row && row.id != null ? row.id : slugify(nombre)));
    var clase = meta ? meta.clase : ('producto-' + slugify(nombre));
    var tipo = meta ? meta.tipo : 'nuevo';
    var cardClass = meta ? meta.cardClass : ('card-nuevo-' + (row && row.id != null ? row.id : 'item'));
    var descCat = meta ? meta.descripcionCatalogo : (nombre + '.');
    var desc = meta ? meta.descripcion : (nombre + '.');
    var specs = meta ? meta.especificaciones : ['Precio sugerido: ' + formatearPrecio(precio)];
    var imgSrc = url || 'refresco.ico';
    return {
      id: 'detalle-' + slug,
      slug: slug,
      clase: clase,
      tipo: tipo,
      cardClass: cardClass,
      dataId: idBase,
      dbId: row && row.id != null ? row.id : null,
      imagen: { src: imgSrc, alt: nombre },
      titulo: nombre,
      descripcion: desc,
      descripcionCatalogo: descCat,
      especificaciones: specs,
      precio: precio,
      volver: { texto: 'Volver al catálogo', url: 'index.html#catalogo' }
    };
  }

  async function obtenerProductosDesdeSupabase() {
    if (!window.obtenerProductosNuevos || typeof window.obtenerProductosNuevos !== 'function') {
      return Array.isArray(window.__productosCache) ? window.__productosCache : [];
    }
    try {
      var filas = await window.obtenerProductosNuevos();
      var productos = (Array.isArray(filas) ? filas : []).map(mapearFilaProducto);
      window.__productosCache = productos;
      return productos;
    } catch (e) {
      console.error('Error cargando productos desde Supabase:', e);
      return Array.isArray(window.__productosCache) ? window.__productosCache : [];
    }
  }

  function obtenerProductos() {
    return Array.isArray(window.__productosCache) ? window.__productosCache : [];
  }

  window.__META_BEBIDAS = META_BEBIDAS;
  window.mapearFilaProducto = mapearFilaProducto;
  window.obtenerProductosDesdeSupabase = obtenerProductosDesdeSupabase;
  window.obtenerProductos = obtenerProductos;
})();