/**
 * components.js — Inyecta header y footer compartidos
 * DEPENDE DE: site.css (variables y estilos de header/footer)
 */

function resolveAssetPath(route) {
  const isInsidePages = window.location.pathname.includes("/pages/");
  const baseDir = isInsidePages ? "../" : "";
  const normalizedRoute = route.startsWith("/") ? route.slice(1) : route;
  return `${baseDir}${normalizedRoute}`;
}

function goToRoute(route) {
  window.location.href = resolveAssetPath(route);
}

window.setLoginState = function (isLoggedIn) {
  const publicNav = document.getElementById("publicNav");
  const userNav = document.getElementById("userNav");
  const mainNavToggle = document.getElementById("mainNavToggle");

  if (publicNav && userNav) {
    publicNav.style.display = isLoggedIn ? "none" : "";
    userNav.style.display = isLoggedIn ? "block" : "none";
  }
  if (mainNavToggle) {
    mainNavToggle.style.display = isLoggedIn ? "none" : "";
  }
};

window.loadUserName = function () {
  const userNameEl = document.getElementById("userName");
  if (userNameEl) {
    userNameEl.textContent = localStorage.getItem("userName") || "Usuario";
  }
};

window.logout = function () {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userName");
  localStorage.removeItem("userRut");
  localStorage.removeItem("userDatos");
  localStorage.removeItem("loginMethod");
  window.setLoginState(false);
  goToRoute("index.html");
};

const HEADER_HTML = `
<header class="main-header">
    <div class="top-banner">
        <a href="javascript:void(0)" data-route="index.html" style="display:block; text-decoration:none; cursor:pointer;" title="Volver al inicio">
            <img id="bannerImage"
                 src="${resolveAssetPath("img/banner-sie.png")}"
                 alt="Superintendencia de Educación - Sistema Integral de Atención Ciudadana"
                 class="banner-img"
                 onerror="this.style.display='none'; document.getElementById('bannerFallback').style.display='flex';">
        </a>
     <div id="bannerFallback" class="banner-fallback" style="display:none;">
            <a href="javascript:void(0)" data-route="index.html" style="display:block; text-decoration:none; color:inherit; cursor:pointer;" title="Volver al inicio">
            <div class="fallback-content">
                <div class="inst-label">Superintendencia de Educación</div>
                <div class="inst-title">Sistema Integral de Atención Ciudadana</div>
                <div class="inst-sub">Ley N.° 20.529 — Aseguramiento de la Calidad de la Educación</div>
            </div>
            </a>
            <div class="fallback-bar"></div>
        </div>
    </div>

    <button type="button" class="main-nav-toggle" id="mainNavToggle" aria-expanded="false" aria-controls="publicNav">
        <span class="main-nav-toggle-icon" aria-hidden="true">&#9776;</span>
        <span class="main-nav-toggle-label">Menú</span>
    </button>

    <nav class="public-nav" id="publicNav">
        <a href="javascript:void(0)" class="nav-tab" data-route="index.html#t-si">Competencias Supereduc</a>
        <a href="javascript:void(0)" class="nav-tab" data-route="index.html#otros-organismos">Competencias de otros organismos</a>
        <a href="https://www.supereduc.cl/contenidos-de-interes/como-fiscaliza-la-superintendencia-de-educacion/" class="nav-tab" target="_blank" rel="noopener">Cómo fiscalizamos</a>
        <a href="https://www.supereduc.cl/contenidos-de-interes/nuevo-procedimiento-de-requerimientos-ciudadanos-de-la-superintendencia-de-educacion/" class="nav-tab" target="_blank" rel="noopener">Proceso de requerimientos</a>
    </nav>

    <nav class="user-nav" id="userNav" style="display: none;">
        <div class="user-nav-container">
            <div class="breadcrumb">
                <a href="javascript:void(0)" data-route="index.html">Inicio</a>
                <span class="separator">&gt;</span>
                <span class="current-page" id="currentPage">Inicio</span>
            </div>
            <div class="user-actions">
                <div class="user-profile">
                    <div class="user-icon">
                        <i class="bi bi-person-fill"></i>
                    </div>
                    <span class="user-name" id="userName">Usuario</span>
                </div>
                <div class="user-buttons">
                  <button type="button" class="btn-user" data-route="pages/dashboard.html" data-nav="home">
                        <i class="bi bi-house-door-fill"></i> Inicio
                    </button>
                  <button type="button" class="btn-user" data-route="pages/dashboard.html" data-nav="dashboard">
                    <i class="bi bi-grid-3x3-gap-fill"></i> Dashboard
                  </button>
                    <button type="button" class="btn-user" data-route="pages/notificaciones.html">
                        <i class="bi bi-bell-fill"></i> Notificaciones
                    </button>
                  <button type="button" class="btn-user" data-route="pages/seguimiento.html">
                    <i class="bi bi-clock-history"></i> Seguimiento
                  </button>
                  <button type="button" class="btn-user" data-route="pages/actualizar-datos.html">
                    <i class="bi bi-person-lines-fill"></i> Mis datos
                  </button>
                    <button type="button" class="btn-user btn-logout" id="btnLogout">
                        <i class="bi bi-power"></i> Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    </nav>
</header>
`;

const FOOTER_HTML = `
<footer class="main-footer">
  <div class="footer-institutional-banners">
    <a href="https://transparencia.supereduc.cl/iris_gplus/Transparencia/index_minisitio.jsp?id=11" target="_blank" rel="noopener" class="footer-institutional-banner">
      <span></span><strong>Solicitud de información<br>Ley de Transparencia</strong>
    </a>
    <a href="https://transparencia.supereduc.cl/IRIS_FILES/_T.ACTIVA/3025/28-12-2018-12-24-11.078754999999999.html" target="_blank" rel="noopener" class="footer-institutional-banner">
      <span></span><strong>Compromisos de<br>Gestión Institucional</strong>
    </a>
    <a href="https://www.supereduc.cl/registro-de-tramites-digitales/" target="_blank" rel="noopener" class="footer-institutional-banner">
      <span></span><strong>Gobierno<br>Transparente</strong>
    </a>
  </div>
    <div class="footer-content">
        <div class="footer-section">
      <img class="footer-logo" src="${resolveAssetPath("img/logo-supereduc-rojo.svg")}" alt="Superintendencia de Educación">
            <p class="footer-institution">Superintendencia de Educación<br>Ministerio de Educación<br>Gobierno de Chile</p>
            <h5>Enlaces Rápidos</h5>
            <ul>
                <li><a href="https://www.supereduc.cl/consultas/" target="_blank" rel="noopener">Preguntas frecuentes</a></li>
                <li><a href="javascript:void(0)" data-route="index.html">Mapa del Sitio</a></li>
                <li><a href="https://www.supereduc.cl/politicas-privacidad/" target="_blank" rel="noopener">Políticas de privacidad</a></li>
                <li><a href="https://www.supereduc.cl/trabaja-con-nosotros/" target="_blank" rel="noopener">Trabaja con nosotros</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h5>Contacto</h5>
            <p><i class="bi bi-telephone"></i> 600 3600 390</p>
            <p><i class="bi bi-clock"></i> Lunes a Viernes 09:00 - 13:00</p>
          <a class="footer-contact-link" href="https://siac.supereduc.cl/autoatencion/formulario.php" target="_blank" rel="noopener"><i class="bi bi-envelope"></i> Formulario de contacto</a>
            <div class="social-links">
                <a href="https://www.facebook.com/supereducCL/timeline" target="_blank" rel="noopener" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                <a href="https://x.com/supereduc_cl" target="_blank" rel="noopener" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
                <a href="https://www.youtube.com/channel/UCWzV9xpJrHWpB-VT2mx9HKg" target="_blank" rel="noopener" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
                <a href="https://www.instagram.com/supereduc_cl/" target="_blank" rel="noopener" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                <a href="https://www.linkedin.com/company/superintendencia-de-educacion/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            </div>
        </div>
        <div class="footer-section">
            <h5>Sitios Relacionados</h5>
            <ul>
                <li><a href="https://www.ayudamineduc.cl/" target="_blank" rel="noopener">Ayuda Mineduc</a></li>
                <li><a href="https://junji.cl/" target="_blank" rel="noopener">JUNJI</a></li>
                <li><a href="https://integra.cl/" target="_blank" rel="noopener">Integra</a></li>
                <li><a href="https://www.agenciaeducacion.cl/" target="_blank" rel="noopener">Agencia de Calidad</a></li>
            </ul>
        </div>
    </div>
        <a class="footer-contact-callout" href="javascript:void(0)" data-route="pages/contacto-directo.html">
          Si necesitas contactarte con la administración de este sitio, haz clic aquí
        </a>
    <div class="footer-bottom">
        <p>&copy; 2025 Superintendencia de Educación — Gobierno de Chile</p>
    </div>
        <img class="footer-tricolor-star" src="${resolveAssetPath("img/tricolor estrella.png")}" alt="">
</footer>
`;

function bindComponentInteractions() {
  var mainNavToggle = document.getElementById("mainNavToggle");
  var publicNav = document.getElementById("publicNav");

  if (mainNavToggle && publicNav) {
    mainNavToggle.addEventListener("click", function () {
      var isOpen = publicNav.classList.toggle("open");
      mainNavToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      mainNavToggle.classList.toggle("open", isOpen);
    });
  }

  var publicTabs = document.querySelectorAll("#publicNav .nav-tab");
  var currentFileForNav =
    window.location.pathname.split("/").pop() || "index.html";
  var currentHashForNav = window.location.hash;

  publicTabs.forEach(function (tab) {
    var route = tab.getAttribute("data-route") || "";
    var routeFile = route.split("#")[0].split("/").pop();
    var routeHash = route.includes("#") ? "#" + route.split("#")[1] : "";
    var isCurrent =
      routeFile === currentFileForNav &&
      (routeHash === "" || routeHash === currentHashForNav);

    tab.classList.toggle("active", isCurrent);

    tab.addEventListener("click", function () {
      publicTabs.forEach(function (t) {
        t.classList.remove("active");
      });
      tab.classList.add("active");

      // Cierra el menú móvil al seleccionar una opción
      if (publicNav && publicNav.classList.contains("open")) {
        publicNav.classList.remove("open");
        if (mainNavToggle) {
          mainNavToggle.setAttribute("aria-expanded", "false");
          mainNavToggle.classList.remove("open");
        }
      }
    });
  });

  var userButtons = document.querySelectorAll(".btn-user:not(.btn-logout)");
  userButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      userButtons.forEach(function (b) {
        b.classList.remove("active-page-btn");
      });
      btn.classList.add("active-page-btn");
    });
  });

  document.querySelectorAll("[data-route]").forEach(function (el) {
    var route = el.dataset.route;
    if (!route) return;

    el.addEventListener("click", function (event) {
      if (el.classList.contains("btn-logout")) {
        event.preventDefault();
        window.logout();
        return;
      }
      event.preventDefault();
      goToRoute(route);
    });
  });
}

function adjustBodyPadding() {
  var mockupBanner = document.querySelector(".mockup-banner");
  if (mockupBanner) {
    document.body.style.paddingTop = (mockupBanner.offsetHeight || 44) + "px";
  }
}

function ensureSharedStyles() {
  var stylesheetUrl = new URL(
    resolveAssetPath("css/site.css"),
    window.location.href,
  );
  stylesheetUrl.searchParams.set("v", "20260828");
  var stylesheet = Array.prototype.find.call(
    document.querySelectorAll('link[rel="stylesheet"]'),
    function (link) {
      return link.href === stylesheetUrl.href;
    },
  );

  if (!stylesheet) {
    stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = stylesheetUrl.href;
  }

  stylesheet.dataset.sharedSiteStyles = "true";
  document.head.appendChild(stylesheet);
}

function updateCurrentPage() {
  var currentFile = window.location.pathname.split("/").pop() || "index.html";
  var pageNames = {
    "dashboard.html": "Mi panel",
    "notificaciones.html": "Notificaciones",
    "seguimiento.html": "Seguimiento",
    "actualizar-datos.html": "Mis datos",
    "denuncia.html": "Nuevo requerimiento",
    "consulta.html": "Consulta",
    "gcc.html": "Mediación (GCC)",
    "sugerencias.html": "Sugerencias y reclamos",
    "contacto-directo.html": "Contacto directo"
  };
  var route = "pages/" + currentFile;
  var currentPage = pageNames[currentFile] || document.title.split(" - ")[0];
  var currentPageEl = document.getElementById("currentPage");

  if (currentPageEl) currentPageEl.textContent = currentPage;
  document.querySelectorAll(".btn-user[data-route]").forEach(function (button) {
    var isDashboard = currentFile === "dashboard.html";
    button.classList.toggle(
      "active-page-btn",
      isDashboard
        ? button.dataset.nav === "dashboard"
        : button.dataset.route === route,
    );
  });
}

function injectComponents() {
  var headerContainer = document.getElementById("header-container");
  var footerContainer = document.getElementById("footer-container");
  var isInsidePages = window.location.pathname.includes("/pages/");

  ensureSharedStyles();

  if (headerContainer) headerContainer.innerHTML = HEADER_HTML;
  if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;

  var hasSession = localStorage.getItem("isLoggedIn") === "true";

  if (hasSession) {
    if (!isInsidePages) {
      // INDEX con sesión → redirigir a dashboard
      if (window.goToRoute) {
        window.goToRoute("pages/dashboard.html");
      } else {
        window.location.href = "pages/dashboard.html";
      }
    } else {
      // PÁGINA INTERNA con sesión → mostrar user-nav
      window.setLoginState(true);
      window.loadUserName();
    }
  } else {
    if (!isInsidePages) {
      // INDEX sin sesión → mostrar public-nav
      if (!localStorage.getItem("userName")) {
        localStorage.setItem("userName", "Jaime Alberto Galleguillos Araya");
      }
      if (!localStorage.getItem("userRut")) {
        localStorage.setItem("userRut", "199777706");
      }
      window.setLoginState(false);
      window.loadUserName();
    } else {
      // PÁGINA INTERNA sin sesión → ocultar todo
      window.setLoginState(false);
    }
  }

  bindComponentInteractions();
  if (hasSession && isInsidePages) updateCurrentPage();

  if (headerContainer) {
    window.addEventListener("load", adjustBodyPadding);
    setTimeout(adjustBodyPadding, 150);
    var bannerImg = document.getElementById("bannerImage");
    if (bannerImg) {
      bannerImg.addEventListener("load", function () {
        setTimeout(adjustBodyPadding, 50);
      });
      bannerImg.addEventListener("error", function () {
        setTimeout(adjustBodyPadding, 50);
      });
    }
  }
}

function injectChatbotNorma() {
  if (document.getElementById("cn-widget")) return;

  // El widget interno posiciona sus elementos (ícono, burbuja de diálogo y chat
  // al abrirse) con position:fixed dentro de su propio documento. Por eso el
  // iframe contenedor debe ser lo bastante grande y transparente para que nada
  // se recorte, sin importar si el chat está cerrado o abierto.
  var style = document.createElement("style");
  style.textContent =
    "#cn-widget{" +
    "position:fixed;" +
    "bottom:0;" +
    "right:0;" +
    "width:420px;" +
    "max-width:100vw;" +
    "height:720px;" +
    "max-height:100vh;" +
    "border:none;" +
    "background:transparent;" +
    "z-index:9998;" +
    "pointer-events:none;" +
    "}";
  document.head.appendChild(style);

  var iframe = document.createElement("iframe");
  iframe.id = "cn-widget";
  iframe.src = "https://d1dj24jd5hi6da.cloudfront.net/super_educa/index.html";
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("title", "Chatbot Norma");
  iframe.setAttribute("allow", "autoplay; camera; microphone");
  iframe.setAttribute("scrolling", "no");
  document.body.appendChild(iframe);

  // El iframe es transparente y mucho más grande que el ícono visible, por lo
  // que sin esto bloquearía clics en el menú y en botones cercanos al borde
  // derecho/inferior de la pantalla. Solo habilitamos los clics del iframe
  // cuando el cursor está sobre la zona donde realmente aparece el ícono o la
  // burbuja de Norma (esquina inferior derecha); el resto del tiempo los
  // clics "atraviesan" el iframe hacia el contenido del sitio.
  var HOTZONE_WIDTH = 170;
  var HOTZONE_HEIGHT = 220;

  function isInHotzone(x, y) {
    return (
      x >= window.innerWidth - HOTZONE_WIDTH &&
      y >= window.innerHeight - HOTZONE_HEIGHT
    );
  }

  document.addEventListener("mousemove", function (event) {
    iframe.style.pointerEvents = isInHotzone(event.clientX, event.clientY)
      ? "auto"
      : "none";
  });

  document.addEventListener(
    "touchstart",
    function (event) {
      var touch = event.touches && event.touches[0];
      if (!touch) return;
      iframe.style.pointerEvents = isInHotzone(touch.clientX, touch.clientY)
        ? "auto"
        : "none";
    },
    { passive: true }
  );
}

function initializeComponents() {
  if (
    document.getElementById("header-container") ||
    document.getElementById("footer-container")
  ) {
    injectComponents();
  }
  injectChatbotNorma();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeComponents);
} else {
  initializeComponents();
}
