export function htmlMarkupImages(previewImage, imageAlt, imageLikes, imageViews, imageComments, imageDownloads, bigImage) {
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
    <b>Downloads<span class="info-text">${imageDownloads}</span></b>
    </p>
    </div>
    </a>
    </div>
`
};