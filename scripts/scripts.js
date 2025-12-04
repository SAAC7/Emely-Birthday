const timer = (() => {
    // Set the date we're counting down to
    var countDownDate = new Date("Dec 20, 2025 17:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("timer").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
})();

const parameters = (() => {
    const API_URL = "https://script.google.com/macros/s/AKfycby-PUyAgckSCL9-Qi4E6M4K9ys2UfIpoVaQ6RkZijoJFaRTN3zOYnWYlZoBFn0Ix2VU/exec";

    // Leer ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id.endsWith('"')) {
        id = id.slice(0, -1);
    }
    if (!id) {
        document.getElementById("guestList").innerHTML = `
        <div class="card">
            <h1>Querido Visitante</h1>
            <p>Favor de contactar al organizador</p>
            <p>Error en invitacion</p>
            <button id="confirm" type="button" hidden>Confirmar</button>
        </div>
        `;
    }

    // Obtener datos del Apps Script
    fetch(`${API_URL}?id=${id}`)
        .then(response => response.json())
        .then(data => {
            const guestDiv = document.getElementById("guestList");

            if (data.error) {
                guestDiv.innerHTML = `<p>${data.error}</p>`;
                return;
            }

            // Si NO está confirmado
            if (data.Confirmado == 0) {
                guestDiv.innerHTML = `
                <div class="card">
                    <h1>${data.Titulo}</h1>
                    <p>${data.Nombre}</p>
                    <p>Invitados: ${data.Invitados}</p>
                    <p>Esperamos contar con su asistencia</p>
                    <button id="confirm" type="button">Confirmar</button>
                </div>
            `;

                document.getElementById("confirm").addEventListener("click", () => {
                    fetch(API_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: `id=${id}`
                    })
                        .then(r => r.json())
                        .then(resp => {
                            if (resp.success) {
                                guestDiv.innerHTML = `
                            <div class="card">
                                <h1>${data.Titulo}</h1>
                                <p>${data.Nombre}</p>
                                <p>Gracias por confirmar, Les Esperamos</p>
                                <button id="confirm" type="button" hidden>Confirmar</button>
                            </div>
                        `;
                            }
                        });
                });

            }
            // Si YA está confirmado
            else {
                guestDiv.innerHTML = `
                <div class="card">
                    <h1>${data.Titulo}</h1>
                    <p>${data.Nombre}</p>
                    <p>Gracias por confirmar, Les Esperamos</p>
                    <button id="confirm" type="button" hidden>Confirmar</button>
                </div>
            `;
            }
        });

})();
