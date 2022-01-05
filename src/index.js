
// ================== make imports ==================
import { formRef } from './refs.js';
import { inputSearchRef } from './refs.js';
import { searchButtonRef } from './refs.js';
import { imagesListRef }  from './refs.js';
import {fetchImages} from './fetchImages'
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



console.log(formRef);
console.log(inputSearchRef);
console.log(searchButtonRef);

// ================== add listener  ==================
formRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
searchButtonRef.addEventListener('click', onButton);


// ================== input change  ==================
function onInput(e) {
    e.preventDefault();
    const inputValue = e.target.value.trim()
    console.log(inputValue);
    if (inputValue === '') {
        // countryListRef.innerHTML = ''
        // countryInfoRef.innerHTML = ''
        // Notify.info('Start typing the country name');
        console.log('Start typing the country name');
        return
    } else {
        // countryListRef.innerHTML = ''
        // countryInfoRef.innerHTML = ''
        // fetchCountries(inputValue);
    }

}

function onButton(e) {
    e.preventDefault();
}