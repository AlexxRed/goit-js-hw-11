// ================== make imports ==================
import { imagesListRef } from './refs.js';
import { loadMoreButtonRef } from './refs.js';
import { htmlMarkupImages } from './htmlMarkupImages.js';
import { smoothScroll } from './smoothScroll.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const axios = require('axios').default;

//==================== var  =========================
let maxPage = 1;

//====== fetch images with Axios (async/await) ======

export async function fetchImages(searchQuery, currentPage) {
    const API_KEY = '5132282-75e364beaf68381714aa1df4d';
    const searchUrl = 'https://pixabay.com/api/';
    const options = `image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`;
    try {
        const response = await axios.get(`${searchUrl}?key=${API_KEY}&q=${searchQuery}&${options}`);
        const totalHits = Number(response.data.totalHits);
        if (currentPage !== 1) {
            smoothScroll()
        }
        maxPage = Math.ceil(totalHits / 40);
                if (maxPage === currentPage) {
                    loadMoreButtonRef.classList.add("is-hidden");
                Notify.warning("We're sorry, but you've reached the end of search results.");
            } else {
                // loadMoreButtonRef.classList.remove("is-hidden");
            }
            if (totalHits === 0) {
                loadMoreButtonRef.classList.add("is-hidden");
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            } else {
                if (currentPage === 1) {
                    Notify.success(`Hooray! We found ${totalHits} images.`);
                }
                response.data.hits.map((image => {
                    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
                        = image;
                    imagesListRef.insertAdjacentHTML('beforeend',
                        htmlMarkupImages(webformatURL, tags, likes, views, comments, downloads, largeImageURL));
                }));
        };
    }
    catch (error) {
        console.log(error);
        Notify.failure("Sorry, something went wrong. Try again");
    };



//=============== fetch images (classic)  =====================
    // fetch(`${searchUrl}?key=${API_KEY}&q=${searchQuery}&${options}`)
    //     .then(response => {
    //         return response.json()
    //     }).
    //     then(images => {
    //         console.log(images);
    //         const totalHits = Number(images.totalHits)
    //         maxPage = Math.ceil(totalHits / 40)
    //         console.log(maxPage);
    //         if (maxPage === currentPage) {
    //             loadMoreButtonRef.classList.add("is-hidden")
    //             Notify.warning("We're sorry, but you've reached the end of search results.");
    //         } else {
    //             loadMoreButtonRef.classList.remove("is-hidden");
    //         }
    //         if (totalHits === 0) {
    //             loadMoreButtonRef.classList.add("is-hidden")
    //             Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    //         } else {
    //             if (currentPage === 1) {
    //                 Notify.success(`Hooray! We found ${totalHits} images.`);
    //             }
    //             images.hits.map((image => {
    //                 const { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    //                     = image;
    //         imagesListRef.insertAdjacentHTML('beforeend',
    //         htmlMarkupImages(webformatURL, tags, likes, views, comments, downloads, largeImageURL));
    //         }))
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     }
    //     )
};



