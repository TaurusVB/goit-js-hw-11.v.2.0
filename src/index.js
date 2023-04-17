import NewApiService from './js/fetchCards';
import createMarkup from './js/renderMarkup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import LoadingButton from './components/loading-btn';

const END_POINT = 'https://pixabay.com/api/';
const API_KEY = '35461172-aba5a47e12cfcacf79e93a52f';

const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};

const { form, gallery } = refs;

const newApiService = new NewApiService({
  url: END_POINT,
  key: API_KEY,
});

const lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const loadBtn = new LoadingButton({ selector: 'loading-btn' });

form.addEventListener('submit', onSubmitClick);
loadBtn.btn.addEventListener('click', onLoadBtnClick);

function onSubmitClick(evt) {
  evt.preventDefault();

  loadBtn.btnDisabled();
  loadBtn.show();

  newApiService.resetPage();

  newApiService.query = form.elements.searchQuery.value;

  gallery.innerHTML = '';

  newApiService
    .fetchCards()
    .then(({ data: { hits, totalHits } }) => {
      if (totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        loadBtn.hidden();
        return;
      }
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      form.reset();

      const markup = hits.map(elem => createMarkup(elem)).join('');
      updateGallery(markup);

      loadBtn.btnEnabled();
      lightbox.refresh();
    })
    .catch(console.log);
}

function onLoadBtnClick(evt) {
  loadBtn.btnDisabled();

  newApiService.incrementPage();

  newApiService
    .fetchCards()
    .then(({ data: { hits } }) => {
      const markup = hits.map(elem => createMarkup(elem)).join('');
      updateGallery(markup);
      loadBtn.btnEnabled();
      lightbox.refresh();
    })
    .catch(() => {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadBtn.hidden();
    });
}

function updateGallery(markup) {
  return gallery.insertAdjacentHTML('beforeend', markup);
}
