import { formRef } from './refs.js';
import { inputSearchRef } from './refs.js';
import { searchButtonRef } from './refs.js';
import { imagesListRef } from './refs.js';
import { loadMoreButtonRef } from './refs.js';
import { galleryRef } from './refs.js';
// import { maxPage } from './index.js';
// import { currentPage } from './index.js'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

galleryRef.addEventListener('click', onImageClick)

let maxPage = 1;

export function fetchImages(searchQuery, currentPage) {
    const API_KEY = '5132282-75e364beaf68381714aa1df4d';
    const searchUrl = 'https://pixabay.com/api/';
    const options = `image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`
    fetch(`${searchUrl}?key=${API_KEY}&q=${searchQuery}&${options}`)
        .then(response => {
            return response.json()
        }).
        then(images => {
            console.log(images);
            const totalHits = Number(images.totalHits)
            maxPage = Math.ceil(totalHits / 40)
            console.log(maxPage);
            if (maxPage === currentPage) {
                loadMoreButtonRef.classList.add("is-hidden")
                Notify.warning("We're sorry, but you've reached the end of search results.");
            } else {
                loadMoreButtonRef.classList.remove("is-hidden");
            }
            if (totalHits === 0) {
                loadMoreButtonRef.classList.add("is-hidden")
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            } else {
                if (currentPage === 1) {
                    Notify.success(`Hooray! We found ${totalHits} images.`);
                }
            images.hits.map((image => {
            const previewImage = image.webformatURL 
            const bigImage = image.largeImageURL 
            const imageAlt = image.tags 
            const imageLikes = image.likes 
            const imageViews = image.views 
            const imageComments = image.comments 
                const imagedoenloads = image.downloads 
                
                console.log(previewImage);
                console.log(bigImage);
                console.log(imageAlt);
                console.log(imageLikes);
                console.log(imageViews);
                console.log(imageComments);
                console.log(imagedoenloads);

            imagesListRef.insertAdjacentHTML('beforeend', htmlMarkupImages(previewImage, imageAlt, imageLikes, imageViews, imageComments, imagedoenloads, bigImage));
            // imagesListRef.innerHTML += htmlMarkupImages(previewImage, imageAlt, imageLikes, imageViews, imageComments, imagedoenloads, bigImage)
            }))
            }
        })
        .catch(error => {
            console.log(error);
        }
        )
};

function htmlMarkupImages(previewImage, imageAlt, imageLikes, imageViews, imageComments, imagedoenloads, bigImage) {
    return `
    <div class="photo-card">
    <a class="gallery__item" href="${bigImage}">
    <img class="gallery__images" src="${previewImage}" alt="${imageAlt}" loading="lazy" />
    <div class="info">
    <p class="info-item">
    <b>Likes<span class="info-text">${imageLikes}</span></b>
    </p>
    <p class="info-item">
    <b>Views<span class="info-text">${imageViews}</span></b>
    </p>
    <p class="info-item">
    <b>Comments<span class="info-text">${imageComments}</span></b>
    </p>
    <p class="info-item">
    <b>Downloads<span class="info-text">${imagedoenloads}</span></b>
    </p>
    </div>
    </a>
    </div>
`
};

function onImageClick(e) {
    e.preventDefault();
    if (e.target.className !== 'gallery__image') { return };
    
    new SimpleLightbox('.gallery__item', {
        captions: true,
        captionSelector: 'img',
        captionType: 'attr',
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
    });
};
