import { formRef } from './refs.js';
import { inputSearchRef } from './refs.js';
import { searchButtonRef } from './refs.js';
import { imagesListRef } from './refs.js';
import { loadMoreButtonRef } from './refs.js';
// import { maxPage } from './index.js';
// import { currentPage } from './index.js'
import { Notify } from 'notiflix/build/notiflix-notify-aio';


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
            if (totalHits === 0) {
                Notify.failure("Oops, we did not find these photos.");
            } else {
                Notify.info(`Hooray! We found ${totalHits} images.`);
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
</div>
`;
}

// fetchImages('cat')