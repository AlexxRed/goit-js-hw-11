
// ================== make imports ==================
import { formRef } from './refs.js';
import { inputSearchRef } from './refs.js';
import { searchButtonRef } from './refs.js';
import { imagesListRef } from './refs.js';
import { loadMoreButtonRef } from './refs.js';
import { galleryRef } from './refs.js';
import { fetchImages } from './fetchImages';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

// ================== Notiflix  init ==================

Notify.init({
width: '600px',
position: 'right-top',
closeButton: false,
distance: '10px',
opacity: 5,
borderRadius: '5px',
rtl: false,
timeout: 2000,
messageMaxLength: 110,
backOverlay: false,
backOverlayColor: 'rgba(0,0,0,0.9)',
plainText: true,
showOnlyTheLastOne: false,
clickToClose: true,
pauseOnHover: true,
zindex: 4001,
fontFamily: 'Quicksand',
fontSize: '32px',
});

// ================== var  ==================
const DEBOUNCE_DELAY = 100;
let inputValue = '';
export let maxPage = 1;
export let currentPage = 1;
let gallery;
// ================== basic style  =============
searchButtonRef.disabled = true;


// ================== add listeners  ==================
formRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
formRef.addEventListener('submit', onButtonSearch);
loadMoreButtonRef.addEventListener('click', onClickLoadMoreButton);
galleryRef.addEventListener('click', onImageClick);

// ================== input change  ==================
function onInput(e) {
    inputValue = e.target.value.trim();
    if (inputValue === '') {
        searchButtonRef.disabled = true;
        loadMoreButtonRef.classList.add("is-hidden");
        Notify.info('Enter what you want to find');
        return;
    } else {
        searchButtonRef.disabled = false;
    };
};
// ================ start search images  ==================
function onButtonSearch(e) {
    e.preventDefault();
    inputValue = e.currentTarget.elements.searchQuery.value.trim()
    if (inputValue === '') {
        imagesListRef.innerHTML = '';
        loadMoreButtonRef.classList.add("is-hidden");
        return;
    } else {
        imagesListRef.innerHTML = '';
        currentPage = 1;
        fetchImages(inputValue, currentPage);
        if (currentPage !== 0) {
            searchButtonRef.disabled = true;
        };
    };
};
// ================== make gallery view  ==================
function onImageClick(e) {
    e.preventDefault();

    gallery = new SimpleLightbox('.gallery__item', {
        captions: true,
        captionSelector: 'img',
        captionType: 'attr',
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
    });
};
// ================== load more images ==================
function onClickLoadMoreButton(e) {
    if (gallery) {
        gallery.refresh()
    };
    loadMoreButtonRef.classList.add("is-hidden");
    currentPage += 1;
    fetchImages(inputValue, currentPage);
    loadMoreButtonRef.classList.remove("is-hidden");
};



