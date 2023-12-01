const dropdown = document.querySelector(".dropdown");
const dropdownContent = document.querySelector(".dropdown-content");
const homeButton = document.querySelector("#home");
const thumbnails_nodeList = document.querySelectorAll(".thumbnail");
let thumbnails = [...thumbnails_nodeList];
const lightbox = document.querySelector(".lightbox");
const card = document.querySelector(".card");
const frontFace = document.querySelector(".front-face");
const backFace = document.querySelector(".back-face");
const lightboxImage = document.querySelector(".lightbox-image");
const closeButton = document.querySelector(".close");
const leftButton = document.querySelector("#left");
const rightButton = document.querySelector("#right");

let initialX = 0,
  initialY = 0,
  originX = 0,
  originY = 0;
let moveLightboxImage = false;
let rotatedImage = false;
let currentIndex = 0;
let callFunction = true;

dropdown.addEventListener("click", function () {
  dropdownContent.classList.toggle("show");
});

window.addEventListener("click", function (event) {
  if (!event.target.matches(".dropButton")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
});

// thumbnails.forEach(thumbnail => {
//     thumbnail.addEventListener('click', () => {
//         const imageUrl = thumbnail.getAttribute('src')
//
//         lightboxImage.setAttribute('src', imageUrl)
//         lightbox.style.display ='flex'
//     })
// });

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", function () {
    if (callFunction) {
      currentIndex = index;
      mostrarImagen(currentIndex);
      lightbox.style.display = "flex";
    } else {
      return;
    }
  });
});

function filtrarImagenes(categoria) {
  const imagenes = document.querySelectorAll(".galeria img");
  imagenes.forEach((imagen) => {
    imagen.style.display = "none";
  });

  thumbnails.length = 0;
  console.log(thumbnails);

  const imagenesCategoria = document.querySelectorAll("." + categoria);
  imagenesCategoria.forEach((imagen) => {
    thumbnails.push(imagen);
  });

  callFunction = false;

  thumbnails.forEach((imagen, index) => {
    imagen.style.display = "block";
    imagen.addEventListener("click", () => {
      currentIndex = index;
      mostrarImagen(currentIndex);
      lightbox.style.display = "flex";
    });
  });
}

function mostrarImagen(index) {
  console.log(index);
  if (currentIndex === 0) {
    leftButton.style.display = "none";
  } else {
    leftButton.style.display = "block";
  }
  if (currentIndex === thumbnails.length - 1) {
    rightButton.style.display = "none";
  } else {
    rightButton.style.display = "block";
  }

  const imageUrl = thumbnails[index].getAttribute("src");
  lightboxImage.setAttribute("src", imageUrl);
  const caption = thumbnails[index].nextElementSibling.innerHTML;
  backFace.innerHTML = caption;
}

leftButton.addEventListener("click", mostrarImagenAnterior);
rightButton.addEventListener("click", mostrarSiguienteImagen);

function mostrarSiguienteImagen() {
  if (currentIndex < thumbnails.length - 1) {
    currentIndex++;
    mostrarImagen(currentIndex);
  }
}

function mostrarImagenAnterior() {
  if (currentIndex > 0) {
    currentIndex--;
    mostrarImagen(currentIndex);
  }
}

card.addEventListener("mousedown", (event) => {
  event.preventDefault();
  initialX = event.clientX;
  initialY = event.clientY;
  moveLightboxImage = true;
});

card.addEventListener("mousemove", (event) => {
  if (moveLightboxImage) {
    event.preventDefault();
    let newX = event.clientX;
    let newY = event.clientY;
    card.style.top = card.offsetTop - (initialY - newY) + "px";
    card.style.left = card.offsetLeft - (initialX - newX) + "px";
    initialX = newX;
    initialY = newY;
  }
});

card.addEventListener(
  "mouseup",
  (stopMovement = () => {
    moveLightboxImage = false;
  })
);

card.addEventListener("mouseleave", stopMovement);

closeButton.addEventListener("click", () => {
  lightbox.style.display = "none";
  card.style.top = "";
  card.style.left = "";
  if (rotatedImage) {
    rotateImage();
  }
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.style.display = "none";
    card.style.top = "";
    card.style.left = "";
    if (rotatedImage) {
      rotateImage();
    }
  }
});

card.addEventListener("dblclick", rotateImage);
function rotateImage() {
  if (!rotatedImage) {
    frontFace.style.transform = "rotateY(-180deg)";
    backFace.style.transform = "rotateY(0deg)";
    rotatedImage = true;
  } else {
    frontFace.style.transform = "rotateY(0deg)";
    backFace.style.transform = "rotateY(-180deg)";
    rotatedImage = false;
  }
}
