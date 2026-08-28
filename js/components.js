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

  if (publicNav && userNav) {
    publicNav.style.display = isLoggedIn ? "none" : "flex";
    userNav.style.display = isLoggedIn ? "block" : "none";
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
        <img id="bannerImage"
       src="${resolveAssetPath("img/banner-sie.png")}"
             alt="Superintendencia de Educación - Sistema Integral de Atención Ciudadana"
             class="banner-img"
             onerror="this.style.display='none'; document.getElementById('bannerFallback').style.display='flex';">
     <div id="bannerFallback" class="banner-fallback" style="display:none;">
            <div class="fallback-content">
                <div class="inst-label">Superintendencia de Educación</div>
                <div class="inst-title">Sistema Integral de Atención Ciudadana</div>
                <div class="inst-sub">Ley N.° 20.529 — Aseguramiento de la Calidad de la Educación</div>
            </div>
            <div class="fallback-bar"></div>
        </div>
    </div>

    <nav class="public-nav" id="publicNav">
        <button type="button" class="nav-tab active" data-page="competencias">Competencias Supereduc</button>
        <button type="button" class="nav-tab" data-page="otros-organismos">Competencias de otros organismos</button>
        <button type="button" class="nav-tab" data-page="preguntas">Preguntas frecuentes</button>
        <button type="button" class="nav-tab" data-page="fiscalizamos">Cómo fiscalizamos</button>
        <button type="button" class="nav-tab" data-page="requerimientos">Proceso de requerimientos</button>
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
    <a href="javascript:void(0)" class="footer-institutional-banner">
      <span></span><strong>Solicitud de información<br>Ley de Transparencia</strong>
    </a>
    <a href="javascript:void(0)" class="footer-institutional-banner">
      <span></span><strong>Compromisos de<br>Gestión Institucional</strong>
    </a>
    <a href="javascript:void(0)" class="footer-institutional-banner">
      <span></span><strong>Gobierno<br>Transparente</strong>
    </a>
  </div>
    <div class="footer-content">
        <div class="footer-section">
      <img class="footer-logo" src="${resolveAssetPath("img/logo-supereduc-rojo.svg")}" alt="Superintendencia de Educación">
            <h5>Enlaces Rápidos</h5>
            <ul>
                <li><a href="javascript:void(0)" data-route="pages/preguntas-previas.html">Preguntas frecuentes</a></li>
                <li><a href="javascript:void(0)" data-route="index.html">Mapa del Sitio</a></li>
                <li><a href="javascript:void(0)" data-route="index.html">Políticas de privacidad</a></li>
                <li><a href="javascript:void(0)" data-route="index.html">Trabaja con nosotros</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h5>Contacto</h5>
            <p><i class="bi bi-telephone"></i> 600 3600 390</p>
            <p><i class="bi bi-clock"></i> Lunes a Viernes 09:00 - 13:00</p>
            <div class="social-links">
                <a href="javascript:void(0)" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                <a href="javascript:void(0)" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
                <a href="javascript:void(0)" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
                <a href="javascript:void(0)" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            </div>
        </div>
        <div class="footer-section">
            <h5>Sitios Relacionados</h5>
            <ul>
                <li><a href="javascript:void(0)" data-route="index.html">Ayuda Mineduc</a></li>
                <li><a href="javascript:void(0)" data-route="index.html">JUNJI</a></li>
                <li><a href="javascript:void(0)" data-route="index.html">Integra</a></li>
                <li><a href="javascript:void(0)" data-route="index.html">Agencia de Calidad</a></li>
            </ul>
        </div>
    </div>
        <a class="footer-contact-callout" href="javascript:void(0)">
          Si necesitas contactarte con la administración de este sitio, haz clic aquí
        </a>
    <div class="footer-bottom">
        <p>&copy; 2025 Superintendencia de Educación — Gobierno de Chile</p>
    </div>
        <img class="footer-tricolor-star" src="${resolveAssetPath("img/tricolor estrella.png")}" alt="">
</footer>
`;

function bindComponentInteractions() {
  var publicTabs = document.querySelectorAll("#publicNav .nav-tab");
  publicTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      publicTabs.forEach(function (t) {
        t.classList.remove("active");
      });
      tab.classList.add("active");
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
    "gcc.html": "Gestión de conflictos",
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

function initializeComponents() {
  if (
    document.getElementById("header-container") ||
    document.getElementById("footer-container")
  ) {
    injectComponents();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeComponents);
} else {
  initializeComponents();
}
