/**
 * HTML del HEADER (inyectado directamente - no requiere servidor)
 */
const HEADER_HTML = `
<header class="main-header">
    <div class="top-banner">
        <img src="https://www.supereduc.cl/wp-content/uploads/2026/08/header-atencionSIE@300x-scaled.png" 
             alt="Superintendencia de Educación" 
             class="banner-img">
    </div>

    <nav class="public-nav" id="publicNav">
        <button class="nav-tab active">Competencias Supereduc</button>
        <button class="nav-tab">Competencias de otros organismos</button>
        <button class="nav-tab">Preguntas frecuentes</button>
        <button class="nav-tab">Cómo fiscalizamos</button>
        <button class="nav-tab">Proceso de requerimientos</button>
    </nav>

    <nav class="user-nav" id="userNav" style="display: none;">
        <div class="user-nav-container">
            <div class="breadcrumb">
                <a href="index.html">Inicio</a> 
                <span class="separator">&gt;</span> 
                <span class="current-page" id="currentPage">Actualizar Datos</span>
            </div>
            
            <div class="user-actions">
                <div class="user-profile">
                    <div class="user-icon">
                        <i class="bi bi-person-fill"></i>
                    </div>
                    <span class="user-name" id="userName">Jaime Alberto Galleguillos Araya</span>
                </div>
                <div class="user-buttons">
                    <button class="btn-user" onclick="window.location.href='index.html'">
                        <i class="bi bi-house-door-fill"></i> Inicio
                    </button>
                    <button class="btn-user dropdown-toggle">
                        <i class="bi bi-bell-fill"></i> Notificaciones
                    </button>
                    <button class="btn-user active-page-btn">
                        <i class="bi bi-person-lines-fill"></i> Actualizar datos
                    </button>
                    <button class="btn-user btn-logout" onclick="logout()">
                        <i class="bi bi-power"></i> Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    </nav>
</header>
`;

/**
 * HTML del FOOTER (inyectado directamente)
 */
const FOOTER_HTML = `
<footer class="main-footer">
    <div class="footer-content">
        <div class="footer-section">
            <h5>Enlaces Rápidos</h5>
            <ul>
                <li><a href="#">Preguntas frecuentes</a></li>
                <li><a href="#">Mapa del Sitio</a></li>
                <li><a href="#">Políticas de privacidad</a></li>
                <li><a href="#">Trabaja con nosotros</a></li>
            </ul>
        </div>
        
        <div class="footer-section">
            <h5>Contacto</h5>
            <p><i class="bi bi-telephone"></i> 600 3600 390</p>
            <p><i class="bi bi-clock"></i> Lunes a Viernes 09:00 - 13:00</p>
            <div class="social-links">
                <a href="#"><i class="bi bi-facebook"></i></a>
                <a href="#"><i class="bi bi-twitter"></i></a>
                <a href="#"><i class="bi bi-youtube"></i></a>
                <a href="#"><i class="bi bi-instagram"></i></a>
            </div>
        </div>
        
        <div class="footer-section">
            <h5>Sitios Relacionados</h5>
            <ul>
                <li><a href="#">Ayuda Mineduc</a></li>
                <li><a href="#">JUNJI</a></li>
                <li><a href="#">Integra</a></li>
                <li><a href="#">CONICYT</a></li>
            </ul>
        </div>
    </div>
    
    <div class="footer-bottom">
        <p>&copy; 2026 Superintendencia de Educación - Gobierno de Chile</p>
    </div>
</footer>
`;

/**
 * Inyecta los componentes en la página
 */
function injectComponents() {
  const headerContainer = document.getElementById("header-container");
  const footerContainer = document.getElementById("footer-container");

  if (headerContainer) headerContainer.innerHTML = HEADER_HTML;
  if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;
}

/**
 * Inicializa el header con su funcionalidad
 */
function initHeader() {
  const publicNav = document.getElementById("publicNav");
  const userNav = document.getElementById("userNav");

  if (publicNav && userNav) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setLoginState(isLoggedIn);

    const publicTabs = document.querySelectorAll(".nav-tab");
    publicTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        publicTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      });
    });

    const userButtons = document.querySelectorAll(".btn-user:not(.btn-logout)");
    userButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        userButtons.forEach((b) => b.classList.remove("active-page-btn"));
        btn.classList.add("active-page-btn");
      });
    });
  }
}

function setLoginState(isLoggedIn) {
  const publicNav = document.getElementById("publicNav");
  const userNav = document.getElementById("userNav");

  if (publicNav && userNav) {
    if (isLoggedIn) {
      publicNav.style.display = "none";
      userNav.style.display = "block";
    } else {
      publicNav.style.display = "flex";
      userNav.style.display = "none";
    }
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userName");
  setLoginState(false);
  window.location.href = "index.html";
}

function updateBreadcrumb(pageName) {
  const currentPageEl = document.getElementById("currentPage");
  if (currentPageEl && pageName) {
    currentPageEl.textContent = pageName;
  }
}

function updateUserName(name) {
  const userNameEl = document.getElementById("userName");
  if (userNameEl && name) {
    userNameEl.textContent = name;
  }
}

// Auto-ejecutar al cargar
document.addEventListener("DOMContentLoaded", () => {
  injectComponents();
  initHeader();
});
