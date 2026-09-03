const botonCamara = document.querySelector(".boton-camara");
const modal = document.querySelector(".modal");
const botonCerrar = document.querySelector(".cerrar");
let estadosCanvas = {};

botonCamara.addEventListener("click", function () {
    modal.style.display = "flex";

    document.body.style.overflow = "hidden";

    const canvas = document.querySelectorAll(".rascado");

    canvas.forEach(function(canvas) {

        const ctx = canvas.getContext("2d");

        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        const nombreRecuerdo = canvas.parentElement.classList[1];

        if (estadosCanvas[nombreRecuerdo]) {

            ctx.putImageData(
                estadosCanvas[nombreRecuerdo],
                0,
                0
            );

        } else {

            ctx.fillStyle = "#b8b8b8";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

        }

        let rascando = false;

        canvas.addEventListener("touchstart", function(){
            rascando = true;
        });

        canvas.addEventListener("touchend", function(){
            rascando = false;
        });

        canvas.addEventListener("touchmove", function(e){

            if(!rascando) return;

            e.preventDefault();

            const rect = canvas.getBoundingClientRect();

            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;

            ctx.clearRect(x - 20, y - 20, 40, 40);

            if (!recuerdosDescubiertos.includes (nombreRecuerdo)) { 
                recuerdosDescubiertos.push(nombreRecuerdo); 
            }
            
            });

    });
});

botonCerrar.addEventListener("click", function () {

    const canvas = document.querySelectorAll(".rascado");

    canvas.forEach(function(canvas) {

        const ctx = canvas.getContext("2d");

        const nombreRecuerdo = canvas.parentElement.classList[1];

        estadosCanvas[nombreRecuerdo] = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );

    });


    modal.style.display = "none";

    document.body.style.overflow = "auto";

});

