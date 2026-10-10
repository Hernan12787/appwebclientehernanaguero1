const miheader = {
  logo: {
    src: "img/coca-tapa.svg",
    alt: "Tapa de Coca-Cola",
    className: "logo-icono",
    text: "Refresco Argentina",
  },
  nav: {
    label: "Navegación principal",
    links: [
      { text: "Inicio", hash: "inicio" },
      { text: "Catálogo", hash: "catalogo" },
      { text: "Descubrí", hash: "descubri" },
      { text: "Carrito", url: "carrito.html" },
      { text: "Contacto", url: "contacto.html" },
    ],
  },
};

const footerData = {
  logo: {
    src: "img/coca-cola-logo-white.svg",
    alt: "The Coca Cola Company",
  },
  columns: [
    {
      title: "Sobre Nosotros",
      links: [
        { text: "Nuestra Compañía", url: "https://www.coca-colacompany.com/company" },
        { text: "Sala de Prensa", url: "https://www.coca-cola.com/ar/es/media-center" },
        { text: "Nuestra historia", url: "https://www.coca-colacompany.com/about-us/history" },
        { text: "Trabaja con nosotros", url: "https://www.coca-colacompany.com/careers" },
      ],
    },
    {
      title: "¿Necesitas Ayuda?",
      links: [
        { text: "Mapa del sitio", url: "https://www.coca-cola.com/ar/es/sitemap" },
        { text: "Contáctanos", url: "https://www.coca-cola.com/ar/es/about-us/contact-us" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Términos de Uso", url: "https://www.coca-cola.com/ar/es/legal/terms-of-service" },
        { text: "Aviso de privacidad del consumidor", url: "https://datatrust.coca-cola.com/xg/es#global-privacy-notices" },
        { text: "Aviso de cookies", url: "https://datatrust.coca-cola.com/xg/es#global-privacy-notices" },
      ],
    },
  ],
  social: {
    label: "Redes sociales",
    links: [
      { text: "Facebook", url: "https://facebook.com/CocaColaCoAr/" },
      { text: "Instagram", url: "https://www.instagram.com/cocacolacoar/" },
      { text: "Youtube", url: "https://www.youtube.com/user/CocaColaCo" },
      { text: "LinkedIn", url: "https://www.linkedin.com/company/the-coca-cola-company" },
    ],
  },
  copyright: "2026 The Coca\u2011Cola Company. Todos los derechos reservados.",
};

function esPaginaInicio() {
  const archivo = window.location.pathname.split("/").pop();
  return !archivo || archivo === "index.html";
}

function crearLinkExterno({ text, url }) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.textContent = text;
  anchor.rel = "noopener noreferrer";
  anchor.target = "_blank";
  return anchor;
}

function crearHeader() {
  const header = document.createElement("header");

  const logo = document.createElement("div");
  logo.className = "logo";
  const logoImg = document.createElement("img");
  logoImg.src = miheader.logo.src;
  logoImg.alt = miheader.logo.alt;
  logoImg.className = miheader.logo.className;
  logo.appendChild(logoImg);
  logo.appendChild(document.createTextNode(` ${miheader.logo.text}`));
  header.appendChild(logo);

  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", miheader.nav.label);
  const lista = document.createElement("ul");
  const enInicio = esPaginaInicio();

  miheader.nav.links.forEach((link) => {
    const item = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.textContent = link.text;

    if (link.hash) {
      anchor.href = enInicio ? `#${link.hash}` : `index.html#${link.hash}`;
    } else {
      anchor.href = link.url;
    }

    item.appendChild(anchor);
    lista.appendChild(item);
  });

  nav.appendChild(lista);
  header.appendChild(nav);

  return header;
}

function crearFooter() {
  const footer = document.createElement("footer");

  const logoContenedor = document.createElement("div");
  logoContenedor.className = "footer-logo";
  const logoImg = document.createElement("img");
  logoImg.src = footerData.logo.src;
  logoImg.alt = footerData.logo.alt;
  logoContenedor.appendChild(logoImg);
  footer.appendChild(logoContenedor);

  const columnasContenedor = document.createElement("div");
  columnasContenedor.className = "footer-cols";

  footerData.columns.forEach((columna) => {
    const columnaEl = document.createElement("div");
    columnaEl.className = "footer-col";

    const titulo = document.createElement("h5");
    titulo.textContent = columna.title;
    columnaEl.appendChild(titulo);

    const lista = document.createElement("ul");
    columna.links.forEach((link) => {
      const item = document.createElement("li");
      item.appendChild(crearLinkExterno(link));
      lista.appendChild(item);
    });

    columnaEl.appendChild(lista);
    columnasContenedor.appendChild(columnaEl);
  });

  footer.appendChild(columnasContenedor);

  const social = document.createElement("nav");
  social.className = "footer-social";
  social.setAttribute("aria-label", footerData.social.label);
  const socialLista = document.createElement("ul");

  footerData.social.links.forEach((link) => {
    const item = document.createElement("li");
    item.appendChild(crearLinkExterno(link));
    socialLista.appendChild(item);
  });

  social.appendChild(socialLista);
  footer.appendChild(social);

  const copyright = document.createElement("p");
  copyright.textContent = `\u00A9 ${footerData.copyright}`;
  footer.appendChild(copyright);

  return footer;
}

function renderLayout() {
  const main = document.querySelector("main");
  const headerNuevo = crearHeader();

  if (main) {
    document.body.insertBefore(headerNuevo, main);
  } else if (document.body.firstChild) {
    document.body.insertBefore(headerNuevo, document.body.firstChild);
  } else {
    document.body.appendChild(headerNuevo);
  }

  const footerContenedor = document.querySelector("footer");
  if (footerContenedor) {
    footerContenedor.replaceWith(crearFooter());
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderLayout);
} else {
  renderLayout();
}
