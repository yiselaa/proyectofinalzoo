document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formLogin")
        .addEventListener("submit", iniciarSesion);
});

function iniciarSesion(event) {
    event.preventDefault();

    Swal.fire({
        title: '<span style="font-size:14px;font-weight:500;color:#222;">Verificando credenciales</span>',
        html: '<span style="font-size:12px;color:#999;">Por favor espere...</span>',
        width: 260,
        padding: '18px 20px',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        backdrop: 'rgba(0,0,0,0.15)',
        customClass: { popup: 'swal-mini-popup' },
        didOpen: () => Swal.showLoading()
    });

    let login = {
        nombreUsuario: document.getElementById("usuario").value,
        contrasena: document.getElementById("password").value
    };

    fetch("LoginServlet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login)
    })
    .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    })
    .then(data => {
        sessionStorage.setItem("usuarioLogueado", data.nombreUsuario);
        window.location.href = data.redirect;
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: '<span style="font-size:14px;font-weight:500;">Acceso denegado</span>',
            html: `<span style="font-size:12px;color:#999;">${error.message}</span>`,
            width: 280,
            padding: '18px 20px',
            confirmButtonText: 'Reintentar',
            confirmButtonColor: '#A32D2D',
            backdrop: 'rgba(0,0,0,0.15)',
            customClass: {
                popup: 'swal-mini-popup',
                confirmButton: 'swal-btn-small'
            }
        });
    });
}

