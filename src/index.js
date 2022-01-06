
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
width: '700px',
position: 'right-top',
closeButton: false,
distance: '10px',
opacity: 5,
borderRadius: '5px',
rtl: false,
timeout: 1000,
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
// ================== take ref  =============
searchButtonRef.disabled = true;


console.log(formRef);
console.log(inputSearchRef);
console.log(searchButtonRef);

// ================== add listener  ==================
formRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
formRef.addEventListener('submit', onButtonSearch);
loadMoreButtonRef.addEventListener('click', onClickLoadMoreButton);
galleryRef.addEventListener('click', onImageClick)

// searchButtonRef.addEventListener('click', onButton);


// ================== input change  ==================
function onInput(e) {
    console.log(inputValue);
    inputValue = e.target.value.trim();
    console.log(inputValue);
    if (inputValue === '') {
        searchButtonRef.disabled = true;
        loadMoreButtonRef.classList.add("is-hidden");
        Notify.info('Enter what you want to find');
        console.log('Enter what you want to find');
        return
    } else {
        searchButtonRef.disabled = false;
    }
};

function onButtonSearch(e) {
    e.preventDefault();
    inputValue = e.currentTarget.elements.searchQuery.value.trim()
    console.log(inputValue);
    if (inputValue === '') {
        imagesListRef.innerHTML = '';
        loadMoreButtonRef.classList.add("is-hidden");
        return
    } else {
        imagesListRef.innerHTML = '';
        currentPage = 1;
        fetchImages(inputValue, currentPage);
        // currentPage += 1;
        // onClickLoadMoreButton(inputValue, currentPage)
        console.log(currentPage);
        if (currentPage !== 0) {
            // loadMoreButtonRef.classList.remove("is-hidden");
            searchButtonRef.disabled = true;
            // e.currentTarget.reset();
        };
    };
    
};


function onClickLoadMoreButton(e) {
    console.log(inputValue);
    console.log(currentPage);
    loadMoreButtonRef.classList.add("is-hidden")
    currentPage += 1;
    fetchImages(inputValue, currentPage);
    loadMoreButtonRef.classList.remove("is-hidden");
}

function onImageClick(e) {
    e.preventDefault();
    
    new SimpleLightbox('.gallery__item', {
        captions: true,
        captionSelector: 'img',
        captionType: 'attr',
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
    });
};

