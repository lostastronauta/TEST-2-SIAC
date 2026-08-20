<script>
    // ==========================================
    // 0. Protección de ruta — MODO DEMO
    //    En producción: descomentar la redirección
    //    En maqueta: carga datos de demostración
    // ==========================================
    (function() {
        var isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (!isLoggedIn) {
            // --- MODO PRODUCCIÓN (descomentar para activar) ---
            // window.location.href = "../index.html";
            // return;

            // --- MODO MAQUETA: cargar datos de demo ---
            console.info("Modo maqueta: usuario no logueado, cargando datos de demostración.");
            if (!localStorage.getItem("userName")) {
                localStorage.setItem("userName", "Jaime Alberto Galleguillos Araya");
            }
            if (!localStorage.getItem("userRut")) {
                localStorage.setItem("userRut", "199777706");
            }
            if (!localStorage.getItem("loginMethod")) {
                localStorage.setItem("loginMethod", "clave_unica");
            }
        }
    })();

    // ==========================================
    // 1. Cargar datos del usuario
    // ==========================================
    (function() {
        var name = localStorage.getItem("userName") || "Usuario";
        var rut = localStorage.getItem("userRut") || "";

        var nameEl = document.getElementById("userName");
        if (nameEl) nameEl.textContent = name;

        var nombreEl = document.getElementById("nombreCompleto");
        if (nombreEl) nombreEl.value = name;

        var rutEl = document.getElementById("rutField");
        if (rutEl && rut) {
            var clean = rut.replace(/[^0-9kK]/g, "");
            if (clean.length > 1) {
                var body = clean.slice(0, -1);
                var dv = clean.slice(-1);
                var formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv;
                rutEl.value = formatted;
            } else {
                rutEl.value = rut;
            }
        } else if (rutEl) {
            rutEl.value = "No disponible";
        }

        var method = localStorage.getItem("loginMethod");
        var alertTitle = document.querySelector(".alert-verified h4");
        if (alertTitle && method === "clave_unica") {
            alertTitle.textContent = "Identidad verificada con Clave Única";
        }
    })();

    // ==========================================
    // 2. Fallback de imagen del banner
    // ==========================================
    (function() {
        var img = document.getElementById("bannerImage");
        var fallback = document.getElementById("bannerFallback");
        if (!img || !fallback) return;

        function showFallback() {
            img.style.display = "none";
            fallback.style.display = "flex";
        }

        img.addEventListener("error", showFallback);
        img.addEventListener("load", function() {
            fallback.style.display = "none";
            img.style.display = "block";
        });

        if (img.complete && img.naturalWidth === 0) showFallback();
    })();

    // ==========================================
    // 3. Toasts
    // ==========================================
    function showToast(type, title, message) {
        var container = document.getElementById("toastContainer");
        var toast = document.createElement("div");
        toast.className = "toast" + (type !== "success" ? " toast-" + type : "");
        var iconChar = type === "info" ? "i" : "\2713";

        toast.innerHTML =
            '<div class="toast-icon ' + type + '">' + iconChar + '</div>' +
            '<div class="toast-body"><strong>' + title + '</strong><span>' + message + '</span></div>' +
            '<button class="toast-close" aria-label="Cerrar">&times;</button>';

        container.appendChild(toast);
        requestAnimationFrame(function() { toast.classList.add("show"); });

        toast.querySelector(".toast-close").addEventListener("click", function() {
            removeToast(toast);
        });

        setTimeout(function() { removeToast(toast); }, 5000);
    }

    function removeToast(toast) {
        if (!toast || !toast.parentNode) return;
        toast.classList.remove("show");
        setTimeout(function() {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 400);
    }

    // ==========================================
    // 4. Validación del formulario
    // ==========================================
    function clearErrors() {
        document.querySelectorAll(".field-error").forEach(function(el) { el.classList.remove("visible"); });
        document.querySelectorAll(".form-control.error").forEach(function(el) { el.classList.remove("error"); });
    }

    function showFieldError(inputId, errorId) {
        var input = document.getElementById(inputId);
        var error = document.getElementById(errorId);
        if (input) input.classList.add("error");
        if (error) error.classList.add("visible");
    }

    document.querySelectorAll(".form-control").forEach(function(input) {
        input.addEventListener("input", function() {
            this.classList.remove("error");
            var errorEl = this.parentNode.querySelector(".field-error");
            if (errorEl) errorEl.classList.remove("visible");
        });
    });

    document.getElementById("consultaForm").addEventListener("submit", function(e) {
        e.preventDefault();
        clearErrors();

        var valid = true;
        var email = document.getElementById("email").value.trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) { showFieldError("email", "errorEmail"); valid = false; }
        if (!document.getElementById("telefono").value.trim()) { showFieldError("telefono", "errorTelefono"); valid = false; }
        if (!document.getElementById("tipoConsulta").value) { showFieldError("tipoConsulta", "errorTipo"); valid = false; }
        if (!document.getElementById("asunto").value.trim()) { showFieldError("asunto", "errorAsunto"); valid = false; }
        if (!document.getElementById("descripcion").value.trim()) { showFieldError("descripcion", "errorDescripcion"); valid = false; }
        if (!document.getElementById("aceptaTerminos").checked) { document.getElementById("errorTerminos").classList.add("visible"); valid = false; }

        if (!valid) {
            showToast("info", "Campos incompletos", "Por favor corrija los campos marcados en rojo.");
            var firstError = document.querySelector(".form-control.error");
            if (firstError) { firstError.scrollIntoView({ behavior: "smooth", block: "center" }); firstError.focus(); }
            return;
        }

        var btn = document.getElementById("btnEnviar");
        btn.disabled = true;
        btn.textContent = "Enviando...";

        setTimeout(function() {
            btn.disabled = false;
            btn.textContent = "Enviar Consulta (Prototipo)";
            showToast("success", "Consulta enviada (prototipo)", "En producción, esta consulta se ingresará al SIAC oficial.");
            document.getElementById("consultaForm").reset();
            clearErrors();
        }, 1500);
    });

    // ==========================================
    // 5. Cerrar sesión
    // ==========================================
    document.getElementById("btnLogout").addEventListener("click", function(e) {
        e.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRut");
        localStorage.removeItem("userDatos");
        localStorage.removeItem("loginMethod");
        window.location.href = "../index.html";
    });

    // ==========================================
    // 6. Notificaciones
    // ==========================================
    document.getElementById("btnNotificaciones").addEventListener("click", function(e) {
        e.preventDefault();
        showToast("info", "Notificaciones", "No tiene notificaciones pendientes.");
    });
</script>