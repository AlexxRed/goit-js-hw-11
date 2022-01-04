// import './sass/main.scss';
// ================== make imports ==================
import { Notify } from 'notiflix/build/notiflix-notify-aio';



// ================== Notiflix  init ==================

Notify.init({
width: '700px',
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
const DEBOUNCE_DELAY = 300;

// ================== take ref  =============

const refs = {
    form: document.querySelector('#search-form'),
    inputSearch: document.querySelector('input'),
    searchButton: document.querySelector('button'),
};

console.log(refs.form);
console.log(refs.inputSearch);
console.log(refs.searchButton);