const menuBoton = document.getElementById("menuBoton");
const menu = document.getElementById("menu");

menuBoton.addEventListener("click", () => {
    menu.classList.toggle("activo");
});

const enlacesMenu = document.querySelectorAll(".menu a");

enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        menu.classList.remove("activo");
    });
});

const fotos = document.querySelectorAll(".foto-galeria");
const modal = document.getElementById("modal");
const imagenModal = document.getElementById("imagenModal");
const cerrarModal = document.getElementById("cerrarModal");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");

let imagenActual = 0;

const imagenesGaleria = Array.from(fotos).map(foto => {
    return foto.dataset.imagen;
});

function mostrarImagen(indice) {
    imagenActual = indice;
    imagenModal.src = imagenesGaleria[imagenActual];
}

fotos.forEach((foto, indice) => {
    foto.addEventListener("click", () => {
        mostrarImagen(indice);
        modal.classList.add("activo");
        document.body.style.overflow = "hidden";
    });
});

cerrarModal.addEventListener("click", () => {
    modal.classList.remove("activo");
    document.body.style.overflow = "";
});

anterior.addEventListener("click", () => {
    imagenActual--;

    if (imagenActual < 0) {
        imagenActual = imagenesGaleria.length - 1;
    }

    mostrarImagen(imagenActual);
});

siguiente.addEventListener("click", () => {
    imagenActual++;

    if (imagenActual >= imagenesGaleria.length) {
        imagenActual = 0;
    }

    mostrarImagen(imagenActual);
});

modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        modal.classList.remove("activo");
        document.body.style.overflow = "";
    }
});

document.addEventListener("keydown", (evento) => {

    if (!modal.classList.contains("activo")) {
        return;
    }

    if (evento.key === "Escape") {
        modal.classList.remove("activo");
        document.body.style.overflow = "";
    }

    if (evento.key === "ArrowLeft") {
        anterior.click();
    }

    if (evento.key === "ArrowRight") {
        siguiente.click();
    }
});

const seccionesAnimadas = document.querySelectorAll(".seccion-animada");

const observador = new IntersectionObserver(
    entradas => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observador.unobserve(entrada.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

seccionesAnimadas.forEach(seccion => {
    observador.observe(seccion);
});

const volverArriba = document.getElementById("volverArriba");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        volverArriba.classList.add("visible");
    } else {
        volverArriba.classList.remove("visible");
    }
});

volverArriba.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});