import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryList = document.querySelector(".gallery");
galleryList.addEventListener("click", onClickImage);

const createMarkUp = createImageMarkup(galleryItems);
galleryList.insertAdjacentHTML("beforeend", createMarkUp);

function createImageMarkup(images) {
  return images
    .map(({ original, preview, description }) => {
      return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
         class="gallery__image"
         src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
        </a>
        </div>`;
    })
    .join("");
}
function onClickImage(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  let modalImageSrc = e.target.dataset.source;
  const modalBox = basicLightbox.create(
    `<img src="${modalImageSrc}" width="800" height="600">`
  );
  modalBox.show();
  function onKeyPressEsc(e) {
    if (e.code === "Escape") {
      modalBox.close();
      window.removeEventListener("keydown", onKeyPressEsc);
    }
  }
  if (modalBox.visible()) {
    window.addEventListener("keydown", onKeyPressEsc);
  }
  // console.log(e.target);
}

// NB ===== Не такий продуктивний, бо часто звертаємося до insert.... краще не використовувати =====
// galleryItems.forEach((image) => {
//     const markupImage = `<div class="gallery__item">
//   <a class="gallery__link" href="${image.original}">
//     <img
//       class="gallery__image"
//       src="${image.preview}"
//       data-source="${image.original}"
//       alt="${image.description}"
//     />
//   </a>
// </div>`
//     galleryList.insertAdjacentHTML('beforeend', markupImage);
// });
