import { formRef } from './refs.js';
import { inputSearchRef } from './refs.js';
import { searchButtonRef } from './refs.js';
import { imagesListRef }  from './refs.js';

export function fetchImages(searchQuery) {
    const API_KEY = '5132282-75e364beaf68381714aa1df4d';
    const searchUrl = 'https://pixabay.com/api/';
    const options = 'image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40'
    fetch(`${searchUrl}?key=${API_KEY}&q=${searchQuery}&${options}`)
        .then(response => {
            return response.json()
        }).
        then(images => {
            console.log(images);
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
                imagesListRef.innerHTML += htmlMarkupImages(previewImage, imageAlt, imageLikes, imageViews, imageComments, imagedoenloads, bigImage)
            }))
        
            
        })
        .catch(error => {
            console.log(error);
        }
        )
};

function htmlMarkupImages(previewImage, imageAlt, imageLikes, imageViews, imageComments, imagedoenloads, bigImage) {
    return `
    <div class="photo-card">
    <img src="${previewImage}" alt="${imageAlt}" loading="lazy" />
    <div class="info">
    <p class="info-item">
    <b>Likes${imageLikes}</b>
    </p>
    <p class="info-item">
    <b>Views${imageViews}</b>
    </p>
    <p class="info-item">
    <b>Comments${imageComments}</b>
    </p>
    <p class="info-item">
    <b>Downloads${imagedoenloads}</b>
    </p>
    </div>
</div>
`;
}

fetchImages('cat')