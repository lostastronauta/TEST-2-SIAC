/**
 * main.js — Lógica de página (index)
 * Maneja: modal, login simulado, toasts, tabs, fallback banner
 */

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // SISTEMA DE TOASTS
  // ==========================================
  function showToast(title, message, type) {
    type = type || "success";
    var container = document.getElementById("toastContainer");
    if (!container) return;

    var icons = {
      success: { cls: "success", char: "\u2713" },
      error: { cls: "error", char: "\u2715" },
      info: { cls: "info", char: "\u2139" },
    };

    var ic = icons[type] || icons.success;

    var toast = document.createElement("div");
    toast.className = "toast" + (type !== "success" ? " toast-" + type : "");
    toast.innerHTML =
      '<div class="toast-icon ' +
      ic.cls +
      '">' +
      ic.char +
      "</div>" +
      '<div class="toast-body"><strong>' +
      title +
      "</strong><span>" +
      message +
      "</span></div>" +
      '<button class="toast-close">&times;</button>';

    container.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add("show");
    });

    toast.querySelector(".toast-close").addEventListener("click", function () {
      closeToast(toast);
    });

    setTimeout(function () {
      closeToast(toast);
    }, 5000);
  }

  function closeToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.remove("show");
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 400);
  }

  // ==========================================
  // MODAL CLAVEÚNICA
  // ==========================================
  var cuModal = document.getElementById("cu-modal");
  var cuModalClose = document.getElementById("cu-modal-close");
  var btnClaveUnica = document.getElementById("btnClaveUnicaOficial");
  var btnDemoLogin = document.getElementById("btn-demo-login");
  var btnDenunciaCU = document.getElementById("btnDenunciaCU");

  function openModal() {
    if (cuModal) {
      cuModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (cuModal) {
      cuModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (btnClaveUnica) {
    btnClaveUnica.addEventListener("click", function () {
      openModal();
    });
  }

  if (cuModalClose) {
    cuModalClose.addEventListener("click", function () {
      closeModal();
    });
  }

  if (cuModal) {
    cuModal.addEventListener("click", function (e) {
      if (e.target === cuModal) closeModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && cuModal && cuModal.classList.contains("active")) {
      closeModal();
    }
  });

  // ==========================================
  // AJUSTAR PADDING DEL BODY
  // ==========================================
  function adjustPadding() {
    var mockupBanner = document.querySelector(".mockup-banner");
    if (mockupBanner) {
      document.body.style.paddingTop = (mockupBanner.offsetHeight || 44) + "px";
    }
  }

  // ==========================================
  // SIMULAR LOGIN → redirige a dashboard
  // ==========================================
  function doLogin() {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", "Jaime Alberto Galleguillos Araya");
    localStorage.setItem("userRut", "199777706");
    localStorage.setItem("loginMethod", "clave_unica");

    closeModal();

    showToast("Sesión iniciada", "Redirigiendo al panel...", "success");

    setTimeout(function () {
      if (window.goToRoute) {
        window.goToRoute("pages/dashboard.html");
      } else {
        window.location.href = "pages/dashboard.html";
      }
    }, 600);
  }

  // ==========================================
  // CERRAR SESIÓN → redirige a index
  // ==========================================
  function doLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRut");
    localStorage.removeItem("userDatos");
    localStorage.removeItem("loginMethod");

    showToast("Sesión cerrada", "Redirigiendo al inicio...", "info");

    setTimeout(function () {
      if (window.goToRoute) {
        window.goToRoute("index.html");
      } else {
        window.location.href = "index.html";
      }
    }, 600);
  }

  if (btnDemoLogin) {
    btnDemoLogin.addEventListener("click", function () {
      doLogin();
    });
  }

  if (btnDenunciaCU) {
    btnDenunciaCU.addEventListener("click", function () {
      var isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        if (window.goToRoute) {
          window.goToRoute("pages/denuncias.html");
        } else {
          window.location.href = "pages/denuncias.html";
        }
      } else {
        openModal();
      }
    });
  }

  // ==========================================
  // BOTÓN TEST TOGGLE (flotante inferior izq)
  // ==========================================
  var btnTestToggle = document.getElementById("btnTestToggle");
  var testToggleText = document.getElementById("testToggleText");

  function updateTestButton() {
    if (!btnTestToggle) return;
    var isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      btnTestToggle.classList.add("logued-in");
      if (testToggleText) testToggleText.textContent = "Cerrar sesión (demo)";
    } else {
      btnTestToggle.classList.remove("logued-in");
      if (testToggleText) testToggleText.textContent = "Simular login";
    }
  }

  if (btnTestToggle) {
    btnTestToggle.addEventListener("click", function () {
      var isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        doLogout();
      } else {
        openModal();
      }
    });
  }

  updateTestButton();

  // ==========================================
  // TABS DE NAVEGACIÓN PÚBLICA
  // ==========================================
  var publicTabs = document.querySelectorAll("#publicNav .nav-tab");

  publicTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var page = tab.getAttribute("data-page");

      publicTabs.forEach(function (t) {
        t.classList.remove("active");
      });
      tab.classList.add("active");

      switch (page) {
        case "competencias": {
          var el = document.getElementById("competencias");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
        case "otros-organismos": {
          var el2 = document.getElementById("otros-organismos");
          if (el2) {
            el2.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            showToast(
              "En desarrollo",
              "La sección de otros organismos estará disponible pronto",
              "info",
            );
          }
          break;
        }
        case "requerimientos": {
          var el3 = document.getElementById("competencias");
          if (el3) el3.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
        default: {
          showToast(
            "En desarrollo",
            "Esta sección estará disponible pronto",
            "info",
          );
          break;
        }
      }
    });
  });

  // ==========================================
  // BANNER FALLBACK + BREADCRUMB (solo interno)
  // ==========================================
  requestAnimationFrame(function () {
    var bannerImg = document.getElementById("bannerImage");
    var bannerFallback = document.getElementById("bannerFallback");

    if (bannerImg && bannerFallback) {
      function showFallback() {
        bannerImg.style.display = "none";
        bannerFallback.style.display = "flex";
        setTimeout(adjustPadding, 50);
      }

      bannerImg.addEventListener("error", showFallback);

      if (bannerImg.complete && bannerImg.naturalWidth === 0) {
        showFallback();
      }

      bannerImg.addEventListener("load", function () {
        bannerFallback.style.display = "none";
        bannerImg.style.display = "block";
        setTimeout(adjustPadding, 50);
      });
    }

    // Actualizar breadcrumb SOLO en páginas internas
    var isIndex = document.getElementById("publicNav");
    if (!isIndex) {
      var currentPageEl = document.getElementById("currentPage");
      var btnCurrentPage = document.getElementById("btnCurrentPage");
      if (currentPageEl && btnCurrentPage) {
        var pageTitle = document.title;
        var parts = pageTitle.split(" - ");
        var shortTitle = parts.length > 1 ? parts[0].trim() : pageTitle;
        currentPageEl.textContent = shortTitle;
        btnCurrentPage.innerHTML =
          '<i class="bi bi-person-lines-fill"></i> ' + shortTitle;
      }
    }
  });

  // ==========================================
  // AJUSTE INICIAL DE PADDING
  // ==========================================
  setTimeout(adjustPadding, 200);
  setTimeout(adjustPadding, 500);
  window.addEventListener("load", adjustPadding);
  window.addEventListener("resize", adjustPadding);
});
