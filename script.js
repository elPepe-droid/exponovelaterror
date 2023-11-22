let currentImageIndex = 0;
const images = [
    "imagen1.jpg",
    "imagen2.jpg",
    "imagen3.jpg",
    "imagen4.jpg",
    "imagen5.jpg",
    "imagen6.jpg",
    "imagen7.jpg"
];

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0].clientX;
});

document.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // Ajusta este valor según sea necesario

    if (touchStartX - touchEndX > swipeThreshold) {
        // Deslizar de derecha a izquierda (siguiente imagen)
        nextImage();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        // Deslizar de izquierda a derecha (anterior imagen)
        prevImage();
    }
}

function showImage(index, direction) {
    const gallery = document.querySelector('.gallery');
    const pageNumber = document.querySelector('.page-number');
    const scrollPosition = window.scrollY;

    const newImage = new Image();
    newImage.src = images[index];
    newImage.alt = `Descripción de la imagen ${index + 1}`;
    newImage.style.opacity = 0;

    // Añadir la transición de escala, desplazamiento y border-radius
    if (direction === 'prev') {
        newImage.style.transform = 'scale(0.2)';
    } else {
        newImage.style.transform = 'scale(0.2)';
    }

    // Agregar un border-radius inicial
    newImage.style.borderRadius = '50%';

    gallery.innerHTML = '';
    gallery.appendChild(newImage);

    newImage.onload = function () {
        // Modificar la transición de escala, desplazamiento y border-radius
        newImage.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out, border-radius 0.5s ease-in-out';

        newImage.style.opacity = 1;
        newImage.style.transform = 'scale(1)';

        // Establecer un border-radius final
        newImage.style.borderRadius = '0';
    };

    pageNumber.textContent = `Página ${index + 1} de ${images.length}`;

    const prevButton = document.querySelector('.controls button:nth-child(1)');
    prevButton.disabled = index === 0;

    const nextButton = document.querySelector('.controls button:nth-child(3)');
    nextButton.disabled = index === images.length - 1;

    window.scrollTo(0, scrollPosition);
}

function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        showImage(currentImageIndex, 'prev');
    }
}

function nextImage() {
    if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
        showImage(currentImageIndex, 'next');
    }
}

function toggleFullscreen() {
    const gallery = document.querySelector('.gallery');

    if (gallery.requestFullscreen) {
        gallery.requestFullscreen();
    } else if (gallery.mozRequestFullScreen) {
        gallery.mozRequestFullScreen();
    } else if (gallery.webkitRequestFullscreen) {
        gallery.webkitRequestFullscreen();
    } else if (gallery.msRequestFullscreen) {
        gallery.msRequestFullscreen();
    }
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowLeft') {
        prevImage();
    } else if (event.code === 'ArrowRight') {
        nextImage();
    }
});

showImage(currentImageIndex, 'next');