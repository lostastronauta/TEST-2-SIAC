/**
 * main.js — Controlador principal del header y estado de sesión
 * Se usa en header.html (que se incluye en todas las páginas)
 */

/**
 * Controla qué se muestra en el header
 * @param {boolean} isLoggedIn - true = vista logueada, false = vista pública
 */
function setLoginState(isLoggedIn) {
  const publicNav = document.getElementById("publicNav");
  const userNav = document.getElementById("userNav");

  if (!publicNav || !userNav) return;

  if (isLoggedIn) {
    publicNav.style.display = "none";
    userNav.style.display = "block";
  } else {
    publicNav.style.display = "flex";
    userNav.style.display = "none";
  }
}

/**
 * Carga el nombre del usuario en la barra
 */
function loadUserName() {
  const nameEl = document.getElementById("userName");
  if (nameEl) {
    nameEl.textContent = localStorage.getItem("userName") || "Usuario";
  }
}

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // Determinar estado inicial
  // ==========================================
  var hasSession = localStorage.getItem("isLoggedIn") === "true";

  if (hasSession) {
    // Sesión real
    setLoginState(true);
    loadUserName();
  } else {
    // MODO MAQUETA: inyectar datos demo
    // EN PRODUCCIÓN: borrar este bloque y dejar solo: setLoginState(false);
    if (!localStorage.getItem("userName")) {
      localStorage.setItem("userName", "Jaime Alberto Galleguillos Araya");
    }
    if (!localStorage.getItem("userRut")) {
      localStorage.setItem("userRut", "199777706");
    }
    if (!localStorage.getItem("loginMethod")) {
      localStorage.setItem("loginMethod", "clave_unica");
    }

    // Si existe nav público (es el index), forzar logueado para demo
    var publicNav = document.getElementById("publicNav");
    if (publicNav) {
      setLoginState(true);
      loadUserName();
    }
  }

  // ==========================================
  // Tabs de navegación pública
  // ==========================================
  const publicTabs = document.querySelectorAll("#publicNav .nav-tab");
  publicTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      publicTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // ==========================================
  // Botones de usuario (marcar activo)
  // ==========================================
  const userButtons = document.querySelectorAll(".btn-user:not(.btn-logout)");
  userButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      userButtons.forEach((b) => b.classList.remove("active-page-btn"));
      btn.classList.add("active-page-btn");
    });
  });

  // ==========================================
  // Cerrar sesión
  // ==========================================
  const logoutBtn = document.querySelector(".btn-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("userRut");
      localStorage.removeItem("userDatos");
      localStorage.removeItem("loginMethod");
      setLoginState(false);
    });
  }

  // ==========================================
  // Fallback de imagen del banner
  // ==========================================
  var bannerImg = document.getElementById("bannerImage");
  var bannerFallback = document.getElementById("bannerFallback");
  if (bannerImg && bannerFallback) {
    function showFallback() {
      bannerImg.style.display = "none";
      bannerFallback.style.display = "flex";
    }
    bannerImg.addEventListener("error", showFallback);
    bannerImg.addEventListener("load", function() {
      bannerFallback.style.display = "none";
      bannerImg.style.display = "block";
    });
    if (bannerImg.complete && bannerImg.naturalWidth === 0) showFallback();
  }

  // ==========================================
  // Protección de ruta para páginas internas
  // (pages/ que NO tienen nav público)
  // ==========================================
  var isInternalPage = !document.getElementById("publicNav");
  var isLoggedInNow = localStorage.getItem("isLoggedIn") === "true";

  if (isInternalPage && !isLoggedInNow) {
    // MODO MAQUETA: no redirigir, los datos demo ya se inyectaron arriba
    // EN PRODUCCIÓN: descomentar la siguiente línea:
    // window.location.href = "../index.html";
  }
});